// "use client"

// import { motion } from "framer-motion"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { TrendingUp, TrendingDown, Calendar, FileText } from "lucide-react"

// interface ExpenseListProps {
//   expenses: any[]
// }

// export default function ExpenseList({ expenses }: ExpenseListProps) {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle className="flex items-center">
//           <FileText className="w-5 h-5 mr-2" />
//           Recent Transactions
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-3">
//           {expenses.map((expense, index) => (
//             <motion.div
//               key={expense.id}
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.3, delay: index * 0.1 }}
//               className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
//             >
//               <div className="flex items-center space-x-3">
//                 <div className={`p-2 rounded-full ${expense.type === "income" ? "bg-green-100" : "bg-red-100"}`}>
//                   {expense.type === "income" ? (
//                     <TrendingUp className="w-4 h-4 text-green-600" />
//                   ) : (
//                     <TrendingDown className="w-4 h-4 text-red-600" />
//                   )}
//                 </div>
//                 <div>
//                   <p className="font-medium text-gray-800">{expense.description}</p>
//                   <div className="flex items-center space-x-2 text-sm text-gray-500">
//                     <Calendar className="w-3 h-3" />
//                     <span>{expense.transactionDate}</span>
//                     {expense.reference && <span className="text-gray-400">• {expense.reference}</span>}
//                   </div>
//                 </div>
//               </div>
//               <div className="text-right">
//                 <p className={`font-bold ${expense.type === "income" ? "text-green-600" : "text-red-600"}`}>
//                   {expense.type === "income" ? "+" : "-"}TSh {Number.parseFloat(expense.amount).toLocaleString()}
//                 </p>
//                 <Badge variant={expense.type === "income" ? "default" : "secondary"} className="text-xs">
//                   {expense.type}
//                 </Badge>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </CardContent>
//     </Card>
//   )
// }





// "use client"

// import { motion } from "framer-motion"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { TrendingUp, TrendingDown, Calendar, FileText, Download, Eye } from 'lucide-react'
// import { Transaction } from "../api/transaction-service"

// interface ExpenseListProps {
//   transactions: Transaction[]
//   isLoading?: boolean
// }

// export default function ExpenseList({ transactions, isLoading = false }: ExpenseListProps) {
//   const handleViewFile = (fileUrl: string) => {
//     window.open(fileUrl, "_blank")
//   }

//   const handleDownloadFile = (fileUrl: string, fileName: string) => {
//     const link = document.createElement("a")
//     link.href = fileUrl
//     link.download = fileName
//     document.body.appendChild(link)
//     link.click()
//     document.body.removeChild(link)
//   }

//   if (isLoading) {
//     return (
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center">
//             <FileText className="w-5 h-5 mr-2" />
//             Recent Transactions
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-3">
//             {[1, 2, 3].map((i) => (
//               <div key={i} className="animate-pulse">
//                 <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
//                   <div className="flex items-center space-x-3">
//                     <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
//                     <div>
//                       <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
//                       <div className="h-3 bg-gray-300 rounded w-24"></div>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <div className="h-4 bg-gray-300 rounded w-20 mb-2"></div>
//                     <div className="h-3 bg-gray-300 rounded w-16"></div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//     )
//   }

//   if (transactions.length === 0) {
//     return (
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center">
//             <FileText className="w-5 h-5 mr-2" />
//             Recent Transactions
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="text-center py-8">
//             <FileText className="w-16 h-16 mx-auto text-gray-300 mb-4" />
//             <p className="text-gray-500">No transactions yet</p>
//             <p className="text-sm text-gray-400">Add your first income or expense to get started</p>
//           </div>
//         </CardContent>
//       </Card>
//     )
//   }

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle className="flex items-center">
//           <FileText className="w-5 h-5 mr-2" />
//           Recent Transactions ({transactions.length})
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-3">
//           {transactions.map((transaction, index) => (
//             <motion.div
//               key={transaction.id}
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.3, delay: index * 0.1 }}
//               className="flex items-start justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
//             >
//               <div className="flex items-start space-x-3 flex-1">
//                 <div
//                   className={`p-2 rounded-full ${
//                     transaction.transaction_type === "income" ? "bg-green-100" : "bg-red-100"
//                   }`}
//                 >
//                   {transaction.transaction_type === "income" ? (
//                     <TrendingUp className="w-4 h-4 text-green-600" />
//                   ) : (
//                     <TrendingDown className="w-4 h-4 text-red-600" />
//                   )}
//                 </div>
//                 <div className="flex-1">
//                   <p className="font-medium text-gray-800">{transaction.description}</p>
//                   <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
//                     <Calendar className="w-3 h-3" />
//                     <span>{new Date(transaction.transaction_date).toLocaleDateString()}</span>
//                     <span className="text-gray-400">•</span>
//                     <span>{new Date(transaction.created_at).toLocaleTimeString()}</span>
//                   </div>

//                   {/* Files */}
//                   {transaction.files && transaction.files.length > 0 && (
//                     <div className="mt-2">
//                       <p className="text-xs text-gray-500 mb-1">{transaction.files.length} file(s) attached:</p>
//                       <div className="flex flex-wrap gap-2">
//                         {transaction.files.map((file, fileIndex) => (
//                           <div key={file.id} className="flex items-center space-x-1">
//                             <Button
//                               variant="ghost"
//                               size="sm"
//                               className="h-6 px-2 text-xs text-blue-600 hover:text-blue-800"
//                               onClick={() => handleViewFile(file.file)}
//                             >
//                               <Eye className="w-3 h-3 mr-1" />
//                               View
//                             </Button>
//                             <Button
//                               variant="ghost"
//                               size="sm"
//                               className="h-6 px-2 text-xs text-gray-600 hover:text-gray-800"
//                               onClick={() =>
//                                 handleDownloadFile(file.file, `file_${transaction.id}_${fileIndex + 1}`)
//                               }
//                             >
//                               <Download className="w-3 h-3 mr-1" />
//                               Download
//                             </Button>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div className="text-right ml-4">
//                 <p
//                   className={`font-bold ${
//                     transaction.transaction_type === "income" ? "text-green-600" : "text-red-600"
//                   }`}
//                 >
//                   {transaction.transaction_type === "income" ? "+" : "-"}TSh{" "}
//                   {Number.parseFloat(transaction.amount).toLocaleString()}
//                 </p>
//                 <Badge
//                   variant={transaction.transaction_type === "income" ? "default" : "secondary"}
//                   className="text-xs mt-1"
//                 >
//                   {transaction.transaction_type}
//                 </Badge>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </CardContent>
//     </Card>
//   )
// }




// "use client"

// import { useState } from "react"
// import { motion } from "framer-motion"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { TrendingUp, TrendingDown, Calendar, FileText, Download, Eye, MessageCircle } from "lucide-react"
// import type { Transaction } from "../api/transaction-service"
// import type { Journey } from "../api/journey-service"
// import { generateJourneyReport } from "../utils/pdf-generator"

// interface ExpenseListProps {
//   transactions: Transaction[]
//   isLoading?: boolean
//   activeJourney?: Journey | null
//   totalIncome?: number
//   totalExpense?: number
//   remainingBalance?: number
// }

// export default function ExpenseList({
//   transactions,
//   isLoading = false,
//   activeJourney = null,
//   totalIncome = 0,
//   totalExpense = 0,
//   remainingBalance = 0,
// }: ExpenseListProps) {
//   const [isGeneratingReport, setIsGeneratingReport] = useState(false)

//   const handleViewFile = (fileUrl: string) => {
//     window.open(fileUrl, "_blank")
//   }

//   const handleDownloadFile = (fileUrl: string, fileName: string) => {
//     const link = document.createElement("a")
//     link.href = fileUrl
//     link.download = fileName
//     document.body.appendChild(link)
//     link.click()
//     document.body.removeChild(link)
//   }

//   const handleShareToWhatsApp = async () => {
//     try {
//       setIsGeneratingReport(true)

//       // Generate PDF report
//       const reportData = {
//         activeJourney,
//         transactions,
//         totalIncome,
//         totalExpense,
//         remainingBalance,
//       }

//       console.log("Generating PDF report with data:", reportData)

//       const pdfBlob = await generateJourneyReport(reportData)

//       // Create a temporary URL for the PDF
//       const pdfUrl = URL.createObjectURL(pdfBlob)

//       // Create download link for the PDF
//       const link = document.createElement("a")
//       link.href = pdfUrl
//       link.download = `JZA_Journey_Report_${new Date().toISOString().split("T")[0]}.pdf`
//       document.body.appendChild(link)
//       link.click()
//       document.body.removeChild(link)

//       // Clean up the URL after a short delay
//       setTimeout(() => {
//         URL.revokeObjectURL(pdfUrl)
//       }, 1000)

//       // Prepare WhatsApp message
//       const journeyName = activeJourney?.journey_name || "Journey Report"
//       const message =
//         `🚛 *JZA TECH JOURNEY REPORT*\n\n` +
//         `📋 *Journey:* ${journeyName}\n` +
//         `💰 *Total Income:* TSh ${totalIncome.toLocaleString()}\n` +
//         `💸 *Total Expenses:* TSh ${totalExpense.toLocaleString()}\n` +
//         `💵 *Remaining Balance:* TSh ${remainingBalance.toLocaleString()}\n` +
//         `📊 *Transactions:* ${transactions.length} entries\n\n` +
//         `📄 *Detailed PDF report has been downloaded to your device*\n\n` +
//         `Generated by JZA Tech Driver Portal 🚚`

//       // Open WhatsApp with the message
//       const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`

//       // Use a small delay to ensure PDF download starts first
//       setTimeout(() => {
//         window.open(whatsappUrl, "_blank")
//       }, 500)
//     } catch (error) {
//       console.error("Error generating report:", error)

//       // More specific error messages
//       let errorMessage = "Failed to generate report. Please try again."

//       if (error instanceof Error) {
//         if (error.message.includes("autoTable")) {
//           errorMessage = "PDF generation library error. Please refresh the page and try again."
//         } else if (error.message.includes("network")) {
//           errorMessage = "Network error. Please check your connection and try again."
//         } else {
//           errorMessage = `Error: ${error.message}`
//         }
//       }

//       alert(errorMessage)
//     } finally {
//       setIsGeneratingReport(false)
//     }
//   }

//   if (isLoading) {
//     return (
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center">
//             <FileText className="w-5 h-5 mr-2" />
//             Recent Transactions
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-3">
//             {[1, 2, 3].map((i) => (
//               <div key={i} className="animate-pulse">
//                 <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
//                   <div className="flex items-center space-x-3">
//                     <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
//                     <div>
//                       <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
//                       <div className="h-3 bg-gray-300 rounded w-24"></div>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <div className="h-4 bg-gray-300 rounded w-20 mb-2"></div>
//                     <div className="h-3 bg-gray-300 rounded w-16"></div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//     )
//   }

//   if (transactions.length === 0) {
//     return (
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center">
//             <FileText className="w-5 h-5 mr-2" />
//             Recent Transactions
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="text-center py-8">
//             <FileText className="w-16 h-16 mx-auto text-gray-300 mb-4" />
//             <p className="text-gray-500">No transactions yet</p>
//             <p className="text-sm text-gray-400">Add your first income or expense to get started</p>
//           </div>
//         </CardContent>
//       </Card>
//     )
//   }

//   return (
//     <Card>
//       <CardHeader>
//         <div className="flex items-center justify-between">
//           <CardTitle className="flex items-center">
//             <FileText className="w-5 h-5 mr-2" />
//             Recent Transactions ({transactions.length})
//           </CardTitle>
//           <Button
//             onClick={handleShareToWhatsApp}
//             disabled={isGeneratingReport}
//             className="bg-green-500 hover:bg-green-600 text-white flex items-center space-x-2"
//           >
//             {isGeneratingReport ? (
//               <>
//                 <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                 <span>Generating...</span>
//               </>
//             ) : (
//               <>
//                 <MessageCircle className="w-4 h-4" />
//                 <span>Share Report</span>
//               </>
//             )}
//           </Button>
//         </div>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-3">
//           {transactions.map((transaction, index) => (
//             <motion.div
//               key={transaction.id}
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.3, delay: index * 0.1 }}
//               className="flex items-start justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
//             >
//               <div className="flex items-start space-x-3 flex-1">
//                 <div
//                   className={`p-2 rounded-full ${
//                     transaction.transaction_type === "income" ? "bg-green-100" : "bg-red-100"
//                   }`}
//                 >
//                   {transaction.transaction_type === "income" ? (
//                     <TrendingUp className="w-4 h-4 text-green-600" />
//                   ) : (
//                     <TrendingDown className="w-4 h-4 text-red-600" />
//                   )}
//                 </div>
//                 <div className="flex-1">
//                   <p className="font-medium text-gray-800">{transaction.description}</p>
//                   <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
//                     <Calendar className="w-3 h-3" />
//                     <span>{new Date(transaction.transaction_date).toLocaleDateString()}</span>
//                     <span className="text-gray-400">•</span>
//                     <span>{new Date(transaction.created_at).toLocaleTimeString()}</span>
//                   </div>

//                   {/* Files */}
//                   {transaction.files && transaction.files.length > 0 && (
//                     <div className="mt-2">
//                       <p className="text-xs text-gray-500 mb-1">{transaction.files.length} file(s) attached:</p>
//                       <div className="flex flex-wrap gap-2">
//                         {transaction.files.map((file, fileIndex) => (
//                           <div key={file.id} className="flex items-center space-x-1">
//                             <Button
//                               variant="ghost"
//                               size="sm"
//                               className="h-6 px-2 text-xs text-blue-600 hover:text-blue-800"
//                               onClick={() => handleViewFile(file.file)}
//                             >
//                               <Eye className="w-3 h-3 mr-1" />
//                               View
//                             </Button>
//                             <Button
//                               variant="ghost"
//                               size="sm"
//                               className="h-6 px-2 text-xs text-gray-600 hover:text-gray-800"
//                               onClick={() => handleDownloadFile(file.file, `file_${transaction.id}_${fileIndex + 1}`)}
//                             >
//                               <Download className="w-3 h-3 mr-1" />
//                               Download
//                             </Button>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div className="text-right ml-4">
//                 <p
//                   className={`font-bold ${
//                     transaction.transaction_type === "income" ? "text-green-600" : "text-red-600"
//                   }`}
//                 >
//                   {transaction.transaction_type === "income" ? "+" : "-"}TSh{" "}
//                   {Number.parseFloat(transaction.amount).toLocaleString()}
//                 </p>
//                 <Badge
//                   variant={transaction.transaction_type === "income" ? "default" : "secondary"}
//                   className="text-xs mt-1"
//                 >
//                   {transaction.transaction_type}
//                 </Badge>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </CardContent>
//     </Card>
//   )
// }



"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, Calendar, FileText, Download, Eye, MessageCircle } from "lucide-react"
import type { Transaction } from "../api/transaction-service"
import type { Journey } from "../api/journey-service"
import { generateJourneyReport } from "../utils/pdf-generator"
import base_url from "@/api/base-url"
import base_Image from "@/api/base-image"

interface ExpenseListProps {
  transactions: Transaction[]
  isLoading?: boolean
  activeJourney?: Journey | null
  totalIncome?: number
  totalExpense?: number
  remainingBalance?: number
}

export default function ExpenseList({
  transactions,
  isLoading = false,
  activeJourney = null,
  totalIncome = 0,
  totalExpense = 0,
  remainingBalance = 0,
}: ExpenseListProps) {
  const [isGeneratingReport, setIsGeneratingReport] = useState(false)

  const handleViewFile = (fileUrl: string) => {
    window.open(base_Image + fileUrl, "_blank")
  }

  const handleDownloadFile = (fileUrl: string, fileName: string) => {
    const link = document.createElement("a")
    link.href = base_Image + fileUrl
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleShareToWhatsApp = async () => {
    try {
      setIsGeneratingReport(true)

      // Calculate proper remaining balance: Initial + Income - Expenses
      const initialBalance = activeJourney ? Number.parseFloat(activeJourney.total_trip_amount) : 0
      const calculatedRemainingBalance = initialBalance + totalIncome - totalExpense

      // Generate PDF report
      const reportData = {
        activeJourney,
        transactions,
        totalIncome,
        totalExpense,
        remainingBalance: calculatedRemainingBalance,
        logoUrl: "https://i.ibb.co/5g8393zV/company-avatar-663200d63d9b0-x2-3-removebg-preview.png",
      }

      console.log("Generating PDF report with data:", reportData)

      const pdfBlob = await generateJourneyReport(reportData)

      // Create a temporary URL for the PDF
      const pdfUrl = URL.createObjectURL(pdfBlob)

      // Create download link for the PDF
      const link = document.createElement("a")
      link.href = pdfUrl
      link.download = `JZA_Journey_Report_${new Date().toISOString().split("T")[0]}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Clean up the URL after a short delay
      setTimeout(() => {
        URL.revokeObjectURL(pdfUrl)
      }, 1000)

      // Prepare WhatsApp message with enhanced details
      const journeyName = activeJourney?.journey_name || "Journey Report"
      const journeyRoute = activeJourney ? `${activeJourney.trip_from} → ${activeJourney.trip_to}` : "No active journey"

      const message =
        `🚛 *JZA TECH JOURNEY REPORT*\n\n` +
        `📋 *Journey:* ${journeyName}\n` +
        `🛣️ *Route:* ${journeyRoute}\n` +
        `💰 *Initial Balance:* TSh ${initialBalance.toLocaleString()}\n` +
        `📈 *Total Income:* TSh ${totalIncome.toLocaleString()}\n` +
        `📉 *Total Expenses:* TSh ${totalExpense.toLocaleString()}\n` +
        `💵 *Remaining Balance:* TSh ${calculatedRemainingBalance.toLocaleString()}\n` +
        `📊 *Transactions:* ${transactions.length} entries\n\n` +
        `📄 *Detailed PDF report has been downloaded to your device*\n\n` +
        `Generated by JZA Tech Driver Portal 🚚`

      // Open WhatsApp with the message
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`

      // Use a small delay to ensure PDF download starts first
      setTimeout(() => {
        window.open(whatsappUrl, "_blank")
      }, 500)
    } catch (error) {
      console.error("Error generating report:", error)

      // More specific error messages
      let errorMessage = "Failed to generate report. Please try again."

      if (error instanceof Error) {
        if (error.message.includes("autoTable")) {
          errorMessage = "PDF generation library error. Please refresh the page and try again."
        } else if (error.message.includes("network")) {
          errorMessage = "Network error. Please check your connection and try again."
        } else {
          errorMessage = `Error: ${error.message}`
        }
      }

      alert(errorMessage)
    } finally {
      setIsGeneratingReport(false)
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Recent Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                    <div>
                      <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
                      <div className="h-3 bg-gray-300 rounded w-24"></div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="h-4 bg-gray-300 rounded w-20 mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded w-16"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (transactions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Recent Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <FileText className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No transactions yet</p>
            <p className="text-sm text-gray-400">Add your first income or expense to get started</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-md">
            <FileText className="w-5 h-5 mr-2 " />
            Recent Transactions ({transactions.length})
          </CardTitle>
          <Button
            onClick={handleShareToWhatsApp}
            disabled={isGeneratingReport}
            className="bg-green-500 hover:bg-green-600 text-white flex items-center space-x-2"
          >
            {isGeneratingReport ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Generating...</span>
              </>
            ) : (
              <>
                <MessageCircle className="w-4 h-4" />
                {/* <span>Share Report</span> */}
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {transactions.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-start justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-start space-x-3 flex-1">
                <div
                  className={`p-2 rounded-full ${
                    transaction.transaction_type === "income" ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  {transaction.transaction_type === "income" ? (
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{transaction.description} </p>
                  <p className="text-xs text-gray-800">({transaction?.created_by_name})</p>

                  <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                    <Calendar className="w-3 h-3" />
                    <span  className="text-xs">{new Date(transaction.transaction_date).toLocaleDateString()}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-xs">{new Date(transaction.created_at).toLocaleTimeString()}</span>
                  </div>

                  {/* Files */}
                  {transaction.files && transaction.files.length > 0 && (
                    <div className="mt-2">
                      <p className="text-xs text-gray-500 mb-1">{transaction.files.length} file(s) attached:</p>
                      <div className="flex flex-wrap gap-2">
                        {transaction.files.map((file, fileIndex) => (
                          <div key={file.id} className="flex items-center space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-2 text-xs text-blue-600 hover:text-blue-800"
                              onClick={() => handleViewFile(file.file)}
                            >
                              <Eye className="w-3 h-3 mr-1" />
                              View
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-2 text-xs text-gray-600 hover:text-gray-800"
                              onClick={() => handleDownloadFile(file.file, `file_${transaction.id}_${fileIndex + 1}`)}
                            >
                              <Download className="w-3 h-3 mr-1" />
                              Download
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="text-right ml-4">
                <p
                  className={`font-bold ${
                    transaction.transaction_type === "income" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {transaction.transaction_type === "income" ? "+" : "-"}TSh{" "}
                  {Number.parseFloat(transaction.amount).toLocaleString()}
                </p>
                <Badge
                  variant={transaction.transaction_type === "income" ? "default" : "secondary"}
                  className="text-xs mt-1"
                >
                  {transaction.transaction_type}
                </Badge>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
