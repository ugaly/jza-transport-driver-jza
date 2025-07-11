import axios from "axios"
import { authUtils } from "../auth-utils"
import base_url from "./base-url"

const API_BASE_URL = base_url

export interface FuelEntry {
  id: number
  category: number
  user: number
  action_type: "initial" | "refill" | "consume"
  litres: string
  fuel_used: string | null
  balance?: string
  description: string
  place: string
  recorded_at: string
}

export interface FuelSummary {
  category: string
  initial_litres: number
  total_refilled: number
  total_consumed: number
  remaining_balance: number
}

export interface CreateFuelEntryPayload {
  action_type: "initial" | "refill" | "consume"
  litres: string
  place: string
  description: string
}

export interface CreateFuelEntryResponse {
  message: string
  current_remaining: number
  fuel_used_since_last: number | null
  current_balance: number
  entry: FuelEntry
}

export const fuelService = {
  // Add fuel entry
  addFuelEntry: async (payload: CreateFuelEntryPayload): Promise<CreateFuelEntryResponse> => {
    const tokens = authUtils.getTokens()

    if (!tokens?.access) {
      throw new Error("No access token available")
    }

    const response = await axios.post(`${API_BASE_URL}/fuel/add/`, payload, {
      headers: {
        Authorization: `Bearer ${tokens.access}`,
        "Content-Type": "application/json",
      },
    })

    return response.data
  },

  // Get fuel summary
  getFuelSummary: async (): Promise<FuelSummary> => {
    const tokens = authUtils.getTokens()

    if (!tokens?.access) {
      throw new Error("No access token available")
    }

    const response = await axios.get(`${API_BASE_URL}/fuel/summary/`, {
      headers: {
        Authorization: `Bearer ${tokens.access}`,
      },
    })

    return response.data
  },

  // Get fuel history
  getFuelHistory: async (): Promise<FuelEntry[]> => {
    const tokens = authUtils.getTokens()

    if (!tokens?.access) {
      throw new Error("No access token available")
    }

    const response = await axios.get(`${API_BASE_URL}/fuel/history/`, {
      headers: {
        Authorization: `Bearer ${tokens.access}`,
      },
    })

    return response.data
  },
}
