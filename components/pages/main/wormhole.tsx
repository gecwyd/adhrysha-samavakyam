"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export function Wormhole() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 40, damping: 20, mass: 0.8 });

  const ringScale = useTransform(smooth, [0, 1], [0.6, 2.8]);
  const tunnelScale = useTransform(smooth, [0, 1], [1, 3.5]);
  const tunnelOpacity = useTransform(smooth, [0, 0.15, 1], [0.6, 1, 0.8]);

  const titleY = useTransform(smooth, [0, 0.4], ["0%", "-18%"]);
  const titleOpacity = useTransform(smooth, [0, 0.1, 0.35, 0.45], [1, 1, 1, 0]);
  const titleScale = useTransform(smooth, [0, 0.4], [1, 0.88]);

  const subY = useTransform(smooth, [0, 0.4], ["0%", "-12%"]);
  const subOpacity = useTransform(smooth, [0, 0.1, 0.35, 0.45], [1, 1, 1, 0]);

  const taglineOpacity = useTransform(smooth, [0.45, 0.6], [0, 1]);
  const taglineY = useTransform(smooth, [0.45, 0.6], ["20%", "0%"]);

  return (
    <section
      ref={containerRef}
      id="sec-wormhole"
      aria-labelledby="wormhole-title"
      className="relative h-[350vh] w-full bg-[#020202] text-white"
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-between">

        {/* Ambient noise overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.025] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC45IiBudW1PY3RhdmVzPSI0IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI24pIi8+PC9zdmc+')] bg-repeat" />

        {/* Tunnel rings — concentric, pulsing */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[...Array(7)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                width: `${14 + i * 10}vmin`,
                height: `${14 + i * 10}vmin`,
                scale: ringScale,
                opacity: useTransform(smooth, [0, 0.2, 0.7, 1], [0.08 - i * 0.005, 0.18 - i * 0.01, 0.1, 0]),
              }}
              className="absolute rounded-full border border-white/30"
            />
          ))}

          {/* Central glowing core — the wormhole mouth */}
          <motion.div
            style={{ scale: tunnelScale, opacity: tunnelOpacity }}
            className="absolute w-[28vmin] h-[28vmin] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0.15)_30%,rgba(180,180,180,0.03)_60%,transparent_75%)] blur-[1px]"
          />

          {/* Outer diffuse glow */}
          <motion.div
            style={{
              scale: useTransform(smooth, [0, 1], [0.8, 2]),
              opacity: useTransform(smooth, [0, 0.3, 0.8, 1], [0.04, 0.1, 0.06, 0]),
            }}
            className="absolute w-[60vmin] h-[60vmin] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_70%)] blur-[60px]"
          />
        </div>

        {/* Header */}
        <header className="relative z-10 flex items-center justify-between px-6 py-8 md:px-12 md:py-10">
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
            Inquation / Gateway
          </div>
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30 text-right">
            00
          </div>
        </header>

        {/* Main content */}
        <div className="relative flex-1 flex items-center justify-center w-full">

          {/* Hero title block */}
          <motion.div
            style={{ y: titleY, opacity: titleOpacity, scale: titleScale }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          >
            <motion.p
              style={{ y: subY, opacity: subOpacity }}
              className="font-mono text-[9px] md:text-[10px] tracking-[0.35em] text-white/40 uppercase mb-7"
            >
              A Gateway · A Bridge · A Connection
            </motion.p>

            <h2
              id="wormhole-title"
              className="font-heading text-[18vw] sm:text-[15vw] md:text-[12vw] lg:text-[10vw] leading-[0.82] tracking-tight text-white"
            >
              WORM
              <br />
              <span className="text-white/30">HOLE</span>
            </h2>

            <motion.p
              style={{ y: subY, opacity: subOpacity }}
              className="font-mono text-[9px] md:text-[10px] tracking-[0.25em] text-white/25 uppercase mt-7 max-w-xs"
            >
              Inquation 2025–26 · GEC Wayanad
            </motion.p>
          </motion.div>

          {/* Tagline that fades in at the end of scroll */}
          <motion.div
            style={{ opacity: taglineOpacity, y: taglineY }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center pointer-events-none"
          >
            <p className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] text-white/30 uppercase mb-6">
              What lies beyond the event horizon?
            </p>
            <h3 className="font-heading text-[7vw] md:text-[5vw] lg:text-[4vw] leading-[1.1] tracking-tight text-white/80 max-w-3xl">
              Every story is a passage.<br />
              <span className="text-white/40 font-light">Step through.</span>
            </h3>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
