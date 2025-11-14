"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Datatable from "./Datatable/Datatable"
import Analytics from "./Analytics/Analytics"
import Search from "./Search/Search"
import Upload from "./Upload/Upload"

type Page = "datatable" | "analytics" | "search" | "upload"

export default function Dashboard() {
  const [activePage, setActivePage] = useState<Page>("datatable")

  const pages = [
    { id: "datatable" as Page, label: "Datatable" },
    { id: "analytics" as Page, label: "Analytics" },
    { id: "search" as Page, label: "Suche" },
    { id: "upload" as Page, label: "Upload" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">Recruiting Dashboard</h1>
            <div className="flex gap-2">
              {pages.map((page) => (
                <button
                  key={page.id}
                  onClick={() => setActivePage(page.id)}
                  className={`relative px-4 py-2 rounded-md transition-colors ${
                    activePage === page.id
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {activePage === page.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-primary rounded-md"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{page.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-8">
        <motion.div
          key={activePage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activePage === "datatable" && <Datatable />}
          {activePage === "analytics" && <Analytics />}
          {activePage === "search" && <Search />}
          {activePage === "upload" && <Upload />}
        </motion.div>
      </main>
    </div>
  )
}
