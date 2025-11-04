import { DragnDropAgent } from "./config"
import axios from "axios"

export class N8nAgent implements DragnDropAgent {
    private webhookUrl:string
    constructor(webhookUrl:string){
        this.webhookUrl = webhookUrl
    }
    public async answer(data:Record<string,any>){
        const respo = await axios.post(this.webhookUrl,data)
        return respo.data
    }
}