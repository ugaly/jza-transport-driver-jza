"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Home, MenuIcon, User, Truck, LogOut, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import HomeContent from "@/components/home-content"
import MenuContent from "@/components/menu-content"
import ProfileContent from "@/components/profile-content"

interface DesktopLayoutProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function DesktopLayout({ activeTab, setActiveTab }: DesktopLayoutProps) {
  const router = useRouter()

  const menuItems = [
    { id: "home", label: "Dashboard", icon: Home },
    { id: "menu", label: "Menu", icon: MenuIcon },
    { id: "profile", label: "Profile", icon: User },
  ]

  const handleSignOut = () => {
    localStorage.removeItem("jza-auth")
    router.push("/login")
  }

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HomeContent />
      case "menu":
        return <MenuContent />
      case "profile":
        return <ProfileContent />
      default:
        return <HomeContent />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-64 bg-white shadow-lg border-r border-gray-200"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-2">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">JZA Tech</h1>
              <p className="text-sm text-gray-500">Driver Portal</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className={`w-full justify-start h-12 ${
                  activeTab === item.id
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab(item.id)}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </Button>
            )
          })}
        </nav>

        {/* User Profile */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center space-x-3 mb-3">
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>DR</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">Driver Name</p>
              <p className="text-xs text-gray-500">Online</p>
            </div>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
              <Bell className="w-4 h-4" />
            </Button>
          </div>
          <Button variant="outline" className="w-full" size="sm" onClick={handleSignOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-6"
        >
          {renderContent()}
        </motion.div>
      </div>
    </div>
  )
}
