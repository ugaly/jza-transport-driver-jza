// Utility functions for authentication
export const authUtils = {
  // Get stored tokens
  getTokens: () => {
    if (typeof window === "undefined") return null

    return {
      access: localStorage.getItem("access_token"),
      refresh: localStorage.getItem("refresh_token"),
    }
  },

  // Get stored user data
  getUserData: () => {
    if (typeof window === "undefined") return null

    const userData = localStorage.getItem("user_data")
    return userData ? JSON.parse(userData) : null
  },

  // Clear all auth data
  clearAuth: () => {
    if (typeof window === "undefined") return

    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    localStorage.removeItem("user_data")
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const tokens = authUtils.getTokens()
    return !!(tokens?.access && tokens?.refresh)
  },

  // Create axios instance with auth headers
  createAuthenticatedAxios: () => {
    const tokens = authUtils.getTokens()

    return {
      headers: {
        Authorization: `Bearer ${tokens?.access}`,
        "Content-Type": "application/json",
      },
    }
  },

  // Update user as mobile user
  updateMobileUserStatus: (userData: any) => {
    const updatedUser = { ...userData, is_mobile_user: true }
    localStorage.setItem("user_data", JSON.stringify(updatedUser))
    return updatedUser
  },

  // Send mobile login request
  createMobileLoginRequest: (username: string, password: string) => {
    return {
      username,
      password,
      is_mobile_user: true,
      device_type: "mobile_web", // Optional: specify device type
      platform: "driver_portal", // Optional: specify platform
    }
  },
}

