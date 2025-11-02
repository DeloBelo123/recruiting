import * as my from "./imports"
import { SupabaseVectorStore,OllamaEmbeddings,RecursiveCharacterTextSplitter,Document } from "./imports"
import { MessagesPlaceholder } from "@langchain/core/prompts"
import { z } from "zod"
import { fromZodError } from "zod-validation-error"
import { supabase } from "../../supabase/server"

const dev_mode = process.env.DEV_MODE === "true"

export const llm = dev_mode ? 
new my.ChatOllama({
    model:"llama3.2:3b"
}):
new my.ChatGroq({
    apiKey: process.env.CHATGROQ_API_KEY,
     model: "llama-3.3-70b-versatile"
})


/**
 * 
 * 
 * 
 * 
 *  ADD_CONTEXT() IST FLAWED!!!!! TESTE ES NOCHMAL BEVOR DU ES NUTZT!!!! VERMEHRTE EMBEDDINGS IN DER VEKTORDB PRO DURCHLAUF DES CODES!!!
 * 
 * 
 * 
 * 
 * 
 */




// types
export interface BaseInvokeSchema {
    input:any
    context?:any
    debug?:boolean
}
export const BaseOutputSchema = z.object({
    content: z.any().describe("The main content of the AI response"),
})

export const DoneOutputSchema = z.object({
    done:z.boolean().describe("hier sagst du ob die aufgabe erledigt ist oder nicht")
})

export interface BluePrintProps {
    name?:string
    description?:string
    LLM?:my.BaseChatModel
    prompt?:Array<["human" | "system",string]| my.MessagesPlaceholder>
    output_strukture:z.AnyZodObject
    is_llm?:boolean 
}

// functions
export function turn_to_docs(data:string[]): my.Document[] {
    let docs: my.Document[] = []
    for (const item of data) {
        docs.push(new my.Document({
            pageContent: item,
            metadata: {}
        }))
    }
    return docs
}

export async function structure<T extends z.ZodObject<any,any>>({data,inTo}:{data:any,inTo:T}):Promise<z.infer<T>>{
    const architect = new Architect(inTo)
    const respo = await architect.structure(data)
    return respo as z.infer<typeof inTo>
}

export type VectoreStoreProps<T> = {docs:T,table_name?: string,RPC_function?: string}

const embedder = new OllamaEmbeddings({
    model:"nomic-embed-text"
})

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize:600,
    chunkOverlap:80
})

export async function create_supabase_vectorestore({docs,table_name = "documents",RPC_function = "match_documents"}:VectoreStoreProps<Document[]> ){
    const splitted_docs = await splitter.splitDocuments(docs) 
    const vektor_store = await SupabaseVectorStore.fromDocuments(
        splitted_docs,
        embedder, 
        {
            client: supabase,
            tableName: table_name,
            queryName: RPC_function
        }
    )
    return vektor_store
}

export async function add_docs_to_supabase_vectorestore({docs,table_name = "documents",RPC_function = "match_documents"}:VectoreStoreProps<Document[]>){
    const splitted_docs = await splitter.splitDocuments(docs)
    const vectore_store = new SupabaseVectorStore(
        embedder,
        {
            client: supabase,
            tableName: table_name,
            queryName: RPC_function
        }
    )
    const document_ids = await vectore_store.addDocuments(splitted_docs)
    if (!document_ids || document_ids.length === 0) {
        throw new Error("Error! Es wurden keine Dokumente hinzugefügt, die IDS Liste ist leer.")
    }
    return document_ids
}

// classes
abstract class AIBluePrint {
    public name: string
    public description: string
    public LLM: my.BaseChatModel
    public json_parser: my.StructuredOutputParser<any>
    public prompt: my.ChatPromptTemplate | undefined
    public output_strukture: z.ZodSchema<any,any,any> 

    constructor({name,description,LLM,prompt,output_strukture,is_llm = true}:BluePrintProps){
        this.name = name || "Kein Name"
        this.description = description || "keine beschreibung"
        this.LLM = LLM || llm
        this.output_strukture = output_strukture
        this.json_parser =  my.StructuredOutputParser.fromZodSchema(output_strukture as any)
        this.setupPrompt(prompt,is_llm )
    }

    public async setupPrompt(promptDef: any,is_llm: boolean){
        const base = my.ChatPromptTemplate.fromMessages(promptDef);
        this.prompt = is_llm ? await base.partial({format_instructions: this.json_parser?.getFormatInstructions()}) : base
    }

    protected abstract createChain():any
    public abstract add_context(props: VectoreStoreProps<string[]>):any 
    public abstract invoke(invoke_dict:any):any
}

/**
 * @param name name für intern logs
 * @param description semantische description für dich
 * @param prompt erweitern des internen prompt, hat per default ["human","{input}"], new MessagesPlaceholder("context") und format-instructions
 * @param output_strukture die Struktur des output die die LLM returnen soll
 * @param LLM das LLM das für die chain verwendet wird, hat aber schon einen ChatGroq/ChatOllama als default
 */
export class LLMChain<K extends z.ZodObject<any,any> = typeof BaseOutputSchema,T extends Record<string,any> = BaseInvokeSchema> extends AIBluePrint {
    private vectore_store: my.SupabaseVectorStore | undefined
    private retrieval_chain: my.Runnable | undefined
    private chain: my.Runnable | undefined

    constructor({name,description,LLM,prompt,output_strukture = BaseOutputSchema,custom_prompt = false}:BluePrintProps & {custom_prompt?: boolean}){
        const basePrompt: (["human" | "system", string] | MessagesPlaceholder<any>)[] = [
            ["system","You MUST respond ONLY with valid JSON matching this exact schema:\n{format_instructions}\n\nIMPORTANT: \n- Output ONLY valid JSON, no markdown code blocks\n- No backslashes or line breaks in strings\n- All strings must be on single lines\n- Do NOT wrap in ```json``` blocks\n- Return the JSON object DIRECTLY, not wrapped in any other object like 'answer' or 'response'"],
            new MessagesPlaceholder("context"),
        ]
        if (!custom_prompt){
            basePrompt.push(["human","{input}"])
        }
        const finalPrompt = [...basePrompt, ...(prompt || [])]
        super({name,description,LLM,prompt:finalPrompt,output_strukture})
    }

    protected async createChain() {
        if (!this.chain) {
            while (!this.prompt) await new Promise(resolve => setTimeout(resolve, 10))
            this.chain = this.prompt.pipe(this.LLM).pipe(this.json_parser)
        }
        return this.chain
    }

    public async add_context({docs,table_name = "documents",RPC_function = "match_documents"}: VectoreStoreProps<Array<string>>){
        const documents = turn_to_docs(docs)
        if(!this.vectore_store){
            this.vectore_store = await create_supabase_vectorestore({
                docs: documents,
                table_name: table_name,
                RPC_function: RPC_function
            })
            const retriever = this.vectore_store.asRetriever()
            const stuff_chain = await my.createStuffDocumentsChain({
                llm: this.LLM as any,
                prompt: this.prompt as any,
                outputParser: this.json_parser as any
            })
            const retrieval_chain = await my.createRetrievalChain({
                combineDocsChain: stuff_chain,
                retriever: retriever as any
            })
            this.retrieval_chain = retrieval_chain as any
            console.log(`retrivial chain in ${this.name} erfolgreich erstellt`)
        } else {
            await add_docs_to_supabase_vectorestore({
                docs: documents,
                table_name: table_name,
                RPC_function: RPC_function
            })
            console.log(`docs in ${this.name} retrivial_chain erfolgreich hinzugefügt`)
        }
    }

    public async invoke(invoke_dict:T):Promise<z.infer<K>>{
        //@ts-ignore | wir wissen es besser, unser checkup schadet ja nicht, wir gucken einfach falls es diese props hat weisste
        if(!("context" in invoke_dict) && !this.retrieval_chain) invoke_dict["context"] = []
        //@ts-ignore | wir wissen es besser, unser checkup schadet ja nicht, wir gucken einfach falls es diese props hat weisste
        if(!("debug" in invoke_dict)) invoke_dict["debug"] = false

        const chain = this.retrieval_chain || await this.createChain()
        if(!chain) throw new Error(`Error! the LLMChain: ${this.name} had no chain calling .invoke()`)
        const ai_respo = await chain.invoke(invoke_dict)
        if(invoke_dict["debug"]){
            console.log("AI Response:", ai_respo)
        }
        if(!this.output_strukture) throw new Error(`Error! the LLMChain: ${this.name} had no output_strukture calling .invoke()`)
        
        // Extrahiere das richtige Objekt falls es in 'answer' gewrappt ist
        const dataToValidate = ai_respo.answer || ai_respo
        const respo = this.output_strukture.safeParse(dataToValidate)
          if(respo.success){
            return respo.data as z.infer<K>
          } else {
            throw fromZodError(respo.error as any)
          }
    }
}


export class Architect<T extends z.ZodObject<any,any>> {
    public output_strukture: T
    public Name: string | undefined
    public architect: LLMChain<T, BaseInvokeSchema>

    constructor(output_strukture: T, name?: string) {
        this.Name = name || ""
        this.output_strukture = output_strukture
        this.architect = new LLMChain<T, BaseInvokeSchema>({
            name: `Architect ${this.Name}`,
            description: "ein architect der die output_strukture in die vorgegebene struktur umwandelt",
            output_strukture: output_strukture,
            prompt: [
                ["system", "du bist ein output-formater der jeglichen input AUSNAHMSLOS und OHNE JEGLICHEN TEXT DAZU in die vorgegebene struktur umwandelt und zurück gibt"]
            ]
        })
    }

    public async structure(input: any): Promise<z.infer<T>> {
        const respo = await this.architect.invoke({
            input: input
        })
        const secondValidation = this.output_strukture.safeParse(respo)
        if (secondValidation.success) {
            return secondValidation.data as z.infer<T>
        } else {
            throw fromZodError(secondValidation.error as any)
        }
    }
}


/**
 * @param name name für intern logs
 * @param description semantische description für dich
 * @param prompt erweitern des internen prompt, hat per default ["human","{input}"] und new MessagesPlaceholder("context")
 * @param output_strukture die Struktur des output die die LLM returnen soll
 * @param LLM das LLM das für die chain verwendet wird, hat aber schon einen ChatGroq/ChatOllama als default
 * @param tools die tools die das llm aurufen kann, müssen DynamicStructuredTools sein
 */
export class OneCallAgent<K extends z.ZodObject<any,any>,T extends Record<string,any> = BaseInvokeSchema> extends AIBluePrint {
    private architect: Architect<z.infer<typeof this.output_strukture>> 
    private tools: my.DynamicStructuredTool[] 
    private llm_with_tools: my.Runnable
    private chain: my.Runnable | undefined
    private vectore_store: my.SupabaseVectorStore | undefined
    private retrieval_chain: my.Runnable | undefined

    constructor({name,description,LLM = llm,prompt,output_strukture,is_llm = false,tools,custom_prompt = false}:BluePrintProps & {tools: my.DynamicStructuredTool[], custom_prompt?: boolean}){
        const basePrompt: (["human" | "system", string] | MessagesPlaceholder<any>)[] = [
            new MessagesPlaceholder("context"),
        ]
        if (!custom_prompt){
            basePrompt.push(["human","{input}"])
        }
        const finalPrompt = [...basePrompt, ...(prompt || [])]
        super({name,description,LLM,prompt:finalPrompt,output_strukture,is_llm})
        this.architect = new Architect(output_strukture)
        this.tools = tools
        //@ts-ignore | wir wissen das this.LLM immer selbst wenn nicht per init angegeben ein llm als fallback hat
        this.llm_with_tools = this.LLM.bindTools(this.tools)
    }
    protected async createChain(){
        if(!this.chain){
            while (!this.prompt) await new Promise(resolve => setTimeout(resolve, 10))
            this.chain = this.prompt.pipe(this.llm_with_tools)
        }
        return this.chain
    }
    public async add_context({docs,table_name = "documents",RPC_function = "match_documents"}: VectoreStoreProps<Array<string>>){
        const documents = turn_to_docs(docs)
        if(!this.vectore_store){
            this.vectore_store = await create_supabase_vectorestore({
                docs: documents,
                table_name: table_name,
                RPC_function: RPC_function
            })
            const retriever = this.vectore_store.asRetriever()
            const stuff_chain = await my.createStuffDocumentsChain({
                llm: this.llm_with_tools as any,
                prompt: this.prompt as any,
                outputParser: this.json_parser as any
            })
            const retrieval_chain = await my.createRetrievalChain({
                combineDocsChain: stuff_chain,
                retriever: retriever as any
            })
            this.retrieval_chain = retrieval_chain as any
            console.log(`retrivial chain in ${this.name} erfolgreich erstellt`)
        } else {
            await add_docs_to_supabase_vectorestore({
                docs: documents,
                table_name: table_name,
                RPC_function: RPC_function
            })
            console.log(`docs in ${this.name} retrivial_chain erfolgreich hinzugefügt`)
        }
    }

    public async invoke(invoke_dict:T):Promise<z.infer<K>>{
        //@ts-ignore | wir wissen es besser, unser checkup schadet ja nicht, wir gucken einfach falls es diese props hat weisste
        if(!("context" in invoke_dict) && !this.retrieval_chain) invoke_dict["context"] = []
        //@ts-ignore | wir wissen es besser, unser checkup schadet ja nicht, wir gucken einfach falls es diese props hat weisste
        if(!("debug" in invoke_dict)) invoke_dict["debug"] = false

        const chain = this.retrieval_chain || await this.createChain()
        if(!chain) throw new Error(`Error! the OneCallAgent: ${this.name} had no chain calling .invoke()`)
        const ai_respo = await chain.invoke(invoke_dict)
        const dataToValidate = ai_respo.answer || ai_respo
        if(invoke_dict["debug"]){
            console.log("AI Response:", ai_respo)
        }
        if(!this.output_strukture) throw new Error(`Error! the OneCallAgent: ${this.name} had no output_strukture calling .invoke()`)
        // Check ob Tool gecalled wurde
        if (!dataToValidate.tool_calls || dataToValidate.tool_calls.length === 0) {
            return dataToValidate.content as z.infer<K>
        }   
        // Tool Name extrahieren
        const tool_name = dataToValidate.tool_calls[0].name
        const called_tool_arr = this.tools.filter(tool => tool.name === tool_name)
        
        if (called_tool_arr.length === 0) {
            throw new Error(`Error! das Tool '${tool_name}' existiert nicht bei den Tools von OneCallAgent: ${this.name}`)
        }
        
        const called_tool = called_tool_arr[0]
        const called_args = dataToValidate.tool_calls[0].args
        
        // Tool ausführen
        let result: any
        if (called_args && Object.keys(called_args).length > 0) {
            // In LangChain.js ist .invoke() schon die Methode die das Tool aufruft
            // args ist schon ein validiertes Objekt (kein JSON string wie in Python!)
            result = await called_tool.invoke(called_args)
        } else {
            result = await called_tool.invoke({})
        }
    
        // Mit Architect strukturieren
        const architect_respo = await this.architect.structure(result)
        // Extrahiere das richtige Objekt falls es in 'answer' gewrappt ist
        const respo = this.output_strukture.safeParse(architect_respo)
          if(respo.success){
            return respo.data as z.infer<K>
          } else {
            throw fromZodError(respo.error as any)
          }
    }
}