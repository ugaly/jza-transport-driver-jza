// "use client"

// import type React from "react"

// import { useState } from "react"
// import { motion } from "framer-motion"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardHeader } from "@/components/ui/card"
// import { Truck, User, Lock, Eye, EyeOff } from "lucide-react"

// interface LoginPageProps {
//   onLogin: () => void
// }

// export default function LoginPage({ onLogin }: LoginPageProps) {
//   const [showPassword, setShowPassword] = useState(false)
//   const [username, setUsername] = useState("")
//   const [password, setPassword] = useState("")
//   const [isLoading, setIsLoading] = useState(false)

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsLoading(true)

//     // Simulate login process
//     setTimeout(() => {
//       setIsLoading(false)
//       onLogin()
//     }, 1500)
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="w-full max-w-md"
//       >
//         <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur">
//           <CardHeader className="text-center pb-8">
//             <motion.div
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
//               className="mx-auto mb-4"
//             >
//               <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-4 shadow-lg">
//                 <Truck className="w-12 h-12 text-white" />
//               </div>
//             </motion.div>
//             <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//               JZA Tech
//             </h1>
//             <p className="text-gray-600 mt-2">Driver Portal</p>
//           </CardHeader>

//           <CardContent>
//             <form onSubmit={handleLogin} className="space-y-6">
//               <motion.div
//                 initial={{ opacity: 0, x: -50 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.5 }}
//                 className="space-y-2"
//               >
//                 <label className="text-sm font-medium text-gray-700">Username</label>
//                 <div className="relative">
//                   <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <Input
//                     type="text"
//                     placeholder="Enter your username"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     className="pl-10 h-12 border-2 focus:border-blue-500 transition-colors"
//                     required
//                   />
//                 </div>
//               </motion.div>

//               <motion.div
//                 initial={{ opacity: 0, x: -50 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.6 }}
//                 className="space-y-2"
//               >
//                 <label className="text-sm font-medium text-gray-700">Password</label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <Input
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Enter your password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="pl-10 pr-10 h-12 border-2 focus:border-blue-500 transition-colors"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                   >
//                     {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                   </button>
//                 </div>
//               </motion.div>

//               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
//                 <Button
//                   type="submit"
//                   className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105"
//                   disabled={isLoading}
//                 >
//                   {isLoading ? (
//                     <motion.div
//                       animate={{ rotate: 360 }}
//                       transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//                       className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
//                     />
//                   ) : (
//                     "Sign In"
//                   )}
//                 </Button>
//               </motion.div>
//             </form>

//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.8 }}
//               className="mt-8 text-center"
//             >
//               <p className="text-sm text-gray-500">Welcome back, driver! Ready to manage your journeys?</p>
//             </motion.div>
//           </CardContent>
//         </Card>
//       </motion.div>
//     </div>
//   )
// }




"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Truck, User, Lock, Eye, EyeOff, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { mobileDetection } from "./mobile-detection"
import base_url from "@/api/base-url"

interface LoginPageProps {
  onLogin: (userData: any) => void
}

interface LoginResponse {
  user: {
    id: number
    username: string
    email: string
    first_name: string
    last_name: string
    permission_level: string
    is_mobile_user: boolean
    is_active: boolean
    created_at: string
  }
  refresh: string
  access: string
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const deviceInfo = mobileDetection.getDeviceInfo()

      const response = await axios.post<LoginResponse>(
        `${base_url}/auth/login/`,
        {
          username,
          password,
          is_mobile_user: true,
          device_info: deviceInfo, // Send device information
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      )

      const { user, access, refresh } = response.data

      // Store tokens in localStorage
      localStorage.setItem("access_token", access)
      localStorage.setItem("refresh_token", refresh)

      // Ensure user is marked as mobile user regardless of API response
      const updatedUser = { ...user, is_mobile_user: true }
      localStorage.setItem("user_data", JSON.stringify(updatedUser))

      // Call the onLogin callback with updated user data
      onLogin(updatedUser)
    } catch (err: any) {
      console.error("Login error:", err)

      if (err.response?.status === 401) {
        setError("Invalid username or password")
      } else if (err.response?.status === 400) {
        setError("Please check your credentials")
      } else if (err.code === "ECONNREFUSED" || err.code === "ERR_NETWORK") {
        setError("Unable to connect to server. Please try again later.")
      } else {
        setError("Login failed. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur">
          <CardHeader className="text-center pb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="mx-auto mb-4"
            >
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-4 shadow-lg">
                <Truck className="w-12 h-12 text-white" />
              </div>
            </motion.div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              JZA Tech
            </h1>
            <p className="text-gray-600 mt-2">Driver Portal</p>
          </CardHeader>

          <CardContent>
            {error && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              </motion.div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-2"
              >
                <label className="text-sm font-medium text-gray-700">Username</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10 h-12 border-2 focus:border-blue-500 transition-colors"
                    required
                    disabled={isLoading}
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-2"
              >
                <label className="text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-12 border-2 focus:border-blue-500 transition-colors"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      <span>Signing In...</span>
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </motion.div>
            </form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 text-center"
            >
              <p className="text-sm text-gray-500">Welcome back, driver! Ready to manage your journeys?</p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
