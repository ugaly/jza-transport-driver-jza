// "use client"

// import { useState } from "react"
// import { motion } from "framer-motion"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { MapPin, Calendar, Plus, TrendingUp, TrendingDown, DollarSign, Route } from "lucide-react"
// import JourneyForm from "@/components/journey-form"
// import ExpenseForm from "@/components/expense-form"
// import ExpenseList from "@/components/expense-list"

// export default function HomeContent() {
//   const [showJourneyForm, setShowJourneyForm] = useState(false)
//   const [showExpenseForm, setShowExpenseForm] = useState(false)
//   const [activeJourney, setActiveJourney] = useState<any>(null)
//   const [expenses, setExpenses] = useState<any[]>([])

//   // Mock active journey - in real app this would come from API
//   const mockActiveJourney = {
//     id: 1,
//     name: "Dar es Salaam - Mwanza",
//     from: "Dar es Salaam",
//     to: "Mwanza",
//     startDate: "2024-01-15",
//     endDate: "2024-01-16",
//     status: "active",
//   }

//   const handleJourneySubmit = (journeyData: any) => {
//     setActiveJourney(journeyData)
//     setShowJourneyForm(false)
//   }

//   const handleExpenseSubmit = (expenseData: any) => {
//     setExpenses([...expenses, { ...expenseData, id: Date.now() }])
//     setShowExpenseForm(false)
//   }

//   const totalIncome = expenses
//     .filter((e) => e.type === "income")
//     .reduce((sum, e) => sum + Number.parseFloat(e.amount || 0), 0)

//   const totalExpense = expenses
//     .filter((e) => e.type === "expense")
//     .reduce((sum, e) => sum + Number.parseFloat(e.amount || 0), 0)

//   if (showJourneyForm) {
//     return <JourneyForm onSubmit={handleJourneySubmit} onCancel={() => setShowJourneyForm(false)} />
//   }

//   if (showExpenseForm) {
//     return <ExpenseForm onSubmit={handleExpenseSubmit} onCancel={() => setShowExpenseForm(false)} />
//   }

//   return (
//     <div className="space-y-6">
//       {/* Welcome Header */}
//       <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//         <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Karibu, Driver! 👋</h1>
//         <p className="text-gray-600">Manage your journeys and track expenses easily</p>
//       </motion.div>

//       {/* Active Journey or No Journey Message */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: 0.1 }}
//       >
//         {activeJourney || mockActiveJourney ? (
//           <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
//             <CardHeader>
//               <div className="flex items-center justify-between">
//                 <CardTitle className="text-green-800 flex items-center">
//                   <Route className="w-5 h-5 mr-2" />
//                   Active Journey
//                 </CardTitle>
//                 <Badge className="bg-green-100 text-green-800">Active</Badge>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-3">
//                 <h3 className="font-semibold text-lg">{mockActiveJourney.name}</h3>
//                 <div className="flex items-center space-x-4 text-sm text-gray-600">
//                   <div className="flex items-center">
//                     <MapPin className="w-4 h-4 mr-1" />
//                     {mockActiveJourney.from} → {mockActiveJourney.to}
//                   </div>
//                   <div className="flex items-center">
//                     <Calendar className="w-4 h-4 mr-1" />
//                     {mockActiveJourney.startDate} - {mockActiveJourney.endDate}
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ) : (
//           <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
//             <CardContent className="text-center py-8">
//               <div className="mb-4">
//                 <Route className="w-16 h-16 mx-auto text-orange-400 mb-4" />
//                 <h3 className="text-xl font-semibold text-gray-800 mb-2">Hakuna safari iliyo sajiliwa</h3>
//                 <p className="text-gray-600 mb-6">Sajili safari mpya ili kuanza</p>
//                 <Button
//                   onClick={() => setShowJourneyForm(true)}
//                   className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105"
//                 >
//                   <Plus className="w-5 h-5 mr-2" />
//                   Sajili Safari
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         )}
//       </motion.div>

//       {/* Income/Expense Summary */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: 0.2 }}
//         className="grid grid-cols-1 md:grid-cols-3 gap-4"
//       >
//         <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
//           <CardContent className="p-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-green-600 font-medium">Total Income</p>
//                 <p className="text-2xl font-bold text-green-800">TSh {totalIncome.toLocaleString()}</p>
//               </div>
//               <TrendingUp className="w-8 h-8 text-green-600" />
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="bg-gradient-to-r from-red-50 to-red-100 border-red-200">
//           <CardContent className="p-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-red-600 font-medium">Total Expenses</p>
//                 <p className="text-2xl font-bold text-red-800">TSh {totalExpense.toLocaleString()}</p>
//               </div>
//               <TrendingDown className="w-8 h-8 text-red-600" />
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
//           <CardContent className="p-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-blue-600 font-medium">Net Profit</p>
//                 <p className="text-2xl font-bold text-blue-800">TSh {(totalIncome - totalExpense).toLocaleString()}</p>
//               </div>
//               <DollarSign className="w-8 h-8 text-blue-600" />
//             </div>
//           </CardContent>
//         </Card>
//       </motion.div>

//       {/* Quick Actions */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: 0.3 }}
//       >
//         <Card>
//           <CardHeader>
//             <CardTitle>Quick Actions</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-2 gap-4">
//               <Button
//                 onClick={() => setShowExpenseForm(true)}
//                 className="h-16 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105"
//               >
//                 <Plus className="w-5 h-5 mr-2" />
//                 Add Expense/Income
//               </Button>
//               <Button
//                 onClick={() => setShowJourneyForm(true)}
//                 variant="outline"
//                 className="h-16 border-2 border-blue-200 hover:bg-blue-50 rounded-lg transform transition-all duration-200 hover:scale-105"
//               >
//                 <Route className="w-5 h-5 mr-2" />
//                 New Journey
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       </motion.div>

//       {/* Recent Transactions */}
//       {expenses.length > 0 && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.4 }}
//         >
//           <ExpenseList expenses={expenses} />
//         </motion.div>
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
//   MapPin,
//   Calendar,
//   Plus,
//   TrendingUp,
//   TrendingDown,
//   DollarSign,
//   Route,
//   AlertCircle,
//   CheckCircle,
// } from "lucide-react"
// import JourneyForm from "./journey-form"
// import ExpenseForm from "./expense-form"
// import ExpenseList from "./expense-list"
// import { journeyService, type Journey } from "../api/journey-service"

// export default function HomeContent() {
//   const [showJourneyForm, setShowJourneyForm] = useState(false)
//   const [showExpenseForm, setShowExpenseForm] = useState(false)
//   const [activeJourney, setActiveJourney] = useState<Journey | null>(null)
//   const [expenses, setExpenses] = useState<any[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [isCreatingJourney, setIsCreatingJourney] = useState(false)
//   const [isCompletingJourney, setIsCompletingJourney] = useState(false)
//   const [error, setError] = useState("")
//   const [success, setSuccess] = useState("")

//   // Load active journey on component mount
//   useEffect(() => {
//     loadActiveJourney()
//   }, [])

//   const loadActiveJourney = async () => {
//     try {
//       setIsLoading(true)
//       setError("")
//       const journeys = await journeyService.getActiveJourneys()
//       console.log("Active journeys loaded:", journeys.results)
//       setActiveJourney(journeys?.results.length > 0 ? journeys?.results[0] : null)
//     } catch (err: any) {
//       console.error("Error loading active journey:", err)
//       if (err.response?.status === 401) {
//         setError("Session expired. Please login again.")
//       } else {
//         setError("Failed to load journey data. Please try again.")
//       }
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleJourneySubmit = async (journeyData: any) => {
//     try {
//       setIsCreatingJourney(true)
//       setError("")
//       const newJourney = await journeyService.createJourney(journeyData)
//       setActiveJourney(newJourney)
//       setShowJourneyForm(false)
//       setSuccess("Journey created successfully!")
//       setTimeout(() => setSuccess(""), 5000)
//     } catch (err: any) {
//       console.error("Error creating journey:", err)
//       if (err.response?.data?.non_field_errors) {
//         setError(err.response.data.non_field_errors[0])
//       } else if (err.response?.status === 401) {
//         setError("Session expired. Please login again.")
//       } else {
//         setError("Failed to create journey. Please try again.")
//       }
//     } finally {
//       setIsCreatingJourney(false)
//     }
//   }

//   const handleCompleteJourney = async () => {
//     if (!activeJourney) return

//     try {
//       setIsCompletingJourney(true)
//       setError("")
//       await journeyService.completeJourney(activeJourney.id)
//       setActiveJourney(null)
//       setSuccess("Journey completed successfully!")
//       setTimeout(() => setSuccess(""), 5000)
//     } catch (err: any) {
//       console.error("Error completing journey:", err)
//       if (err.response?.status === 401) {
//         setError("Session expired. Please login again.")
//       } else {
//         setError("Failed to complete journey. Please try again.")
//       }
//     } finally {
//       setIsCompletingJourney(false)
//     }
//   }

//   const handleExpenseSubmit = (expenseData: any) => {
//     setExpenses([...expenses, { ...expenseData, id: Date.now() }])
//     setShowExpenseForm(false)
//   }

//   const totalIncome = expenses
//     .filter((e) => e.type === "income")
//     .reduce((sum, e) => sum + Number.parseFloat(e.amount || 0), 0)

//   const totalExpense = expenses
//     .filter((e) => e.type === "expense")
//     .reduce((sum, e) => sum + Number.parseFloat(e.amount || 0), 0)

//   if (showJourneyForm) {
//     return (
//       <JourneyForm
//         onSubmit={handleJourneySubmit}
//         onCancel={() => {
//           setShowJourneyForm(false)
//           setError("")
//         }}
//         isLoading={isCreatingJourney}
//         error={error}
//       />
//     )
//   }

//   if (showExpenseForm) {
//     return <ExpenseForm onSubmit={handleExpenseSubmit} onCancel={() => setShowExpenseForm(false)} />
//   }

//   return (
//     <div className="space-y-6">
//       {/* Welcome Header */}
//       <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//         <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Karibu, Driver! 👋</h1>
//         <p className="text-gray-600">Manage your journeys and track expenses easily</p>
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
//           <span className="ml-2 text-gray-600">Loading journey data...</span>
//         </motion.div>
//       ) : (
//         <>
//           {/* Active Journey or No Journey Message */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.1 }}
//           >
//             {activeJourney ? (
//               <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200" onClick={() => setShowExpenseForm(true)}
// >
//                 <CardHeader>
//                   <div className="flex items-center justify-between">
//                     <CardTitle className="text-green-800 flex items-center">
//                       <Route className="w-5 h-5 mr-2" />
//                       Active Journey
//                     </CardTitle>
//                     <div className="flex items-center space-x-2">
//                       <Badge className="bg-green-100 text-green-800">Active</Badge>
//                       <Button
//                         onClick={handleCompleteJourney}
//                         disabled={isCompletingJourney}
//                         size="sm"
//                         className="bg-red-600 hover:bg-red-700 text-white"
//                       >
//                         {isCompletingJourney ? (
//                           <div className="flex items-center space-x-1">
//                             <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
//                             <span>Completing...</span>
//                           </div>
//                         ) : (
//                           "Complete Journey"
//                         )}
//                       </Button>
//                     </div>
//                   </div>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-3">
//                     <h3 className="font-semibold text-lg">{activeJourney.journey_name}</h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
//                       <div className="flex items-center">
//                         <MapPin className="w-4 h-4 mr-1" />
//                         {activeJourney.trip_from} → {activeJourney.trip_to}
//                       </div>
//                       <div className="flex items-center">
//                         <Calendar className="w-4 h-4 mr-1" />
//                         {activeJourney.start_date} - {activeJourney.end_date? activeJourney.end_date : "Ongoing"}
//                       </div>
//                       <div className="flex items-center">
//                         <DollarSign className="w-4 h-4 mr-1" />
//                         Total Amount: TSh {Number.parseFloat(activeJourney.total_trip_amount).toLocaleString()}
//                       </div>
//                       <div className="flex items-center">
//                         <Calendar className="w-4 h-4 mr-1" />
//                         Created: {new Date(activeJourney.created_at).toLocaleDateString()}
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ) : (
//               <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
//                 <CardContent className="text-center py-8">
//                   <div className="mb-4">
//                     <Route className="w-16 h-16 mx-auto text-orange-400 mb-4" />
//                     <h3 className="text-xl font-semibold text-gray-800 mb-2">Hakuna safari iliyo sajiliwa</h3>
//                     <p className="text-gray-600 mb-6">Sajili safari mpya ili kuanza</p>
//                     <Button
//                       onClick={() => setShowJourneyForm(true)}
//                       className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105"
//                     >
//                       <Plus className="w-5 h-5 mr-2" />
//                       Sajili Safari
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             )}
//           </motion.div>

//           {/* Income/Expense Summary */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="grid grid-cols-1 md:grid-cols-3 gap-4"
//           >
//             <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
//               <CardContent className="p-4">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-green-600 font-medium">Total Income</p>
//                     <p className="text-2xl font-bold text-green-800">TSh {totalIncome.toLocaleString()}</p>
//                   </div>
//                   <TrendingUp className="w-8 h-8 text-green-600" />
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="bg-gradient-to-r from-red-50 to-red-100 border-red-200">
//               <CardContent className="p-4">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-red-600 font-medium">Total Expenses</p>
//                     <p className="text-2xl font-bold text-red-800">TSh {totalExpense.toLocaleString()}</p>
//                   </div>
//                   <TrendingDown className="w-8 h-8 text-red-600" />
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
//               <CardContent className="p-4">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-blue-600 font-medium">Net Profit</p>
//                     <p className="text-2xl font-bold text-blue-800">
//                       TSh {(totalIncome - totalExpense).toLocaleString()}
//                     </p>
//                   </div>
//                   <DollarSign className="w-8 h-8 text-blue-600" />
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>

//           {/* Quick Actions */}
//           {/* <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.3 }}
//           >
//             <Card>
//               <CardHeader>
//                 <CardTitle>Quick Actions</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-2 gap-4">
//                   {activeJourney && (
//                     <Button
//                       onClick={() => setShowExpenseForm(true)}
//                       className="h-16 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105"
//                     >
//                       <Plus className="w-5 h-5 mr-2" />
//                       Add Expense/Income
//                     </Button>
//                   )}

//                   {!activeJourney && (
//                     <Button
//                       onClick={() => setShowJourneyForm(true)}
//                       className="h-16 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 col-span-2"
//                     >
//                       <Route className="w-5 h-5 mr-2" />
//                       New Journey
//                     </Button>
//                   )}
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div> */}

//           {/* Recent Transactions */}
//           {expenses.length > 0 && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.4 }}
//             >
//               <ExpenseList expenses={expenses} />
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
//   MapPin,
//   Calendar,
//   Plus,
//   TrendingUp,
//   TrendingDown,
//   DollarSign,
//   Route,
//   AlertCircle,
//   CheckCircle,
// } from "lucide-react"
// import JourneyForm from "./journey-form"
// import ExpenseForm from "./expense-form"
// import ExpenseList from "./expense-list"
// import { journeyService, type Journey } from "../api/journey-service"
// import { transactionService, type Transaction } from "../api/transaction-service"
// import { useRouter } from "next/navigation"

// export default function HomeContent() {
//   const [showJourneyForm, setShowJourneyForm] = useState(false)
//   const [showExpenseForm, setShowExpenseForm] = useState(false)
//   const [activeJourney, setActiveJourney] = useState<Journey | null>(null)
//   const [transactions, setTransactions] = useState<Transaction[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [isLoadingTransactions, setIsLoadingTransactions] = useState(false)
//   const [isCreatingJourney, setIsCreatingJourney] = useState(false)
//   const [isCompletingJourney, setIsCompletingJourney] = useState(false)
//   const [isCreatingTransaction, setIsCreatingTransaction] = useState(false)
//   const [error, setError] = useState("")
//   const [success, setSuccess] = useState("")
//     const router = useRouter()


//   // Load active journey on component mount
//   useEffect(() => {
//     loadActiveJourney()
//     loadTransactions()
//   }, [])

//   const loadActiveJourney = async () => {
//     try {
//       setIsLoading(true)
//       setError("")
//       const journeys = await journeyService.getActiveJourneys()
//       setActiveJourney(journeys?.results.length > 0 ? journeys?.results[0] : null)
//     } catch (err: any) {
//       console.error("Error loading active journey:", err)
//       if (err.response?.status === 401) {
//         setError("Session expired. Please login again.")
//       } else {
//         setError("Failed to load journey data. Please try again.")
//       }
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const loadTransactions = async () => {
//     try {
//       setIsLoadingTransactions(true)
//       const transactionData = await transactionService.getTransactions()
//       setTransactions(transactionData)
//     } catch (err: any) {
//       setTransactions([])
//       console.error("Error loading transactions:", err)
//       // Don't show error for transactions as it's not critical
//     } finally {
//       setIsLoadingTransactions(false)
//     }
//   }

//   const handleJourneySubmit = async (journeyData: any) => {
//     try {
//       setIsCreatingJourney(true)
//       setError("")
//       const newJourney = await journeyService.createJourney(journeyData)
//       setActiveJourney(newJourney)
//       setShowJourneyForm(false)
//       setSuccess("Journey created successfully!")
//       setTimeout(() => setSuccess(""), 5000)
//     } catch (err: any) {
//       console.error("Error creating journey:", err)
//       if (err.response?.data?.non_field_errors) {
//         setError(err.response.data.non_field_errors[0])
//       } else if (err.response?.status === 401) {
//         setError("Session expired. Please login again.")
//       } else {
//         setError("Failed to create journey. Please try again.")
//       }
//     } finally {
//       setIsCreatingJourney(false)
//     }
//   }

//   const handleCompleteJourney = async (e: React.MouseEvent) => {
//     e.stopPropagation() // Prevent card click event
//     if (!activeJourney) return

//     try {
//       setIsCompletingJourney(true)
//       setError("")
//       await journeyService.completeJourney(activeJourney.id)
//       setActiveJourney(null)
//       setSuccess("Journey completed successfully!")
//       loadTransactions()
//       setTimeout(() => setSuccess(""), 5000)
//     } catch (err: any) {
//       console.error("Error completing journey:", err)
//       if (err.response?.status === 401) {
//         setError("Session expired. Please login again.")
//       } else {
//         setError("Failed to complete journey. Please try again.")
//       }
//     } finally {
//       setIsCompletingJourney(false)
//     }
//   }

//   const handleExpenseSubmit = async (transactionData: any) => {
//     try {
//       setIsCreatingTransaction(true)
//       setError("")
//       const newTransaction = await transactionService.createTransaction(transactionData)
//       setTransactions([newTransaction, ...transactions])
//       setShowExpenseForm(false)
//       setSuccess("Transaction added successfully!")
//       setTimeout(() => setSuccess(""), 5000)
//     } catch (err: any) {
//       console.error("Error creating transaction:", err)
//       if (err.response?.status === 401) {
//         setError("Session expired. Please login again.")
//       } else {
//         setError("Failed to add transaction. Please try again.")
//       }
//     } finally {
//       setIsCreatingTransaction(false)
//     }
//   }

//   const totalIncome = transactions
//     .filter((t) => t.transaction_type === "income")
//     .reduce((sum, t) => sum + Number.parseFloat(t.amount || "0"), 0)

//   const totalExpense = transactions
//     .filter((t) => t.transaction_type === "expense")
//     .reduce((sum, t) => sum + Number.parseFloat(t.amount || "0"), 0)

//   if (showJourneyForm) {
//     return (
//       <JourneyForm
//         onSubmit={handleJourneySubmit}
//         onCancel={() => {
//           setShowJourneyForm(false)
//           setError("")
//         }}
//         isLoading={isCreatingJourney}
//         error={error}
//       />
//     )
//   }

//   if (showExpenseForm) {
//     return (
//       <ExpenseForm
//         onSubmit={handleExpenseSubmit}
//         onCancel={() => {
//           setShowExpenseForm(false)
//           setError("")
//         }}
//         isLoading={isCreatingTransaction}
//         error={error}
//       />
//     )
//   }

//   return (
//     <div className="space-y-6">
//       {/* Welcome Header */}
//       <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//         <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Karibu, Driver! 👋</h1>
//         <p className="text-gray-600">Manage your journeys and track expenses easily</p>
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
//           <span className="ml-2 text-gray-600">Loading journey data...</span>
//         </motion.div>
//       ) : (
//         <>
//           {/* Active Journey or No Journey Message */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.1 }}
//           >
//             {activeJourney ? (
//               <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200" onClick={() => setShowExpenseForm(true)}>
//                 <CardHeader>
//                   <div className="flex items-center justify-between">
//                     <CardTitle className="text-green-800 flex items-center">
//                       <Route className="w-5 h-5 mr-2" />
//                       Active Journey
//                     </CardTitle>
//                     <div className="flex items-center space-x-2">
//                       <Badge className="bg-green-100 text-green-800">Active</Badge>
//                       <Button
//                         onClick={handleCompleteJourney}
//                         disabled={isCompletingJourney}
//                         size="sm"
//                         className="bg-red-600 hover:bg-red-700 text-white"
//                       >
//                         {isCompletingJourney ? (
//                           <div className="flex items-center space-x-1">
//                             <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
//                             <span>Completing...</span>
//                           </div>
//                         ) : (
//                           "Complete Journey"
//                         )}
//                       </Button>
//                     </div>
//                   </div>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-3">
//                     <h3 className="font-semibold text-lg">{activeJourney.journey_name}</h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
//                       <div className="flex items-center">
//                         <MapPin className="w-4 h-4 mr-1" />
//                         {activeJourney.trip_from} → {activeJourney.trip_to}
//                       </div>
//                       <div className="flex items-center">
//                         <Calendar className="w-4 h-4 mr-1" />
//                         {activeJourney.start_date} - {activeJourney.end_date ? activeJourney.end_date : 'Ongoing' }
//                       </div>
//                       <div className="flex items-center">
//                         <DollarSign className="w-4 h-4 mr-1" />
//                         Total Amount: TSh {Number.parseFloat(activeJourney.total_trip_amount).toLocaleString()}
//                       </div>
//                       <div className="flex items-center">
//                         <Calendar className="w-4 h-4 mr-1" />
//                         Created: {new Date(activeJourney.created_at).toLocaleDateString()}
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ) : (
//               <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
//                 <CardContent className="text-center py-8">
//                   <div className="mb-4">
//                     <Route className="w-16 h-16 mx-auto text-orange-400 mb-4" />
//                     <h3 className="text-xl font-semibold text-gray-800 mb-2">Hakuna safari iliyo sajiliwa</h3>
//                     {/* <p className="text-gray-600 mb-6">Sajili safari mpya ili kuanza</p> */}
//                     <p className="text-gray-600 mb-6">Sajili maombi ya  safari safari</p>

//                     <Button
//                       // onClick={() => setShowJourneyForm(true)}
//                       onClick={() => router.push("/driver-journey-requests/new")}

//                       className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105"
//                     >
//                       <Plus className="w-5 h-5 mr-2" />
//                       {/* Sajili Safari */}
//                                             Sajili Hapa

//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             )}
//           </motion.div>

//           {/* Income/Expense Summary */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="grid grid-cols-1 md:grid-cols-3 gap-4"
//           >

//             <Card className="bg-gradient-to-r from-red-50 to-red-100 border-red-200">
//               <CardContent className="p-4">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-red-600 font-medium">Total Expenses</p>
//                     <p className="text-2xl font-bold text-red-800">TSh {totalExpense.toLocaleString()}</p>
//                   </div>
//                   <TrendingDown className="w-8 h-8 text-red-600" />
//                 </div>
//               </CardContent>
//             </Card>


//             {/* <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
//               <CardContent className="p-4">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-green-600 font-medium">Total Income</p>
//                     <p className="text-2xl font-bold text-green-800">TSh {totalIncome.toLocaleString()}</p>
//                   </div>
//                   <TrendingUp className="w-8 h-8 text-green-600" />
//                 </div>
//               </CardContent>
//             </Card> */}




//             <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
//               <CardContent className="p-4">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-blue-600 font-medium">Remaining Balance</p>
//                     <p className="text-2xl font-bold text-blue-800">

//                       TSh {(Number(activeJourney?.total_trip_amount || 0) + totalIncome - totalExpense).toLocaleString()}

//                       {/* TSh {(totalIncome - totalExpense).toLocaleString()} */}
//                     </p>
//                   </div>
//                   <DollarSign className="w-8 h-8 text-blue-600" />
//                 </div>
//               </CardContent>
//             </Card>



//             {/* <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
//               <CardContent className="p-4">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-blue-600 font-medium">Net Profit</p>
//                     <p className="text-2xl font-bold text-blue-800">
//                       TSh {(totalIncome - totalExpense).toLocaleString()}
//                     </p>
//                   </div>
//                   <DollarSign className="w-8 h-8 text-blue-600" />
//                 </div>
//               </CardContent>
//             </Card> */}
//           </motion.div>

//           {/* Quick Actions */}
//           {/* <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.3 }}
//           >
//             <Card>
//               <CardHeader>
//                 <CardTitle>Quick Actions</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-2 gap-4">
//                   {activeJourney && (
//                     <Button
//                       onClick={() => setShowExpenseForm(true)}
//                       className="h-16 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105"
//                     >
//                       <Plus className="w-5 h-5 mr-2" />
//                       Add Expense/Income
//                     </Button>
//                   )}

//                   {!activeJourney && (
//                     <Button
//                       onClick={() => setShowJourneyForm(true)}
//                       className="h-16 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 col-span-2"
//                     >
//                       <Route className="w-5 h-5 mr-2" />
//                       New Journey
//                     </Button>
//                   )}
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div> */}

//           {/* Recent Transactions */}
//           {transactions.length > 0 && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.4 }}
//             >
//               {/* <ExpenseList transactions={transactions} isLoading={isLoadingTransactions} /> */}

//               <ExpenseList
//                 transactions={transactions}
//                 isLoading={isLoadingTransactions}
//                 activeJourney={activeJourney}
//                 totalIncome={totalIncome}
//                 totalExpense={totalExpense}
//                 remainingBalance={Number(activeJourney?.total_trip_amount || 0) + totalIncome - totalExpense}
//               />
//             </motion.div>
//           )}
//         </>
//       )}
//     </div>
//   )
// }






"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MapPin, Calendar, Plus, TrendingDown, DollarSign, Route, AlertCircle, CheckCircle } from "lucide-react"
import JourneyForm from "./journey-form"
import ExpenseForm from "./expense-form"
import ExpenseList from "./expense-list"
import { journeyService, type Journey } from "../api/journey-service"
import { transactionService, type Transaction } from "../api/transaction-service"
import { useRouter } from "next/navigation"

export default function HomeContent() {
  const [showJourneyForm, setShowJourneyForm] = useState(false)
  const [showExpenseForm, setShowExpenseForm] = useState(false)
  const [activeJourney, setActiveJourney] = useState<Journey | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(false)
  const [isCreatingJourney, setIsCreatingJourney] = useState(false)
  const [isCompletingJourney, setIsCompletingJourney] = useState(false)
  const [isCreatingTransaction, setIsCreatingTransaction] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  // Load active journey on component mount
  useEffect(() => {
    loadActiveJourney()
    loadTransactions()
  }, [])

  const loadActiveJourney = async () => {
    try {
      setIsLoading(true)
      setError("")
      const journeys = await journeyService.getActiveJourneys()

      // Fix: Handle both array and object with results property
      if (Array.isArray(journeys)) {
        setActiveJourney(journeys.length > 0 ? journeys[0] : null)
      } else if (journeys && typeof journeys === "object" && "results" in journeys) {
        const journeysWithResults = journeys as { results: Journey[] }
        setActiveJourney(journeysWithResults.results.length > 0 ? journeysWithResults.results[0] : null)
      } else {
        setActiveJourney(null)
      }
    } catch (err: any) {
      console.error("Error loading active journey:", err)
      if (err.response?.status === 401) {
        setError("Session expired. Please login again.")
      } else {
        setError("Failed to load journey data. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const loadTransactions = async () => {
    try {
      setIsLoadingTransactions(true)
      const transactionData = await transactionService.getTransactions()
      setTransactions(transactionData)
    } catch (err: any) {
      setTransactions([])
      console.error("Error loading transactions:", err)
      // Don't show error for transactions as it's not critical
    } finally {
      setIsLoadingTransactions(false)
    }
  }

  const handleJourneySubmit = async (journeyData: any) => {
    try {
      setIsCreatingJourney(true)
      setError("")
      const newJourney = await journeyService.createJourney(journeyData)
      setActiveJourney(newJourney)
      setShowJourneyForm(false)
      setSuccess("Journey created successfully!")
      setTimeout(() => setSuccess(""), 5000)
    } catch (err: any) {
      console.error("Error creating journey:", err)
      if (err.response?.data?.non_field_errors) {
        setError(err.response.data.non_field_errors[0])
      } else if (err.response?.status === 401) {
        setError("Session expired. Please login again.")
      } else {
        setError("Failed to create journey. Please try again.")
      }
    } finally {
      setIsCreatingJourney(false)
    }
  }

  const handleCompleteJourney = async (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent card click event
    if (!activeJourney) return

    try {
      setIsCompletingJourney(true)
      setError("")
      await journeyService.completeJourney(activeJourney.id)
      setActiveJourney(null)
      setSuccess("Journey completed successfully!")
      loadTransactions()
      setTimeout(() => setSuccess(""), 5000)
    } catch (err: any) {
      console.error("Error completing journey:", err)
      if (err.response?.status === 401) {
        setError("Session expired. Please login again.")
      } else {
        setError("Failed to complete journey. Please try again.")
      }
    } finally {
      setIsCompletingJourney(false)
    }
  }

  const handleExpenseSubmit = async (transactionData: any) => {
    try {
      setIsCreatingTransaction(true)
      setError("")
      const newTransaction = await transactionService.createTransaction(transactionData)
      setTransactions([newTransaction, ...transactions])
      setShowExpenseForm(false)
      setSuccess("Transaction added successfully!")
      setTimeout(() => setSuccess(""), 5000)
    } catch (err: any) {
      console.error("Error creating transaction:", err)
      if (err.response?.status === 401) {
        setError("Session expired. Please login again.")
      } else {
        setError("Failed to add transaction. Please try again.")
      }
    } finally {
      setIsCreatingTransaction(false)
    }
  }

  const totalIncome = transactions
    .filter((t) => t.transaction_type === "income")
    .reduce((sum, t) => sum + Number.parseFloat(t.amount || "0"), 0)

  const totalExpense = transactions
    .filter((t) => t.transaction_type === "expense")
    .reduce((sum, t) => sum + Number.parseFloat(t.amount || "0"), 0)

  if (showJourneyForm) {
    return (
      <JourneyForm
        onSubmit={handleJourneySubmit}
        onCancel={() => {
          setShowJourneyForm(false)
          setError("")
        }}
        isLoading={isCreatingJourney}
        error={error}
      />
    )
  }

  if (showExpenseForm) {
    return (
      <ExpenseForm
        onSubmit={handleExpenseSubmit}
        onCancel={() => {
          setShowExpenseForm(false)
          setError("")
        }}
        isLoading={isCreatingTransaction}
        error={error}
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Karibu, Driver! 👋</h1>
        <p className="text-gray-600">Manage your journeys and track expenses easily</p>
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
          <span className="ml-2 text-gray-600">Loading journey data...</span>
        </motion.div>
      ) : (
        <>
          {/* Active Journey or No Journey Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {activeJourney ? (
              <Card
                className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200"
                onClick={() => setShowExpenseForm(true)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-green-800 flex items-center">
                      <Route className="w-5 h-5 mr-2" />
                      Active Journey
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                      <Button
                        onClick={handleCompleteJourney}
                        disabled={isCompletingJourney}
                        size="sm"
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        {isCompletingJourney ? (
                          <div className="flex items-center space-x-1">
                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                            <span>Completing...</span>
                          </div>
                        ) : (
                          "Complete Journey"
                        )}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg">{activeJourney.journey_name}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {activeJourney.trip_from} → {activeJourney.trip_to}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {activeJourney.start_date} - {activeJourney.end_date ? activeJourney.end_date : "Ongoing"}
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-1" />
                        Total Amount: TSh {Number.parseFloat(activeJourney.total_trip_amount).toLocaleString()}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Created: {new Date(activeJourney.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
                <CardContent className="text-center py-8">
                  <div className="mb-4">
                    <Route className="w-16 h-16 mx-auto text-orange-400 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Hakuna safari iliyo sajiliwa</h3>
                    <p className="text-gray-600 mb-6">Sajili maombi ya safari safari</p>
                    <Button
                      onClick={() => router.push("/driver-journey-requests/new")}
                      className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Sajili Hapa
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>

          {/* Income/Expense Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <Card className="bg-gradient-to-r from-red-50 to-red-100 border-red-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-red-600 font-medium">Total Expenses</p>
                    <p className="text-2xl font-bold text-red-800">TSh {totalExpense.toLocaleString()}</p>
                  </div>
                  <TrendingDown className="w-8 h-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-600 font-medium">Remaining Balance</p>
                    <p className="text-2xl font-bold text-blue-800">
                      TSh{" "}
                      {(Number(activeJourney?.total_trip_amount || 0) + totalIncome - totalExpense).toLocaleString()}
                    </p>
                  </div>
                  <DollarSign className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Transactions */}
          {transactions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <ExpenseList
                transactions={transactions}
                isLoading={isLoadingTransactions}
                activeJourney={activeJourney}
                totalIncome={totalIncome}
                totalExpense={totalExpense}
                remainingBalance={Number(activeJourney?.total_trip_amount || 0) + totalIncome - totalExpense}
              />
            </motion.div>
          )}
        </>
      )}
    </div>
  )
}


// "use client"

// import { useState, useEffect } from "react"
// import { motion } from "framer-motion"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import {
//   MapPin,
//   Calendar,
//   Plus,
//   TrendingUp,
//   TrendingDown,
//   DollarSign,
//   Route,
//   AlertCircle,
//   CheckCircle,
// } from "lucide-react"
// import JourneyForm from "./journey-form"
// import ExpenseForm from "./expense-form"
// import ExpenseList from "./expense-list"
// import { journeyService, type Journey } from "../api/journey-service"
// import { transactionService, type Transaction } from "../api/transaction-service"

// export default function HomeContent() {
//   const [showJourneyForm, setShowJourneyForm] = useState(false)
//   const [showExpenseForm, setShowExpenseForm] = useState(false)
//   const [activeJourney, setActiveJourney] = useState<Journey | null>(null)
//   const [transactions, setTransactions] = useState<Transaction[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [isLoadingTransactions, setIsLoadingTransactions] = useState(false)
//   const [isCreatingJourney, setIsCreatingJourney] = useState(false)
//   const [isCompletingJourney, setIsCompletingJourney] = useState(false)
//   const [isCreatingTransaction, setIsCreatingTransaction] = useState(false)
//   const [error, setError] = useState("")
//   const [success, setSuccess] = useState("")

//   // Load active journey on component mount
//   useEffect(() => {
//     loadActiveJourney()
//     loadTransactions()
//   }, [])

//   const loadActiveJourney = async () => {
//     try {
//       setIsLoading(true)
//       setError("")
//       const journeys = await journeyService.getActiveJourneys()
//       setActiveJourney(journeys.length > 0 ? journeys[0] : null)
//     } catch (err: any) {
//       console.error("Error loading active journey:", err)
//       if (err.response?.status === 401) {
//         setError("Session expired. Please login again.")
//       } else {
//         setError("Failed to load journey data. Please try again.")
//       }
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const loadTransactions = async () => {
//     try {
//       setIsLoadingTransactions(true)
//       const transactionData = await transactionService.getTransactions()
//       setTransactions(transactionData)
//     } catch (err: any) {
//       console.error("Error loading transactions:", err)
//       // Don't show error for transactions as it's not critical
//     } finally {
//       setIsLoadingTransactions(false)
//     }
//   }

//   const handleJourneySubmit = async (journeyData: any) => {
//     try {
//       setIsCreatingJourney(true)
//       setError("")
//       const newJourney = await journeyService.createJourney(journeyData)
//       setActiveJourney(newJourney)
//       setShowJourneyForm(false)
//       setSuccess("Journey created successfully!")
//       setTimeout(() => setSuccess(""), 5000)
//     } catch (err: any) {
//       console.error("Error creating journey:", err)
//       if (err.response?.data?.non_field_errors) {
//         setError(err.response.data.non_field_errors[0])
//       } else if (err.response?.status === 401) {
//         setError("Session expired. Please login again.")
//       } else {
//         setError("Failed to create journey. Please try again.")
//       }
//     } finally {
//       setIsCreatingJourney(false)
//     }
//   }

//   const handleCompleteJourney = async () => {
//     if (!activeJourney) return

//     try {
//       setIsCompletingJourney(true)
//       setError("")
//       await journeyService.completeJourney(activeJourney.id)
//       setActiveJourney(null)
//       setSuccess("Journey completed successfully!")
//       setTimeout(() => setSuccess(""), 5000)
//     } catch (err: any) {
//       console.error("Error completing journey:", err)
//       if (err.response?.status === 401) {
//         setError("Session expired. Please login again.")
//       } else {
//         setError("Failed to complete journey. Please try again.")
//       }
//     } finally {
//       setIsCompletingJourney(false)
//     }
//   }

//   const handleExpenseSubmit = async (transactionData: any) => {
//     try {
//       setIsCreatingTransaction(true)
//       setError("")
//       const newTransaction = await transactionService.createTransaction(transactionData)
//       setTransactions([newTransaction, ...transactions])
//       setShowExpenseForm(false)
//       setSuccess("Transaction added successfully!")
//       setTimeout(() => setSuccess(""), 5000)
//     } catch (err: any) {
//       console.error("Error creating transaction:", err)
//       if (err.response?.status === 401) {
//         setError("Session expired. Please login again.")
//       } else {
//         setError("Failed to add transaction. Please try again.")
//       }
//     } finally {
//       setIsCreatingTransaction(false)
//     }
//   }

//   const totalIncome = transactions
//     .filter((t) => t.transaction_type === "income")
//     .reduce((sum, t) => sum + Number.parseFloat(t.amount || "0"), 0)

//   const totalExpense = transactions
//     .filter((t) => t.transaction_type === "expense")
//     .reduce((sum, t) => sum + Number.parseFloat(t.amount || "0"), 0)

//   if (showJourneyForm) {
//     return (
//       <JourneyForm
//         onSubmit={handleJourneySubmit}
//         onCancel={() => {
//           setShowJourneyForm(false)
//           setError("")
//         }}
//         isLoading={isCreatingJourney}
//         error={error}
//       />
//     )
//   }

//   if (showExpenseForm) {
//     return (
//       <ExpenseForm
//         onSubmit={handleExpenseSubmit}
//         onCancel={() => {
//           setShowExpenseForm(false)
//           setError("")
//         }}
//         isLoading={isCreatingTransaction}
//         error={error}
//       />
//     )
//   }

//   return (
//     <div className="space-y-6">
//       {/* Welcome Header */}
//       <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//         <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Karibu, Driver! 👋</h1>
//         <p className="text-gray-600">Manage your journeys and track expenses easily</p>
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
//           <span className="ml-2 text-gray-600">Loading journey data...</span>
//         </motion.div>
//       ) : (
//         <>
//           {/* Active Journey or No Journey Message */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.1 }}
//           >
//             {activeJourney ? (
//               <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
//                 <CardHeader>
//                   <div className="flex items-center justify-between">
//                     <CardTitle className="text-green-800 flex items-center">
//                       <Route className="w-5 h-5 mr-2" />
//                       Active Journey
//                     </CardTitle>
//                     <div className="flex items-center space-x-2">
//                       <Badge className="bg-green-100 text-green-800">Active</Badge>
//                       <Button
//                         onClick={handleCompleteJourney}
//                         disabled={isCompletingJourney}
//                         size="sm"
//                         className="bg-red-600 hover:bg-red-700 text-white"
//                       >
//                         {isCompletingJourney ? (
//                           <div className="flex items-center space-x-1">
//                             <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
//                             <span>Completing...</span>
//                           </div>
//                         ) : (
//                           "Complete Journey"
//                         )}
//                       </Button>
//                     </div>
//                   </div>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-3">
//                     <h3 className="font-semibold text-lg">{activeJourney.journey_name}</h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
//                       <div className="flex items-center">
//                         <MapPin className="w-4 h-4 mr-1" />
//                         {activeJourney.trip_from} → {activeJourney.trip_to}
//                       </div>
//                       <div className="flex items-center">
//                         <Calendar className="w-4 h-4 mr-1" />
//                         {activeJourney.start_date} - {activeJourney.end_date}
//                       </div>
//                       <div className="flex items-center">
//                         <DollarSign className="w-4 h-4 mr-1" />
//                         Total Amount: TSh {Number.parseFloat(activeJourney.total_trip_amount).toLocaleString()}
//                       </div>
//                       <div className="flex items-center">
//                         <Calendar className="w-4 h-4 mr-1" />
//                         Created: {new Date(activeJourney.created_at).toLocaleDateString()}
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ) : (
//               <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
//                 <CardContent className="text-center py-8">
//                   <div className="mb-4">
//                     <Route className="w-16 h-16 mx-auto text-orange-400 mb-4" />
//                     <h3 className="text-xl font-semibold text-gray-800 mb-2">Hakuna safari iliyo sajiliwa</h3>
//                     <p className="text-gray-600 mb-6">Sajili safari mpya ili kuanza</p>
//                     <Button
//                       onClick={() => setShowJourneyForm(true)}
//                       className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105"
//                     >
//                       <Plus className="w-5 h-5 mr-2" />
//                       Sajili Safari
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             )}
//           </motion.div>

//           {/* Income/Expense Summary */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="grid grid-cols-1 md:grid-cols-3 gap-4"
//           >
//             <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
//               <CardContent className="p-4">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-green-600 font-medium">Total Income</p>
//                     <p className="text-2xl font-bold text-green-800">TSh {totalIncome.toLocaleString()}</p>
//                   </div>
//                   <TrendingUp className="w-8 h-8 text-green-600" />
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="bg-gradient-to-r from-red-50 to-red-100 border-red-200">
//               <CardContent className="p-4">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-red-600 font-medium">Total Expenses</p>
//                     <p className="text-2xl font-bold text-red-800">TSh {totalExpense.toLocaleString()}</p>
//                   </div>
//                   <TrendingDown className="w-8 h-8 text-red-600" />
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
//               <CardContent className="p-4">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-blue-600 font-medium">Net Profit</p>
//                     <p className="text-2xl font-bold text-blue-800">
//                       TSh {(totalIncome - totalExpense).toLocaleString()}
//                     </p>
//                   </div>
//                   <DollarSign className="w-8 h-8 text-blue-600" />
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>

//           {/* Quick Actions */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.3 }}
//           >
//             <Card>
//               <CardHeader>
//                 <CardTitle>Quick Actions</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-2 gap-4">
//                   {/* Show Add Expense/Income button only if there's an active journey */}
//                   {activeJourney && (
//                     <Button
//                       onClick={() => setShowExpenseForm(true)}
//                       className="h-16 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105"
//                     >
//                       <Plus className="w-5 h-5 mr-2" />
//                       Add Expense/Income
//                     </Button>
//                   )}

//                   {/* Show New Journey button only if there's no active journey */}
//                   {!activeJourney && (
//                     <Button
//                       onClick={() => setShowJourneyForm(true)}
//                       className="h-16 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 col-span-2"
//                     >
//                       <Route className="w-5 h-5 mr-2" />
//                       New Journey
//                     </Button>
//                   )}
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>

//           {/* Recent Transactions */}
//           {transactions.length > 0 && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.4 }}
//             >
//               <ExpenseList
//                 transactions={transactions}
//                 isLoading={isLoadingTransactions}
//                 activeJourney={activeJourney}
//                 totalIncome={totalIncome}
//                 totalExpense={totalExpense}
//                 remainingBalance={Number(activeJourney?.total_trip_amount || 0) + totalIncome - totalExpense}
//               />
//             </motion.div>
//           )}
//         </>
//       )}
//     </div>
//   )
// }
