"use client";

import { ReactNode } from "react";
import Image from "next/image";
import { resolveAsset } from "@/lib/asset-registry";

function Stanza({ children }: { children: ReactNode }) {
  return (
    <div className="mb-24 text-lg font-light leading-[2.2] tracking-wide text-[#c0aec9] md:text-2xl md:leading-[2.4]">
      {children}
    </div>
  );
}

export function CurseOfHope() {
  return (
    <section 
      id="sec-curse-of-hope" 
      className="relative w-full bg-[#140f1a] text-[#d5c7e8]"
    >
      <div className="mx-auto flex max-w-7xl flex-col md:flex-row">
        
        {/* Sticky Left Column: Image & Title */}
        <div className="relative h-[100dvh] w-full md:sticky md:top-0 md:w-1/2 md:border-r md:border-[#d98fa6]/10">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 bg-[#d98fa6]/20 mix-blend-color z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#140f1a] via-[#140f1a]/40 to-transparent z-10 md:bg-gradient-to-r md:from-transparent md:via-[#140f1a]/40 md:to-[#140f1a]" />
            <Image
              src={resolveAsset("distant_connection.webp")}
              alt="Abstract representation of hope and connection"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover opacity-40 grayscale"
              unoptimized
            />
          </div>
          
          <div className="relative z-20 flex h-full flex-col justify-end p-8 md:p-16 lg:p-24">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[#d98fa6]">
              Inquation / Poetry · 05
            </p>
            <h2 className="font-heading text-6xl leading-[1.1] tracking-widest text-[#d5c7e8] uppercase lg:text-7xl">
              The Curse<br />
              <span className="text-[#d98fa6]">Of Hope.</span>
            </h2>
            <p className="mt-6 font-serif text-xl italic tracking-wide text-[#c0aec9]">
              A Poem on Vulnerability
            </p>
          </div>
        </div>

        {/* Scrolling Right Column: The Poem */}
        <div className="relative z-10 flex w-full flex-col justify-center px-8 py-24 md:w-1/2 md:px-16 md:py-32 lg:px-24">
          <article className="max-w-xl font-serif italic">
            <Stanza>
              <p>She loves without limitations</p>
              <p>She always did love the people.</p>
              <p>She always believed someone would find her</p>
              <p>the way she wanted,</p>
              <p>And she thought that person was the one.</p>
              <p>Maybe that&apos;s her mistake;</p>
              <p className="text-[#d98fa6] not-italic mt-2">That&apos;s her curse.</p>
            </Stanza>

            <Stanza>
              <p>She let them know too much,</p>
              <p>And still, she doesn&apos;t know she is naive</p>
              <p>Because she thinks 11:11 wishes always come true.</p>
              <p>People take all the love in her like it&apos;s free;</p>
              <p>People always use her kindness like it&apos;s endless.</p>
              <p>Little did they know, it cost her everything;</p>
              <p>It cost her herself and her happiness.</p>
            </Stanza>

            <Stanza>
              <p>Every time they don&apos;t pick up her call,</p>
              <p>Every day they are not there for her,</p>
              <p>She still believes they want her.</p>
              <p>And that&apos;s how she ended up being helpless;</p>
              <p>That&apos;s why she doesn&apos;t want to trust anyone;</p>
              <p>That&apos;s why she doesn&apos;t want to fall in love again.</p>
            </Stanza>

            <Stanza>
              <p>Every time they leave, she knows something in her dims;</p>
              <p>Every time they come again, she knows something lights her up.</p>
              <p>But now she is sure they wouldn&apos;t be there,</p>
              <p>And now she doesn&apos;t want anyone to do that,</p>
              <p>Because even after everything,</p>
              <p>It&apos;s the same thing the world gives her.</p>
              <p>Not everyone can handle a heart like hers,</p>
              <p>But even now, she believes they could,</p>
              <p>And that&apos;s not her fault.</p>
            </Stanza>

            <Stanza>
              <p>Still, she doesn&apos;t know how much longer she will</p>
              <p>Keep loving them over everything.</p>
              <p>Still, she believes they love her the same way:</p>
              <p className="mt-8 block text-2xl text-[#d98fa6] not-italic lg:text-3xl">
                Not out of sympathy,<br/>
                But out of love...
              </p>
            </Stanza>
          </article>
        </div>
      </div>

      {/* Author Profile */}
      <div className="relative z-20 flex flex-col items-center justify-center border-t border-[#d98fa6]/10 bg-[#140f1a] px-6 py-32 text-center md:py-40">
        <div className="mb-8 h-24 w-24 overflow-hidden rounded-full border-2 border-[#d98fa6]/30 bg-[#d98fa6]/10 p-1 md:h-32 md:w-32">
          <div className="h-full w-full overflow-hidden rounded-full">
            <Image 
              src={resolveAsset("nivedya.png")} 
              alt="Nivedya A" 
              width={128} 
              height={128} 
              className="h-full w-full object-cover grayscale mix-blend-luminosity transition-all duration-500 hover:grayscale-0 hover:mix-blend-normal"
            />
          </div>
        </div>
        <span className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[#d98fa6]">
          Written by
        </span>
        <h3 className="font-serif text-2xl text-[#d5c7e8] md:text-4xl">
          Nivedya A
        </h3>
        <p className="mt-2 font-sans text-sm tracking-widest uppercase text-[#d5c7e8]/50 md:text-base">
          1st Year, Electronics & Comm.
        </p>
      </div>
    </section>
  );
}
