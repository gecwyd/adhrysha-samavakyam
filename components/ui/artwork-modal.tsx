"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, Maximize2, Minimize2, Palette } from "lucide-react"
import { type ArtworkPiece } from "@/lib/artworks-data"

interface ArtworkModalProps {
  artwork: ArtworkPiece | null
  allArtworks: ArtworkPiece[]
  isOpen: boolean
  onClose: () => void
  onSelectArtwork: (artwork: ArtworkPiece) => void
}

export function ArtworkModal({
  artwork,
  allArtworks,
  isOpen,
  onClose,
  onSelectArtwork,
}: ArtworkModalProps) {
  const [isZoomed, setIsZoomed] = useState(false)

  const currentIndex = artwork ? allArtworks.findIndex((a) => a.id === artwork.id) : -1

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      onSelectArtwork(allArtworks[currentIndex - 1])
    } else if (currentIndex === 0) {
      onSelectArtwork(allArtworks[allArtworks.length - 1])
    }
  }, [currentIndex, allArtworks, onSelectArtwork])

  const handleNext = useCallback(() => {
    if (currentIndex >= 0 && currentIndex < allArtworks.length - 1) {
      onSelectArtwork(allArtworks[currentIndex + 1])
    } else if (currentIndex === allArtworks.length - 1) {
      onSelectArtwork(allArtworks[0])
    }
  }, [currentIndex, allArtworks, onSelectArtwork])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") handlePrev()
      if (e.key === "ArrowRight") handleNext()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose, handlePrev, handleNext])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
      setIsZoomed(false)
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  if (!artwork) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl text-white select-none"
        >
          <div className="absolute top-0 inset-x-0 h-20 px-6 sm:px-10 flex items-center justify-between z-30 pointer-events-auto bg-gradient-to-b from-black/80 to-transparent">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs tracking-widest text-white/50 uppercase">
                {String(currentIndex + 1).padStart(2, "0")} / {String(allArtworks.length).padStart(2, "0")}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center transition-colors text-white/80 hover:text-white"
                title={isZoomed ? "Reset zoom" : "Fit / Fill view"}
              >
                {isZoomed ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-red-500/30 border border-white/10 hover:border-red-400/40 flex items-center justify-center transition-all text-white/80 hover:text-white"
                title="Close (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 border border-white/10 flex items-center justify-center transition-all text-white/80 hover:text-white backdrop-blur-md"
            title="Previous artwork (Left Arrow)"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 border border-white/10 flex items-center justify-center transition-all text-white/80 hover:text-white backdrop-blur-md"
            title="Next artwork (Right Arrow)"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="relative w-full h-full flex flex-col lg:flex-row items-center justify-center p-6 sm:p-12 pt-20 pb-24 lg:pb-12 gap-8 overflow-y-auto lg:overflow-hidden">
            <motion.div
              key={artwork.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className={`relative flex items-center justify-center transition-all duration-300 ${
                isZoomed ? "w-full h-full max-w-none max-h-none" : "w-full lg:w-3/5 h-[50vh] sm:h-[65vh] lg:h-[80vh]"
              }`}
            >
              <div className="relative w-full h-full max-w-4xl max-h-[80vh] flex items-center justify-center">
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/15 bg-black/40 backdrop-blur-sm group">
                  <Image
                    src={artwork.src}
                    alt={artwork.title}
                    fill
                    sizes="(max-width: 1024px) 95vw, 65vw"
                    priority
                    className={`object-contain transition-transform duration-500 ${
                      isZoomed ? "scale-110 cursor-zoom-out" : "cursor-zoom-in"
                    }`}
                    onClick={() => setIsZoomed(!isZoomed)}
                  />
                </div>
              </div>
            </motion.div>

            {!isZoomed && (
              <motion.div
                key={`meta-${artwork.id}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.35, delay: 0.1 }}
                className="w-full lg:w-2/5 max-w-xl flex flex-col justify-center bg-white/[0.04] border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shrink-0"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
                    {artwork.artistDeptShort}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                    {artwork.artistSemester}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/30 ml-auto">
                    {artwork.ticketId}
                  </span>
                </div>

                <h3 className="font-sans text-2xl sm:text-3xl font-medium tracking-tight text-white mb-2">
                  {artwork.title}
                </h3>

                <div className="flex items-center gap-2 text-white/60 text-xs font-mono mb-6">
                  <Palette className="w-3.5 h-3.5 text-amber-400" />
                  <span>{artwork.medium}</span>
                </div>

                <p className="text-white/80 text-sm sm:text-base leading-relaxed font-serif italic mb-8 bg-black/20 p-4 rounded-xl border border-white/5">
                  &ldquo;{artwork.description}&rdquo;
                </p>

                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                  <div className="w-12 h-12 rounded-full overflow-hidden relative border border-white/20 shrink-0 bg-white/10">
                    <Image
                      src={artwork.artistAvatar}
                      alt={artwork.artistName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-sans font-medium text-white text-base">
                      {artwork.artistName}
                    </span>
                    <span className="font-mono text-[11px] text-white/50">
                      {artwork.artistDepartment}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
