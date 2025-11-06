import { NextRequest,NextResponse } from "next/server"
import { candidatesTable, candidateSchema } from "../../../../config/sbTables"
import { v4 as uuidv4 } from "uuid"
import { UUID } from "crypto"

export async function POST(request:NextRequest){
    try{
        const data = candidateSchema.parse(await request.json())
        await candidatesTable.insert([{
            candidate_id: uuidv4() as UUID,
            call_id: "", //mach so das hier die richtige call_id von retell ai kommt
            name: data.name,
            contact_info: {
                email: data.contact_info.email,
                phone: data.contact_info.phone,
            },
            skills: data.skills,
            experience_years: data.experience_years,
            qualified: data.qualified,
            interview_scheduled: data.interview_scheduled,
            job_title: data.job_title,
        }])
        return NextResponse.json({
            success: true,
        })
    }catch(error){
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : error
        })
    }

}