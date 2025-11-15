"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { candidatesTable } from "@/config/sbTables"
import { dummyCandidates } from "../dummydata"

interface Stats {
  total: number
  qualified: number
  qualifiedPercentage: number
  interviewScheduled: number
  interviewPercentage: number
  avgExperience: number
  jobTitleDistribution: Record<string, number>
  qualifiedByJobTitle: Record<string, { total: number; qualified: number }>
}

export default function Analytics() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [useDummyData, setUseDummyData] = useState(true)

  useEffect(() => {
    async function calculateStats() {
      try {
        const data = useDummyData
          ? dummyCandidates
          : await candidatesTable.select({
              columns: ["*"],
            })

        if (!data || !Array.isArray(data)) {
          setStats({
            total: 0,
            qualified: 0,
            qualifiedPercentage: 0,
            interviewScheduled: 0,
            interviewPercentage: 0,
            avgExperience: 0,
            jobTitleDistribution: {},
            qualifiedByJobTitle: {},
          })
          return
        }

        const total = data.length
        const qualified = data.filter((c) => c.qualified).length
        const interviewScheduled = data.filter((c) => c.interview_scheduled).length
        const avgExperience =
          data.reduce((sum, c) => sum + (c.experience_years || 0), 0) / total || 0

        const jobTitleDistribution: Record<string, number> = {}
        const qualifiedByJobTitle: Record<string, { total: number; qualified: number }> = {}

        data.forEach((candidate) => {
          const jobTitle = candidate.job_title || "Unbekannt"
          jobTitleDistribution[jobTitle] = (jobTitleDistribution[jobTitle] || 0) + 1

          if (!qualifiedByJobTitle[jobTitle]) {
            qualifiedByJobTitle[jobTitle] = { total: 0, qualified: 0 }
          }
          qualifiedByJobTitle[jobTitle].total++
          if (candidate.qualified) {
            qualifiedByJobTitle[jobTitle].qualified++
          }
        })

        setStats({
          total,
          qualified,
          qualifiedPercentage: total > 0 ? (qualified / total) * 100 : 0,
          interviewScheduled,
          interviewPercentage: total > 0 ? (interviewScheduled / total) * 100 : 0,
          avgExperience: Math.round(avgExperience * 10) / 10,
          jobTitleDistribution,
          qualifiedByJobTitle,
        })
      } catch (error) {
        console.error("Error calculating stats:", error)
      } finally {
        setLoading(false)
      }
    }

    calculateStats()
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

  if (!stats) return null

  const StatCard = ({
    title,
    value,
    subtitle,
    delay = 0,
  }: {
    title: string
    value: string | number
    subtitle?: string
    delay?: number
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-card border border-border rounded-lg p-6 shadow-md"
    >
      <h3 className="text-sm font-medium text-muted-foreground mb-2">{title}</h3>
      <p className="text-3xl font-bold text-foreground">{value}</p>
      {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
    </motion.div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Analytics & Statistiken</h2>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Gesamt Kandidaten" value={stats.total} delay={0.1} />
        <StatCard
          title="Qualifiziert"
          value={`${stats.qualifiedPercentage.toFixed(1)}%`}
          subtitle={`${stats.qualified} von ${stats.total}`}
          delay={0.2}
        />
        <StatCard
          title="Interview geplant"
          value={`${stats.interviewPercentage.toFixed(1)}%`}
          subtitle={`${stats.interviewScheduled} Kandidaten`}
          delay={0.3}
        />
        <StatCard
          title="Ø Erfahrung"
          value={`${stats.avgExperience} Jahre`}
          delay={0.4}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-card border border-border rounded-lg p-6 shadow-md"
      >
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Qualifizierungsrate nach Job-Titel
        </h3>
        <div className="space-y-4">
          {Object.entries(stats.qualifiedByJobTitle).map(([jobTitle, data], index) => {
            const percentage = data.total > 0 ? (data.qualified / data.total) * 100 : 0
            return (
              <motion.div
                key={jobTitle}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-foreground">{jobTitle}</span>
                  <span className="text-muted-foreground">
                    {data.qualified}/{data.total} ({percentage.toFixed(1)}%)
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-card border border-border rounded-lg p-6 shadow-md"
      >
        <h3 className="text-lg font-semibold text-foreground mb-4">Verteilung nach Job-Titel</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(stats.jobTitleDistribution).map(([jobTitle, count], index) => {
            const percentage = stats.total > 0 ? (count / stats.total) * 100 : 0
            return (
              <motion.div
                key={jobTitle}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + index * 0.05 }}
                className="bg-muted/30 rounded-md p-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-foreground">{jobTitle}</span>
                  <span className="text-sm text-muted-foreground">{count}</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ delay: 1 + index * 0.05, duration: 0.5 }}
                    className="h-full bg-chart-2 rounded-full"
                  />
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}

