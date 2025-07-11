// "use client"

// import type React from "react"

// import { useState } from "react"
// import { motion } from "framer-motion"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { ArrowLeft, DollarSign, FileText, Upload, Calendar, X, ImageIcon } from "lucide-react"

// interface ExpenseFormProps {
//   onSubmit: (data: any) => void
//   onCancel: () => void
// }

// export default function ExpenseForm({ onSubmit, onCancel }: ExpenseFormProps) {
//   const [formData, setFormData] = useState({
//     description: "",
//     amount: "",
//     type: "expense",
//     transactionDate: new Date().toISOString().split("T")[0],
//     reference: "",
//   })
//   const [files, setFiles] = useState<File[]>([])
//   const [filePreviews, setFilePreviews] = useState<Array<{ file: File; preview?: string; type: string }>>([])

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     onSubmit({ ...formData, files })
//   }

//   const handleChange = (field: string, value: string) => {
//     setFormData((prev) => ({ ...prev, [field]: value }))
//   }

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       const selectedFiles = Array.from(e.target.files)
//       setFiles(selectedFiles)

//       // Create previews for selected files
//       const previews = selectedFiles.map((file) => {
//         const fileData = {
//           file,
//           type: file.type.startsWith("image/") ? "image" : "file",
//         }

//         if (file.type.startsWith("image/")) {
//           const reader = new FileReader()
//           reader.onload = (e) => {
//             setFilePreviews((prev) =>
//               prev.map((p) => (p.file === file ? { ...p, preview: e.target?.result as string } : p)),
//             )
//           }
//           reader.readAsDataURL(file)
//         }

//         return fileData
//       })

//       setFilePreviews(previews)
//     }
//   }

//   const removeFile = (indexToRemove: number) => {
//     const newFiles = files.filter((_, index) => index !== indexToRemove)
//     const newPreviews = filePreviews.filter((_, index) => index !== indexToRemove)
//     setFiles(newFiles)
//     setFilePreviews(newPreviews)

//     // Reset the input value
//     const fileInput = document.getElementById("files") as HTMLInputElement
//     if (fileInput) {
//       fileInput.value = ""
//     }
//   }

//   return (
//     <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//       <Card className="max-w-2xl mx-auto">
//         <CardHeader>
//           <div className="flex items-center space-x-3">
//             <Button variant="ghost" size="icon" onClick={onCancel}>
//               <ArrowLeft className="w-5 h-5" />
//             </Button>
//             <div>
//               <CardTitle className="flex items-center">
//                 <DollarSign className="w-5 h-5 mr-2 text-green-600" />
//                 Add Income/Expense
//               </CardTitle>
//               <p className="text-sm text-gray-600 mt-1">Track your financial transactions</p>
//             </div>
//           </div>
//         </CardHeader>

//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="space-y-2">
//               <Label htmlFor="description">Description</Label>
//               <div className="relative">
//                 <FileText className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
//                 <Textarea
//                   id="description"
//                   placeholder="Describe the transaction..."
//                   value={formData.description}
//                   onChange={(e) => handleChange("description", e.target.value)}
//                   className="pl-10 min-h-[80px]"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="amount">Amount (TSh)</Label>
//                 <div className="relative">
//                   <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <Input
//                     id="amount"
//                     type="number"
//                     placeholder="0.00"
//                     value={formData.amount}
//                     onChange={(e) => handleChange("amount", e.target.value)}
//                     className="pl-10 h-12"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="type">Type</Label>
//                 <Select value={formData.type} onValueChange={(value) => handleChange("type", value)}>
//                   <SelectTrigger className="h-12">
//                     <SelectValue placeholder="Select type" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="expense">Expense</SelectItem>
//                     <SelectItem value="income">Income</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="transactionDate">Transaction Date</Label>
//               <div className="relative">
//                 <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <Input
//                   id="transactionDate"
//                   type="date"
//                   value={formData.transactionDate}
//                   onChange={(e) => handleChange("transactionDate", e.target.value)}
//                   className="pl-10 h-12"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="reference">Reference/Notes</Label>
//               <Input
//                 id="reference"
//                 placeholder="Receipt number, reference, etc."
//                 value={formData.reference}
//                 onChange={(e) => handleChange("reference", e.target.value)}
//                 className="h-12"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="files">Upload Files (Optional)</Label>
//               <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
//                 <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
//                 <p className="text-sm text-gray-600 mb-2">Upload receipts, invoices, or other documents</p>
//                 <Input
//                   id="files"
//                   type="file"
//                   multiple
//                   onChange={handleFileChange}
//                   className="hidden"
//                   accept="image/*,.pdf,.doc,.docx"
//                 />
//                 <Button type="button" variant="outline" onClick={() => document.getElementById("files")?.click()}>
//                   Choose Files
//                 </Button>
//                 {files.length > 0 && <div className="mt-2 text-sm text-gray-600">{files.length} file(s) selected</div>}
//               </div>

//               {/* File Previews */}
//               {filePreviews.length > 0 && (
//                 <div className="mt-4">
//                   <p className="text-sm font-medium text-gray-700 mb-3">Selected Files:</p>
//                   <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//                     {filePreviews.map((fileData, index) => (
//                       <motion.div
//                         key={index}
//                         initial={{ opacity: 0, scale: 0.8 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         transition={{ duration: 0.3 }}
//                         className="relative group"
//                       >
//                         <div className="bg-gray-50 rounded-lg p-3 border-2 border-gray-200 hover:border-blue-300 transition-colors">
//                           {fileData.type === "image" ? (
//                             <div className="aspect-square relative overflow-hidden rounded-md bg-gray-100">
//                               {fileData.preview ? (
//                                 <img
//                                   src={fileData.preview || "/placeholder.svg"}
//                                   alt={fileData.file.name}
//                                   className="w-full h-full object-cover"
//                                 />
//                               ) : (
//                                 <div className="w-full h-full flex items-center justify-center">
//                                   <ImageIcon className="w-8 h-8 text-gray-400" />
//                                 </div>
//                               )}
//                             </div>
//                           ) : (
//                             <div className="aspect-square flex items-center justify-center bg-blue-50 rounded-md">
//                               <FileText className="w-8 h-8 text-blue-500" />
//                             </div>
//                           )}

//                           <p className="text-xs text-gray-600 mt-2 truncate" title={fileData.file.name}>
//                             {fileData.file.name}
//                           </p>
//                           <p className="text-xs text-gray-400">{(fileData.file.size / 1024).toFixed(1)} KB</p>

//                           {/* Remove button */}
//                           <button
//                             type="button"
//                             onClick={() => removeFile(index)}
//                             className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
//                           >
//                             <X className="w-3 h-3" />
//                           </button>
//                         </div>
//                       </motion.div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>

//             <div className="flex space-x-4 pt-4">
//               <Button type="button" variant="outline" onClick={onCancel} className="flex-1 h-12">
//                 Cancel
//               </Button>
//               <Button
//                 type="submit"
//                 className={`flex-1 h-12 ${
//                   formData.type === "income"
//                     ? "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
//                     : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
//                 }`}
//               >
//                 Add {formData.type === "income" ? "Income" : "Expense"}
//               </Button>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </motion.div>
//   )
// }



"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, DollarSign, FileText, Upload, Calendar, X, ImageIcon, AlertCircle } from "lucide-react"

interface ExpenseFormProps {
  onSubmit: (data: any) => void
  onCancel: () => void
  isLoading?: boolean
  error?: string
}

export default function ExpenseForm({ onSubmit, onCancel, isLoading = false, error }: ExpenseFormProps) {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    transaction_type: "expense" as "income" | "expense",
    transaction_date: new Date().toISOString().split("T")[0],
  })
  const [files, setFiles] = useState<File[]>([])
  const [filePreviews, setFilePreviews] = useState<Array<{ file: File; preview?: string; type: string }>>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ ...formData, files })
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)

      // Append new files to existing ones instead of replacing
      const updatedFiles = [...files, ...selectedFiles]
      setFiles(updatedFiles)

      // Create previews for the new selected files
      const newPreviews = selectedFiles.map((file) => {
        const fileData = {
          file,
          type: file.type.startsWith("image/") ? "image" : "file",
        }

        if (file.type.startsWith("image/")) {
          const reader = new FileReader()
          reader.onload = (e) => {
            setFilePreviews((prev) =>
              prev.map((p) => (p.file === file ? { ...p, preview: e.target?.result as string } : p)),
            )
          }
          reader.readAsDataURL(file)
        }

        return fileData
      })

      // Append new previews to existing ones
      setFilePreviews((prev) => [...prev, ...newPreviews])

      // Reset the input value so the same file can be selected again if needed
      e.target.value = ""
    }
  }

  const removeFile = (indexToRemove: number) => {
    const newFiles = files.filter((_, index) => index !== indexToRemove)
    const newPreviews = filePreviews.filter((_, index) => index !== indexToRemove)
    setFiles(newFiles)
    setFilePreviews(newPreviews)

    // No need to reset the input value here since we're not replacing all files
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="max-w-2xl mx-auto">
        {/* <CardHeader>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" onClick={onCancel} disabled={isLoading}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <CardTitle className="flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                Add Income/Expense
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">Track your financial transactions</p>
            </div>
          </div>
        </CardHeader> */}

        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <Textarea
                  id="description"
                  placeholder="Describe the transaction..."
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  className="pl-10 min-h-[80px]"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (TSh)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={(e) => handleChange("amount", e.target.value)}
                    className="pl-10 h-12"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* <div className="space-y-2">
                <Label htmlFor="transaction_type">Type</Label>
                <Select
                  value={formData.transaction_type}
                  onValueChange={(value: "income" | "expense") => handleChange("transaction_type", value)}
                  disabled={isLoading}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="expense">Expense</SelectItem>
                    <SelectItem value="income">Income</SelectItem>
                  </SelectContent>
                </Select>
              </div> */}
            </div>

            <div className="space-y-2">
              <Label htmlFor="transaction_date">Transaction Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="transaction_date"
                  type="date"
                  value={formData.transaction_date}
                  onChange={(e) => handleChange("transaction_date", e.target.value)}
                  className="pl-10 h-12"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="files">Upload Files (Optional)</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">Upload receipts, invoices, or other documents</p>
                <Input
                  id="files"
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*,.pdf,.doc,.docx"
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("files")?.click()}
                  disabled={isLoading}
                >
                  Choose Files
                </Button>
                {files.length > 0 && <div className="mt-2 text-sm text-gray-600">{files.length} file(s) selected</div>}
              </div>

              {/* File Previews */}
              {filePreviews.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-3">Selected Files:</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {filePreviews.map((fileData, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="relative group"
                      >
                        <div className="bg-gray-50 rounded-lg p-3 border-2 border-gray-200 hover:border-blue-300 transition-colors">
                          {fileData.type === "image" ? (
                            <div className="aspect-square relative overflow-hidden rounded-md bg-gray-100">
                              {fileData.preview ? (
                                <img
                                  src={fileData.preview || "/placeholder.svg"}
                                  alt={fileData.file.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <ImageIcon className="w-8 h-8 text-gray-400" />
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="aspect-square flex items-center justify-center bg-blue-50 rounded-md">
                              <FileText className="w-8 h-8 text-blue-500" />
                            </div>
                          )}

                          <p className="text-xs text-gray-600 mt-2 truncate" title={fileData.file.name}>
                            {fileData.file.name}
                          </p>
                          <p className="text-xs text-gray-400">{(fileData.file.size / 1024).toFixed(1)} KB</p>

                          {/* Remove button */}
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                            disabled={isLoading}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex space-x-4 pt-4">
              <Button type="button" variant="outline" onClick={onCancel} className="flex-1 h-12" disabled={isLoading}>
                Cancel
              </Button>
              <Button
                type="submit"
                className={`flex-1 h-12 ${
                  formData.transaction_type === "income"
                    ? "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                    : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                } disabled:opacity-50`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Adding...</span>
                  </div>
                ) : (
                  `Add ${formData.transaction_type === "income" ? "Income" : "Expense"}`
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
