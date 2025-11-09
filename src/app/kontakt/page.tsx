'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ContactInfo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const contactMethods = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: 'E-Mail',
      value: 'info@recruitvoiceai.de',
      link: 'mailto:info@recruitvoiceai.de',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: 'Telefon',
      value: '0176 20620226',
      link: 'tel:+4917620620226',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: 'Erreichbarkeitszeiten',
      value: 'Mo-Fr: 15:00-21:00 Uhr\nDonnerstags: 17:00-21:00 Uhr',
      link: null,
    },
  ];

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Kontakt
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Wir sind für dich da – melde dich einfach bei uns
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.1 + index * 0.05, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-card border border-border rounded-xl p-10 text-center"
            >
              <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="scale-125">
                  {method.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">{method.label}</h3>
              {method.link ? (
                <a
                  href={method.link}
                  className="text-primary hover:underline block whitespace-pre-line text-lg"
                >
                  {method.value}
                </a>
              ) : (
                <p className="text-muted-foreground whitespace-pre-line text-lg">{method.value}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const values = [
    {
      title: 'Kundenzufriedenheit',
      description: 'Dein Erfolg ist unser Erfolg. Wir stehen dir jederzeit zur Seite und entwickeln unsere Lösung kontinuierlich weiter.',
      icon: '❤️',
    },
    {
      title: 'Effizienz',
      description: 'Wir glauben daran, dass Recruiting-Agenturen sich auf das Wesentliche konzentrieren sollten – nicht auf repetitive Aufgaben.',
      icon: '⚡',
    },
    {
      title: 'Innovation',
      description: 'Wir nutzen die neueste KI-Technologie, um Recruiting zu revolutionieren und dir einen echten Wettbewerbsvorteil zu verschaffen.',
      icon: '🚀',
    },
  ];

  return (
    <section id="about" ref={ref} className="py-10 lg:py-10 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              Über{' '}
              <span className="text-primary">uns</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Wir machen Recruiting einfacher, schneller und effizienter
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.1, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            className="bg-card border border-border rounded-xl p-8 lg:p-12 mb-12"
          >
            <h3 className="text-2xl font-bold text-foreground mb-4">Unsere Mission</h3>
            <p className="text-lg text-muted-foreground mb-6">
              Wir entwickeln Voice-AI-Lösungen, die Recruiting-Agenturen dabei helfen, Zeit zu sparen, 
              Kosten zu reduzieren und sich auf das zu konzentrieren, was wirklich wichtig ist: 
              Die richtigen Kandidaten für die richtigen Positionen zu finden.
            </p>
            <p className="text-lg text-muted-foreground">
              Durch Automatisierung der zeitaufwändigsten Aufgaben im Recruiting-Prozess ermöglichen 
              wir es Agenturen, mehr Kandidaten zu erreichen, bessere Qualifizierungen durchzuführen 
              und letztendlich erfolgreichere Placements zu machen.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 0.2 + index * 0.05, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                className="bg-card border border-border rounded-xl p-6"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h4 className="text-xl font-semibold text-foreground mb-3">{value.title}</h4>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.35, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            className="bg-card border border-border rounded-xl p-8 lg:p-12"
          >
            <h3 className="text-2xl font-bold text-foreground mb-4">Was uns wichtig ist</h3>
            <ul className="space-y-4">
              {[
                'Die Zufriedenheit unserer Kunden steht an erster Stelle',
                'Wir entwickeln unsere Lösung kontinuierlich basierend auf Feedback weiter',
                'Transparenz in allen Bereichen – von Preisen bis zu Prozessen',
                'Einfachheit – unsere Lösung soll so einfach wie möglich zu nutzen sein',
                'Ergebnisse – wir messen unseren Erfolg am Erfolg unserer Kunden',
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.4 + index * 0.05, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
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
                  <span className="text-muted-foreground">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logik wird später implementiert
    console.log('Contact form submitted:', formData);
  };

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Schreib uns eine Nachricht
          </h2>

          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-8 space-y-6">
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium text-foreground mb-2">
                Name *
              </label>
              <input
                type="text"
                id="contact-name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium text-foreground mb-2">
                E-Mail *
              </label>
              <input
                type="email"
                id="contact-email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-sm font-medium text-foreground mb-2">
                Nachricht *
              </label>
              <textarea
                id="contact-message"
                required
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Nachricht senden
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

export default function Kontakt() {
  return (
    <>
      <Header />
      <ContactInfo />
      <AboutUs />
      <ContactForm />
      <Footer />
    </>
  );
}

