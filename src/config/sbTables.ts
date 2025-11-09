import { UUID } from "crypto"
import { SupabaseTable } from "../../BackendLib/supabase/server"
import { z } from "zod"



export const candidateSchema = z.object({
    candidate_id: z.string().uuid(),
    call_id: z.string().optional(), //mach das später, nicht direkt als mvp weil braucht webhook von retell ai
    name: z.string(),
    contact_info: z.object({
        email: z.string().email(),
        phone: z.string().optional(), //mach das später, nicht direkt als mvp weil braucht webhook von retell ai
    }),
    skills: z.string(),
    experience_years: z.number(),
    qualified: z.boolean(),
    interview_scheduled: z.boolean(),
    job_title: z.string(),
})

export const unternehmenSchema = z.object({
    Vorname: z.string(),
    Nachname: z.string(),
    Standort: z.string(),
    Unternehmen: z.string(),
    unternehmens_email: z.string().email(),
    Telefon: z.string(),
    anzahl_der_mitarbeiter: z.number(),
})

export const candidatesTable = new SupabaseTable<z.infer<typeof candidateSchema>>("candidates")
export const unternehmenTable = new SupabaseTable<z.infer<typeof unternehmenSchema>>("unternehmen_termine")