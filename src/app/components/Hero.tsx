'use client';

import { motion } from 'framer-motion';
import DemoGif from './DemoGif';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-b from-white via-purple-700/20 via-60% to-white" >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl"
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            className="inline-block px-5 py-2 bg-primary/10 text-primary rounded-full text-xs sm:text-sm font-medium mb-6 border border-primary/20"
          >
            AI-Powered Voice Recruiting • 24/7 Verfügbar
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
          >
            Spare{' '}
            <span className="text-primary relative inline-block">
              <motion.span
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="relative"
              >
                140% Zeit
              </motion.span>
            </span>
            <br />
            im Recruiting
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0 font-light"
          >
            Unsere Voice-AI automatisiert Anrufe, qualifiziert Kandidaten und führt Gespräche – 
            rund um die Uhr. Konzentriere dich auf das Wesentliche.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-8"
          >
            <motion.a
              href="/pricing"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25,
                mass: 0.8,
              }}
              className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-base hover:bg-primary/90 shadow-xl hover:shadow-2xl"
            >
              Jetzt starten
            </motion.a>
            <motion.a
              href="/how-it-works"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25,
                mass: 0.8,
              }}
              className="px-8 py-4 bg-card text-foreground rounded-xl font-semibold text-base hover:bg-card/80 border-2 border-border shadow-lg hover:shadow-xl"
            >
              So funktioniert's
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto lg:mx-0"
          >
            {[
              { label: 'Automatische Anrufe', value: '24/7' },
              { label: 'Zeitersparnis', value: '140%' },
              { label: 'Qualifizierte Kandidaten', value: 'Sofort' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.05, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-4"
              >
                <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
            </div>
            
            <DemoGif className="hidden lg:block" />
          </div>
        </div>
      </div>
    </section>
  );
}

