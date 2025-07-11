// "use client"

// import { useState, useEffect } from "react"
// import { motion } from "framer-motion"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import {
//   Fuel,
//   TrendingUp,
//   TrendingDown,
//   MapPin,
//   Calendar,
//   AlertCircle,
//   CheckCircle,
//   Gauge,
//   Droplets,
//   Activity,
// } from "lucide-react"
// import FuelForm from "./fuel-form"
// import { fuelService, type FuelEntry, type FuelSummary } from "../api/fuel-service"

// export default function FuelTracker() {
//   const [showForm, setShowForm] = useState(false)
//   const [formActionType, setFormActionType] = useState<"initial" | "refill" | "consume">("initial")
//   const [fuelHistory, setFuelHistory] = useState<FuelEntry[]>([])
//   const [fuelSummary, setFuelSummary] = useState<FuelSummary | null>(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const [isLoadingSummary, setIsLoadingSummary] = useState(false)
//   const [isCreatingEntry, setIsCreatingEntry] = useState(false)
//   const [error, setError] = useState("")
//   const [success, setSuccess] = useState("")

//   useEffect(() => {
//     loadFuelData()
//   }, [])

//   const loadFuelData = async () => {
//     try {
//       setIsLoading(true)
//       setError("")

//       // Load history first to determine if initial entry exists
//       const history = await fuelService.getFuelHistory()
//       setFuelHistory(history)

//       // Load summary if history exists
//       if (history.length > 0) {
//         setIsLoadingSummary(true)
//         try {
//           const summary = await fuelService.getFuelSummary()
//           setFuelSummary(summary)
//         } catch (summaryError) {
//           console.error("Error loading fuel summary:", summaryError)
//         } finally {
//           setIsLoadingSummary(false)
//         }
//       }
//     } catch (err: any) {
//       console.error("Error loading fuel data:", err)
//       if (err.response?.status === 401) {
//         setError("Session expired. Please login again.")
//       } else {
//         setError("Failed to load fuel data. Please try again.")
//       }
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleFormSubmit = async (fuelData: any) => {
//     try {
//       setIsCreatingEntry(true)
//       setError("")

//       const response = await fuelService.addFuelEntry(fuelData)

//       // Reload data after successful entry
//       await loadFuelData()

//       setShowForm(false)
//       setSuccess("Fuel entry saved successfully!")
//       setTimeout(() => setSuccess(""), 5000)
//     } catch (err: any) {
//       console.error("Error creating fuel entry:", err)
//       if (err.response?.status === 401) {
//         setError("Session expired. Please login again.")
//       } else {
//         setError("Failed to save fuel entry. Please try again.")
//       }
//     } finally {
//       setIsCreatingEntry(false)
//     }
//   }

//   const handleActionClick = (actionType: "initial" | "refill" | "consume") => {
//     setFormActionType(actionType)
//     setShowForm(true)
//     setError("")
//   }

//   const getActionIcon = (actionType: string) => {
//     switch (actionType) {
//       case "initial":
//         return <Gauge className="w-4 h-4" />
//       case "refill":
//         return <TrendingUp className="w-4 h-4" />
//       case "consume":
//         return <TrendingDown className="w-4 h-4" />
//       default:
//         return <Fuel className="w-4 h-4" />
//     }
//   }

//   const getActionColor = (actionType: string) => {
//     switch (actionType) {
//       case "initial":
//         return "bg-blue-100 text-blue-800"
//       case "refill":
//         return "bg-green-100 text-green-800"
//       case "consume":
//         return "bg-orange-100 text-orange-800"
//       default:
//         return "bg-gray-100 text-gray-800"
//     }
//   }

//   const getActionLabel = (actionType: string) => {
//     switch (actionType) {
//       case "initial":
//         return "Awali"
//       case "refill":
//         return "Kujaza"
//       case "consume":
//         return "Matumizi"
//       default:
//         return actionType
//     }
//   }

//   if (showForm) {
//     return (
//       <FuelForm
//         onSubmit={handleFormSubmit}
//         onCancel={() => {
//           setShowForm(false)
//           setError("")
//         }}
//         actionType={formActionType}
//         isLoading={isCreatingEntry}
//         error={error}
//       />
//     )
//   }

//   return (
//     <div className="space-y-6 p-4 max-w-4xl mx-auto">
//       {/* Header */}
//       <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//         <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 flex items-center">
//           <Fuel className="w-8 h-8 mr-3 text-blue-600" />
//           Fuel Tracker
//         </h1>
//         <p className="text-gray-600">Fuatilia matumizi ya mafuta yako</p>
//       </motion.div>

//       {/* Success/Error Messages */}
//       {success && (
//         <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
//           <Alert className="border-green-200 bg-green-50">
//             <CheckCircle className="h-4 w-4 text-green-600" />
//             <AlertDescription className="text-green-800">{success}</AlertDescription>
//           </Alert>
//         </motion.div>
//       )}

//       {error && (
//         <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
//           <Alert variant="destructive">
//             <AlertCircle className="h-4 w-4" />
//             <AlertDescription>{error}</AlertDescription>
//           </Alert>
//         </motion.div>
//       )}

//       {/* Loading State */}
//       {isLoading ? (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="flex items-center justify-center py-12"
//         >
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//           <span className="ml-2 text-gray-600">Loading fuel data...</span>
//         </motion.div>
//       ) : (
//         <>
//           {/* Summary Section */}
//           {fuelSummary && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.1 }}
//             >
//               <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
//                 <CardHeader>
//                   <CardTitle className="text-blue-800 flex items-center">
//                     <Activity className="w-5 h-5 mr-2" />
//                     Muhtasari wa Mafuta - {fuelSummary.category}
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                     <div className="text-center">
//                       <div className="bg-blue-100 rounded-full p-3 w-12 h-12 mx-auto mb-2 flex items-center justify-center">
//                         <Gauge className="w-6 h-6 text-blue-600" />
//                       </div>
//                       <p className="text-sm text-gray-600">Awali</p>
//                       <p className="text-lg font-bold text-blue-800">{fuelSummary.initial_litres}L</p>
//                     </div>
//                     <div className="text-center">
//                       <div className="bg-green-100 rounded-full p-3 w-12 h-12 mx-auto mb-2 flex items-center justify-center">
//                         <TrendingUp className="w-6 h-6 text-green-600" />
//                       </div>
//                       <p className="text-sm text-gray-600">Jumla Kujaza</p>
//                       <p className="text-lg font-bold text-green-800">{fuelSummary.total_refilled}L</p>
//                     </div>
//                     <div className="text-center">
//                       <div className="bg-orange-100 rounded-full p-3 w-12 h-12 mx-auto mb-2 flex items-center justify-center">
//                         <TrendingDown className="w-6 h-6 text-orange-600" />
//                       </div>
//                       <p className="text-sm text-gray-600">Jumla Matumizi</p>
//                       <p className="text-lg font-bold text-orange-800">{fuelSummary.total_consumed}L</p>
//                     </div>
//                     <div className="text-center">
//                       <div className="bg-cyan-100 rounded-full p-3 w-12 h-12 mx-auto mb-2 flex items-center justify-center">
//                         <Droplets className="w-6 h-6 text-cyan-600" />
//                       </div>
//                       <p className="text-sm text-gray-600">Yaliyobaki</p>
//                       <p className="text-lg font-bold text-cyan-800">{fuelSummary.remaining_balance}L</p>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           )}

//           {/* Action Buttons */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//           >
//             <Card>
//               <CardHeader>
//                 <CardTitle>Vitendo vya Haraka</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 {fuelHistory.length === 0 ? (
//                   // Show only initial button if no history
//                   <Button
//                     onClick={() => handleActionClick("initial")}
//                     className="w-full h-16 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105"
//                   >
//                     <Gauge className="w-6 h-6 mr-3" />
//                     <div className="text-left">
//                       <div className="font-semibold">Weka Kiwango cha Awali</div>
//                       <div className="text-sm opacity-90">Anza kufuatilia mafuta yako</div>
//                     </div>
//                   </Button>
//                 ) : (
//                   // Show refill and consume buttons if history exists
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <Button
//                       onClick={() => handleActionClick("refill")}
//                       className="h-16 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105"
//                     >
//                       <TrendingUp className="w-6 h-6 mr-3" />
//                       <div className="text-left">
//                         <div className="font-semibold">Jaza Mafuta</div>
//                         <div className="text-sm opacity-90">Ongeza mafuta</div>
//                       </div>
//                     </Button>
//                     <Button
//                       onClick={() => handleActionClick("consume")}
//                       className="h-16 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105"
//                     >
//                       <TrendingDown className="w-6 h-6 mr-3" />
//                       <div className="text-left">
//                         <div className="font-semibold">Weka Yaliyobaki</div>
//                         <div className="text-sm opacity-90">Rekodi matumizi</div>
//                       </div>
//                     </Button>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </motion.div>

//           {/* History Section */}
//           {fuelHistory.length > 0 && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.3 }}
//             >
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center">
//                     <Activity className="w-5 h-5 mr-2" />
//                     Historia ya Mafuta ({fuelHistory.length})
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-3">
//                     {fuelHistory.map((entry, index) => (
//                       <motion.div
//                         key={entry.id}
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ duration: 0.3, delay: index * 0.1 }}
//                         className="flex items-start justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
//                       >
//                         <div className="flex items-start space-x-3 flex-1">
//                           <div className={`p-2 rounded-full ${getActionColor(entry.action_type)}`}>
//                             {getActionIcon(entry.action_type)}
//                           </div>
//                           <div className="flex-1">
//                             <div className="flex items-center space-x-2 mb-1">
//                               <Badge className={getActionColor(entry.action_type)}>
//                                 {getActionLabel(entry.action_type)}
//                               </Badge>
//                               <span className="text-lg font-bold text-gray-800">{entry.litres}L</span>
//                             </div>
//                             <p className="text-sm text-gray-800 mb-1">{entry.description}</p>
//                             <div className="flex items-center space-x-4 text-xs text-gray-500">
//                               <div className="flex items-center">
//                                 <MapPin className="w-3 h-3 mr-1" />
//                                 <span>{entry.place}</span>
//                               </div>
//                               <div className="flex items-center">
//                                 <Calendar className="w-3 h-3 mr-1" />
//                                 <span>{new Date(entry.recorded_at).toLocaleDateString()}</span>
//                               </div>
//                             </div>
//                             {entry.fuel_used && (
//                               <div className="mt-2 text-xs text-orange-600">
//                                 Mafuta yaliyotumika: {entry.fuel_used}L
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                         {entry.balance && (
//                           <div className="text-right ml-4">
//                             <p className="text-sm text-gray-500">Salio</p>
//                             <p className="text-lg font-bold text-blue-600">{entry.balance}L</p>
//                           </div>
//                         )}
//                       </motion.div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           )}

//           {/* Empty State */}
//           {fuelHistory.length === 0 && !isLoading && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.3 }}
//             >
//               <Card className="bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200">
//                 <CardContent className="text-center py-12">
//                   <Fuel className="w-16 h-16 mx-auto text-gray-300 mb-4" />
//                   <h3 className="text-xl font-semibold text-gray-800 mb-2">Hakuna data ya mafuta</h3>
//                   <p className="text-gray-600 mb-6">Anza kufuatilia mafuta yako kwa kuweka kiwango cha awali</p>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           )}
//         </>
//       )}
//     </div>
//   )
// }




// "use client"

// import { useState, useEffect } from "react"
// import { motion } from "framer-motion"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import {
//   Fuel,
//   TrendingUp,
//   TrendingDown,
//   MapPin,
//   Calendar,
//   AlertCircle,
//   CheckCircle,
//   Gauge,
//   Droplets,
//   Activity,
// } from "lucide-react"
// import FuelForm from "./fuel-form"
// import BackButton from "./back-button"
// import { fuelService, type FuelEntry, type FuelSummary } from "../api/fuel-service"

// export default function FuelTracker() {
//   const [showForm, setShowForm] = useState(false)
//   const [formActionType, setFormActionType] = useState<"initial" | "refill" | "consume">("initial")
//   const [fuelHistory, setFuelHistory] = useState<FuelEntry[]>([])
//   const [fuelSummary, setFuelSummary] = useState<FuelSummary | null>(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const [isLoadingSummary, setIsLoadingSummary] = useState(false)
//   const [isCreatingEntry, setIsCreatingEntry] = useState(false)
//   const [error, setError] = useState("")
//   const [success, setSuccess] = useState("")

//   useEffect(() => {
//     loadFuelData()
//   }, [])

//   const loadFuelData = async () => {
//     try {
//       setIsLoading(true)
//       setError("")

//       console.log("Loading fuel data...")

//       // Load history first to determine if initial entry exists
//       const history = await fuelService.getFuelHistory()
//       console.log("Fuel history loaded:", history)
//       setFuelHistory(history)

//       // Load summary if history exists
//       if (history.length > 0) {
//         setIsLoadingSummary(true)
//         try {
//           console.log("Loading fuel summary...")
//           const summary = await fuelService.getFuelSummary()
//           console.log("Fuel summary loaded:", summary)
//           setFuelSummary(summary)
//         } catch (summaryError) {
//           console.error("Error loading fuel summary:", summaryError)
//           // Show the specific error from the API
//           if (summaryError.response?.data?.detail) {
//             setError(`Summary error: ${summaryError.response.data.detail}`)
//           }
//         } finally {
//           setIsLoadingSummary(false)
//         }
//       }
//     } catch (err: any) {
//       console.error("Error loading fuel data:", err)
//       if (err.response?.status === 401) {
//         setError("Session expired. Please login again.")
//       } else if (err.response?.data?.detail) {
//         setError(`API Error: ${err.response.data.detail}`)
//       } else {
//         setError("Failed to load fuel data. Please try again.")
//       }
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleFormSubmit = async (fuelData: any) => {
//     try {
//       setIsCreatingEntry(true)
//       setError("")

//       console.log("Submitting fuel entry:", fuelData)

//       const response = await fuelService.addFuelEntry(fuelData)
//       console.log("Fuel entry response:", response)

//       // Reload data after successful entry
//       await loadFuelData()

//       setShowForm(false)
//       setSuccess(`Fuel entry saved successfully! ${response.message || ""}`)
//       setTimeout(() => setSuccess(""), 5000)
//     } catch (err: any) {
//       console.error("Error creating fuel entry:", err)
//       if (err.response?.status === 401) {
//         setError("Session expired. Please login again.")
//       } else if (err.response?.data?.detail) {
//         setError(`API Error: ${err.response.data.detail}`)
//       } else if (err.response?.data) {
//         setError(`Error: ${JSON.stringify(err.response.data)}`)
//       } else {
//         setError("Failed to save fuel entry. Please try again.")
//       }
//     } finally {
//       setIsCreatingEntry(false)
//     }
//   }

//   const handleActionClick = (actionType: "initial" | "refill" | "consume") => {
//     setFormActionType(actionType)
//     setShowForm(true)
//     setError("")
//   }

//   const getActionIcon = (actionType: string) => {
//     switch (actionType) {
//       case "initial":
//         return <Gauge className="w-4 h-4" />
//       case "refill":
//         return <TrendingUp className="w-4 h-4" />
//       case "consume":
//         return <TrendingDown className="w-4 h-4" />
//       default:
//         return <Fuel className="w-4 h-4" />
//     }
//   }

//   const getActionColor = (actionType: string) => {
//     switch (actionType) {
//       case "initial":
//         return "bg-blue-100 text-blue-800"
//       case "refill":
//         return "bg-green-100 text-green-800"
//       case "consume":
//         return "bg-orange-100 text-orange-800"
//       default:
//         return "bg-gray-100 text-gray-800"
//     }
//   }

//   const getActionLabel = (actionType: string) => {
//     switch (actionType) {
//       case "initial":
//         return "Awali"
//       case "refill":
//         return "Kujaza"
//       case "consume":
//         return "Matumizi"
//       default:
//         return actionType
//     }
//   }

//   if (showForm) {
//     return (
//       <FuelForm
//         onSubmit={handleFormSubmit}
//         onCancel={() => {
//           setShowForm(false)
//           setError("")
//         }}
//         actionType={formActionType}
//         isLoading={isCreatingEntry}
//         error={error}
//       />
//     )
//   }

//   return (
//     <div className="space-y-6 p-4 max-w-4xl mx-auto">
//       {/* Header with Back Button */}
//       <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//         <div className="flex items-center space-x-4 mb-4">
//           <BackButton fallbackPath="/menu" />
//           <div className="flex-1">
//             <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 flex items-center">
//               <Fuel className="w-8 h-8 mr-3 text-blue-600" />
//               Fuel Tracker
//             </h1>
//             <p className="text-gray-600">Fuatilia matumizi ya mafuta yako</p>
//           </div>
//         </div>
//       </motion.div>

//       {/* Success/Error Messages */}
//       {success && (
//         <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
//           <Alert className="border-green-200 bg-green-50">
//             <CheckCircle className="h-4 w-4 text-green-600" />
//             <AlertDescription className="text-green-800">{success}</AlertDescription>
//           </Alert>
//         </motion.div>
//       )}

//       {error && (
//         <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
//           <Alert variant="destructive">
//             <AlertCircle className="h-4 w-4" />
//             <AlertDescription>{error}</AlertDescription>
//           </Alert>
//         </motion.div>
//       )}

//       {/* Loading State */}
//       {isLoading ? (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="flex items-center justify-center py-12"
//         >
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//           <span className="ml-2 text-gray-600">Loading fuel data...</span>
//         </motion.div>
//       ) : (
//         <>
//           {/* Summary Section */}
//           {fuelSummary && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.1 }}
//             >
//               <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
//                 <CardHeader>
//                   <CardTitle className="text-blue-800 flex items-center">
//                     <Activity className="w-5 h-5 mr-2" />
//                     Muhtasari wa Mafuta - {fuelSummary.category}
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                     <div className="text-center">
//                       <div className="bg-blue-100 rounded-full p-3 w-12 h-12 mx-auto mb-2 flex items-center justify-center">
//                         <Gauge className="w-6 h-6 text-blue-600" />
//                       </div>
//                       <p className="text-sm text-gray-600">Awali</p>
//                       <p className="text-lg font-bold text-blue-800">{fuelSummary.initial_litres}L</p>
//                     </div>
//                     {/* <div className="text-center">
//                       <div className="bg-green-100 rounded-full p-3 w-12 h-12 mx-auto mb-2 flex items-center justify-center">
//                         <TrendingUp className="w-6 h-6 text-green-600" />
//                       </div>
//                       <p className="text-sm text-gray-600">Jumla Kujaza</p>
//                       <p className="text-lg font-bold text-green-800">{fuelSummary.total_refilled}L</p>
//                     </div> */}
//                     {/* <div className="text-center">
//                       <div className="bg-orange-100 rounded-full p-3 w-12 h-12 mx-auto mb-2 flex items-center justify-center">
//                         <TrendingDown className="w-6 h-6 text-orange-600" />
//                       </div>
//                       <p className="text-sm text-gray-600">Jumla Matumizi</p>
//                       <p className="text-lg font-bold text-orange-800">{fuelSummary.total_consumed}L</p>
//                     </div> */}
//                     <div className="text-center">
//                       <div className="bg-cyan-100 rounded-full p-3 w-12 h-12 mx-auto mb-2 flex items-center justify-center">
//                         <Droplets className="w-6 h-6 text-cyan-600" />
//                       </div>
//                       <p className="text-sm text-gray-600">Yaliyobaki</p>
//                       <p className="text-lg font-bold text-cyan-800">{fuelSummary.remaining_balance}L</p>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           )}

//           {/* Action Buttons */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//           >
//             <Card>
//               <CardHeader>
//                 <CardTitle>Vitendo vya Haraka</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 {fuelHistory.length === 0 ? (
//                   // Show only initial button if no history
//                   <Button
//                     onClick={() => handleActionClick("initial")}
//                     className="w-full h-16 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105"
//                   >
//                     <Gauge className="w-6 h-6 mr-3" />
//                     <div className="text-left">
//                       <div className="font-semibold">Weka Kiwango cha Awali</div>
//                       <div className="text-sm opacity-90">Anza kufuatilia mafuta yako</div>
//                     </div>
//                   </Button>
//                 ) : (
//                   // Show refill and consume buttons if history exists
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <Button
//                       onClick={() => handleActionClick("refill")}
//                       className="h-16 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105"
//                     >
//                       <TrendingUp className="w-6 h-6 mr-3" />
//                       <div className="text-left">
//                         <div className="font-semibold">Jaza Mafuta</div>
//                         <div className="text-sm opacity-90">Ongeza mafuta</div>
//                       </div>
//                     </Button>
//                     <Button
//                       onClick={() => handleActionClick("consume")}
//                       className="h-16 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105"
//                     >
//                       <TrendingDown className="w-6 h-6 mr-3" />
//                       <div className="text-left">
//                         <div className="font-semibold">Weka Yaliyobaki</div>
//                         <div className="text-sm opacity-90">Rekodi matumizi</div>
//                       </div>
//                     </Button>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </motion.div>

//           {/* History Section */}
//           {fuelHistory.length > 0 && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.3 }}
//             >
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center">
//                     <Activity className="w-5 h-5 mr-2" />
//                     Historia ya Mafuta ({fuelHistory.length})
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-3">
//                     {fuelHistory.map((entry, index) => (
//                       <motion.div
//                         key={entry.id}
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ duration: 0.3, delay: index * 0.1 }}
//                         className="flex items-start justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
//                       >
//                         <div className="flex items-start space-x-3 flex-1">
//                           <div className={`p-2 rounded-full ${getActionColor(entry.action_type)}`}>
//                             {getActionIcon(entry.action_type)}
//                           </div>
//                           <div className="flex-1">
//                             <div className="flex items-center space-x-2 mb-1">
//                               <Badge className={getActionColor(entry.action_type)}>
//                                 {getActionLabel(entry.action_type)}
//                               </Badge>
//                               <span className="text-lg font-bold text-gray-800">{entry.litres}L</span>
//                             </div>
//                             <p className="text-sm text-gray-800 mb-1">{entry.description}</p>
//                             <div className="flex items-center space-x-4 text-xs text-gray-500">
//                               <div className="flex items-center">
//                                 <MapPin className="w-3 h-3 mr-1" />
//                                 <span>{entry.place}</span>
//                               </div>
//                               <div className="flex items-center">
//                                 <Calendar className="w-3 h-3 mr-1" />
//                                 <span>{new Date(entry.recorded_at).toLocaleDateString()}</span>
//                               </div>
//                             </div>
//                             {entry.fuel_used && (
//                               <div className="mt-2 text-xs text-orange-600">
//                                 Mafuta yaliyotumika: {entry.fuel_used}L
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                         {entry.balance && (
//                           <div className="text-right ml-4">
//                             <p className="text-sm text-gray-500">Salio</p>
//                             <p className="text-lg font-bold text-blue-600">{entry.balance}L</p>
//                           </div>
//                         )}
//                       </motion.div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           )}

//           {/* Empty State */}
//           {fuelHistory.length === 0 && !isLoading && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.3 }}
//             >
//               <Card className="bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200">
//                 <CardContent className="text-center py-12">
//                   <Fuel className="w-16 h-16 mx-auto text-gray-300 mb-4" />
//                   <h3 className="text-xl font-semibold text-gray-800 mb-2">Hakuna data ya mafuta</h3>
//                   <p className="text-gray-600 mb-6">Anza kufuatilia mafuta yako kwa kuweka kiwango cha awali</p>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           )}
//         </>
//       )}
//     </div>
//   )
// }





"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Fuel,
  TrendingUp,
  TrendingDown,
  MapPin,
  Calendar,
  AlertCircle,
  CheckCircle,
  Gauge,
  Droplets,
  Activity,
} from "lucide-react"
import FuelForm from "./fuel-form"
import BackButton from "./back-button"
import { fuelService, type FuelEntry, type FuelSummary } from "../api/fuel-service"

export default function FuelTracker() {
  const [showForm, setShowForm] = useState(false)
  const [formActionType, setFormActionType] = useState<"initial" | "refill" | "consume">("initial")
  const [fuelHistory, setFuelHistory] = useState<FuelEntry[]>([])
  const [fuelSummary, setFuelSummary] = useState<FuelSummary | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingSummary, setIsLoadingSummary] = useState(false)
  const [isCreatingEntry, setIsCreatingEntry] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    loadFuelData()
  }, [])

  const loadFuelData = async () => {
    try {
      setIsLoading(true)
      setError("")
      console.log("Loading fuel data...")

      // Load history first to determine if initial entry exists
      const history = await fuelService.getFuelHistory()
      console.log("Fuel history loaded:", history)
      setFuelHistory(history)

      // Load summary if history exists
      if (history.length > 0) {
        setIsLoadingSummary(true)
        try {
          console.log("Loading fuel summary...")
          const summary = await fuelService.getFuelSummary()
          console.log("Fuel summary loaded:", summary)
          setFuelSummary(summary)
        } catch (summaryError: any) {
          console.error("Error loading fuel summary:", summaryError)
          // Show the specific error from the API
          if (summaryError?.response?.data?.detail) {
            setError(`Summary error: ${summaryError.response.data.detail}`)
          }
        } finally {
          setIsLoadingSummary(false)
        }
      }
    } catch (err: any) {
      console.error("Error loading fuel data:", err)
      if (err.response?.status === 401) {
        setError("Session expired. Please login again.")
      } else if (err.response?.data?.detail) {
        setError(`API Error: ${err.response.data.detail}`)
      } else {
        setError("Failed to load fuel data. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleFormSubmit = async (fuelData: any) => {
    try {
      setIsCreatingEntry(true)
      setError("")
      console.log("Submitting fuel entry:", fuelData)

      const response = await fuelService.addFuelEntry(fuelData)
      console.log("Fuel entry response:", response)

      // Reload data after successful entry
      await loadFuelData()
      setShowForm(false)
      setSuccess(`Fuel entry saved successfully! ${response.message || ""}`)
      setTimeout(() => setSuccess(""), 5000)
    } catch (err: any) {
      console.error("Error creating fuel entry:", err)
      if (err.response?.status === 401) {
        setError("Session expired. Please login again.")
      } else if (err.response?.data?.detail) {
        setError(`API Error: ${err.response.data.detail}`)
      } else if (err.response?.data) {
        setError(`Error: ${JSON.stringify(err.response.data)}`)
      } else {
        setError("Failed to save fuel entry. Please try again.")
      }
    } finally {
      setIsCreatingEntry(false)
    }
  }

  const handleActionClick = (actionType: "initial" | "refill" | "consume") => {
    setFormActionType(actionType)
    setShowForm(true)
    setError("")
  }

  const getActionIcon = (actionType: string) => {
    switch (actionType) {
      case "initial":
        return <Gauge className="w-4 h-4" />
      case "refill":
        return <TrendingUp className="w-4 h-4" />
      case "consume":
        return <TrendingDown className="w-4 h-4" />
      default:
        return <Fuel className="w-4 h-4" />
    }
  }

  const getActionColor = (actionType: string) => {
    switch (actionType) {
      case "initial":
        return "bg-blue-100 text-blue-800"
      case "refill":
        return "bg-green-100 text-green-800"
      case "consume":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getActionLabel = (actionType: string) => {
    switch (actionType) {
      case "initial":
        return "Awali"
      case "refill":
        return "Kujaza"
      case "consume":
        return "Matumizi"
      default:
        return actionType
    }
  }

  if (showForm) {
    return (
      <FuelForm
        onSubmit={handleFormSubmit}
        onCancel={() => {
          setShowForm(false)
          setError("")
        }}
        actionType={formActionType}
        isLoading={isCreatingEntry}
        error={error}
      />
    )
  }

  return (
    <div className="space-y-6 p-4 max-w-4xl mx-auto">
      {/* Header with Back Button */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center space-x-4 mb-4">
          <BackButton fallbackPath="/menu" />
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 flex items-center">
              <Fuel className="w-8 h-8 mr-3 text-blue-600" />
              Fuel Tracker
            </h1>
            <p className="text-gray-600">Fuatilia matumizi ya mafuta yako</p>
          </div>
        </div>
      </motion.div>

      {/* Success/Error Messages */}
      {success && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">{success}</AlertDescription>
          </Alert>
        </motion.div>
      )}

      {error && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </motion.div>
      )}

      {/* Loading State */}
      {isLoading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center py-12"
        >
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading fuel data...</span>
        </motion.div>
      ) : (
        <>
          {/* Summary Section */}
          {fuelSummary && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-800 flex items-center">
                    <Activity className="w-5 h-5 mr-2" />
                    Muhtasari wa Mafuta - {fuelSummary.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="bg-blue-100 rounded-full p-3 w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                        <Gauge className="w-6 h-6 text-blue-600" />
                      </div>
                      <p className="text-sm text-gray-600">Awali</p>
                      <p className="text-lg font-bold text-blue-800">{fuelSummary.initial_litres}L</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-cyan-100 rounded-full p-3 w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                        <Droplets className="w-6 h-6 text-cyan-600" />
                      </div>
                      <p className="text-sm text-gray-600">Yaliyobaki</p>
                      <p className="text-lg font-bold text-cyan-800">{fuelSummary.remaining_balance}L</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Vitendo vya Haraka</CardTitle>
              </CardHeader>
              <CardContent>
                {fuelHistory.length === 0 ? (
                  // Show only initial button if no history
                  <Button
                    onClick={() => handleActionClick("initial")}
                    className="w-full h-16 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105"
                  >
                    <Gauge className="w-6 h-6 mr-3" />
                    <div className="text-left">
                      <div className="font-semibold">Weka Kiwango cha Awali</div>
                      <div className="text-sm opacity-90">Anza kufuatilia mafuta yako</div>
                    </div>
                  </Button>
                ) : (
                  // Show refill and consume buttons if history exists
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button
                      onClick={() => handleActionClick("refill")}
                      className="h-16 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105"
                    >
                      <TrendingUp className="w-6 h-6 mr-3" />
                      <div className="text-left">
                        <div className="font-semibold">Jaza Mafuta</div>
                        <div className="text-sm opacity-90">Ongeza mafuta</div>
                      </div>
                    </Button>
                    <Button
                      onClick={() => handleActionClick("consume")}
                      className="h-16 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105"
                    >
                      <TrendingDown className="w-6 h-6 mr-3" />
                      <div className="text-left">
                        <div className="font-semibold">Weka Yaliyobaki</div>
                        <div className="text-sm opacity-90">Rekodi matumizi</div>
                      </div>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* History Section */}
          {fuelHistory.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="w-5 h-5 mr-2" />
                    Historia ya Mafuta ({fuelHistory.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {fuelHistory.map((entry, index) => (
                      <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-start justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-start space-x-3 flex-1">
                          <div className={`p-2 rounded-full ${getActionColor(entry.action_type)}`}>
                            {getActionIcon(entry.action_type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <Badge className={getActionColor(entry.action_type)}>
                                {getActionLabel(entry.action_type)}
                              </Badge>
                              <span className="text-lg font-bold text-gray-800">{entry.litres}L</span>
                            </div>
                            <p className="text-sm text-gray-800 mb-1">{entry.description}</p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <div className="flex items-center">
                                <MapPin className="w-3 h-3 mr-1" />
                                <span>{entry.place}</span>
                              </div>
                              <div className="flex items-center">
                                <Calendar className="w-3 h-3 mr-1" />
                                <span>{new Date(entry.recorded_at).toLocaleDateString()}</span>
                              </div>
                            </div>
                            {entry.fuel_used && (
                              <div className="mt-2 text-xs text-orange-600">
                                Mafuta yaliyotumika: {entry.fuel_used}L
                              </div>
                            )}
                          </div>
                        </div>
                        {entry.balance && (
                          <div className="text-right ml-4">
                            <p className="text-sm text-gray-500">Salio</p>
                            <p className="text-lg font-bold text-blue-600">{entry.balance}L</p>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Empty State */}
          {fuelHistory.length === 0 && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200">
                <CardContent className="text-center py-12">
                  <Fuel className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Hakuna data ya mafuta</h3>
                  <p className="text-gray-600 mb-6">Anza kufuatilia mafuta yako kwa kuweka kiwango cha awali</p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </>
      )}
    </div>
  )
}
