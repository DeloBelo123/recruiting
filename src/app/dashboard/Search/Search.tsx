"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { candidatesTable } from "@/config/sbTables"
import { dummyCandidates } from "../dummydata"

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

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("")
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([])
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)
  const [loading, setLoading] = useState(true)
  const [useDummyData, setUseDummyData] = useState(true)

  useEffect(() => {
    async function fetchCandidates() {
      try {
        const data = useDummyData
          ? dummyCandidates
          : await candidatesTable.select({
              columns: ["*"],
            })
        if (data && Array.isArray(data)) {
          setCandidates(data)
          setFilteredCandidates(data)
        }
      } catch (error) {
        console.error("Error fetching candidates:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchCandidates()
  }, [useDummyData])

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredCandidates(candidates)
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = candidates.filter((candidate) => {
      return (
        candidate.name.toLowerCase().includes(query) ||
        candidate.candidate_id.toLowerCase().includes(query) ||
        candidate.contact_info.email.toLowerCase().includes(query) ||
        candidate.job_title.toLowerCase().includes(query) ||
        candidate.skills.toLowerCase().includes(query)
      )
    })
    setFilteredCandidates(filtered)
  }, [searchQuery, candidates])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Kandidaten Suche</h2>
        <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
          <input
            type="checkbox"
            checked={useDummyData}
            onChange={(e) => setUseDummyData(e.target.checked)}
            className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
          />
          <span>Demo-Daten verwenden</span>
        </label>
      </div>

      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Suche nach Name, ID, Email, Job-Titel oder Kompetenzen..."
          className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        />
        {searchQuery && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            ✕
          </motion.button>
        )}
      </div>

      <div className="text-sm text-muted-foreground">
        {filteredCandidates.length} {filteredCandidates.length === 1 ? "Ergebnis" : "Ergebnisse"}
        {searchQuery && ` für "${searchQuery}"`}
      </div>

      <div className="space-y-2">
        <AnimatePresence mode="wait">
          {filteredCandidates.length === 0 ? (
            <motion.div
              key="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12 text-muted-foreground"
            >
              Keine Ergebnisse gefunden
            </motion.div>
          ) : (
            filteredCandidates.map((candidate, index) => (
              <motion.div
                key={candidate.candidate_id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedCandidate(candidate)}
                className="bg-card border border-border rounded-lg p-4 hover:shadow-md cursor-pointer transition-all hover:border-primary/50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{candidate.name}</h3>
                    <p className="text-sm text-muted-foreground">{candidate.contact_info.email}</p>
                    <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                      <span>{candidate.job_title}</span>
                      <span>•</span>
                      <span>{candidate.experience_years} Jahre Erfahrung</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        candidate.qualified
                          ? "bg-chart-1/20 text-chart-1"
                          : "bg-destructive/20 text-destructive"
                      }`}
                    >
                      {candidate.qualified ? "Qualifiziert" : "Nicht qualifiziert"}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedCandidate && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCandidate(null)}
              className="fixed inset-0 bg-black/50 z-40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-card border border-border rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-foreground">
                    {selectedCandidate.name}
                  </h2>
                  <button
                    onClick={() => setSelectedCandidate(null)}
                    className="text-muted-foreground hover:text-foreground text-xl"
                  >
                    ✕
                  </button>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Kandidaten ID</h3>
                    <p className="text-sm font-mono text-foreground">{selectedCandidate.candidate_id}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Email</h3>
                    <p className="text-sm text-foreground">{selectedCandidate.contact_info.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Job-Titel</h3>
                    <p className="text-sm text-foreground">{selectedCandidate.job_title}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Kompetenzen</h3>
                    <p className="text-sm text-foreground">{selectedCandidate.skills}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Erfahrungsjahre
                    </h3>
                    <p className="text-sm text-foreground">{selectedCandidate.experience_years} Jahre</p>
                  </div>
                  <div className="flex gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Qualifiziert</h3>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          selectedCandidate.qualified
                            ? "bg-chart-1/20 text-chart-1"
                            : "bg-destructive/20 text-destructive"
                        }`}
                      >
                        {selectedCandidate.qualified ? "Ja" : "Nein"}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">
                        Interview geplant
                      </h3>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          selectedCandidate.interview_scheduled
                            ? "bg-primary/20 text-primary"
                            : "bg-muted-foreground/20 text-muted-foreground"
                        }`}
                      >
                        {selectedCandidate.interview_scheduled ? "Ja" : "Nein"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

