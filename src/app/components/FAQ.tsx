'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Wie funktioniert die CSV-Integration?',
      answer: 'Du exportierst einfach deine Kandidatenliste und Requirements aus deinem CRM oder ATS als CSV-Datei und sendest sie an csv@recruitvoiceai.de. Die AI übernimmt dann automatisch alle Anrufe.',
    },
    {
      question: 'Kann die AI wirklich vollständige Gespräche führen?',
      answer: 'Ja, unsere Voice-AI führt natürliche Gespräche mit Kandidaten. Bei komplexen Fragen kann sie automatisch zu einem Mitarbeiter weiterleiten.',
    },
    {
      question: 'Wie werden Kandidaten qualifiziert?',
      answer: 'Die AI vergleicht die Antworten der Kandidaten mit deinen Requirements aus der CSV-Datei. Du erhältst sofort eine Bewertung und kannst fundierte Entscheidungen treffen.',
    },
    {
      question: 'Ist die AI wirklich 24/7 verfügbar?',
      answer: 'Ja, die AI arbeitet rund um die Uhr. Du kannst Anrufe zu jeder Zeit planen, auch außerhalb der Geschäftszeiten.',
    },
    {
      question: 'Welche CRMs und ATS werden unterstützt?',
      answer: 'Wir unterstützen alle gängigen Systeme in Deutschland wie Personio, Haufe XING Recruiting, Talentsoft und viele mehr. Wichtig ist nur, dass du CSV-Dateien exportieren kannst.',
    },
    {
      question: 'Wie viel Zeit spare ich wirklich?',
      answer: 'Unsere Kunden berichten von einer Zeitersparnis von über 140%. Das bedeutet, du hast deutlich mehr Zeit für strategische Aufgaben und die wirklich wichtigen Kandidaten.',
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Häufig gestellte{' '}
            <span className="text-primary">Fragen</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Alles was du über unsere Voice-AI wissen musst
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              className="bg-card border border-border rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-muted/30 transition-colors"
              >
                <span className="font-semibold text-foreground pr-8">{faq.question}</span>
                <motion.svg
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-5 h-5 text-primary flex-shrink-0"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M19 9l-7 7-7-7" />
                </motion.svg>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-muted-foreground">{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

