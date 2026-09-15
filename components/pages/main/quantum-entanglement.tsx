"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export function QuantumEntanglement() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 22, restDelta: 0.001 });

  // Headline reveal and fade
  const headlineOpacity = useTransform(smooth, [0, 0.25, 0.38], [1, 1, 0]);
  const headlineY = useTransform(smooth, [0.25, 0.38], [0, -80]);
  const headlineScale = useTransform(smooth, [0, 0.38], [1, 1.05]);

  // The minimal visual block - remains active through the scroll
  const visualOpacity = useTransform(smooth, [0.3, 0.45], [0, 1]);
  const visualY = useTransform(smooth, [0.3, 0.45], [60, 0]);

  // Particles pulling apart
  const p1X = useTransform(smooth, [0.45, 0.95], ["0vw", "-30vw"]);
  const p2X = useTransform(smooth, [0.45, 0.95], ["0vw", "30vw"]);
  
  // The line stretching
  const lineWidth = useTransform(smooth, [0.45, 0.95], ["0vw", "60vw"]);
  const lineOpacity = useTransform(smooth, [0.45, 0.52], [0, 1]);

  return (
    <section
      ref={containerRef}
      id="sec-quantum"
      aria-labelledby="quantum-title"
      className="relative h-[250vh] w-full bg-[#050505] text-[#fafafa] selection:bg-white selection:text-black"
    >
      <div className="sticky top-0 h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* Subtle noise texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

        {/* Title Screen */}
        <motion.div
          style={{ opacity: headlineOpacity, y: headlineY, scale: headlineScale }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
        >
          <p className="font-mono text-[9px] md:text-[10px] tracking-[0.4em] text-white/30 uppercase mb-8">
            Phenomenon · 03
          </p>
          <h2
            id="quantum-title"
            className="font-heading font-black text-[13vw] sm:text-[11vw] md:text-[8vw] lg:text-[7vw] leading-[0.85] tracking-tight text-white mb-2 w-full text-center"
          >
            QUANTUM
            <br />
            <span className="text-white/30">ENTANGLEMENT.</span>
          </h2>
        </motion.div>

        {/* The Minimal Visual Screen */}
        <motion.div
          style={{ opacity: visualOpacity, y: visualY }}
          className="absolute inset-0 flex flex-col items-center justify-center w-full px-6 pointer-events-none"
        >
          
          <div className="relative w-full h-32 flex items-center justify-center mb-16">
             
             {/* The connection line */}
             <motion.div 
               style={{ width: lineWidth, opacity: lineOpacity }}
               className="absolute h-[1px] bg-white/20 origin-center"
             />

             {/* Particle A */}
             <motion.div
               style={{ x: p1X }}
               className="absolute flex flex-col items-center justify-center gap-4"
             >
                <div className="w-4 h-4 rounded-full border border-white/40 bg-white/5 flex items-center justify-center backdrop-blur-md">
                   <div className="w-1 h-1 rounded-full bg-white" />
                </div>
                <span className="font-mono text-[8px] uppercase tracking-widest text-white/30">Particle A</span>
             </motion.div>

             {/* Particle B */}
             <motion.div
               style={{ x: p2X }}
               className="absolute flex flex-col items-center justify-center gap-4"
             >
                <div className="w-4 h-4 rounded-full border border-white/40 bg-white/5 flex items-center justify-center backdrop-blur-md">
                   <div className="w-1 h-1 rounded-full bg-white" />
                </div>
                <span className="font-mono text-[8px] uppercase tracking-widest text-white/30">Particle B</span>
             </motion.div>
          </div>

          <div className="max-w-2xl text-center flex flex-col items-center mt-8">
             <div className="px-4 py-1.5 border border-white/10 rounded-full bg-white/5 mb-8">
                <p className="font-mono text-[9px] md:text-[10px] tracking-widest text-white/50">
                  |ψ⟩ = (1/√2) (|00⟩ + |11⟩)
                </p>
             </div>
             <h3 className="font-serif text-2xl md:text-4xl lg:text-5xl font-light leading-snug text-white/90 italic">
               Distance is an illusion.<br/>
               <span className="text-white/40">Two particles acting as one.</span>
             </h3>
          </div>

        </motion.div>

        {/* Footer info */}
        <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-10 pb-6 flex justify-between font-mono text-[7px] sm:text-[8px] tracking-[0.15em] uppercase text-white/20">
          <span>GEC Wayanad · 2025–26</span>
          <span>Action at a distance</span>
        </div>

      </div>
    </section>
  );
}

export default QuantumEntanglement;
