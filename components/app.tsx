// "use client"

// import { useState, useEffect } from "react"
// import LoginPage from "./login-page"
// import HomeContent from "./home-content"
// import MenuContent from "./menu-content"
// import FuelTracker from "./fuel-tracker"
// import { authUtils } from "@/auth-utils"
// // import { apiService } from "./api-service"
// import { Route, Fuel, Menu } from "lucide-react"

// export default function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false)
//   const [user, setUser] = useState(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const [currentScreen, setCurrentScreen] = useState("home")

//   useEffect(() => {
//     // Check if user is already authenticated on app load
//     const userData = authUtils.getUserData()
//     const isAuth = authUtils.isAuthenticated()

//     if (isAuth && userData) {
//       setIsAuthenticated(true)
//       setUser(userData)
//     }

//     setIsLoading(false)
//   }, [])

//   const handleLogin = (userData: any) => {
//     setUser(userData)
//     setIsAuthenticated(true)
//   }

//   const handleLogout = async () => {
//     const tokens = authUtils.getTokens()

//     if (tokens?.refresh) {
//       try {
//         // await apiService.logout(tokens.refresh)
//       } catch (error) {
//         console.error("Logout API error:", error)
//       }
//     }

//     authUtils.clearAuth()
//     setUser(null)
//     setIsAuthenticated(false)
//     setCurrentScreen("home") // Reset to home screen
//   }

//   const handleNavigate = (screen: string) => {
//     console.log("App handleNavigate called with:", screen)
//     setCurrentScreen(screen)
//   }

//   const renderCurrentScreen = () => {
//     console.log("Rendering screen:", currentScreen)

//     switch (currentScreen) {
//       case "home":
//         return <HomeContent />
//       case "menu":
//         return <MenuContent  />
//       case "fuel-tracker":
//         return <FuelTracker />
//       case "expenses":
//         return (
//           <div className="text-center py-12">
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">Expenses</h2>
//             <p className="text-gray-600">Expenses screen coming soon...</p>
//             <button
//               onClick={() => handleNavigate("home")}
//               className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//             >
//               Back to Home
//             </button>
//           </div>
//         )
//       case "reports":
//         return (
//           <div className="text-center py-12">
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">Reports</h2>
//             <p className="text-gray-600">Reports screen coming soon...</p>
//             <button
//               onClick={() => handleNavigate("home")}
//               className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//             >
//               Back to Home
//             </button>
//           </div>
//         )
//       case "maintenance":
//         return (
//           <div className="text-center py-12">
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">Maintenance</h2>
//             <p className="text-gray-600">Maintenance screen coming soon...</p>
//             <button
//               onClick={() => handleNavigate("home")}
//               className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//             >
//               Back to Home
//             </button>
//           </div>
//         )
//       case "locations":
//         return (
//           <div className="text-center py-12">
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">Locations</h2>
//             <p className="text-gray-600">Locations screen coming soon...</p>
//             <button
//               onClick={() => handleNavigate("home")}
//               className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//             >
//               Back to Home
//             </button>
//           </div>
//         )
//       case "settings":
//         return (
//           <div className="text-center py-12">
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">Settings</h2>
//             <p className="text-gray-600">Settings screen coming soon...</p>
//             <button
//               onClick={() => handleNavigate("home")}
//               className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//             >
//               Back to Home
//             </button>
//           </div>
//         )
//       case "help":
//         return (
//           <div className="text-center py-12">
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">Help</h2>
//             <p className="text-gray-600">Help screen coming soon...</p>
//             <button
//               onClick={() => handleNavigate("home")}
//               className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//             >
//               Back to Home
//             </button>
//           </div>
//         )
//       case "contact":
//         return (
//           <div className="text-center py-12">
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact</h2>
//             <p className="text-gray-600">Contact screen coming soon...</p>
//             <button
//               onClick={() => handleNavigate("home")}
//               className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//             >
//               Back to Home
//             </button>
//           </div>
//         )
//       default:
//         return <HomeContent />
//     }
//   }

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
//       </div>
//     )
//   }

//   if (!isAuthenticated) {
//     return <LoginPage onLogin={handleLogin} />
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* User Info Bar */}
//       <div className="bg-blue-600 text-white">
//         <div className="max-w-4xl mx-auto px-4 py-2">
//           <div className="flex justify-between items-center">
//             <div className="flex items-center space-x-3">
//               <div className="text-sm">
//                 <span className="font-medium">
//                   {user?.first_name} {user?.last_name}
//                 </span>
//                 <span className="ml-2 opacity-75">({user?.permission_level})</span>
//               </div>
//             </div>
//             <button
//               onClick={handleLogout}
//               className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Top Navigation Bar */}
//       <div className="bg-white shadow-sm border-b">
//         <div className="max-w-4xl mx-auto px-4 py-3">
//           <div className="flex justify-between items-center">
//             <div className="flex items-center space-x-4">
//               <h1 className="text-xl font-bold text-gray-800">JZA Tech</h1>
//               <div className="hidden md:flex space-x-4">
//                 <button
//                   onClick={() => handleNavigate("home")}
//                   className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
//                     currentScreen === "home"
//                       ? "bg-blue-100 text-blue-700"
//                       : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
//                   }`}
//                 >
//                   Home
//                 </button>
//                 <button
//                   onClick={() => handleNavigate("fuel-tracker")}
//                   className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
//                     currentScreen === "fuel-tracker"
//                       ? "bg-orange-100 text-orange-700"
//                       : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
//                   }`}
//                 >
//                   Fuel Tracker
//                 </button>
//                 <button
//                   onClick={() => handleNavigate("menu")}
//                   className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
//                     currentScreen === "menu"
//                       ? "bg-gray-100 text-gray-700"
//                       : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
//                   }`}
//                 >
//                   Menu
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Bottom Navigation */}
//       <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
//         <div className="grid grid-cols-3 gap-1">
//           <button
//             onClick={() => handleNavigate("home")}
//             className={`flex flex-col items-center py-3 px-2 text-xs font-medium transition-colors ${
//               currentScreen === "home"
//                 ? "text-blue-600 bg-blue-50"
//                 : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
//             }`}
//           >
//             <Route className="w-5 h-5 mb-1" />
//             Home
//           </button>
//           <button
//             onClick={() => handleNavigate("fuel-tracker")}
//             className={`flex flex-col items-center py-3 px-2 text-xs font-medium transition-colors ${
//               currentScreen === "fuel-tracker"
//                 ? "text-orange-600 bg-orange-50"
//                 : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
//             }`}
//           >
//             <Fuel className="w-5 h-5 mb-1" />
//             Fuel
//           </button>
//           <button
//             onClick={() => handleNavigate("menu")}
//             className={`flex flex-col items-center py-3 px-2 text-xs font-medium transition-colors ${
//               currentScreen === "menu"
//                 ? "text-gray-600 bg-gray-50"
//                 : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
//             }`}
//           >
//             <Menu className="w-5 h-5 mb-1" />
//             Menu
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-4xl mx-auto px-4 py-6 pb-20 md:pb-6">{renderCurrentScreen()}</div>
//     </div>
//   )
// }



"use client"

import { useState, useEffect } from "react"
import LoginPage from "./login-page"
import HomeContent from "./home-content"
import MenuContent from "./menu-content"
import FuelTracker from "./fuel-tracker"
import { authUtils } from "@/auth-utils"
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

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentScreen, setCurrentScreen] = useState("home")

  useEffect(() => {
    // Check if user is already authenticated on app load
    const userData = authUtils.getUserData()
    const isAuth = authUtils.isAuthenticated()

    if (isAuth && userData) {
      setIsAuthenticated(true)
      setUser(userData as User)
    }

    setIsLoading(false)
  }, [])

  const handleLogin = (userData: User) => {
    setUser(userData)
    setIsAuthenticated(true)
  }

  const handleLogout = async () => {
    const tokens = authUtils.getTokens()
    if (tokens?.refresh) {
      try {
        // await apiService.logout(tokens.refresh)
      } catch (error) {
        console.error("Logout API error:", error)
      }
    }

    authUtils.clearAuth()
    setUser(null)
    setIsAuthenticated(false)
    setCurrentScreen("home") // Reset to home screen
  }

  const handleNavigate = (screen: string) => {
    console.log("App handleNavigate called with:", screen)
    setCurrentScreen(screen)
  }

  const renderCurrentScreen = () => {
    console.log("Rendering screen:", currentScreen)
    switch (currentScreen) {
      case "home":
        return <HomeContent />
      case "menu":
        return <MenuContent />
      case "fuel-tracker":
        return <FuelTracker />
      case "expenses":
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Expenses</h2>
            <p className="text-gray-600">Expenses screen coming soon...</p>
            <button
              onClick={() => handleNavigate("home")}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Back to Home
            </button>
          </div>
        )
      case "reports":
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Reports</h2>
            <p className="text-gray-600">Reports screen coming soon...</p>
            <button
              onClick={() => handleNavigate("home")}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Back to Home
            </button>
          </div>
        )
      case "maintenance":
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Maintenance</h2>
            <p className="text-gray-600">Maintenance screen coming soon...</p>
            <button
              onClick={() => handleNavigate("home")}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Back to Home
            </button>
          </div>
        )
      case "locations":
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Locations</h2>
            <p className="text-gray-600">Locations screen coming soon...</p>
            <button
              onClick={() => handleNavigate("home")}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Back to Home
            </button>
          </div>
        )
      case "settings":
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Settings</h2>
            <p className="text-gray-600">Settings screen coming soon...</p>
            <button
              onClick={() => handleNavigate("home")}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Back to Home
            </button>
          </div>
        )
      case "help":
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Help</h2>
            <p className="text-gray-600">Help screen coming soon...</p>
            <button
              onClick={() => handleNavigate("home")}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Back to Home
            </button>
          </div>
        )
      case "contact":
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact</h2>
            <p className="text-gray-600">Contact screen coming soon...</p>
            <button
              onClick={() => handleNavigate("home")}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Back to Home
            </button>
          </div>
        )
      default:
        return <HomeContent />
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />
  }

  return (
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
                  onClick={() => handleNavigate("home")}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentScreen === "home"
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => handleNavigate("fuel-tracker")}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentScreen === "fuel-tracker"
                      ? "bg-orange-100 text-orange-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  Fuel Tracker
                </button>
                <button
                  onClick={() => handleNavigate("menu")}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentScreen === "menu"
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
            onClick={() => handleNavigate("home")}
            className={`flex flex-col items-center py-3 px-2 text-xs font-medium transition-colors ${
              currentScreen === "home"
                ? "text-blue-600 bg-blue-50"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            <Route className="w-5 h-5 mb-1" />
            Home
          </button>
          <button
            onClick={() => handleNavigate("fuel-tracker")}
            className={`flex flex-col items-center py-3 px-2 text-xs font-medium transition-colors ${
              currentScreen === "fuel-tracker"
                ? "text-orange-600 bg-orange-50"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            <Fuel className="w-5 h-5 mb-1" />
            Fuel
          </button>
          <button
            onClick={() => handleNavigate("menu")}
            className={`flex flex-col items-center py-3 px-2 text-xs font-medium transition-colors ${
              currentScreen === "menu"
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
      <div className="max-w-4xl mx-auto px-4 py-6 pb-20 md:pb-6">{renderCurrentScreen()}</div>
    </div>
  )
}
