// "use client"

// import type React from "react"

// import { useState } from "react"
// import { motion } from "framer-motion"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { ArrowLeft, MapPin, Calendar, Route } from "lucide-react"

// interface JourneyFormProps {
//   onSubmit: (data: any) => void
//   onCancel: () => void
// }

// export default function JourneyForm({ onSubmit, onCancel }: JourneyFormProps) {
//   const [formData, setFormData] = useState({
//     name: "",
//     from: "",
//     to: "",
//     startDate: new Date().toISOString().split("T")[0],
//     endDate: "",
//   })

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     onSubmit(formData)
//   }

//   const handleChange = (field: string, value: string) => {
//     setFormData((prev) => ({ ...prev, [field]: value }))
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
//                 <Route className="w-5 h-5 mr-2 text-blue-600" />
//                 Sajili Safari Mpya
//               </CardTitle>
//               <p className="text-sm text-gray-600 mt-1">Fill in journey details</p>
//             </div>
//           </div>
//         </CardHeader>

//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="space-y-2">
//               <Label htmlFor="name">Journey Name</Label>
//               <Input
//                 id="name"
//                 placeholder="e.g., Dar es Salaam - Mwanza"
//                 value={formData.name}
//                 onChange={(e) => handleChange("name", e.target.value)}
//                 className="h-12"
//                 required
//               />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="from">From Location</Label>
//                 <div className="relative">
//                   <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <Input
//                     id="from"
//                     placeholder="Starting location"
//                     value={formData.from}
//                     onChange={(e) => handleChange("from", e.target.value)}
//                     className="pl-10 h-12"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="to">To Location</Label>
//                 <div className="relative">
//                   <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <Input
//                     id="to"
//                     placeholder="Destination"
//                     value={formData.to}
//                     onChange={(e) => handleChange("to", e.target.value)}
//                     className="pl-10 h-12"
//                     required
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="startDate">Start Date</Label>
//                 <div className="relative">
//                   <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <Input
//                     id="startDate"
//                     type="date"
//                     value={formData.startDate}
//                     onChange={(e) => handleChange("startDate", e.target.value)}
//                     className="pl-10 h-12"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="endDate">Expected End Date</Label>
//                 <div className="relative">
//                   <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <Input
//                     id="endDate"
//                     type="date"
//                     value={formData.endDate}
//                     onChange={(e) => handleChange("endDate", e.target.value)}
//                     className="pl-10 h-12"
//                     min={formData.startDate}
//                     required
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="flex space-x-4 pt-4">
//               <Button type="button" variant="outline" onClick={onCancel} className="flex-1 h-12">
//                 Cancel
//               </Button>
//               <Button
//                 type="submit"
//                 className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
//               >
//                 Create Journey
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
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, MapPin, Calendar, Route, AlertCircle, DollarSign } from "lucide-react"

interface JourneyFormProps {
  onSubmit: (data: any) => void
  onCancel: () => void
  isLoading?: boolean
  error?: string
}

export default function JourneyForm({ onSubmit, onCancel, isLoading = false, error }: JourneyFormProps) {
  const [formData, setFormData] = useState({
    journey_name: "",
    trip_from: "",
    trip_to: "",
    total_trip_amount: "",
    start_date: new Date().toISOString().split("T")[0],
    // end_date: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" onClick={onCancel} disabled={isLoading}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <CardTitle className="flex items-center">
                <Route className="w-5 h-5 mr-2 text-blue-600" />
                Sajili Safari Mpya
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">Fill in journey details</p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="journey_name">Journey Name</Label>
              <Input
                id="journey_name"
                placeholder="e.g., Trip to Dodoma"
                value={formData.journey_name}
                onChange={(e) => handleChange("journey_name", e.target.value)}
                className="h-12"
                required
                disabled={isLoading}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="trip_from">From Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="trip_from"
                    placeholder="Starting location"
                    value={formData.trip_from}
                    onChange={(e) => handleChange("trip_from", e.target.value)}
                    className="pl-10 h-12"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="trip_to">To Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="trip_to"
                    placeholder="Destination"
                    value={formData.trip_to}
                    onChange={(e) => handleChange("trip_to", e.target.value)}
                    className="pl-10 h-12"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="total_trip_amount">Total Trip Amount (TSh)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="total_trip_amount"
                  type="number"
                  step="0.01"
                  placeholder="e.g., 2500000.00"
                  value={formData.total_trip_amount}
                  onChange={(e) => handleChange("total_trip_amount", e.target.value)}
                  className="pl-10 h-12"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start_date">Start Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="start_date"
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => handleChange("start_date", e.target.value)}
                    className="pl-10 h-12"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* <div className="space-y-2">
                <Label htmlFor="end_date">Expected End Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="end_date"
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => handleChange("end_date", e.target.value)}
                    className="pl-10 h-12"
                    min={formData.start_date}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div> */}
            </div>

            <div className="flex space-x-4 pt-4">
              <Button type="button" variant="outline" onClick={onCancel} className="flex-1 h-12" disabled={isLoading}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Creating...</span>
                  </div>
                ) : (
                  "Create Journey"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
