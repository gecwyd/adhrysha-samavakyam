"use client"

import * as React from "react"
import { motion, useReducedMotion } from "framer-motion"
import { usePreloadStore, preload } from "@/lib/preload"
import { usePathname } from "next/navigation"
import { DriveImage } from "@/components/ui/drive-image"

const UNION_LOGO_URL = "https://github.com/gecwyd/adhrysha-samavakyam/releases/download/v0.1-assets/union-logo.webp"

const WAVE = [0.35, 0.7, 0.45, 1, 0.6, 0.85, 0.5, 0.75, 0.4, 0.9, 0.55, 0.7, 0.35]

function Wave() {
  const reduceMotion = useReducedMotion()
  return (
    <div aria-hidden="true" className="flex h-8 items-center gap-1.5">
      {WAVE.map((level, i) => (
        <motion.span
          key={i}
          className="h-full w-[3px] origin-center rounded-full bg-black"
          style={{ scaleY: level, opacity: 0.35 + level * 0.5 }}
          animate={reduceMotion ? undefined : { scaleY: [level, Math.min(1, level + 0.4), level * 0.5, level] }}
          transition={{ duration: 1.1 + (i % 4) * 0.18, repeat: Infinity, ease: "easeInOut", delay: i * 0.07 }}
        />
      ))}
    </div>
  )
}

export function Preloader() {
  const { isComplete, progress, total, loaded } = usePreloadStore()
  const [isVisible, setIsVisible] = React.useState(true)
  const [shouldRender, setShouldRender] = React.useState(true)
  const [hasEntered, setHasEntered] = React.useState(false)
  const [fallbackTriggered, setFallbackTriggered] = React.useState(false)

  React.useEffect(() => {
    if (!hasEntered) {
      document.body.style.overflow = "hidden"
      document.documentElement.style.overflow = "hidden"
    }
    
    // If no assets are registered after 500ms, allow the preloader to exit
    const fallbackTimer = setTimeout(() => {
      setFallbackTriggered(true)
    }, 500)
    
    return () => clearTimeout(fallbackTimer)
  }, [hasEntered])

  React.useEffect(() => {
    const isActuallyComplete = isComplete || (fallbackTriggered && total === 0)
    
    if (!isActuallyComplete || hasEntered) return

    const enterTimeout = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" })
      setHasEntered(true)
      setIsVisible(false)

      setTimeout(() => {
        setShouldRender(false)
        document.body.style.overflow = ""
        document.documentElement.style.overflow = ""
      }, 700)
    }, 900)

    return () => clearTimeout(enterTimeout)
  }, [isComplete, fallbackTriggered, total, hasEntered])

  if (!shouldRender) return null

  return (
    <div
      className={`fixed inset-0 z-[100] flex select-none flex-col overflow-hidden bg-[#d9d4c7] text-black transition-all duration-700 ease-in-out ${
        isVisible ? "scale-100 opacity-100" : "pointer-events-none scale-105 opacity-0"
      }`}
      aria-live="polite"
      aria-busy={!isComplete}
    >
      <div className="absolute left-6 sm:left-10 top-0 bottom-0 w-px bg-black/10 z-10 pointer-events-none" />
      <div className="absolute right-6 sm:right-10 top-0 bottom-0 w-px bg-black/10 z-10 pointer-events-none" />

      <div className="absolute left-8 sm:left-12 top-6 text-black/30 font-mono text-xs select-none pointer-events-none">+</div>
      <div className="absolute right-8 sm:right-12 top-6 text-black/30 font-mono text-xs select-none pointer-events-none">+</div>
      <div className="absolute left-8 sm:left-12 bottom-12 text-black/30 font-mono text-xs select-none pointer-events-none">+</div>
      <div className="absolute right-8 sm:right-12 bottom-12 text-black/30 font-mono text-xs select-none pointer-events-none">+</div>

      <header className="relative z-10 flex items-center justify-between px-6 py-5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-black/60 sm:px-10 sm:py-7 sm:text-[13px]">
        <span>GEC Wayanad · Est. 1999</span>
      </header>

      <main className="relative z-20 flex flex-1 flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex w-full max-w-3xl flex-col items-center"
        >
          <p className="flex items-center gap-4 font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-black/60 sm:text-[13px]">
            <span aria-hidden="true" className="hidden h-px w-10 bg-black/20 sm:block" />
            Official Digital Archive · 2025–26
            <span aria-hidden="true" className="hidden h-px w-10 bg-black/20 sm:block" />
          </p>

          <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 shrink-0 mb-4">
            <DriveImage
              src={preload(UNION_LOGO_URL)}
              alt="Sathva College Union Logo"
              fill
              sz="w800"
              className="object-contain drop-shadow-xl"
            />
          </div>

          <h1 className="mt-2 font-heading text-[clamp(6.5rem,26vw,17rem)] uppercase leading-[0.82] tracking-tight text-black drop-shadow-sm">
            Sathva
          </h1>

          <p className="mt-6 font-mono text-sm font-semibold uppercase tracking-[0.3em] text-black/80 sm:text-lg">
            College Union · GEC Wayanad
          </p>

          <div className="mt-8 mb-6">
            <Wave />
          </div>

          {!isComplete ? (
            <p className="max-w-md text-xs sm:text-sm font-mono tracking-[0.2em] uppercase text-black/50 tabular-nums">
              Loading {String(progress).padStart(2, "0")}%
            </p>
          ) : (
            <p className="max-w-md text-sm leading-relaxed text-black/60 sm:text-base animate-in fade-in duration-500">
              Stories, clubs and moments from the academic year 2025–26.
            </p>
          )}
        </motion.div>
      </main>

      <footer className="relative z-10 flex items-center justify-between gap-4 border-t border-black/10 px-6 py-5 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-black/50 sm:px-10 sm:py-6 sm:text-[11px]">
        <span className="hidden sm:inline">11.6854° N · 76.1320° E</span>
        <span className="ml-auto">Sathva Union Presents</span>
      </footer>
    </div>
  )
}

export function PreloadProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  if (pathname === "/" && process.env.NODE_ENV !== "development") {
    return <>{children}</>
  }

  return (
    <>
      <Preloader />
      {children}
    </>
  )
}
