'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const testimonials = [
    {
      quote: 'Wir sparen jetzt über 30 Stunden pro Woche im Recruiting. Die AI übernimmt alle Erstgespräche perfekt.',
      author: 'Sarah Müller',
      role: 'Geschäftsführerin',
      company: 'TechRecruit GmbH',
    },
    {
      quote: 'Die Qualität der Qualifizierung ist erstaunlich. Wir haben mehr Zeit für die wirklich wichtigen Kandidaten.',
      author: 'Michael Schmidt',
      role: 'Head of Recruiting',
      company: 'TalentSolutions AG',
    },
    {
      quote: '24/7 Verfügbarkeit war ein Game-Changer. Kandidaten werden sofort kontaktiert, keine Wartezeiten mehr.',
      author: 'Lisa Weber',
      role: 'Recruiting Manager',
      company: 'HR Experts Berlin',
    },
  ];

  return (
    <section className="py-12 lg:py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Was unsere{' '}
            <span className="text-primary">Kunden</span>{' '}
            sagen
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Recruiting-Agenturen vertrauen auf unsere Voice-AI
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.1 + index * 0.05, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-card border border-border rounded-xl p-8"
            >
              <div className="text-4xl text-primary mb-4">"</div>
              <p className="text-muted-foreground mb-6 italic">{testimonial.quote}</p>
              <div>
                <div className="font-semibold text-foreground">{testimonial.author}</div>
                <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                <div className="text-sm text-muted-foreground">{testimonial.company}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

