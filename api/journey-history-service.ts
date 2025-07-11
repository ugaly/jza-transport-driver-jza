import axios from "axios"
import { authUtils } from "../auth-utils"
import base_url from "./base-url"

const API_BASE_URL = base_url

export interface JourneyTransaction {
  id: number
  description: string
  transaction_type: "income" | "expense"
  amount: string
  transaction_date: string
  created_at: string
}

export interface JourneyHistoryItem {
  id: number
  journey_name: string
  trip_from: string
  trip_to: string
  total_trip_amount: string
  start_date: string
  end_date: string | null
  created_at: string
  is_active: boolean
  current_balance: string
  total_expenses: string
  total_income: string
  transactions: JourneyTransaction[]
}

export interface JourneyHistoryResponse {
  count: number
  next: string | null
  previous: string | null
  results: JourneyHistoryItem[]
}

export const journeyHistoryService = {
  // Get journey history with pagination
  getJourneyHistory: async (page: number = 1, pageSize: number = 10): Promise<JourneyHistoryResponse> => {
    const tokens = authUtils.getTokens()

    if (!tokens?.access) {
      throw new Error("No access token available")
    }

    console.log(`Fetching journey history - Page: ${page}, Size: ${pageSize}`)

    const response = await axios.get(`${API_BASE_URL}/driver/journeys/my-journeys/history/`, {
      params: {
        page,
        page_size: pageSize,
      },
      headers: {
        Authorization: `Bearer ${tokens.access}`,
        "Content-Type": "application/json",
      },
    })

    console.log("Journey history response:", response.data)
    return response.data
  },

  // Get journey history by URL (for load more functionality)
  getJourneyHistoryByUrl: async (url: string): Promise<JourneyHistoryResponse> => {
    const tokens = authUtils.getTokens()

    if (!tokens?.access) {
      throw new Error("No access token available")
    }

    console.log("Fetching journey history by URL:", url)

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${tokens.access}`,
        "Content-Type": "application/json",
      },
    })

    console.log("Journey history by URL response:", response.data)
    return response.data
  },
}
