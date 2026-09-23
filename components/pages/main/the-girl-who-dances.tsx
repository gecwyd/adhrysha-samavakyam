"use client";

import { ReactNode } from "react";
import Image from "next/image";
import { resolveAsset } from "@/lib/asset-registry";

const STANZAS = [
  ["I began dancing at the age of three,", "On stages that felt like another world to me,", "A place where music became my breath,", "And movements spoke the words I couldn’t say."],
  ["As I grew, dance too grew with me.", "Bharatanatyam shaped my discipline,", "Kuchipudi gifted me grace,", "Mohiniyattam filled me with emotion.", "Together they became the language of my life."],
  ["But life had its own choreography", "My health shifted, quietly, slowly", "And the art that once lived in my bones", "Began slipping away", "Like sand through tired fingers."],
  ["People told me, “you’re lucky you danced so long,”", "“Take rest now.” But they never knew,", "When dance is your heartbeat,", "Stopping feels like a small death every single day."],
  ["Even now, when temple bells ring", "Or ankle bells echo in the distance,", "My eyes soften with tears.", "My mind still creates steps", "My soul still lifts with rhythm", "But my body refuses to follow."],
  ["The doctor said, “You shouldn’t dance until you’re 20.”", "Just two years.", "But for me it has felt like forever.", "I try to be strong. Sometimes I cry silently,", "Because passion hurts", "When it becomes something you must let go."],
  ["But deep inside, the dancer never stopped", "She still dreams in mudras,", "Counts the beat of thalam", "Sees herself in every dancer on stage.", "No doctor, no pain, no fear, no waiting", "Can pull dance from my soul.", "I was born to dance. I will dance again.", "I’m still a dancer."],
];

function Stanza({ lines, accent = false }: { lines: string[]; accent?: boolean }) {
  return (
    <div className={`mb-24 text-lg font-light leading-[2.2] tracking-wide md:text-2xl md:leading-[2.4] italic font-serif ${accent ? "text-[#fbbf24]" : "text-[#fef3c7]"}`}>
      {lines.map((line, idx) => (
        <p key={idx}>{line}</p>
      ))}
    </div>
  );
}

export function TheGirlWhoDances() {
  return (
    <section 
      id="sec-the-girl-who-dances" 
      className="relative w-full bg-[#370a0a] text-[#fef3c7]"
    >
      <div className="mx-auto flex max-w-[90rem] flex-col lg:flex-row">
        
        {/* Sticky Left Column: Image & Title */}
        <div className="relative h-[100dvh] w-full lg:sticky lg:top-0 lg:w-[45%] xl:w-[40%]">
          <div className="absolute inset-0 z-0 overflow-hidden bg-[#370a0a]">
            <div className="absolute inset-0 bg-[#fbbf24]/10 mix-blend-color z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#370a0a] via-[#370a0a]/40 to-transparent z-10 lg:bg-gradient-to-r lg:from-transparent lg:via-[#370a0a]/60 lg:to-[#370a0a]" />
            <Image
              src={resolveAsset("girl-dances-bells.webp")}
              alt="Classical dance ankle bells beside a wooden floor"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-1000"
              unoptimized
            />
          </div>
          
          <div className="relative z-20 flex h-full flex-col justify-end p-8 md:p-16 lg:px-16 lg:py-24">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[#fbbf24]/75">
              Poetry · 13
            </p>
            <h2 className="font-heading text-6xl leading-[1.1] tracking-widest text-[#fef3c7] uppercase xl:text-7xl">
              The girl<br />
              <span className="text-[#fbbf24]">who dances</span>
            </h2>
            <p className="mt-6 font-serif text-xl italic tracking-wide text-[#fef3c7]/70">
              Still dancing in her heart.
            </p>
          </div>
        </div>

        {/* Scrolling Right Column: The Poem */}
        <div className="relative z-10 flex w-full flex-col justify-center px-8 py-24 md:px-16 md:py-32 lg:w-[55%] xl:w-[60%] lg:px-24">
          <article className="max-w-xl">
            {STANZAS.slice(0, 2).map((lines, index) => (
              <Stanza key={index} lines={lines} />
            ))}
            
            {STANZAS.slice(2, 6).map((lines, index) => (
              <Stanza 
                key={index} 
                lines={lines} 
                accent={lines[0].startsWith("People") || lines[0].startsWith("The doctor")} 
              />
            ))}
            
            <Stanza lines={STANZAS[6]} />
          </article>
        </div>
      </div>

      {/* Finale & Author Profile */}
      <div className="relative z-20 flex flex-col items-center justify-center border-t border-[#fbbf24]/10 bg-[#370a0a] px-6 py-32 text-center md:py-48">
        
        <div className="mb-32 max-w-4xl">
          <p className="mb-10 font-serif text-3xl font-light leading-[1.7] text-[#fbbf24] md:text-5xl italic">
            Just waiting for my comeback.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center border-t border-[#fbbf24]/10 pt-24 w-full">
          <div className="mb-8 h-24 w-24 overflow-hidden rounded-full border-2 border-[#fbbf24]/30 bg-[#fbbf24]/10 p-1 md:h-32 md:w-32">
            <div className="h-full w-full overflow-hidden rounded-full">
              <Image 
                src={resolveAsset("ashtami.webp")} 
                alt="Ashtami Chandran" 
                width={128} 
                height={128} 
                className="h-full w-full object-cover grayscale mix-blend-luminosity transition-all duration-500 hover:grayscale-0 hover:mix-blend-normal"
                unoptimized
              />
            </div>
          </div>
          <span className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[#fbbf24]/70">
            Written by
          </span>
          <h3 className="font-serif text-2xl text-[#fef3c7] md:text-4xl">
            Ashtami Chandran
          </h3>
          <p className="mt-2 font-sans text-sm tracking-widest uppercase text-[#fef3c7]/50 md:text-base">
          First year, Electronics & Communication
          </p>
        </div>
      </div>
    </section>
  );
}
