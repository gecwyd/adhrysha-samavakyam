"use client"

import { useState } from "react"
import Image from "next/image"
import { Plus } from "lucide-react"
import {
  ARTISTS_DATA,
  ALL_ARTWORKS,
  type ArtworkPiece,
} from "@/lib/artworks-data"
import { ArtworkModal } from "@/components/ui/artwork-modal"

function MasonryTile({
  artwork,
  onClick,
}: {
  artwork: ArtworkPiece
  onClick: () => void
}) {
  const paddingBottom = `${Math.round((1 / artwork.aspectRatio) * 100)}%`

  return (
    <div
      className="group relative break-inside-avoid mb-2 sm:mb-1 cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      <div className="relative w-full overflow-hidden" style={{ paddingBottom }}>
        <Image
          src={artwork.src}
          alt={artwork.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <p className="font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-amber-400 mb-0.5">
            {artwork.medium}
          </p>
          <h4 className="font-sans text-xs sm:text-sm font-semibold text-white leading-tight line-clamp-1">
            {artwork.title}
          </h4>
          <div className="flex items-center gap-1.5 mt-1.5">
            <div className="w-4 h-4 rounded-full overflow-hidden relative shrink-0 border border-white/20">
              <Image src={artwork.artistAvatar} alt={artwork.artistName} fill className="object-cover" />
            </div>
            <span className="text-white/70 text-[9px] sm:text-[10px] font-sans truncate">{artwork.artistName}</span>
          </div>
        </div>

        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
            <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function ArtworksGallery() {
  const [modalArtwork, setModalArtwork] = useState<ArtworkPiece | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const col1 = ALL_ARTWORKS.filter((_, i) => i % 2 === 0)
  const col2 = ALL_ARTWORKS.filter((_, i) => i % 2 === 1)

  return (
    <section
      id="sec-artworks-gallery"
      className="relative w-full bg-black text-white selection:bg-amber-400 selection:text-black"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="px-5 sm:px-10 lg:px-16 pt-16 sm:pt-24 pb-8 sm:pb-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-8">
          <div>
            <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] uppercase text-white/30 mb-3 sm:mb-5">
              Inquation 2025–26 · Visual Arts
            </p>
            <h2 className="font-heading text-[18vw] sm:text-[9vw] lg:text-[7vw] font-light uppercase leading-none tracking-tight text-white">
              ART
            </h2>
            <h2 className="font-heading text-[18vw] sm:text-[9vw] lg:text-[7vw] font-light uppercase leading-none tracking-tight text-amber-300 -mt-1 sm:-mt-2">
              &amp; Expression
            </h2>
          </div>

          <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 pb-1">
            <p className="font-mono text-[9px] sm:text-xs uppercase tracking-widest text-white/60">
              Curated Exhibition
            </p>
            <p className="font-mono text-[9px] sm:text-[10px] text-white/30">
              {ALL_ARTWORKS.length} works · {ARTISTS_DATA.length} artists
            </p>
          </div>
        </div>
      </div>

      {/* Mobile: 2-column flex layout with generous gap */}
      <div className="sm:hidden flex gap-2 px-2">
        <div className="flex-1 flex flex-col gap-2">
          {col1.map((artwork) => (
            <MasonryTile
              key={artwork.id}
              artwork={artwork}
              onClick={() => {
                setModalArtwork(artwork)
                setIsModalOpen(true)
              }}
            />
          ))}
        </div>
        <div className="flex-1 flex flex-col gap-2 mt-8">
          {col2.map((artwork) => (
            <MasonryTile
              key={artwork.id}
              artwork={artwork}
              onClick={() => {
                setModalArtwork(artwork)
                setIsModalOpen(true)
              }}
            />
          ))}
        </div>
      </div>

      {/* Desktop: CSS masonry 3 columns */}
      <div
        className="hidden sm:block w-full px-1"
        style={{ columnCount: 3, columnGap: "4px" }}
      >
        {ALL_ARTWORKS.map((artwork) => (
          <MasonryTile
            key={artwork.id}
            artwork={artwork}
            onClick={() => {
              setModalArtwork(artwork)
              setIsModalOpen(true)
            }}
          />
        ))}
      </div>

      <div className="px-5 sm:px-10 lg:px-16 pt-12 sm:pt-16 pb-20 sm:pb-24">
        <p className="text-white/20 font-mono text-[10px] uppercase tracking-widest mb-1">
          GEC Wayanad
        </p>
        <p className="text-white/40 font-serif italic text-sm sm:text-base">
          Inquation Annual Magazine · Visual Arts Edition
        </p>
      </div>

      <ArtworkModal
        artwork={modalArtwork}
        allArtworks={ALL_ARTWORKS}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectArtwork={(art) => setModalArtwork(art)}
      />
    </section>
  )
}
