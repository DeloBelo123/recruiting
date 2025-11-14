"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

interface DPASectionProps {
  onNext: () => void
  dpaAccepted: boolean
  onDpaChange: (accepted: boolean) => void
  isLast: boolean
}

export default function DPASection({
  onNext,
  dpaAccepted,
  onDpaChange,
  isLast,
}: DPASectionProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  // Optional: Send DPA acceptance to backend
  useEffect(() => {
    if (dpaAccepted) {
      const customerName = localStorage.getItem("customer_name")
      fetch("/api/onboarding/dpa-acceptance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName,
          accepted: true,
          timestamp: new Date().toISOString(),
        }),
      }).catch((error) => {
        console.error("Failed to save DPA acceptance:", error)
        // Don't show error to user, localStorage is sufficient
      })
    }
  }, [dpaAccepted])

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget
    const scrolled = target.scrollTop > 100
    setIsScrolled(scrolled)
  }

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
          Datenschutz & Datenverarbeitung
        </motion.h1>

        <p className="text-lg text-foreground leading-relaxed">
          Dieses Data Processing Agreement (DPA) regelt die Verarbeitung
          personenbezogener Daten im Rahmen der Nutzung von RecruitAI gemäß der
          Datenschutz-Grundverordnung (DSGVO) und dem Bundesdatenschutzgesetz
          (BDSG).
        </p>
      </div>

      {/* DPA Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 18,
          delay: 0.1
        }}
        className="bg-card border border-border rounded-lg p-8 max-h-96 overflow-y-auto"
        onScroll={handleScroll}
      >
        <div className="space-y-6 text-foreground">
          <section>
            <h3 className="text-xl font-semibold text-primary mb-3">
              1. Verantwortlicher und Verarbeiter
            </h3>
            <p className="mb-2">
              <strong>Verantwortlicher:</strong> [Kundenfirma / Ansprechpartner]
            </p>
            <p className="mb-2">
              <strong>Verarbeiter:</strong> RecruitAI
            </p>
            <p>
              RecruitAI verarbeitet personenbezogene Daten im Auftrag des
              Verantwortlichen gemäß Art. 28 DSGVO.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-primary mb-3">
              2. Gegenstand und Zweck der Datenverarbeitung
            </h3>
            <p className="mb-2">
              Die Datenverarbeitung erfolgt ausschließlich zum Zweck der
              Durchführung von KI-gestützten Recruiting-Calls zur
              Qualifizierung von Kandidaten. Die Verarbeitung dient der:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>
                Automatisierten Analyse von Kandidatenprofilen basierend auf
                bereitgestellten CSV-Daten
              </li>
              <li>
                Durchführung von strukturierten Voice-Calls zur
                Vorqualifizierung von Kandidaten
              </li>
              <li>
                Erstellung von Qualifizierungsberichten und Analytics für den
                Verantwortlichen
              </li>
              <li>
                Bereitstellung eines Dashboards zur Verwaltung und Analyse der
                Recruiting-Daten
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-primary mb-3">
              3. Art der verarbeiteten Daten
            </h3>
            <p className="mb-2">Folgende personenbezogene Daten werden verarbeitet:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>
                <strong>Identifikationsdaten:</strong> Name, Vorname des
                Kandidaten
              </li>
              <li>
                <strong>Kontaktdaten:</strong> E-Mail-Adresse, Telefonnummer
              </li>
              <li>
                <strong>Berufsdaten:</strong> Job-Titel, Position,
                Berufserfahrung, Kompetenzen/Skills
              </li>
              <li>
                <strong>Bewertungsdaten:</strong> Ergebnisse der KI-Analyse,
                Qualifizierungsstatus, Interview-Notizen
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-primary mb-3">
              4. Dauer der Datenverarbeitung
            </h3>
            <p className="mb-2">
              Die Datenverarbeitung erfolgt für die Dauer des Testlaufs / MVP
              und endet mit der Kündigung des Vertrags oder der Beendigung der
              Zusammenarbeit.
            </p>
            <p>
              <strong>Löschung der Daten:</strong> Nach Abschluss des
              Testlaufs / MVP oder bei Beendigung des Vertrags werden alle
              personenbezogenen Daten vollständig und unwiderruflich gelöscht,
              es sei denn eine längere Speicherung ist gesetzlich vorgeschrieben
              oder Sie haben ausdrücklich einer längeren Speicherung
              zugestimmt.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-primary mb-3">
              5. Technische und organisatorische Maßnahmen (TOM)
            </h3>
            <p className="mb-2">
              RecruitAI setzt folgende technische und organisatorische Maßnahmen
              zum Schutz der personenbezogenen Daten ein:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>
                <strong>Verschlüsselung:</strong> Alle Daten werden während der
                Übertragung (TLS 1.3) und im Ruhezustand (AES-256) verschlüsselt
                gespeichert
              </li>
              <li>
                <strong>Zugriffskontrolle:</strong> Zugriff auf Daten nur für
                autorisierte RecruitAI-Mitarbeiter mit entsprechenden
                Berechtigungen
              </li>
              <li>
                <strong>Authentifizierung:</strong> Mehrstufige Authentifizierung
                für alle Systemzugriffe
              </li>
              <li>
                <strong>Datenintegrität:</strong> Regelmäßige Backups und
                Integritätsprüfungen
              </li>
              <li>
                <strong>Weitergabe:</strong> Keine Weitergabe an Dritte ohne
                ausdrückliche Zustimmung des Verantwortlichen
              </li>
              <li>
                <strong>Sicherheitsüberprüfungen:</strong> Regelmäßige
                Sicherheitsaudits und Penetrationstests
              </li>
              <li>
                <strong>DSGVO-Compliance:</strong> Einhaltung aller relevanten
                DSGVO-Standards und Best Practices
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-primary mb-3">
              6. Rechte der betroffenen Personen
            </h3>
            <p className="mb-2">
              Die betroffenen Personen haben gemäß DSGVO folgende Rechte:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>
                <strong>Auskunftsrecht (Art. 15 DSGVO):</strong> Recht auf
                Auskunft über die verarbeiteten Daten
              </li>
              <li>
                <strong>Berichtigungsrecht (Art. 16 DSGVO):</strong> Recht auf
                Berichtigung unrichtiger Daten
              </li>
              <li>
                <strong>Löschungsrecht (Art. 17 DSGVO):</strong> Recht auf
                Löschung der Daten (&quot;Recht auf Vergessenwerden&quot;)
              </li>
              <li>
                <strong>Einschränkungsrecht (Art. 18 DSGVO):</strong> Recht auf
                Einschränkung der Verarbeitung
              </li>
              <li>
                <strong>Datenübertragbarkeit (Art. 20 DSGVO):</strong> Recht
                auf Datenübertragung in einem strukturierten Format
              </li>
              <li>
                <strong>Widerspruchsrecht (Art. 21 DSGVO):</strong> Recht auf
                Widerspruch gegen die Verarbeitung
              </li>
            </ul>
            <p className="mt-3">
              Zur Ausübung dieser Rechte kontaktieren Sie uns bitte unter:{" "}
              <strong>info@recruitvoiceai.de</strong>
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-primary mb-3">
              7. Auftragsverarbeitung gemäß Art. 28 DSGVO
            </h3>
            <p className="mb-2">
              RecruitAI verarbeitet die Daten als Auftragsverarbeiter im Auftrag
              des Verantwortlichen. Wir verpflichten uns:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>
                Die Daten ausschließlich nach den Weisungen des Verantwortlichen
                zu verarbeiten
              </li>
              <li>
                Die Vertraulichkeit der Daten zu wahren und keine Daten für
                eigene Zwecke zu nutzen
              </li>
              <li>
                Keine Daten an Dritte weiterzugeben, es sei denn, dies ist
                gesetzlich vorgeschrieben oder vom Verantwortlichen ausdrücklich
                genehmigt
              </li>
              <li>
                Bei Beendigung des Auftrags alle Daten zu löschen oder an den
                Verantwortlichen zurückzugeben
              </li>
              <li>Den Verantwortlichen über Datenschutzvorfälle zu informieren</li>
              <li>
                Dem Verantwortlichen bei Datenschutzprüfungen zu assistieren
              </li>
            </ul>
          </section>
        </div>
      </motion.div>

      {/* Checkbox */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 18,
          delay: 0.2
        }}
        className="bg-card border border-border rounded-lg p-8"
      >
        <label className="flex items-start gap-4 cursor-pointer group">
          <motion.input
            type="checkbox"
            checked={dpaAccepted}
            onChange={(e) => onDpaChange(e.target.checked)}
            className="mt-1 w-5 h-5 rounded border-2 border-primary text-primary focus:ring-2 focus:ring-primary cursor-pointer"
            whileTap={{ scale: 0.9 }}
          />
          <div className="flex-1">
            <span className="text-foreground font-medium block">
              Ich habe das Data Processing Agreement gelesen und stimme der
              Datenverarbeitung gemäß DPA zu.
            </span>
            <span className="text-sm text-muted-foreground block mt-1">
              Diese Zustimmung ist erforderlich, um fortzufahren.
            </span>
          </div>
        </label>
      </motion.div>

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
            whileHover={{ scale: dpaAccepted ? 1.05 : 1 }}
            whileTap={{ scale: dpaAccepted ? 0.95 : 1 }}
            onClick={onNext}
            disabled={!dpaAccepted}
            className={`px-10 py-4 rounded-lg text-lg font-semibold transition-all shadow-md ${
              dpaAccepted
                ? "bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
                : "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
            }`}
          >
            Weiter
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  )
}

