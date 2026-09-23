"use client";

import { ReactNode } from "react";
import Image from "next/image";
import { resolveAsset } from "@/lib/asset-registry";

const STANZAS = [
  [
    "People speaks of roots and wings",
    "As though they belong to different lives",
    "My roots and wings grew together.",
  ],
  [
    "My roots were not gardens",
    "They were late nights of swallowed tears",
    "Fears that sat beside me",
    "Like silent companions.",
  ],
  [
    "They hold me to places",
    "I want to forget",
    "They reminded me of storms",
    "Long after the rain had passed",
  ],
  [
    "From the same soil",
    "Wings began to grow",
    "Stitched from hope",
    "From dreams whispered softly",
    "To a heart that almost gave up",
  ],
  [
    "So I keep moving forward",
    "Carrying both the ache and ambition",
    "Hoping that one day",
    "My parents look at me and smile",
    "And see not the girl who struggled",
  ],
];

function Stanza({ lines, finalLine }: { lines: string[], finalLine?: string }) {
  return (
    <div className="mb-24 text-lg font-light leading-[2.2] tracking-wide text-[#d7dce4] md:text-2xl md:leading-[2.4] italic font-serif">
      {lines.map((line, idx) => (
        <p key={idx}>{line}</p>
      ))}
      {finalLine && (
        <p className="mt-8 block text-2xl text-[#d4b483] not-italic lg:text-4xl">
          {finalLine}
        </p>
      )}
    </div>
  );
}

export function StitchedWings() {
  return (
    <section 
      id="sec-stitched-wings" 
      className="relative w-full bg-[#09111b] text-[#d7dce4]"
    >
      <div className="mx-auto flex max-w-[90rem] flex-col lg:flex-row">
        
        {/* Sticky Left Column: Image & Title */}
        <div className="relative h-[100dvh] w-full lg:sticky lg:top-0 lg:w-[45%] xl:w-[40%]">
          <div className="absolute inset-0 z-0 overflow-hidden bg-[#09111b]">
            <div className="absolute inset-0 bg-[#d4b483]/10 mix-blend-color z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#09111b] via-[#09111b]/40 to-transparent z-10 lg:bg-gradient-to-r lg:from-transparent lg:via-[#09111b]/60 lg:to-[#09111b]" />
            <Image
              src={resolveAsset("stitched-wings-roots.webp")}
              alt="A woman whose roots grow into wings mended with golden thread"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-1000"
              unoptimized
            />
          </div>
          
          <div className="relative z-20 flex h-full flex-col justify-end p-8 md:p-16 lg:px-16 lg:py-24">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[#d4b483]">
              Poetry · 07
            </p>
            <h2 className="font-heading text-6xl leading-[1.1] tracking-widest text-[#f0ede6] uppercase xl:text-7xl">
              Stitched<br />
              <span className="text-[#d4b483]">Wings.</span>
            </h2>
            <p className="mt-6 font-serif text-xl italic tracking-wide text-[#d7dce4]/70">
              A poem of growth
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
                finalLine={index === STANZAS.length - 1 ? "But the girl who flew." : undefined} 
              />
            ))}
          </article>
        </div>
      </div>

      {/* Author Profile */}
      <div className="relative z-20 flex flex-col items-center justify-center border-t border-[#d4b483]/10 bg-[#09111b] px-6 py-32 text-center md:py-40">
        <div className="mb-8 h-24 w-24 overflow-hidden rounded-full border-2 border-[#d4b483]/30 bg-[#d4b483]/10 p-1 md:h-32 md:w-32">
          <div className="h-full w-full overflow-hidden rounded-full">
            <Image 
              src={resolveAsset("sreya.webp")} 
              alt="Sreya Raghavan" 
              width={128} 
              height={128} 
              className="h-full w-full object-cover grayscale mix-blend-luminosity transition-all duration-500 hover:grayscale-0 hover:mix-blend-normal"
            />
          </div>
        </div>
        <span className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[#d4b483]">
          Written by
        </span>
        <h3 className="font-serif text-2xl text-[#f0ede6] md:text-4xl">
          Sreya Raghavan
        </h3>
        <p className="mt-2 font-sans text-sm tracking-widest uppercase text-[#d7dce4]/50 md:text-base">
          Second year, Electrical and electronics
        </p>
      </div>
    </section>
  );
}
