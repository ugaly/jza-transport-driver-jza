// "use client"

// import { motion } from "framer-motion"
// import { Card, CardContent } from "@/components/ui/card"
// import { Route, DollarSign, FileText, Settings, HelpCircle, Phone, MapPin, Fuel, Wrench } from "lucide-react"

// export default function MenuContent() {
//   const menuItems = [
//     { id: 1, name: "Journeys", icon: Route, color: "from-blue-500 to-blue-600" },
//     { id: 2, name: "Expenses", icon: DollarSign, color: "from-red-500 to-red-600" },
//     { id: 3, name: "Reports", icon: FileText, color: "from-green-500 to-green-600" },
//     { id: 4, name: "Fuel Tracker", icon: Fuel, color: "from-orange-500 to-orange-600" },
//     { id: 5, name: "Maintenance", icon: Wrench, color: "from-purple-500 to-purple-600" },
//     { id: 6, name: "Locations", icon: MapPin, color: "from-teal-500 to-teal-600" },
//     { id: 7, name: "Settings", icon: Settings, color: "from-gray-500 to-gray-600" },
//     { id: 8, name: "Help", icon: HelpCircle, color: "from-indigo-500 to-indigo-600" },
//     { id: 9, name: "Contact", icon: Phone, color: "from-pink-500 to-pink-600" },
//   ]

//   return (
//     <div className="space-y-6">
//       <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//         <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Menu</h1>
//         <p className="text-gray-600">Access all features and tools</p>
//       </motion.div>

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: 0.1 }}
//         className="grid grid-cols-2 md:grid-cols-3 gap-4"
//       >
//         {menuItems.map((item, index) => {
//           const Icon = item.icon
//           return (
//             <motion.div
//               key={item.id}
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.3, delay: index * 0.1 }}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border-0 bg-white">
//                 <CardContent className="p-6 text-center">
//                   <div
//                     className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center shadow-lg`}
//                   >
//                     <Icon className="w-8 h-8 text-white" />
//                   </div>
//                   <h3 className="font-semibold text-gray-800 text-sm md:text-base">{item.name}</h3>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           )
//         })}
//       </motion.div>

//       {/* Quick Stats */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: 0.3 }}
//       >
//         <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
//           <CardContent className="p-6">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Stats</h3>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
//               <div>
//                 <p className="text-2xl font-bold text-blue-600">12</p>
//                 <p className="text-sm text-gray-600">Total Journeys</p>
//               </div>
//               <div>
//                 <p className="text-2xl font-bold text-green-600">TSh 2.5M</p>
//                 <p className="text-sm text-gray-600">Total Income</p>
//               </div>
//               <div>
//                 <p className="text-2xl font-bold text-red-600">TSh 800K</p>
//                 <p className="text-sm text-gray-600">Total Expenses</p>
//               </div>
//               <div>
//                 <p className="text-2xl font-bold text-purple-600">TSh 1.7M</p>
//                 <p className="text-sm text-gray-600">Net Profit</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </motion.div>
//     </div>
//   )
// }



"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Route, DollarSign, FileText, Settings, HelpCircle, Phone, MapPin, Fuel, Wrench, AlarmClockIcon } from "lucide-react"

export default function MenuContent() {
  const router = useRouter()

  const menuItems = [
    { id: 1, name: "Journeys", icon: Route, color: "from-blue-500 to-blue-600", path: "/home" },
    { id: 2, name: "Expenses", icon: DollarSign, color: "from-red-500 to-red-600", path: "/expenses" },
    { id: 2, name: "Maombi", icon: AlarmClockIcon, color: "from-yellow-500 to-yellow-600", path: "/driver-journey-requests" },

    { id: 3, name: "Reports", icon: FileText, color: "from-green-500 to-green-600", path: "/reports" },
    { id: 4, name: "Fuel Tracker", icon: Fuel, color: "from-orange-500 to-orange-600", path: "/fuel-tracker" },
    { id: 5, name: "Maintenance", icon: Wrench, color: "from-purple-500 to-purple-600", path: "/driver-journey-requests" },
    { id: 6, name: "Locations", icon: MapPin, color: "from-teal-500 to-teal-600", path: "/locations" },
    { id: 7, name: "Settings", icon: Settings, color: "from-gray-500 to-gray-600", path: "/settings" },
    { id: 8, name: "Help", icon: HelpCircle, color: "from-indigo-500 to-indigo-600", path: "/help" },
    { id: 9, name: "Contact", icon: Phone, color: "from-pink-500 to-pink-600", path: "/contact" },
  ]

  const handleMenuClick = (path: string) => {
    router.push(path)
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Menu</h1>
        <p className="text-gray-600">Access all features and tools</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-3 gap-4"
      >
        {menuItems.map((item, index) => {
          const Icon = item.icon
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card
                className="cursor-pointer hover:shadow-lg transition-all duration-200 border-0 bg-white"
                onClick={() => handleMenuClick(item.path)}
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center shadow-lg`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800 text-sm md:text-base">{item.name}</h3>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-blue-600">12</p>
                <p className="text-sm text-gray-600">Total Journeys</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">TSh 2.5M</p>
                <p className="text-sm text-gray-600">Total Income</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">TSh 800K</p>
                <p className="text-sm text-gray-600">Total Expenses</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">TSh 1.7M</p>
                <p className="text-sm text-gray-600">Net Profit</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
