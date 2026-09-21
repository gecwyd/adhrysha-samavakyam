"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
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
  }
]

function DignitaryRow({ item, index }: { item: DignitaryItem; index: number }) {
  const [imgError, setImgError] = useState(false)

  return (
    <div className="relative w-full min-h-[75vh] md:min-h-[85vh] flex items-center justify-center py-16 sm:py-20 md:py-24 px-6 sm:px-10 md:px-16 lg:px-24 border-b border-black/10 last:border-b-0">
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 sm:gap-10 md:gap-16 lg:gap-24",
          index % 2 === 1 && "md:flex-row-reverse"
        )}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-sm sm:max-w-md md:max-w-none md:w-5/12 lg:w-5/12 aspect-[3/4] sm:aspect-[4/5] md:h-[62vh] max-h-[600px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl relative bg-black/5 shrink-0 border border-black/10"
        >
          {!imgError ? (
            <img
              src={item.image}
              alt={item.name}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover object-top filter grayscale hover:grayscale-0 transition-all duration-700 ease-out"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-neutral-800 via-neutral-900 to-black flex flex-col items-center justify-center p-8 text-neutral-300">
              <span className="font-heading text-7xl md:text-8xl text-white/20 tracking-widest uppercase select-none">
                {item.initials}
              </span>
              <span className="text-xs uppercase tracking-[0.3em] font-mono text-neutral-400 mt-4 text-center">
                {item.name}
              </span>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: index % 2 === 1 ? -25 : 25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 flex flex-col justify-center text-left lg:px-4"
        >
          <div className="flex items-center gap-2.5 text-black/50 font-mono text-[11px] sm:text-xs tracking-[0.25em] uppercase mb-4 sm:mb-6">
            <span className="w-2 h-2 rounded-full bg-black/60" />
            <span className="font-bold">{item.category || "Voices of Support"}</span>
          </div>

          <blockquote className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif text-black/90 leading-relaxed md:leading-snug tracking-tight">
            &ldquo;{item.message}&rdquo;
          </blockquote>

          <div className="w-16 sm:w-20 h-[2px] bg-black/30 my-6 sm:my-8" />

          <div>
            <h3 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-heading font-black uppercase tracking-wider text-black leading-tight">
              {item.name}
            </h3>
            <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.18em] text-black/60 mt-1.5 font-bold">
              {item.title}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export function SecC() {
  const { playAudio } = useAudio()

  useEffect(() => {
    DIGNITARIES.forEach((item) => {
      preload(item.image, "image")
    })
    preload("https://www.transparenttextures.com/patterns/cubes.png", "image")
  }, [])

  return (
    <section
      id="sec-c"
      className="relative w-full bg-[#d9d4c7] text-black z-20 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none z-0"
        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}
      />

      <motion.div
        onViewportEnter={() => playAudio?.(resolveAsset("intro.mp3"), 2)}
        className="relative z-10 w-full"
      >
        {DIGNITARIES.map((item, index) => (
          <DignitaryRow
            key={item.id}
            item={item}
            index={index}
          />
        ))}
      </motion.div>
    </section>
  )
}

export default SecC
