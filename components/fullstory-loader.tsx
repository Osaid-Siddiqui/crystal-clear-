"use client"

import { useEffect } from "react"

export default function FullStoryLoader(): null {
  useEffect(() => {
    // Only load FullStory in production and when an org id is provided via env
    if (process.env.NODE_ENV !== "production") return
    const fsOrg = process.env.NEXT_PUBLIC_FULLSTORY_ID
    if (!fsOrg) return

    // Preserve native fetch in case FullStory overwrites it or fails
    const nativeFetch = window.fetch

    try {
      ;(window as any)._fs_org = fsOrg
    } catch (e) {
      // Ignore
    }

    const script = document.createElement("script")
    script.src = "https://edge.fullstory.com/s/fs.js"
    script.async = true

    const onError = () => {
      try {
        // Restore native fetch if it was modified
        window.fetch = nativeFetch
      } catch (e) {
        // ignore
      }
      console.warn("FullStory failed to load")
    }

    script.addEventListener("error", onError)

    script.addEventListener("load", () => {
      // If FullStory exposed a global, you can initialize further here.
      // Keep this minimal to avoid interfering with app runtime.
      const FS = (window as any).FS
      if (!FS) return
      try {
        // Optionally, you could call FS.identify(...) here when you have a user id
      } catch (e) {
        console.warn("FullStory loaded but initialization failed", e)
      }
    })

    document.body.appendChild(script)

    return () => {
      script.removeEventListener("error", onError)
      try {
        document.body.removeChild(script)
      } catch (e) {
        // ignore
      }
      try {
        window.fetch = nativeFetch
      } catch (e) {
        // ignore
      }
    }
  }, [])

  return null
}
