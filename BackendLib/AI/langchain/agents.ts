import { LLMChain, BaseInvokeSchema, BluePrintProps, BaseOutputSchema } from "./config";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import { MessagesPlaceholder } from "@langchain/core/prompts";

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

//du musst den noch dicke testen
export class Summarizer{
    private summarizer: LLMChain
    constructor({name,fokuss}:{name?:string,fokuss?:string[]}){
        const thePrompt: Array<["human" | "system",string]| MessagesPlaceholder<any>> = [
            ["system",` 
            Du bist ein Experte für präzise und effektive Textzusammenfassungen. Deine Aufgabe ist es, den gegebenen Text zusammenzufassen, während du:
                - ALLE wichtigen Informationen beibehältst
                - Die Kernaussagen und Hauptpunkte hervorhebst
                - Den Kontext und die Bedeutung erhältst
                - Keine zusätzlichen Informationen hinzufügst
                - Klar und prägnant formulierst
                - Die ursprüngliche Intention des Textes widerspiegelst`],
        ]
        if(fokuss && fokuss.length > 0){
            const focusPrompts: ["human" | "system", string][] = fokuss.map(focus => ["human",`Fokussiere dich auf die folgenden Informationen: ${focus}`] as ["human" | "system", string])
            thePrompt.push(...focusPrompts)
        }
        this.summarizer = new LLMChain({
            name: `Summarizer ${name}`,
            description: "ein summarizer der den input summarisiert",
            prompt: thePrompt,
            output_strukture: BaseOutputSchema
        })
    }

    public async sum(input: any): Promise<z.infer<typeof BaseOutputSchema>> {
        const result = await this.summarizer.invoke({
            input: input
        })
        return result.content
    }
}