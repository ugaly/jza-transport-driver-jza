import axios from "axios"
import { authUtils } from "../auth-utils"
import base_url from "./base-url"

const API_BASE_URL = base_url

export interface TransactionFile {
  id: number
  file: string
  uploaded_at: string
}

export interface Transaction {
  id: number
  description: string
  transaction_type: "income" | "expense"
  amount: string
  transaction_date: string
    created_by_name?: string // Add this line if your API returns this field

  files: TransactionFile[]
  created_by: number
  created_at: string
}

export interface CreateTransactionPayload {
  description: string
  transaction_type: "income" | "expense"
  amount: string
  transaction_date: string
  files?: File[]
}

export const transactionService = {
  // Create a new transaction with files
  createTransaction: async (payload: CreateTransactionPayload): Promise<Transaction> => {
    const tokens = authUtils.getTokens()

    if (!tokens?.access) {
      throw new Error("No access token available")
    }

    console.log("Creating transaction with payload:", payload)

    // Create FormData for multipart form submission
    const formData = new FormData()
    formData.append("description", payload.description)
    formData.append("transaction_type", payload.transaction_type)
    formData.append("amount", payload.amount)
    formData.append("transaction_date", payload.transaction_date)

    // Append files if they exist
    if (payload.files && payload.files.length > 0) {
      console.log("Adding files to transaction:", payload.files.length)
      payload.files.forEach((file) => {
        formData.append("files", file)
      })
    }

    const response = await axios.post(`${API_BASE_URL}/driver/journeys/transactions/`, formData, {
      headers: {
        Authorization: `Bearer ${tokens.access}`,
        "Content-Type": "multipart/form-data",
      },
    })

    console.log("Transaction creation response:", response.data)
    return response.data
  },

  // Get all transactions
  getTransactions: async (): Promise<Transaction[]> => {
    const tokens = authUtils.getTokens()

    if (!tokens?.access) {
      throw new Error("No access token available")
    }

    console.log("Fetching transactions...")

    const response = await axios.get(`${API_BASE_URL}/driver/journeys/transactions/`, {
      headers: {
        Authorization: `Bearer ${tokens.access}`,
      },
    })

    console.log("Transactions response:", response.data)
    return response.data
  },
}
