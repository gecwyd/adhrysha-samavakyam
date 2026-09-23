"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Filter, User, Layers, Expand, Palette, Eye, ArrowUpRight } from "lucide-react"
import {
  ARTISTS_DATA,
  ALL_ARTWORKS,
  DEPARTMENTS,
  type ArtworkPiece,
  type Artist,
} from "@/lib/artworks-data"
import { ArtworkModal } from "@/components/ui/artwork-modal"

export default function ArtworksPage() {
  const [selectedDept, setSelectedDept] = useState("ALL")
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null)
  const [modalArtwork, setModalArtwork] = useState<ArtworkPiece | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "artists">("grid")

  const filteredArtworks = ALL_ARTWORKS.filter((art) => {
    const matchesDept = selectedDept === "ALL" || art.artistDeptShort === selectedDept
    const matchesArtist = !selectedArtist || art.artistName === selectedArtist.name
    return matchesDept && matchesArtist
  })

  const filteredArtists = ARTISTS_DATA.filter((artist) => {
    return selectedDept === "ALL" || artist.deptShort === selectedDept
  })

  const handleOpenModal = (artwork: ArtworkPiece) => {
    setModalArtwork(artwork)
    setIsModalOpen(true)
  }

  return (
    <main className="min-h-screen w-full bg-[#0c0e11] text-[#e2e8f0] selection:bg-amber-400 selection:text-black">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] h-[600px] bg-[radial-gradient(ellipse_at_top,#f59e0b15_0%,#3b82f610_35%,transparent_70%)] blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />
      </div>

      <div className="relative z-10 max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-16 pt-8 pb-32">
        <header className="flex items-center justify-between py-6 border-b border-white/10 mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono tracking-wider text-white/80 hover:text-white transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to the magazine</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/50">
              Gallery Exhibition
            </span>
          </div>
        </header>

        <section className="mb-16">
          <div className="max-w-4xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 mb-6">
              2025–26 · Visual Arts
            </p>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-light tracking-tight text-white leading-[0.95] uppercase mb-6">
              Visual Arts &amp; <br />
              <span className="font-serif italic text-amber-300 normal-case font-normal">
                Creative Expressions
              </span>
            </h1>
            <p className="text-white/60 font-serif text-lg sm:text-xl max-w-2xl leading-relaxed">
              Explore the spectrum of artistic talents from Government Engineering College Wayanad, featuring fine sketches, dynamic inks, oil paintings, and digital masterworks.
            </p>
          </div>
        </section>

        <section className="sticky top-4 z-30 mb-12 p-4 rounded-2xl bg-[#13171d]/90 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-white/40 mr-1 flex items-center gap-1.5">
              <Filter className="w-3 h-3" /> Department:
            </span>
            {DEPARTMENTS.map((dept) => (
              <button
                key={dept}
                onClick={() => {
                  setSelectedDept(dept)
                  setSelectedArtist(null)
                }}
                className={`px-3.5 py-1.5 rounded-full font-mono text-xs tracking-wider uppercase transition-all ${
                  selectedDept === dept
                    ? "bg-amber-400 text-black font-semibold shadow-md shadow-amber-400/20"
                    : "bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-white/5"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-xs transition-all ${
                viewMode === "grid"
                  ? "bg-white/20 text-white border border-white/30"
                  : "bg-white/5 text-white/50 hover:text-white"
              }`}
            >
              <Layers className="w-3.5 h-3.5" /> All Artworks ({filteredArtworks.length})
            </button>
            <button
              onClick={() => setViewMode("artists")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-xs transition-all ${
                viewMode === "artists"
                  ? "bg-white/20 text-white border border-white/30"
                  : "bg-white/5 text-white/50 hover:text-white"
              }`}
            >
              <User className="w-3.5 h-3.5" /> By Artist ({filteredArtists.length})
            </button>
          </div>
        </section>

        {viewMode === "grid" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredArtworks.map((artwork) => (
                <motion.div
                  key={artwork.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => handleOpenModal(artwork)}
                  className="group relative flex flex-col rounded-3xl bg-[#151921] hover:bg-[#1a202c] border border-white/10 hover:border-amber-400/40 p-5 transition-all duration-300 cursor-pointer shadow-xl hover:shadow-2xl overflow-hidden"
                >
                  <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-black/50 border border-white/5 mb-5">
                    <Image
                      src={artwork.src}
                      alt={artwork.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-400 text-black font-mono text-[10px] font-semibold uppercase tracking-wider shadow-lg">
                        <Expand className="w-3 h-3" /> Inspect Details
                      </span>
                    </div>
                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono text-white/80 border border-white/10">
                      {artwork.artistDeptShort}
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[10px] font-mono uppercase text-amber-400 tracking-wider mb-2">
                        <span>{artwork.medium}</span>
                        <span className="text-white/40">{artwork.artistSemester}</span>
                      </div>
                      <h3 className="font-sans text-lg font-medium text-white group-hover:text-amber-300 transition-colors line-clamp-1 mb-2">
                        {artwork.title}
                      </h3>
                      <p className="text-white/50 text-xs font-serif italic line-clamp-2 mb-6 leading-relaxed">
                        &ldquo;{artwork.description}&rdquo;
                      </p>
                    </div>

                    <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                      <div className="w-9 h-9 rounded-full overflow-hidden relative border border-white/20 shrink-0 bg-white/10">
                        <Image
                          src={artwork.artistAvatar}
                          alt={artwork.artistName}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-sans text-xs font-medium text-white truncate">
                          {artwork.artistName}
                        </span>
                        <span className="font-mono text-[10px] text-white/40 truncate">
                          {artwork.artistDepartment}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {viewMode === "artists" && (
          <div className="flex flex-col gap-16">
            {filteredArtists.map((artist) => (
              <div
                key={artist.id}
                className="p-8 sm:p-10 rounded-3xl bg-[#13171f] border border-white/10 shadow-2xl relative overflow-hidden"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10 mb-8">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden relative border border-white/20 shrink-0 shadow-lg bg-white/10">
                      <Image
                        src={artist.avatarSrc}
                        alt={artist.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20 font-mono text-[10px] uppercase">
                          {artist.deptShort}
                        </span>
                        <span className="font-mono text-[11px] text-white/40">
                          {artist.semester}
                        </span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-sans font-medium text-white">
                        {artist.name}
                      </h2>
                      <span className="font-mono text-xs text-white/50">
                        {artist.department} · {artist.ticketId}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 font-mono text-xs text-white/40">
                    <Palette className="w-4 h-4 text-amber-400" />
                    <span>{artist.artworks.length} Submitted Work{artist.artworks.length > 1 ? "s" : ""}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {artist.artworks.map((artwork) => (
                    <div
                      key={artwork.id}
                      onClick={() => handleOpenModal(artwork)}
                      className="group flex flex-col rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-amber-400/30 p-4 transition-all duration-300 cursor-pointer"
                    >
                      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-black/40 border border-white/5 mb-4">
                        <Image
                          src={artwork.src}
                          alt={artwork.title}
                          fill
                          sizes="(max-width: 640px) 100vw, 300px"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-amber-400 text-black flex items-center justify-center">
                            <Eye className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-amber-400 mb-1">
                        {artwork.medium}
                      </span>
                      <h4 className="font-sans text-sm font-medium text-white group-hover:text-amber-300 transition-colors line-clamp-1 mb-1">
                        {artwork.title}
                      </h4>
                      <p className="text-white/50 text-[11px] font-serif italic line-clamp-2 leading-relaxed">
                        &ldquo;{artwork.description}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ArtworkModal
        artwork={modalArtwork}
        allArtworks={filteredArtworks}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectArtwork={(art) => setModalArtwork(art)}
      />
    </main>
  )
}
