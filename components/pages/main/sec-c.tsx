"use client"

import { motion, useInView } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { useAudio } from "@/context/audio.context"
import { resolveAsset } from "@/lib/asset-registry"
import { preload } from "@/lib/preload"
import { cn } from "@/lib/utils"

interface DignitaryItem {
  id: string
  name: string
  title: string
  message: string
  image: string
  initials: string
  category?: string
}

const DIGNITARIES: DignitaryItem[] = [
  {
    id: "vds",
    name: "Shri. V. D. Satheesan",
    title: "Leader of Opposition, Kerala",
    message: "Technical education empowers our youth to innovate and lead. The vibrant energy and creative spirit of Government Engineering College Wayanad are truly commendable.",
    image: resolveAsset("vds.webp"),
    initials: "VDS",
  },
  {
    id: "pg",
    name: "Smt. Priyanka Gandhi",
    title: "Member of Parliament, Wayanad",
    message: "The youth of Wayanad possess immense potential and passion. This magazine beautifully captures their dynamic energy, dedication, and aspirations for a brighter future.",
    image: resolveAsset("pyg.webp"),
    initials: "PG",
  },
  {
    id: "he_minister",
    name: "Shri. Roji M. John",
    title: "MLA, Angamaly",
    message: "Higher education must inspire curiosity, critical thinking, and innovation. The students of Government Engineering College Wayanad embody this creative pursuit.",
    image: resolveAsset("roji.webp"),
    initials: "RMJ",
  },
  {
    id: "krishi_minister",
    name: "Shri. T. Siddique",
    title: "MLA, Kalpetta",
    message: "It brings great pride to see the technical excellence of our students taking a creative form. This initiative is a testament to the vibrant community at GECW.",
    image: resolveAsset("siddique.webp"),
    initials: "TS",
  },
  {
    id: "usha",
    name: "Smt. Usha Vijayan",
    title: "MLA, Mananthavady",
    message: "Education and creative expression are the foundations of true progress. It is inspiring to see the students of Government Engineering College Wayanad channeling their talents into this wonderful magazine.",
    image: resolveAsset("usha.webp"),
    initials: "UV",
  },
  {
    id: "principal",
    name: "Dr. V. R. Rajeev",
    title: "Principal, GEC Wayanad",
    category: "Principal's Note",
    message: "True education extends beyond classrooms and laboratories into boundless imagination. This magazine stands as a powerful mirror to our students' intellect, artistic voice, and academic excellence.",
    image: resolveAsset("rajeev.webp"),
    initials: "VRR",
  },
  {
    id: "staff_advisor",
    name: "Dr. Brijmohan K",
    title: "Staff Advisor, Sathva College Union",
    category: "Staff Advisor's Note",
    message: "Guiding this creative pursuit has been an enriching experience. The depth of expression, critical thought, and passion poured into this magazine reflect the vibrant spirit of our students.",
    image: resolveAsset("brijmohan.webp"),
    initials: "BK",
  },
  {
    id: "editor",
    name: "Adhil Muhammed K",
    title: "Magazine Editor, Sathva College Union",
    category: "Editor's Note",
    message: "This magazine is a canvas of our collective stories, unyielding voices, and shared dreams. It stands as a testament to the creative resilience and vibrant spirit of every student at GEC Wayanad.",
    image: resolveAsset("adhil.webp"),
    initials: "AMK",
  },
]

function Avatar({ item }: { item: DignitaryItem }) {
  const [imgError, setImgError] = useState(false)
  return (
    <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden ring-2 ring-black/15 shrink-0 bg-neutral-200">
      {!imgError ? (
        <img
          src={item.image}
          alt={item.name}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover object-top grayscale"
        />
      ) : (
        <div className="w-full h-full bg-neutral-800 flex items-center justify-center">
          <span className="text-white/50 text-xs font-mono tracking-widest uppercase">{item.initials}</span>
        </div>
      )}
    </div>
  )
}

function FeaturedCard({ item, index }: { item: DignitaryItem; index: number }) {
  const [imgError, setImgError] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
      className={cn(
        "group relative w-full flex flex-col md:flex-row overflow-hidden border-b border-black/10 last:border-b-0",
        index % 2 === 1 && "md:flex-row-reverse"
      )}
    >
      {/* Image Panel */}
      <div className="relative w-full md:w-[38%] lg:w-[35%] shrink-0 overflow-hidden bg-neutral-900" style={{ minHeight: "340px" }}>
        {!imgError ? (
          <img
            src={item.image}
            alt={item.name}
            onError={() => setImgError(true)}
            className="absolute inset-0 w-full h-full object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-700 ease-out"
          />
        ) : (
          <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center">
            <span className="font-heading text-[5rem] text-white/10 tracking-widest uppercase select-none">{item.initials}</span>
          </div>
        )}
        {/* Gradient overlay for text contrast on mobile */}
        <div className={cn(
          "absolute inset-0 pointer-events-none",
          index % 2 === 0
            ? "bg-gradient-to-r from-transparent to-[#d9d4c7] hidden md:block"
            : "bg-gradient-to-l from-transparent to-[#d9d4c7] hidden md:block"
        )} />
        {/* Category badge pinned bottom-left */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:hidden bg-gradient-to-t from-black/60 to-transparent">
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/70">
            {item.category ?? "Voices of Support"}
          </span>
        </div>
      </div>

      {/* Content Panel */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 md:px-12 md:py-16 lg:px-16 lg:py-20">
        {/* Category label */}
        <div className="hidden md:flex items-center gap-3 mb-8">
          <div className="w-5 h-px bg-black/40" />
          <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-black/50">
            {item.category ?? "Voices of Support"}
          </span>
        </div>

        {/* Opening quotation mark */}
        <div
          aria-hidden
          className="font-serif text-[5rem] md:text-[7rem] leading-none text-black/10 -mb-4 md:-mb-6 select-none"
          style={{ fontFamily: "Georgia, serif", lineHeight: 1 }}
        >
          &ldquo;
        </div>

        {/* Quote text */}
        <blockquote
          className="text-[1.2rem] sm:text-[1.4rem] md:text-[1.6rem] lg:text-[1.8rem] leading-[1.6] text-black/80 font-serif tracking-normal"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          {item.message}
        </blockquote>

        {/* Divider */}
        <div className="flex items-center gap-4 my-8">
          <div className="w-12 h-[1.5px] bg-black/25" />
        </div>

        {/* Name & Title */}
        <div>
          <p className="font-heading text-lg md:text-xl lg:text-2xl font-black uppercase tracking-widest text-black leading-tight">
            {item.name}
          </p>
          <p className="text-[11px] md:text-xs font-mono uppercase tracking-[0.22em] text-black/50 mt-2">
            {item.title}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

function CompactCard({ item, index }: { item: DignitaryItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
      className="flex flex-col gap-5 p-6 sm:p-8 md:p-10 border border-black/10 bg-white/20 hover:bg-white/35 transition-colors duration-500"
    >
      {/* Top row: avatar + name */}
      <div className="flex items-center gap-4">
        <Avatar item={item} />
        <div>
          <p className="font-heading text-sm md:text-base font-black uppercase tracking-wider text-black leading-tight">
            {item.name}
          </p>
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-black/50 mt-1">
            {item.title}
          </p>
        </div>
      </div>

      {/* Quote */}
      <p
        className="text-base md:text-lg leading-[1.7] text-black/75 font-serif"
        style={{ fontFamily: "'Georgia', serif" }}
      >
        &ldquo;{item.message}&rdquo;
      </p>
    </motion.div>
  )
}

export function SecC() {
  const { playAudio } = useAudio()

  useEffect(() => {
    DIGNITARIES.forEach((item) => {
      preload(item.image, "image")
    })
  }, [])

  const featured = DIGNITARIES.slice(0, 3)
  const compact = DIGNITARIES.slice(3)

  return (
    <section
      id="sec-c"
      className="relative w-full bg-[#d9d4c7] text-black z-20 overflow-hidden"
    >
      <motion.div
        onViewportEnter={() => playAudio?.(resolveAsset("intro.mp3"), 2)}
        className="relative z-10 w-full"
      >
        {/* Section header */}
        <div className="w-full px-6 md:px-16 pt-20 pb-12 md:pt-28 md:pb-16 border-b border-black/10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end gap-4 md:gap-0 md:justify-between">
            <div>
              <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-black/40 mb-3">Section II</p>
              <h2 className="font-heading text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] font-black uppercase tracking-tight leading-[0.9] text-black">
                Voices &amp;<br />
                <span className="text-black/30">Greetings</span>
              </h2>
            </div>
            <p className="text-sm md:text-base font-serif text-black/55 max-w-xs leading-relaxed" style={{ fontFamily: "'Georgia', serif" }}>
              Words of encouragement from those who believe in the power of young voices.
            </p>
          </div>
        </div>

        {/* Featured full-bleed rows — first 3 dignitaries */}
        <div className="w-full">
          {featured.map((item, i) => (
            <FeaturedCard key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* Compact grid — remaining dignitaries */}
        <div className="w-full border-t border-black/10">
          <div className="max-w-7xl mx-auto px-6 md:px-16 py-16 md:py-24">
            <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-black/35 mb-10">From the institution</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {compact.map((item, i) => (
                <CompactCard key={item.id} item={item} index={i} />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default SecC
