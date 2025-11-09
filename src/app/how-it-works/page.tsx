'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function NavigationTabs({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) {
  return (
    <div className="sticky top-20 z-40 bg-background/95 backdrop-blur-sm border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-2 justify-center">
          {[
            { id: 'flow', label: 'Flow' },
            { id: 'dashboard', label: 'Dashboard' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                const element = document.getElementById(tab.id);
                element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className={`px-8 py-4 font-medium transition-all relative rounded-t-lg ${
                activeTab === tab.id
                  ? 'text-primary bg-primary/5'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function FlowSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const crmSystems = [
    { name: 'Personio', description: 'Eines der führenden HR-Systeme in Deutschland' },
    { name: 'Haufe XING Recruiting', description: 'Beliebtes ATS für Recruiting-Agenturen' },
    { name: 'Talentsoft', description: 'Umfassendes Talent-Management-System' },
    { name: 'Recruitee', description: 'Moderne ATS-Plattform' },
    { name: 'BambooHR', description: 'Cloud-basiertes HR-System' },
  ];

  const steps = [
    {
      number: '01',
      title: 'CSV-Dateien exportieren',
      description: 'Exportiere deine Kandidatenliste und Requirements aus deinem CRM oder ATS als CSV-Datei.',
      details: [
        'Öffne dein CRM/ATS-System',
        'Navigiere zur Kandidaten-Tabelle',
        'Wähle "Exportieren" oder "Als CSV speichern"',
        'Wiederhole den Prozess für die Requirements-Tabelle',
      ],
    },
    {
      number: '02',
      title: 'CSV-Dateien senden',
      description: 'Sende die CSV-Dateien an csv@recruitvoiceai.de',
      details: [
        'Öffne dein E-Mail-Programm',
        'Erstelle eine neue Nachricht an csv@recruitvoiceai.de',
        'Füge beide CSV-Dateien als Anhang hinzu',
        'Beschreibe kurz den Job-Titel oder die Position',
        'Sende die E-Mail ab',
      ],
    },
    {
      number: '03',
      title: 'AI startet automatisch',
      description: 'Die AI beginnt automatisch mit den Anrufen basierend auf deinen Daten.',
      details: [
        'Die AI importiert deine Kandidatenliste',
        'Sie vergleicht Kandidaten mit deinen Requirements',
        'Automatische Anrufe werden gestartet',
        'Du erhältst Updates im Dashboard',
      ],
    },
  ];

  return (
    <section id="flow" ref={ref} className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            So funktioniert der{' '}
            <span className="text-primary">Workflow</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            In drei einfachen Schritten zu automatisiertem Recruiting
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ delay: 0.1 + index * 0.1, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative"
            >
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-primary/10 text-primary rounded-xl flex items-center justify-center text-3xl font-bold">
                    {step.number}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-foreground mb-3">{step.title}</h3>
                  <p className="text-lg text-muted-foreground mb-6">{step.description}</p>
                  <div className="bg-card border border-border rounded-lg p-6 space-y-3">
                    {step.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-sm font-medium">
                          {detailIndex + 1}
                        </div>
                        <span className="text-muted-foreground">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute left-10 top-24 w-0.5 h-16 bg-border" />
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 0.4, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
            Unterstützte CRM/ATS-Systeme
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {crmSystems.map((system, index) => (
              <motion.div
                key={system.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ delay: 0.5 + index * 0.05, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                className="bg-card border border-border rounded-lg p-4 text-center"
              >
                <div className="font-semibold text-foreground mb-1">{system.name}</div>
                <div className="text-sm text-muted-foreground">{system.description}</div>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-muted-foreground mt-6">
            <strong>Wichtig:</strong> Jedes System, das CSV-Export unterstützt, funktioniert mit unserer AI.
            <br />
            Sende einfach deine CSV-Dateien an{' '}
            <a href="mailto:csv@recruitvoiceai.de" className="text-primary hover:underline">
              csv@recruitvoiceai.de
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function DashboardSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const dashboardFeatures = [
    {
      title: 'Data Table',
      description: 'Übersicht aller Anrufe und Kandidaten',
      features: [
        'Vollständige Liste aller Kandidaten',
        'Status-Anzeige (Qualifiziert, Nicht qualifiziert)',
        'Interview-Status',
        'Job-Titel und Erfahrungsjahre',
        'Kontaktinformationen',
        'Filter- und Sortierfunktionen',
      ],
      purpose: 'Die Data Table gibt dir einen vollständigen Überblick über alle Anrufe und deren Ergebnisse. Du siehst auf einen Blick, welche Kandidaten qualifiziert sind und welche nächsten Schritte anstehen.',
    },
    {
      title: 'Search',
      description: 'Schnelle Suche nach Kandidaten',
      features: [
        'Suche nach Name, ID oder Email',
        'Suche nach Job-Titel',
        'Suche nach Kompetenzen',
        'Echtzeit-Filterung',
        'Detaillierte Kandidaten-Ansicht',
      ],
      purpose: 'Mit der Search-Funktion findest du schnell jeden Kandidaten. Durchsuche alle Daten nach verschiedenen Kriterien und öffne detaillierte Informationen mit einem Klick.',
    },
    {
      title: 'Analytics',
      description: 'Statistiken und Auswertungen',
      features: [
        'Gesamtanzahl Kandidaten',
        'Qualifizierungsrate in Prozent',
        'Interview-Planungs-Status',
        'Durchschnittliche Erfahrungsjahre',
        'Verteilung nach Job-Titel',
        'Qualifizierungsrate pro Position',
      ],
      purpose: 'Die Analytics-Seite zeigt dir alle wichtigen KPIs auf einen Blick. Verfolge deine Recruiting-Performance, identifiziere Trends und treffe datenbasierte Entscheidungen.',
    },
  ];

  return (
    <section id="dashboard" ref={ref} className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Dein{' '}
            <span className="text-primary">Dashboard</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Alles im Blick – Daten, Suche und Analytics an einem Ort
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto space-y-20">
          {dashboardFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ delay: 0.1 + index * 0.1, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              className="bg-card border border-border rounded-xl p-8 lg:p-12"
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium mb-4">
                    {feature.title}
                  </div>
                  <h3 className="text-3xl font-bold text-foreground mb-4">{feature.title}</h3>
                  <p className="text-lg text-muted-foreground mb-6">{feature.description}</p>
                  <p className="text-muted-foreground mb-8">{feature.purpose}</p>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">Features:</h4>
                    {feature.features.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-start gap-3">
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
                        <span className="text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-muted/30 border border-border rounded-lg p-8 min-h-[400px] flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-4">📊</div>
                    <div className="text-muted-foreground">
                      Screenshot von {feature.title}
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">
                      (Wird durch echten Screenshot ersetzt)
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.4, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          className="mt-16 text-center"
        >
          <motion.a
            href="/dashboard"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-10 py-5 bg-primary text-primary-foreground rounded-xl font-semibold text-lg hover:bg-primary/90 transition-all shadow-xl"
          >
            Jetzt Dashboard selber testen
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState('flow');

  useEffect(() => {
    const handleScroll = () => {
      const flowSection = document.getElementById('flow');
      const dashboardSection = document.getElementById('dashboard');

      if (!flowSection || !dashboardSection) return;

      const flowTop = flowSection.getBoundingClientRect().top;
      const dashboardTop = dashboardSection.getBoundingClientRect().top;
      const navHeight = 100;

      if (dashboardTop <= navHeight) {
        setActiveTab('dashboard');
      } else if (flowTop <= navHeight) {
        setActiveTab('flow');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Header />
      <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <FlowSection />
      <DashboardSection />
      <Footer />
    </>
  );
}

