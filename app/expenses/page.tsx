"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import ExpenseForm from "../../components/expense-form"
import BackButton from "../../components/back-button"
import { transactionService } from "../../api/transaction-service"

export default function ExpensesPage() {
  const [isCreatingTransaction, setIsCreatingTransaction] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleExpenseSubmit = async (transactionData: any) => {
    try {
      setIsCreatingTransaction(true)
      setError("")

      await transactionService.createTransaction(transactionData)

      // Redirect to dashboard on success
      router.push("/dashboard")
    } catch (err: any) {
      console.error("Error creating transaction:", err)
      if (err.response?.status === 401) {
        setError("Session expired. Please login again.")
      } else if (err.response?.data?.detail) {
        setError(`API Error: ${err.response.data.detail}`)
      } else {
        setError("Failed to add transaction. Please try again.")
      }
    } finally {
      setIsCreatingTransaction(false)
    }
  }

  const handleExpenseCancel = () => {
    router.push("/dashboard")
  }

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center space-x-4">
        <BackButton fallbackPath="/dashboard" />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Add Transaction</h2>
          <p className="text-gray-600">Add new income or expense</p>
        </div>
      </div>

      {/* Expense Form */}
      <ExpenseForm
        onSubmit={handleExpenseSubmit}
        onCancel={handleExpenseCancel}
        isLoading={isCreatingTransaction}
        error={error}
      />
    </div>
  )
}
