"use client"

import { motion, AnimatePresence } from "framer-motion"
import Sidebar from "./Sidebar"
import WelcomeSection from "./WelcomeSection"
import OverviewSection from "./OverviewSection"
import PricingSection from "./PricingSection"
import DPASection from "./DPASection"
import ContactSection from "./ContactSection"
import CompletionSection from "./CompletionSection"

interface OnboardingLayoutProps {
  currentStep: number
  dpaAccepted: boolean
  onNext: () => void
  onDpaChange: (accepted: boolean) => void
}

const sections = [
  { id: 1, name: "Willkommen", component: WelcomeSection },
  { id: 2, name: "Überblick", component: OverviewSection },
  { id: 3, name: "Pricing", component: PricingSection },
  { id: 4, name: "DPA", component: DPASection },
  { id: 5, name: "Kontakt", component: ContactSection },
  { id: 6, name: "Abschluss", component: CompletionSection },
]

export default function OnboardingLayout({
  currentStep,
  dpaAccepted,
  onNext,
  onDpaChange,
}: OnboardingLayoutProps) {
  const CurrentSection = sections[currentStep - 1]?.component

  return (
    <div className="min-h-screen flex relative">
      {/* Sidebar */}
      <Sidebar currentStep={currentStep} totalSteps={sections.length} />

      {/* Wellen-Hintergrund für gesamte Section */}
      <div className="fixed left-64 top-0 bottom-0 right-0 pointer-events-none z-0" style={{ filter: "blur(30px)", opacity: 0.15 }}>
        <svg
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 1000 1000"
        >
          <defs>
            <linearGradient id="content-wave1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgb(142, 65, 239)" stopOpacity="0.15" />
              <stop offset="30%" stopColor="rgb(142, 65, 239)" stopOpacity="0.08" />
              <stop offset="100%" stopColor="rgb(142, 65, 239)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="content-wave2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgb(139, 92, 246)" stopOpacity="0.12" />
              <stop offset="30%" stopColor="rgb(139, 92, 246)" stopOpacity="0.06" />
              <stop offset="100%" stopColor="rgb(139, 92, 246)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="content-wave3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgb(168, 85, 247)" stopOpacity="0.12" />
              <stop offset="30%" stopColor="rgb(168, 85, 247)" stopOpacity="0.06" />
              <stop offset="100%" stopColor="rgb(168, 85, 247)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d="M0,180 Q200,120 400,180 T800,180 L1000,180 L1000,1000 L0,1000 Z"
            fill="url(#content-wave1)"
            animate={{
              d: [
                "M0,180 Q200,120 400,180 T800,180 L1000,180 L1000,1000 L0,1000 Z",
                "M0,180 Q200,160 400,180 T800,180 L1000,180 L1000,1000 L0,1000 Z",
                "M0,180 Q200,120 400,180 T800,180 L1000,180 L1000,1000 L0,1000 Z",
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.path
            d="M0,420 Q150,360 300,420 Q450,480 600,420 Q750,360 1000,420 L1000,1000 L0,1000 Z"
            fill="url(#content-wave2)"
            animate={{
              d: [
                "M0,420 Q150,360 300,420 Q450,480 600,420 Q750,360 1000,420 L1000,1000 L0,1000 Z",
                "M0,420 Q150,400 300,420 Q450,440 600,420 Q750,400 1000,420 L1000,1000 L0,1000 Z",
                "M0,420 Q150,360 300,420 Q450,480 600,420 Q750,360 1000,420 L1000,1000 L0,1000 Z",
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
            d="M0,580 Q250,520 500,580 Q375,640 750,580 Q625,520 1000,580 L1000,1000 L0,1000 Z"
            fill="url(#content-wave3)"
            animate={{
              d: [
                "M0,580 Q250,520 500,580 Q375,640 750,580 Q625,520 1000,580 L1000,1000 L0,1000 Z",
                "M0,580 Q250,560 500,580 Q375,600 750,580 Q625,560 1000,580 L1000,1000 L0,1000 Z",
                "M0,580 Q250,520 500,580 Q375,640 750,580 Q625,520 1000,580 L1000,1000 L0,1000 Z",
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
      </div>

      {/* Content Area */}
      <div className="flex-1 ml-0 relative z-10">
        <div className="h-screen overflow-y-auto">
          <div className="max-w-5xl mx-auto px-8 py-16 min-h-screen flex flex-col">
            <AnimatePresence mode="wait">
              {CurrentSection && (
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 30, y: 20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, x: -30, y: -20 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    damping: 20
                  }}
                  className="flex-1 flex flex-col"
                >
                  <CurrentSection
                    onNext={onNext}
                    dpaAccepted={dpaAccepted}
                    onDpaChange={onDpaChange}
                    isLast={currentStep === sections.length}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

