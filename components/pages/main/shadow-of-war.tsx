"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { resolveAsset } from "@/lib/asset-registry";

const STANZAS = [
  ["യുദ്ധത്തിന്റെ നിഴലിൽ മിന്നലൊച്ച മുഴങ്ങുന്നു..", "തകർന്ന വാതിലുകൾക്കു പുറകിൽ", "സ്നേഹമിപ്പോഴും ചലിച്ചുകൊണ്ടേയിരിക്കുന്നുണ്ട്..", "നല്ല പാതിയെ കാത്തിരിക്കുന്ന ഹൃദയങ്ങളുണ്ട്..", "അവരിൽ നിന്നും അവസാന ശ്വാസവും", "അറ്റുപോകും വരെ പോരാട്ടം തുടർന്നുകൊണ്ടേയിരിക്കും.."],
  ["കളിപ്പാട്ടങ്ങൾ വീണ നിലങ്ങൾ", "ചിതറിത്തെറിച്ച് വിണ്ടുകീറി കിടക്കുന്നു.."],
  ["പ്രിയപ്പെട്ടവർക്കു നൽകിയ വാഗ്ദാനങ്ങൾ", "ദൂരങ്ങൾക്കപ്പുറം കേൾക്കുന്നുണ്ട്..", "ഭീതിയുടെ രാത്രികളിലും", "പ്രത്യാശയുടെ ചെറുകനലിൽ അവർ ചിരി കണ്ടെത്തി.."],
  ["നിറഞ്ഞ നിഷ്കളങ്കതയെ ഒരമ്മ", "യുദ്ധത്തിന്റെ ഭീകര ശബ്ദങ്ങളിൽ", "നിന്ന് തന്റെ താരാട്ടു കൊണ്ട് മറച്ചുപിടിക്കുന്നു.."],
  ["ഉള്ളിൽ തുടിച്ച ജീവനെയും കൊണ്ട്", "പാഞ്ഞ മറ്റൊരമ്മ സമാധാനത്തിന്റെ", "പുതുലോകം സ്വപ്നം കാണുന്നു..", "ഹൃദയത്തിൽ നിറച്ചും", "ഭയമാണെങ്കിലും നാളെയുടെ പുലരി സന്തോഷം നൽകുമെന്ന് വിശ്വസിച്ചുകൊണ്ട് ..", "അവളുടെ കണ്ണുനീർ ഒരു നദിപോലെ കാണപ്പെട്ടു.."],
  ["രക്തം നിറച്ച പേനകൾ കൊണ്ടവർ", "കവിതയെഴുതി ഒരിക്കലും", "മായ്ക്കാനാകാത്ത കവിതകൾ.."],
];

const CLOSING = ["ഇരുട്ട് പടരുന്നിടത്ത്, യുദ്ധത്തിന്റെ നിഴലിൽ,", "പ്രത്യാശയുടെ പാത തെളിയുന്നുണ്ട്..", "ഒന്നിനും തോൽപ്പിക്കാനാവാത്ത പ്രത്യാശയുടെ പാത..", "പ്രണയവും സൗഹൃദവും കുടുംബവും,"];

const EASE = [0.16, 1, 0.3, 1] as const;

function Stanza({ lines }: { lines: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, ease: EASE }}
      className="relative mb-16 pl-6 sm:pl-8"
    >
      {lines.map((line, idx) => (
        <p key={idx} className="font-serif text-lg font-light italic leading-[2] tracking-wide text-[#f2ece2]/90 md:text-xl md:leading-[2.1]" lang="ml">
          {line}
        </p>
      ))}
    </motion.div>
  );
}

export function ShadowOfWar() {
  const articleRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: articleRef, offset: ["start 15%", "end 85%"] });
  const fuseHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="sec-shadow-of-war" className="relative w-full bg-[#120f0e] text-[#f2ece2]">
      <div className="mx-auto max-w-3xl px-6 py-28 sm:px-10 md:py-40">
        {/* Header */}
        <div className="relative mb-20 md:mb-28">
          <div className="flex items-start justify-between gap-8">
            <div>
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-[#f97316]/70">Poetry · 14</p>
              <h2 className="font-serif text-4xl italic leading-[1.15] text-[#f2ece2] sm:text-5xl md:text-6xl" lang="ml">
                യുദ്ധത്തിന്റെ <span className="text-[#f97316]">നിഴലിൽ</span>
              </h2>
              <p className="mt-5 font-serif text-base italic tracking-wide text-[#f2ece2]/50 md:text-lg">
                Where hope outlives the shadow.
              </p>
            </div>

            <div className="relative hidden h-28 w-24 shrink-0 overflow-hidden rounded-sm sm:block md:h-36 md:w-28">
              <Image
                src={resolveAsset("shadow-of-war-candle.webp")}
                alt="A candle glowing in a damaged room"
                fill
                sizes="112px"
                unoptimized
                className="object-cover grayscale opacity-70 transition-all duration-700 hover:grayscale-0 hover:opacity-100"
              />
            </div>
          </div>
          <div className="mt-10 h-px w-full bg-gradient-to-r from-[#f97316]/50 via-[#f2ece2]/10 to-transparent" />
        </div>

        {/* Body — poem with a burning fuse line along the margin */}
        <div ref={articleRef} className="relative">
          <div className="absolute -left-px top-0 hidden h-full w-px bg-[#f2ece2]/10 sm:block">
            <motion.div style={{ height: fuseHeight }} className="w-px bg-gradient-to-b from-[#f97316] to-[#f97316]/20" />
          </div>

          <article className="sm:pl-2">
            {STANZAS.slice(0, 3).map((lines, i) => (
              <Stanza key={i} lines={lines} />
            ))}

            <motion.figure
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.9, ease: EASE }}
              className="relative -mx-6 my-16 h-56 overflow-hidden rounded-sm sm:-mx-8 sm:ml-6 md:h-72"
            >
              <Image
                src={resolveAsset("father-poem-shadow.webp")}
                alt="A father's shadow beside a handwritten poem"
                fill
                sizes="(min-width: 768px) 40rem, 100vw"
                unoptimized
                className="object-cover grayscale opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#120f0e] via-transparent to-transparent" />
            </motion.figure>

            {STANZAS.slice(3).map((lines, i) => (
              <Stanza key={i + 3} lines={lines} />
            ))}
          </article>

          {/* Closing verse */}
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative mt-4 border-l-2 border-[#f97316] pl-6 sm:pl-8"
            lang="ml"
          >
            {CLOSING.map((line, idx) => (
              <p key={idx} className="mb-1 font-serif text-xl italic font-light leading-[1.7] text-[#f97316] last:mb-0 md:text-2xl">
                {line}
              </p>
            ))}
          </motion.blockquote>
        </div>

        {/* Finale */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1, ease: EASE }}
          className="mt-24 text-center font-serif text-2xl italic font-light leading-[1.6] text-[#f2ece2] md:mt-32 md:text-3xl"
          lang="ml"
        >
          സമരത്തിന്റെ ഹൃദയത്തിൽ സദാ ശക്തമായിരിക്കും..!!
        </motion.p>

        {/* Author */}
        <div className="mt-24 flex flex-col items-center border-t border-[#f2ece2]/10 pt-16 text-center md:mt-32">
          <div className="mb-6 h-16 w-16 overflow-hidden rounded-full border border-[#f97316]/30">
            <Image
              src={resolveAsset("hadin.webp")}
              alt="ഹാദിൻ മുഹമ്മദ്"
              width={64}
              height={64}
              unoptimized
              className="h-full w-full object-cover grayscale transition-all duration-500 hover:grayscale-0"
            />
          </div>
          <span className="mb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[#f97316]/70">Written by</span>
          <h3 className="font-serif text-xl text-[#f2ece2]" lang="ml">
            ഹാദിൻ മുഹമ്മദ്
          </h3>
          <p className="mt-1 font-sans text-xs uppercase tracking-widest text-[#f2ece2]/40" lang="ml">
            മൂന്നാം വർഷം, സിവിൽ എഞ്ചിനീയറിങ്
          </p>
        </div>
      </div>
    </section>
  );
}

export default ShadowOfWar;
