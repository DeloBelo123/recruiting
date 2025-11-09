'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Statistics() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const stats = [
    { value: '140%', label: 'Zeitersparnis', description: 'Mehr Zeit für strategische Aufgaben' },
    { value: '50%', label: 'Kosteneinsparung', description: 'Weniger Personalkosten im Recruiting' },
    { value: '24/7', label: 'Verfügbarkeit', description: 'Anrufe zu jeder Zeit möglich' },
    { value: '3x', label: 'Mehr Kandidaten', description: 'Durch Automatisierung mehr Gespräche' },
  ];

  return (
    <section className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Zahlen, die{' '}
            <span className="text-primary">überzeugen</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Recruiting-Agenturen berichten von dramatischen Verbesserungen durch unsere Voice-AI
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.1 + index * 0.05, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-card border border-border rounded-xl p-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ delay: 0.15 + index * 0.05, type: 'spring', stiffness: 300, damping: 20 }}
                className="text-5xl lg:text-6xl font-bold text-primary mb-3"
              >
                {stat.value}
              </motion.div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{stat.label}</h3>
              <p className="text-sm text-muted-foreground">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

