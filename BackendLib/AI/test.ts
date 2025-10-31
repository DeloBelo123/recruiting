import { z } from "zod";
import { BaseOutputSchema, LLMChain } from "./agents";

const chain = new LLMChain({
    name:"test",
    prompt:[
        ["system","you are a test agent"],
        ["human","what is the answer to the question?"]
    ],
    output_strukture:BaseOutputSchema
})

const respo = await chain.invoke({
    input:"wie geht es dir?"
})

console.log(respo)