"use client";

import { motion } from "framer-motion";
import { resolveAsset } from "@/lib/asset-registry";

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

function ArticleParagraph({ text, isFirst }: { text: string, isFirst?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} // Smooth custom ease
      className={`font-sans font-light text-[22px] sm:text-[26px] md:text-[30px] lg:text-[34px] leading-[1.7] sm:leading-[1.85] text-[#d9d4c7]/95 tracking-tight text-justify sm:text-left ${
        isFirst 
          ? 'first-letter:text-[80px] sm:first-letter:text-[110px] first-letter:font-heading first-letter:float-left first-letter:leading-[0.8] first-letter:mr-5 first-letter:mt-2 first-letter:text-[#d99065]' 
          : ''
      }`}
    >
      {text}
    </motion.div>
  );
}

export function WritingEraAi() {
  return (
    <section
      id="sec-l"
      aria-labelledby="writing-era-ai-title"
      className="relative w-full bg-[#12110e] text-[#d9d4c7]"
    >
      <div className="mx-auto w-full pt-32 pb-16 md:pt-48 px-6 sm:px-10">
         
         {/* Minimal Editorial Header */}
         <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-24 md:mb-32">
           <motion.div 
             initial={{ opacity: 0, y: 15 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="flex flex-col items-center gap-4 sm:gap-6 mb-12 sm:mb-16"
           >
             <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.4em] text-[#d99065]">
               An essay on originality
             </p>
           </motion.div>
           
           <motion.h2
             id="writing-era-ai-title"
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2, duration: 1 }}
             className="font-heading text-[16vw] sm:text-[14vw] md:text-[110px] lg:text-[130px] leading-[0.9] tracking-[-0.04em] text-[#d9d4c7]"
           >
              WRITING
              <br />
              <span className="text-[#d99065] italic">IN THE ERA OF AI.</span>
           </motion.h2>
         </div>

         {/* Core Reading Experience - Two Column Editorial */}
         <div className="relative w-full max-w-[1300px] mx-auto lg:grid lg:grid-cols-12 gap-10 lg:gap-20 pb-20">
            <div className="lg:col-span-5 hidden lg:block">
               <div className="sticky top-32 w-full h-[75vh] rounded-xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-[1.5s] border border-[#d9d4c7]/10">
                 <img
                   src={resolveAsset("writing-era-ai-art.webp")}
                   alt="Typewriter merging with digital fibers"
                   className="w-full h-full object-cover"
                 />
                 <div className="absolute inset-0 bg-[#12110e]/30 mix-blend-overlay" />
               </div>
            </div>

            <div className="lg:col-span-7 flex flex-col gap-10 sm:gap-14">
              <div className="w-full aspect-[4/5] rounded-xl overflow-hidden grayscale border border-[#d9d4c7]/10 lg:hidden mb-6">
                 <img
                   src={resolveAsset("writing-era-ai-art.webp")}
                   alt="Typewriter merging with digital fibers"
                   className="w-full h-full object-cover"
                 />
              </div>

              {ARTICLE_PARAGRAPHS.map((para, i) => (
                 <div key={`group-${i}`} className="flex flex-col gap-10 sm:gap-14">
                   {i === 3 && (
                     <motion.blockquote 
                       initial={{ opacity: 0, x: -20 }}
                       whileInView={{ opacity: 1, x: 0 }}
                       viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                       transition={{ duration: 0.8 }}
                       className="border-l-[3px] border-[#d99065] pl-6 sm:pl-8 my-4 py-2"
                     >
                       <p className="font-heading text-[28px] sm:text-[34px] md:text-[40px] text-[#d99065] leading-[1.1] tracking-tight">
                         "AI should never be filling the bill of thinking or spawning ideas for you."
                       </p>
                     </motion.blockquote>
                   )}
                   <ArticleParagraph text={para} isFirst={i === 0} />
                 </div>
              ))}
            </div>
         </div>

         {/* Minimal Author Lockup (No Image per User Request) */}
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
           transition={{ duration: 0.8 }}
           className="mt-24 md:mt-32 mb-16 flex justify-center"
         >
            <div className="flex flex-col items-center text-center border-t border-[#d9d4c7]/10 pt-16 w-full max-w-md">
               <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#d99065] mb-2 sm:mb-4">
                 Written by
               </span>
               <span className="font-sans text-4xl sm:text-5xl lg:text-[64px] tracking-tight text-[#d9d4c7] mb-2 sm:mb-4 leading-none">
                 Fathima Aslam
               </span>
               <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#d9d4c7]/40">
                 S6 · Electrical & Electronics Engineering
               </span>
            </div>
         </motion.div>

      </div>
      
      <footer className="w-full border-t border-[#d9d4c7]/5">
        <div className="mx-auto max-w-[1440px] px-6 py-6 sm:px-10 lg:px-16 flex flex-col gap-2 font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.14em] text-[#d9d4c7]/40 sm:flex-row sm:items-center sm:justify-between">
          <span>Author · Fathima Aslam</span>
          <span>College Union 2026–27</span>
        </div>
      </footer>
    </section>
  );
}

export default WritingEraAi;
