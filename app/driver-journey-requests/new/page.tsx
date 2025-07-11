// "use client"

// import { useEffect, useState } from "react"
// import { useRouter } from "next/navigation"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { useToast } from "@/hooks/use-toast"
// import { journeyRequestAPI } from "@/lib/journeyRequestAPI"
// import type { Category } from "@/lib/types"
// import { ArrowLeft, Route, MapPin, DollarSign, CalendarDays, Plus, Loader2 } from 'lucide-react'

// interface DriverJourneyRequestFormProps {
//   categories?: Category[]
// }

// interface JourneyRequestForm {
//   category: string
//   journey_name: string
//   trip_from: string
//   trip_to: string
//   total_trip_amount: string
//   start_date: string
//   end_date: string
// }

// export default function DriverJourneyRequestForm({ categories = [] }: DriverJourneyRequestFormProps) {
//   const [submitting, setSubmitting] = useState(false)
//     const today = new Date();
// const localDate = today.getFullYear() + '-' +
//   String(today.getMonth() + 1).padStart(2, '0') + '-' +
//   String(today.getDate()).padStart(2, '0');



//   const [formData, setFormData] = useState<JourneyRequestForm>({
//     category: "",
//     journey_name: "",
//     trip_from: "",
//     trip_to: "",
//     total_trip_amount: "",
//     start_date: localDate,
//     end_date: "",
//   })




//   const { toast } = useToast()
//   const router = useRouter()

//   const handleInputChange = (field: keyof JourneyRequestForm, value: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }))
//   }

//   const resetForm = () => {
//     setFormData({
//       category: "",
//       journey_name: "",
//       trip_from: "",
//       trip_to: "",
//       total_trip_amount: "",
//       start_date: "",
//       end_date: "",
//     })
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     if (
//       !formData.journey_name ||
//       !formData.trip_from ||
//       !formData.trip_to ||
//       !formData.total_trip_amount ||
//       !formData.start_date
//     ) {
//       toast({
//         title: "Validation Error",
//         description: "Please fill in all required fields",
//         variant: "destructive",
//       })
//       return
//     }

//     try {
//       setSubmitting(true)

//       const submitData = {
//         journey_name: formData.journey_name,
//         trip_from: formData.trip_from,
//         trip_to: formData.trip_to,
//         total_trip_amount: formData.total_trip_amount,
//         start_date: formData.start_date,
//         end_date: formData.end_date || null,
//         category: formData.category ? Number.parseInt(formData.category) : null,
//       }

//       await journeyRequestAPI.create(submitData)

//       toast({
//         title: "Success",
//         description: "Journey request submitted successfully",
//       })

//       // Navigate back to the main page
//       router.push('/driver-journey-requests')
//     } catch (error) {
//       console.error("Error creating journey request:", error)
//       toast({
//         title: "Error",
//         description: "Failed to submit journey request",
//         variant: "destructive",
//       })
//     } finally {
//       setSubmitting(false)
//     }
//   }

//   const formatCurrency = (amount: string) => {
//     return new Intl.NumberFormat("en-TZ", {
//       style: "currency",
//       currency: "TZS",
//       minimumFractionDigits: 0,
//     }).format(Number.parseFloat(amount))
//   }




//   const [displayTripAmount, setDisplayTripAmount] = useState("");

// // Keep displayTripAmount in sync with formData
// useEffect(() => {
//   if (formData.total_trip_amount !== undefined && formData.total_trip_amount !== null) {
//     const formatted = formatNumber(formData.total_trip_amount.toString());
//     setDisplayTripAmount(formatted);
//   }
// }, [formData.total_trip_amount]);

// // Function to format numbers with commas and optional decimals
// const formatNumber = (value: string) => {
//   if (!value) return "";
//   const [intPart, decimalPart] = value.replace(/,/g, "").split(".");
//   const formattedInt = new Intl.NumberFormat().format(Number(intPart));
//   return decimalPart !== undefined ? `${formattedInt}.${decimalPart}` : formattedInt;
// };



//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Mobile-optimized Header */}
//       <div className="bg-white shadow-sm border-b sticky top-0 z-10">
//         <div className="px-4 py-4">
//           <div className="flex items-center">
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={() => router.back()}
//               className="mr-3 p-2"
//             >
//               <ArrowLeft className="h-4 w-4" />
//             </Button>
//             <div>
//               <h1 className="text-xl font-bold text-gray-900">New Journey Request</h1>
//               <p className="text-sm text-gray-600">Submit your travel request</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="px-4 py-6">
//         <Card className="max-w-2xl mx-auto">
//           <CardHeader className="pb-4">
//             <CardTitle className="flex items-center text-lg">
//               <Route className="h-5 w-5 mr-2 text-blue-600" />
//               Sajili maombi ya safari
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Journey Name */}
//               <div className="space-y-2">
//                 <Label htmlFor="journey_name" className="text-sm font-medium flex items-center">
//                   <Route className="h-4 w-4 mr-2 text-gray-500" />
//                   Journey Name <span className="text-red-500 ml-1">*</span>
//                 </Label>
//                 <Input
//                   id="journey_name"
//                   placeholder="e.g., Business trip to Mwanza"
//                   value={formData.journey_name}
//                   onChange={(e) => handleInputChange("journey_name", e.target.value)}
//                   maxLength={200}
//                   required
//                   className="h-12"
//                 />
//               </div>

//               {/* Trip From and To */}
//               <div className="space-y-4">
//                 <Label className="text-sm font-medium flex items-center">
//                   <MapPin className="h-4 w-4 mr-2 text-gray-500" />
//                   Route Details
//                 </Label>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="trip_from" className="text-sm text-gray-600">
//                       From <span className="text-red-500">*</span>
//                     </Label>
//                     <Input
//                       id="trip_from"
//                       placeholder="Dar es Salaam"
//                       value={formData.trip_from}
//                       onChange={(e) => handleInputChange("trip_from", e.target.value)}
//                       maxLength={100}
//                       required
//                       className="h-12"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="trip_to" className="text-sm text-gray-600">
//                       To <span className="text-red-500">*</span>
//                     </Label>
//                     <Input
//                       id="trip_to"
//                       placeholder="Mwanza"
//                       value={formData.trip_to}
//                       onChange={(e) => handleInputChange("trip_to", e.target.value)}
//                       maxLength={100}
//                       required
//                       className="h-12"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Amount */}
//               <div className="space-y-2">
//                 <Label htmlFor="total_trip_amount" className="text-sm font-medium flex items-center">
//                   <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
//                   Total Trip Amount (TZS) <span className="text-red-500 ml-1">*</span>
//                 </Label>
//                 {/* <Input
//                   id="total_trip_amount"
//                   type="number"
//                   step="0.01"
//                   min="0.01"
//                   placeholder="150000"
//                   value={formData.total_trip_amount}
//                   onChange={(e) => handleInputChange("total_trip_amount", e.target.value)}
//                   required
//                   className="h-12"
//                 /> */}


//                   <Input
//               type="text"
//               step="0.01"
//               min="0.01"
//               value={displayTripAmount}
//               onChange={(e) => {
//                 let rawValue = e.target.value.replace(/[^0-9.]/g, "");

//                 // Allow only one decimal point
//                 const parts = rawValue.split(".");
//                 if (parts.length > 2) {
//                   rawValue = parts[0] + "." + parts.slice(1).join("");
//                 }

//                 // Update displayed value with commas
//                 setDisplayTripAmount(formatNumber(rawValue));

//                 // Update actual form state with unformatted value
//                 handleInputChange("total_trip_amount", rawValue);
//               }}
//               placeholder="4,500,000.00"
//             />


//                 {formData.total_trip_amount && (
//                   <p className="text-sm text-gray-600">
//                     Amount: {formatCurrency(formData.total_trip_amount)}
//                   </p>
//                 )}
//               </div>

//               {/* Dates */}
//               <div className="space-y-4">
//                 <Label className="text-sm font-medium flex items-center">
//                   <CalendarDays className="h-4 w-4 mr-2 text-gray-500" />
//                   Travel Dates
//                 </Label>
//                 {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"> */}
//                 <div className="space-y-2">
//                   <div className="space-y-2">
//                     <Label htmlFor="start_date" className="text-sm text-gray-600">
//                       Start Date <span className="text-red-500">*</span>
//                     </Label>
//                     <Input
//                       id="start_date"
//                       type="date"
//                       value={formData.start_date}
//                       onChange={(e) => handleInputChange("start_date", e.target.value)}
//                       required
//                       className="h-12"
//                     />
//                   </div>
//                   {/* <div className="space-y-2">
//                     <Label htmlFor="end_date" className="text-sm text-gray-600">
//                       End Date (Optional)
//                     </Label>
//                     <Input
//                       id="end_date"
//                       type="date"
//                       value={formData.end_date}
//                       onChange={(e) => handleInputChange("end_date", e.target.value)}
//                       className="h-12"
//                     />
//                   </div> */}
//                 </div>
//               </div>

//               {/* Category - Commented out as per original code */}
//               {/* <div className="space-y-2">
//                 <Label htmlFor="category" className="text-sm font-medium">
//                   Category
//                 </Label>
//                 <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
//                   <SelectTrigger className="h-12">
//                     <SelectValue placeholder="Select category (optional)" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="none">No Category</SelectItem>
//                     {categories.map((category) => (
//                       <SelectItem key={category.id} value={category.id.toString()}>
//                         {category.name}
//                         {category.price_value && (
//                           <span className="text-gray-500 ml-2">
//                             ({formatCurrency(category.price_value)})
//                           </span>
//                         )}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div> */}

//               {/* Form Actions */}
//               <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={() => router.back()}
//                   disabled={submitting}
//                   className="flex-1 h-12"
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   type="submit"
//                   disabled={submitting}
//                   className="flex-1 h-12 bg-blue-600 hover:bg-blue-700"
//                 >
//                   {submitting ? (
//                     <>
//                       <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                       Submitting...
//                     </>
//                   ) : (
//                     <>
//                       <Plus className="h-4 w-4 mr-2" />
//                       Submit Request
//                     </>
//                   )}
//                 </Button>
//               </div>
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }



"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { journeyRequestAPI } from "@/lib/journeyRequestAPI"
import type { Category } from "@/lib/types"
import { ArrowLeft, Route, MapPin, DollarSign, CalendarDays, Plus, Loader2 } from "lucide-react"

interface JourneyRequestForm {
  category: string
  journey_name: string
  trip_from: string
  trip_to: string
  total_trip_amount: string
  start_date: string
  end_date: string
}

export default function DriverJourneyRequestForm() {
  const [categories, setCategories] = useState<Category[]>([])
  const [submitting, setSubmitting] = useState(false)

  const today = new Date()
  const localDate =
    today.getFullYear() +
    "-" +
    String(today.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(today.getDate()).padStart(2, "0")

  const [formData, setFormData] = useState<JourneyRequestForm>({
    category: "",
    journey_name: "",
    trip_from: "",
    trip_to: "",
    total_trip_amount: "",
    start_date: localDate,
    end_date: "",
  })

  const { toast } = useToast()
  const router = useRouter()

  // Load categories if needed
  useEffect(() => {
    // If you need to load categories, do it here
    // const loadCategories = async () => {
    //   try {
    //     const data = await categoryAPI.getAll()
    //     setCategories(data)
    //   } catch (error) {
    //     console.error('Failed to load categories:', error)
    //   }
    // }
    // loadCategories()
  }, [])

  const handleInputChange = (field: keyof JourneyRequestForm, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const resetForm = () => {
    setFormData({
      category: "",
      journey_name: "",
      trip_from: "",
      trip_to: "",
      total_trip_amount: "",
      start_date: "",
      end_date: "",
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !formData.journey_name ||
      !formData.trip_from ||
      !formData.trip_to ||
      !formData.total_trip_amount ||
      !formData.start_date
    ) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    try {
      setSubmitting(true)
      const submitData = {
        journey_name: formData.journey_name,
        trip_from: formData.trip_from,
        trip_to: formData.trip_to,
        total_trip_amount: formData.total_trip_amount,
        start_date: formData.start_date,
        end_date: formData.end_date || null,
        category: formData.category ? Number.parseInt(formData.category) : null,
      }

      await journeyRequestAPI.create(submitData)

      toast({
        title: "Success",
        description: "Journey request submitted successfully",
      })

      // Navigate back to the main page
      router.push("/driver-journey-requests")
    } catch (error) {
      console.error("Error creating journey request:", error)
      toast({
        title: "Error",
        description: "Failed to submit journey request",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat("en-TZ", {
      style: "currency",
      currency: "TZS",
      minimumFractionDigits: 0,
    }).format(Number.parseFloat(amount))
  }

  const [displayTripAmount, setDisplayTripAmount] = useState("")

  // Keep displayTripAmount in sync with formData
  useEffect(() => {
    if (formData.total_trip_amount !== undefined && formData.total_trip_amount !== null) {
      const formatted = formatNumber(formData.total_trip_amount.toString())
      setDisplayTripAmount(formatted)
    }
  }, [formData.total_trip_amount])

  // Function to format numbers with commas and optional decimals
  const formatNumber = (value: string) => {
    if (!value) return ""
    const [intPart, decimalPart] = value.replace(/,/g, "").split(".")
    const formattedInt = new Intl.NumberFormat().format(Number(intPart))
    return decimalPart !== undefined ? `${formattedInt}.${decimalPart}` : formattedInt
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile-optimized Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="px-4 py-4">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" onClick={() => router.back()} className="mr-3 p-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">New Journey Request</h1>
              <p className="text-sm text-gray-600">Submit your travel request</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-lg">
              <Route className="h-5 w-5 mr-2 text-blue-600" />
              Sajili maombi ya safari
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Journey Name */}
              <div className="space-y-2">
                <Label htmlFor="journey_name" className="text-sm font-medium flex items-center">
                  <Route className="h-4 w-4 mr-2 text-gray-500" />
                  Journey Name <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="journey_name"
                  placeholder="e.g., Business trip to Mwanza"
                  value={formData.journey_name}
                  onChange={(e) => handleInputChange("journey_name", e.target.value)}
                  maxLength={200}
                  required
                  className="h-12"
                />
              </div>

              {/* Trip From and To */}
              <div className="space-y-4">
                <Label className="text-sm font-medium flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                  Route Details
                </Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="trip_from" className="text-sm text-gray-600">
                      From <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="trip_from"
                      placeholder="Dar es Salaam"
                      value={formData.trip_from}
                      onChange={(e) => handleInputChange("trip_from", e.target.value)}
                      maxLength={100}
                      required
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="trip_to" className="text-sm text-gray-600">
                      To <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="trip_to"
                      placeholder="Mwanza"
                      value={formData.trip_to}
                      onChange={(e) => handleInputChange("trip_to", e.target.value)}
                      maxLength={100}
                      required
                      className="h-12"
                    />
                  </div>
                </div>
              </div>

              {/* Amount */}
              <div className="space-y-2">
                <Label htmlFor="total_trip_amount" className="text-sm font-medium flex items-center">
                  <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
                  Total Trip Amount (TZS) <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  type="text"
                  step="0.01"
                  min="0.01"
                  value={displayTripAmount}
                  onChange={(e) => {
                    let rawValue = e.target.value.replace(/[^0-9.]/g, "")
                    // Allow only one decimal point
                    const parts = rawValue.split(".")
                    if (parts.length > 2) {
                      rawValue = parts[0] + "." + parts.slice(1).join("")
                    }
                    // Update displayed value with commas
                    setDisplayTripAmount(formatNumber(rawValue))
                    // Update actual form state with unformatted value
                    handleInputChange("total_trip_amount", rawValue)
                  }}
                  placeholder="4,500,000.00"
                />
                {formData.total_trip_amount && (
                  <p className="text-sm text-gray-600">Amount: {formatCurrency(formData.total_trip_amount)}</p>
                )}
              </div>

              {/* Dates */}
              <div className="space-y-4">
                <Label className="text-sm font-medium flex items-center">
                  <CalendarDays className="h-4 w-4 mr-2 text-gray-500" />
                  Travel Dates
                </Label>
                <div className="space-y-2">
                  <div className="space-y-2">
                    <Label htmlFor="start_date" className="text-sm text-gray-600">
                      Start Date <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="start_date"
                      type="date"
                      value={formData.start_date}
                      onChange={(e) => handleInputChange("start_date", e.target.value)}
                      required
                      className="h-12"
                    />
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={submitting}
                  className="flex-1 h-12"
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={submitting} className="flex-1 h-12 bg-blue-600 hover:bg-blue-700">
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Submit Request
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
