"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface WelcomeScreenProps {
  customerName?: string | null
  onGetStarted: () => void
}

export default function WelcomeScreen({ customerName, onGetStarted }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen flex">
      {/* Pseudo-Sidebar mit Wellen */}
      <div className="w-64 bg-sidebar border-r border-sidebar-border min-h-screen relative" style={{ overflow: "hidden" }}>
        {/* Wellen-Hintergrund */}
        <svg
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 256 1000"
          style={{ width: "calc(100% + 30px)", right: "-30px" }}
        >
          <defs>
            <linearGradient id="wave1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgb(142, 65, 239)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="rgb(168, 85, 247)" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="wave2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgb(139, 92, 246)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="rgb(142, 65, 239)" stopOpacity="0.15" />
            </linearGradient>
            <linearGradient id="wave3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgb(168, 85, 247)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="rgb(139, 92, 246)" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          {/* Große Welle oben - füllt die Sidebar oben aus */}
          <motion.path
            d="M0,0 Q64,-150 128,0 Q192,-150 256,0 L256,1000 L0,1000 Z"
            fill="rgb(142, 65, 239)"
            fillOpacity="0.2"
            animate={{
              d: [
                "M0,0 Q64,-150 128,0 Q192,-150 256,0 L256,1000 L0,1000 Z",
                "M0,0 Q64,-180 128,0 Q192,-180 256,0 L256,1000 L0,1000 Z",
                "M0,0 Q64,-150 128,0 Q192,-150 256,0 L256,1000 L0,1000 Z",
              ],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          {/* Unterschiedliche Wellen-Formen mit Animation */}
          <motion.path
            d="M0,180 Q80,120 160,180 T256,180 L256,1000 L0,1000 Z"
            fill="url(#wave1)"
            animate={{
              d: [
                "M0,180 Q80,120 160,180 T256,180 L256,1000 L0,1000 Z",
                "M0,180 Q80,160 160,180 T256,180 L256,1000 L0,1000 Z",
                "M0,180 Q80,120 160,180 T256,180 L256,1000 L0,1000 Z",
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.path
            d="M0,420 Q60,360 120,420 Q180,480 256,420 L256,1000 L0,1000 Z"
            fill="url(#wave2)"
            animate={{
              d: [
                "M0,420 Q60,360 120,420 Q180,480 256,420 L256,1000 L0,1000 Z",
                "M0,420 Q60,400 120,420 Q180,440 256,420 L256,1000 L0,1000 Z",
                "M0,420 Q60,360 120,420 Q180,480 256,420 L256,1000 L0,1000 Z",
              ],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
          <motion.path
            d="M0,580 Q100,520 200,580 Q150,640 256,580 L256,1000 L0,1000 Z"
            fill="url(#wave3)"
            animate={{
              d: [
                "M0,580 Q100,520 200,580 Q150,640 256,580 L256,1000 L0,1000 Z",
                "M0,580 Q100,560 200,580 Q150,600 256,580 L256,1000 L0,1000 Z",
                "M0,580 Q100,520 200,580 Q150,640 256,580 L256,1000 L0,1000 Z",
              ],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4,
            }}
          />
        </svg>

        {/* Logo */}
        <div className="relative z-10 p-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 20,
              delay: 0.2
            }}
          >
            <Image
              src="/dummy.png"
              alt="RecruitAI Logo"
              width={100}
              height={100}
              className="object-contain"
            />
          </motion.div>
        </div>
      </div>

      {/* Haupt-Content zentriert */}
      <div className="flex-1 flex items-center justify-center px-8 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 20,
            delay: 0.2
          }}
          className="max-w-3xl text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 150,
              damping: 15,
              delay: 0.4
            }}
            className="text-5xl md:text-6xl font-serif font-bold text-primary mb-8"
          >
            {customerName ? (
              <>
                Willkommen, <span className="text-primary">{customerName}</span>!
              </>
            ) : (
              <>Willkommen bei RecruitAI!</>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 150,
              damping: 15,
              delay: 0.6
            }}
            className="text-xl md:text-2xl text-muted-foreground mb-6 leading-relaxed"
          >
            {customerName ? (
              <>
                Wir freuen uns, Sie an Bord zu haben! Lassen Sie uns gemeinsam
                Ihren Recruiting-Prozess revolutionieren.
              </>
            ) : (
              <>
                Wir freuen uns, Sie an Bord zu haben! Lassen Sie uns gemeinsam
                Ihren Recruiting-Prozess revolutionieren.
              </>
            )}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 150,
              damping: 15,
              delay: 0.8
            }}
            className="text-lg text-muted-foreground mb-16 max-w-2xl mx-auto"
          >
            Mit unserer KI-gestützten Recruiting-Lösung finden Sie die besten
            Talente für Ihr Unternehmen – effizienter, schneller und präziser
            als je zuvor. In nur wenigen Minuten führen wir Sie durch das
            Onboarding.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              damping: 12,
              delay: 1
            }}
          >
            <motion.button
              onClick={onGetStarted}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-primary text-primary-foreground rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
            >
              Los geht&apos;s
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

