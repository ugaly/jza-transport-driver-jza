import axios from "axios"
import { authUtils } from "../auth-utils"
import base_url from "./base-url"

const API_BASE_URL = base_url

export interface Journey {
  id: number
  category: number
  journey_name: string
  trip_from: string
  trip_to: string
  total_trip_amount: string
  start_date: string
  end_date: string
  created_by: number
  created_at: string
  updated_at: string
  is_active: boolean
}

export interface CreateJourneyPayload {
  journey_name: string
  trip_from: string
  trip_to: string
  total_trip_amount: string
  start_date: string
  end_date: string
}

export const journeyService = {
  // Create a new journey
  createJourney: async (payload: CreateJourneyPayload): Promise<Journey> => {
    const tokens = authUtils.getTokens()

    if (!tokens?.access) {
      throw new Error("No access token available")
    }

    console.log("Creating journey with payload:", payload)

    const response = await axios.post(`${API_BASE_URL}/driver/journeys/create/`, payload, {
      headers: {
        Authorization: `Bearer ${tokens.access}`,
        "Content-Type": "application/json",
      },
    })

    console.log("Journey creation response:", response.data)
    return response.data
  },

  // Get active journeys
  getActiveJourneys: async (): Promise<Journey[]> => {
    const tokens = authUtils.getTokens()

    if (!tokens?.access) {
      throw new Error("No access token available")
    }

    console.log("Fetching active journeys...")

    const response = await axios.get(`${API_BASE_URL}/driver/journeys/active/`, {
      headers: {
        Authorization: `Bearer ${tokens.access}`,
      },
    })

    console.log("Active journeys response:", response.data)
    return response.data
  },

  // Complete a journey
  completeJourney: async (journeyId: number): Promise<{ detail: string }> => {
    const tokens = authUtils.getTokens()

    if (!tokens?.access) {
      throw new Error("No access token available")
    }

    console.log("Completing journey:", journeyId)

    const response = await axios.post(
      `${API_BASE_URL}/driver/journeys/${journeyId}/complete/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${tokens.access}`,
          "Content-Type": "application/json",
        },
      },
    )

    console.log("Journey completion response:", response.data)
    return response.data
  },
}
