"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePreloadStore } from "@/lib/preload"
import { useAudio } from "@/context/audio.context"
import { Volume2, ArrowRight, Headphones } from "lucide-react"

export function Preloader() {
  const { isComplete, progress, total, loaded } = usePreloadStore()
  const { unlockAudio } = useAudio()
  const [isVisible, setIsVisible] = React.useState(false)
  const [shouldRender, setShouldRender] = React.useState(false)
  const [hasEntered, setHasEntered] = React.useState(false)

  React.useEffect(() => {
    if (total > 0 && !hasEntered) {
      setShouldRender(true)
      const showTimeout = setTimeout(() => {
        setIsVisible(true)
      }, 50)

      document.body.style.overflow = "hidden"
      document.documentElement.style.overflow = "hidden"

      return () => {
        clearTimeout(showTimeout)
      }
    }
  }, [total, hasEntered])

  const handleEnter = React.useCallback(() => {
    unlockAudio()
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
    setHasEntered(true)
    setIsVisible(false)

    const hideTimeout = setTimeout(() => {
      setShouldRender(false)
      document.body.style.overflow = ""
      document.documentElement.style.overflow = ""
    }, 700)

    return () => {
      clearTimeout(hideTimeout)
    }
  }, [unlockAudio])

  React.useEffect(() => {
    if (!isComplete || hasEntered) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        handleEnter()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isComplete, hasEntered, handleEnter])

  if (!shouldRender) return null

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col justify-between bg-[#070708] text-[#eae4d7] transition-all duration-700 ease-in-out p-6 sm:p-10 select-none overflow-hidden ${
        isVisible ? "opacity-100 scale-100 backdrop-blur-md" : "opacity-0 scale-105 pointer-events-none"
      }`}
      aria-live="polite"
      aria-busy={!isComplete}
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_rgba(234,228,215,0.08)_0%,_transparent_65%)]" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#eae4d7_1px,transparent_1px),linear-gradient(to_bottom,#eae4d7_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]" />

      <div className="relative z-10 w-full flex justify-between items-center font-mono text-[9px] sm:text-[11px] tracking-[0.3em] uppercase text-[#eae4d7]/50 font-semibold">
        <div className="flex items-center gap-2.5">
          <span className="inline-block w-2 h-2 rounded-full bg-red-500/90 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
          <span>REEL 01 // AUDIO ARCHIVE</span>
        </div>
        <div className="flex items-center gap-4">
          <span>GEC WAYANAD</span>
          <span className="hidden sm:inline">·</span>
          <span className="hidden sm:inline">EST. 1999</span>
        </div>
      </div>

      <div className="relative z-10 my-auto flex flex-col items-center justify-center w-full max-w-2xl mx-auto text-center px-4">
        {!isComplete ? (
          <div className="flex flex-col items-center justify-center gap-8 w-full animate-in fade-in duration-500">
            <div className="relative flex items-center justify-center size-36 sm:size-40">
              <svg className="absolute inset-0 size-full -rotate-90 transform" viewBox="0 0 100 100">
                <circle
                  className="text-white/10 stroke-current"
                  strokeWidth="2.5"
                  cx="50"
                  cy="50"
                  r="46"
                  fill="transparent"
                />
                <circle
                  className="text-[#eae4d7] stroke-current transition-all duration-300 ease-out"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  cx="50"
                  cy="50"
                  r="46"
                  fill="transparent"
                  strokeDasharray={`${progress * 2.89} 289`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl sm:text-5xl font-mono font-bold text-[#eae4d7] tabular-nums tracking-tight">
                  {progress}
                </span>
                <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-[#eae4d7]/50 mt-0.5">
                  PERCENT
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 w-full max-w-xs">
              <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#eae4d7]/80 font-bold">
                {progress < 50 ? "INITIALIZING ARCHIVE..." : "PRE-BUFFERING SOUND..."}
              </span>
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#eae4d7] transition-all duration-300 ease-out rounded-full shadow-[0_0_10px_rgba(234,228,215,0.6)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#eae4d7]/40">
                {loaded} / {total} ASSETS READY
              </span>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center gap-6 sm:gap-8 w-full"
          >
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-[#eae4d7]/20 bg-[#eae4d7]/5 font-mono text-[9px] sm:text-[11px] tracking-[0.35em] uppercase text-[#eae4d7]/70 font-semibold">
              <span>OFFICIAL DIGITAL ARCHIVE</span>
              <span className="text-[#eae4d7]/30">·</span>
              <span>2025–26</span>
            </div>

            <div className="flex flex-col items-center">
              <h1 className="font-heading text-6xl sm:text-8xl md:text-9xl uppercase tracking-tight text-[#eae4d7] leading-[0.85] drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
                SATHVA
              </h1>
              <span className="font-mono text-[10px] sm:text-[13px] tracking-[0.4em] uppercase text-[#eae4d7]/60 font-semibold mt-3 sm:mt-4">
                COLLEGE UNION // GEC WAYANAD
              </span>
            </div>

            <div className="flex items-center gap-1.5 my-1">
              {[40, 70, 45, 90, 60, 85, 50, 75, 40].map((h, i) => (
                <motion.span
                  key={i}
                  animate={{
                    scaleY: [0.3, 1, 0.4, 0.9, 0.3],
                    opacity: [0.4, 0.9, 0.5, 1, 0.4]
                  }}
                  transition={{
                    duration: 1.2 + (i % 3) * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.08
                  }}
                  style={{ height: `${h * 0.3}px` }}
                  className="w-1 bg-[#eae4d7] rounded-full origin-center"
                />
              ))}
            </div>

            <div className="flex flex-col items-center gap-3.5 mt-2">
              <button
                type="button"
                onClick={handleEnter}
                className="group relative inline-flex items-center gap-4 px-8 sm:px-12 py-4 sm:py-5 rounded-full border border-[#eae4d7]/40 hover:border-[#eae4d7] bg-[#eae4d7]/10 hover:bg-[#eae4d7] text-[#eae4d7] hover:text-[#070708] transition-all duration-300 shadow-[0_0_40px_rgba(234,228,215,0.18)] hover:shadow-[0_0_70px_rgba(234,228,215,0.45)] hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Volume2 className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 animate-pulse text-red-400 group-hover:text-[#070708]" />
                <span className="font-mono text-xs sm:text-sm uppercase tracking-[0.35em] font-bold">
                  ENTER EXPERIENCE
                </span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <div className="flex items-center gap-2 font-mono text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-[#eae4d7]/40 font-medium">
                <span className="hidden sm:inline">PRESS</span>
                <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded border border-white/20 bg-white/5 text-white/70 font-mono text-[8px]">
                  SPACE
                </kbd>
                <span className="hidden sm:inline">OR</span>
                <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded border border-white/20 bg-white/5 text-white/70 font-mono text-[8px]">
                  ENTER
                </kbd>
                <span className="hidden sm:inline">·</span>
                <span>CLICK TO EXPLORE</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="relative z-10 w-full flex justify-between items-center font-mono text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-[#eae4d7]/40 font-medium">
        <div className="flex items-center gap-2">
          <span>11.6854° N</span>
          <span>·</span>
          <span>76.1320° E</span>
        </div>
        <div className="flex items-center gap-2 text-[#eae4d7]/60">
          <Headphones className="w-3.5 h-3.5 text-[#eae4d7]/50" />
          <span>HEADPHONES RECOMMENDED</span>
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
