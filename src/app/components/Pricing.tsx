'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const plans = [
  {
    name: 'Basic',
    price: '99',
    period: 'Monat',
    description: 'Perfekt für kleine Teams',
    features: [
      'Bis zu 50 Interviews/Monat',
      'Basis-Analyse & Reports',
      'E-Mail Support',
      'Standard-Integrationen',
    ],
    popular: false,
  },
  {
    name: 'Pro',
    price: '299',
    period: 'Monat',
    description: 'Für wachsende Recruiting-Teams',
    features: [
      'Bis zu 200 Interviews/Monat',
      'Erweiterte Analyse & KI-Insights',
      'Prioritäts-Support',
      'Alle Integrationen',
      'Custom Branding',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Für große Organisationen',
    features: [
      'Unbegrenzte Interviews',
      'Premium AI-Analyse',
      'Dedicated Account Manager',
      'Custom Integrationen',
      'On-Premise Option',
      'SLA-Garantie',
    ],
    popular: false,
  },
];

function PricingCard({ plan, index }: { plan: typeof plans[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className={`relative bg-card border rounded-xl p-8 ${
        plan.popular
          ? 'border-primary shadow-lg scale-105 lg:scale-110'
          : 'border-border'
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
            Beliebt
          </span>
        </div>
      )}

      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
        <p className="text-muted-foreground mb-4">{plan.description}</p>
        <div className="flex items-baseline justify-center gap-2">
          <span className="text-4xl font-bold text-foreground">{plan.price}</span>
          {plan.period && <span className="text-muted-foreground">€/{plan.period}</span>}
        </div>
      </div>

      <ul className="space-y-4 mb-8">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-primary mt-0.5 flex-shrink-0"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-muted-foreground">{feature}</span>
          </li>
        ))}
      </ul>

      <motion.a
        href="#contact"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`block w-full text-center py-3 rounded-lg font-semibold transition-colors ${
          plan.popular
            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
        }`}
      >
        {plan.price === 'Custom' ? 'Kontakt aufnehmen' : 'Jetzt starten'}
      </motion.a>
    </motion.div>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Transparente Preise
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Wähle den Plan, der zu deinem Team passt. Jederzeit upgraden oder downgraden.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard key={plan.name} plan={plan} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

