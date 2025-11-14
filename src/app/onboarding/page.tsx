"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import WelcomeScreen from "./components/WelcomeScreen"
import OnboardingLayout from "./components/OnboardingLayout"

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0) // 0 = Welcome Screen, 1-6 = Sections
  const [dpaAccepted, setDpaAccepted] = useState(false)
  const [customerName, setCustomerName] = useState<string | null>(null)

  // Load DPA acceptance from localStorage on mount
  useEffect(() => {
    const savedDpa = localStorage.getItem("dpa_accepted")
    if (savedDpa === "true") {
      setDpaAccepted(true)
    }
    
    // Try to get customer name from URL params or localStorage
    const urlParams = new URLSearchParams(window.location.search)
    const nameFromUrl = urlParams.get("name")
    const nameFromStorage = localStorage.getItem("customer_name")
    
    if (nameFromUrl) {
      setCustomerName(nameFromUrl)
      localStorage.setItem("customer_name", nameFromUrl)
    } else if (nameFromStorage) {
      setCustomerName(nameFromStorage)
    }
  }, [])

  // Save DPA acceptance to localStorage
  useEffect(() => {
    if (dpaAccepted) {
      localStorage.setItem("dpa_accepted", "true")
    }
  }, [dpaAccepted])

  const handleGetStarted = () => {
    setCurrentStep(1)
  }

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleDpaChange = (accepted: boolean) => {
    setDpaAccepted(accepted)
  }

  return (
    <div className="h-screen bg-background overflow-hidden">
      <AnimatePresence mode="wait">
        {currentStep === 0 ? (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="h-screen overflow-hidden"
          >
            <WelcomeScreen
              customerName={customerName}
              onGetStarted={handleGetStarted}
            />
          </motion.div>
        ) : (
          <motion.div
            key="onboarding"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="h-screen overflow-hidden"
          >
            <OnboardingLayout
              currentStep={currentStep}
              dpaAccepted={dpaAccepted}
              onNext={handleNext}
              onDpaChange={handleDpaChange}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

