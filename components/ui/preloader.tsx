"use client"

import * as React from "react"
import { motion, useReducedMotion } from "framer-motion"
import { usePreloadStore } from "@/lib/preload"
import { useAudio } from "@/context/audio.context"
import { Volume2, ArrowRight, Headphones } from "lucide-react"
import { usePathname } from "next/navigation"

const WAVE = [0.35, 0.7, 0.45, 1, 0.6, 0.85, 0.5, 0.75, 0.4, 0.9, 0.55, 0.7, 0.35]

function Wave() {
  const reduceMotion = useReducedMotion()
  return (
    <div aria-hidden="true" className="flex h-8 items-center gap-1.5">
      {WAVE.map((level, i) => (
        <motion.span
          key={i}
          className="h-full w-[3px] origin-center rounded-full bg-[#eae4d7]"
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
      className={`fixed inset-0 z-[100] flex select-none flex-col overflow-hidden bg-[#070708] text-[#eae4d7] transition-all duration-700 ease-in-out ${
        isVisible ? "scale-100 opacity-100" : "pointer-events-none scale-105 opacity-0"
      }`}
      aria-live="polite"
      aria-busy={!isComplete}
    >
      {/* Soft spotlight + a faint grid that fades out toward the edges. */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,rgba(234,228,215,0.10),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(234,228,215,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(234,228,215,0.06)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]" />

      <header className="relative z-10 flex items-center justify-between px-6 py-5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[#eae4d7]/80 sm:px-10 sm:py-7 sm:text-[13px]">
        <span className="flex items-center gap-2.5">
          <span
            className={`inline-block h-2 w-2 rounded-full ${
              isComplete ? "bg-emerald-400" : "animate-pulse bg-amber-400"
            }`}
          />
          {isComplete ? "Ready" : "Loading"}
        </span>
        <span>GEC Wayanad · Est. 1999</span>
      </header>

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
        {!isComplete ? (
          <div className="flex w-full max-w-md flex-col items-center animate-in fade-in duration-500">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-[#eae4d7]/80 sm:text-[13px]">
              Preparing the archive
            </p>

            <p
              className="mt-5 font-heading text-[clamp(6rem,22vw,10rem)] leading-none tabular-nums"
              aria-hidden="true"
            >
              {progress}
              <span className="ml-1 align-top text-[0.35em] text-[#eae4d7]/60">%</span>
            </p>

            <div
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
              aria-label="Loading archive"
              className="mt-6 h-[3px] w-full overflow-hidden rounded-full bg-[#eae4d7]/15"
            >
              <div
                className="h-full rounded-full bg-[#eae4d7] transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="mt-5 text-sm text-[#eae4d7]/75 sm:text-base">
              {progress < 50 ? "Loading pages and images…" : "Buffering sound…"}
              <span className="text-[#eae4d7]/50"> · {loaded} of {total} ready</span>
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex w-full max-w-3xl flex-col items-center"
          >
            <p className="flex items-center gap-4 font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-[#eae4d7]/80 sm:text-[13px]">
              <span aria-hidden="true" className="hidden h-px w-10 bg-[#eae4d7]/40 sm:block" />
              Official Digital Archive · 2025–26
              <span aria-hidden="true" className="hidden h-px w-10 bg-[#eae4d7]/40 sm:block" />
            </p>

            <h1 className="mt-6 font-heading text-[clamp(6.5rem,26vw,17rem)] uppercase leading-[0.82] tracking-tight text-[#f4efe3] drop-shadow-[0_10px_40px_rgba(0,0,0,0.7)]">
              Sathva
            </h1>

            <p className="mt-6 font-mono text-sm font-semibold uppercase tracking-[0.3em] text-[#eae4d7] sm:text-lg">
              College Union · GEC Wayanad
            </p>

            <div className="mt-7">
              <Wave />
            </div>

            <p className="mt-7 max-w-md text-base leading-relaxed text-[#eae4d7]/80 sm:text-lg">
              Stories, clubs and moments from the academic year 2025–26.
            </p>

            <button
              type="button"
              onClick={handleEnter}
              autoFocus
              className="group mt-10 inline-flex cursor-pointer items-center gap-3.5 rounded-full bg-[#eae4d7] px-9 py-4 text-[#070708] shadow-[0_0_50px_rgba(234,228,215,0.25)] outline-none transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_80px_rgba(234,228,215,0.45)] focus-visible:ring-2 focus-visible:ring-[#eae4d7] focus-visible:ring-offset-4 focus-visible:ring-offset-[#070708] active:scale-95 sm:px-12 sm:py-5"
            >
              <Volume2 className="h-5 w-5" aria-hidden="true" />
              <span className="font-mono text-sm font-bold uppercase tracking-[0.25em] sm:text-base">
                Enter experience
              </span>
              <ArrowRight
                className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </button>

            <p className="mt-5 hidden font-mono text-xs uppercase tracking-[0.2em] text-[#eae4d7]/65 sm:block">
              Press{" "}
              <kbd className="rounded border border-[#eae4d7]/35 bg-[#eae4d7]/10 px-2 py-0.5 text-[11px] text-[#eae4d7]">
                Enter
              </kbd>{" "}
              or{" "}
              <kbd className="rounded border border-[#eae4d7]/35 bg-[#eae4d7]/10 px-2 py-0.5 text-[11px] text-[#eae4d7]">
                Space
              </kbd>
            </p>
          </motion.div>
        )}
      </main>

      <footer className="relative z-10 flex items-center justify-between gap-4 px-6 py-5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#eae4d7]/70 sm:px-10 sm:py-7 sm:text-xs">
        <span className="hidden sm:inline">11.6854° N · 76.1320° E</span>
        <span className="flex items-center gap-2.5 sm:ml-auto">
          <Headphones className="h-4 w-4" aria-hidden="true" />
          Best with sound on · headphones recommended
        </span>
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
