"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { Noto_Serif_Malayalam } from "next/font/google";
import { resolveAsset } from "@/lib/asset-registry";
import styles from "./seeds-of-light.module.css";

const serif = Noto_Serif_Malayalam({
  subsets: ["malayalam", "latin"],
  weight: ["400", "500"],
  variable: "--font-serif-ml",
  display: "swap",
});

const STORY_PARAGRAPHS = [
  "കിഴക്കൻ മലയോര ഗ്രാമത്തിലെ ചെറിയ ഓലമേഞ്ഞ വീടിന്റെ ഉമ്മറത്ത് മണ്ണെണ്ണവിളക്കിന്റെ മങ്ങിയ വെളിച്ചത്തിൽ പതിനാലുകാരനായ അപ്പു ഇരിക്കുകയായിരുന്നു. അവന്റെ മുന്നിൽ തുറന്നുവെച്ച പുസ്തകത്തിലെ അക്ഷരങ്ങൾ കുറഞ്ഞ പ്രകാശത്തിൽ നൃത്തം ചെയ്യുന്നുണ്ട്, ആ ദിവസം മുഴുവൻ പണിയെടുത്തതിന്റെ തളർച്ചയോടെ ഇരിക്കുകയായിരുന്നു അവന്റെ മുത്തശ്ശൻ മാധവൻ. മാധവന്റെ കൈകൾ പരുക്കനായിരുന്നു; ജീവിതത്തിലെ ദാരിദ്ര്യത്തോടും കഷ്ടപ്പാടുകളോടും പടവെട്ടി ഉണ്ടായ തഴമ്പുകൾ ആ കൈകളിൽ വ്യക്തമായി കാണാമായിരുന്നു. സ്വന്തമായി പേരെഴുതാൻ പോലും അറിയാത്ത, അക്ഷരങ്ങളുടെ ലോകം അന്യമായിരുന്ന ഒരു സാധാരണ മനുഷ്യനായിരുന്നു അദ്ദേഹം. പക്ഷേ, തന്റെ ഏക മകനായ രാമുവിൻ്റെ മരണശേഷം അനാഥനായ കൊച്ചുമകൻ അപ്പുവിനെ ഒരു ഉന്നത നിലയിൽ എത്തിക്കണമെന്നത് മാത്രമായിരുന്നു ആ വൃദ്ധന്റെ ഏക സ്വപ്നം. രാത്രിയേറെ വൈകിയിട്ടും അപ്പു പുസ്തകം അടച്ചുവെച്ചില്ല. പക്ഷേ, അവന്റെ മനസ്സിൽ പഠനമായിരുന്നില്ല. കഴിഞ്ഞ കുറച്ചു ദിവസങ്ങളായി മുത്തശ്ശൻ അനുഭവിക്കുന്ന ശ്വാസംമുട്ടലും, മരുന്നിനായി പണമില്ലാതെ വിഷമിക്കുന്നതും അവൻ കാണുന്നുണ്ടായിരുന്നു. വീട്ടുവാടക കൊടുക്കാൻ പോലും വകയില്ലാതെ ആ വൃദ്ധൻ വീടുവീടാന്തരം കയറിയിറങ്ങി പണിയെടുക്കുന്നത് അവന്റെ കുഞ്ഞു മനസ്സിൽ വലിയൊരു ഭാരമായി മാറി. പെട്ടെന്ന് അപ്പു പുസ്തകം മടക്കിവെച്ച് മുത്തശ്ശന്റെ അരികിലേക്ക് നടന്നു. അവന്റെ കണ്ണുകൾ നിറഞ്ഞിട്ടുണ്ടായിരുന്നു.",
  "\"മുത്തശ്ശാ... ഞാൻ നാളെ മുതൽ സ്കൂളിൽ പോകുന്നില്ല. ടൗണിലെ രഘുവേട്ടന്റെ ചായക്കടയിൽ പണിക്ക് നിർത്തിക്കോളാമെന്ന് അദ്ദേഹം പറഞ്ഞിട്ടുണ്ട്. അതിൽ നിന്ന് ലഭിക്കുന്ന വരുമാനം കൊണ്ട് വാടകയും മരുന്നുമെല്ലാം വാങ്ങാം. ഞാൻ പഠിച്ചിട്ട് ഇനി എന്ത് ചെയ്യാനാണ്?\"",
  "അപ്പുവിന്റെ വാക്കുകൾ കേട്ട് മാധവന്റെ നെഞ്ച് പിടഞ്ഞു. വൃദ്ധന്റെ കണ്ണുകളിൽ നിന്ന് കണ്ണുനീർ താഴേക്ക് അടർന്നുവീണു. അദ്ദേഹം അപ്പുവിന്റെ ചെറിയ കൈകൾ തന്റെ പരുക്കൻ കൈകൾക്കുള്ളിലാക്കി. അപ്പു മുത്തശ്ശൻ്റെ മുഖത്തിലെ അടർന്നു വീണ കണ്ണീർ തുള്ളികൾ തുടച്ച് മാറ്റിയിട്ട് ശ്രദ്ധയോടെ മുത്തശ്ശൻ്റെ മുഖത്തേക്ക് നോക്കി നിന്നു.",
  "\"അപ്പു...\" മാധവന്റെ ശബ്ദം വിറയ്ക്കുന്നുണ്ടായിരുന്നു. അദ്ദേഹം അവനെ തന്റെ അരികിലേക്ക് ഇരുത്തി, താൻ നെഞ്ചിൽ ഒളിപ്പിച്ചുവെച്ച ഏറ്റവും വലിയ മുറിവ് തുറന്നു പറയാൻ തുടങ്ങി. \"നിനക്കറിയാമോ അപ്പു, എന്തിനാണ് ഞാൻ ഈ തളർന്ന ശരീരവും വെച്ച് നിന്നെ പഠിപ്പിക്കാൻ ഓടുന്നത് എന്ന്? വർഷങ്ങൾക്ക് മുൻപ്, നിന്റെ അച്ഛൻ ജനിക്കുന്നതിനും മുൻപ്, എനിക്ക് ഈ ഗ്രാമത്തിന്റെ അതിർത്തിയിൽ കുറച്ചു ഭൂമിയുണ്ടായിരുന്നു. കഠിനാധ്വാനം ചെയ്ത് ഞാൻ ഉണ്ടാക്കിയതായിരുന്നു അത്. ഒരു ദിവസം ഗ്രാമത്തിലെ വലിയൊരു പ്രമാണി ചില കടലാസുകളുമായി എന്റെ അടുക്കൽ വന്നു. പണം തരാമെന്ന് പറഞ്ഞ് എന്നെ വിശ്വസിപ്പിച്ചു. ആ കടലാസിൽ എന്താണ് എഴുതിയിരിക്കുന്നതെന്ന് വായിക്കാൻ എനിക്ക് അറിയില്ലായിരുന്നു. ഞാൻ അതിൽ എന്റെ വിരലടയാളം പതിപ്പിച്ചു...\" മാധവൻ ഒന്നു നിർത്തി, ഒരു ദീർഘശ്വാസമെടുത്തു. അദ്ദേഹത്തിന്റെ മുഖത്ത് ആ പഴയ ചതിയുടെ വേദന വീണ്ടും നിഴലിച്ചു.",
  "\"കുറച്ചു ദിവസങ്ങൾ കഴിഞ്ഞപ്പോൾ അവർ എന്നെ എന്റെ സ്വന്തം മണ്ണിൽ നിന്ന് ഇറക്കിവിട്ടു. ഞാൻ ഒപ്പിട്ടു നൽകിയത് ആ ഭൂമി അവർക്ക് എഴുതിക്കൊടുക്കുന്ന ആധാരത്തിലായിരുന്നു! എനിക്ക് അക്ഷരം അറിയാമായിരുന്നെങ്കിൽ, ആ കടലാസിൽ എഴുതിയ ചതി ഞാൻ വായിച്ചറിയുമായിരുന്നു. അന്ന് അക്ഷരമില്ലാത്തതുകൊണ്ട് മാത്രം എനിക്ക് എന്റെ മണ്ണും മാനവും നഷ്ടപ്പെട്ടു. ഒരു മൃഗത്തെപ്പോലെ ഞാൻ ജീവിക്കേണ്ടി വന്നു. ഒരു വിരലടയാളം എന്റെ ജീവിതം മുഴുവൻ ഇരുട്ടിലാക്കി.\" മുത്തശ്ശന്റെ വാക്കുകൾ കേട്ട് അപ്പു നിശബ്ദനായി. വിദ്യാഭ്യാസം എന്നത് വെറുമൊരു ജോലി നേടാനുള്ള വഴി മാത്രമല്ല, മറിച്ച് ഈ ലോകത്ത് തലയുയർത്തി ജീവിക്കാനുള്ള ആയുധമാണെന്ന് അവൻ തിരിച്ചറിയുകയായിരുന്നു.",
  "മാധവൻ അപ്പുവിന്റെ മുഖം കൈകളിൽ കോരിയെടുത്ത് പറഞ്ഞു: \"അപ്പു, ദാരിദ്ര്യം താൽക്കാലികമാണ്. പക്ഷേ, അറിവില്ലായ്മ ശാശ്വതമായ ഇരുട്ടാണ്. ഞാൻ നിനക്ക് നൽകുന്നത് പണമോ സ്വത്തോ അല്ല. ഈ ലോകത്ത് ആർക്കും നിന്നിൽ നിന്ന് മോഷ്ടിക്കാൻ കഴിയാത്ത വിദ്യാഭ്യാസം എന്ന വെളിച്ചമാണ്. നീ പഠിക്കണം. നിന്റെ മുന്നിൽ വരുന്ന ഒരു കടലാസിനെയും നിനക്ക് ഭയപ്പെടേണ്ടി വരരുത്. ആരും നിന്നെ ചതിക്കരുത്. നിന്റെ മുത്തശ്ശന്റെ ഈ പരുക്കൻ കൈകളുടെ വില നിന്റെ അക്ഷരങ്ങളാവണം.\" മുത്തശ്ശന്റെ നെഞ്ചിലെ ആഴമേറിയ വികാരങ്ങളും വിദ്യാഭ്യാസത്തോടുള്ള ആദരവും അപ്പുവിന്റെ ഉള്ളിൽ ഒരു തീപ്പൊരിയായി മാറി. അവൻ തന്റെ കണ്ണീർ തുടച്ചു.",
  "അടുത്ത ദിവസം രാവിലെ, സൂര്യൻ ഉദിച്ചുയർന്നപ്പോൾ അപ്പു തന്റെ സ്കൂൾ ബാഗും തോളിലിട്ട് മുറ്റത്തേക്ക് ഇറങ്ങി. അവന്റെ കണ്ണുകളിൽ മുൻപെങ്ങുമില്ലാത്ത ഒരു ദൃഢനിശ്ചയമുണ്ടായിരുന്നു. മാധവൻ അവനെ നല്ല സന്തോഷത്തോടെ സ്കൂളിൽ പറഞ്ഞയച്ചു, തന്റെ കൊച്ചുമകനിലൂടെ വരാൻ പോകുന്ന ഒരു വലിയ വെളിച്ചത്തിന്റെ പ്രതീക്ഷയോടെയായിരുന്നു. അപ്പു സ്കൂളിലേക്ക് നടന്നു നീങ്ങുമ്പോൾ അവന്റെ കൈയിലിരുന്ന പുസ്തകങ്ങൾ വെറുമൊരു ഭാരമായിരുന്നില്ല, മറിച്ച് തന്റെ തലമുറയുടെ ഇരുട്ടു മാറ്റാൻ പോകുന്ന വെളിച്ചത്തിന്റെ വിത്തുകളായിരുന്നു.",
];

/*
 * The story is only ever cut — never reworded. Spoken lines (between straight quotes) are set apart from narration,
 * and three moments are lifted out as pull-quotes: [phrase that identifies the sentence, sentences to take before it].
 */
const PULLS: [string, number][] = [
  ["ഒരു വിരലടയാളം എന്റെ ജീവിതം മുഴുവൻ ഇരുട്ടിലാക്കി", 0],
  ["അറിവില്ലായ്മ ശാശ്വതമായ ഇരുട്ടാണ്", 1],
  ["ഇരുട്ടു മാറ്റാൻ പോകുന്ന വെളിച്ചത്തിന്റെ വിത്തുകളായിരുന്നു", 0],
];

type Kind = "narr" | "voice" | "pull";
type Piece = { kind: Kind; text: string; open?: boolean; close?: boolean };

const CHUNK = 230;
const MIN_TAIL = 90;
const sentencesOf = (text: string) => text.split(/(?<=[.?!])\s+/).filter(Boolean);

function blocks(sentences: string[]): string[] {
  const out: string[] = [];
  let buffer = "";
  for (const sentence of sentences) {
    buffer = buffer ? `${buffer} ${sentence}` : sentence;
    if (buffer.length >= CHUNK) {
      out.push(buffer);
      buffer = "";
    }
  }
  if (buffer) {
    if (out.length && buffer.length < MIN_TAIL) out[out.length - 1] += ` ${buffer}`;
    else out.push(buffer);
  }
  return out;
}

function toPieces(paragraph: string): Piece[] {
  const pieces: Piece[] = [];
  paragraph.split('"').forEach((raw, index) => {
    const text = raw.trim();
    if (!text) return;
    const kind: Kind = index % 2 ? "voice" : "narr";
    const sentences = sentencesOf(text);
    const hit = sentences.findIndex((sentence) => PULLS.some(([marker]) => sentence.includes(marker)));
    const local: Piece[] = [];
    if (hit < 0) {
      blocks(sentences).forEach((t) => local.push({ kind, text: t }));
    } else {
      const back = PULLS.find(([marker]) => sentences[hit].includes(marker))![1];
      blocks(sentences.slice(0, hit - back)).forEach((t) => local.push({ kind, text: t }));
      local.push({ kind: "pull", text: sentences.slice(hit - back, hit + 1).join(" ") });
      blocks(sentences.slice(hit + 1)).forEach((t) => local.push({ kind, text: t }));
    }
    if (kind === "voice") {
      local[0].open = true;
      local[local.length - 1].close = true;
    }
    pieces.push(...local);
  });
  return pieces;
}

const PARAGRAPHS = STORY_PARAGRAPHS.map(toPieces);
const NIGHT = PARAGRAPHS.slice(0, 6);
const MORNING = PARAGRAPHS[6];

/*
 * IMAGES — three visual beats carry the story from night, through touch, into morning.
 * The files are release-backed WebP assets so the section stays lightweight in production.
 * `alt` keeps the visual intent documented alongside the story beat it supports.
 */
const mock = (from: string, to: string, glow: string, gx: number, gy: number) =>
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1500 1000' preserveAspectRatio='xMidYMid slice'>` +
      `<defs><linearGradient id='b' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='${from}'/><stop offset='1' stop-color='${to}'/></linearGradient>` +
      `<radialGradient id='g' cx='${gx}' cy='${gy}' r='.75'><stop offset='0' stop-color='${glow}' stop-opacity='.9'/><stop offset='1' stop-color='${glow}' stop-opacity='0'/></radialGradient></defs>` +
      `<rect width='1500' height='1000' fill='url(#b)'/><rect width='1500' height='1000' fill='url(#g)'/></svg>`,
  );

type Shot = { n: number; file: string; ratio: string; alt: string; mock: string };

const SHOTS = {
  lamp: {
    n: 1,
    file: "seeds-of-light-lamp.webp",
    ratio: "3:2",
    alt: "A kerosene lamp on the wooden edge of a thatched-roof village veranda at night; its small amber flame lights an open school book and a boy's hands resting on the page. Behind, an eastern-hills village dissolves into darkness. Warm amber against near-black, painterly and quiet. No visible face, no text.",
    mock: mock("#17100a", "#070503", "#f2b632", 0.3, 0.62),
  },
  hands: {
    n: 2,
    file: "seeds-of-light-hands.webp",
    ratio: "3:2",
    alt: "Close-up of an old man's rough, weathered hands with deep calluses and creases, gently cupping a boy's small open hands, lit only by lamplight. Shallow depth of field, amber on black, tender and heavy with feeling. No faces, no text.",
    mock: mock("#1c130a", "#080604", "#e8a53a", 0.62, 0.5),
  },
  morning: {
    n: 3,
    file: "seeds-of-light-morning.webp",
    ratio: "3:2",
    alt: "Early sunrise over a village path in the eastern hills of Kerala. A boy with a school bag walks away from the camera toward the light; far behind him, an old man watches from the doorway of a small thatched house. Pale gold and cream tones, soft mist, hopeful and calm. No visible faces, no text.",
    mock: mock("#fff3d6", "#efd9a8", "#ffe08a", 0.5, 0.35),
  },
} satisfies Record<string, Shot>;

function Photo({ shot }: { shot: Shot }) {
  const [missing, setMissing] = useState(false);
  return (
    <>
      <Image
        src={missing ? shot.mock : resolveAsset(shot.file)}
        alt={shot.alt}
        fill
        sizes="(max-width: 820px) 100vw, 780px"
        className={styles.photo}
        onError={() => setMissing(true)}
      />
      {missing && (
        <p className={styles.mockNote} aria-hidden="true">
          <b>Image {shot.n} · {shot.ratio}</b>
          <code>{shot.file}</code>
          {shot.alt}
        </p>
      )}
    </>
  );
}

/* A thumbprint: ridge segments, innermost first, so it draws itself outward once it scrolls into view. */
const RIDGES: [number, string][] = [
  [0, "M116.0 126.0A6.0 9.0 0 1 1 104.0 126.0A6.0 9.0 0 1 1 116.0 126.0"],
  [1, "M123.4 127.0A13.6 18.6 0 1 1 96.3 127.0A13.6 18.6 0 1 1 123.4 127.0"],
  [2, "M103.9 155.0A21.2 28.2 0 0 1 88.9 133.3"],
  [2, "M88.5 128.4A21.2 28.2 0 1 1 106.7 155.8"],
  [3, "M94.9 96.3A28.8 37.8 0 1 1 92.0 98.9"],
  [3, "M99.5 93.4A28.8 37.8 0 1 1 89.7 101.4"],
  [4, "M145.4 136.8A36.4 47.4 0 1 1 129.0 89.8"],
  [4, "M134.5 95.4A36.4 47.4 0 0 1 145.8 129.4"],
  [5, "M149.4 153.9A44.0 57.0 0 0 1 82.2 175.7"],
  [5, "M74.6 165.8A44.0 57.0 0 1 1 153.0 136.7"],
  [6, "M110.9 198.3A51.6 66.6 0 0 1 101.0 65.9"],
  [6, "M110.0 65.1A51.6 66.6 0 0 1 121.6 196.3"],
  [7, "M151.2 186.1A59.2 76.2 0 0 1 63.9 182.1"],
  [7, "M53.9 160.6A59.2 76.2 0 1 1 160.5 170.2"],
  [8, "M42.4 143.3A66.8 85.8 0 0 1 50.7 91.4"],
  [8, "M59.5 75.6A66.8 85.8 0 1 1 45.1 159.4"],
  [9, "M137.7 46.7A74.4 95.4 0 0 1 140.7 48.4"],
  [9, "M148.6 54.1A74.4 95.4 0 1 1 112.5 39.3"],
  [10, "M128.3 237.4A82.0 105.0 0 1 1 186.9 104.8"],
  [10, "M190.4 130.0A82.0 105.0 0 0 1 144.4 229.9"],
  [11, "M142.6 242.3A89.6 114.6 0 0 1 22.7 102.9"],
  [11, "M27.1 88.0A89.6 114.6 0 1 1 170.0 219.6"],
];

function Fingerprint() {
  return (
    <div className={styles.print} data-reveal>
      <svg viewBox="0 0 220 260" role="img" aria-label="A thumbprint, drawn ridge by ridge">
        {RIDGES.map(([ring, d], i) => (
          <path key={i} d={d} pathLength={1} className={styles.ridge} style={{ "--i": ring } as CSSProperties} />
        ))}
      </svg>
    </div>
  );
}

function Passage({ pieces, first = false }: { pieces: Piece[]; first?: boolean }) {
  return (
    <>
      {pieces.map((piece, i) => {
        const classes = [styles[piece.kind], piece.open ? styles.hang : "", !first && i === 0 ? styles.start : ""];
        return (
          <p key={i} className={classes.filter(Boolean).join(" ")}>
            {piece.open && <span className={styles.q}>“</span>}
            {piece.text}
            {piece.close && <span className={styles.q}>”</span>}
          </p>
        );
      })}
    </>
  );
}

export function SeedsOfLight() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = root.current;
    if (!section) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cleanup = () => {};

    const setup = () => {
      cleanup();
      if (motion.matches) return;
      // Only the pictures, the thumbprint and the sunrise ease in — the story itself is never animated.
      const reveals = new IntersectionObserver((entries, self) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute("data-shown", "true");
          self.unobserve(entry.target);
        });
      }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
      section.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => {
        if (element.getBoundingClientRect().top <= window.innerHeight) return;
        element.setAttribute("data-idle", "true");
        reveals.observe(element);
      });
      cleanup = () => {
        reveals.disconnect();
        section.querySelectorAll("[data-idle]").forEach((element) => element.removeAttribute("data-idle"));
      };
    };

    setup();
    motion.addEventListener("change", setup);
    return () => { cleanup(); motion.removeEventListener("change", setup); };
  }, []);

  return (
    <section ref={root} id="sec-seeds-of-light" aria-labelledby="seeds-of-light-title" className={`${serif.variable} ${styles.page}`}>
      {/* ───────── Night ───────── */}
      <div className={styles.night}>
        <header className={styles.hero}>
          <span className={styles.seed} aria-hidden="true" />
          <p className={styles.kicker}>Short story · Seeds of Light</p>
          <h2 id="seeds-of-light-title" className={styles.title} lang="ml">വെളിച്ചത്തിൻ്റെ<span>വിത്തുകൾ</span></h2>
          <p className={styles.byline}>Muhammad Sinan E · 1st Year · ECE</p>
        </header>

        <figure className={styles.plate} data-reveal><Photo shot={SHOTS.lamp} /></figure>

        <div className={styles.prose} lang="ml">
          <Passage pieces={NIGHT[0]} first />
          <Passage pieces={NIGHT[1]} />
          <Passage pieces={NIGHT[2]} />
        </div>

        <figure className={styles.plate} data-reveal><Photo shot={SHOTS.hands} /></figure>

        <div className={styles.prose} lang="ml">
          <Passage pieces={NIGHT[3]} first />
        </div>

        <Fingerprint />

        <div className={styles.prose} lang="ml">
          <Passage pieces={NIGHT[4]} first />
          <Passage pieces={NIGHT[5]} />
        </div>
      </div>

      {/* ───────── The turn ───────── */}
      <div className={styles.dawn} aria-hidden="true"><span className={styles.sun} data-reveal /></div>

      {/* ───────── Morning ───────── */}
      <div className={styles.morning}>
        <figure className={styles.plate} data-reveal><Photo shot={SHOTS.morning} /></figure>

        <div className={styles.prose} lang="ml">
          <Passage pieces={MORNING} first />
        </div>

        <footer className={styles.end}>
          <div className={styles.author}>
            <Image src={resolveAsset("muhammad-sinan.webp")} alt="Portrait of Muhammad Sinan E, the author" width={72} height={72} />
            <p>
              <span className={styles.written}>Written by</span>
              <strong lang="ml">മുഹമ്മദ് സിനാൻ ഇ</strong>
              <span className={styles.role}>1st Year · ECE</span>
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
}

export default SeedsOfLight;
