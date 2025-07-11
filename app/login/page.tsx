"use client"

import { useRouter } from "next/navigation"
import LoginPage from "@/components/login-page"

export default function Login() {
  const router = useRouter()

  const handleLogin = () => {
    // Set authentication state
    localStorage.setItem("jza-auth", "true")
    router.push("/dashboard")
  }

  return <LoginPage onLogin={handleLogin} />
}
