// Utility to detect if user is on mobile device
export const mobileDetection = {
  isMobileDevice: (): boolean => {
    if (typeof window === "undefined") return false

    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  },

  isTouchDevice: (): boolean => {
    if (typeof window === "undefined") return false

    return "ontouchstart" in window || navigator.maxTouchPoints > 0
  },

  getDeviceInfo: () => {
    if (typeof window === "undefined") return null

    return {
      userAgent: navigator.userAgent,
      isMobile: mobileDetection.isMobileDevice(),
      isTouch: mobileDetection.isTouchDevice(),
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      platform: navigator.platform,
    }
  },
}
