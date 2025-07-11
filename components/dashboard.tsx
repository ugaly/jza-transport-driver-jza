"use client"

import { motion } from "framer-motion"
import DesktopLayout from "@/components/desktop-layout"
import MobileLayout from "@/components/mobile-layout"
import { useIsMobile } from "@/hooks/use-mobile"

interface DashboardProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function Dashboard({ activeTab, setActiveTab }: DashboardProps) {
  const isMobile = useIsMobile()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50"
    >
      {isMobile ? (
        <MobileLayout activeTab={activeTab} setActiveTab={setActiveTab} />
      ) : (
        <DesktopLayout activeTab={activeTab} setActiveTab={setActiveTab} />
      )}
    </motion.div>
  )
}
