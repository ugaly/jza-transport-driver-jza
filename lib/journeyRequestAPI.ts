import base_url from "@/api/base-url"

const API_BASE_URL = `${base_url}`

const getAuthHeaders = () => {
  const token = localStorage.getItem("access_token")
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  }
}

export const journeyRequestAPI = {
  // Get all journey requests with pagination
  getAll: async (params?: { by_user?: boolean; page?: number; search?: string; category?: string }) => {
    const queryParams = new URLSearchParams()

    if (params?.by_user) {
      queryParams.append("by_user", "true")
    }

    if (params?.page) {
      queryParams.append("page", params.page.toString())
    }

    if (params?.search) {
      queryParams.append("search", params.search)
    }

    if (params?.category && params.category !== "all") {
      queryParams.append("category", params.category)
    }

    const url = `${API_BASE_URL}/journey-requests/${queryParams.toString() ? "?" + queryParams.toString() : ""}`
    const response = await fetch(url, {
      headers: getAuthHeaders(),
    })

    if (!response.ok) {
      throw new Error("Failed to fetch journey requests")
    }

    return response.json()
  },

  // Accept a journey request
  accept: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/journey-requests/${id}/accept/`, {
      method: "POST",
      headers: getAuthHeaders(),
    })

    if (!response.ok) {
      throw new Error("Failed to accept journey request")
    }

    return response.json()
  },

  // Reject a journey request
  reject: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/journey-requests/${id}/reject/`, {
      method: "POST",
      headers: getAuthHeaders(),
    })

    if (!response.ok) {
      throw new Error("Failed to reject journey request")
    }

    return response.json()
  },

  // Create a new journey request
  create: async (data: Partial<any>) => {
    const response = await fetch(`${API_BASE_URL}/journey-requests/`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error("Failed to create journey request")
    }

    return response.json()
  },
}
