'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const features = [
  {
    title: 'Automatische Calls aus CSV',
    description: 'Die AI ruft automatisch alle Kandidaten aus deiner CRM/ATS CSV-Datei an. Einfach exportieren und senden – der Rest läuft automatisch.',
    icon: (
      <svg className="w-8 h-8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: 'Qualifizierung anhand Requirements',
    description: 'Die AI qualifiziert Kandidaten automatisch basierend auf deiner Requirements-CSV. Du definierst die Kriterien, die AI prüft sie.',
    icon: (
      <svg className="w-8 h-8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Vollständige Gespräche',
    description: 'Die AI führt natürliche, vollständige Gespräche mit Kandidaten. Bei komplexen Fragen leitet sie automatisch zu Mitarbeitern weiter.',
    icon: (
      <svg className="w-8 h-8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
  },
  {
    title: '24/7 Verfügbar & Planbar',
    description: 'Die AI arbeitet rund um die Uhr. Plane Anrufe zu jeder Zeit, auch außerhalb der Geschäftszeiten. Kandidaten werden nie mehr warten müssen.',
    icon: (
      <svg className="w-8 h-8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Sofortige Auswertung',
    description: 'Erhalte sofort detaillierte Reports mit Bewertungen, Transkripten und Statistiken. Alle Daten übersichtlich im Dashboard.',
    icon: (
      <svg className="w-8 h-8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: 'Nahtlose Integration',
    description: 'Funktioniert mit allen gängigen CRMs und ATS-Systemen in Deutschland. Einfach CSV exportieren – mehr brauchst du nicht.',
    icon: (
      <svg className="w-8 h-8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.34, 1.56, 0.64, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
    >
      <div className="w-14 h-14 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4">
        {feature.icon}
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
      <p className="text-muted-foreground">{feature.description}</p>
    </motion.div>
  );
}

export default function Features() {
  return (
    <section id="features" className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Was unsere{' '}
            <span className="text-primary">Voice-AI</span>{' '}
            kann
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Automatisiere deinen kompletten Recruiting-Prozess – von CSV-Import bis zur Qualifizierung
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

