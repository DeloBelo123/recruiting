"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { candidatesTable } from "@/config/sbTables"
import { dummyCandidates } from "../dummydata"
import Headers from "./Headers"
import Body from "./Body"

export default function Datatable() {
  const [candidates, setCandidates] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [useDummyData, setUseDummyData] = useState(true)

  useEffect(() => {
    async function fetchCandidates() {
      try {
        setLoading(true)
        if (useDummyData) {
          setCandidates(dummyCandidates)
        } else {
          const data = await candidatesTable.select({
            columns: ["*"],
          })
          if (data && Array.isArray(data)) {
            setCandidates(data)
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Fehler beim Laden der Daten")
      } finally {
        setLoading(false)
      }
    }
    fetchCandidates()
  }, [useDummyData])

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

  if (error) {
    return (
      <div className="bg-destructive/10 border border-destructive text-destructive-foreground px-4 py-3 rounded-md">
        {error}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Kandidaten Übersicht</h2>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
            <input
              type="checkbox"
              checked={useDummyData}
              onChange={(e) => setUseDummyData(e.target.checked)}
              className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
            />
            <span>Demo-Daten verwenden</span>
          </label>
          <span className="text-sm text-muted-foreground">
            {candidates.length} {candidates.length === 1 ? "Kandidat" : "Kandidaten"}
          </span>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <Headers />
            {candidates.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={8} className="p-0">
                    <div className="flex items-center justify-center min-h-[calc(100vh-400px)]">
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-muted-foreground text-3xl font-medium"
                      >
                        Keine Kandidaten ausgewertet
                      </motion.p>
                    </div>
                  </td>
                </tr>
              </tbody>
            ) : (
              <Body candidates={candidates} />
            )}
          </table>
        </div>
      </div>
    </div>
  )
}

