"use client";

import Image from "next/image";
import { resolveAsset } from "@/lib/asset-registry";

const PARAGRAPHS = [
  "“Jiya! Jiya! Jiya! Why are you late?” Laya’s voice rose across the classroom as Jiya rushed through the door, slightly out of breath.",
  "“I’m only two minutes late,” Jiya replied, placing her bag on the desk.",
  "“Two minutes is still late,” Laya said dramatically.",
  "“Then tell the clock to slow down.”",
  "The girls laughed as Jiya took her seat. Outside the classroom window, the morning sun brightened the school courtyard. Students hurried to their classrooms while teachers prepared for another busy day.",
  "For everyone else, it was just another ordinary school morning. For Jiya, it was another day carrying dreams bigger than herself.",
  "Jiya was a Plus Two student in a Government Higher Secondary School. She came from a middle-class family where every rupee mattered. Her father worked long hours to support the family, and her mother stitched clothes for neighbours. They were not rich, but they were rich in dreams.",
  "Their biggest dream was Jiya. They wanted her to study well, secure a good career, and build a future brighter than their own. Jiya understood those sacrifices. Every morning before school, she packed her lunch and made sure everything at home was settled before leaving for class. She was hardworking, responsible, and focused on her studies.",
  "But like many teenagers, she had once carried a small secret in her heart. Back in Class 11, she had developed a small crush on a boy named Afeel. It was innocent. She never confessed. Like many teenagers, she imagined conversations that never happened and stories that never became real.",
  "That was all. Eventually, the crush faded. Life moved on. By the time Plus Two began, Afeel had become just a memory.",
  "Then came Riyan. Unlike Afeel, Riyan entered her life unexpectedly. One day he borrowed a pen. The next day he borrowed notes. Then he borrowed her calculator. Soon he was borrowing her patience too.",
  "“You should return my things one day,” Jiya complained. Riyan laughed.",
  "Their friendship grew naturally. They studied together, shared notes, helped each other prepare for exams, argued about silly things, and laughed during lunch breaks. Slowly, friendship turned into more. For the first time, Jiya felt truly understood. Riyan knew about her dreams. He knew how hard she worked, and he admired her for it.",
  "Everything seemed perfect. Until the rumours began.",
  "One afternoon, two students saw Jiya and Riyan talking near the library. The next day, gossip started. At first, it was harmless. Then someone remembered Afeel. Suddenly people began saying: “First Afeel. Now Riyan.” “She always has someone.”",
  "The stories became more ridiculous every day. Students who barely knew her spoke about her life as if they were experts. One boy confidently claimed she had a secret list of boyfriends.",
  "The reality was exactly the opposite. Most of her time was spent solving Physics problems and worrying about Mathematics. But nobody cared about reality. Reality was boring. Rumours were entertaining.",
  "Soon people began staring whenever she entered a classroom. Whispers followed her through corridors. Some students judged her without even speaking to her. The shy crush on Afeel became proof. Her relationship with Riyan became evidence. And her silence became confirmation.",
  "One day, during a free period, the Malayalam teacher entered the classroom. “Today,” she announced, “everyone will write an essay.” The entire class fell silent. “The topic is: The Most Dangerous Thing in School.”",
  "Students started writing immediately. Some chose examinations. Some chose mathematics. Some chose strict teachers. Jiya sat quietly. Then she began writing.",
  "She wrote about a tiny spark. The spark jumped from one dry leaf to another. People laughed and watched. The spark thought it was harmless. But slowly the entire forest caught fire. At the end of the story, the spark looked around and asked: “When did I become a disaster?”",
  "The essay won first prize. A week later, the teacher read it aloud during the school assembly. Students laughed at first. Then they became silent. Because they understood.",
  "The spark was a rumour. And every person who repeated it helped the fire grow. For the first time, many students felt uncomfortable. Not because they were being accused, but because they recognised themselves in the story.",
  "Months passed. The rumours never completely disappeared. But Jiya changed.",
  "She stopped trying to explain herself. She stopped trying to convince everyone. Instead, she focused on her goals. When people talked, she studied. When people judged, she worked harder. When people laughed, she moved forward.",
  "And through everything, Riyan remained beside her. Whenever she felt discouraged, he reminded her of her dreams. Whenever she felt hurt, he made her laugh. Whenever the world seemed unfair, he reminded her that not everyone believed the rumours.",
  "Board examinations finally arrived. Jiya worked harder than ever before. Her parents continued supporting her. Riyan encouraged her every day.",
  "When the results came, Jiya passed with excellent marks. The same people who once discussed her personal life were now discussing her success.",
  "Years passed. Many rumours disappeared. Many people forgot the stories they had created. Many classmates moved away and started new lives.",
  "But Jiya remembered everything. Not because she wanted revenge, but because she had learned how powerful words could be.",
  "One evening, after completing her engineering degree, Jiya stood on a college campus waiting for someone. A familiar voice called out behind her. “Still dreaming?”",
  "She turned around. It was Riyan. The same smile. The same eyes. The same person who had stood beside her when everyone else was busy judging her.",
  "Through entrance exams, college admissions, failures, successes, and countless challenges, they had remained together. The rumours had predicted their ending a hundred times. Yet they were still writing their story. Together.",
  "“Do you know something funny?” Jiya asked. “What?” “People spent years talking about my life.” Riyan laughed. “They still do.” “Maybe. But none of them were there when I cried.” Riyan gently held her hand. “None of them were there when you succeeded either.”",
  "For a moment, they stood silently watching the sunset. The sky was painted with orange and gold. Beautiful. Peaceful. Real. Unlike the stories people had invented about them.",
  "Years ago, everyone thought rumours would ruin Jiya’s life. Instead, she graduated, built a career, made her parents proud, and found someone who loved her for who she truly was. Not for the stories people told, but for the person she was.",
  "As they walked away together, Jiya realised something. Rumours may change how people see you, but they cannot decide who you become. That choice is yours alone.",
  "The girl who once cried because of whispers had become a woman who no longer feared them. And the boy who was once just a chapter in a school rumour had become the most beautiful part of her future.",
  "The rumours ended. Their love story didn’t.",
];

function P({ children }: { children: string }) {
  return (
    <p className="mb-10 font-serif text-[1.12rem] font-light leading-[2.1] tracking-wide text-[#e7e5e4] md:text-[1.22rem] md:leading-[2.3]">
      {children}
    </p>
  );
}

export function RuiningRumours() {
  return (
    <section
      id="sec-p"
      aria-labelledby="rumours-title"
      className="relative w-full bg-[#1c1917] text-[#f5f5f4]"
    >
      <div className="mx-auto flex max-w-[90rem] flex-col lg:flex-row">
        <div className="relative h-[100dvh] w-full lg:sticky lg:top-0 lg:w-[45%] xl:w-[40%]">
          <div className="absolute inset-0 z-0 overflow-hidden bg-[#1c1917]">
            <div className="absolute inset-0 bg-[#ea580c]/10 mix-blend-color z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1c1917] via-[#1c1917]/40 to-transparent z-10 lg:bg-gradient-to-r lg:from-transparent lg:via-[#1c1917]/60 lg:to-[#1c1917]" />
            <Image
              src={resolveAsset("ruining-rumours-corridor.webp")}
              alt="A young woman holding a notebook in a sunlit school corridor"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover opacity-45 grayscale hover:grayscale-0 transition-all duration-1000"
              unoptimized
            />
          </div>

          <div className="relative z-20 flex h-full flex-col justify-end p-8 md:p-16 lg:px-16 lg:py-24">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[#fb923c]">
              Inquation / Short Fiction
            </p>
            <h2
              id="rumours-title"
              className="font-heading text-5xl sm:text-6xl leading-[1.05] tracking-tight text-[#f5f5f4] uppercase xl:text-7xl"
            >
              Ruining<br />
              <span className="text-[#ea580c]">Rumours.</span>
            </h2>
            <p className="mt-6 font-serif text-xl italic tracking-wide text-[#e7e5e4]/70">
              They had a lot to say. She had a life to live.
            </p>
          </div>
        </div>

        <div className="relative z-10 flex w-full flex-col justify-center px-8 py-24 md:px-16 md:py-32 lg:w-[55%] xl:w-[60%] lg:px-24">
          <article className="max-w-2xl">
            {PARAGRAPHS.slice(0, 13).map((p, i) => (
              <P key={i}>{p}</P>
            ))}

            <div className="my-16 border-l-2 border-[#ea580c]/70 bg-gradient-to-r from-[#ea580c]/5 to-transparent py-10 pl-8 md:my-20 md:pl-12">
              <p className="font-serif text-2xl font-light italic leading-relaxed text-[#fb923c] md:text-3xl">
                &ldquo;The spark thought it was harmless. But slowly the entire forest caught fire.&rdquo;
              </p>
            </div>

            {PARAGRAPHS.slice(13, 23).map((p, i) => (
              <P key={i + 13}>{p}</P>
            ))}

            <div className="my-16 border-l-2 border-[#ea580c]/70 bg-gradient-to-r from-[#ea580c]/5 to-transparent py-10 pl-8 md:my-20 md:pl-12">
              <p className="font-serif text-2xl font-light italic leading-relaxed text-[#fb923c] md:text-3xl">
                &ldquo;Rumours may change how people see you, but they cannot decide who you become.&rdquo;
              </p>
            </div>

            {PARAGRAPHS.slice(23).map((p, i) => (
              <P key={i + 23}>{p}</P>
            ))}
          </article>
        </div>
      </div>

      <div className="relative z-20 flex flex-col items-center justify-center border-t border-[#ea580c]/15 bg-[#1c1917] px-6 py-28 text-center md:py-36">
        <div className="mb-8 h-24 w-24 overflow-hidden rounded-full border-2 border-[#ea580c]/30 bg-[#ea580c]/10 p-1 md:h-32 md:w-32">
          <div className="h-full w-full overflow-hidden rounded-full">
            <Image
              src={resolveAsset("niba-nasrin.webp")}
              alt="Niba Nasrin"
              width={128}
              height={128}
              className="h-full w-full object-cover grayscale mix-blend-luminosity transition-all duration-500 hover:grayscale-0 hover:mix-blend-normal"
              unoptimized
            />
          </div>
        </div>
        <span className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[#fb923c]/80">
          Written by
        </span>
        <h3 className="font-serif text-2xl text-[#f5f5f4] md:text-4xl">
          Niba Nasrin
        </h3>
        <p className="mt-2 font-sans text-xs tracking-widest uppercase text-[#e7e5e4]/50 md:text-sm">
          First Year · Electronics &amp; Communication
        </p>
      </div>
    </section>
  );
}

export default RuiningRumours;
