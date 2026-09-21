"use client";

import { useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { Noto_Serif_Malayalam } from "next/font/google";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { resolveAsset } from "@/lib/asset-registry";
import { BlackHole } from "./black-hole";

const malayalam = Noto_Serif_Malayalam({
  subsets: ["malayalam", "latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const P = ({ children, lead = false }: { children: ReactNode; lead?: boolean }) => (
  <p className={lead ? "text-[1.35em] font-light leading-[1.8] text-[#f0eadc]" : "text-[1.1em] font-light leading-[2.1] text-[#d9d3c5]"}>
    {children}
  </p>
);

const Pull = ({ children, accent }: { children: ReactNode; accent?: ReactNode }) => (
  <blockquote className="border-l-[3px] border-[#d99065] my-8 py-2 pl-6 md:pl-8 text-[1.5em] font-light leading-[1.6] text-[#f0eadc]">
    {children}
    {accent && <span className="mt-3 block text-[0.8em] font-normal text-[#d99065]">{accent}</span>}
  </blockquote>
);

const Beat = ({ children }: { children: ReactNode }) => (
  <p className="my-6 text-[1.25em] font-medium leading-[1.8] text-[#f0eadc]">{children}</p>
);

const Label = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <span
    lang="en"
    className={`font-mono text-[10px] uppercase tracking-[0.3em] text-[#d99065] ${className}`}
  >
    {children}
  </span>
);

function Chapter({ no, title, children }: { no: string; title: string; children: ReactNode }) {
  return (
    <section data-ch={no} data-title={title} className="pt-16 first:pt-0 md:pt-24">
      <div className="mb-10 flex items-center gap-4 md:mb-14">
        <Label>
          {no} · {title}
        </Label>
        <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-[#d99065]/40 to-transparent" />
      </div>
      <div className="space-y-[1.6em]">{children}</div>
    </section>
  );
}



export function Thamodwaram() {
  const coverRef = useRef<HTMLElement>(null);
  const readRef = useRef<HTMLDivElement>(null);

  /* Cover picture drifts a little; nothing in the reading area moves. */
  const { scrollYProgress: coverP } = useScroll({
    target: coverRef,
    offset: ["start start", "end start"],
  });
  const coverY = useTransform(coverP, [0, 1], ["0%", "12%"]);
  const coverScale = useTransform(coverP, [0, 1], [1.05, 1.15]);

  return (
    <section
      id="sec-q"
      aria-labelledby="black-hole-title"
      className={`${malayalam.className} relative w-full bg-black text-[#e6e0d3]`}
    >
      <BlackHole />

      {/* ───────── Cover ───────── */}
      <header ref={coverRef} className="relative isolate flex min-h-[100dvh] items-end overflow-hidden">
        <motion.div style={{ y: coverY, scale: coverScale }} className="absolute inset-0 -z-10">
          <Image
            src={resolveAsset("thamodwaram-horizon.webp")}
            alt="A black hole ringed by a thin amber accretion disc"
            fill
            priority
            sizes="100vw"
            unoptimized
            className="object-cover"
          />
        </motion.div>
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/45 to-black/10" />

        <div className="mx-auto w-full max-w-5xl px-6 pb-14 md:px-8 md:pb-24">
          <Label>A Philosophical Essay · Inquation</Label>
          <h2 lang="ml" className="mt-6 text-[2.25rem] font-light leading-[1.3] text-[#f0eadc] sm:text-[3.5rem] md:text-[5.5rem] md:leading-[1.2]">
            അഗാധതയുടെ
            <br />
            <span className="text-[#d99065]">അപ്പുറം</span>
          </h2>
        </div>
      </header>

      <div ref={readRef} className="relative">
        <article
          lang="ml"
          className="mx-auto max-w-[40rem] px-6 pb-32 pt-8 text-[1.25rem] md:px-8 md:pt-12"
        >
          <Chapter no="I" title="The Abyss">
            <P lead>
              തമോദ്വാരം എന്നത് പ്രപഞ്ചത്തിലെ അതിഗുരുത്വാകർഷണം നിറഞ്ഞ ഒരു മേഖലയാണ്. അതിന്റെ
              ആകർഷണശക്തി അത്രമേൽ പ്രബലമാണ്; വെളിച്ചത്തിന് പോലും അതിൽ നിന്ന് രക്ഷപ്പെടാനാവില്ല.
            </P>
            <P>അത്യന്തം സാന്ദ്രമായി ചുരുങ്ങിക്കൂടിയ ദ്രവ്യത്തിന്റെ അദൃശ്യരൂപമാണത്.</P>
            <P>
              തമോദ്വാരം യഥാർത്ഥത്തിൽ എന്തിനെല്ലാം വിഴുങ്ങുന്നു? ഇന്നും ശാസ്ത്രലോകം വ്യക്തമായ ഉത്തരങ്ങൾ
              തേടിക്കൊണ്ടിരിക്കുകയാണ്.
            </P>
            <P>
              പ്രകാശം പുറപ്പെടുവിക്കുകയോ പ്രതിഫലിപ്പിക്കുകയോ ചെയ്യാത്തതിനാൽ, അവ മനുഷ്യന്റെ കണ്ണിനും
              ദൂരദർശിനികൾക്കും അദൃശ്യമാണ്.
            </P>
          </Chapter>

          <Chapter no="II" title="The Metaphor">
            <Pull accent="അല്ല.">എന്നാൽ തമോദ്വാരം ശാസ്ത്രത്തിലെ ഒരു പദം മാത്രമാണോ?</Pull>
            <P>
              മനുഷ്യന്റെ ജീവിതത്തിലും അനേകം തമോദ്വാരങ്ങൾ ഉണ്ട്. ഇവയെല്ലാം പതിയെ നമ്മുടെ ഉള്ളിലേക്ക്
              വലിച്ചിഴച്ച്, പ്രതീക്ഷകളെയും ആത്മവിശ്വാസത്തെയും വിഴുങ്ങാൻ ശ്രമിക്കുന്ന അദൃശ്യശക്തികളാണ്.
            </P>

            <p lang="ml" className="py-2 text-[1.1em] font-serif tracking-normal text-[#d99065]">
              ഏകാന്തത · പരാജയം · ദുഃഖം · അനിശ്ചിതത്വം · അർഥമില്ലായ്മ
            </p>

            <P>
              മറ്റുള്ളവരുമായി ചേർന്നുനിൽക്കാൻ കഴിയാത്ത അവസ്ഥ, സ്വന്തമായ ഇടം കണ്ടെത്താനാകാത്ത വേദന,
              സ്വയം അപര്യാപ്തനാണെന്ന തോന്നൽ, ഇവയൊക്കെയാണ് മനസ്സിലെ തമോദ്വാരങ്ങളുടെ രൂപങ്ങൾ.
            </P>

            <div className="my-8 grid gap-8 border-y border-[#e6e0d3]/10 py-8 md:grid-cols-2">
              <div className="flex items-start gap-4 md:gap-5">
                <span aria-hidden className="mt-[0.6em] shrink-0 font-mono text-[10px] text-[#d99065] uppercase tracking-widest">01</span>
                <p className="text-[1.1em] font-light leading-[1.8] text-[#d9d3c5]">പരാജയങ്ങളുടെ പേരിൽ സ്വയം കുറ്റപ്പെടുത്തൽ</p>
              </div>
              <div className="flex items-start gap-4 md:gap-5">
                <span aria-hidden className="mt-[0.6em] shrink-0 font-mono text-[10px] text-[#d99065] uppercase tracking-widest">02</span>
                <p className="text-[1.1em] font-light leading-[1.8] text-[#d9d3c5]">മറ്റുള്ളവരുമായി സ്വയം താരതമ്യം ചെയ്യൽ</p>
              </div>
              <div className="flex items-start gap-4 md:gap-5">
                <span aria-hidden className="mt-[0.6em] shrink-0 font-mono text-[10px] text-[#d99065] uppercase tracking-widest">03</span>
                <p className="text-[1.1em] font-light leading-[1.8] text-[#d9d3c5]">കാണപ്പെടുന്നില്ലെന്ന തോന്നലിൽ നിന്നുള്ള അസ്തിത്വപരമായ ഏകാന്തത</p>
              </div>
              <div className="flex items-start gap-4 md:gap-5">
                <span aria-hidden className="mt-[0.6em] shrink-0 font-mono text-[10px] text-[#d99065] uppercase tracking-widest">04</span>
                <p className="text-[1.1em] font-light leading-[1.8] text-[#d9d3c5]">അനുഭവങ്ങളിൽ നിന്ന് പഠിക്കാതെ അവയെ വിധിയെഴുതൽ</p>
              </div>
            </div>
            
            <div className="mb-6 mt-6 flex justify-center">
              <p className="text-center text-[1.4em] font-light leading-[1.7] text-[#d99065] md:text-[1.6em]">
                ഇവയെല്ലാം ഹൃദയത്തെ വിഴുങ്ങാൻ ശ്രമിക്കുന്ന
                <br className="hidden sm:block" />
                <span className="text-[#f0eadc]">മനസ്സിന്റെ തമോദ്വാരങ്ങളാണ്.</span>
              </p>
            </div>
            
            <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mb-8 mt-2 flex w-screen flex-col items-center justify-center overflow-hidden bg-black py-20 md:py-28">
              <Image
                src={resolveAsset("thamodwaram-lantern.webp")}
                alt="A lone figure holding a lantern on a cliff, facing a vast black void in the sky"
                fill
                sizes="100vw"
                unoptimized
                className="object-cover object-[50%_30%] opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/60" />
              <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black/40" />
              
              <div className="relative z-10 max-w-3xl px-6 text-center md:px-8">
                <p className="text-[1.35em] font-light leading-[1.8] text-[#f0eadc] drop-shadow-lg md:text-[1.65em]">
                  ഓരോ ജീവിതത്തിലും നമ്മെ വിഴുങ്ങുമെന്നു തോന്നുന്ന നിമിഷങ്ങൾ ഉണ്ടാകും. എന്നാൽ ആ ഇരുട്ടിന്
                  അപ്പുറം മനുഷ്യൻ കണ്ടെത്തുന്നത് അതിജീവനത്തിന്റെ ശക്തിയാണ്; പുതിയൊരു കാഴ്ചപ്പാടും പുതിയ
                  തുടക്കങ്ങളുമാണ്.
                </p>
                <div className="mt-8">
                  <Label className="text-[#d99065]/70">The Lantern</Label>
                </div>
              </div>
            </div>
          </Chapter>

          <Chapter no="III" title="The Struggle">
            <Pull accent="അതുപോലെ തന്നെയാണ് മനുഷ്യജീവിതവും.">
              സൂര്യൻ ഒരുനാൾ തമോദ്വാരമായി മാറിയാലും ഭൂമി അതിലേക്ക് വലിച്ചിഴക്കപ്പെടില്ല.
            </Pull>
            <P>
              എന്നാൽ ഈ ഭൂമിയിലെ സ്വയംബോധമുള്ള ഏക ജീവിയായ മനുഷ്യന് അവയെ അതിജീവിക്കാനുള്ള കഴിവുണ്ട്.
              ഇരുട്ടിലേക്ക് വീഴാതെ, അതിലൂടെ നടന്ന് വെളിച്ചത്തിലെത്താൻ അവന് സാധിക്കും.
            </P>
            <P>
              പരാജയങ്ങൾ നമ്മുടെ പരിമിതികളെ കാണിച്ചുതരുന്നു. എല്ലാം നേടാൻ കഴിയില്ലെന്നും, എല്ലാം
              രക്ഷിക്കാനാവില്ലെന്നും അവ നമ്മെ പഠിപ്പിക്കുന്നു.
            </P>
            <Beat>എന്നാൽ അതുകൊണ്ട് യാത്ര അവസാനിക്കുന്നില്ല.</Beat>
          </Chapter>

          <Chapter no="IV" title="The Hope">
            <Pull accent="സ്വയം പുതുക്കി മുന്നോട്ട് പോകാനുള്ള അവസരമാണ്.">
              പരാജയം നിർത്താനുള്ള സൂചനയല്ല;
            </Pull>
            <P>
              ഓരോ ഇരുളിനെയും വെളിച്ചമാക്കാനും, ഓരോ പരാജയത്തെയും വിജയമാക്കാനും, ഓരോ ദുഃഖത്തെയും
              സംതൃപ്തിയാക്കി മാറ്റാനും മനുഷ്യന് കഴിയുമെന്ന് വിശ്വസിക്കുന്നിടത്താണ് ജീവിതത്തിന്റെ യഥാർത്ഥ
              സൗന്ദര്യം.
            </P>
            <Beat>ജീവിതത്തിൽ തമോദ്വാരങ്ങൾ ഉണ്ടായിരിക്കും.<br/>എന്നാൽ അവ ഒരിക്കലും അവസാനമല്ല.</Beat>
          </Chapter>
        </article>
      </div>

      {/* ───────── Finale ───────── */}
      <div className="relative isolate flex min-h-[90dvh] items-center justify-center overflow-hidden">
        <Image
          src={resolveAsset("thamodwaram-dawn.webp")}
          alt="Amber light breaking over the rim of a black circle"
          fill
          sizes="100vw"
          unoptimized
          className="-z-10 object-cover"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-black/40" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-black via-black/60 to-black" />

        <div lang="ml" className="mx-auto max-w-4xl px-6 py-28 text-center md:px-8">
          <p className="text-lg text-[#e6e0d3]/70 md:text-2xl">കാരണം,</p>
          <p className="mt-6 text-[1.6rem] font-light leading-[1.7] text-[#f0eadc] md:text-[2.75rem] md:leading-[1.55]">
            തമോദ്വാരങ്ങൾ വെളിച്ചത്തെ വിഴുങ്ങിയേക്കാം.
          </p>
          <p className="mt-4 text-[1.6rem] font-normal leading-[1.7] text-[#d99065] [text-shadow:0_0_36px_rgba(217,144,101,0.4)] md:text-[2.75rem] md:leading-[1.55]">
            എന്നാൽ പ്രതീക്ഷയെ വിഴുങ്ങാൻ അവയ്ക്കൊരിക്കലും കഴിയില്ല.
          </p>
          <p lang="en" className="mt-12 font-serif text-sm italic text-[#e6e0d3]/60 md:text-base">
            Black holes may swallow light. But they can never swallow hope.
          </p>
        </div>
      </div>
    </section>
  );
}
