// "use client"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { useToast } from "@/hooks/use-toast"
// import { journeyRequestAPI } from "@/lib/journeyRequestAPI"
// import type { JourneyRequest, Category, PaginatedResponse } from "@/lib/types"
// import { Calendar, MapPin, DollarSign, Clock, Plus, Loader2, ChevronDown, Car, Route, CalendarDays, Banknote, User, CheckCircle2, XCircle, Edit } from 'lucide-react'
// import { format } from "date-fns"

// interface DriverJourneyRequestsProps {
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

// export default function DriverJourneyRequests({ categories = [] }: DriverJourneyRequestsProps) {
//   const [journeyRequests, setJourneyRequests] = useState<JourneyRequest[]>([])
//   const [loading, setLoading] = useState(true)
//   const [loadingMore, setLoadingMore] = useState(false)
//   const [submitting, setSubmitting] = useState(false)
//   const [showForm, setShowForm] = useState(false)
//   const [pagination, setPagination] = useState<{
//     count: number
//     next: string | null
//     previous: string | null
//     currentPage: number
//   }>({
//     count: 0,
//     next: null,
//     previous: null,
//     currentPage: 1,
//   })

//   const [formData, setFormData] = useState<JourneyRequestForm>({
//     category: "",
//     journey_name: "",
//     trip_from: "",
//     trip_to: "",
//     total_trip_amount: "",
//     start_date: "",
//     end_date: "",
//   })

//   const { toast } = useToast()

//   const fetchJourneyRequests = async (page = 1, append = false) => {
//     try {
//       if (!append) {
//         setLoading(true)
//       } else {
//         setLoadingMore(true)
//       }

//       // Always pass by_user: true for driver page
//       const response: PaginatedResponse<JourneyRequest> = await journeyRequestAPI.getAll({
//         by_user: true,
//         page,
//       })

//       if (append) {
//         setJourneyRequests((prev) => [...prev, ...response.results])
//       } else {
//         setJourneyRequests(response.results)
//       }

//       setPagination({
//         count: response.count,
//         next: response.next,
//         previous: response.previous,
//         currentPage: page,
//       })
//     } catch (error) {
//       console.error("Error fetching journey requests:", error)
//       toast({
//         title: "Error",
//         description: "Failed to fetch your journey requests",
//         variant: "destructive",
//       })
//     } finally {
//       setLoading(false)
//       setLoadingMore(false)
//     }
//   }

//   useEffect(() => {
//     fetchJourneyRequests(1, false)
//   }, [])

//   const handleLoadMore = () => {
//     if (pagination.next && !loadingMore) {
//       fetchJourneyRequests(pagination.currentPage + 1, true)
//     }
//   }

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

//     if (!formData.journey_name || !formData.trip_from || !formData.trip_to || !formData.total_trip_amount || !formData.start_date) {
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
//         category: formData.category ? parseInt(formData.category) : null,
//       }

//       await journeyRequestAPI.create(submitData)

//       toast({
//         title: "Success",
//         description: "Journey request submitted successfully",
//       })

//       // Reset form and close dialog
//       resetForm()
//       setShowForm(false)

//       // Refresh the list
//       setJourneyRequests([])
//       setPagination({ count: 0, next: null, previous: null, currentPage: 1 })
//       await fetchJourneyRequests(1, false)
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

//   const totalAmount = journeyRequests.reduce((sum, req) => sum + Number.parseFloat(req.total_trip_amount), 0)
//   const pendingCount = journeyRequests.filter((req) => !req.is_accepted).length
//   const acceptedCount = journeyRequests.filter((req) => req.is_accepted).length

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <Loader2 className="h-8 w-8 animate-spin" />
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 pb-20">
//       {/* Mobile-optimized Header */}
//       <div className="bg-white shadow-sm border-b sticky top-0 z-10">
//         <div className="px-4 py-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-xl font-bold text-gray-900">My Journey Requests</h1>
//               <p className="text-sm text-gray-600">Track your travel requests</p>
//             </div>
//             <Button onClick={() => setShowForm(true)} size="sm" className="bg-blue-600 hover:bg-blue-700">
//               <Plus className="h-4 w-4 mr-1" />
//               New
//             </Button>
//           </div>
//         </div>
//       </div>

//       <div className="px-4 py-4 space-y-4">
//         {/* Mobile-optimized Summary Cards */}
//         <div className="grid grid-cols-2 gap-3">
//           <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
//             <CardContent className="p-4">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-blue-100 text-xs font-medium">Total Requests</p>
//                   <p className="text-2xl font-bold">{pagination.count}</p>
//                 </div>
//                 <Car className="h-8 w-8 text-blue-200" />
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
//             <CardContent className="p-4">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-green-100 text-xs font-medium">Total Amount</p>
//                   <p className="text-lg font-bold">{formatCurrency(totalAmount.toString())}</p>
//                 </div>
//                 <Banknote className="h-8 w-8 text-green-200" />
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
//             <CardContent className="p-4">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-orange-100 text-xs font-medium">Pending</p>
//                   <p className="text-2xl font-bold">{pendingCount}</p>
//                 </div>
//                 <Clock className="h-8 w-8 text-orange-200" />
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
//             <CardContent className="p-4">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-emerald-100 text-xs font-medium">Accepted</p>
//                   <p className="text-2xl font-bold">{acceptedCount}</p>
//                 </div>
//                 <CheckCircle2 className="h-8 w-8 text-emerald-200" />
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Journey Requests List - Mobile Optimized */}
//         <div className="space-y-3">
//           {journeyRequests.length === 0 ? (
//             <Card>
//               <CardContent className="p-6">
//                 <div className="text-center py-8">
//                   <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                   <p className="text-gray-500 mb-2">No journey requests yet</p>
//                   <p className="text-sm text-gray-400">Tap the "New" button to create your first request</p>
//                 </div>
//               </CardContent>
//             </Card>
//           ) : (
//             <>
//               {journeyRequests.map((request) => (
//                 <Card key={request.id} className="hover:shadow-md transition-shadow bg-white">
//                   <CardContent className="p-4">
//                     <div className="space-y-3">
//                       {/* Header with Status */}
//                       <div className="flex items-start justify-between">
//                         <div className="flex-1">
//                           <h3 className="font-semibold text-gray-900 text-sm leading-tight">
//                             {request.journey_name}
//                           </h3>
//                           <div className="flex items-center text-gray-600 text-xs mt-1">
//                             <MapPin className="h-3 w-3 mr-1" />
//                             <span className="truncate">{request.trip_from} → {request.trip_to}</span>
//                           </div>
//                         </div>
//                         <Badge 
//                           variant={request.is_accepted ? "default" : "secondary"}
//                           className={`text-xs ${
//                             request.is_accepted 
//                               ? "bg-green-100 text-green-800 border-green-200" 
//                               : "bg-orange-100 text-orange-800 border-orange-200"
//                           }`}
//                         >
//                           {request.is_accepted ? (
//                             <><CheckCircle2 className="h-3 w-3 mr-1" />Accepted</>
//                           ) : (
//                             <><Clock className="h-3 w-3 mr-1" />Pending</>
//                           )}
//                         </Badge>
//                       </div>

//                       {/* Amount and Date - Mobile Layout */}
//                       <div className="grid grid-cols-2 gap-3 text-sm">
//                         <div className="flex items-center bg-gray-50 rounded-lg p-2">
//                           <DollarSign className="h-4 w-4 text-gray-500 mr-2" />
//                           <div>
//                             <p className="text-xs text-gray-500">Amount</p>
//                             <p className="font-semibold text-gray-900">
//                               {formatCurrency(request.total_trip_amount)}
//                             </p>
//                           </div>
//                         </div>
//                         <div className="flex items-center bg-gray-50 rounded-lg p-2">
//                           <CalendarDays className="h-4 w-4 text-gray-500 mr-2" />
//                           <div>
//                             <p className="text-xs text-gray-500">Start Date</p>
//                             <p className="font-semibold text-gray-900">
//                               {format(new Date(request.start_date), "MMM dd")}
//                             </p>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Category */}
//                       {(request.category || request.assigned_to_active_category) && (
//                         <div className="flex items-center">
//                           <Badge variant="outline" className="text-xs">
//                             {request.category?.name || request.assigned_to_active_category}
//                           </Badge>
//                           {(request.category?.price_value || request.assigned_to_active_category_value) && (
//                             <span className="ml-2 text-xs text-gray-500">
//                               Base: {formatCurrency(
//                                 request.category?.price_value || request.assigned_to_active_category_value || "0"
//                               )}
//                             </span>
//                           )}
//                         </div>
//                       )}

//                       {/* Created Date */}
//                       <div className="flex items-center text-xs text-gray-500 pt-2 border-t border-gray-100">
//                         <Clock className="h-3 w-3 mr-1" />
//                         <span>Created {format(new Date(request.created_at), "MMM dd, yyyy 'at' HH:mm")}</span>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}

//               {/* Load More Button - Mobile Optimized */}
//               {pagination.next && (
//                 <div className="flex justify-center pt-4">
//                   <Button
//                     variant="outline"
//                     onClick={handleLoadMore}
//                     disabled={loadingMore}
//                     className="w-full max-w-xs bg-white"
//                   >
//                     {loadingMore ? (
//                       <>
//                         <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                         Loading...
//                       </>
//                     ) : (
//                       <>
//                         <ChevronDown className="h-4 w-4 mr-2" />
//                         Load More ({pagination.count - journeyRequests.length} remaining)
//                       </>
//                     )}
//                   </Button>
//                 </div>
//               )}

//               {/* Pagination Info */}
//               <div className="text-center text-xs text-gray-500 pb-4">
//                 Showing {journeyRequests.length} of {pagination.count} requests
//                 {!pagination.next && journeyRequests.length > 0 && (
//                   <span className="block mt-1 text-green-600">✓ All requests loaded</span>
//                 )}
//               </div>
//             </>
//           )}
//         </div>
//       </div>

//       {/* New Journey Request Form Dialog */}
//       <Dialog open={showForm} onOpenChange={(open) => !submitting && setShowForm(open)}>
//         <DialogContent className="max-w-md mx-4 max-h-[90vh] overflow-y-auto">
//           <DialogHeader>
//             <DialogTitle className="flex items-center">
//               <Route className="h-5 w-5 mr-2" />
//               New Journey Request
//             </DialogTitle>
//           </DialogHeader>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* Journey Name */}
//             <div className="space-y-2">
//               <Label htmlFor="journey_name" className="text-sm font-medium">
//                 Journey Name <span className="text-red-500">*</span>
//               </Label>
//               <Input
//                 id="journey_name"
//                 placeholder="e.g., Business trip to Mwanza"
//                 value={formData.journey_name}
//                 onChange={(e) => handleInputChange("journey_name", e.target.value)}
//                 maxLength={200}
//                 required
//               />
//             </div>

//             {/* Trip From and To */}
//             <div className="grid grid-cols-2 gap-3">
//               <div className="space-y-2">
//                 <Label htmlFor="trip_from" className="text-sm font-medium">
//                   From <span className="text-red-500">*</span>
//                 </Label>
//                 <Input
//                   id="trip_from"
//                   placeholder="Dar es Salaam"
//                   value={formData.trip_from}
//                   onChange={(e) => handleInputChange("trip_from", e.target.value)}
//                   maxLength={100}
//                   required
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="trip_to" className="text-sm font-medium">
//                   To <span className="text-red-500">*</span>
//                 </Label>
//                 <Input
//                   id="trip_to"
//                   placeholder="Mwanza"
//                   value={formData.trip_to}
//                   onChange={(e) => handleInputChange("trip_to", e.target.value)}
//                   maxLength={100}
//                   required
//                 />
//               </div>
//             </div>

//             {/* Amount */}
//             <div className="space-y-2">
//               <Label htmlFor="total_trip_amount" className="text-sm font-medium">
//                 Total Trip Amount (TZS) <span className="text-red-500">*</span>
//               </Label>
//               <Input
//                 id="total_trip_amount"
//                 type="number"
//                 step="0.01"
//                 min="0.01"
//                 placeholder="150000"
//                 value={formData.total_trip_amount}
//                 onChange={(e) => handleInputChange("total_trip_amount", e.target.value)}
//                 required
//               />
//             </div>

//             {/* Dates */}
//             <div className="grid grid-cols-2 gap-3">
//               <div className="space-y-2">
//                 <Label htmlFor="start_date" className="text-sm font-medium">
//                   Start Date <span className="text-red-500">*</span>
//                 </Label>
//                 <Input
//                   id="start_date"
//                   type="date"
//                   value={formData.start_date}
//                   onChange={(e) => handleInputChange("start_date", e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="end_date" className="text-sm font-medium">
//                   End Date
//                 </Label>
//                 <Input
//                   id="end_date"
//                   type="date"
//                   value={formData.end_date}
//                   onChange={(e) => handleInputChange("end_date", e.target.value)}
//                 />
//               </div>
//             </div>

//             {/* Category */}
//             {/* <div className="space-y-2">
//               <Label htmlFor="category" className="text-sm font-medium">
//                 Category
//               </Label>
//               <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select category (optional)" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="none">No Category</SelectItem>
//                   {categories.map((category) => (
//                     <SelectItem key={category.id} value={category.id.toString()}>
//                       {category.name}
//                       {category.price_value && (
//                         <span className="text-gray-500 ml-2">
//                           ({formatCurrency(category.price_value)})
//                         </span>
//                       )}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div> */}

//             <DialogFooter className="flex-col sm:flex-row gap-2">
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={() => {
//                   resetForm()
//                   setShowForm(false)
//                 }}
//                 disabled={submitting}
//                 className="w-full sm:w-auto"
//               >
//                 Cancel
//               </Button>
//               <Button
//                 type="submit"
//                 disabled={submitting}
//                 className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
//               >
//                 {submitting ? (
//                   <>
//                     <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                     Submitting...
//                   </>
//                 ) : (
//                   <>
//                     <Plus className="h-4 w-4 mr-2" />
//                     Submit Request
//                   </>
//                 )}
//               </Button>
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }



"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { journeyRequestAPI } from "@/lib/journeyRequestAPI"
import type { JourneyRequest, PaginatedResponse } from "@/lib/types"
import {
    MapPin,
    DollarSign,
    Clock,
    Plus,
    Loader2,
    ChevronDown,
    Car,
    CalendarDays,
    Banknote,
    CheckCircle2,
    ArrowLeft,
} from "lucide-react"
import { format } from "date-fns"

export default function DriverJourneyRequests() {
    const [journeyRequests, setJourneyRequests] = useState<JourneyRequest[]>([])
    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const [pagination, setPagination] = useState<{
        count: number
        next: string | null
        previous: string | null
        currentPage: number
    }>({
        count: 0,
        next: null,
        previous: null,
        currentPage: 1,
    })

    const { toast } = useToast()
    const router = useRouter()

    const fetchJourneyRequests = async (page = 1, append = false) => {
        try {
            if (!append) {
                setLoading(true)
            } else {
                setLoadingMore(true)
            }

            // Always pass by_user: true for driver page
            const response: PaginatedResponse<JourneyRequest> = await journeyRequestAPI.getAll({
                by_user: true,
                page,
            })

            if (append) {
                setJourneyRequests((prev) => [...prev, ...response.results])
            } else {
                setJourneyRequests(response.results)
            }

            setPagination({
                count: response.count,
                next: response.next,
                previous: response.previous,
                currentPage: page,
            })
        } catch (error) {
            console.error("Error fetching journey requests:", error)
            toast({
                title: "Error",
                description: "Failed to fetch your journey requests",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
            setLoadingMore(false)
        }
    }

    useEffect(() => {
        fetchJourneyRequests(1, false)
    }, [])

    const handleLoadMore = () => {
        if (pagination.next && !loadingMore) {
            fetchJourneyRequests(pagination.currentPage + 1, true)
        }
    }

    const formatCurrency = (amount: string) => {
        return new Intl.NumberFormat("en-TZ", {
            style: "currency",
            currency: "TZS",
            minimumFractionDigits: 0,
        }).format(Number.parseFloat(amount))
    }

    const totalAmount = journeyRequests.reduce((sum, req) => sum + Number.parseFloat(req.total_trip_amount), 0)
    const pendingCount = journeyRequests.filter((req) => !req.is_accepted).length
    const acceptedCount = journeyRequests.filter((req) => req.is_accepted).length

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Mobile-optimized Header */}
            <div className="bg-white shadow-sm border-b sticky top-0 z-10">
                <div className="px-4 py-4">
                    <div className="flex items-center justify-between">
                        {/* <div>
              <h1 className="text-xl font-bold text-gray-900">My Journey Requests</h1>
              <p className="text-sm text-gray-600">Track your travel requests</p>
            </div> */}


                        <div className="bg-white shadow-sm border-b sticky top-0 z-10">
                            <div className="px-4 py-4">
                                <div className="flex items-center">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => router.back()}
                                        className="mr-3 p-2"
                                    >
                                        <ArrowLeft className="h-4 w-4" />
                                    </Button>
                                    <div>
                                        <h1 className="text-xl font-bold text-gray-900">My Journey Requests</h1>
                                        <p className="text-sm text-gray-600">Track your travel requests</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Button
                            onClick={() => router.push("/driver-journey-requests/new")}
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            <Plus className="h-4 w-4 mr-1" />
                            New
                        </Button>
                    </div>
                </div>
            </div>

            <div className="px-4 py-4 space-y-4">
                {/* Mobile-optimized Summary Cards */}
                <div className="grid grid-cols-2 gap-3">
                    <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-blue-100 text-xs font-medium">Total Requests</p>
                                    <p className="text-2xl font-bold">{pagination.count}</p>
                                </div>
                                <Car className="h-8 w-8 text-blue-200" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-green-100 text-xs font-medium">Total Amount</p>
                                    <p className="text-lg font-bold">{formatCurrency(totalAmount.toString())}</p>
                                </div>
                                <Banknote className="h-8 w-8 text-green-200" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-orange-100 text-xs font-medium">Pending</p>
                                    <p className="text-2xl font-bold">{pendingCount}</p>
                                </div>
                                <Clock className="h-8 w-8 text-orange-200" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-emerald-100 text-xs font-medium">Accepted</p>
                                    <p className="text-2xl font-bold">{acceptedCount}</p>
                                </div>
                                <CheckCircle2 className="h-8 w-8 text-emerald-200" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Journey Requests List - Mobile Optimized */}
                <div className="space-y-3">
                    {journeyRequests.length === 0 ? (
                        <Card>
                            <CardContent className="p-6">
                                <div className="text-center py-8">
                                    <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-500 mb-2">No journey requests yet</p>
                                    <p className="text-sm text-gray-400">Tap the "New" button to create your first request</p>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <>
                            {journeyRequests.map((request) => (
                                <Card key={request.id} className="hover:shadow-md transition-shadow bg-white">
                                    <CardContent className="p-4">
                                        <div className="space-y-3">
                                            {/* Header with Status */}
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-gray-900 text-sm leading-tight">{request.journey_name}</h3>
                                                    <div className="flex items-center text-gray-600 text-xs mt-1">
                                                        <MapPin className="h-3 w-3 mr-1" />
                                                        <span className="truncate">
                                                            {request.trip_from} → {request.trip_to}
                                                        </span>
                                                    </div>
                                                </div>
                                                <Badge
                                                    variant={request.is_accepted ? "default" : "secondary"}
                                                    className={`text-xs ${request.is_accepted
                                                            ? "bg-green-100 text-green-800 border-green-200"
                                                            : "bg-orange-100 text-orange-800 border-orange-200"
                                                        }`}
                                                >
                                                    {request.is_accepted ? (
                                                        <>
                                                            <CheckCircle2 className="h-3 w-3 mr-1" />
                                                            Accepted
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Clock className="h-3 w-3 mr-1" />
                                                            Pending
                                                        </>
                                                    )}
                                                </Badge>
                                            </div>

                                            {/* Amount and Date - Mobile Layout */}
                                            <div className="grid grid-cols-2 gap-3 text-sm">
                                                <div className="flex items-center bg-gray-50 rounded-lg p-2">
                                                    <DollarSign className="h-4 w-4 text-gray-500 mr-2" />
                                                    <div>
                                                        <p className="text-xs text-gray-500">Amount</p>
                                                        <p className="font-semibold text-gray-900">{formatCurrency(request.total_trip_amount)}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center bg-gray-50 rounded-lg p-2">
                                                    <CalendarDays className="h-4 w-4 text-gray-500 mr-2" />
                                                    <div>
                                                        <p className="text-xs text-gray-500">Start Date</p>
                                                        <p className="font-semibold text-gray-900">
                                                            {format(new Date(request.start_date), "MMM dd")}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Category */}
                                            {(request.category || request.assigned_to_active_category) && (
                                                <div className="flex items-center">
                                                    <Badge variant="outline" className="text-xs">
                                                        {request.category?.name || request.assigned_to_active_category}
                                                    </Badge>
                                                    {(request.category?.price_value || request.assigned_to_active_category_value) && (
                                                        <span className="ml-2 text-xs text-gray-500">
                                                            Base:{" "}
                                                            {formatCurrency(
                                                                request.category?.price_value || request.assigned_to_active_category_value || "0",
                                                            )}
                                                        </span>
                                                    )}
                                                </div>
                                            )}

                                            {/* Created Date */}
                                            <div className="flex items-center text-xs text-gray-500 pt-2 border-t border-gray-100">
                                                <Clock className="h-3 w-3 mr-1" />
                                                <span>Created {format(new Date(request.created_at), "MMM dd, yyyy 'at' HH:mm")}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}

                            {/* Load More Button - Mobile Optimized */}
                            {pagination.next && (
                                <div className="flex justify-center pt-4">
                                    <Button
                                        variant="outline"
                                        onClick={handleLoadMore}
                                        disabled={loadingMore}
                                        className="w-full max-w-xs bg-white"
                                    >
                                        {loadingMore ? (
                                            <>
                                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                Loading...
                                            </>
                                        ) : (
                                            <>
                                                <ChevronDown className="h-4 w-4 mr-2" />
                                                Load More ({pagination.count - journeyRequests.length} remaining)
                                            </>
                                        )}
                                    </Button>
                                </div>
                            )}

                            {/* Pagination Info */}
                            <div className="text-center text-xs text-gray-500 pb-4">
                                Showing {journeyRequests.length} of {pagination.count} requests
                                {!pagination.next && journeyRequests.length > 0 && (
                                    <span className="block mt-1 text-green-600">✓ All requests loaded</span>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
