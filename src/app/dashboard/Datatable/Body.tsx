"use client"

import { motion } from "framer-motion"

interface Candidate {
  candidate_id: string
  name: string
  contact_info: {
    email: string
    phone?: string
  }
  skills: string
  experience_years: number
  qualified: boolean
  interview_scheduled: boolean
  job_title: string
}

interface BodyProps {
  candidates: Candidate[]
}

export default function Body({ candidates }: BodyProps) {
  return (
    <tbody className="divide-y divide-border">
      {candidates.map((candidate, index) => (
        <motion.tr
          key={candidate.candidate_id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="hover:bg-muted/30 transition-colors"
        >
          <td className="px-4 py-3 text-sm text-foreground">{candidate.name}</td>
          <td className="px-4 py-3 text-sm text-muted-foreground">{candidate.contact_info.email}</td>
          <td className="px-4 py-3 text-sm text-foreground">{candidate.job_title}</td>
          <td className="px-4 py-3 text-sm text-muted-foreground">{candidate.skills}</td>
          <td className="px-4 py-3 text-sm text-foreground">{candidate.experience_years} Jahre</td>
          <td className="px-4 py-3">
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                candidate.qualified
                  ? "bg-chart-1/20 text-chart-1"
                  : "bg-destructive/20 text-destructive"
              }`}
            >
              {candidate.qualified ? "Ja" : "Nein"}
            </span>
          </td>
          <td className="px-4 py-3">
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                candidate.interview_scheduled
                  ? "bg-primary/20 text-primary"
                  : "bg-muted-foreground/20 text-muted-foreground"
              }`}
            >
              {candidate.interview_scheduled ? "Geplant" : "Offen"}
            </span>
          </td>
          <td className="px-4 py-3 text-xs text-muted-foreground font-mono">
            {candidate.candidate_id.slice(0, 8)}...
          </td>
        </motion.tr>
      ))}
    </tbody>
  )
}