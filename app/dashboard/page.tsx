"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Dashboard from "@/components/dashboard"

export default function DashboardPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Get active tab from URL params, default to 'home'
  const activeTab = searchParams.get("tab") || "home"

  useEffect(() => {
    // Check authentication
    const authStatus = localStorage.getItem("jza-auth") === "true"

    if (!authStatus) {
      router.push("/login")
      return
    }

    setIsAuthenticated(true)
    setIsLoading(false)
  }, [router])

  const setActiveTab = (tab: string) => {
    // Update URL with new tab
    router.push(`/dashboard?tab=${tab}`)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <Dashboard activeTab={activeTab} setActiveTab={setActiveTab} />
}
