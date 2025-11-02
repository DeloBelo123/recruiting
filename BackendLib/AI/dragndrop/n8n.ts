import { DragnDropAgent, DragnDropAgentProps } from "./config"
import axios from "axios"

export class N8nAgent implements DragnDropAgent {
    private webhookUrl:string
    public name:string
    constructor({name,webhookUrl}:DragnDropAgentProps){
        this.name = name
        this.webhookUrl = webhookUrl
    }
    public async run(data:Record<string,any>){
        const respo = await axios.post(this.webhookUrl,data)
        return respo.data
    }
}