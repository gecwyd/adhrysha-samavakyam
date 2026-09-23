"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { resolveAsset } from "@/lib/asset-registry";
import { Sprout } from "lucide-react";

const STANZAS = [
  ["അല്ലയോ പൂവേ!", "നീ ജന്മം നൽകും", "പൂമൊട്ടുകൾക്കെന്തൊരു കാന്തി!"],
  [
    "ചിത്രപതംഗം തേൻ നുകരുന്ന",
    "എളിമയാർന്ന ഗാത്രത്തിനുടമേ!",
    "ആരും കൊതിക്കുന്ന ശോഭയാൽ",
    "തിളങ്ങുന്ന മഹിതേ!",
  ],
  ["നിൻ പൂമൊട്ടുകൾ ഉല്ലസിക്കുന്ന", "ആതപാർന്ന ഈ വേളയിൽ", "പകരൂ നീ നന്മ തൻ തൂവെളിച്ചം"],
  [
    "മർത്ത്യർ കൊതിക്കുന്ന കാന്തിയാർന്ന",
    "പ്രിയ ലളിതേ !",
    "വളർന്നു തുടങ്ങുന്ന പൂമൊട്ടുകൾ",
    "വിടരട്ടെ നന്മയുടെ വിരിഞ്ഞ പുഷ്പങ്ങളായ്",
  ],
  ["പറയൂ പകരൂ നീ നന്മതൻ പ്രിയസ്വപ്നങ്ങൾ", "ക്വാണമോടംബര ഛായയിൽ", "വളരും മൊട്ടുകൾ വിടരട്ടേ നന്മയാൽ"],
];

function ScrollLine({ children, accent }: { children: React.ReactNode; accent: boolean }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "end 15%"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.88, 1, 1, 0.88]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.15, 1, 1, 0.15]);
  const y = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [18, 0, 0, -18]);

  return (
    <motion.p
      ref={ref}
      style={{ scale, opacity, y, transformOrigin: "left center" }}
      className={`font-light italic tracking-wide text-[22px] leading-[1.7] sm:text-[26px] md:text-[32px] md:leading-[1.75] ${
        accent ? "text-[#bef264]" : "text-[#ecfccb]"
      }`}
      lang="ml"
    >
      {children}
    </motion.p>
  );
}

function StanzaBlock({ lines, accent }: { lines: string[]; accent: boolean }) {
  return (
    <div className="mb-16 flex flex-col items-start gap-3 sm:mb-20 sm:gap-4">
      {lines.map((line, i) => (
        <ScrollLine key={i} accent={accent}>
          {line}
        </ScrollLine>
      ))}
    </div>
  );
}

export function Nanmayude() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 25, stiffness: 80 });
  const rotate = useTransform(smoothProgress, [0, 1], [0, 360]);
  const imageY = useTransform(smoothProgress, [0, 1], [0, -100]);
  const imageScale = useTransform(smoothProgress, [0, 1], [1, 1.12]);

  const authorRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: authorProgress } = useScroll({
    target: authorRef,
    offset: ["start 95%", "center 70%"],
  });
  const authorScale = useTransform(authorProgress, [0, 1], [0.9, 1]);
  const authorOpacity = useTransform(authorProgress, [0, 1], [0.3, 1]);

  return (
    <section
      ref={containerRef}
      id="sec-nanmayude"
      className="relative w-full overflow-hidden bg-[#052e16] text-[#ecfccb] selection:bg-[#bef264]/30 selection:text-[#052e16]"
    >
      {/* Ambient parallax background */}
      <div className="pointer-events-none absolute inset-0 select-none overflow-hidden">
        <motion.div style={{ y: imageY, scale: imageScale }} className="absolute inset-0 -top-[10%] h-[120%] w-full">
          <Image
            src={resolveAsset("buds-of-goodness.webp")}
            alt="Green flower buds in soft morning light"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-10 mix-blend-luminosity blur-[3px] grayscale"
            unoptimized
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#052e16] via-[#052e16]/85 to-[#052e16]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,46,22,0)_0%,#052e16_100%)] opacity-80" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-[1440px] flex-col px-6 pb-24 pt-8 sm:px-10 sm:pb-32 sm:pt-16 lg:flex-row lg:px-16">
        {/* Sticky left column: full-bleed image + title */}
        <div className="relative -mx-6 -mt-8 flex min-h-[70vh] flex-col justify-end overflow-hidden pb-10 sm:-mx-10 sm:-mt-16 lg:sticky lg:top-0 lg:mx-0 lg:mt-0 lg:h-screen lg:min-h-0 lg:w-5/12 lg:pb-0">
          <div className="absolute inset-0 z-0">
            <Image
              src={resolveAsset("buds-of-goodness.webp")}
              alt="Green flower buds in soft morning light"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover object-left-top opacity-45 grayscale"
              unoptimized
            />
            <div className="absolute inset-0 bg-[#bef264]/10 mix-blend-color" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#052e16] via-[#052e16]/55 to-[#052e16]/10" />
          </div>

          <div className="relative z-10 px-6 sm:px-10 lg:px-16">
            <p className="mb-6 font-mono text-[9px] uppercase tracking-[0.4em] text-[#bef264]/75 sm:text-[10px] lg:mb-8">
              Inquation / Poetry · 12
            </p>

            <h2
              className="mb-8 font-heading text-4xl uppercase leading-[1.05] tracking-wide text-[#ecfccb] sm:text-5xl md:text-6xl lg:mb-10 lg:text-5xl xl:text-6xl"
              lang="ml"
            >
              നന്മയുടെ
              <br />
              <span className="text-[#bef264]">പൂമൊട്ടുകൾ</span>
            </h2>

            <div className="flex items-center gap-4 pl-1 text-[#ecfccb]/50">
              <motion.div style={{ rotate }} className="origin-center text-[#bef264]">
                <Sprout className="h-5 w-5 stroke-[1.5] sm:h-6 sm:w-6" />
              </motion.div>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] sm:text-xs">
                Buds of goodness
              </span>
            </div>
          </div>
        </div>

        {/* Right scroll column */}
        <div className="relative z-10 mt-12 flex flex-col pb-[10vh] pl-0 lg:mt-0 lg:w-7/12 lg:pl-16 lg:pt-[45vh] xl:pl-32">
          {STANZAS.map((lines, i) => (
            <StanzaBlock key={i} lines={lines} accent={i >= 3} />
          ))}

          {/* Author card */}
          <motion.div
            ref={authorRef}
            style={{ scale: authorScale, opacity: authorOpacity, transformOrigin: "left center" }}
            className="mt-12 flex flex-col items-start gap-6 rounded-2xl border border-[#bef264]/10 bg-[#ecfccb]/[0.03] p-6 backdrop-blur-sm transition-colors duration-500 hover:bg-[#ecfccb]/[0.06] sm:flex-row sm:items-center sm:gap-8 sm:p-8 lg:mt-20"
          >
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full shadow-lg ring-1 ring-[#bef264]/20 grayscale transition-all duration-700 hover:grayscale-0 sm:h-24 sm:w-24">
              <Image
                src={resolveAsset("eldho.webp")}
                alt="ഏൽദോ പോൾ ഷാജൻ"
                fill
                sizes="96px"
                unoptimized
                className="object-cover transition-transform duration-700 ease-out hover:scale-110"
              />
            </div>
            <div className="flex flex-col">
              <span className="mb-3 font-mono text-[9px] uppercase tracking-[0.3em] text-[#bef264]/75 sm:text-[10px]">
                Written by
              </span>
              <span className="mb-2 font-sans text-2xl tracking-tight text-[#ecfccb]/90 sm:text-3xl" lang="ml">
                ഏൽദോ പോൾ ഷാജൻ
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#ecfccb]/30" lang="ml">
                ഒന്നാം വർഷം, മെക്കാനിക്കൽ എഞ്ചിനീയറിങ്
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer minimal */}
      <footer className="relative z-10 w-full border-t border-[#bef264]/10 bg-[#052e16]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-6 py-8 font-mono text-[8px] uppercase tracking-[0.2em] text-[#ecfccb]/20 sm:flex-row sm:items-center sm:justify-between sm:px-10 sm:text-[9px] lg:px-16">
          <span lang="ml">Author · ഏൽദോ പോൾ ഷാജൻ</span>
        </div>
      </footer>
    </section>
  );
}

export default Nanmayude;
