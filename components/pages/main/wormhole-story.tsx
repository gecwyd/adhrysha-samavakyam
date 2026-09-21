"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const STORY = [
  {
    tag: "01 / THE DEFINITION",
    ml: "ബഹിരാകാശത്തിലെ പരസ്പരം വളരെ അകലെയുള്ള രണ്ട് പ്രദേശങ്ങളെ ഒരു തുരങ്കംപോലുള്ള പാതയിലൂടെ ബന്ധിപ്പിക്കുന്നതായി സിദ്ധാന്തപരമായി കരുതപ്പെടുന്ന ഘടനയാണ് വിശദദ്വാരം.",
    en: "A wormhole: a theoretical tunnel connecting two distant points in spacetime.",
  },
  {
    tag: "02 / THE ESCAPE",
    ml: "എല്ലാംകൊണ്ടും മടുപ്പായി തുടങ്ങി. ജോലിയും ജീവിതവും എല്ലാം. ഒരാഴ്ച ലീവ് എടുത്ത് ട്രെയിൻ കയറി ഞാൻ നാട്ടിലേക്ക് വന്നു.",
    en: "Tired of everything, work, life, all of it. I took a week off and came home on a train.",
  },
  {
    tag: "03 / THE CLOCK",
    ml: "മുത്തശ്ശന്റെ വീട്ടിൽ ഉറക്കമില്ലാതെ മേൽപ്പോട്ട് നോക്കി കട്ടിലിൽ കിടക്കുമ്പോഴാണ് ആ വലിയ ക്ലോക്ക് എന്റെ കണ്ണിൽ ഉടക്കുന്നത്. മണി 12 ശബ്ദിച്ചു. പെട്ടെന്ന് സൂചി പിന്നിലേക്ക് നടന്നു. 12, 11, 10, 9...",
    en: "Lying awake in grandfather's house, that old clock caught my eye. It struck twelve. Then the hands walked backwards.",
  },
  {
    tag: "04 / THE DOOR",
    ml: "സൂചി 3ൽ എത്തിയപ്പോൾ കതകുതുറന്ന് അമ്മ മുറിയിലേക്ക് വന്നു. കൈകൊണ്ട് കണ്ണ് തിരുമ്മി അമ്മ എന്നെ നോക്കി.",
    en: "When the hand reached 3, the door opened. Mother walked in, rubbing her eyes, looking at me.",
  },
  {
    tag: "05 / HER WORDS",
    ml: "\"എന്റുണ്ണ്യേ! എന്ത് ബഹളാ ഇത്. നിനക്ക് ഇതുവരെ ഉറങ്ങാൻ ആയില്ലേ. നാളെ രാവിലെ പരീക്ഷക്ക് പോണ്ടതല്ലേ. പെട്ടെന്ന് ഉറങ്ങാൻ നോക്ക്.\"",
    en: "\"My dear child! What's all this noise? You haven't slept yet? Don't you have an exam tomorrow morning? Try to sleep.\"",
  },
  {
    tag: "06 / THE TRUTH",
    ml: "ഞാൻ ഇപ്പോ സ്കൂളിൽ പഠിക്കുന്ന കുട്ടിയല്ല. അമ്മ പോയതിനു ശേഷം ആരും എന്നെ ഉണ്ണീന്നും വിളിച്ചിട്ടില്ല. അമ്മ മരിച്ചു. 8 കൊല്ലം മുന്നേ.",
    en: "I am not a school child anymore. Nobody has called me 'dear child' since she left. Mother died. Eight years ago.",
  },
  {
    tag: "07 / THE WORMHOLE",
    ml: "അന്ന് രാത്രി സംഭവിച്ചതിന് ഒരു പേരുണ്ടോ എന്ന് എനിക്ക് അറിയില്ല. പക്ഷേ വർഷങ്ങൾക്കുശേഷം, സ്ഥലകാലത്തെക്കുറിച്ചും വിശദദ്വാരത്തെക്കുറിച്ചും വായിച്ചപ്പോൾ, ഒരുപക്ഷേ ആ രാത്രിയിൽ ഞാൻ കണ്ടത് ഇതാണെന്ന് ചിന്തിച്ചുതുടങ്ങി.",
    en: "I don't know if there's a name for what happened that night. But years later, reading about spacetime and wormholes, I began to wonder if that's what I witnessed.",
  },
];

export function WormholeStory() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 40, damping: 20, mass: 0.8 });

  const step = 1 / STORY.length;

  const slides = STORY.map((_, i) => {
    const s = i * step;
    const e = (i + 1) * step;
    const fadeIn: [number, number] = [s, s + step * 0.25];
    const fadeOut: [number, number] = [e - step * 0.25, e];
    const isLast = i === STORY.length - 1;

    const opacity = isLast
      ? useTransform(smooth, [fadeIn[0], fadeIn[1], 1, 1], [0, 1, 1, 1])
      : useTransform(smooth, [fadeIn[0], fadeIn[1], fadeOut[0], fadeOut[1]], [0, 1, 1, 0]);

    const y = isLast
      ? useTransform(smooth, [fadeIn[0], fadeIn[1]], ["14%", "0%"])
      : useTransform(smooth, [fadeIn[0], fadeIn[1], fadeOut[0], fadeOut[1]], ["14%", "0%", "0%", "-14%"]);

    return { opacity, y };
  });

  const clockHandRotate = useTransform(smooth, [0.2, 0.5], [0, -360]);
  const clockOpacity = useTransform(smooth, [0.18, 0.28, 0.52, 0.62], [0, 0.18, 0.18, 0]);

  return (
    <section
      id="sec-wormhole-story"
      aria-labelledby="wormhole-story-title"
      className="relative w-full bg-[#070608] text-[#e8e2d7]"
    >
      <div ref={containerRef} className="relative h-[700vh] w-full">
        <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-between">

          <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC45IiBudW1PY3RhdmVzPSI0IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI24pIi8+PC9zdmc+')] bg-repeat" />

          <motion.div
            style={{ opacity: clockOpacity }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="relative w-[38vmin] h-[38vmin]">
              <svg viewBox="0 0 100 100" className="w-full h-full text-white/10 fill-none stroke-current" strokeWidth="0.5">
                <circle cx="50" cy="50" r="48" />
                {[...Array(12)].map((_, i) => {
                  const angle = (i / 12) * 360;
                  const rad = (angle * Math.PI) / 180;
                  const x1 = +(50 + 40 * Math.sin(rad)).toFixed(3);
                  const y1 = +(50 - 40 * Math.cos(rad)).toFixed(3);
                  const x2 = +(50 + 46 * Math.sin(rad)).toFixed(3);
                  const y2 = +(50 - 46 * Math.cos(rad)).toFixed(3);
                  return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="1" />;
                })}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  style={{ rotate: clockHandRotate }}
                  className="absolute w-px h-[36%] bg-white/30 origin-bottom translate-y-[-50%]"
                />
              </div>
            </div>
          </motion.div>

          <header className="relative z-10 flex items-center justify-between px-6 py-8 md:px-12 md:py-10">
            <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/25">
              Inquation / Memory
            </div>
            <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/25 text-right">
              04
            </div>
          </header>

          <div className="relative flex-1 flex items-center justify-center w-full">
            {STORY.map((slide, i) => (
              <motion.div
                key={i}
                style={{ opacity: slides[i].opacity, y: slides[i].y }}
                className="absolute inset-0 flex flex-col items-center justify-center px-8 md:px-20 lg:px-32 text-center pointer-events-none"
              >
                <span className="font-mono text-[9px] md:text-[10px] tracking-[0.35em] text-white/30 uppercase mb-8 block">
                  {slide.tag}
                </span>

                {i === 0 && (
                  <>
                    <h2
                      id="wormhole-story-title"
                      className="font-sans text-2xl md:text-4xl lg:text-5xl font-light text-[#e8e2d7] leading-[1.6] max-w-3xl"
                      lang="ml"
                    >
                      {slide.ml}
                    </h2>
                    <p className="font-mono text-[10px] md:text-xs text-white/30 mt-8 tracking-widest italic">
                      {slide.en}
                    </p>
                    <div className="mt-10 flex items-center gap-3">
                      <div className="w-12 h-px bg-white/15" />
                      <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-white/20">വിശദദ്വാരം</span>
                      <div className="w-12 h-px bg-white/15" />
                    </div>
                  </>
                )}

                {i === 4 && (
                  <>
                    <blockquote
                      className="font-sans text-xl md:text-3xl lg:text-4xl font-light text-[#e8e2d7]/90 leading-[1.7] max-w-2xl border-l-2 border-white/20 pl-6 text-left"
                      lang="ml"
                    >
                      {slide.ml}
                    </blockquote>
                    <p className="font-serif text-xs md:text-sm text-white/30 mt-6 max-w-xl italic text-left pl-6">
                      {slide.en}
                    </p>
                  </>
                )}

                {i === 5 && (
                  <>
                    <p
                      className="font-sans text-2xl md:text-4xl lg:text-[2.8rem] font-light text-white/90 leading-[1.55] max-w-3xl"
                      lang="ml"
                    >
                      {slide.ml}
                    </p>
                    <p className="font-serif text-sm md:text-base text-white/30 mt-8 max-w-2xl italic">
                      {slide.en}
                    </p>
                    <div className="mt-10 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white/20" />
                    </div>
                  </>
                )}

                {i === 6 && (
                  <>
                    <p
                      className="font-sans text-xl md:text-3xl lg:text-4xl font-light text-[#e8e2d7]/80 leading-[1.65] max-w-3xl"
                      lang="ml"
                    >
                      {slide.ml}
                    </p>
                    <p className="font-serif text-sm text-white/25 mt-8 max-w-2xl italic">
                      {slide.en}
                    </p>
                  </>
                )}

                {i !== 0 && i !== 4 && i !== 5 && i !== 6 && (
                  <>
                    <p
                      className="font-sans text-2xl md:text-4xl lg:text-5xl font-light text-[#e8e2d7] leading-[1.6] max-w-3xl"
                      lang="ml"
                    >
                      {slide.ml}
                    </p>
                    <p className="font-serif text-sm md:text-base text-white/35 mt-8 max-w-2xl italic">
                      {slide.en}
                    </p>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
