"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Home, MenuIcon, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import HomeContent from "@/components/home-content"
import MenuContent from "@/components/menu-content"
import ProfileContent from "@/components/profile-content"

interface MobileLayoutProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function MobileLayout({ activeTab, setActiveTab }: MobileLayoutProps) {
  const router = useRouter()

  const menuItems = [
    { id: "home", label: "Home", icon: Home },
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
    <div className="flex flex-col h-screen">
      {/* Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 shadow-lg flex justify-between items-center"
      >
        <div>
          <h1 className="text-xl font-bold">JZA Tech</h1>
          <p className="text-sm opacity-90">Driver Portal</p>
        </div>
        <Button variant="ghost" size="icon" onClick={handleSignOut} className="text-white hover:bg-white/20">
          <LogOut className="w-5 h-5" />
        </Button>
      </motion.div>

      {/* Content */}
      <div className="flex-1 overflow-auto pb-20">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="p-4"
        >
          {renderContent()}
        </motion.div>
      </div>

      {/* Bottom Navigation */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg"
      >
        <div className="flex justify-around py-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant="ghost"
                className={`flex flex-col items-center space-y-1 h-16 px-4 ${
                  activeTab === item.id ? "text-blue-600 bg-blue-50" : "text-gray-600"
                }`}
                onClick={() => setActiveTab(item.id)}
              >
                <Icon className={`w-6 h-6 ${activeTab === item.id ? "text-blue-600" : "text-gray-600"}`} />
                <span className={`text-xs ${activeTab === item.id ? "text-blue-600 font-medium" : "text-gray-600"}`}>
                  {item.label}
                </span>
              </Button>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
