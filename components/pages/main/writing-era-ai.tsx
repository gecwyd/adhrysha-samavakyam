"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import Image from "next/image";

const ARTICLE_PARAGRAPHS = [
  "Writing, I believe, is something anyone can carry off. Be it journals, articles, poems, essays and whatnot. You can jot whatever it is in your long, worked off shoes.",
  "Studies have shown that writing everyday helps in improving mental clarity and can sharpen your mind. It can even rewire your brain in the best possible way. Although to be a crackerjack you’ll have to feed it with reading and exercise with writing itself!",
  "However, with AI being in the same ring as us, writings have lost the essence they hold, though not in its entirety. While a slight use of AI is acceptable in writings, completely depending on it is a bummer. People are scared that what they write is not going to be viable in the fight for aesthetics, which account for why most People use AI for perfect writing.",
  "AI should never be filling the bill of thinking or spawning ideas for you. We humans are unique from everything else in the universe - solely because of our knack to think. Imagine being stripped off of the one novelty you own only because you settled upon a machine to do all your work. Sounds awful and pathetic, right?",
  "Well, that’s what is going to happen eventually with the involvement of AI into what we are fundamentally alleged to do. You will slowly become a slave to the AI Technology all the while perceiving that it’s the other way around.",
  "The famous Malayalam saying “അമിതമായാൽ അമൃതവും വിഷം” transliterated to anything consumed in its excess is virulent, impeccably befitting this picture. Know for a fact that the more we deny the use of any muscle in your body it becomes worn out. A muscle in our body needs proper training for it to be strong and in its shape. Just as muscles benefit from regular physical activity, the brain benefits from cognitive stimulation, which can help maintain and strengthen neural pathways. Not giving it proper exercise will weaken it to an extend of irretrievability.",
  "Therefore all in all what’s elucidated here is to think, write, summarize and generate ideas unassisted, without it going in as prompts in your AI’s inbox. I read an article where it said “whatever you write, it need not in the least be perfect, write for the sake of writing, and write anything and everything that comes off your hunch. This way you’ll always and forever have something to write about”.",
  "And no, whatever you author does not need to have the aesthetics the algorithm accepts, it predominantly has to be genuine and real.",
];

function Slide({ 
  children, 
  index, 
  total, 
  progress 
}: { 
  children: React.ReactNode, 
  index: number, 
  total: number, 
  progress: MotionValue<number> 
}) {
  const center = index / (total - 1);
  const spread = 1.2 / total; // slightly wider than 1/total to allow smooth crossfading

  const opacity = useTransform(
    progress,
    [center - spread, center, center + spread],
    [0, 1, 0]
  );

  const y = useTransform(
    progress,
    [center - spread, center, center + spread],
    [80, 0, -80]
  );

  const filter = useTransform(
    progress,
    [center - spread, center, center + spread],
    ["blur(12px)", "blur(0px)", "blur(12px)"]
  );
  
  // The first slide shouldn't fade/move/blur when scrolling UP past 0
  const o = index === 0 
    ? useTransform(progress, [0, center + spread], [1, 0])
    : index === total - 1
    ? useTransform(progress, [center - spread, 1], [0, 1])
    : opacity;

  const yPos = index === 0
    ? useTransform(progress, [0, center + spread], [0, -80])
    : index === total - 1
    ? useTransform(progress, [center - spread, 1], [80, 0])
    : y;

  const f = index === 0
    ? useTransform(progress, [0, center + spread], ["blur(0px)", "blur(12px)"])
    : index === total - 1
    ? useTransform(progress, [center - spread, 1], ["blur(12px)", "blur(0px)"])
    : filter;

  return (
    <motion.div
      style={{ opacity: o, y: yPos, filter: f }}
      className="absolute inset-0 flex flex-col items-center justify-center px-6 sm:px-12 md:px-24 max-w-6xl mx-auto text-center will-change-[opacity,transform,filter] pointer-events-none"
    >
      {children}
    </motion.div>
  );
}

export function WritingEraAi() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Use spring to make the transitions buttery smooth
  const smooth = useSpring(scrollYProgress, { stiffness: 45, damping: 20, mass: 0.8 });
  const progressWidth = useTransform(smooth, [0, 1], ["0%", "100%"]);

  const TOTAL_SLIDES = ARTICLE_PARAGRAPHS.length + 2; // Title + 8 Paragraphs + Author

  return (
    <section
      ref={containerRef}
      id="sec-l"
      aria-labelledby="writing-era-ai-title"
      // 10 slides -> ~1000vh ensures you have plenty of scroll depth for each paragraph
      className="relative h-[1000vh] w-full bg-[#12110e] text-[#d9d4c7]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-[#12110e]">
        
        {/* Subtle radial gradient for depth */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#12110e_80%)]" />

        <div className="relative z-10 w-full h-full">
           
           {/* Slide 0: Title */}
           <Slide index={0} total={TOTAL_SLIDES} progress={smooth}>
              <h2
                id="writing-era-ai-title"
                className="font-heading text-[18vw] sm:text-[15vw] md:text-[13vw] leading-[0.85] tracking-[-0.02em] text-[#d9d4c7]"
              >
                WRITING<br/>
                IN THE<br/>
                <span className="text-[#d99065]">ERA OF AI.</span>
              </h2>
           </Slide>

           {/* Slides 1-8: Essay Paragraphs */}
           {ARTICLE_PARAGRAPHS.map((para, i) => (
             <Slide key={i} index={i + 1} total={TOTAL_SLIDES} progress={smooth}>
               <p className="font-serif text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px] leading-[1.5] sm:leading-[1.4] text-[#d9d4c7] tracking-tight">
                 {para}
               </p>
             </Slide>
           ))}

           {/* Slide 9: Massive Author Byline */}
           <Slide index={TOTAL_SLIDES - 1} total={TOTAL_SLIDES} progress={smooth}>
             <div className="flex flex-col items-center pointer-events-auto">
                <div className="flex flex-col items-center text-center">
                   <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#d99065] mb-4 sm:mb-5">
                     Written by
                   </span>
                   <span className="font-sans text-4xl sm:text-6xl md:text-[80px] tracking-tight text-[#d9d4c7] leading-none mb-3 sm:mb-5">
                     Fathima Aslam
                   </span>
                   <span className="font-mono text-[9px] sm:text-[11px] uppercase tracking-[0.15em] text-[#d9d4c7]/40">
                     S6 · Electrical & Electronics Engineering
                   </span>
                </div>
             </div>
           </Slide>
        </div>

        {/* Global Footer & Progress Bar for this section */}
        <div className="absolute bottom-0 left-0 w-full z-20 bg-[#12110e]/50 backdrop-blur-md border-t border-[#d9d4c7]/5">
          <div className="px-6 py-6 sm:px-10 flex items-center justify-between font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.14em] text-[#d9d4c7]/40">
             <span>College Union 2026–27</span>
             <div className="w-32 md:w-48 h-[2px] bg-[#d9d4c7]/10 rounded-full overflow-hidden">
               <motion.div style={{ width: progressWidth }} className="h-full bg-[#d99065]" />
             </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default WritingEraAi;
