"use client";

import { ReactNode } from "react";
import Image from "next/image";
import { resolveAsset } from "@/lib/asset-registry";

const STANZAS = [
  [
    "I have never stood on a battlefield,",
    "Yet I have heard its echoes",
    "Through the cries of children,",
    "The silence of broken homes,",
    "And the eyes that have forgotten what peace looks like.",
  ],
  [
    "War may begin with power and politics,",
    "But it always ends in the lives of ordinary people.",
    "A child does not know the language of borders;",
    "A mother does not pray for victory,",
    "She only prays that her family survives another night.",
  ],
  [
    "The sky belongs to everyone,",
    "Yet today it carries smoke instead of dreams.",
    "The earth beneath our feet",
    "Does not ask who we are,",
    "Why then do we let hatred decide our future?",
  ],
  [
    "I dream of a world",
    "Where schools are rebuilt before weapons,",
    "Where hands reach to heal, not to harm,",
    "Where every child grows up",
    "Knowing books more than fear.",
  ],
  [
    "Perhaps I cannot stop a war.",
    "Perhaps my words cannot silence the guns.",
    "But I can choose compassion over hatred,",
    "Hope over despair,",
    "And humanity over division.",
  ],
  [
    "Because in the end,",
    "No nation truly wins",
    "When innocent lives are lost.",
  ],
  [
    "The greatest victory",
    "Will never be written in the history of wars,",
    "But in the day",
  ],
];

function Stanza({ lines, finalLine }: { lines: string[], finalLine?: string }) {
  return (
    <div className="mb-24 text-lg font-light leading-[2.2] tracking-wide text-[#e2e8f0] md:text-2xl md:leading-[2.4] italic font-serif">
      {lines.map((line, idx) => (
        <p key={idx}>{line}</p>
      ))}
      {finalLine && (
        <p className="mt-8 block text-2xl text-[#8da6b9] not-italic lg:text-4xl">
          {finalLine}
        </p>
      )}
    </div>
  );
}

export function HumanityBeyondWar() {
  return (
    <section 
      id="sec-humanity-beyond-war" 
      className="relative w-full bg-[#1f2224] text-[#e2e8f0]"
    >
      <div className="mx-auto flex max-w-[90rem] flex-col lg:flex-row">
        
        {/* Sticky Left Column: Image & Title */}
        <div className="relative h-[100dvh] w-full lg:sticky lg:top-0 lg:w-[45%] xl:w-[40%]">
          <div className="absolute inset-0 z-0 overflow-hidden bg-[#1f2224]">
            <div className="absolute inset-0 bg-[#8da6b9]/10 mix-blend-color z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1f2224] via-[#1f2224]/40 to-transparent z-10 lg:bg-gradient-to-r lg:from-transparent lg:via-[#1f2224]/60 lg:to-[#1f2224]" />
            <Image
              src={resolveAsset("humanity-beyond-war.webp")}
              alt="Two children walking together toward a peaceful sunrise"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-1000"
              unoptimized
            />
          </div>
          
          <div className="relative z-20 flex h-full flex-col justify-end p-8 md:p-16 lg:px-16 lg:py-24">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[#8da6b9]">
              Poetry · 09
            </p>
            <h2 className="font-heading text-6xl leading-[1.1] tracking-widest text-[#e2e8f0] uppercase xl:text-7xl">
              Humanity<br />
              <span className="text-[#8da6b9]">Beyond War.</span>
            </h2>
            <p className="mt-6 font-serif text-xl italic tracking-wide text-[#e2e8f0]/70">
              A prayer for peace.
            </p>
          </div>
        </div>

        {/* Scrolling Right Column: The Poem */}
        <div className="relative z-10 flex w-full flex-col justify-center px-8 py-24 md:px-16 md:py-32 lg:w-[55%] xl:w-[60%] lg:px-24">
          <article className="max-w-xl">
            {STANZAS.map((stanza, index) => (
              <Stanza 
                key={index} 
                lines={stanza} 
              />
            ))}
            <Stanza 
              lines={[]} 
              finalLine="When humanity finally stands beyond war." 
            />
          </article>
        </div>
      </div>

      {/* Author Profile */}
      <div className="relative z-20 flex flex-col items-center justify-center border-t border-[#8da6b9]/10 bg-[#1f2224] px-6 py-32 text-center md:py-40">
        <div className="mb-8 h-24 w-24 overflow-hidden rounded-full border-2 border-[#8da6b9]/30 bg-[#8da6b9]/10 p-1 md:h-32 md:w-32">
          <div className="h-full w-full overflow-hidden rounded-full">
            <Image 
              src={resolveAsset("saliha.webp")} 
              alt="Saliha vk" 
              width={128} 
              height={128} 
              className="h-full w-full object-cover grayscale mix-blend-luminosity transition-all duration-500 hover:grayscale-0 hover:mix-blend-normal"
              unoptimized
            />
          </div>
        </div>
        <span className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[#8da6b9]">
          Written by
        </span>
        <h3 className="font-serif text-2xl text-[#e2e8f0] md:text-4xl">
          Saliha vk
        </h3>
        <p className="mt-2 font-sans text-sm tracking-widest uppercase text-[#e2e8f0]/50 md:text-base">
          Second year, Electronics and communication
        </p>
      </div>
    </section>
  );
}
