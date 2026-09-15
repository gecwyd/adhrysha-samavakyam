"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { resolveAsset } from "@/lib/asset-registry";

const STORY_PARAGRAPHS = [
  `“Jiya! Jiya! Jiya! Why are you late?” Laya’s voice rose across the classroom as Jiya rushed through the door, slightly out of breath. “I’m only two minutes late,” Jiya replied, placing her bag on the desk. “Two minutes is still late,” Laya said dramatically. “Then tell the clock to slow down.” The girls laughed as Jiya took her seat. Outside the classroom window, the morning sun brightened the school courtyard. Students hurried to their classrooms while teachers prepared for another busy day. For everyone else, it was just another ordinary school morning. For Jiya, it was another day carrying dreams bigger than herself. Jiya was a Plus Two student in a Government Higher Secondary School. She came from a middle-class family where every rupee mattered. Her father worked long hours to support the family, and her mother stitched clothes for neighbours. They were not rich, but they were rich in dreams. Their biggest dream was Jiya. They wanted her to study well, secure a good career, and build a future brighter than their own. Jiya understood those sacrifices. Every morning before school, she packed her lunch and made sure everything at home was settled before leaving for class. She was hardworking, responsible, and focused on her studies. But like many teenagers, she had once carried a small secret in her heart. Back in Class 11, she had developed a small crush on a boy named Afeel. It was innocent. She never confessed. Like many teenagers, she imagined conversations that never happened and stories that never became real. That was all. Eventually, the crush faded. Life moved on. By the time Plus Two began, Afeel had become just a memory. Then came Riyan. Unlike Afeel, Riyan entered her life unexpectedly. One day he borrowed a pen. The next day he borrowed notes. Then he borrowed her calculator. Soon he was borrowing her patience too. “You should return my things one day,” Jiya complained. Riyan laughed. Their friendship grew naturally. They studied together, shared notes, helped each other prepare for exams, argued about silly things, and laughed during lunch breaks. Slowly, friendship turned into more. For the first time, Jiya felt truly understood. Riyan knew about her dreams. He knew how hard she worked, and he admired her for it.`,
  `Everything seemed perfect. Until the rumours began. One afternoon, two students saw Jiya and Riyan talking near the library. The next day, gossip started. At first, it was harmless. Then someone remembered Afeel. Suddenly people began saying: “First Afeel, Now Riyan.” “She always has someone.” The stories became more ridiculous every day. Students who barely knew her spoke about her life as if they were experts. One boy confidently claimed she had a secret list of boyfriends. The reality was exactly the opposite. Most of her time was spent solving Physics problems and worrying about Mathematics. But nobody cared about reality. Reality was boring. Rumours were entertaining. Soon people began staring whenever she entered a classroom. Whispers followed her through corridors. Some students judged her without even speaking to her. The shy crush on Afeel became proof. Her relationship with Riyan became evident. And her silence became confirmation. One day, during a free period, the Malayalam teacher entered the classroom. “Today,” she announced, “everyone will write an essay.” The entire class fell silent. “The topic is: The Most Dangerous Thing in School.” Students started writing immediately. Some chose examinations. Some chose mathematics. Some chose strict teachers. Jiya sat quietly. Then she began writing. She wrote about a tiny spark. The spark jumped from one dry leaf to another. People laughed and watched. The spark thought it was harmless. But slowly the entire forest caught fire. At the end of the story, the spark looked around and asked: “When did I become a disaster?” The essay won first prize. A week later, the teacher read it aloud during the school assembly. Students laughed at first. Then they became silent. Because they understood. The spark was a rumour. And every person who repeated it helped the fire grow. For the first time, many students felt uncomfortable. Not because they were being accused, but because they recognised themselves in the story.`,
  `Months passed. The rumours never completely disappeared. But Jiya changed. She stopped trying to explain herself. She stopped trying to convince everyone. Instead, she focused on her goals. When people talked, she studied. When people judged, she worked harder. When people laughed, she moved forward. And through everything, Riyan remained beside her. Whenever she felt discouraged, he reminded her of her dreams. Whenever she felt hurt, he made her laugh. Whenever the world seemed unfair, he reminded her that not everyone believed the rumours. Board examinations finally arrived. Jiya worked harder than ever before. Her parents continued supporting her. Riyan encouraged her every day. When the results came, Jiya passed with excellent marks. The same people who once discussed her personal life were now discussing her success.`,
  `Years passed. Many rumours disappeared. Many people forgot the stories they had created. Many classmates moved away and started new lives. But Jiya remembered everything. Not because she wanted revenge, but because she had learned how powerful words could be. One evening, after completing her engineering degree, Jiya stood on a college campus waiting for someone. A familiar voice called out behind her. “Still dreaming?” She turned around. It was Riyan. The same smile. The same eyes. The same person who had stood beside her when everyone else was busy judging her. Through entrance exams, college admissions, failures, successes, and countless challenges, they had remained together. The rumours had predicted their ending a hundred times. Yet they were still writing their story. Together. Jiya smiled. “Do you know something funny?” she asked. “What?” “People spent years talking about my life.” Riyan laughed. “They still do.” “Maybe. But no when you succeeded either.” For a moment, they stood silently watching the sunset. The sky was painted with orange and gold. Beautiful. Peaceful. Real. Unlike the stories people had invented about them. Years ago, everyone thought rumours would ruin Jiya’s life. Instead, she graduated, built a career, made her parents proud, and found someone who loved her for who she truly was. Not for the stories people told, but for the person she was. As they walked away together, Jiya realised something. Rumours may change how people see you, but they cannot decide who you become. That choice is yours alone. The girl who once cried because of whispers had become a woman who no longer feared them. And the boy who was once just a chapter in a school rumour had become the most beautiful part of her future. The rumours ended. Their love story didn’t. None of them were there when I cried.” Riyan gently held her hand. “None of them were there`,
];

function StoryParagraph({ text, isFirst, index }: { text: string, isFirst?: boolean, index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress: lineProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"]
  });
  
  const scaleY = useSpring(lineProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const { scrollYProgress: entryProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "start 60%"]
  });
  
  const opacity = useTransform(entryProgress, [0, 1], [0.1, 1]);
  const y = useTransform(entryProgress, [0, 1], [40, 0]);
  const filter = useTransform(entryProgress, [0, 1], ["blur(8px)", "blur(0px)"]);

  return (
    <div className="relative pl-10 sm:pl-16">
      <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-[#e6e0d3]/10" />
      
      <motion.div 
        style={{ scaleY }} 
        className="absolute top-0 bottom-0 left-0 w-[2px] bg-[#d99065] origin-top z-10" 
      />
      
      <motion.div 
        style={{ opacity: lineProgress }} 
        className="absolute top-2 -left-[14px] sm:-left-[18px] w-7 h-7 sm:w-9 sm:h-9 bg-[#131211] border border-[#d99065] rounded-full flex items-center justify-center font-mono text-[9px] sm:text-[10px] text-[#d99065] z-20"
      >
        {index + 1}
      </motion.div>

      <motion.div
        ref={ref}
        style={{ opacity, y, filter }}
        className={`font-sans font-light text-[22px] sm:text-[26px] md:text-[30px] lg:text-[34px] leading-[1.7] sm:leading-[1.85] text-[#e6e0d3]/95 tracking-tight text-justify sm:text-left will-change-[opacity,transform,filter] ${
          isFirst 
            ? 'first-letter:text-[80px] sm:first-letter:text-[110px] first-letter:font-heading first-letter:float-left first-letter:leading-[0.8] first-letter:mr-5 first-letter:mt-2 first-letter:text-[#d99065]' 
            : ''
        }`}
      >
        {text}
      </motion.div>
    </div>
  );
}

export function RuiningRumours() {
  return (
    <section
      id="sec-p"
      aria-labelledby="ruining-rumours-title"
      className="relative w-full bg-[#131211] text-[#e6e0d3]"
    >
      <div className="mx-auto w-full pt-32 pb-16 md:pt-48 px-6 sm:px-10">
         
         <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-24 md:mb-32">
           <motion.div 
             initial={{ opacity: 0, y: 15 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="flex flex-col items-center gap-4 sm:gap-6 mb-12 sm:mb-16"
           >
             <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.4em] text-[#d99065]">
               A story of resilience
             </p>
           </motion.div>
           
           <motion.h2
             id="ruining-rumours-title"
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2, duration: 1 }}
             className="font-heading text-[16vw] sm:text-[14vw] md:text-[110px] lg:text-[130px] leading-[0.9] tracking-[-0.04em] text-[#e6e0d3]"
           >
              RUINING
              <br />
              <span className="text-[#d99065] italic">RUMOURS.</span>
           </motion.h2>
         </div>

         <div className="relative w-full max-w-[760px] mx-auto flex flex-col gap-12 sm:gap-16 pb-20">
            {STORY_PARAGRAPHS.map((para, i) => (
               <StoryParagraph key={i} text={para} isFirst={i === 0} index={i} />
            ))}
         </div>

         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
           transition={{ duration: 0.8 }}
           className="mt-24 md:mt-32 mb-16 flex justify-center"
         >
            <div className="flex flex-col items-center text-center border-t border-[#e6e0d3]/10 pt-16 w-full max-w-md">
               <div className="relative h-20 w-20 sm:h-24 sm:w-24 overflow-hidden rounded-full grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-700 border border-[#e6e0d3]/20 mb-6">
                  <Image 
                    src={resolveAsset("niba-nasrin.png")} 
                    alt="Author portrait of Niba Nasrin" 
                    fill 
                    sizes="96px" 
                    unoptimized
                    className="object-cover" 
                  />
               </div>
               <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#d99065] mb-2">
                 Written by
               </span>
               <span className="font-sans text-3xl sm:text-4xl tracking-tight text-[#e6e0d3] mb-2">
                 Niba Nasrin
               </span>
               <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#e6e0d3]/40">
                 First year · Electronics & Communication
               </span>
            </div>
         </motion.div>

      </div>
      
      <footer className="w-full border-t border-[#e6e0d3]/5">
        <div className="mx-auto max-w-[1440px] px-6 py-6 sm:px-10 lg:px-16 flex flex-col gap-2 font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.14em] text-[#e6e0d3]/40 sm:flex-row sm:items-center sm:justify-between">
          <span>Author · Niba Nasrin</span>
          <span>College Union 2026–27 · Source pages 24–26</span>
        </div>
      </footer>
    </section>
  );
}

export default RuiningRumours;
