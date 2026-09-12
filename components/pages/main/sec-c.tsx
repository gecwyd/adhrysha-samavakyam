"use client"

import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { useAudio } from "@/context/audio.context"
import { resolveAsset } from "@/lib/asset-registry"
import { preload } from "@/lib/preload"

interface DignitaryItem {
  id: string
  name: string
  title: string
  message: string
  image: string
  initials: string
}

const DIGNITARIES: DignitaryItem[] = [
  {
    id: "vds",
    name: "Shri. V. D. Satheesan",
    title: "Chief Minister, Kerala",
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
    id: "usha",
    name: "Smt. Usha Vijayan",
    title: "MLA, Mananthavady",
    message: "Education and creative expression are the foundations of true progress. It is inspiring to see the students of Government Engineering College Wayanad channeling their talents into this wonderful magazine.",
    image: resolveAsset("usha.webp"),
    initials: "UV",
  },
  {
    id: "he_minister",
    name: "Shri. Roji M. John",
    title: "Minister for Higher Education, Kerala",
    message: "Higher education must inspire curiosity, critical thinking, and innovation. The students of Government Engineering College Wayanad embody this creative pursuit.",
    image: resolveAsset("roji.webp"),
    initials: "RMJ",
  },
  {
    id: "krishi_minister",
    name: "Shri. T. Siddique",
    title: "Minister for Agriculture, Kerala",
    message: "It brings great pride to see the technical excellence of our students taking a creative form. This initiative is a testament to the vibrant community at GECW.",
    image: resolveAsset("siddique.webp"),
    initials: "TS",
  }
]

function DignitaryRow({
  item,
  index,
  total
}: {
  item: DignitaryItem
  index: number
  total: number
}) {
  const rowRef = useRef<HTMLDivElement>(null)
  const [imgError, setImgError] = useState(false)

  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start start", "end end"]
  })

  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24
  })

  const isFirst = index === 0

  const animatedPadTop = useTransform(smooth, [0, 0.2], ["2.5rem", "0rem"])
  const animatedPadLeft = useTransform(smooth, [0, 0.2], ["2.5rem", "0rem"])
  const animatedPadBottom = useTransform(smooth, [0, 0.2], ["2.5rem", "0rem"])
  const animatedPadRight = useTransform(smooth, [0, 0.2], ["1.5rem", "0rem"])
  const animatedImgHeight = useTransform(smooth, [0, 0.2], ["85%", "100%"])
  const animatedImgRadius = useTransform(smooth, [0, 0.2], ["24px", "0px"])

  const padTop = isFirst ? animatedPadTop : "0rem"
  const padLeft = isFirst ? animatedPadLeft : "0rem"
  const padBottom = isFirst ? animatedPadBottom : "0rem"
  const padRight = isFirst ? animatedPadRight : "0rem"
  const imgHeight = isFirst ? animatedImgHeight : "100%"
  const imgRadius = isFirst ? animatedImgRadius : "0px"
  const imgFilter = useTransform(
    smooth,
    [0, 0.2],
    ["grayscale(100%) contrast(1.15)", "grayscale(0%) contrast(1.05)"]
  )
  const imgScale = useTransform(smooth, [0, 0.2, 0.85, 1], [1.1, 1, 1, 1.05])

  const textOpacity = useTransform(smooth, [0.08, 0.22], [0, 1])
  const textY = useTransform(smooth, [0.08, 0.22], [40, 0])
  const textScale = useTransform(smooth, [0.08, 0.22], [0.96, 1])

  const readingProgress = useTransform(smooth, [0.2, 0.85], [0, 1])
  const readyBadgeOpacity = useTransform(smooth, [0.15, 0.22, 0.85, 0.92], [0, 1, 1, 0])

  const rowOpacity = useTransform(smooth, [0.86, 0.98], [1, 0.12])
  const rowScale = useTransform(smooth, [0.86, 0.98], [1, 0.96])

  return (
    <div
      ref={rowRef}
      className="relative h-[280vh] w-full bg-[#d9d4c7] text-black snap-start scroll-mt-0"
    >
      <motion.div
        style={{
          opacity: rowOpacity,
          scale: rowScale
        }}
        className="sticky top-0 h-screen w-full flex flex-col md:flex-row overflow-hidden bg-[#d9d4c7]"
      >
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none z-0"
          style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}
        />

        <motion.div
          style={{
            paddingTop: padTop,
            paddingLeft: padLeft,
            paddingBottom: padBottom,
            paddingRight: padRight
          }}
          className="w-full md:w-5/12 lg:w-[46vw] h-[42vh] md:h-full flex flex-col justify-start items-start shrink-0 relative z-20"
        >
          <motion.div
            style={{
              height: imgHeight,
              borderRadius: imgRadius
            }}
            className="w-full relative overflow-hidden bg-neutral-900 shadow-2xl transition-shadow flex items-center justify-center"
          >
            {!imgError ? (
              <motion.img
                src={item.image}
                alt={item.name}
                style={{
                  scale: imgScale,
                  filter: imgFilter
                }}
                onError={() => setImgError(true)}
                className="w-full h-full object-cover object-top transition-all duration-300"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-neutral-800 via-neutral-900 to-black flex flex-col items-center justify-center p-8 text-neutral-300">
                <span className="font-heading text-7xl md:text-9xl text-white/20 tracking-widest uppercase select-none">
                  {item.initials}
                </span>
                <span className="text-xs uppercase tracking-[0.3em] font-mono text-neutral-400 mt-4">
                  {item.name}
                </span>
              </div>
            )}
          </motion.div>
        </motion.div>

        <div className="w-full md:w-7/12 lg:w-[54vw] flex-1 md:h-full flex flex-col justify-start md:justify-center pt-4 sm:pt-8 md:pt-0 px-6 sm:px-10 md:px-14 lg:px-20 relative z-10 overflow-hidden">
          <div className="flex items-center gap-2 text-black/50 font-mono text-[10px] sm:text-xs tracking-[0.3em] uppercase mb-6 lg:mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-black/40 hidden sm:block" />
            <span>Voices of Support</span>
          </div>

          <motion.div
            style={{
              opacity: textOpacity,
              y: textY,
              scale: textScale
            }}
            className="relative flex flex-col max-w-2xl"
          >
            <span className="font-serif text-[60px] sm:text-[120px] text-black/10 select-none absolute -top-6 sm:-top-16 -left-2 sm:-left-8 pointer-events-none leading-none z-0">
              “
            </span>
            <blockquote className="text-base sm:text-lg md:text-2xl lg:text-3xl font-serif text-black/90 leading-snug md:leading-relaxed relative z-10 tracking-tight">
              {item.message}
            </blockquote>

            <div className="w-full max-w-md h-[2px] bg-black/10 my-4 md:my-6 relative overflow-hidden">
              <motion.div
                style={{ scaleX: readingProgress }}
                className="h-full bg-black/60 origin-left"
              />
            </div>

            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading uppercase tracking-wider text-black">
                {item.name}
              </h3>
              <p className="text-[10px] sm:text-[11px] md:text-xs font-mono uppercase tracking-[0.25em] text-black/60 mt-1 font-semibold">
                {item.title}
              </p>
            </div>
          </motion.div>
        </div>
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
      className="relative w-full bg-[#d9d4c7] text-black z-20 snap-y snap-proximity"
    >
      <motion.div
        onViewportEnter={() => playAudio?.(resolveAsset("intro.mp3"), 2)}
      >
        {DIGNITARIES.map((item, index) => (
          <DignitaryRow
            key={item.id}
            item={item}
            index={index}
            total={DIGNITARIES.length}
          />
        ))}
      </motion.div>
    </section>
  )
}

export default SecC
