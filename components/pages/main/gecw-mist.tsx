"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { preload } from "@/lib/preload";
import { resolveAsset } from "@/lib/asset-registry";

const VIDEO_SRC = resolveAsset("gecw-mist.webm");
const POSTER_SRC = resolveAsset("gecw-mist-poster.webp");

export function GecwMist() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainVideoRef = useRef<HTMLVideoElement>(null);
  const ambientVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    preload(VIDEO_SRC, "video");
    preload(POSTER_SRC, "image");
  }, []);

  const isInView = useInView(containerRef, {
    amount: 0.1,
  });

  useEffect(() => {
    if (isInView) {
      ambientVideoRef.current?.play().catch(() => {});
      mainVideoRef.current?.play().catch(() => {});
    } else {
      ambientVideoRef.current?.pause();
      mainVideoRef.current?.pause();
    }
  }, [isInView]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Animate the dimensions of the video container from a small window to full viewport
  const width = useTransform(scrollYProgress, [0, 0.6], ["40%", "100%"]);
  const height = useTransform(scrollYProgress, [0, 0.6], ["30%", "100%"]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.5], ["2rem", "0rem"]);
  
  // Background text fades out as video expands
  const bgTextOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const bgTextScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.9]);

  // Video subtitle fades in as video becomes full screen
  const subtitleOpacity = useTransform(scrollYProgress, [0.5, 0.8], [0, 1]);
  const subtitleY = useTransform(scrollYProgress, [0.5, 0.8], [50, 0]);

  // Author badge scroll animation
  const authorOpacity = useTransform(scrollYProgress, [0.35, 0.65], [0, 1]);
  const authorY = useTransform(scrollYProgress, [0.35, 0.65], [-20, 0]);
  const authorScale = useTransform(scrollYProgress, [0.35, 0.65], [0.9, 1]);

  return (
    <section
      ref={containerRef}
      id="sec-gecw-mist"
      className="relative w-full h-[300vh] bg-[#0a0a0a] selection:bg-white selection:text-black"
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        
        {/* Background ambient gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05)_0%,_transparent_70%)]" />

        {/* Huge background text */}
        <motion.div 
          style={{ opacity: bgTextOpacity, scale: bgTextScale }}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0"
        >
          <p className="font-mono text-xs uppercase tracking-[0.5em] text-white/30 mb-8">
            A Cinematic View
          </p>
          <h2 className="font-heading text-[25vw] sm:text-[20vw] font-light leading-none tracking-tighter text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.15)" }}>
            GECW
          </h2>
        </motion.div>

        {/* Expanding Video Window */}
        <motion.div
          style={{ width, height, borderRadius }}
          className="relative z-10 overflow-hidden shadow-[0_0_80px_rgba(255,255,255,0.1)] border border-white/10 bg-black flex items-center justify-center"
        >
          {/* Animated Author Profile Badge */}
          <motion.a
            href="https://www.instagram.com/aadhiii_diaries/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ opacity: authorOpacity, y: authorY, scale: authorScale }}
            className="absolute top-5 right-5 sm:top-8 sm:right-8 z-30 flex items-center gap-3 px-4 py-2.5 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-xl border border-white/20 text-white/90 hover:text-white transition-all duration-300 shadow-2xl group hover:border-white/40 pointer-events-auto"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 p-[1.5px] flex items-center justify-center shadow-md">
              <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-white group-hover:scale-110 transition-transform fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
            </div>
            <div className="flex flex-col text-left leading-tight pr-1">
              <span className="font-mono text-[9px] uppercase tracking-widest text-white/50">Captured by</span>
              <span className="font-sans text-xs font-medium tracking-wide flex items-center gap-1 text-white">
                @aadhiii_diaries
                <ArrowUpRight className="w-3 h-3 text-white/60 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </div>
          </motion.a>

          {/* Ambient blurred background video to prevent ugly letterboxing */}
          <video
            ref={ambientVideoRef}
            loop
            muted
            playsInline
            preload="auto"
            poster={POSTER_SRC}
            className="absolute inset-0 w-full h-full object-cover opacity-40 blur-3xl scale-110 pointer-events-none"
          >
            <source src={VIDEO_SRC} type="video/webm" />
          </video>

          {/* Main uncropped video */}
          <video
            ref={mainVideoRef}
            loop
            controls
            playsInline
            preload="auto"
            poster={POSTER_SRC}
            className="absolute inset-0 w-full h-full object-contain shadow-2xl z-10"
          >
            <source src={VIDEO_SRC} type="video/webm" />
          </video>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

          {/* Subtitle that appears when full screen */}
          <motion.div 
            style={{ opacity: subtitleOpacity, y: subtitleY }}
            className="absolute bottom-16 sm:bottom-24 left-0 right-0 flex flex-col items-center text-center px-6 pointer-events-none"
          >
            <div className="w-px h-16 sm:h-24 bg-white/30 mb-6" />
            <h3 className="font-serif text-5xl sm:text-7xl md:text-[90px] italic text-white tracking-tight leading-none mb-4 drop-shadow-2xl">
              Lost in the Mist
            </h3>
            <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-white/70 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
              Scroll back up to shrink
            </p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}


