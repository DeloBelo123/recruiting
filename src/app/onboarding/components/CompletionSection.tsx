"use client"

import { motion } from "framer-motion"

interface CompletionSectionProps {
  onNext: () => void
  dpaAccepted: boolean
  onDpaChange: (accepted: boolean) => void
  isLast: boolean
}

export default function CompletionSection({
  dpaAccepted,
}: CompletionSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-12 flex-1 flex flex-col justify-center"
    >
      <div className="space-y-8">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15
          }}
          className="flex justify-center mb-8"
        >
          <div className="w-24 h-24 bg-chart-1 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 18,
            delay: 0.2
          }}
          className="text-5xl font-serif font-bold text-primary text-center"
        >
          Herzlichen Glückwunsch!
        </motion.h1>

        <p className="text-lg text-foreground leading-relaxed text-center max-w-2xl mx-auto">
          Sie haben das Onboarding erfolgreich abgeschlossen. Wir freuen uns
          darauf, Sie bei Ihrem Recruiting-Prozess zu unterstützen und wünschen
          Ihnen viel Erfolg mit RecruitAI!
        </p>
      </div>

      {/* Checklist */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-2xl font-serif font-semibold text-foreground mb-6">
          Checkliste für den Start
        </h2>
        <ul className="space-y-4">
          {[
            "Onboarding-Dokument vollständig gelesen und verstanden",
            "DPA-Bestätigung abgegeben",
            "Zugangsdaten erhalten und Account aktiviert",
            "Dashboard-Einführung durchgeführt",
            "Erste CSV-Dateien vorbereitet",
            "Support-Kontakt gespeichert",
          ].map((item, index) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3"
            >
              <span className="text-chart-1 font-bold mt-1">✓</span>
              <span className="text-foreground">{item}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Next Steps */}
      <div className="bg-accent/30 border border-accent rounded-lg p-6">
        <h3 className="text-xl font-semibold text-foreground mb-4">
          Nächste Schritte
        </h3>
        <div className="space-y-3 text-foreground">
          <p>
            <strong>1. Account-Einrichtung:</strong> Wir richten Ihren Account
            ein und senden Ihnen die Zugangsdaten per E-Mail. Dies erfolgt in
            der Regel innerhalb von 24 Stunden nach Abschluss des Onboardings.
          </p>
          <p>
            <strong>2. Dashboard-Einführung:</strong> Sie erhalten eine
            Einführung in das Dashboard und alle wichtigen Funktionen. Optional
            bieten wir ein persönliches Onboarding-Gespräch an.
          </p>
          <p>
            <strong>3. Erste CSV-Dateien hochladen:</strong> Laden Sie Ihre
            ersten CSV-Dateien mit Kandidatendaten hoch und starten Sie Ihre
            erste KI-gestützte Qualifizierungsrunde.
          </p>
        </div>
      </div>

      {/* Final Message */}
      <div className="bg-primary/10 border border-primary/30 rounded-lg p-8 text-center">
        <h3 className="text-2xl font-serif font-semibold text-primary mb-4">
          Vielen Dank für Ihr Vertrauen!
        </h3>
        <p className="text-foreground leading-relaxed max-w-2xl mx-auto">
          Unser Ziel ist es, Ihnen dabei zu helfen, die besten Talente für Ihr
          Unternehmen zu finden – effizienter und erfolgreicher als je zuvor. Bei
          Fragen stehen wir Ihnen jederzeit zur Verfügung.
        </p>
      </div>
    </motion.div>
  )
}

