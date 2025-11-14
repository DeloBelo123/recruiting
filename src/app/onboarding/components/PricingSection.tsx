"use client"

import { motion } from "framer-motion"

interface PricingSectionProps {
  onNext: () => void
  dpaAccepted: boolean
  onDpaChange: (accepted: boolean) => void
  isLast: boolean
}

export default function PricingSection({
  onNext,
  isLast,
}: PricingSectionProps) {
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
          Preise & Abo-Informationen
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
          Unser MVP-Paket bietet Ihnen die perfekte Möglichkeit, RecruitAI
          kennenzulernen und die Vorteile unserer KI-gestützten
          Recruiting-Lösung zu erleben. Starten Sie mit einem monatlichen
          Abonnement, das jederzeit kündbar ist.
        </motion.p>
      </div>

      {/* Pricing Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 18,
          delay: 0.2
        }}
        className="bg-card border-2 border-primary rounded-lg p-10 shadow-lg"
      >
        <div className="text-center mb-8">
          <div className="text-5xl font-bold text-primary mb-2">590 €</div>
          <div className="text-muted-foreground text-lg">pro Monat</div>
          <div className="text-sm text-muted-foreground mt-1">
            inkl. MwSt.
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-start gap-3">
            <span className="text-chart-1 font-bold mt-1">✓</span>
            <span className="text-foreground">
              Automatische Kandidatenqualifizierung
            </span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-chart-1 font-bold mt-1">✓</span>
            <span className="text-foreground">
              KI-gestützte Voice-Calls (unbegrenzt)
            </span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-chart-1 font-bold mt-1">✓</span>
            <span className="text-foreground">
              CSV-Datenverarbeitung und Import
            </span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-chart-1 font-bold mt-1">✓</span>
            <span className="text-foreground">
              Vollzugriff auf Analytics-Dashboard
            </span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-chart-1 font-bold mt-1">✓</span>
            <span className="text-foreground">
              E-Mail-Support (Mo-Fr, 9:00-18:00 Uhr)
            </span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-chart-1 font-bold mt-1">✓</span>
            <span className="text-foreground">
              Regelmäßige Updates und neue Features
            </span>
          </div>
        </div>
      </motion.div>

      {/* Payment Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 18,
            delay: 0.3
          }}
          className="bg-card border border-border rounded-lg p-8"
        >
          <h3 className="text-xl font-semibold text-foreground mb-3">
            Zahlungsweise
          </h3>
          <p className="text-muted-foreground">
            Überweisung / Rechnung / PayPal / Kreditkarte
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 18,
            delay: 0.4
          }}
          className="bg-card border border-border rounded-lg p-8"
        >
          <h3 className="text-xl font-semibold text-foreground mb-3">
            Kündigung
          </h3>
          <p className="text-muted-foreground">
            Jederzeit per E-Mail möglich (Frist: 14 Tage zum Monatsende)
          </p>
        </motion.div>
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
        className="bg-warning/10 border border-warning/30 rounded-lg p-8"
      >
        <p className="text-foreground">
          <strong>Hinweis:</strong> Alle Preise verstehen sich inklusive der
          gesetzlichen Mehrwertsteuer (19%). Preisänderungen werden Ihnen
          mindestens 30 Tage im Voraus mitgeteilt.
        </p>
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

