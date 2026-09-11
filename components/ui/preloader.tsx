"use client"

import * as React from "react"
import { usePreloadStore } from "@/lib/preload"
import { Loader2 } from "lucide-react"

export function Preloader() {
  const { isComplete, progress, total, loaded } = usePreloadStore()
  const [isVisible, setIsVisible] = React.useState(false)
  const [shouldRender, setShouldRender] = React.useState(false)

  React.useEffect(() => {
    // If there are items to preload and we haven't completed them yet
    if (total > 0 && !isComplete) {
      setShouldRender(true)
      // Small delay before showing to allow state to settle
      const showTimeout = setTimeout(() => {
        setIsVisible(true)
      }, 50)
      
      // Lock scroll
      document.body.style.overflow = "hidden"
      document.documentElement.style.overflow = "hidden"
      
      return () => {
        clearTimeout(showTimeout)
      }
    } 
    // When complete, animate out
    else if (isComplete && isVisible) {
      setIsVisible(false)
      
      // Wait for exit animation to finish before unmounting and unlocking
      const hideTimeout = setTimeout(() => {
        setShouldRender(false)
        document.body.style.overflow = ""
        document.documentElement.style.overflow = ""
      }, 600) // Match transition duration
      
      return () => {
        clearTimeout(hideTimeout)
      }
    }
  }, [total, isComplete, isVisible])

  if (!shouldRender) return null

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#09090b] transition-all duration-700 ease-in-out ${
        isVisible ? "opacity-100 scale-100 backdrop-blur-md" : "opacity-0 scale-105 pointer-events-none"
      }`}
      aria-live="polite"
      aria-busy={!isComplete}
    >
      <div className="relative flex flex-col items-center justify-center gap-8 w-full max-w-md px-6">
        
        {/* Animated Ring */}
        <div className="relative flex items-center justify-center size-32">
          <svg className="absolute inset-0 size-full -rotate-90 transform" viewBox="0 0 100 100">
            <circle
              className="text-white/10 stroke-current"
              strokeWidth="2"
              cx="50"
              cy="50"
              r="48"
              fill="transparent"
            />
            <circle
              className="text-[#eae4d7] stroke-current transition-all duration-300 ease-out"
              strokeWidth="2"
              strokeLinecap="round"
              cx="50"
              cy="50"
              r="48"
              fill="transparent"
              strokeDasharray={`${progress * 3.01} 301`}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-mono font-medium text-[#eae4d7] tabular-nums">
              {progress}
            </span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#9e988d] -mt-1">
              %
            </span>
          </div>
        </div>

        {/* Status Text & Counter */}
        <div className="flex flex-col items-center gap-3 w-full">
          <div className="flex items-center gap-2">
            <Loader2 className="size-3.5 animate-spin text-[#9e988d]" />
            <h2 className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#dcd6c8]">
              {progress < 50 ? "INITIALIZING ASSETS..." : "CACHING MEDIA..."}
            </h2>
          </div>
          
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#eae4d7] transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="text-[10px] font-mono uppercase tracking-widest text-white/40">
            {loaded} / {total} ASSETS LOADED
          </p>
        </div>
      </div>
    </div>
  )
}

export function PreloadProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Preloader />
      {children}
    </>
  )
}
