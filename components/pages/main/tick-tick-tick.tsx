"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import Image from "next/image";

const STANZAS = [
  [
    "ഒച്ചയും ബഹളവും നിറഞ്ഞ ആ വീട്ടിൽ",
    "അന്ന് ആരും ആ ഘടികാരത്തെ കേൾക്കാൻ തയ്യാറായിരുന്നില്ല.",
    "ദിവസവും കണ്ണുകൾ അതിൽ പതിയുമെങ്ങിലും",
    "ചെവിക്കൊടുകാൻ ആരും തയ്യറായിരുന്നില്ല…",
    "ഞാനും.!!",
  ],
  [
    "എന്നാൽ ഇന്ന്,",
    "നിശബ്ദത നിറഞ്ഞ ഏകാന്തതയിൽ",
    "അവൾ അതിനെ ശ്രവിച്ചുകൊണ്ടേയിരുന്നു …",
  ],
  [
    "ഒച്ചയും ബഹളവും ഇല്ലാഞ്ഞിട്ടോ??",
    "അതോ,",
    "അതിനെ ഒന്ന് മനസറിഞ്ഞ് കേൾക്കാം എന്നവണ്ണമോ???",
  ],
  [
    "അവൾ അതിനെ കേട്ടുകൊണ്ടേയിരുന്നു...",
    "അതിനെമാത്രം.",
  ],
  [
    "ടിക്…",
    "ടിക്…",
    "ടിക്... !!!!!!",
  ],
];

function Stanza({
  lines,
  progress,
  index,
  total,
  children,
}: {
  lines: string[];
  progress: MotionValue<number>;
  index: number;
  total: number;
  children?: React.ReactNode;
}) {
  // Center is spread evenly between 0.15 and 0.85
  const center = 0.15 + (index / (total - 1)) * 0.7;
  // Make the active window slightly wider so text stays readable for a bit before fading
  const fadeStart = center - 0.15;
  const holdStart = center - 0.05;
  const holdEnd = center + 0.05;
  const fadeEnd = center + 0.15;

  const opacity = useTransform(
    progress,
    [fadeStart, holdStart, holdEnd, fadeEnd],
    [0, 1, 1, 0]
  );
  
  const y = useTransform(
    progress,
    [fadeStart, holdStart, holdEnd, fadeEnd],
    [40, 0, 0, -40]
  );
  
  const filter = useTransform(
    progress,
    [fadeStart, holdStart, holdEnd, fadeEnd],
    ["blur(8px)", "blur(0px)", "blur(0px)", "blur(8px)"]
  );

  return (
    <motion.div
      style={{ opacity, y, filter }}
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center gap-5 md:gap-7 will-change-[opacity,transform,filter]"
    >
      {lines.map((line, i) => (
        <p
          key={i}
          className="font-sans text-[22px] sm:text-2xl md:text-3xl lg:text-[34px] leading-relaxed text-[#d9d4c7] drop-shadow-lg"
          lang="ml"
        >
          {line}
        </p>
      ))}
      {children}
    </motion.div>
  );
}

export function TickTickTick() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 45, damping: 20, mass: 0.8 });

  // Pendulum swinging back and forth 15 times over the scroll length
  const pendulumKeyframes = Array.from({ length: 31 }).map((_, i) => (i % 2 === 0 ? 10 : -10));
  const pendulumStops = Array.from({ length: 31 }).map((_, i) => i / 30);
  const pendulumRotate = useTransform(smooth, pendulumStops, pendulumKeyframes);

  const titleOpacity = useTransform(smooth, [0, 0.1], [1, 0.15]);
  const progressWidth = useTransform(smooth, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={containerRef}
      id="sec-j"
      aria-labelledby="tick-tick-tick-title"
      className="relative h-[600vh] w-full bg-[#14120f] text-[#d9d4c7]"
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col items-center justify-between pointer-events-none">
        
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#14120f_80%)] z-0" />
        
        {/* Background Pendulum */}
        <motion.div
          style={{ rotate: pendulumRotate, originY: 0 }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-[45vh] md:h-[65vh] bg-gradient-to-b from-[#d9d4c7]/15 to-transparent z-0"
        >
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#d9d4c7]/20 shadow-[0_0_15px_rgba(217,212,199,0.2)]" />
        </motion.div>

        {/* Content Container (Stanzas) */}
        <div className="relative z-10 flex-1 w-full max-w-5xl mx-auto flex items-center justify-center">
          <div className="absolute inset-0">
            {STANZAS.map((stanza, i) => (
              <Stanza key={i} lines={stanza} progress={smooth} index={i} total={STANZAS.length}>
                {i === STANZAS.length - 1 && (
                  <div className="mt-16 sm:mt-20 flex items-center justify-center pointer-events-auto">
                    <div className="inline-flex items-center gap-6 sm:gap-8 rounded-full border border-[#d9d4c7]/15 bg-[#d9d4c7]/[0.03] p-3 sm:p-4 pr-10 sm:pr-14 backdrop-blur-sm transition-colors hover:bg-[#d9d4c7]/[0.08] shadow-2xl">
                      <div className="relative h-20 w-20 sm:h-24 sm:w-24 overflow-hidden rounded-full border border-[#d9d4c7]/20">
                        <Image
                          src="/avani-manoj.png"
                          alt="Author portrait of ആവണി മനോജ്"
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col text-left justify-center">
                        <span className="font-mono text-[10px] sm:text-[12px] uppercase tracking-[0.25em] text-[#d9d4c7]/50 mb-1.5 sm:mb-2">
                          Written by
                        </span>
                        <span className="font-sans text-2xl sm:text-[32px] text-[#d9d4c7]/95 leading-none" lang="ml">
                          ആവണി മനോജ്
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </Stanza>
            ))}
          </div>
        </div>

        {/* Header Overlay */}
        <div className="absolute top-0 left-0 w-full px-6 py-8 md:px-10 md:py-10 flex justify-end items-start z-20">
          <motion.div style={{ opacity: titleOpacity }} className="text-right">
            <h2
              id="tick-tick-tick-title"
              className="font-heading text-4xl md:text-5xl lg:text-7xl tracking-tight text-[#d9d4c7] leading-[0.9]"
            >
              TICK…<br />TICK…<br /><span className="text-[#d99065]">TICK…</span>
            </h2>
          </motion.div>
        </div>

        {/* Footer Overlay */}
        <footer className="absolute bottom-0 left-0 w-full px-6 py-6 md:px-10 md:py-8 flex items-center justify-between z-20 border-t border-[#d9d4c7]/5 bg-[#14120f]/50 backdrop-blur-sm">
          <div className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#d9d4c7]/40">
            College Union 2026–27
          </div>
          <div className="w-24 md:w-32 h-[2px] bg-[#d9d4c7]/10 rounded-full overflow-hidden">
            <motion.div style={{ width: progressWidth }} className="h-full bg-[#d99065]" />
          </div>
        </footer>
      </div>
    </section>
  );
}

export default TickTickTick;
