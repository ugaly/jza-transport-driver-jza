"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Route,
  MapPin,
  Calendar,
  TrendingUp,
  TrendingDown,
  Clock,
  AlertCircle,
  RefreshCw,
  ChevronDown,
  FileText,
  Activity,
} from "lucide-react"
import BackButton from "@/components/back-button"
import { journeyHistoryService, type JourneyHistoryItem } from "../../api/journey-history-service"
import { useRouter } from "next/navigation"

export default function JourneyHistory() {
  const [journeys, setJourneys] = useState<JourneyHistoryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [error, setError] = useState("")
  const [hasMore, setHasMore] = useState(false)
  const [nextUrl, setNextUrl] = useState<string | null>(null)
  const [totalCount, setTotalCount] = useState(0)
  const [expandedJourneys, setExpandedJourneys] = useState<Set<number>>(new Set())
  const router = useRouter()

  useEffect(() => {
    loadJourneyHistory()
  }, [])

  const loadJourneyHistory = async (isLoadMore = false) => {
    try {
      if (!isLoadMore) {
        setIsLoading(true)
        setJourneys([])
      } else {
        setIsLoadingMore(true)
      }
      setError("")

      console.log("Loading journey history...")

      const response = await journeyHistoryService.getJourneyHistory(1, 10)

      if (!isLoadMore) {
        setJourneys(response.results)
      } else {
        setJourneys((prev) => [...prev, ...response.results])
      }

      setTotalCount(response.count)
      setHasMore(!!response.next)
      setNextUrl(response.next)

      console.log("Journey history loaded:", {
        count: response.count,
        hasMore: !!response.next,
        results: response.results.length,
      })
    } catch (err: any) {
      console.error("Error loading journey history:", err)
      if (err.response?.status === 401) {
        setError("Session expired. Please login again.")
      } else if (err.response?.data?.detail) {
        setError(`API Error: ${err.response.data.detail}`)
      } else {
        setError("Failed to load journey history. Please try again.")
      }
    } finally {
      setIsLoading(false)
      setIsLoadingMore(false)
    }
  }

  const loadMoreJourneys = async () => {
    if (!nextUrl || isLoadingMore) return

    try {
      setIsLoadingMore(true)
      setError("")

      console.log("Loading more journeys from:", nextUrl)

      const response = await journeyHistoryService.getJourneyHistoryByUrl(nextUrl)

      setJourneys((prev) => [...prev, ...response.results])
      setHasMore(!!response.next)
      setNextUrl(response.next)

      console.log("More journeys loaded:", {
        newResults: response.results.length,
        totalJourneys: journeys.length + response.results.length,
        hasMore: !!response.next,
      })
    } catch (err: any) {
      console.error("Error loading more journeys:", err)
      if (err.response?.status === 401) {
        setError("Session expired. Please login again.")
      } else {
        setError("Failed to load more journeys. Please try again.")
      }
    } finally {
      setIsLoadingMore(false)
    }
  }

  const toggleJourneyExpansion = (journeyId: number) => {
    setExpandedJourneys((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(journeyId)) {
        newSet.delete(journeyId)
      } else {
        newSet.add(journeyId)
      }
      return newSet
    })
  }

  const getStatusBadge = (journey: JourneyHistoryItem) => {
    if (journey.is_active) {
      return (
        <Badge className="bg-green-100 text-green-800 border-green-200">
          <Activity className="w-3 h-3 mr-1" />
          Active
        </Badge>
      )
    } else {
      return (
        <Badge className="bg-gray-100 text-gray-800 border-gray-200">
          <Clock className="w-3 h-3 mr-1" />
          Completed
        </Badge>
      )
    }
  }

  const formatCurrency = (amount: string) => {
    return `TSh ${Number.parseFloat(amount).toLocaleString()}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6 p-4 max-w-4xl mx-auto">
      {/* Header with Back Button */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center space-x-4 mb-4">
          <BackButton fallbackPath="/menu" />
          <div className="flex-1">
            {/* <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 flex items-center">
              <Route className="w-8 h-8 mr-3 text-blue-600" />
              Journey History
            </h1>
            <p className="text-gray-600">
              {totalCount > 0
                ? `${totalCount} journey${totalCount !== 1 ? "s" : ""} found`
                : "View your journey history"}
            </p> */}

            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 flex items-center">
              {/* <Route className="w-8 h-8 mr-3 text-blue-600" /> */}
              {/* Journey History */}
            </h1>
            <p className="text-gray-600">
              {totalCount > 0
                ? `${totalCount} journey${totalCount !== 1 ? "s" : ""} found`
                : ""}
            </p>
          </div>
          <Button
            onClick={() => loadJourneyHistory(false)}
            disabled={isLoading}
            variant="outline"
            size="sm"
            className="flex items-center space-x-2"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </Button>
        </div>
      </motion.div>

      {/* Error Message */}
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
          <span className="ml-2 text-gray-600">Loading journey history...</span>
        </motion.div>
      ) : (
        <>
          {/* Journey List */}
          {journeys.length > 0 ? (
            <div className="space-y-4">
              {journeys.map((journey, index) => (
                <motion.div
                  key={journey.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-all duration-200">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <CardTitle className="text-lg font-bold text-gray-800">{journey.journey_name}</CardTitle>
                            {getStatusBadge(journey)}
                          </div>
                          <div className="flex items-center text-gray-600 mb-2">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span className="font-medium">{journey.trip_from}</span>
                            <span className="mx-2">→</span>
                            <span className="font-medium">{journey.trip_to}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>Started: {formatDate(journey.start_date)}</span>
                            {journey.end_date && (
                              <>
                                <span className="mx-2">•</span>
                                <span>Ended: {formatDate(journey.end_date)}</span>
                              </>
                            )}
                          </div>
                        </div>
                        {/* <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleJourneyExpansion(journey.id)}
                          className="ml-4"
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform ${
                              expandedJourneys.has(journey.id) ? "rotate-180" : ""
                            }`}
                          />
                        </Button> */}
                      </div>
                    </CardHeader>
{/* 
                    <CardContent className="pt-0">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                        <div className="bg-blue-50 rounded-lg p-3 text-center">
                          <p className="text-xs text-blue-600 font-medium">Initial Amount</p>
                          <p className="text-sm font-bold text-blue-800">{formatCurrency(journey.total_trip_amount)}</p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-3 text-center">
                          <p className="text-xs text-green-600 font-medium">Income</p>
                          <p className="text-sm font-bold text-green-800">{formatCurrency(journey.total_income)}</p>
                        </div>
                        <div className="bg-red-50 rounded-lg p-3 text-center">
                          <p className="text-xs text-red-600 font-medium">Expenses</p>
                          <p className="text-sm font-bold text-red-800">{formatCurrency(journey.total_expenses)}</p>
                        </div>
                        <div className="bg-orange-50 rounded-lg p-3 text-center">
                          <p className="text-xs text-orange-600 font-medium">Balance</p>
                          <p className="text-sm font-bold text-orange-800">{formatCurrency(journey.current_balance)}</p>
                        </div>
                      </div>

                      {expandedJourneys.has(journey.id) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t pt-4"
                        >
                          <div className="mb-4">
                            <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                              <FileText className="w-4 h-4 mr-2" />
                              Journey Details
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                              <div>
                                <span className="text-gray-500">Created:</span>
                                <span className="ml-2 font-medium">{formatDateTime(journey.created_at)}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Status:</span>
                                <span className="ml-2 font-medium">
                                  {journey.is_active ? "Active Journey" : "Completed Journey"}
                                </span>
                              </div>
                            </div>
                          </div>

                          {journey.transactions && journey.transactions.length > 0 && (
                            <div>
                              <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                                <Activity className="w-4 h-4 mr-2" />
                                Recent Transactions ({journey.transactions.length})
                              </h4>
                              <div className="space-y-2">
                                {journey.transactions.map((transaction) => (
                                  <div
                                    key={transaction.id}
                                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                  >
                                    <div className="flex items-center space-x-3">
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
                                      <div>
                                        <p className="font-medium text-gray-800">{transaction.description}</p>
                                        <p className="text-xs text-gray-500">
                                          {formatDate(transaction.transaction_date)}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <p
                                        className={`font-bold ${
                                          transaction.transaction_type === "income" ? "text-green-600" : "text-red-600"
                                        }`}
                                      >
                                        {transaction.transaction_type === "income" ? "+" : "-"}
                                        {formatCurrency(transaction.amount)}
                                      </p>
                                      <Badge
                                        variant={transaction.transaction_type === "income" ? "default" : "secondary"}
                                        className="text-xs"
                                      >
                                        {transaction.transaction_type}
                                      </Badge>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {(!journey.transactions || journey.transactions.length === 0) && (
                            <div className="text-center py-4">
                              <FileText className="w-8 h-8 mx-auto text-gray-300 mb-2" />
                              <p className="text-gray-500 text-sm">No transactions recorded for this journey</p>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </CardContent> */}
                  </Card>
                </motion.div>
              ))}

              {/* Load More Button */}
              {hasMore && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-6">
                  <Button
                    onClick={loadMoreJourneys}
                    disabled={isLoadingMore}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105"
                  >
                    {isLoadingMore ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Loading more...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <ChevronDown className="w-4 h-4" />
                        <span>Load More Journeys</span>
                      </div>
                    )}
                  </Button>
                  <p className="text-sm text-gray-500 mt-2">
                    Showing {journeys.length} of {totalCount} journeys
                  </p>
                </motion.div>
              )}
            </div>
          ) : (
            /* Empty State */
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card className="bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200">
                <CardContent className="text-center py-12">
                  <Route className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No Journey History</h3>
                  <p className="text-gray-600 mb-6">You haven't created any journeys yet</p>
                  <Button
                    // onClick={() => window.history.back()}
                    onClick={() => router.push("/driver-journey-requests/new")}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                  >
                    {/* <Route className="w-4 h-4 mr-2" /> */}
                    Request Your First Journey
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </>
      )}
    </div>
  )
}
