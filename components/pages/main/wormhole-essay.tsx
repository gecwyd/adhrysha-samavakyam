"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { resolveAsset } from "@/lib/asset-registry";

const ESSAY = [
  {
    tag: "01 / THE SHORTCUT",
    title: "പ്രപഞ്ചത്തിന്റെ കുറുക്കുവഴി",
    ml: "ഒരു സ്ഥലത്തുനിന്ന് മറ്റൊരു സ്ഥലത്തേക്ക് സഞ്ചരിക്കുമ്പോൾ, സാധാരണയായി ആ രണ്ട് സ്ഥലങ്ങൾക്കിടയിലുള്ള ദൂരം നമ്മൾ മറികടക്കേണ്ടതുണ്ട്. എന്നാൽ സ്ഥലകാലത്തിന്റെ ഘടന തന്നെ വളയ്ക്കാനോ ചുരുക്കാനോ കഴിയുമെങ്കിൽ എന്ത് സംഭവിക്കും?",
    en: "The shortcut of the universe. What if the very fabric of spacetime could be bent or folded?",
  },
  {
    tag: "02 / THE THEORY",
    ml: "പ്രപഞ്ചത്തിലെ വളരെ അകലെയുള്ള രണ്ട് പ്രദേശങ്ങളെ ഒരു തുരങ്കം പോലെ ബന്ധിപ്പിക്കുന്ന സാങ്കൽപ്പിക ഘടനയാണ് വിശദദ്വാരം (Wormhole). ഐൻസ്റ്റീന്റെ സാമാന്യ ആപേക്ഷികതാ സിദ്ധാന്തത്തിലെ സമവാക്യങ്ങളിൽ നിന്ന് സാധ്യമായ ഒരു ആശയമാണിത്.",
    en: "A wormhole is a theoretical tunnel connecting two distant regions in the universe, predicted by Einstein's equations of General Relativity.",
  },
  {
    tag: "03 / THE ILLUSION",
    ml: "പ്രകാശവേഗത്തേക്കാൾ വേഗത്തിൽ സഞ്ചരിക്കാനുള്ള ഒരു മാർഗമല്ലിത്; പകരം, സ്ഥലകാലത്തിലൂടെയുള്ള ദൂരം തന്നെ ചുരുക്കുന്ന ഒരു സാങ്കൽപ്പിക പാതയാണിത്.",
    en: "It is not a way to travel faster than light; rather, it is a hypothetical path that shortens the distance through spacetime itself.",
  },
  {
    tag: "04 / THE QUESTION",
    title: "“ദൂരം എന്നത് ശരിക്കും എന്താണ്?”",
    ml: "ഒരേ വീട്ടിൽ താമസിച്ചിട്ടും പരസ്പരം മനസ്സിലാക്കാൻ കഴിയാത്ത രണ്ട് മനുഷ്യർക്കിടയിലെ ദൂരം എത്രയാണ്? വർഷങ്ങളോളം സംസാരിക്കാതിരുന്ന രണ്ട് സുഹൃത്തുക്കൾക്കിടയിലെ ദൂരം എത്രയാണ്?",
    en: "\"What exactly is distance?\" What is the distance between two people living in the same house who cannot understand each other?",
  },
  {
    tag: "05 / THE UNMEASURABLE",
    ml: "ഒരിക്കൽ നമ്മുടേതായിരുന്ന ഒരാളും ഇന്ന് ഒരു ഓർമ്മമാത്രമായി മാറിയ ഒരാളും തമ്മിലുള്ള ദൂരം എത്രയാണ്? അവ കിലോമീറ്ററുകളിലോ പ്രകാശവർഷത്തിലോ അളക്കാൻ കഴിയില്ല.",
    en: "What is the distance between someone who was once ours and someone who is just a memory today? It cannot be measured in light-years.",
  },
  {
    tag: "06 / THE TIME MACHINE",
    ml: "ഒരു പഴയ പാട്ട് കേൾക്കുമ്പോൾ നമ്മൾ വർഷങ്ങൾ പിന്നിലേക്ക് പോകുന്നു. ഒരു പഴയ ഫോട്ടോ കാണുമ്പോൾ ഒരു ദിവസം വീണ്ടും മുന്നിൽ വരുന്നു. മനുഷ്യന്റെ ഓർമ്മകൾക്ക് സ്വന്തമായ ചില ചുരുക്കവഴികളുണ്ട്. അവ യഥാർത്ഥ വിശദദ്വാരമല്ലെങ്കിലും...",
    en: "An old song or a faded photo can transport us years back in an instant. Human memories have their own shortcuts.",
  },
  {
    tag: "07 / THE IMAGINATION",
    ml: "ദൂരം എത്ര വലുതായാലും, അതിനെ മറികടക്കാനുള്ള വഴികളെക്കുറിച്ച് ചിന്തിക്കാൻ മനുഷ്യന്റെ സങ്കൽപ്പത്തിന് ഒരിക്കലും പരിധിയില്ല എന്നതാണ് വിശദദ്വാരം നമ്മെ പഠിപ്പിക്കുന്നത്.",
    en: "No matter how great the distance, the human imagination has no limits when it comes to finding ways to bridge it.",
  },
  {
    tag: "08 / THE MIND",
    ml: "ഇന്ന് വിശദദ്വാരം ഒരു സിദ്ധാന്തമാണ്. നാളെ അതൊരു കണ്ടെത്തലാകാം. എന്നിരുന്നാലും, പ്രപഞ്ചത്തിന്റെ ഏറ്റവും വലിയ ദൂരങ്ങൾ പോലും ആദ്യം മനുഷ്യന്റെ മനസ്സിലാണ് ചെറുതാകുന്നത്.",
    en: "Today, a wormhole is a theory. Yet, even the greatest distances of the universe shrink first in the human mind.",
  },
];

export function WormholeEssay() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 40, damping: 20, mass: 0.8 });

  const step = 1 / ESSAY.length;

  const slides = ESSAY.map((_, i) => {
    const s = i * step;
    const e = (i + 1) * step;
    const fadeIn: [number, number] = [s, s + step * 0.25];
    const fadeOut: [number, number] = [e - step * 0.25, e];
    const isLast = i === ESSAY.length - 1;

    const opacity = isLast
      ? useTransform(smooth, [fadeIn[0], fadeIn[1], 1, 1], [0, 1, 1, 1])
      : useTransform(smooth, [fadeIn[0], fadeIn[1], fadeOut[0], fadeOut[1]], [0, 1, 1, 0]);

    const y = isLast
      ? useTransform(smooth, [fadeIn[0], fadeIn[1]], ["14%", "0%"])
      : useTransform(smooth, [fadeIn[0], fadeIn[1], fadeOut[0], fadeOut[1]], ["14%", "0%", "0%", "-14%"]);

    return { opacity, y };
  });

  const bgScale = useTransform(smooth, [0, 1], [1, 1.2]);
  const bgOverlay = useTransform(smooth, [0, 0.4, 1], [0.7, 0.85, 0.95]);

  return (
    <section
      id="sec-wormhole-essay"
      aria-labelledby="wormhole-essay-title"
      className="relative w-full bg-black text-[#e8e2d7]"
    >
      <div ref={containerRef} className="relative h-[800vh] w-full">
        <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-between">
          
          <motion.div
            style={{ scale: bgScale }}
            className="absolute inset-0 w-full h-full pointer-events-none"
          >
            <Image
              src={resolveAsset("wormhole-essay-bg.jpg")}
              alt="Cosmic Wormhole"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
          
          <motion.div
            style={{ opacity: bgOverlay }}
            className="absolute inset-0 bg-black pointer-events-none"
          />

          <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC45IiBudW1PY3RhdmVzPSI0IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI24pIi8+PC9zdmc+')] bg-repeat mix-blend-overlay" />

          <header className="relative z-10 flex items-center justify-between px-6 py-8 md:px-12 md:py-10">
            <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">
              Inquation / Distance
            </div>
            <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40 text-right">
              05
            </div>
          </header>

          <div className="relative flex-1 flex items-center justify-center w-full">
            {ESSAY.map((slide, i) => (
              <motion.div
                key={i}
                style={{ opacity: slides[i].opacity, y: slides[i].y }}
                className="absolute inset-0 flex flex-col items-center justify-center px-8 md:px-20 lg:px-32 text-center pointer-events-none"
              >
                <span className="font-mono text-[9px] md:text-[10px] tracking-[0.35em] text-[#d99065] uppercase mb-8 block">
                  {slide.tag}
                </span>

                {slide.title && (
                  <h2
                    className="font-sans text-3xl md:text-5xl lg:text-6xl font-light text-white leading-[1.4] mb-8"
                    lang="ml"
                  >
                    {slide.title}
                  </h2>
                )}

                <p
                  className="font-sans text-xl md:text-3xl lg:text-4xl font-light text-[#e8e2d7]/90 leading-[1.65] max-w-3xl"
                  lang="ml"
                >
                  {slide.ml}
                </p>
                <p className="font-serif text-sm md:text-base text-white/60 mt-8 max-w-2xl italic">
                  {slide.en}
                </p>
                
                {i === ESSAY.length - 1 && (
                  <div className="mt-14 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center relative overflow-hidden backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                    <div className="absolute inset-0 bg-white/5" />
                    <div className="w-3 h-3 rounded-full bg-[#d99065] shadow-[0_0_10px_#d99065]" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <footer className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12 md:py-8 border-t border-white/[0.05] pointer-events-none">
            <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
              GEC Wayanad · 2025–26
            </div>
            <div className="font-sans text-[10px] text-white/30" lang="ml">
              സ്ഥലകാലം
            </div>
          </footer>
        </div>
      </div>
    </section>
  );
}
