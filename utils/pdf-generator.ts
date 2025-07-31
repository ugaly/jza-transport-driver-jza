// import { jsPDF } from "jspdf"
// import autoTable from "jspdf-autotable"
// import type { Transaction } from "../api/transaction-service"
// import type { Journey } from "../api/journey-service"

// interface ReportData {
//   activeJourney: Journey | null
//   transactions: Transaction[]
//   totalIncome: number
//   totalExpense: number
//   remainingBalance: number
// }

// export const generateJourneyReport = async (data: ReportData): Promise<Blob> => {
//   const doc = new jsPDF()

//   // Colors
//   const primaryColor = [59, 130, 246] as const // Blue
//   const successColor = [34, 197, 94] as const // Green
//   const dangerColor = [239, 68, 68] as const // Red
//   const grayColor = [107, 114, 128] as const // Gray

//   // Header with JZA branding
//   doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2])
//   doc.rect(0, 0, 210, 40, "F")

//   // JZA Logo area (you can add actual logo later)
//   doc.setFillColor(255, 255, 255)
//   doc.circle(25, 20, 12, "F")
//   doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
//   doc.setFontSize(16)
//   doc.setFont("helvetica", "bold")
//   doc.text("JZA", 20, 25)

//   // Title
//   doc.setTextColor(255, 255, 255)
//   doc.setFontSize(24)
//   doc.setFont("helvetica", "bold")
//   doc.text("JOURNEY REPORT", 50, 20)

//   // Subtitle
//   doc.setFontSize(12)
//   doc.setFont("helvetica", "normal")
//   doc.text("Driver Financial Summary", 50, 30)

//   // Date
//   doc.setFontSize(10)
//   doc.text(
//     `Generated: ${new Date().toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     })}`,
//     50,
//     36,
//   )

//   let yPosition = 55

//   // Journey Information Section
//   if (data.activeJourney) {
//     doc.setTextColor(0, 0, 0)
//     doc.setFontSize(16)
//     doc.setFont("helvetica", "bold")
//     doc.text("🚛 ACTIVE JOURNEY", 20, yPosition)

//     yPosition += 10

//     // Journey details box
//     doc.setFillColor(240, 253, 244) // Light green background
//     doc.rect(20, yPosition, 170, 35, "F")
//     doc.setDrawColor(34, 197, 94)
//     doc.rect(20, yPosition, 170, 35, "S")

//     doc.setFontSize(12)
//     doc.setFont("helvetica", "bold")
//     doc.setTextColor(0, 0, 0)
//     doc.text(data.activeJourney.journey_name, 25, yPosition + 8)

//     doc.setFont("helvetica", "normal")
//     doc.setFontSize(10)
//     doc.text(`From: ${data.activeJourney.trip_from}`, 25, yPosition + 16)
//     doc.text(`To: ${data.activeJourney.trip_to}`, 25, yPosition + 22)
//     doc.text(`Period: ${data.activeJourney.start_date} - ${data.activeJourney.end_date}`, 25, yPosition + 28)

//     // Journey amount
//     doc.setFont("helvetica", "bold")
//     doc.setTextColor(successColor[0], successColor[1], successColor[2])
//     doc.text(
//       `Total Amount: TSh ${Number.parseFloat(data.activeJourney.total_trip_amount).toLocaleString()}`,
//       120,
//       yPosition + 16,
//     )

//     yPosition += 45
//   } else {
//     doc.setTextColor(dangerColor[0], dangerColor[1], dangerColor[2])
//     doc.setFontSize(14)
//     doc.setFont("helvetica", "bold")
//     doc.text("⚠️ NO ACTIVE JOURNEY", 20, yPosition)
//     yPosition += 15
//   }

//   // Financial Summary Section
//   doc.setTextColor(0, 0, 0)
//   doc.setFontSize(16)
//   doc.setFont("helvetica", "bold")
//   doc.text("💰 FINANCIAL SUMMARY", 20, yPosition)

//   yPosition += 15

//   // Summary cards
//   const cardWidth = 50
//   const cardHeight = 25
//   const cardSpacing = 10

//   // Total Expenses Card
//   doc.setFillColor(254, 242, 242) // Light red
//   doc.rect(20, yPosition, cardWidth, cardHeight, "F")
//   doc.setDrawColor(dangerColor[0], dangerColor[1], dangerColor[2])
//   doc.rect(20, yPosition, cardWidth, cardHeight, "S")
//   doc.setTextColor(dangerColor[0], dangerColor[1], dangerColor[2])
//   doc.setFontSize(10)
//   doc.setFont("helvetica", "bold")
//   doc.text("TOTAL EXPENSES", 22, yPosition + 8)
//   doc.setFontSize(12)
//   doc.text(`TSh ${data.totalExpense.toLocaleString()}`, 22, yPosition + 18)

//   // Total Income Card
//   const incomeX = 20 + cardWidth + cardSpacing
//   doc.setFillColor(240, 253, 244) // Light green
//   doc.rect(incomeX, yPosition, cardWidth, cardHeight, "F")
//   doc.setDrawColor(successColor[0], successColor[1], successColor[2])
//   doc.rect(incomeX, yPosition, cardWidth, cardHeight, "S")
//   doc.setTextColor(successColor[0], successColor[1], successColor[2])
//   doc.setFontSize(10)
//   doc.setFont("helvetica", "bold")
//   doc.text("TOTAL INCOME", incomeX + 2, yPosition + 8)
//   doc.setFontSize(12)
//   doc.text(`TSh ${data.totalIncome.toLocaleString()}`, incomeX + 2, yPosition + 18)

//   // Remaining Balance Card
//   const balanceX = incomeX + cardWidth + cardSpacing
//   doc.setFillColor(239, 246, 255) // Light blue
//   doc.rect(balanceX, yPosition, cardWidth, cardHeight, "F")
//   doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2])
//   doc.rect(balanceX, yPosition, cardWidth, cardHeight, "S")
//   doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
//   doc.setFontSize(10)
//   doc.setFont("helvetica", "bold")
//   doc.text("REMAINING BALANCE", balanceX + 2, yPosition + 8)
//   doc.setFontSize(12)
//   doc.text(`TSh ${data.remainingBalance.toLocaleString()}`, balanceX + 2, yPosition + 18)

//   yPosition += 40

//   // Transactions Table
//   if (data.transactions.length > 0) {
//     doc.setTextColor(0, 0, 0)
//     doc.setFontSize(16)
//     doc.setFont("helvetica", "bold")
//     doc.text("📊 TRANSACTION DETAILS", 20, yPosition)

//     yPosition += 10

//     // Prepare table data
//     const tableData = data.transactions.map((transaction, index) => [
//       (index + 1).toString(),
//       new Date(transaction.transaction_date).toLocaleDateString(),
//       transaction.description.length > 30 ? transaction.description.substring(0, 30) + "..." : transaction.description,
//       transaction.transaction_type.toUpperCase(),
//       `TSh ${Number.parseFloat(transaction.amount).toLocaleString()}`,
//     ])

//     // Create table using autoTable
//     autoTable(doc, {
//       startY: yPosition,
//       head: [["#", "Date", "Description", "Type", "Amount"]],
//       body: tableData,
//       theme: "grid",
//       headStyles: {
//         fillColor: primaryColor,
//         textColor: [255, 255, 255],
//         fontStyle: "bold",
//         fontSize: 10,
//       },
//       bodyStyles: {
//         fontSize: 9,
//         cellPadding: 3,
//       },
//       alternateRowStyles: {
//         fillColor: [248, 250, 252],
//       },
//       columnStyles: {
//         0: { cellWidth: 15, halign: "center" },
//         1: { cellWidth: 25 },
//         2: { cellWidth: 60 },
//         3: { cellWidth: 25, halign: "center" },
//         4: { cellWidth: 35, halign: "right" },
//       },
//       didParseCell: (data: any) => {
//         if (data.column.index === 3) {
//           // Type column
//           if (data.cell.text[0] === "INCOME") {
//             data.cell.styles.textColor = successColor
//             data.cell.styles.fontStyle = "bold"
//           } else if (data.cell.text[0] === "EXPENSE") {
//             data.cell.styles.textColor = dangerColor
//             data.cell.styles.fontStyle = "bold"
//           }
//         }
//         if (data.column.index === 4) {
//           // Amount column
//           data.cell.styles.fontStyle = "bold"
//         }
//       },
//     })

//     // Get the final Y position after the table
//     yPosition = (doc as any).lastAutoTable.finalY + 20
//   }

//   // Footer
//   const pageHeight = doc.internal.pageSize.height
//   doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2])
//   doc.rect(0, pageHeight - 25, 210, 25, "F")

//   doc.setTextColor(255, 255, 255)
//   doc.setFontSize(10)
//   doc.setFont("helvetica", "normal")
//   doc.text("JZA Tech Driver Portal - Journey Management System", 20, pageHeight - 15)
//   doc.text(`Report generated on ${new Date().toLocaleDateString()}`, 20, pageHeight - 8)

//   // Page number
//   doc.text("Page 1", 180, pageHeight - 8)

//   return doc.output("blob")
// }




// import { jsPDF } from "jspdf"
// import autoTable from "jspdf-autotable"
// import type { Transaction } from "../api/transaction-service"
// import type { Journey } from "../api/journey-service"

// interface ReportData {
//   activeJourney: Journey | null
//   transactions: Transaction[]
//   totalIncome: number
//   totalExpense: number
//   remainingBalance: number
// }

// export const generateJourneyReport = async (data: ReportData): Promise<Blob> => {
//   const doc = new jsPDF()

//   // Colors
//   const primaryColor = [59, 130, 246] as const // Blue
//   const successColor = [34, 197, 94] as const // Green
//   const dangerColor = [239, 68, 68] as const // Red
//   const warningColor = [245, 158, 11] as const // Orange
//   const grayColor = [107, 114, 128] as const // Gray

//   // Header with JZA branding
//   doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2])
//   doc.rect(0, 0, 210, 40, "F")

//   // JZA Logo area (you can add actual logo later)
//   doc.setFillColor(255, 255, 255)
//   doc.circle(25, 20, 12, "F")
//   doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
//   doc.setFontSize(16)
//   doc.setFont("helvetica", "bold")
//   doc.text("JZA", 20, 25)

//   // Title
//   doc.setTextColor(255, 255, 255)
//   doc.setFontSize(24)
//   doc.setFont("helvetica", "bold")
//   doc.text("JOURNEY REPORT", 50, 20)

//   // Subtitle
//   doc.setFontSize(12)
//   doc.setFont("helvetica", "normal")
//   doc.text("Driver Financial Summary", 50, 30)

//   // Date
//   doc.setFontSize(10)
//   doc.text(
//     `Generated: ${new Date().toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     })}`,
//     50,
//     36,
//   )

//   let yPosition = 55

//   // Journey Information Section
//   doc.setTextColor(0, 0, 0)
//   doc.setFontSize(16)
//   doc.setFont("helvetica", "bold")
//   doc.text("JOURNEY INFORMATION", 20, yPosition)

//   yPosition += 4

//   if (data.activeJourney) {
//     // Journey details box
//     doc.setFillColor(240, 253, 244) // Light green background
//     doc.rect(20, yPosition, 170, 40, "F")
//     doc.setDrawColor(34, 197, 94)
//     doc.rect(20, yPosition, 170, 40, "S")

//     doc.setFontSize(14)
//     doc.setFont("helvetica", "bold")
//     doc.setTextColor(0, 0, 0)
//     doc.text(data.activeJourney.journey_name, 25, yPosition + 10)

//     // From and To section with better formatting
//     doc.setFont("helvetica", "normal")
//     doc.setFontSize(11)
//     doc.text("FROM:", 25, yPosition + 20)
//     doc.setFont("helvetica", "bold")
//     doc.text(data.activeJourney.trip_from, 50, yPosition + 20)

//     doc.setFont("helvetica", "normal")
//     doc.text("TO:", 25, yPosition + 28)
//     doc.setFont("helvetica", "bold")
//     doc.text(data.activeJourney.trip_to, 45, yPosition + 28)

//     // Period
//     doc.setFont("helvetica", "normal")
//     doc.setFontSize(10)
//     doc.text(`Period: ${data.activeJourney.start_date} - ${data.activeJourney.end_date}`, 25, yPosition + 36)

//     // Journey amount (Initial Balance)
//     doc.setFont("helvetica", "bold")
//     doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
//     doc.setFontSize(12)
//     // doc.text(
//     //   `Initial Amount: TSh ${Number.parseFloat(data.activeJourney.total_trip_amount).toLocaleString()}`,
//     //   120,
//     //   yPosition + 20,
//     // )

//     yPosition += 50
//   } else {
//     // No active journey box
//     doc.setFillColor(254, 242, 242) // Light red background
//     doc.rect(20, yPosition, 170, 25, "F")
//     doc.setDrawColor(239, 68, 68)
//     doc.rect(20, yPosition, 170, 25, "S")

//     doc.setTextColor(dangerColor[0], dangerColor[1], dangerColor[2])
//     doc.setFontSize(14)
//     doc.setFont("helvetica", "bold")
//     doc.text("NO ACTIVE JOURNEY", 25, yPosition + 15)

//     yPosition += 35
//   }




//   // Financial Summary Section
//   doc.setTextColor(0, 0, 0)
//   doc.setFontSize(16)
//   doc.setFont("helvetica", "bold")
//   doc.text("FINANCIAL SUMMARY", 20, yPosition)

//   yPosition += 4




  

//   // Calculate initial balance from active journey
//   const initialBalance = data.activeJourney ? Number.parseFloat(data.activeJourney.total_trip_amount) : 0
//   const calculatedRemainingBalance = initialBalance + data.totalIncome - data.totalExpense

//   // Summary cards - 4 cards in a row
//   const cardWidth = 40
//   const cardHeight = 30
//   const cardSpacing = 5

//   // Initial Balance Card
//   doc.setFillColor(239, 246, 255) // Light blue
//   doc.rect(20, yPosition, cardWidth, cardHeight, "F")
//   doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2])
//   doc.rect(20, yPosition, cardWidth, cardHeight, "S")
//   doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
//   doc.setFontSize(9)
//   doc.setFont("helvetica", "bold")
//   doc.text("INITIAL BALANCE", 22, yPosition + 8)
//   doc.setFontSize(11)
//   doc.text(`TSh ${initialBalance.toLocaleString()}`, 22, yPosition + 18)
//   doc.setFontSize(8)
//   doc.setFont("helvetica", "normal")
//   doc.text("Journey Amount", 22, yPosition + 25)

//   // Total Income Card
//   const incomeX = 20 + cardWidth + cardSpacing
//   doc.setFillColor(240, 253, 244) // Light green
//   doc.rect(incomeX, yPosition, cardWidth, cardHeight, "F")
//   doc.setDrawColor(successColor[0], successColor[1], successColor[2])
//   doc.rect(incomeX, yPosition, cardWidth, cardHeight, "S")
//   doc.setTextColor(successColor[0], successColor[1], successColor[2])
//   doc.setFontSize(9)
//   doc.setFont("helvetica", "bold")
//   doc.text("TOTAL INCOME", incomeX + 2, yPosition + 8)
//   doc.setFontSize(11)
//   doc.text(`TSh ${data.totalIncome.toLocaleString()}`, incomeX + 2, yPosition + 18)
//   doc.setFontSize(8)
//   doc.setFont("helvetica", "normal")
//   doc.text("Earned Amount", incomeX + 2, yPosition + 25)

//   // Total Expenses Card
//   const expenseX = incomeX + cardWidth + cardSpacing
//   doc.setFillColor(254, 242, 242) // Light red
//   doc.rect(expenseX, yPosition, cardWidth, cardHeight, "F")
//   doc.setDrawColor(dangerColor[0], dangerColor[1], dangerColor[2])
//   doc.rect(expenseX, yPosition, cardWidth, cardHeight, "S")
//   doc.setTextColor(dangerColor[0], dangerColor[1], dangerColor[2])
//   doc.setFontSize(9)
//   doc.setFont("helvetica", "bold")
//   doc.text("TOTAL EXPENSES", expenseX + 2, yPosition + 8)
//   doc.setFontSize(11)
//   doc.text(`TSh ${data.totalExpense.toLocaleString()}`, expenseX + 2, yPosition + 18)
//   doc.setFontSize(8)
//   doc.setFont("helvetica", "normal")
//   doc.text("Spent Amount", expenseX + 2, yPosition + 25)

//   // Remaining Balance Card
//   const balanceX = expenseX + cardWidth + cardSpacing
//   doc.setFillColor(255, 251, 235) // Light yellow/orange
//   doc.rect(balanceX, yPosition, cardWidth, cardHeight, "F")
//   doc.setDrawColor(warningColor[0], warningColor[1], warningColor[2])
//   doc.rect(balanceX, yPosition, cardWidth, cardHeight, "S")
//   doc.setTextColor(warningColor[0], warningColor[1], warningColor[2])
//   doc.setFontSize(9)
//   doc.setFont("helvetica", "bold")
//   doc.text("REMAINING", balanceX + 2, yPosition + 6)
//   doc.text("BALANCE", balanceX + 2, yPosition + 12)
//   doc.setFontSize(11)
//   doc.text(`TSh ${calculatedRemainingBalance.toLocaleString()}`, balanceX + 2, yPosition + 20)
//   doc.setFontSize(8)
//   doc.setFont("helvetica", "normal")
//   doc.text("Final Amount", balanceX + 2, yPosition + 27)

//   yPosition += 45

//   // Add calculation formula
// //   doc.setTextColor(grayColor[0], grayColor[1], grayColor[2])
// //   doc.setFontSize(9)
// //   doc.setFont("helvetica", "italic")
// //   doc.text(
// //     `Formula: Remaining Balance = Initial Balance (${initialBalance.toLocaleString()}) + Income (${data.totalIncome.toLocaleString()}) - Expenses (${data.totalExpense.toLocaleString()}) = ${calculatedRemainingBalance.toLocaleString()}`,
// //     20,
// //     yPosition,
// //   )

//   yPosition += 1

//   // Transactions Table
//   if (data.transactions.length > 0) {
//     doc.setTextColor(0, 0, 0)
//     doc.setFontSize(16)
//     doc.setFont("helvetica", "bold")
//     doc.text("TRANSACTION DETAILS", 20, yPosition)

//     yPosition += 4

//     // Prepare table data
//     const tableData = data.transactions.map((transaction, index) => [
//       (index + 1).toString(),
//       new Date(transaction.transaction_date).toLocaleDateString(),
//       transaction.description.length > 25 ? transaction.description.substring(0, 25) + "..." : transaction.description,
//       transaction.transaction_type.toUpperCase(),
//       `TSh ${Number.parseFloat(transaction.amount).toLocaleString()}`,
//     ])

//     // Create table using autoTable
//     autoTable(doc, {
//       startY: yPosition,
//       head: [["#", "Date", "Description", "Type", "Amount"]],
//       body: tableData,
//       theme: "grid",
//       headStyles: {
//         fillColor: primaryColor,
//         textColor: [255, 255, 255],
//         fontStyle: "bold",
//         fontSize: 10,
//       },
//       bodyStyles: {
//         fontSize: 9,
//         cellPadding: 3,
//       },
//       alternateRowStyles: {
//         fillColor: [248, 250, 252],
//       },
//       columnStyles: {
//         0: { cellWidth: 15, halign: "center" },
//         1: { cellWidth: 25 },
//         2: { cellWidth: 60 },
//         3: { cellWidth: 25, halign: "center" },
//         4: { cellWidth: 35, halign: "right" },
//       },
//       didParseCell: (data: any) => {
//         if (data.column.index === 3) {
//           // Type column
//           if (data.cell.text[0] === "INCOME") {
//             data.cell.styles.textColor = successColor
//             data.cell.styles.fontStyle = "bold"
//           } else if (data.cell.text[0] === "EXPENSE") {
//             data.cell.styles.textColor = dangerColor
//             data.cell.styles.fontStyle = "bold"
//           }
//         }
//         if (data.column.index === 4) {
//           // Amount column
//           data.cell.styles.fontStyle = "bold"
//         }
//       },
//     })

//     // Get the final Y position after the table
//     yPosition = (doc as any).lastAutoTable.finalY + 20
//   } else {
//     // No transactions message
//     doc.setTextColor(grayColor[0], grayColor[1], grayColor[2])
//     doc.setFontSize(12)
//     doc.setFont("helvetica", "italic")
//     doc.text("📝 No transactions recorded yet", 20, yPosition + 10)
//     yPosition += 25
//   }

//   // Footer
//   const pageHeight = doc.internal.pageSize.height
//   doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2])
//   doc.rect(0, pageHeight - 25, 210, 25, "F")

//   doc.setTextColor(255, 255, 255)
//   doc.setFontSize(10)
//   doc.setFont("helvetica", "normal")
//   doc.text("JZA Tech Driver Portal - Journey Management System", 20, pageHeight - 15)
//   doc.text(`Report generated on ${new Date().toLocaleDateString()}`, 20, pageHeight - 8)

//   // Page number
//   doc.text("Page 1", 180, pageHeight - 8)

//   return doc.output("blob")
// }









// import { jsPDF } from "jspdf"
// import autoTable from "jspdf-autotable"
// import type { Transaction } from "../api/transaction-service"
// import type { Journey } from "../api/journey-service"

// interface ReportData {
//   activeJourney: Journey | null
//   transactions: Transaction[]
//   totalIncome: number
//   totalExpense: number
//   remainingBalance: number
//   logoUrl?: string // Add optional logo URL
// }

// // Helper function to load image and convert to base64
// // const loadImageAsBase64 = async (url: string): Promise<string> => {
// //   return new Promise((resolve, reject) => {
// //     const img = new Image()
// //     img.crossOrigin = "anonymous" // Handle CORS
// //     img.onload = () => {
// //       const canvas = document.createElement("canvas")
// //       const ctx = canvas.getContext("2d")
// //       canvas.width = img.width
// //       canvas.height = img.height
// //       ctx?.drawImage(img, 0, 0)
// //       const dataURL = canvas.toDataURL("image/png")
// //       resolve(dataURL)
// //     }
// //     img.onerror = reject
// //     img.src = url
// //   })
// // }


// const loadImageAsBase64 = async (url: string): Promise<string> => {
//   return new Promise((resolve, reject) => {
//     const img = new Image()
//     img.crossOrigin = "anonymous"
//     img.onload = () => {
//       const canvas = document.createElement("canvas")
//       const ctx = canvas.getContext("2d")

//       // Set desired canvas size
//       const width = 900
//       const height = 900

//       canvas.width = width
//       canvas.height = height

//       // Draw image scaled to fit canvas
//       ctx?.drawImage(img, 0, 0, width, height)

//       const dataURL = canvas.toDataURL("image/png")
//       resolve(dataURL)
//     }
//     img.onerror = reject
//     img.src = url
//   })
// }

// export const generateJourneyReport = async (data: ReportData): Promise<Blob> => {
//   const doc = new jsPDF()

//   // Colors
//   const primaryColor = [59, 130, 246] as const // Blue
//   const successColor = [34, 197, 94] as const // Green
//   const dangerColor = [239, 68, 68] as const // Red
//   const warningColor = [245, 158, 11] as const // Orange
//   const grayColor = [107, 114, 128] as const // Gray

//   // Header with JZA branding
//   doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2])
//   doc.rect(0, 0, 210, 40, "F")

//   // Logo handling
//   try {
//     if (data.logoUrl) {
//       // Load and add actual logo
//       const logoBase64 = await loadImageAsBase64(data.logoUrl)
//     //   doc.addImage(logoBase64, "PNG", 15, 8, 20, 20) // x, y, width, height
//       doc.addImage(logoBase64, 'PNG', 10, 2, 50, 50) // 100x100 in mm

//     } else {
//       // Fallback to text logo
//       doc.setFillColor(255, 255, 255)
//       doc.circle(25, 20, 12, "F")
//       doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
//       doc.setFontSize(16)
//       doc.setFont("helvetica", "bold")
//       doc.text("JZA", 20, 25)
//     }
//   } catch (error) {
//     console.error("Failed to load logo:", error)
//     // Fallback to text logo if image loading fails
//     doc.setFillColor(255, 255, 255)
//     doc.circle(25, 20, 12, "F")
//     doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
//     doc.setFontSize(16)
//     doc.setFont("helvetica", "bold")
//     doc.text("JZA", 20, 25)
//   }

//   // Title
//   doc.setTextColor(255, 255, 255)
//   doc.setFontSize(24)
//   doc.setFont("helvetica", "bold")
//   doc.text("JZA DRIVER REPORT", 50, 20)

//   // Subtitle
//   doc.setFontSize(12)
//   doc.setFont("helvetica", "normal")
//   doc.text("Driver Financial Summary", 50, 30)

//   // Date
//   doc.setFontSize(10)
//   doc.text(
//     `Generated: ${new Date().toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     })}`,
//     50,
//     36,
//   )

//   let yPosition = 55

//   // Journey Information Section
//   doc.setTextColor(0, 0, 0)
//   doc.setFontSize(16)
//   doc.setFont("helvetica", "bold")
//   doc.text("JOURNEY INFORMATION", 20, yPosition)

//   yPosition += 4

//   if (data.activeJourney) {
//     // Journey details box
//     doc.setFillColor(240, 253, 244) // Light green background
//     doc.rect(20, yPosition, 170, 40, "F")
//     doc.setDrawColor(34, 197, 94)
//     doc.rect(20, yPosition, 170, 40, "S")

//     doc.setFontSize(14)
//     doc.setFont("helvetica", "bold")
//     doc.setTextColor(0, 0, 0)
//     doc.text(data.activeJourney.journey_name, 25, yPosition + 10)

//     // From and To section with better formatting
//     doc.setFont("helvetica", "normal")
//     doc.setFontSize(11)
//     doc.text("FROM:", 25, yPosition + 20)
//     doc.setFont("helvetica", "bold")
//     doc.text(data.activeJourney.trip_from, 50, yPosition + 20)

//     doc.setFont("helvetica", "normal")
//     doc.text("TO:", 25, yPosition + 28)
//     doc.setFont("helvetica", "bold")
//     doc.text(data.activeJourney.trip_to, 45, yPosition + 28)

//     // Period
//     doc.setFont("helvetica", "normal")
//     doc.setFontSize(10)
//     doc.text(`Period: ${data.activeJourney.start_date} - ${data.activeJourney.end_date}`, 25, yPosition + 36)

//     yPosition += 50
//   } else {
//     // No active journey box
//     doc.setFillColor(254, 242, 242) // Light red background
//     doc.rect(20, yPosition, 170, 25, "F")
//     doc.setDrawColor(239, 68, 68)
//     doc.rect(20, yPosition, 170, 25, "S")

//     doc.setTextColor(dangerColor[0], dangerColor[1], dangerColor[2])
//     doc.setFontSize(14)
//     doc.setFont("helvetica", "bold")
//     doc.text("NO ACTIVE JOURNEY", 25, yPosition + 15)

//     yPosition += 35
//   }

//   // Financial Summary Section
//   doc.setTextColor(0, 0, 0)
//   doc.setFontSize(16)
//   doc.setFont("helvetica", "bold")
//   doc.text("FINANCIAL SUMMARY", 20, yPosition)

//   yPosition += 4

//   // Calculate initial balance from active journey
//   const initialBalance = data.activeJourney ? Number.parseFloat(data.activeJourney.total_trip_amount) : 0
//   const calculatedRemainingBalance = initialBalance + data.totalIncome - data.totalExpense

//   // Summary cards - 4 cards in a row
//   const cardWidth = 40
//   const cardHeight = 30
//   const cardSpacing = 5

//   // Initial Balance Card
//   doc.setFillColor(239, 246, 255) // Light blue
//   doc.rect(20, yPosition, cardWidth, cardHeight, "F")
//   doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2])
//   doc.rect(20, yPosition, cardWidth, cardHeight, "S")
//   doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
//   doc.setFontSize(9)
//   doc.setFont("helvetica", "bold")
//   doc.text("INITIAL BALANCE", 22, yPosition + 8)
//   doc.setFontSize(11)
//   doc.text(`TSh ${initialBalance.toLocaleString()}`, 22, yPosition + 18)
//   doc.setFontSize(8)
//   doc.setFont("helvetica", "normal")
//   doc.text("Journey Amount", 22, yPosition + 25)

//   // Total Income Card
//   const incomeX = 20 + cardWidth + cardSpacing
//   doc.setFillColor(240, 253, 244) // Light green
//   doc.rect(incomeX, yPosition, cardWidth, cardHeight, "F")
//   doc.setDrawColor(successColor[0], successColor[1], successColor[2])
//   doc.rect(incomeX, yPosition, cardWidth, cardHeight, "S")
//   doc.setTextColor(successColor[0], successColor[1], successColor[2])
//   doc.setFontSize(9)
//   doc.setFont("helvetica", "bold")
//   doc.text("TOTAL INCOME", incomeX + 2, yPosition + 8)
//   doc.setFontSize(11)
//   doc.text(`TSh ${data.totalIncome.toLocaleString()}`, incomeX + 2, yPosition + 18)
//   doc.setFontSize(8)
//   doc.setFont("helvetica", "normal")
//   doc.text("Earned Amount", incomeX + 2, yPosition + 25)

//   // Total Expenses Card
//   const expenseX = incomeX + cardWidth + cardSpacing
//   doc.setFillColor(254, 242, 242) // Light red
//   doc.rect(expenseX, yPosition, cardWidth, cardHeight, "F")
//   doc.setDrawColor(dangerColor[0], dangerColor[1], dangerColor[2])
//   doc.rect(expenseX, yPosition, cardWidth, cardHeight, "S")
//   doc.setTextColor(dangerColor[0], dangerColor[1], dangerColor[2])
//   doc.setFontSize(9)
//   doc.setFont("helvetica", "bold")
//   doc.text("TOTAL EXPENSES", expenseX + 2, yPosition + 8)
//   doc.setFontSize(11)
//   doc.text(`TSh ${data.totalExpense.toLocaleString()}`, expenseX + 2, yPosition + 18)
//   doc.setFontSize(8)
//   doc.setFont("helvetica", "normal")
//   doc.text("Spent Amount", expenseX + 2, yPosition + 25)

//   // Remaining Balance Card
//   const balanceX = expenseX + cardWidth + cardSpacing
//   doc.setFillColor(255, 251, 235) // Light yellow/orange
//   doc.rect(balanceX, yPosition, cardWidth, cardHeight, "F")
//   doc.setDrawColor(warningColor[0], warningColor[1], warningColor[2])
//   doc.rect(balanceX, yPosition, cardWidth, cardHeight, "S")
//   doc.setTextColor(warningColor[0], warningColor[1], warningColor[2])
//   doc.setFontSize(9)
//   doc.setFont("helvetica", "bold")
//   doc.text("REMAINING", balanceX + 2, yPosition + 6)
//   doc.text("BALANCE", balanceX + 2, yPosition + 12)
//   doc.setFontSize(11)
//   doc.text(`TSh ${calculatedRemainingBalance.toLocaleString()}`, balanceX + 2, yPosition + 20)
//   doc.setFontSize(8)
//   doc.setFont("helvetica", "normal")
//   doc.text("Final Amount", balanceX + 2, yPosition + 27)

//   yPosition += 45

//   // Transactions Table
//   if (data.transactions.length > 0) {
//     doc.setTextColor(0, 0, 0)
//     doc.setFontSize(16)
//     doc.setFont("helvetica", "bold")
//     doc.text("TRANSACTION DETAILS", 20, yPosition)

//     yPosition += 4

//     // Prepare table data
//     const tableData = data.transactions.map((transaction, index) => [
//       (index + 1).toString(),
//       new Date(transaction.transaction_date).toLocaleDateString(),
//       transaction.description.length > 25 ? transaction.description.substring(0, 25) + "..." : transaction.description,
//       transaction.transaction_type.toUpperCase(),
//       `TSh ${Number.parseFloat(transaction.amount).toLocaleString()}`,
//     ])

//     // Create table using autoTable
//     autoTable(doc, {
//       startY: yPosition,
//       head: [["#", "Date", "Description", "Type", "Amount"]],
//       body: tableData,
//       theme: "grid",
//       headStyles: {
//         fillColor: primaryColor,
//         textColor: [255, 255, 255],
//         fontStyle: "bold",
//         fontSize: 10,
//       },
//       bodyStyles: {
//         fontSize: 9,
//         cellPadding: 3,
//       },
//       alternateRowStyles: {
//         fillColor: [248, 250, 252],
//       },
//       columnStyles: {
//         0: { cellWidth: 15, halign: "center" },
//         1: { cellWidth: 25 },
//         2: { cellWidth: 60 },
//         3: { cellWidth: 25, halign: "center" },
//         4: { cellWidth: 35, halign: "right" },
//       },
//       didParseCell: (data: any) => {
//         if (data.column.index === 3) {
//           // Type column
//           if (data.cell.text[0] === "INCOME") {
//             data.cell.styles.textColor = successColor
//             data.cell.styles.fontStyle = "bold"
//           } else if (data.cell.text[0] === "EXPENSE") {
//             data.cell.styles.textColor = dangerColor
//             data.cell.styles.fontStyle = "bold"
//           }
//         }
//         if (data.column.index === 4) {
//           // Amount column
//           data.cell.styles.fontStyle = "bold"
//         }
//       },
//     })

//     // Get the final Y position after the table
//     yPosition = (doc as any).lastAutoTable.finalY + 20
//   } else {
//     // No transactions message
//     doc.setTextColor(grayColor[0], grayColor[1], grayColor[2])
//     doc.setFontSize(12)
//     doc.setFont("helvetica", "italic")
//     doc.text("📝 No transactions recorded yet", 20, yPosition + 10)
//     yPosition += 25
//   }

//   // Footer
//   const pageHeight = doc.internal.pageSize.height
//   doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2])
//   doc.rect(0, pageHeight - 25, 210, 25, "F")

//   doc.setTextColor(255, 255, 255)
//   doc.setFontSize(10)
//   doc.setFont("helvetica", "normal")
//   doc.text("JZA Tech Driver Portal - Journey Management System", 20, pageHeight - 15)
//   doc.text(`Report generated on ${new Date().toLocaleDateString()}`, 20, pageHeight - 8)

//   // Page number
//   doc.text("Page 1", 180, pageHeight - 8)

//   return doc.output("blob")
// }






// import { jsPDF } from "jspdf"
// import autoTable from "jspdf-autotable"
// import type { Transaction } from "../api/transaction-service"
// import type { Journey } from "../api/journey-service"

// interface ReportData {
//   activeJourney: Journey | null
//   transactions: Transaction[]
//   totalIncome: number
//   totalExpense: number
//   remainingBalance: number
//   logoUrl?: string // Add optional logo URL
// }

// const loadImageAsBase64 = async (url: string): Promise<string> => {
//   return new Promise((resolve, reject) => {
//     const img = new Image()
//     img.crossOrigin = "anonymous"
//     img.onload = () => {
//       const canvas = document.createElement("canvas")
//       const ctx = canvas.getContext("2d")
//       // Set desired canvas size
//       const width = 900
//       const height = 900
//       canvas.width = width
//       canvas.height = height
//       // Draw image scaled to fit canvas
//       ctx?.drawImage(img, 0, 0, width, height)
//       const dataURL = canvas.toDataURL("image/png")
//       resolve(dataURL)
//     }
//     img.onerror = reject
//     img.src = url
//   })
// }

// export const generateJourneyReport = async (data: ReportData): Promise<Blob> => {
//   const doc = new jsPDF()

//   // Colors - Remove 'as const' to make them mutable
//   const primaryColor: [number, number, number] = [59, 130, 246] // Blue
//   const successColor: [number, number, number] = [34, 197, 94] // Green
//   const dangerColor: [number, number, number] = [239, 68, 68] // Red
//   const warningColor: [number, number, number] = [245, 158, 11] // Orange
//   const grayColor: [number, number, number] = [107, 114, 128] // Gray

//   // Header with JZA branding
//   doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2])
//   doc.rect(0, 0, 210, 40, "F")

//   // Logo handling
//   try {
//     if (data.logoUrl) {
//       // Load and add actual logo
//       const logoBase64 = await loadImageAsBase64(data.logoUrl)
//       doc.addImage(logoBase64, "PNG", 10, 2, 50, 50) // 100x100 in mm
//     } else {
//       // Fallback to text logo
//       doc.setFillColor(255, 255, 255)
//       doc.circle(25, 20, 12, "F")
//       doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
//       doc.setFontSize(16)
//       doc.setFont("helvetica", "bold")
//       doc.text("JZA", 20, 25)
//     }
//   } catch (error) {
//     console.error("Failed to load logo:", error)
//     // Fallback to text logo if image loading fails
//     doc.setFillColor(255, 255, 255)
//     doc.circle(25, 20, 12, "F")
//     doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
//     doc.setFontSize(16)
//     doc.setFont("helvetica", "bold")
//     doc.text("JZA", 20, 25)
//   }

//   // Title
//   doc.setTextColor(255, 255, 255)
//   doc.setFontSize(24)
//   doc.setFont("helvetica", "bold")
//   doc.text("JZA DRIVER REPORT", 50, 20)

//   // Subtitle
//   doc.setFontSize(12)
//   doc.setFont("helvetica", "normal")
//   doc.text("Driver Financial Summary", 50, 30)

//   // Date
//   doc.setFontSize(10)
//   doc.text(
//     `Generated: ${new Date().toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     })}`,
//     50,
//     36,
//   )

//   let yPosition = 55

//   // Journey Information Section
//   doc.setTextColor(0, 0, 0)
//   doc.setFontSize(16)
//   doc.setFont("helvetica", "bold")
//   doc.text("JOURNEY INFORMATION", 20, yPosition)
//   yPosition += 4

//   if (data.activeJourney) {
//     // Journey details box
//     doc.setFillColor(240, 253, 244) // Light green background
//     doc.rect(20, yPosition, 170, 40, "F")
//     doc.setDrawColor(34, 197, 94)
//     doc.rect(20, yPosition, 170, 40, "S")

//     doc.setFontSize(14)
//     doc.setFont("helvetica", "bold")
//     doc.setTextColor(0, 0, 0)
//     doc.text(data.activeJourney.journey_name, 25, yPosition + 10)

//     // From and To section with better formatting
//     doc.setFont("helvetica", "normal")
//     doc.setFontSize(11)
//     doc.text("FROM:", 25, yPosition + 20)
//     doc.setFont("helvetica", "bold")
//     doc.text(data.activeJourney.trip_from, 50, yPosition + 20)

//     doc.setFont("helvetica", "normal")
//     doc.text("TO:", 25, yPosition + 28)
//     doc.setFont("helvetica", "bold")
//     doc.text(data.activeJourney.trip_to, 45, yPosition + 28)

//     // Period
//     doc.setFont("helvetica", "normal")
//     doc.setFontSize(10)
//     doc.text(`Period: ${data.activeJourney.start_date} - ${data.activeJourney.end_date}`, 25, yPosition + 36)

//     yPosition += 50
//   } else {
//     // No active journey box
//     doc.setFillColor(254, 242, 242) // Light red background
//     doc.rect(20, yPosition, 170, 25, "F")
//     doc.setDrawColor(239, 68, 68)
//     doc.rect(20, yPosition, 170, 25, "S")

//     doc.setTextColor(dangerColor[0], dangerColor[1], dangerColor[2])
//     doc.setFontSize(14)
//     doc.setFont("helvetica", "bold")
//     doc.text("NO ACTIVE JOURNEY", 25, yPosition + 15)

//     yPosition += 35
//   }

//   // Financial Summary Section
//   doc.setTextColor(0, 0, 0)
//   doc.setFontSize(16)
//   doc.setFont("helvetica", "bold")
//   doc.text("FINANCIAL SUMMARY", 20, yPosition)
//   yPosition += 4

//   // Calculate initial balance from active journey
//   const initialBalance = data.activeJourney ? Number.parseFloat(data.activeJourney.total_trip_amount) : 0
//   const calculatedRemainingBalance = initialBalance + data.totalIncome - data.totalExpense

//   // Summary cards - 4 cards in a row
//   const cardWidth = 40
//   const cardHeight = 30
//   const cardSpacing = 5

//   // Initial Balance Card
//   doc.setFillColor(239, 246, 255) // Light blue
//   doc.rect(20, yPosition, cardWidth, cardHeight, "F")
//   doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2])
//   doc.rect(20, yPosition, cardWidth, cardHeight, "S")

//   doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
//   doc.setFontSize(9)
//   doc.setFont("helvetica", "bold")
//   doc.text("INITIAL BALANCE", 22, yPosition + 8)
//   doc.setFontSize(11)
//   doc.text(`TSh ${initialBalance.toLocaleString()}`, 22, yPosition + 18)
//   doc.setFontSize(8)
//   doc.setFont("helvetica", "normal")
//   doc.text("Journey Amount", 22, yPosition + 25)

//   // Total Income Card
//   const incomeX = 20 + cardWidth + cardSpacing
//   doc.setFillColor(240, 253, 244) // Light green
//   doc.rect(incomeX, yPosition, cardWidth, cardHeight, "F")
//   doc.setDrawColor(successColor[0], successColor[1], successColor[2])
//   doc.rect(incomeX, yPosition, cardWidth, cardHeight, "S")

//   doc.setTextColor(successColor[0], successColor[1], successColor[2])
//   doc.setFontSize(9)
//   doc.setFont("helvetica", "bold")
//   doc.text("TOTAL INCOME", incomeX + 2, yPosition + 8)
//   doc.setFontSize(11)
//   doc.text(`TSh ${data.totalIncome.toLocaleString()}`, incomeX + 2, yPosition + 18)
//   doc.setFontSize(8)
//   doc.setFont("helvetica", "normal")
//   doc.text("Earned Amount", incomeX + 2, yPosition + 25)

//   // Total Expenses Card
//   const expenseX = incomeX + cardWidth + cardSpacing
//   doc.setFillColor(254, 242, 242) // Light red
//   doc.rect(expenseX, yPosition, cardWidth, cardHeight, "F")
//   doc.setDrawColor(dangerColor[0], dangerColor[1], dangerColor[2])
//   doc.rect(expenseX, yPosition, cardWidth, cardHeight, "S")

//   doc.setTextColor(dangerColor[0], dangerColor[1], dangerColor[2])
//   doc.setFontSize(9)
//   doc.setFont("helvetica", "bold")
//   doc.text("TOTAL EXPENSES", expenseX + 2, yPosition + 8)
//   doc.setFontSize(11)
//   doc.text(`TSh ${data.totalExpense.toLocaleString()}`, expenseX + 2, yPosition + 18)
//   doc.setFontSize(8)
//   doc.setFont("helvetica", "normal")
//   doc.text("Spent Amount", expenseX + 2, yPosition + 25)

//   // Remaining Balance Card
//   const balanceX = expenseX + cardWidth + cardSpacing
//   doc.setFillColor(255, 251, 235) // Light yellow/orange
//   doc.rect(balanceX, yPosition, cardWidth, cardHeight, "F")
//   doc.setDrawColor(warningColor[0], warningColor[1], warningColor[2])
//   doc.rect(balanceX, yPosition, cardWidth, cardHeight, "S")

//   doc.setTextColor(warningColor[0], warningColor[1], warningColor[2])
//   doc.setFontSize(9)
//   doc.setFont("helvetica", "bold")
//   doc.text("REMAINING", balanceX + 2, yPosition + 6)
//   doc.text("BALANCE", balanceX + 2, yPosition + 12)
//   doc.setFontSize(11)
//   doc.text(`TSh ${calculatedRemainingBalance.toLocaleString()}`, balanceX + 2, yPosition + 20)
//   doc.setFontSize(8)
//   doc.setFont("helvetica", "normal")
//   doc.text("Final Amount", balanceX + 2, yPosition + 27)

//   yPosition += 45

//   // Transactions Table
//   if (data.transactions.length > 0) {
//     doc.setTextColor(0, 0, 0)
//     doc.setFontSize(16)
//     doc.setFont("helvetica", "bold")
//     doc.text("TRANSACTION DETAILS", 20, yPosition)
//     yPosition += 4

//     // Prepare table data
//     const tableData = data.transactions.map((transaction, index) => [
//       (index + 1).toString(),
//       new Date(transaction.transaction_date).toLocaleDateString(),
//       transaction.description.length > 25 ? transaction.description.substring(0, 25) + "..." : transaction.description,
//       transaction.transaction_type.toUpperCase(),
//       `TSh ${Number.parseFloat(transaction.amount).toLocaleString()}`,
//     ])

//     // Create table using autoTable
//     autoTable(doc, {
//       startY: yPosition,
//       head: [["#", "Date", "Description", "Type", "Amount"]],
//       body: tableData,
//       theme: "grid",
//       headStyles: {
//         fillColor: primaryColor,
//         textColor: [255, 255, 255],
//         fontStyle: "bold",
//         fontSize: 10,
//       },
//       bodyStyles: {
//         fontSize: 9,
//         cellPadding: 3,
//       },
//       alternateRowStyles: {
//         fillColor: [248, 250, 252],
//       },
//       columnStyles: {
//         0: { cellWidth: 15, halign: "center" },
//         1: { cellWidth: 25 },
//         2: { cellWidth: 60 },
//         3: { cellWidth: 25, halign: "center" },
//         4: { cellWidth: 35, halign: "right" },
//       },
//       didParseCell: (data: any) => {
//         if (data.column.index === 3) {
//           // Type column
//           if (data.cell.text[0] === "INCOME") {
//             data.cell.styles.textColor = successColor
//             data.cell.styles.fontStyle = "bold"
//           } else if (data.cell.text[0] === "EXPENSE") {
//             data.cell.styles.textColor = dangerColor
//             data.cell.styles.fontStyle = "bold"
//           }
//         }
//         if (data.column.index === 4) {
//           // Amount column
//           data.cell.styles.fontStyle = "bold"
//         }
//       },
//     })

//     // Get the final Y position after the table
//     yPosition = (doc as any).lastAutoTable.finalY + 20
//   } else {
//     // No transactions message
//     doc.setTextColor(grayColor[0], grayColor[1], grayColor[2])
//     doc.setFontSize(12)
//     doc.setFont("helvetica", "italic")
//     doc.text("📝 No transactions recorded yet", 20, yPosition + 10)
//     yPosition += 25
//   }

//   // Footer
//   const pageHeight = doc.internal.pageSize.height
//   doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2])
//   doc.rect(0, pageHeight - 25, 210, 25, "F")

//   doc.setTextColor(255, 255, 255)
//   doc.setFontSize(10)
//   doc.setFont("helvetica", "normal")
//   doc.text("JZA Tech Driver Portal - Journey Management System", 20, pageHeight - 15)
//   doc.text(`Report generated on ${new Date().toLocaleDateString()}`, 20, pageHeight - 8)

//   // Page number
//   doc.text("Page 1", 180, pageHeight - 8)

//   return doc.output("blob")
// }



import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"

interface Transaction {
  id: string
  transaction_date: string
  description: string
  transaction_type: "INCOME" | "EXPENSE"
  amount: string
}

interface Journey {
  id: string
  journey_name: string
  trip_from: string
  trip_to: string
  start_date: string
  end_date: string
  total_trip_amount: string
  status: string
}

interface ReportData {
  activeJourney: Journey | null
  transactions: Transaction[]
  totalIncome: number
  totalExpense: number
  remainingBalance: number
  logoUrl?: string
}

const loadImageAsBase64 = async (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")

      const width = 400
      const height = 400
      canvas.width = width
      canvas.height = height

      ctx?.drawImage(img, 0, 0, width, height)
      const dataURL = canvas.toDataURL("image/png")
      resolve(dataURL)
    }
    img.onerror = reject
    img.src = url
  })
}

const createModernLogo = (doc: jsPDF, x: number, y: number, size: number) => {
  // Create a modern gradient-style logo
  doc.setFillColor(59, 130, 246) // Blue
  doc.circle(x + size / 2, y + size / 2, size / 2, "F")

  // Add inner circle with lighter blue
  doc.setFillColor(147, 197, 253)
  doc.circle(x + size / 2, y + size / 2, size / 3, "F")

  // Add text
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(size / 3)
  doc.setFont("helvetica", "bold")
  const textWidth = doc.getTextWidth("JZA")
  doc.text("JZA", x + size / 2 - textWidth / 2, y + size / 2 + size / 12)
}

const addWatermark = (doc: jsPDF) => {
  const pageWidth = doc.internal.pageSize.width
  const pageHeight = doc.internal.pageSize.height

  doc.saveGraphicsState()
  doc.setGState(new doc.GState({ opacity: 0.1 }))
  doc.setTextColor(59, 130, 246)
  doc.setFontSize(60)
  doc.setFont("helvetica", "bold")

  // Rotate and add watermark
  doc.text("JZA TECH", pageWidth / 2, pageHeight / 2, {
    angle: 45,
    align: "center",
  })
  doc.restoreGraphicsState()
}

const wrapText = (doc: jsPDF, text: string, maxWidth: number, fontSize = 9): string[] => {
  doc.setFontSize(fontSize)
  const words = text.split(" ")
  const lines: string[] = []
  let currentLine = ""

  for (const word of words) {
    const testLine = currentLine + (currentLine ? " " : "") + word
    const testWidth = doc.getTextWidth(testLine)

    if (testWidth > maxWidth && currentLine) {
      lines.push(currentLine)
      currentLine = word
    } else {
      currentLine = testLine
    }
  }

  if (currentLine) {
    lines.push(currentLine)
  }

  return lines
}

export const generateJourneyReport = async (data: ReportData): Promise<Blob> => {
  const doc = new jsPDF()

  // Modern color palette
  const colors = {
    primary: [59, 130, 246] as [number, number, number],
    secondary: [99, 102, 241] as [number, number, number],
    success: [34, 197, 94] as [number, number, number],
    danger: [239, 68, 68] as [number, number, number],
    warning: [245, 158, 11] as [number, number, number],
    gray: [107, 114, 128] as [number, number, number],
    lightGray: [248, 250, 252] as [number, number, number],
    white: [255, 255, 255] as [number, number, number],
  }

  // Add watermark
  addWatermark(doc)

  // Modern header with gradient effect
  // doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2])
  // doc.rect(0, 0, 210, 50, "F")

  // // Add subtle gradient effect
  // doc.setFillColor(colors.secondary[0], colors.secondary[1], colors.secondary[2])
  // doc.rect(0, 0, 210, 25, "F")

  doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2])
doc.rect(0, 0, 210, 50, "F")

  // Logo handling with modern design
  try {
    if (data.logoUrl) {
      const logoBase64 = await loadImageAsBase64(data.logoUrl)
      doc.addImage(logoBase64, "PNG", 15, 10, 30, 30)
    } else {
      createModernLogo(doc, 15, 10, 30)
    }
  } catch (error) {
    console.error("Failed to load logo:", error)
    createModernLogo(doc, 15, 10, 30)
  }

  // Modern title design
  doc.setTextColor(colors.white[0], colors.white[1], colors.white[2])
  doc.setFontSize(28)
  doc.setFont("helvetica", "bold")
  doc.text("JZA DRIVER REPORT", 55, 25)

  doc.setFontSize(14)
  doc.setFont("helvetica", "normal")
  doc.text("Driver Name: Boaz Mlonganile", 55, 35)

  // Date and time
  doc.setFontSize(10)
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
  doc.text(`Generated: ${currentDate}`, 55, 42)

  let yPosition = 65

  // Journey Information Section with modern card design
  doc.setTextColor(0, 0, 0)
  doc.setFontSize(18)
  doc.setFont("helvetica", "bold")
  doc.text("JOURNEY INFORMATION", 20, yPosition)
  yPosition += 8

  if (data.activeJourney) {
    // Modern card with shadow effect
    doc.setFillColor(colors.lightGray[0], colors.lightGray[1], colors.lightGray[2])
    doc.rect(18, yPosition, 174, 45, "F")
    doc.setFillColor(colors.success[0], colors.success[1], colors.success[2])
    doc.rect(20, yPosition, 170, 45, "F")
    doc.setFillColor(colors.white[0], colors.white[1], colors.white[2])
    doc.rect(22, yPosition + 2, 166, 41, "F")

    // Journey details with better typography
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2])
    doc.text(data.activeJourney.journey_name, 25, yPosition + 12)

    // Route information
    doc.setFont("helvetica", "normal")
    doc.setFontSize(12)
    doc.setTextColor(0, 0, 0)
    doc.text("FROM:", 25, yPosition + 22)
    doc.setFont("helvetica", "bold")
    doc.text(data.activeJourney.trip_from, 50, yPosition + 22)

    doc.setFont("helvetica", "normal")
    doc.text("TO:", 25, yPosition + 30)
    doc.setFont("helvetica", "bold")
    doc.text(data.activeJourney.trip_to, 45, yPosition + 30)

    // Period
    doc.setFont("helvetica", "normal")
    doc.setFontSize(10)
    doc.setTextColor(colors.gray[0], colors.gray[1], colors.gray[2])
    doc.text(`Period: ${data.activeJourney.start_date} to ${data.activeJourney.end_date}`, 25, yPosition + 38)

    yPosition += 55
  } else {
    // No active journey with modern styling
    doc.setFillColor(colors.danger[0], colors.danger[1], colors.danger[2])
    doc.rect(20, yPosition, 170, 30, "F")
    doc.setFillColor(colors.white[0], colors.white[1], colors.white[2])
    doc.rect(22, yPosition + 2, 166, 26, "F")

    doc.setTextColor(colors.danger[0], colors.danger[1], colors.danger[2])
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.text("NO ACTIVE JOURNEY", 25, yPosition + 18)

    yPosition += 40
  }

  // Financial Summary with modern card grid - Only 3 cards now
  doc.setTextColor(0, 0, 0)
  doc.setFontSize(18)
  doc.setFont("helvetica", "bold")
  doc.text("FINANCIAL SUMMARY", 20, yPosition)
  yPosition += 8

  const initialBalance = data.activeJourney ? Number.parseFloat(data.activeJourney.total_trip_amount) : 0
  const calculatedRemainingBalance = initialBalance + data.totalIncome - data.totalExpense

  // Modern financial cards with better spacing - Updated to 3 cards
  const cardWidth = 56
  const cardHeight = 40
  const cardSpacing = 4

  const financialData = [
    {
      title: "INITIAL BALANCE",
      subtitle: "Journey Amount",
      amount: initialBalance,
      color: colors.primary,
      bgColor: [239, 246, 255] as [number, number, number],
    },
    {
      title: "TOTAL EXPENSES",
      subtitle: "Spent Amount",
      amount: data.totalExpense,
      color: colors.danger,
      bgColor: [254, 242, 242] as [number, number, number],
    },
    {
      title: "REMAINING BALANCE",
      subtitle: "Final Amount",
      amount: calculatedRemainingBalance,
      color: colors.warning,
      bgColor: [255, 251, 235] as [number, number, number],
    },
  ]

  financialData.forEach((card, index) => {
    const cardX = 20 + (cardWidth + cardSpacing) * index

    // Enhanced card shadow
    doc.setFillColor(220, 220, 220)
    doc.rect(cardX + 2, yPosition + 2, cardWidth, cardHeight, "F")

    // Card background with gradient effect
    doc.setFillColor(card.bgColor[0], card.bgColor[1], card.bgColor[2])
    doc.rect(cardX, yPosition, cardWidth, cardHeight, "F")

    // Card border with rounded corners effect
    doc.setDrawColor(card.color[0], card.color[1], card.color[2])
    doc.setLineWidth(1)
    doc.rect(cardX, yPosition, cardWidth, cardHeight, "S")

    // Decorative top bar
    doc.setFillColor(card.color[0], card.color[1], card.color[2])
    doc.rect(cardX, yPosition, cardWidth, 4, "F")

    // Title
    doc.setTextColor(card.color[0], card.color[1], card.color[2])
    doc.setFontSize(10)
    doc.setFont("helvetica", "bold")
    doc.text(card.title, cardX + 4, yPosition + 15)

    // Amount with better formatting
    doc.setFontSize(14)
    doc.text(`TSh ${card.amount.toLocaleString()}`, cardX + 4, yPosition + 25)

    // Subtitle
    doc.setFontSize(8)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(colors.gray[0], colors.gray[1], colors.gray[2])
    doc.text(card.subtitle, cardX + 4, yPosition + 35)
  })

  yPosition += 55

  // Enhanced Transactions Table - Remove category column
  if (data.transactions.length > 0) {
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(18)
    doc.setFont("helvetica", "bold")
    doc.text("TRANSACTION DETAILS", 20, yPosition)
    yPosition += 8

    // Prepare enhanced table data with full descriptions - Remove category
    const tableData = data.transactions.map((transaction, index) => {
      const descriptionLines = wrapText(doc, transaction.description, 60, 8)
      return [
        (index + 1).toString(),
        new Date(transaction.transaction_date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        descriptionLines.join("\n"),
        transaction.transaction_type.toUpperCase(),
        `TSh ${Number.parseFloat(transaction.amount).toLocaleString()}`,
      ]
    })

    // Enhanced table with better styling - Remove category column
    autoTable(doc, {
      startY: yPosition,
      head: [["#", "Date", "Description", "Type", "Amount"]],
      body: tableData,
      theme: "grid",
      headStyles: {
        fillColor: colors.primary,
        textColor: colors.white,
        fontStyle: "bold",
        fontSize: 11,
        cellPadding: 5,
      },
      bodyStyles: {
        fontSize: 9,
        cellPadding: 4,
        lineColor: [200, 200, 200],
        lineWidth: 0.1,
      },
      alternateRowStyles: {
        fillColor: colors.lightGray,
      },
      columnStyles: {
        0: { cellWidth: 15, halign: "center", fontStyle: "bold" },
        1: { cellWidth: 30, fontSize: 9 },
        2: { cellWidth: 70, fontSize: 9 },
        3: { cellWidth: 25, halign: "center", fontStyle: "bold" },
        4: { cellWidth: 35, halign: "right", fontStyle: "bold" },
      },
      didParseCell: (data: any) => {
        if (data.column.index === 3) {
          // Type column
          if (data.cell.text[0] === "INCOME") {
            data.cell.styles.textColor = colors.success
            data.cell.styles.fillColor = [240, 253, 244]
          } else if (data.cell.text[0] === "EXPENSE") {
            data.cell.styles.textColor = colors.danger
            data.cell.styles.fillColor = [254, 242, 242]
          }
        }
        if (data.column.index === 4) {
          // Amount column
          data.cell.styles.fontStyle = "bold"
          data.cell.styles.fontSize = 10
        }
      },
      margin: { left: 20, right: 20 },
    })

    yPosition = (doc as any).lastAutoTable.finalY + 15
  } else {
    // Enhanced no transactions message
    doc.setFillColor(colors.lightGray[0], colors.lightGray[1], colors.lightGray[2])
    doc.rect(20, yPosition, 170, 25, "F")
    doc.setTextColor(colors.gray[0], colors.gray[1], colors.gray[2])
    doc.setFontSize(14)
    doc.setFont("helvetica", "italic")
    doc.text("No transactions recorded yet", 25, yPosition + 15)
    yPosition += 35
  }

  // Modern footer with gradient
   const pageHeight = doc.internal.pageSize.height
  // doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2])
  // doc.rect(0, pageHeight - 30, 210, 30, "F")

  // doc.setFillColor(colors.secondary[0], colors.secondary[1], colors.secondary[2])
  // doc.rect(0, pageHeight - 15, 210, 15, "F")


  doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2])
doc.rect(0, pageHeight - 30, 210, 30, "F")

  // Footer content
  doc.setTextColor(colors.white[0], colors.white[1], colors.white[2])
  doc.setFontSize(11)
  doc.setFont("helvetica", "bold")
  doc.text("JZA Tech Driver Portal", 20, pageHeight - 20)

  doc.setFontSize(9)
  doc.setFont("helvetica", "normal")
  doc.text("Driver Name: Boaz Mlonganile", 20, pageHeight - 12)
  doc.text(`Report generated on ${new Date().toLocaleDateString()}`, 20, pageHeight - 5)

  // Page number with modern styling
  doc.setFontSize(10)
  doc.text("Page 1", 180, pageHeight - 10)

  return doc.output("blob")
}
