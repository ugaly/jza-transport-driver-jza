"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

interface BackButtonProps {
  fallbackPath?: string
  className?: string
  variant?: "default" | "ghost" | "outline"
  size?: "default" | "sm" | "lg" | "icon"
}

export default function BackButton({
  fallbackPath = "/home",
  className = "",
  variant = "ghost",
  size = "default",
}: BackButtonProps) {
  const router = useRouter()

  const handleBack = () => {
    // Try to go back in browser history
    if (window.history.length > 1) {
      router.back()
    } else {
      // Fallback to specified path if no history
      router.push(fallbackPath)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
      <Button
        variant={variant}
        size={size}
        onClick={handleBack}
        className={`flex items-center space-x-2 hover:bg-gray-100 transition-colors ${className}`}
      >
        <ArrowLeft className="w-4 h-4" />
        {size !== "icon" && <span>Back</span>}
      </Button>
    </motion.div>
  )
}
