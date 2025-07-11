// import * as React from "react"

// const MOBILE_BREAKPOINT = 768

// export function useIsMobile() {
//   const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

//   React.useEffect(() => {
//     const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
//     const onChange = () => {
//       setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
//     }
//     mql.addEventListener("change", onChange)
//     setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
//     return () => mql.removeEventListener("change", onChange)
//   }, [])

//   return !!isMobile
// }



"use client"

import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)

    const checkIsMobile = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
      }
    }

    // Initial check
    checkIsMobile()

    // Create media query listener
    if (typeof window !== "undefined") {
      const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)

      const onChange = () => {
        checkIsMobile()
      }

      // Use the newer addEventListener if available, fallback to addListener
      if (mql.addEventListener) {
        mql.addEventListener("change", onChange)
      } else {
        // Fallback for older browsers
        mql.addListener(onChange)
      }

      // Cleanup function
      return () => {
        if (mql.removeEventListener) {
          mql.removeEventListener("change", onChange)
        } else {
          // Fallback for older browsers
          mql.removeListener(onChange)
        }
      }
    }
  }, [])

  // Return undefined during SSR/initial render to prevent hydration mismatch
  if (!mounted) {
    return undefined
  }

  return !!isMobile
}
