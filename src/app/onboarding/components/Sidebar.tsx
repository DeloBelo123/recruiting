"use client"

import { motion } from "framer-motion"
import { Logo } from "@/app/components/Logo"

interface SidebarProps {
  currentStep: number
  totalSteps: number
}

const stepLabels = [
  "Willkommen",
  "Überblick",
  "Pricing",
  "DPA",
  "Kontakt",
  "Abschluss",
]

export default function Sidebar({ currentStep, totalSteps }: SidebarProps) {
  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border fixed top-0 left-0 h-screen p-6 flex flex-col relative z-10" style={{ overflow: "hidden" }}>
      {/* Wellen-Hintergrund */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="none"
        viewBox="0 0 256 1000"
        style={{ width: "calc(100% + 30px)", right: "-30px" }}
      >
        <defs>
          <linearGradient id="sidebar-wave1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgb(142, 65, 239)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="rgb(168, 85, 247)" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="sidebar-wave2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgb(139, 92, 246)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="rgb(142, 65, 239)" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="sidebar-wave3" x1="0%" y1="0%" x2="0%" y2="100%">
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
          fill="url(#sidebar-wave1)"
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
          fill="url(#sidebar-wave2)"
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
          fill="url(#sidebar-wave3)"
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
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
        className="mb-12 relative z-10"
      >
        <Logo size="large" />
      </motion.div>

      {/* Steps */}
      <div className="flex-1 space-y-4 relative z-10 flex flex-col items-center">
        {stepLabels.map((label, index) => {
          const stepNumber = index + 1
          const isCompleted = currentStep > stepNumber
          const isActive = currentStep === stepNumber
          const isLocked = currentStep < stepNumber

          return (
            <motion.div
              key={stepNumber}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: index * 0.1
              }}
              className="flex items-center gap-4"
            >
              {/* Step Number */}
              <motion.div
                className={`flex items-center justify-center w-14 h-14 rounded-full border-2 transition-all ${
                  isCompleted || isActive
                    ? "bg-primary border-primary text-primary-foreground"
                    : "bg-muted border-muted-foreground/30 text-muted-foreground opacity-40"
                } ${
                  isActive ? "ring-2 ring-primary ring-offset-2" : ""
                }`}
                animate={
                  isActive
                    ? {
                        scale: [1, 1.2],
                        rotate: [0, 5],
                        y: [0, -5],
                      }
                    : { scale: 1, rotate: 0, y: 0 }
                }
                transition={
                  isCompleted
                    ? {
                        type: "tween",
                        duration: 0.15,
                        ease: "easeOut",
                      }
                    : {
                        type: "spring",
                        stiffness: 500,
                        damping: 12,
                      }
                }
              >
                <motion.span
                  className="font-semibold text-lg"
                  animate={isActive ? { scale: [1, 1.15] } : { scale: 1 }}
                  transition={
                    isCompleted
                      ? {
                          type: "tween",
                          duration: 0.15,
                          ease: "easeOut",
                        }
                      : {
                          type: "spring",
                          stiffness: 400,
                          damping: 15,
                        }
                  }
                >
                  {stepNumber}
                </motion.span>
              </motion.div>

              {/* Step Label */}
              <span
                className={`font-medium text-base transition-all ${
                  isCompleted || isActive
                    ? "text-primary font-semibold"
                    : "text-muted-foreground opacity-40"
                }`}
              >
                {label}
              </span>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

