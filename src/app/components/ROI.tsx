'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function ROI() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-12 lg:py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Spare{' '}
            <span className="text-primary">Tausende Euro</span>{' '}
            pro Monat
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Durch Automatisierung reduzierst du Personalkosten und kannst dich auf das Wesentliche konzentrieren
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: 'Personalkosten',
                before: '€8.000/Monat',
                after: '€2.000/Monat',
                savings: '€6.000',
              },
              {
                title: 'Zeitaufwand',
                before: '40h/Woche',
                after: '10h/Woche',
                savings: '30h',
              },
              {
                title: 'Kandidaten pro Monat',
                before: '50',
                after: '200+',
                savings: '4x mehr',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 0.1 + index * 0.05, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                className="bg-card border border-border rounded-xl p-6"
              >
                <h3 className="text-lg font-semibold text-foreground mb-4">{item.title}</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Vorher:</span>
                    <span className="text-sm font-medium text-foreground line-through">{item.before}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Nachher:</span>
                    <span className="text-sm font-medium text-primary">{item.after}</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-border">
                  <div className="text-2xl font-bold text-chart-1">{item.savings}</div>
                  <div className="text-xs text-muted-foreground">Ersparnis</div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.a
            href="/pricing"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.25, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-10 py-5 bg-primary text-primary-foreground rounded-xl font-semibold text-lg hover:bg-primary/90 transition-all shadow-xl"
          >
            Jetzt Kosten sparen
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

