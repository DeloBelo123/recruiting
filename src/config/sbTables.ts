import { UUID } from "crypto"
import { SupabaseTable } from "../../BackendLib/supabase/server"
import { z } from "zod"



export const candidateSchema = z.object({
    candidate_id: z.string().uuid(),
    call_id: z.string(),
    name: z.string(),
    contact_info: z.object({
        email: z.string().email(),
        phone: z.string(),
    }),
    skills: z.string(),
    experience_years: z.number(),
    qualified: z.boolean(),
    interview_scheduled: z.boolean(),
    job_title: z.string(),
})

export const candidatesTable = new SupabaseTable<z.infer<typeof candidateSchema>>("candidates")
