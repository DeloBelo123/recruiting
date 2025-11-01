import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { z } from "zod"

const mcp= new McpServer({
    name: "mcp-handler",
    version: "1.0.0",
    description: "MCP handler for the AI",
})

export class McpHandler {
    private server:McpServer
    constructor(mcp_server:McpServer | undefined = mcp) {
        this.server = mcp_server
    }
    
    public async addTool({name,description,inputSchema,outputSchema,func}:{name:string,description:string,inputSchema:z.ZodSchema,outputSchema:z.ZodSchema,func:(...args:any[]) => Promise<any>}){
        this.server.registerTool(
            name,
            {
                title:name,
                description:description,
                //@ts-ignore | versionen incompatibility von zod, aber es klappt mit jeglichem produktion zod-type glaube ich
                inputSchema:inputSchema as any,
                outputSchema:outputSchema as any,
            },
            func
        )
    } 
    
    /* fortsetzung folgt... */
}