export interface DragnDropAgent {
    run: (data:Record<string,any>) => Promise<any>
}

export interface DragnDropAgentProps { 
    name:string
    webhookUrl:string
}
