"use client"

import { motion } from "framer-motion"

interface OverviewSectionProps {
  onNext: () => void
  dpaAccepted: boolean
  onDpaChange: (accepted: boolean) => void
  isLast: boolean
}

const features = [
  {
    title: "KI-gestützte Analyse",
    description:
      "Unsere KI analysiert Kandidatenprofile automatisch und identifiziert die besten Matches für Ihre Stellenausschreibungen.",
    icon: "🤖",
  },
  {
    title: "Voice-Calls",
    description:
      "Automatisierte Voice-Calls führen strukturierte Gespräche mit Kandidaten und sammeln relevante Informationen.",
    icon: "📞",
  },
  {
    title: "Dashboard & Analytics",
    description:
      "Erhalten Sie detaillierte Insights und Reports über alle Kandidaten und den Status Ihrer Recruiting-Pipeline.",
    icon: "📊",
  },
  {
    title: "Zeitersparnis",
    description:
      "Sparen Sie bis zu 80% Ihrer Zeit bei der Kandidatenqualifizierung und fokussieren Sie sich auf die besten Talente.",
    icon: "⚡",
  },
]

export default function OverviewSection({
  onNext,
  isLast,
}: OverviewSectionProps) {
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
          Produktübersicht
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
          RecruitAI bietet Ihnen eine umfassende Lösung für Ihren
          Recruiting-Prozess. Entdecken Sie die Hauptfunktionen und Vorteile,
          die Ihnen zur Verfügung stehen.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 18,
              delay: index * 0.1
            }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-card border border-border rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {feature.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 18,
          delay: 0.5
        }}
        className="bg-accent/30 border border-accent rounded-lg p-8 mt-8"
      >
        <h3 className="text-2xl font-semibold text-foreground mb-4">
          Ihre Vorteile auf einen Blick
        </h3>
        <ul className="space-y-2 text-foreground">
          <li className="flex items-start gap-3">
            <span className="text-chart-1 font-bold">•</span>
            <span>Objektive Kandidatenbewertung ohne menschliche Voreingenommenheit</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-chart-1 font-bold">•</span>
            <span>Skalierbare Recruiting-Prozesse für jedes Unternehmenswachstum</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-chart-1 font-bold">•</span>
            <span>24/7 Verfügbarkeit – Qualifizierungen rund um die Uhr</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-chart-1 font-bold">•</span>
            <span>Kosteneffiziente Lösung im Vergleich zu traditionellem Recruiting</span>
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
            delay: 0.6
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

