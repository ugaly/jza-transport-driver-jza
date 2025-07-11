// "use client"

// import { motion } from "framer-motion"
// import { Truck, Zap } from "lucide-react"

// export default function SplashScreen() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 flex items-center justify-center relative overflow-hidden">
//       {/* Animated background elements */}
//       <div className="absolute inset-0">
//         {[...Array(20)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute w-2 h-2 bg-white/20 rounded-full"
//             initial={{
//               x: Math.random() * window.innerWidth,
//               y: Math.random() * window.innerHeight,
//               scale: 0,
//             }}
//             animate={{
//               scale: [0, 1, 0],
//               opacity: [0, 1, 0],
//             }}
//             transition={{
//               duration: 2,
//               repeat: Number.POSITIVE_INFINITY,
//               delay: Math.random() * 2,
//             }}
//           />
//         ))}
//       </div>

//       {/* Main logo and text */}
//       <div className="text-center z-10">
//         <motion.div
//           initial={{ scale: 0, rotate: -180 }}
//           animate={{ scale: 1, rotate: 0 }}
//           transition={{
//             duration: 1.5,
//             ease: "easeOut",
//             type: "spring",
//             stiffness: 100,
//           }}
//           className="mb-8"
//         >
//           <div className="relative">
//             <motion.div
//               animate={{ rotate: 360 }}
//               transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//               className="absolute inset-0 rounded-full border-4 border-white/30 border-t-white"
//             />
//             <div className="bg-white rounded-full p-6 shadow-2xl">
//               <Truck className="w-16 h-16 text-blue-600" />
//             </div>
//           </div>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.5, duration: 1 }}
//         >
//           <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">JZA Tech</h1>
//           <motion.div
//             initial={{ width: 0 }}
//             animate={{ width: "100%" }}
//             transition={{ delay: 1, duration: 1 }}
//             className="h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-4"
//           />
//           <p className="text-xl text-white/90 mb-8">Transportation Solutions</p>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 2, duration: 1 }}
//           className="flex items-center justify-center space-x-2 text-white/80"
//         >
//           <Zap className="w-5 h-5" />
//           <span>Powered by Innovation</span>
//         </motion.div>
//       </div>

//       {/* Loading indicator */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 2.5 }}
//         className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
//       >
//         <div className="flex space-x-2">
//           {[0, 1, 2].map((i) => (
//             <motion.div
//               key={i}
//               className="w-3 h-3 bg-white rounded-full"
//               animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
//               transition={{
//                 duration: 1,
//                 repeat: Number.POSITIVE_INFINITY,
//                 delay: i * 0.2,
//               }}
//             />
//           ))}
//         </div>
//       </motion.div>
//     </div>
//   )
// }


"use client"

import { motion } from "framer-motion"
import { Truck, Zap } from "lucide-react"
import { useEffect, useState } from "react"

export default function SplashScreen() {
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Set initial size
    updateWindowSize()

    // Add event listener for window resize
    window.addEventListener("resize", updateWindowSize)

    return () => window.removeEventListener("resize", updateWindowSize)
  }, [])

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-white rounded-full p-6 shadow-2xl mb-8">
            <Truck className="w-16 h-16 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">JZA Tech</h1>
          <p className="text-xl text-white/90">Transportation Solutions</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            initial={{
              x: Math.random() * windowSize.width,
              y: Math.random() * windowSize.height,
              scale: 0,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main logo and text */}
      <div className="text-center z-10">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            duration: 1.5,
            ease: "easeOut",
            type: "spring",
            stiffness: 100,
          }}
          className="mb-8"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="absolute inset-0 rounded-full border-4 border-white/30 border-t-white"
            />
            <div className="bg-white rounded-full p-6 shadow-2xl">
              <Truck className="w-16 h-16 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">JZA Tech</h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 1, duration: 1 }}
            className="h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-4"
          />
          <p className="text-xl text-white/90 mb-8">Transportation Solutions</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="flex items-center justify-center space-x-2 text-white/80"
        >
          <Zap className="w-5 h-5" />
          <span>Powered by Innovation</span>
        </motion.div>
      </div>

      {/* Loading indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex space-x-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-white rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
