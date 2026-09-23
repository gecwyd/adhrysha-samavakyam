"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { resolveAsset } from "@/lib/asset-registry";
import { KALI_AUTHOR_NOTE, KALI_CHAPTERS } from "./kali-story-content";

const INK = "#17110d";
const PAPER = "#ead9ad";
const RED = "#c4382d";
const OCHRE = "#e4a72d";
const TEAL = "#1e6b68";

function PrintTexture() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-10 opacity-[0.16] mix-blend-multiply"
      style={{
        backgroundImage:
          "radial-gradient(circle at 20% 30%, #17110d 0 0.65px, transparent 0.8px), radial-gradient(circle at 75% 65%, #17110d 0 0.55px, transparent 0.75px)",
        backgroundSize: "7px 7px, 11px 11px",
      }}
    />
  );
}

function Starburst() {
  return (
    <div
      aria-hidden
      className="absolute left-1/2 top-1/2 aspect-square w-[155vw] max-w-[1080px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-90"
      style={{
        background: `repeating-conic-gradient(from -5deg, ${RED} 0deg 7deg, ${OCHRE} 7deg 14deg, ${PAPER} 14deg 17deg)`,
      }}
    />
  );
}

export function KaliStory() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="kali-the-black-goddess"
      aria-labelledby="kali-title"
      className="relative isolate overflow-hidden bg-[#17110d] text-[#17110d]"
      style={{ ["--paper" as string]: PAPER, ["--red" as string]: RED }}
    >
      <PrintTexture />

      <header className="relative min-h-[92svh] overflow-hidden border-y-[6px] border-[#17110d] bg-[#e4a72d]">
        <Starburst />
        <div className="absolute inset-3 z-20 border-2 border-[#17110d] sm:inset-6 sm:border-4" />

        <div className="relative z-30 mx-auto grid min-h-[92svh] max-w-[1440px] items-center gap-8 px-6 py-16 sm:px-12 lg:grid-cols-[1.05fr_0.95fr] lg:px-20">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -38 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative order-2 lg:order-1"
          >
            <p className="inline-block rotate-[-2deg] border-2 border-[#17110d] bg-[#ead9ad] px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.28em] shadow-[4px_4px_0_#17110d] sm:text-[11px]">
              A retro pulp presentation · Short story
            </p>
            <h2
              id="kali-title"
              className="mt-7 max-w-[800px] font-heading text-[clamp(6rem,19vw,15rem)] uppercase leading-[0.68] tracking-[-0.045em] text-[#17110d] [text-shadow:5px_5px_0_#ead9ad]"
            >
              Kali
            </h2>
            <p className="mt-5 max-w-2xl font-heading text-[clamp(2.1rem,6vw,5.3rem)] uppercase leading-[0.85] tracking-[0.01em] text-[#ead9ad] [text-shadow:3px_3px_0_#17110d]">
              The Black Goddess
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3 font-mono text-[9px] font-bold uppercase tracking-[0.22em] sm:text-[10px]">
              <span className="border-2 border-[#17110d] bg-[#c4382d] px-3 py-2 text-[#ead9ad]">Kerala · 1880s</span>
              <span className="border-2 border-[#17110d] bg-[#ead9ad] px-3 py-2">Myth · Love · Justice</span>
              <span className="border-2 border-[#17110d] bg-[#1e6b68] px-3 py-2 text-[#ead9ad]">4 Chapters</span>
            </div>
          </motion.div>

          <motion.figure
            initial={reduceMotion ? false : { opacity: 0, rotate: 4, scale: 0.92 }}
            whileInView={{ opacity: 1, rotate: -2, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative order-1 mx-auto w-[min(72vw,410px)] lg:order-2 lg:w-[min(34vw,510px)]"
          >
            <div className="absolute -inset-3 translate-x-4 translate-y-4 bg-[#17110d]" />
            <div className="relative aspect-[511/670] overflow-hidden border-4 border-[#17110d] bg-[#ead9ad] p-2">
              <div className="relative h-full overflow-hidden border-2 border-[#17110d] bg-[#ead9ad]">
                <Image
                  src={resolveAsset("kali-statue.webp")}
                  alt="Statue of goddess Kali, reproduced from the submitted story document"
                  fill
                  priority={false}
                  sizes="(min-width: 1024px) 34vw, 72vw"
                  className="object-cover grayscale contrast-125 mix-blend-multiply"
                />
                <div className="absolute inset-0 bg-[#c4382d]/25 mix-blend-color-burn" />
              </div>
            </div>
            <figcaption className="absolute -bottom-5 left-1/2 w-[85%] -translate-x-1/2 rotate-1 border-2 border-[#17110d] bg-[#ead9ad] px-3 py-2 text-center font-mono text-[8px] font-bold uppercase tracking-[0.2em] shadow-[3px_3px_0_#17110d] sm:text-[9px]">
              The goddess rises where injustice reigns
            </figcaption>
          </motion.figure>
        </div>
      </header>

      <div className="relative z-20 bg-[#ead9ad] px-5 py-16 sm:px-10 sm:py-24 lg:px-16">
        <div className="mx-auto max-w-[1240px]">
          <div className="grid gap-8 border-b-4 border-[#17110d] pb-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14">
            <div>
              <h3 className="font-heading text-[clamp(3.8rem,9vw,8rem)] uppercase leading-[0.78]">
                Four chapters. One descent.
              </h3>
            </div>
            <p className="max-w-3xl self-end font-serif text-lg leading-[1.7] sm:text-xl">
              In nineteenth-century Chittur, a forbidden love, a family&apos;s hunger for land and the old legend of Badrakali and Dharika move toward one violent, divine reckoning.
            </p>
          </div>

          <nav aria-label="Jump to a chapter" className="mt-8 grid grid-cols-2 border-l-2 border-t-2 border-[#17110d] lg:grid-cols-4">
            {KALI_CHAPTERS.map((item, index) => (
              <a
                key={item.numeral}
                href={`#kali-chapter-${item.numeral.toLowerCase()}`}
                className="group min-h-28 border-b-2 border-r-2 border-[#17110d] bg-[#ead9ad] p-4 text-left transition-colors hover:bg-[#e4a72d] sm:min-h-32 sm:p-6"
              >
                <span className="font-heading text-5xl leading-none text-[#c4382d] sm:text-6xl">{item.numeral}</span>
                <span className="mt-3 block font-mono text-[8px] font-bold uppercase tracking-[0.19em] sm:text-[9px]">{item.title}</span>
                <span className="mt-2 block font-mono text-[7px] uppercase tracking-[0.18em] opacity-50">Scroll to {String(index + 1).padStart(2, "0")} ↓</span>
              </a>
            ))}
          </nav>

          <div className="mt-10 grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-14">
            <aside className="lg:sticky lg:top-8 lg:self-start">
              <div className="relative aspect-[514/664] overflow-hidden border-4 border-[#17110d] bg-[#1e6b68] shadow-[8px_8px_0_#c4382d]">
                <Image
                  src={resolveAsset("kali-closeup.webp")}
                  alt="Close-up of a Kali statue from the submitted story document"
                  fill
                  sizes="280px"
                  className="object-cover grayscale contrast-150 mix-blend-multiply"
                />
                <div className="absolute inset-0 bg-[#1e6b68]/45 mix-blend-color" />
                <span className="absolute bottom-3 left-3 bg-[#ead9ad] px-2 py-1 font-mono text-[8px] font-bold uppercase tracking-[0.2em]">
                  File plate · 02
                </span>
              </div>
              <div className="mt-8 border-2 border-[#17110d] bg-[#e4a72d] p-4 font-mono text-[9px] font-bold uppercase leading-[1.8] tracking-[0.17em]">
                <span className="block text-[#c4382d]">Content note</span>
                This story contains caste discrimination, physical violence and death.
              </div>
            </aside>

            <article className="min-w-0 border-t-4 border-[#17110d]">
              {KALI_CHAPTERS.map((chapter, chapterIndex) => (
                <motion.section
                  id={`kali-chapter-${chapter.numeral.toLowerCase()}`}
                  key={chapter.numeral}
                  initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-8% 0px" }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  className="scroll-mt-8 border-b-4 border-[#17110d] py-12 first:pt-7 sm:py-20"
                >
                  <div className="flex items-start justify-between gap-6 border-b-2 border-[#17110d] pb-6">
                    <div>
                      <p className="font-mono text-[9px] font-bold uppercase tracking-[0.28em] text-[#c4382d]">
                        Chapter {chapter.numeral} · {String(chapterIndex + 1).padStart(2, "0")} / {String(KALI_CHAPTERS.length).padStart(2, "0")}
                      </p>
                      <h3 className="mt-2 font-heading text-[clamp(3.4rem,8vw,7rem)] uppercase leading-[0.8]">{chapter.title}</h3>
                      <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.2em] text-[#17110d]/60">{chapter.subtitle}</p>
                    </div>
                    <span aria-hidden className="hidden font-heading text-8xl leading-none text-[#c4382d]/20 sm:block">{chapter.numeral}</span>
                  </div>

                  <div className="mt-8 space-y-7 font-serif text-[17px] leading-[1.9] text-[#17110d]/90 sm:text-[19px] sm:leading-[2] [&>p:first-child:first-letter]:float-left [&>p:first-child:first-letter]:mr-3 [&>p:first-child:first-letter]:font-heading [&>p:first-child:first-letter]:text-8xl [&>p:first-child:first-letter]:leading-[0.75] [&>p:first-child:first-letter]:text-[#c4382d]">
                    {chapter.body.map((paragraph, paragraphIndex) => (
                      <p key={`${chapter.numeral}-${paragraphIndex}`}>{paragraph}</p>
                    ))}
                  </div>

                  <div className="mt-12 flex items-center justify-between border-t-2 border-[#17110d] pt-4 font-mono text-[9px] font-bold uppercase tracking-[0.19em]">
                    <span>{chapterIndex === KALI_CHAPTERS.length - 1 ? "End of story" : `Continue to chapter ${KALI_CHAPTERS[chapterIndex + 1].numeral}`}</span>
                    <a href="#kali-the-black-goddess" className="text-[#c4382d] hover:underline">Back to cover ↑</a>
                  </div>
                </motion.section>
              ))}
            </article>
          </div>

          <footer className="mt-20 grid overflow-hidden border-4 border-[#17110d] bg-[#1e6b68] text-[#ead9ad] lg:grid-cols-[260px_1fr]">
            <div className="relative min-h-[280px] border-b-4 border-[#17110d] bg-[#17110d] lg:border-b-0 lg:border-r-4">
              <Image
                src={resolveAsset("arjun-krishna-kali.webp")}
                alt="Arjun Krishna, author of Kali — The Black Goddess"
                fill
                sizes="260px"
                className="object-cover grayscale contrast-125"
              />
              <div className="absolute inset-0 bg-[#c4382d]/20 mix-blend-color" />
            </div>
            <div className="p-6 sm:p-10 lg:p-12">
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-[#e4a72d]">About the author</p>
              <h3 className="mt-3 font-heading text-5xl uppercase leading-none sm:text-7xl">Arjun Krishna</h3>
              <p className="mt-6 max-w-3xl font-serif text-base leading-[1.8] text-[#ead9ad]/85 sm:text-lg">{KALI_AUTHOR_NOTE}</p>
            </div>
          </footer>
        </div>
      </div>

      <div className="relative z-20 flex overflow-hidden border-y-4 border-[#17110d] bg-[#c4382d] py-3 text-[#ead9ad]">
        <p className="min-w-max font-heading text-3xl uppercase tracking-[0.12em] sm:text-4xl">
          Kali · Badrakali · Chittur · Love · Fury · Justice · Kali · Badrakali · Chittur · Love · Fury · Justice ·
        </p>
      </div>
    </section>
  );
}

export default KaliStory;
