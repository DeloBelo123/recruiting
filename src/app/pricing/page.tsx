'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Toast } from '../components/Toast';

const plans = [
  {
    name: 'Starter',
    basePrice: 99,
    includedMinutes: 500,
    pricePerMinute: 0.5,
    description: 'Perfekt für kleine Teams',
    features: [
      '500 Minuten inklusive',
      'Automatische Anrufe',
      'CSV-Integration',
      'Basis-Analyse & Reports',
      'E-Mail Support',
    ],
    popular: false,
  },
  {
    name: 'Professional',
    basePrice: 299,
    includedMinutes: 2000,
    pricePerMinute: 0.35,
    description: 'Für wachsende Recruiting-Teams',
    features: [
      '2000 Minuten inklusive',
      'Automatische Anrufe',
      'CSV-Integration',
      'Erweiterte Analyse & KI-Insights',
      'Prioritäts-Support',
      'Custom Requirements',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    basePrice: 'Custom',
    includedMinutes: 'Unbegrenzt',
    pricePerMinute: 'Custom',
    description: 'Für große Organisationen',
    features: [
      'Unbegrenzte Minuten',
      'Alle Professional Features',
      'Dedicated Account Manager',
      'Custom Integrationen',
      'SLA-Garantie',
      'Onboarding & Training',
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
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.34, 1.56, 0.64, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className={`relative bg-card border rounded-xl p-8 ${
        plan.popular
          ? 'border-primary shadow-lg scale-105 lg:scale-110 border-2'
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
        <div className="mb-4">
          {plan.basePrice === 'Custom' ? (
            <div className="text-4xl font-bold text-foreground">Auf Anfrage</div>
          ) : (
            <>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-4xl font-bold text-foreground">{plan.basePrice}€</span>
                <span className="text-muted-foreground">/Monat</span>
              </div>
              <div className="text-sm text-muted-foreground mt-2">
                {plan.includedMinutes} Min. inklusive
              </div>
              <div className="text-sm text-muted-foreground">
                Danach {plan.pricePerMinute}€/Minute
              </div>
            </>
          )}
        </div>
      </div>

      <ul className="space-y-4 mb-8">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-primary mt-0.5 shrink-0"
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
        href={plan.basePrice === 'Custom' ? '/kontakt' : '#pricing-form'}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`block w-full text-center py-3 rounded-lg font-semibold transition-colors ${
          plan.popular
            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
        }`}
      >
        {plan.basePrice === 'Custom' ? 'Kontakt aufnehmen' : 'Jetzt starten'}
      </motion.a>
    </motion.div>
  );
}

function PilotOffer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
      className="bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/30 rounded-2xl p-8 lg:p-12 mb-1"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
            Pilot-Kunden Angebot
          </span>
          <span className="text-2xl font-bold text-chart-1">50% Rabatt</span>
        </div>
        <h3 className="text-3xl font-bold text-foreground mb-4">
          Werde einer unserer ersten Kunden
        </h3>
        <p className="text-lg text-muted-foreground mb-6">
          Als Pilot-Kunde erhältst du <strong>3 Monate lang 50% Rabatt</strong> auf alle Pläne. 
          Im Gegenzug teilst du uns regelmäßig Feedback mit (1-3 Calls pro Monat) und hilfst 
          uns, die beste Voice-AI für Recruiting-Agenturen zu entwickeln.
        </p>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="flex items-start gap-3">
            <svg
              className="w-6 h-6 text-primary mt-0.5 shrink-0"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <div className="font-semibold text-foreground">50% Rabatt</div>
              <div className="text-sm text-muted-foreground">Für 3 Monate auf alle Pläne</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <svg
              className="w-6 h-6 text-primary mt-0.5 shrink-0"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <div className="font-semibold text-foreground">1-3 Feedback-Calls</div>
              <div className="text-sm text-muted-foreground">Pro Monat für kontinuierliche Verbesserung</div>
            </div>
          </div>
        </div>
        <motion.a
          href="#pricing-form"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-lg"
        >
          Pilot-Kunde werden
        </motion.a>
      </div>
    </motion.div>
  );
}

function PricingForm() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
  });
  const [showToast, setShowToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/submit-pricing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ name: '', company: '', email: '', phone: '' });
        setShowToast(true);
      } else {
        const error = await response.json();
        console.error('Error:', error);
        alert('Fehler beim Absenden. Bitte versuche es erneut.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Fehler beim Absenden. Bitte versuche es erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="pricing-form" className="py-12 lg:py-12 bg-background">
      <Toast
        message="Preisvereinbarung erfolgreich abgesendet!"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
            transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-center">
            Individuelle Preisvereinbarung
          </h2>
          <p className="text-xl text-muted-foreground mb-12 text-center">
            Lass uns gemeinsam die beste Lösung für dein Unternehmen finden
          </p>

          <form onSubmit={handleSubmit} className="bg-card border-2 border-primary/20 rounded-xl p-8 space-y-6 shadow-sm">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-background border-2 border-primary/20 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                Unternehmen *
              </label>
              <input
                type="text"
                id="company"
                required
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-3 bg-background border-2 border-primary/20 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                E-Mail *
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-background border-2 border-primary/20 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                Telefon *
              </label>
              <input
                type="tel"
                id="phone"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 bg-background border-2 border-primary/20 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              className="w-full px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Wird gesendet...' : 'Anfrage senden'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

export default function Pricing() {
  return (
    <>
      <Header />
      <section className="py-20 lg:py-32 bg-background pt-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              Transparente{' '}
              <span className="text-primary">Preise</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Wähle den Plan, der zu deinem Team passt. Jederzeit upgraden oder downgraden.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {plans.map((plan, index) => (
              <PricingCard key={plan.name} plan={plan} index={index} />
            ))}
          </div>

          <PilotOffer />
        </div>
      </section>

      <PricingForm />
      <Footer />
    </>
  );
}

