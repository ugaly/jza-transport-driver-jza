"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import SplashScreen from "@/components/splash-screen"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated (you can implement proper auth logic here)
    const isAuthenticated = localStorage.getItem("jza-auth") === "true"

    // Show splash for 3 seconds, then redirect
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        router.push("/dashboard")
      } else {
        router.push("/login")
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return <SplashScreen />
}
