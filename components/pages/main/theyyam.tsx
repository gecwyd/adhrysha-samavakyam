"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { resolveAsset } from "@/lib/asset-registry";

type Block =
  | { kind: "p"; text: string; lede?: boolean }
  | { kind: "quote"; lines: string[]; source: string };

const BLOCKS: Block[] = [
  {
    kind: "p",
    lede: true,
    text: "\"അവനവൻ ആത്മസുഖത്തിനായി ആചരിക്കുന്നവ അപരന് സുഖത്തിനായി വരേണം\" എന്നല്ലെ ഗുരുവചനം! 'ആചാരം' എന്ന വാക്കിൻ്റെ ഉൽപ്പത്തി പരിശോധിച്ചാൽ അതൊരു നിരന്തരയാത്രയെ സൂചിപ്പിക്കുന്നതായി മനസിലാക്കാം. ഒരുപക്ഷെ മനുഷ്യൻ്റെ ജീവിതയാത്രയിൽ വ്യത്യസ്തങ്ങളായ ആചാര അനുഷ്ഠാനങ്ങൾ സ്വാധീനിക്കാറുണ്ട്.",
  },
  {
    kind: "p",
    text: "അത്തരത്തിൽ ഉത്തരമലബാറിലെ ജീവിത സംസ്കാരത്തിൽ ആഴത്തിൽ വേരുന്നിയ അനുഷ്ഠാന കലയാണ് തെയ്യം. നരവംശശാസ്ത്രപരമായും, സാമൂഹ്യശാസ്ത്രപരമായും തെയ്യത്തിനുള്ള പ്രസക്തിയും, മനുഷ്യ സംസ്കാരത്തിലേക്ക് നീണ്ടുനിൽക്കുന്ന അതിൻ്റെ വേരുകളും പടർച്ചകളും ഏറെ ചർച്ചചെയ്യപ്പെടേണ്ട വിഷയമാണ്.",
  },
  {
    kind: "p",
    text: "കേവലം ആചാരാനുഷ്ഠാനങ്ങൾക്കുമപ്പുറം ഒരു ദേശത്തിൻ്റെ സംസ്കാരവും, പൈതൃകവും, കൂട്ടായ്മയുമൊക്കെ ചേരുന്ന ഒരു കലാരൂപം എന്ന സവിശേഷതകൂടി ഉണ്ട് തെയ്യത്തിന്. ചരിത്രം എപ്പോഴും വിജയികളുടേതാണ്. എന്നാൽ തോറ്റു പോകാൻ വിസമ്മതിച്ചവരുടെ ചരിത്രമാണ് തെയ്യങ്ങൾ പറയുന്നത്.",
  },
  {
    kind: "p",
    text: "ശിശിരകാലത്തിൻ്റെ കുളിരിൽ ചെണ്ടയുടെ താളങ്ങൾക്കും, തോറ്റം പാട്ടുകൾക്കുമൊപ്പം ചുവപ്പണിഞ്ഞ തെയ്യക്കോലങ്ങൾ ആടുമ്പോൾ അതിനുപിന്നിൽ ഒരു വിലാപത്തിൻ്റെ ഈണം പ്രത്യക്ഷമാവുന്നുണ്ട്. തോറ്റം പാട്ടുകൾക്ക് ഒരു വിപ്ലവത്തിൻ്റെ വീര്യമുണ്ട്.",
  },
  {
    kind: "p",
    text: "അവിടെ ആടിത്തിമിർക്കുന്ന ആ ഓരോ തെയ്യക്കോലവും കേവലം മന്ത്രങ്ങളാൽ ആവാഹിക്കപ്പെട്ട ദേവതകളല്ല, മറിച്ച് അറിവിനെ ആയുധമാക്കിയതിന്റെ പേരിൽ ബലികഴിക്കപ്പെട്ട മനുഷ്യരുടെ ഉയിർത്തെഴുന്നേൽപ്പുകളാണ്. ജന്മിതത്തിന് എതിരെയും നാടുവാഴിത്തം കെട്ടിപ്പൊക്കിയ സാമൂഹിക വ്യവസ്ഥിതികൾക്കെതിരെയും നിലകൊണ്ടവരുടെ ചരിത്രകഥ ഇവയ്ക്ക് പിന്നിലുണ്ട്.",
  },
  {
    kind: "p",
    text: "കണ്ണീരും, ചോരയും വീണ ആ മണ്ണിൽ നിന്നാണ് പിന്നീട് നവോത്ഥാനത്തിൻ്റെ ആദ്യ സ്ഫുരണങ്ങൾ ഉണ്ടായത്. തെയ്യങ്ങളുടെ പുരാവൃത്തങ്ങൾ പരിശോധിച്ചാൽ അവ ആത്മീയതയേക്കാൾ ഉപരി ഭൗതികജീവിതത്തിന്റെ നേർക്കാഴ്ച്ചകളാണെന്ന് മനസിലാക്കാം.",
  },
  {
    kind: "p",
    text: "ജാതിയും, വരേണ്യതയും തീർത്ത വേലിക്കെട്ടുകൾക്കുമീതെ അറിവിൻ്റേയും, അതിജീവനത്തിൻറേയും ചെറുത്തുനിൽപ്പുകൾ അനിവാര്യമാണ് എന്ന സന്ദേശം ചരിത്രം മുന്നോട്ട് വയ്ക്കുന്നു. ഉദാഹരണത്തിന് ഉത്തരമലബാറിലെ പൊട്ടൻ തെയ്യത്തിൻ്റെ തോറ്റം പാട്ടിലെ ചില വരികളുണ്ട്:",
  },
  {
    kind: "quote",
    lines: [
      "നീങ്കളെക്കൊത്ത്യാലും ചോരല്ലേ ചൊവ്വറ്?",
      "നാങ്കളെക്കൊത്ത്യാലും ചോരലേ ചൊവ്വറ്?",
    ],
    source: "പൊട്ടൻ തെയ്യം · തോറ്റം പാട്ട്",
  },
  {
    kind: "p",
    text: "മനുഷ്യരെല്ലാം തുല്യരാണെന്നും, മനുഷ്യൻ്റെ സിരകളിലൂടെ ഒഴുകുന്ന രക്തത്തിന് ഒരേ നിറമാണ് എന്നും, ജാതിയുടെയും മതത്തിൻ്റേയും പേരിൽ ആരെയും ഉയർന്നവരോ, താഴ്ന്നവരോ ആയി കാണരുതെന്നും ഇതിലൂടെ വ്യക്തമാക്കുന്നു.",
  },
  {
    kind: "p",
    text: "ഇത്തരത്തിൽ അതിജീവനത്തിൻ്റെയും, ചെറുത്തുനിൽപ്പുകളുടയും തോറ്റം പാട്ടുകൾ ഇവിടംകൊണ്ട് അവസാനിക്കുന്നില്ല. അവ ഓരോ കാലത്തെയും അനീതികൾക്കും, അധർമ്മങ്ങൾക്കുമെതിരെ ശബ്ദിച്ചുകൊണ്ടേയിരിക്കും.",
  },
];

/* Paragraph ordinals, counted once at module scope so the quote does not consume a number. */
const ORDINALS = BLOCKS.reduce<number[]>((acc, block, i) => {
  acc[i] = block.kind === "p" ? (acc[i - 1] ?? 0) + 1 : acc[i - 1] ?? 0;
  return acc;
}, []);

const EASE = [0.16, 1, 0.3, 1] as const;

/* A hairline "mudi" — the crown of the theyyam drawn as concentric arcs and rays. */
function CrownMotif() {
  const arcs = [96, 132, 168, 204, 240];
  const rays = Array.from({ length: 17 }, (_, i) => -90 + (i - 8) * 10.5);

  return (
    <svg
      viewBox="0 0 600 340"
      aria-hidden
      className="w-full h-full"
      fill="none"
      strokeLinecap="round"
    >
      {rays.map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const x1 = 300 + Math.cos(rad) * 70;
        const y1 = 300 + Math.sin(rad) * 70;
        const x2 = 300 + Math.cos(rad) * (250 + (i % 2 ? 22 : 0));
        const y2 = 300 + Math.sin(rad) * (250 + (i % 2 ? 22 : 0));
        return (
          <motion.line
            key={`ray-${deg}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={i % 2 ? "#d3452b" : "#e0a35e"}
            strokeWidth={0.75}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: i % 2 ? 0.35 : 0.5 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.5 + Math.abs(i - 8) * 0.04, ease: EASE }}
          />
        );
      })}

      {arcs.map((r, i) => (
        <motion.path
          key={`arc-${r}`}
          d={`M ${300 - r} 300 A ${r} ${r} 0 0 1 ${300 + r} 300`}
          stroke="#e0a35e"
          strokeWidth={i === 0 ? 1.2 : 0.65}
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: i === 0 ? 0.6 : 0.28 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, delay: 0.15 * i, ease: EASE }}
        />
      ))}

      <motion.circle
        cx={300}
        cy={300}
        r={9}
        fill="#d3452b"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.85 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.9, ease: EASE }}
        style={{ transformOrigin: "300px 300px" }}
      />
    </svg>
  );
}

function Paragraph({ text, ordinal, lede }: { text: string; ordinal: number; lede?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: 1, ease: EASE }}
      className="group relative md:grid md:grid-cols-[4rem_1fr] md:gap-8"
      lang="ml"
    >
      <span
        aria-hidden
        className="mb-3 block font-mono text-[10px] tracking-[0.2em] text-[#e0a35e]/45 transition-colors duration-500 group-hover:text-[#e0a35e] md:mb-0 md:pt-[0.9em] md:text-right"
      >
        {String(ordinal).padStart(2, "0")}
      </span>
      <p
        className={`font-sans tracking-tight text-pretty ${
          lede
            ? "text-[21px] leading-[1.85] text-[#efe3d0] sm:text-[24px] md:text-[27px] md:leading-[1.8]"
            : "text-[18px] leading-[1.95] text-[#efe3d0]/80 sm:text-[20px] md:text-[22px] md:leading-[1.9]"
        }`}
      >
        {text}
      </p>
    </motion.div>
  );
}

function PullQuote({ lines, source }: { lines: string[]; source: string }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: 1, ease: EASE }}
      className="relative md:ml-[6rem]"
      lang="ml"
    >
      <motion.span
        aria-hidden
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: EASE }}
        className="absolute left-0 top-0 h-full w-px origin-top bg-gradient-to-b from-[#d3452b] via-[#e0a35e]/60 to-transparent"
      />
      <blockquote className="pl-6 sm:pl-10">
        {lines.map((line) => (
          <p
            key={line}
            className="font-sans text-[22px] leading-[1.6] tracking-tight text-[#e0a35e] sm:text-[28px] md:text-[34px]"
          >
            {line}
          </p>
        ))}
        <figcaption className="mt-6 font-mono text-[9px] uppercase tracking-[0.28em] text-[#efe3d0]/35">
          {source}
        </figcaption>
      </blockquote>
    </motion.figure>
  );
}

export function Theyyam() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], [0, -70]);
  const heroFade = useTransform(heroProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="sec-o"
      aria-labelledby="theyyam-title"
      className="relative w-full overflow-hidden bg-[#12100e] text-[#efe3d0]"
    >
      {/* Ember glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[120vh] opacity-70"
        style={{
          background:
            "radial-gradient(70% 50% at 50% 30%, rgba(211,69,43,0.16) 0%, rgba(224,163,94,0.06) 40%, transparent 72%)",
        }}
      />

      {/* Reading progress rail */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-10 z-20 hidden lg:block"
      >
        <div className="sticky top-0 flex h-screen flex-col items-center justify-center gap-6">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#efe3d0]/25 [writing-mode:vertical-rl]">
            Theyyam
          </span>
          <div className="relative h-40 w-px bg-[#efe3d0]/10">
            <motion.div
              style={{ scaleY: progress }}
              className="absolute inset-0 origin-top bg-gradient-to-b from-[#d3452b] to-[#e0a35e]"
            />
          </div>
        </div>
      </div>

      {/* Hero */}
      <div ref={heroRef} className="relative flex min-h-[92svh] flex-col justify-center px-6 pt-28 pb-16 sm:px-10 lg:px-24">
        {/* Hero background image */}
        <div 
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
          style={{
            backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/1/1b/Theyyam_of_Kerala_3.jpg")',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#12100e] via-[#12100e]/70 to-[#12100e]/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#12100e] via-[#12100e]/40 to-transparent" />
        </div>

        <motion.div
          style={{ y: heroY, opacity: heroFade }}
          className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col items-center text-center"
        >
          <div className="relative flex w-full flex-col items-center">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-[18%] left-1/2 h-[min(46vw,340px)] w-[min(92vw,600px)] -translate-x-1/2"
            >
              <CrownMotif />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE }}
              className="relative font-mono text-[9px] uppercase tracking-[0.42em] text-[#e0a35e] sm:text-[10px]"
            >
              Culture · Survival · Resistance
            </motion.p>

            <motion.h2
              id="theyyam-title"
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.15, ease: EASE }}
              className="relative mt-8 font-sans text-[22vw] leading-[0.95] tracking-[-0.06em] text-[#efe3d0] sm:text-[18vw] md:text-[160px] lg:text-[190px]"
              lang="ml"
            >
              തെയ്യം
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.35, ease: EASE }}
            className="mt-6 max-w-2xl font-sans text-[18px] leading-[1.5] tracking-tight text-[#e0a35e] sm:mt-10 sm:text-[26px] md:text-[32px]"
            lang="ml"
          >
            അതിജീവനത്തിന്റെ കലയും ചെറുത്തുനിൽപ്പും.
          </motion.p>
        </motion.div>

        {/* Hero meta strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mx-auto mt-16 grid w-full max-w-[1200px] grid-cols-2 gap-px border-t border-[#efe3d0]/10 pt-5 font-mono text-[8px] uppercase tracking-[0.22em] text-[#efe3d0]/35 sm:mt-24 sm:grid-cols-4 sm:text-[9px]"
        >
          <span>Essay</span>
          <span className="sm:text-center">Malayalam</span>
          <span className="sm:text-center">North Malabar</span>
          <span className="text-right text-[#efe3d0]/55">Asika K</span>
        </motion.div>
      </div>

      {/* Body */}
      <div className="relative mx-auto w-full max-w-[46rem] px-6 pb-28 sm:px-10 md:pb-40">
        <div className="flex flex-col gap-14 sm:gap-20">
          {BLOCKS.map((block, i) => {
            if (block.kind === "quote") {
              return <PullQuote key={`q-${i}`} lines={block.lines} source={block.source} />;
            }
            return (
              <Paragraph key={`p-${i}`} text={block.text} ordinal={ORDINALS[i]} lede={block.lede} />
            );
          })}
        </div>

        {/* Theyyam image interlude */}
        <motion.figure
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE }}
          className="relative -mx-6 my-20 flex flex-col items-center overflow-hidden rounded-lg border border-[#efe3d0]/10 bg-[#1a1814] sm:-mx-10 lg:my-28 lg:rounded-2xl"
        >
          <div className="relative h-64 w-full overflow-hidden sm:h-80 lg:h-[500px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Theyyam_of_Kerala_3.jpg"
              alt="Theyyam performer in traditional attire with red and gold makeup"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#12100e]/80 via-transparent to-transparent" />
          </div>
          <figcaption className="px-6 py-8 text-center text-[13px] leading-relaxed text-[#efe3d0]/50 sm:px-10 sm:text-[14px]">
            <span className="font-mono tracking-[0.2em]">THEYYAM OF KERALA</span>
            <p className="mt-3">Photograph by Shagil Kannur · Creative Commons Attribution-Share Alike 4.0</p>
          </figcaption>
        </motion.figure>

        {/* Closing mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          aria-hidden
          className="mt-20 flex items-center justify-center gap-3"
        >
          <span className="h-px w-10 bg-[#efe3d0]/15" />
          <span className="h-1.5 w-1.5 rotate-45 bg-[#d3452b]" />
          <span className="h-px w-10 bg-[#efe3d0]/15" />
        </motion.div>

        {/* Author */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mt-20 flex flex-col items-center gap-6 border-t border-[#efe3d0]/10 pt-14 sm:flex-row sm:items-center sm:gap-8"
        >
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-[#efe3d0]/10 grayscale transition-all duration-700 hover:grayscale-0 sm:h-24 sm:w-24">
            <Image
              src={resolveAsset("asika-k.png")}
              alt="Author portrait of Asika K"
              fill
              sizes="96px"
              unoptimized
              className="object-cover"
            />
          </div>
          <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
            <span className="mb-2 font-mono text-[9px] uppercase tracking-[0.3em] text-[#e0a35e]">
              Written by
            </span>
            <span className="font-sans text-3xl leading-none tracking-tight text-[#efe3d0] sm:text-4xl lg:text-[44px]">
              Asika K
            </span>
            <span className="mt-3 font-mono text-[9px] uppercase tracking-[0.15em] text-[#efe3d0]/40">
              Second year · Electronics &amp; Communication
            </span>
          </div>
        </motion.div>
      </div>

      <footer className="relative w-full border-t border-[#efe3d0]/5">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-6 py-6 font-mono text-[8px] uppercase tracking-[0.14em] text-[#efe3d0]/30 sm:flex-row sm:items-center sm:justify-between sm:px-10 sm:text-[9px] lg:px-16">
          <span>Author · Asika K</span>
          <span>College Union 2026–27 · Source pages 23–24</span>
        </div>
      </footer>
    </section>
  );
}

export default Theyyam;
