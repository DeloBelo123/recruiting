"use client"

import { motion } from "framer-motion"

interface ContactSectionProps {
  onNext: () => void
  dpaAccepted: boolean
  onDpaChange: (accepted: boolean) => void
  isLast: boolean
}

export default function ContactSection({
  onNext,
  isLast,
}: ContactSectionProps) {
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
          Kontakt & Support
        </motion.h1>

        <p className="text-lg text-foreground leading-relaxed">
          Unser Team steht Ihnen jederzeit zur Verfügung, um Sie bei Ihrem
          Recruiting-Erfolg zu unterstützen. Kontaktieren Sie uns bei Fragen,
          Problemen oder Anregungen.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 18,
            delay: 0.1
          }}
          whileHover={{ scale: 1.02, y: -5 }}
          className="bg-card border border-border rounded-lg p-8 shadow-sm"
        >
          <h3 className="text-xl font-semibold text-primary mb-4">
            Support & Fragen
          </h3>
          <div className="space-y-3 text-foreground">
            <p>
              <strong>E-Mail:</strong>{" "}
              <a
                href="mailto:info@recruitvoiceai.de"
                className="text-primary hover:underline"
              >
                info@recruitvoiceai.de
              </a>
            </p>
            <p>
              <strong>Support-Zeiten:</strong> Mo-Fr, 9:00 - 18:00 Uhr
            </p>
            <p>
              <strong>Antwortzeit:</strong> Innerhalb von 24 Stunden
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 18,
            delay: 0.2
          }}
          whileHover={{ scale: 1.02, y: -5 }}
          className="bg-card border border-border rounded-lg p-8 shadow-sm"
        >
          <h3 className="text-xl font-semibold text-primary mb-4">
            Allgemeine Informationen
          </h3>
          <div className="space-y-3 text-foreground">
            <p>
              <strong>Website:</strong>{" "}
              <a
                href="https://www.recruitvoiceai.de"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                www.recruitvoiceai.de
              </a>
            </p>
            <p>
              <strong>Dokumentation:</strong> Verfügbar im Dashboard
            </p>
            <p>
              <strong>Updates:</strong> Regelmäßige Feature-Updates
            </p>
          </div>
        </motion.div>
      </div>

      <div className="bg-accent/30 border border-accent rounded-lg p-6">
        <h3 className="text-xl font-semibold text-foreground mb-3">
          Wir sind für Sie da
        </h3>
        <p className="text-foreground leading-relaxed">
          Bei Fragen, Problemen oder Anregungen stehen wir Ihnen gerne zur
          Verfügung. Kontaktieren Sie uns jederzeit per E-Mail – wir antworten
          in der Regel innerhalb von 24 Stunden. Unser Ziel ist es, Ihnen die
          bestmögliche Erfahrung mit RecruitAI zu bieten.
        </p>
      </div>

      {!isLast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 18,
            delay: 0.3
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

