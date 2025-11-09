'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Availability() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-12 lg:py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              24/7{' '}
              <span className="text-primary">Verfügbar</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Unsere Voice-AI arbeitet rund um die Uhr. Plane Anrufe zu jeder Zeit, 
              auch außerhalb der Geschäftszeiten. Kandidaten werden nie mehr warten müssen.
            </p>
            <ul className="space-y-4">
              {[
                'Anrufe zu jeder Tages- und Nachtzeit',
                'Planbare Termine für Kandidaten',
                'Keine Wartezeiten mehr',
                'Automatische Terminvereinbarung',
              ].map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.1 + index * 0.05, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                  className="flex items-start gap-3"
                >
                  <svg
                    className="w-6 h-6 text-primary mt-0.5 flex-shrink-0"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-lg text-foreground">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative"
          >
            <div className="bg-card border border-border rounded-2xl p-8 shadow-xl">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-chart-1 rounded-full animate-pulse" />
                    <span className="text-sm font-medium text-foreground">Live</span>
                  </div>
                  <span className="text-sm text-muted-foreground">24/7 Aktiv</span>
                </div>
                <div className="space-y-4">
                  {[
                    { time: '08:00', name: 'Max Mustermann', status: 'Qualifiziert' },
                    { time: '14:30', name: 'Anna Schmidt', status: 'In Gespräch' },
                    { time: '22:15', name: 'Tom Weber', status: 'Termin geplant' },
                  ].map((call, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                      transition={{ delay: 0.2 + index * 0.05, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                      className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
                    >
                      <div>
                        <div className="font-medium text-foreground">{call.name}</div>
                        <div className="text-sm text-muted-foreground">{call.time} Uhr</div>
                      </div>
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                        {call.status}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

