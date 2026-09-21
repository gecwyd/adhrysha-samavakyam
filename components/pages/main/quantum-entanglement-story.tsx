"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { Noto_Serif_Malayalam } from "next/font/google";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { resolveAsset } from "@/lib/asset-registry";

const malayalam = Noto_Serif_Malayalam({
  subsets: ["malayalam", "latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const INK = "#0a0a0b";
const THREAD = "#d1453b";

/*
 * IMAGES — each picture below is a placeholder until its real file is uploaded to the release assets.
 * To replace one: upload the file named in `file` (webp) and it swaps in automatically. Nothing else to change.
 * `alt` is the full brief for the picture, so it can be handed straight to an image generator.
 */
type Shot = { n: number; file: string; ratio: string; alt: string; mock: string };

const SHOTS = {
  entangled: {
    n: 1,
    file: "invisible-thread-entangled.webp",
    ratio: "21:9",
    alt: "Two tiny points of soft white light far apart on a pure black field, joined by a single hair-thin crimson thread that arcs between them and catches a faint glint along its length. Vast negative space, minimalist, monochrome except for the thread. No text.",
    mock: "linear-gradient(120deg, #101012 0%, #0a0a0b 100%)",
  },
  corridor: {
    n: 2,
    file: "invisible-thread-corridor.webp",
    ratio: "21:9",
    alt: "An empty college corridor at dusk seen from one end, long soft shadows on the floor, pale window light on one side, and two blurred silhouettes far away at the other end as if laughing. Black-and-white film grain, with a single thin crimson thread running along the wall handrail. No legible faces, no text.",
    mock: "linear-gradient(120deg, #17171a 0%, #0a0a0b 100%)",
  },
  trace: {
    n: 3,
    file: "invisible-thread-trace.webp",
    ratio: "21:9",
    alt: "Close-up of two hands, one entering from each side of the frame, not touching, with a single crimson thread stretched taut between the fingertips across a dark background; dust motes drift in a thin beam of light. Monochrome with shallow depth of field, only the thread in colour. No faces, no text.",
    mock: "linear-gradient(120deg, #141416 0%, #0a0a0b 100%)",
  },
  woven: {
    n: 4,
    file: "invisible-thread-woven.webp",
    ratio: "21:9",
    alt: "Macro photograph of dark grey fabric in which a single crimson thread is woven through the weave, running from one edge of the frame to the other and disappearing into the cloth. Tactile, minimal, soft raking light. No text.",
    mock: "linear-gradient(120deg, #19191c 0%, #0a0a0b 100%)",
  },
} satisfies Record<string, Shot>;

type Para = { text: string; pull?: boolean };

const CHAPTERS: { tag: string; shot: Shot; paragraphs: Para[] }[] = [
  {
    tag: "Entanglement",
    shot: SHOTS.entangled,
    paragraphs: [
      { text: "പ്രപഞ്ചത്തിന്റെ അതിരുകളില്ലാത്ത വിസ്മയങ്ങൾക്കിടയിൽ, നമ്മുടെ സാധാരണ ധാരണകളെ തന്നെ ചോദ്യം ചെയ്യുന്ന ചില പ്രതിഭാസങ്ങളുണ്ട്. അവയിൽ ഏറ്റവും കൗതുകകരമായ ഒന്നാണ് ക്വാണ്ടം എന്റാംഗിൾമെന്റ്. ഒരിക്കൽ പരസ്പരം ബന്ധിക്കപ്പെട്ട രണ്ട് കണങ്ങൾ എത്ര വലിയ ദൂരത്തിൽ വേർപിരിഞ്ഞാലും, അവയുടെ അവസ്ഥകൾ തമ്മിൽ ഒരു വിചിത്രമായ പരസ്പരബന്ധം നിലനിൽക്കുന്നു." },
      { text: "ദൂരവും വേർപാടും ഒരു ബന്ധത്തിന്റെ അവസാനമാകണമെന്നില്ലെന്ന ആശയത്തിലേക്കാണ് ഈ പ്രതിഭാസം നമ്മെ കൂട്ടിക്കൊണ്ടുപോകുന്നത്. പക്ഷേ, കണങ്ങളുടെ ഈ വിചിത്രമായ ബന്ധത്തിന് മനുഷ്യജീവിതവുമായി എന്താണ് സാമ്യം?" },
      { text: "ബന്ധം എന്ന വാക്ക് കേൾക്കുമ്പോൾ ആദ്യം നമ്മുടെ മനസ്സിലെത്തുന്നത് അടുപ്പമാണ്. ഒരുമിച്ചുള്ള നിമിഷങ്ങൾ, സംഭാഷണങ്ങൾ, സാന്നിധ്യം, ഇവയൊക്കെയാണ് ഒരു ബന്ധത്തെ നമുക്ക് പരിചിതമാക്കുന്നത്. അതുകൊണ്ടുതന്നെ ദൂരം കൂടുമ്പോൾ ബന്ധവും മങ്ങിപ്പോകുമെന്നാണ് നാം പലപ്പോഴും കരുതുന്നത്." },
      { text: "എന്നാൽ ഒരിക്കൽ നമ്മുടെ ജീവിതത്തിന്റെ ഭാഗമായിത്തീർന്ന ഒരാളെ, കിലോമീറ്ററുകൾക്ക് അകലെ എന്നൊരു കാരണംകൊണ്ട് മാത്രം നമ്മുടെ മനസ്സിൽ നിന്ന് അകറ്റാനാകുമോ?", pull: true },
    ],
  },
  {
    tag: "Corridors",
    shot: SHOTS.corridor,
    paragraphs: [
      { text: "ഒരുപക്ഷേ, അതിനുള്ള ഉത്തരം നമ്മുടെ കോളേജ് ജീവിതത്തിന്റെ ഇടനാഴികളിലൊളിഞ്ഞിരിപ്പുണ്ടാകാം. അപരിചിതരായാണ് നമ്മൾ കോളേജിലേക്ക് കടന്നുവരുന്നത്. ഓരോരുത്തരുടെയും ഉള്ളിൽ ഓരോ കഥയും, ഓരോ സ്വപ്നവും, ഓരോ ഭയവും. പിന്നെ, അറിയാത്ത മുഖങ്ങൾ പതിയെ പരിചിതമാകുന്നു. പരിചയങ്ങൾ സൗഹൃദങ്ങളാകുന്നു." },
      { text: "ക്ലാസുകൾക്കിടയിലെ ചെറിയ സംഭാഷണങ്ങൾ, ഇടനാഴിയിൽ പൊട്ടിച്ചിരിച്ച നിമിഷങ്ങൾ, പരീക്ഷയ്ക്ക് മുമ്പുള്ള പരിഭ്രമം, കാന്റീനിൽ പങ്കിട്ട ഭക്ഷണം, ക്ഷീണിച്ച ഒരു ദിവസത്തെ പോലും ചിരിയാക്കി മാറ്റിയ ഒരു തമാശ, അന്നൊക്കെ നിസ്സാരമെന്ന് തോന്നിയ നിമിഷങ്ങളാണ് പിന്നീട് ജീവിതത്തിലെ ഏറ്റവും വിലപ്പെട്ട ഓർമ്മകളായി മാറുന്നത്." },
      { text: "പിന്നെ, പതിവുപോലെ സമയം മുന്നോട്ട് ഒഴുകുന്നു. ഒരിക്കൽ ശബ്ദങ്ങളാൽ നിറഞ്ഞിരുന്ന ക്ലാസ് മുറികൾ നിശ്ശബ്ദമാകുന്നു. ഒരുമിച്ച് നടന്നിരുന്ന ഇടനാഴികൾ പിന്നിലാകുന്നു. ദിവസവും കണ്ടിരുന്ന മുഖങ്ങൾ ഓരോന്നായി അകലങ്ങളിലേക്ക് യാത്രതിരിക്കുന്നു." },
      { text: "അപ്പോഴാണ് ഒരു ചോദ്യം പതിയെ മനസ്സിൽ ഉയരുന്നത്: ദൂരം നമ്മെ വേർതിരിക്കുമ്പോൾ, നമ്മെ ബന്ധിപ്പിച്ചിരുന്ന ആ നൂലിഴയും മുറിഞ്ഞുപോകുമോ?", pull: true },
    ],
  },
  {
    tag: "Traces",
    shot: SHOTS.trace,
    paragraphs: [
      { text: "എല്ലായ്പ്പോഴും അങ്ങനെയല്ല. വർഷങ്ങളായി സംസാരിക്കാത്ത ഒരാളുടെ ഒരു ചിത്രം കണ്ടാൽ, മനസ്സ് പെട്ടെന്ന് പഴയൊരു കാലത്തിലേക്ക് മടങ്ങിപ്പോകും. ഒരിക്കൽ ഒരുമിച്ച് കേട്ട പാട്ട് ഒരു സായാഹ്നത്തെ വീണ്ടും നമ്മുടെ മുന്നിലെത്തിക്കും. സമയം കടന്നുപോകുന്നു. പക്ഷേ ചില ഓർമ്മകൾ സമയത്തോടൊപ്പം കടന്നുപോകുന്നില്ല." },
      { text: "അതിലും അത്ഭുതകരമായത്, നമ്മൾ കണ്ടുമുട്ടുന്ന ആളുകൾ നമ്മിൽ അവശേഷിപ്പിക്കുന്ന അടയാളങ്ങളാണ്. നാം കണ്ടുമുട്ടുന്ന ഓരോ മനുഷ്യനും നമ്മിൽ ഒരു ചെറിയ ഭാഗം അവശേഷിപ്പിച്ചാണ് കടന്നുപോകുന്നത്. നാം പിന്നീട് ആയിത്തീരുന്ന വ്യക്തിയിൽ, ഒരിക്കൽ നമ്മോടൊപ്പം നടന്നിരുന്ന പലരുടെയും ചെറിയ അടയാളങ്ങൾ ഉണ്ടാകും." },
      { text: "ക്വാണ്ടം എന്റാംഗിൾമെന്റ് മനുഷ്യസൗഹൃദത്തിന്റെയോ ഓർമ്മകളുടെയോ ശാസ്ത്രീയ വിശദീകരണമല്ല. എന്നിരുന്നാലും, ബന്ധം എന്നത് സാന്നിധ്യത്തിൽ മാത്രം ഒതുങ്ങുന്നതാണോ എന്നൊരു ചോദ്യം അത് നമുക്ക് മുന്നിൽ വയ്ക്കുന്നു." },
      { text: "ഒരുപക്ഷേ ബന്ധം എന്നത് എപ്പോഴും അരികിലുണ്ടാകുന്നതല്ല. അത് ഒരാളിൽ നിന്ന് മറ്റൊരാളിലേക്ക് പകരുന്ന സ്വാധീനമായിരിക്കാം. കാലം മായ്ച്ചുകളയാത്ത ഓർമ്മയായിരിക്കാം. നിശ്ശബ്ദമായി നമ്മിൽ അവശേഷിക്കുന്ന ഒരു അടയാളമായിരിക്കാം.", pull: true },
    ],
  },
  {
    tag: "Woven",
    shot: SHOTS.woven,
    paragraphs: [
      { text: "ജീവിതം മുന്നോട്ട് പോകുമ്പോൾ നമ്മൾ പലരെയും കണ്ടുമുട്ടുന്നു. ചിലർ വീണ്ടും അപരിചിതരാകുന്നു. ചിലർ സുഹൃത്തുക്കളായി തുടരുന്നു. ചിലർ നമ്മുടെ ദൈനംദിന ജീവിതത്തിൽ നിന്ന് അകന്നുപോകുന്നു. എന്നിട്ടും, അവർ നമ്മുടെ ഓർമ്മകളിൽ എവിടെയോ തുടരുന്നു." },
      { text: "നമ്മുടെ കഥകൾ ആരംഭിച്ചിടത്തുനിന്ന് ഒരിക്കൽ ആയിരക്കണക്കിന് കിലോമീറ്ററുകൾ അകലെ നാം എത്തിയേക്കാം. എങ്കിലും ഭൂതകാലം എല്ലായ്പ്പോഴും പിന്നിലായിരിക്കണമെന്നില്ല." },
      { text: "ഒരുപക്ഷേ, അതുകൊണ്ടുതന്നെ നാമെല്ലാവരും കാലത്തിൽ കുരുങ്ങിയ ബന്ധങ്ങളാണ്, ദൂരങ്ങളാൽ വേർപെട്ടിട്ടും, നമ്മെ രൂപപ്പെടുത്തിയ നിമിഷങ്ങളാൽ പരസ്പരം ബന്ധിക്കപ്പെട്ടവർ.", pull: true },
      { text: "കാരണം ചില ബന്ധങ്ങൾക്ക് കിലോമീറ്ററുകൾ അളവുകോലാകില്ല. ചില ബന്ധങ്ങൾക്ക് വർഷങ്ങളും അതിരാകില്ല. ചിലത് വെറുതെ നിലനിൽക്കും: നമ്മുടെ ഓർമ്മകളിൽ, നമ്മുടെ സ്വഭാവത്തിൽ, നാം ആയിത്തീർന്ന മനുഷ്യനിൽ, നിശ്ശബ്ദമായി നെയ്തുചേർന്നുകൊണ്ട്." },
    ],
  },
];

/* Where the thread sits, relative to the start of the reading column. */
const INDENT = "pl-8 md:pl-12 lg:pl-20";
const KNOT_X = "-left-8 md:-left-12 lg:-left-20";
const THREAD_X = "left-6 md:left-10 lg:left-16";

function Plate({ shot }: { shot: Shot }) {
  const img = useRef<HTMLImageElement>(null);
  const [missing, setMissing] = useState(false);

  /* onError can fire before hydration, so also catch an image that already failed. */
  useEffect(() => {
    const el = img.current;
    if (el && el.complete && el.naturalWidth === 0) setMissing(true);
  }, []);

  if (missing) {
    return (
      <>
        <div role="img" aria-label={shot.alt} className="absolute inset-0" style={{ background: shot.mock }} />
        <div className="absolute inset-0 z-10 flex items-center justify-center p-6">
          <p
            aria-hidden="true"
            className="max-w-md rounded-sm bg-black/55 px-5 py-4 text-left font-mono text-[11px] leading-relaxed text-white/80 backdrop-blur-sm"
          >
            <b className="mb-1 block text-[10px] font-medium uppercase tracking-[0.25em] text-white">
              Image {shot.n} · {shot.ratio}
            </b>
            <code className="mb-3 block text-white/50">{shot.file}</code>
            {shot.alt}
          </p>
        </div>
      </>
    );
  }

  return (
    <Image
      ref={img}
      src={resolveAsset(shot.file)}
      alt={shot.alt}
      fill
      sizes="(max-width: 1152px) 100vw, 1000px"
      unoptimized
      className="object-cover"
      onError={() => setMissing(true)}
    />
  );
}

function Label({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span lang="en" className={`font-mono text-[10px] uppercase tracking-[0.3em] ${className}`}>
      {children}
    </span>
  );
}

/* A knot in the thread: it ties as the thread, drawn by scrolling, reaches it. */
function Knot() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 78%", "start 58%"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.4, 1]);
  const fill = useTransform(scrollYProgress, [0, 1], [INK, THREAD]);
  return (
    <motion.span
      ref={ref}
      aria-hidden
      style={reduce ? { backgroundColor: THREAD } : { scale, backgroundColor: fill }}
      className={`absolute ${KNOT_X} top-[0.35rem] z-10 h-[9px] w-[9px] -translate-x-1/2 rounded-full border border-[#d1453b]`}
    />
  );
}

/* A picture that stretches from a narrow slit to full width as it scrolls into place. */
function Frame({ shot }: { shot: Shot }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 95%", "start 35%"] });
  const clipPath = useTransform(scrollYProgress, [0, 1], ["inset(0% 24% 0% 24%)", "inset(0% 0% 0% 0%)"]);
  return (
    <motion.div
      ref={ref}
      style={reduce ? undefined : { clipPath }}
      className="relative aspect-[4/3] w-full overflow-hidden bg-[#111113] md:aspect-[21/9]"
    >
      <Plate shot={shot} />
    </motion.div>
  );
}

/* The rule above a pull-quote is drawn out, like thread being paid out, as the quote nears. */
function Rule() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 95%", "start 55%"] });
  return (
    <div ref={ref} aria-hidden className="mb-8 h-px max-w-3xl">
      <motion.div
        style={{ scaleX: reduce ? 1 : scrollYProgress, transformOrigin: "left" }}
        className="h-full w-full bg-[#d1453b]/70"
      />
    </div>
  );
}

/* Hides the thread for a stretch, so the question "will it snap?" is felt before it is answered. */
function Snap() {
  return (
    <div aria-hidden className="relative h-[42vh] md:h-[52vh]">
      <span
        className={`absolute ${KNOT_X} inset-y-0 z-10 w-5 -translate-x-1/2`}
        style={{
          background: `linear-gradient(to bottom, transparent 0%, ${INK} 30%, ${INK} 70%, transparent 100%)`,
        }}
      />
    </div>
  );
}

function Chapter({ index, tag, shot, paragraphs }: { index: number; tag: string; shot: Shot; paragraphs: Para[] }) {
  return (
    <article className="relative">
      <Label className="block text-[#d1453b]">
        {String(index + 1).padStart(2, "0")} · {tag}
      </Label>

      <div className="mt-8">
        <Frame shot={shot} />
      </div>

      <div className="mt-14 space-y-10 md:mt-20 md:space-y-14" lang="ml">
        {paragraphs.map((p, i) =>
          p.pull ? (
            <div key={i} className="max-w-3xl">
              <Rule />
              <p className="text-[1.55rem] font-light leading-[1.75] text-[#f6efe4] sm:text-[1.9rem] md:text-[2.25rem] md:leading-[1.7]">
                {p.text}
              </p>
            </div>
          ) : (
            <p
              key={i}
              className="max-w-[38rem] text-[1.15rem] font-light leading-[2.05] text-[#ece6dc]/80 md:text-[1.3rem] md:leading-[2.1]"
            >
              {p.text}
            </p>
          ),
        )}
      </div>
    </article>
  );
}

export function QuantumEntanglementStory() {
  return (
    <section
      id="sec-quantum-story"
      aria-labelledby="quantum-story-title"
      className={`${malayalam.className} relative w-full bg-[#0a0a0b] text-[#ece6dc] selection:bg-[#d1453b] selection:text-white`}
    >
      <div className="relative mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
        {/* ───────── Title ───────── */}
        <header className="flex min-h-[90dvh] flex-col justify-end pb-20 pt-32 md:pb-28">
          <Label className="text-[#d1453b]">The Invisible Thread</Label>
          <h2
            id="quantum-story-title"
            lang="ml"
            className="mt-8 text-[3.1rem] font-light leading-[1.3] text-[#f6efe4] sm:text-[4.5rem] md:text-[6.5rem] lg:text-[7.5rem] lg:leading-[1.2]"
          >
            ബന്ധങ്ങളുടെ
            <br />
            <span className="text-[#ece6dc]/30">അദൃശ്യനൂൽ</span>
          </h2>
          <p lang="ml" className="mt-10 max-w-md text-lg font-light leading-[1.9] text-[#ece6dc]/55 md:text-xl">
            ദൂരങ്ങൾക്കപ്പുറവും ചില ബന്ധങ്ങൾ നിലനിൽക്കുമോ?
          </p>
        </header>

        {/* ───────── Story ───────── */}
        <div className="pb-24">
          {CHAPTERS.map((chapter, i) => (
            <div key={chapter.tag}>
              {i > 0 && <div aria-hidden className="h-28 md:h-44" />}
              <Chapter index={i} tag={chapter.tag} shot={chapter.shot} paragraphs={chapter.paragraphs} />
            </div>
          ))}
        </div>

        <div className="relative flex flex-col items-start justify-between gap-4 border-t border-[#ece6dc]/10 py-8 font-mono text-[9px] uppercase tracking-widest text-[#ece6dc]/30 md:flex-row md:items-center">
          <span>Inquation 2025–26</span>
          <span>End of Chapter</span>
        </div>
      </div>
    </section>
  );
}

export default QuantumEntanglementStory;
