'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const steps = [
  {
    number: '01',
    title: 'Setup & Konfiguration',
    description: 'Verbinde dein Recruiting-System und konfiguriere den AI-Agenten mit deinen Anforderungen und Fragen.',
  },
  {
    number: '02',
    title: 'Automatische Anrufe',
    description: 'Der Agent ruft Kandidaten automatisch an, führt strukturierte Interviews und stellt relevante Fragen.',
  },
  {
    number: '03',
    title: 'Echtzeit-Analyse',
    description: 'Während des Gesprächs analysiert der Agent Antworten, Tonfall und Kommunikationsfähigkeiten in Echtzeit.',
  },
  {
    number: '04',
    title: 'Detaillierte Reports',
    description: 'Erhalte sofort umfassende Reports mit Bewertungen, Transkripten und Handlungsempfehlungen.',
  },
];

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative"
    >
      <div className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-shadow">
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-lg flex items-center justify-center text-2xl font-bold">
              {step.number}
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
            <p className="text-muted-foreground">{step.description}</p>
          </div>
        </div>
      </div>
      {index < steps.length - 1 && (
        <div className="hidden lg:block absolute left-1/2 top-full w-0.5 h-16 bg-border transform -translate-x-1/2" />
      )}
    </motion.div>
  );
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            So funktioniert's
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            In vier einfachen Schritten zu automatisiertem Recruiting
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8 lg:space-y-0">
          <div className="grid lg:grid-cols-2 gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                <StepCard step={step} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

