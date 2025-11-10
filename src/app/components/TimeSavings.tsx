'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function TimeSavings() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-12 lg:py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Im Recruiting{' '}
            <span className="text-primary">140% Zeit</span>{' '}
            Sparen
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Unsere Voice-AI übernimmt die zeitaufwändigsten Aufgaben im Recruiting-Prozess. 
            Agenturen berichten von einer dramatischen Effizienzsteigerung.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-16">
            {[
              {
                title: 'Keine manuellen Anrufe mehr',
                description: 'Die AI ruft automatisch alle Kandidaten aus deiner CSV-Datei an – rund um die Uhr.',
                icon: '📞',
              },
              {
                title: 'Automatische Qualifizierung',
                description: 'Kandidaten werden anhand deiner Requirements-CSV automatisch bewertet und kategorisiert.',
                icon: '✅',
              },
              {
                title: 'Vollständige Gespräche',
                description: 'Die AI führt natürliche Gespräche und kann bei Bedarf zu Mitarbeitern weiterleiten.',
                icon: '💬',
              },
              {
                title: 'Sofortige Ergebnisse',
                description: 'Erhalte sofort verwertbare Daten und Statistiken über alle Anrufe und Qualifizierungen.',
                icon: '📊',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 0.1 + index * 0.05, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

