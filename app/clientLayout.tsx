// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { useRouter, usePathname } from "next/navigation"
// import LoginPage from "@/components/login-page"
// import { authUtils } from "../auth-utils"
// // import { apiService } from "../api-service"
// import { Route, Fuel, Menu } from "lucide-react"

// export default function ClientLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   const [isAuthenticated, setIsAuthenticated] = useState(false)
//   const [user, setUser] = useState(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const router = useRouter()
//   const pathname = usePathname()

//   useEffect(() => {
//     // Check if user is already authenticated on app load
//     const userData = authUtils.getUserData()
//     const isAuth = authUtils.isAuthenticated()

//     if (isAuth && userData) {
//       setIsAuthenticated(true)
//       setUser(userData)
//     } else if (pathname !== "/") {
//       // Redirect to login if not authenticated and not on login page
//       router.push("/")
//     }

//     setIsLoading(false)
//   }, [pathname, router])

//   const handleLogin = (userData: any) => {
//     setUser(userData)
//     setIsAuthenticated(true)
//     router.push("/home")
//   }

//   const handleLogout = async () => {
//     const tokens = authUtils.getTokens()

//     // if (tokens?.refresh) {
//     //   try {
//     //     await apiService.logout(tokens.refresh)
//     //   } catch (error) {
//     //     console.error("Logout API error:", error)
//     //   }
//     // }

//     authUtils.clearAuth()
//     setUser(null)
//     setIsAuthenticated(false)
//     router.push("/")
//   }

//   if (isLoading) {
//     return (
//       <html>
//         <body>
//           <div className="min-h-screen flex items-center justify-center">
//             <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
//           </div>
//         </body>
//       </html>
//     )
//   }

//   if (!isAuthenticated) {
//     return (
//       <html>
//         <body>
//           <LoginPage onLogin={handleLogin} />
//         </body>
//       </html>
//     )
//   }

//   return (
//     <html>
//       <body>
//         <div className="min-h-screen bg-gray-50">
//           {/* User Info Bar */}
//           <div className="bg-blue-600 text-white">
//             <div className="max-w-4xl mx-auto px-4 py-2">
//               <div className="flex justify-between items-center">
//                 <div className="flex items-center space-x-3">
//                   <div className="text-sm">
//                     <span className="font-medium">
//                       {user?.first_name} {user?.last_name}
//                     </span>
//                     <span className="ml-2 opacity-75">({user?.permission_level})</span>
//                   </div>
//                 </div>
//                 <button
//                   onClick={handleLogout}
//                   className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
//                 >
//                   Logout
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Top Navigation Bar */}
//           <div className="bg-white shadow-sm border-b">
//             <div className="max-w-4xl mx-auto px-4 py-3">
//               <div className="flex justify-between items-center">
//                 <div className="flex items-center space-x-4">
//                   <h1 className="text-xl font-bold text-gray-800">JZA Tech</h1>
//                   <div className="hidden md:flex space-x-4">
//                     <button
//                       onClick={() => router.push("/home")}
//                       className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
//                         pathname === "/home"
//                           ? "bg-blue-100 text-blue-700"
//                           : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
//                       }`}
//                     >
//                       Home
//                     </button>
//                     <button
//                       onClick={() => router.push("/fuel-tracker")}
//                       className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
//                         pathname === "/fuel-tracker"
//                           ? "bg-orange-100 text-orange-700"
//                           : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
//                       }`}
//                     >
//                       Fuel Tracker
//                     </button>
//                     <button
//                       onClick={() => router.push("/menu")}
//                       className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
//                         pathname === "/menu"
//                           ? "bg-gray-100 text-gray-700"
//                           : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
//                       }`}
//                     >
//                       Menu
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Mobile Bottom Navigation */}
//           <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
//             <div className="grid grid-cols-3 gap-1">
//               <button
//                 onClick={() => router.push("/home")}
//                 className={`flex flex-col items-center py-3 px-2 text-xs font-medium transition-colors ${
//                   pathname === "/home"
//                     ? "text-blue-600 bg-blue-50"
//                     : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
//                 }`}
//               >
//                 <Route className="w-5 h-5 mb-1" />
//                 Home
//               </button>
//               <button
//                 onClick={() => router.push("/fuel-tracker")}
//                 className={`flex flex-col items-center py-3 px-2 text-xs font-medium transition-colors ${
//                   pathname === "/fuel-tracker"
//                     ? "text-orange-600 bg-orange-50"
//                     : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
//                 }`}
//               >
//                 <Fuel className="w-5 h-5 mb-1" />
//                 Fuel
//               </button>
//               <button
//                 onClick={() => router.push("/menu")}
//                 className={`flex flex-col items-center py-3 px-2 text-xs font-medium transition-colors ${
//                   pathname === "/menu"
//                     ? "text-gray-600 bg-gray-50"
//                     : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
//                 }`}
//               >
//                 <Menu className="w-5 h-5 mb-1" />
//                 Menu
//               </button>
//             </div>
//           </div>

//           {/* Main Content */}
//           <div className="max-w-4xl mx-auto px-4 py-6 pb-20 md:pb-6">{children}</div>
//         </div>
//       </body>
//     </html>
//   )
// }




"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import LoginPage from "@/components/login-page"
import { authUtils } from "../auth-utils"
import { Route, Fuel, Menu } from "lucide-react"

// Define the User type
interface User {
  first_name: string
  last_name: string
  permission_level: string
  // Add other user properties as needed
  id?: string
  email?: string
  username?: string
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check if user is already authenticated on app load
    const userData = authUtils.getUserData()
    const isAuth = authUtils.isAuthenticated()

    if (isAuth && userData) {
      setIsAuthenticated(true)
      setUser(userData as User)
    } else if (pathname !== "/") {
      // Redirect to login if not authenticated and not on login page
      router.push("/")
    }

    setIsLoading(false)
  }, [pathname, router])

  const handleLogin = (userData: User) => {
    setUser(userData)
    setIsAuthenticated(true)
    router.push("/home")
  }

  const handleLogout = async () => {
    const tokens = authUtils.getTokens()
    // if (tokens?.refresh) {
    //   try {
    //     await apiService.logout(tokens.refresh)
    //   } catch (error) {
    //     console.error("Logout API error:", error)
    //   }
    // }

    authUtils.clearAuth()
    setUser(null)
    setIsAuthenticated(false)
    router.push("/")
  }

  if (isLoading) {
    return (
      <html>
        <body>
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          </div>
        </body>
      </html>
    )
  }

  if (!isAuthenticated) {
    return (
      <html>
        <body>
          <LoginPage onLogin={handleLogin} />
        </body>
      </html>
    )
  }

  return (
    <html>
      <body>
        <div className="min-h-screen bg-gray-50">
          {/* User Info Bar */}
          <div className="bg-blue-600 text-white">
            <div className="max-w-4xl mx-auto px-4 py-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="text-sm">
                    <span className="font-medium">
                      {user?.first_name || "User"} {user?.last_name || ""}
                    </span>
                    <span className="ml-2 opacity-75">({user?.permission_level || "Guest"})</span>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Top Navigation Bar */}
          <div className="bg-white shadow-sm border-b">
            <div className="max-w-4xl mx-auto px-4 py-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <h1 className="text-xl font-bold text-gray-800">JZA Tech</h1>
                  <div className="hidden md:flex space-x-4">
                    <button
                      onClick={() => router.push("/home")}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        pathname === "/home"
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      Home
                    </button>
                    <button
                      onClick={() => router.push("/fuel-tracker")}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        pathname === "/fuel-tracker"
                          ? "bg-orange-100 text-orange-700"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      Fuel Tracker
                    </button>
                    <button
                      onClick={() => router.push("/menu")}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        pathname === "/menu"
                          ? "bg-gray-100 text-gray-700"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      Menu
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Bottom Navigation */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
            <div className="grid grid-cols-3 gap-1">
              <button
                onClick={() => router.push("/home")}
                className={`flex flex-col items-center py-3 px-2 text-xs font-medium transition-colors ${
                  pathname === "/home"
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <Route className="w-5 h-5 mb-1" />
                Home
              </button>
              <button
                onClick={() => router.push("/fuel-tracker")}
                className={`flex flex-col items-center py-3 px-2 text-xs font-medium transition-colors ${
                  pathname === "/fuel-tracker"
                    ? "text-orange-600 bg-orange-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <Fuel className="w-5 h-5 mb-1" />
                Fuel
              </button>
              <button
                onClick={() => router.push("/menu")}
                className={`flex flex-col items-center py-3 px-2 text-xs font-medium transition-colors ${
                  pathname === "/menu"
                    ? "text-gray-600 bg-gray-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <Menu className="w-5 h-5 mb-1" />
                Menu
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto px-4 py-6 pb-20 md:pb-6">{children}</div>
        </div>
      </body>
    </html>
  )
}
