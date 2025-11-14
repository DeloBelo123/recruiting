"use client"

import { motion } from "framer-motion"

interface WelcomeSectionProps {
  onNext: () => void
  dpaAccepted: boolean
  onDpaChange: (accepted: boolean) => void
  isLast: boolean
}

export default function WelcomeSection({
  onNext,
  isLast,
}: WelcomeSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-12 flex-1 flex flex-col justify-center"
    >
      <div className="space-y-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 18
          }}
          className="text-5xl font-serif font-bold text-primary"
        >
          Willkommen bei RecruitAI!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 18,
            delay: 0.1
          }}
          className="text-xl text-foreground leading-relaxed"
        >
          Herzlichen Dank, dass Sie sich für RecruitAI entschieden haben! Mit
          unserer innovativen KI-gestützten Recruiting-Lösung revolutionieren Sie
          Ihren Recruiting-Prozess und finden die besten Talente für Ihr
          Unternehmen – effizienter, schneller und präziser als je zuvor.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 18,
            delay: 0.2
          }}
          className="text-xl text-foreground leading-relaxed"
        >
          RecruitAI nutzt fortschrittliche Künstliche Intelligenz, um automatisch
          Kandidatenqualifizierungen durchzuführen, Voice-Calls zu führen und Ihre
          Recruiting-Pipeline zu optimieren. Unser System analysiert
          Kandidatenprofile, führt strukturierte Gespräche und liefert Ihnen
          detaillierte Insights für fundierte Entscheidungen.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 18,
          delay: 0.3
        }}
        className="bg-card border border-border rounded-lg p-8 shadow-sm"
      >
        <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">
          Was Sie erhalten
        </h2>
        <ul className="space-y-3 text-foreground">
          <li className="flex items-start gap-3">
            <span className="text-chart-1 font-bold mt-1">✓</span>
            <span>Automatische Kandidatenqualifizierung</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-chart-1 font-bold mt-1">✓</span>
            <span>KI-gestützte Voice-Calls</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-chart-1 font-bold mt-1">✓</span>
            <span>Detaillierte Analytics und Reporting</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-chart-1 font-bold mt-1">✓</span>
            <span>Vollzugriff auf das Dashboard</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-chart-1 font-bold mt-1">✓</span>
            <span>Dedizierter Support</span>
          </li>
        </ul>
      </motion.div>

      {!isLast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 18,
            delay: 0.4
          }}
          className="flex justify-end pt-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            className="px-10 py-4 bg-primary text-primary-foreground rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors shadow-md"
          >
            Weiter
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  )
}

