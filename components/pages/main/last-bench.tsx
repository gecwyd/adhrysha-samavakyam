"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { resolveAsset } from "@/lib/asset-registry";
import styles from "./last-bench.module.css";

const STORY_PARTS = [
  "ലാസ്റ്റ് ബെഞ്ച് ഒഴികെ ക്ലാസ്റൂം ശൂന്യമായിരുന്നു. നാല് വർഷമായി, അത് രഹസ്യങ്ങൾ കൊണ്ടു നടന്നിരുന്നു. പരീക്ഷകൾക്ക് മുമ്പ് എഴുതിയ സൂത്രവാക്യങ്ങൾ, പൂർത്തിയാകാത്ത കവിതകൾ, മോശം ഫലങ്ങൾക്ക് ശേഷം മറഞ്ഞിരിക്കുന്ന കണ്ണുനീർ, കഠിനമായ പ്രഭാഷണങ്ങളെ പോലും അതിജീവിക്കുന്ന ചിരി.",
  "കോളേജിലെ അവസാന ദിവസം കണ്ണൻ ഒറ്റയ്ക്ക് റൂമിലേക്ക് നടന്നു. വൈകുന്നേരത്തെ സൂര്യപ്രകാശത്തിൽ പൊടി ഒഴുകി. അവസാനത്തെ ബെഞ്ച് ഒഴികെ എല്ലാ മേശകളും അപരിചിതമായി തോന്നി. അവൻ അവസാനമായി അവിടെ ഇരുന്നു.",
  "മരത്തിൽ ഇപ്പോഴും പേരുകളുടെ മങ്ങിയ കൊത്തുപണികൾ ഉണ്ടായിരുന്നു. ചിലത് ദൂരെ മാറിപ്പോയ സുഹൃത്തുക്കളുടേതാണ്, ചിലത് അവൻ സംസാരിക്കാത്ത ആളുകളുടേതാണ്, ഒന്ന് ഒരിക്കൽ അവളുടെ കുറിപ്പുകളും, അറിയാതെ അവൻ്റെ ഹൃദയവും പങ്കിട്ട ഒരു പെൺകുട്ടിയുടെതാണ്.",
  "അവൻ പുഞ്ചിരിച്ചു. ക്ലാസ് മുറിയേക്കാൾ വലിയ സ്വപ്നങ്ങൾക്ക് ബെഞ്ച് സാക്ഷിയായിരുന്നു. സംഗീതജ്ഞതരാകാൻ ആഗ്രഹിച്ച എഞ്ചിനീയർമാർ. ഭാവി കോഡറുകൾക്കുള്ളിൽ കുടുങ്ങിയ എഴുത്തുകാർ. ഉറങ്ങുന്ന വിദ്യാർത്ഥികളുടെ വേഷം ധരിച്ച വിപ്ലവകാരികൾ.",
  "പെട്ടെന്ന് വീശിയടിച്ച കാറ്റ് സമീപത്ത് കിടന്ന മറന്നുപോയ ഒരു നോട്ട്ബുക്ക് തുറന്നു. അവസാന പേജിൽ, തിടുക്കപ്പെട്ട കൈയക്ഷരത്തിൽ എഴുതിയ വാക്കുകൾ:\n\n\"ഒരു ദിവസം നമുക്ക് ഊഹിക്കാവുന്നതിലും കൂടുതൽ ഈ സ്ഥലം നഷ്ടമാകും\"",
  "കണ്ണൻ ചുറ്റും നോക്കിയപ്പോൾ ആ ദിവസം വന്നിരിക്കുന്നുവെന്ന് മനസ്സിലായി. പോകുമ്പോൾ ലാസ്റ്റ് ബെഞ്ചിൽ മെല്ലെ തൊട്ടു. ഫർണിച്ചർ പോലെയല്ല. എന്നാൽ അവനോടൊപ്പം നിശബ്ദമായി വളർന്ന ഒരു സുഹൃത്ത് എന്ന നിലയിൽ. ഒരു നിമിഷത്തേക്ക്, ശൂന്യമായ ക്ലാസ് മുറി വീണ്ടും നിറഞ്ഞതായി തോന്നി."
];

/*
 * IMAGES — every photo below is a placeholder until its real file is uploaded to the release assets.
 * To replace one: upload the file named in `file` (webp) and it swaps in automatically. Nothing else to change.
 * `alt` is the full brief for the picture, so it can be handed straight to an image generator.
 */
const mock = (from: string, to: string, beam: string) =>
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900' preserveAspectRatio='xMidYMid slice'>` +
      `<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='${from}'/><stop offset='1' stop-color='${to}'/></linearGradient>` +
      `<linearGradient id='b' x1='0' y1='0' x2='.6' y2='1'><stop offset='0' stop-color='#ffd58a' stop-opacity='.5'/><stop offset='1' stop-color='#ffd58a' stop-opacity='0'/></linearGradient></defs>` +
      `<rect width='1600' height='900' fill='url(#g)'/><polygon points='${beam}' fill='url(#b)'/></svg>`,
  );

type Shot = { n: number; file: string; ratio: string; alt: string; mock: string };

const SHOTS = {
  classroom: {
    n: 1,
    file: "last-bench-classroom.webp",
    ratio: "16:9",
    alt: "Wide cinematic shot of an empty engineering-college classroom at golden hour. Rows of scuffed wooden desks recede toward tall windows; the last bench, at the back, is in sharp focus, lit by a low amber shaft of evening sun with dust motes floating in the light. Warm amber and umber tones, shallow depth of field, quiet and nostalgic. No people, no text.",
    mock: mock("#3a2410", "#120c07", "0,0 720,0 1180,900 260,900"),
  },
  dust: {
    n: 2,
    file: "last-bench-dust.webp",
    ratio: "16:9",
    alt: "Low evening sunlight slanting through a classroom window across empty desks, with thousands of dust motes drifting in the beam. Long soft shadows on a worn concrete floor; warm honey-gold light fading to deep brown at the edges. Peaceful and slightly melancholy. No people, no text.",
    mock: mock("#4a2f12", "#150e07", "900,0 1400,0 900,900 300,900"),
  },
  carved: {
    n: 3,
    file: "last-bench-carved-names.webp",
    ratio: "16:9",
    alt: "Extreme close-up of the surface of an old wooden bench covered in faint, worn carvings of names and initials, a small heart and a few scratched dates. Raking golden light picks out the grooves; the wood is dark, glossy and scuffed. Macro photography, shallow depth of field. No legible real names, no text.",
    mock: mock("#2c1a0c", "#0f0a05", "0,300 1600,0 1600,380 0,900"),
  },
  farewell: {
    n: 4,
    file: "last-bench-full-again.webp",
    ratio: "16:9",
    alt: "The same classroom at dusk in warm lamp-orange light, with faint translucent silhouettes of students sitting at the desks and talking, as if memories are filling the room again — a soft double-exposure effect. The last bench in the foreground is empty and glowing. Dreamy and nostalgic, amber and dusty violet tones. No text.",
    mock: mock("#3b2333", "#140d0a", "400,0 1200,0 1500,900 100,900"),
  },
} satisfies Record<string, Shot>;

const PLATE_SIZES = "(max-width: 1100px) 100vw, 1100px";

// The story text is untouched; it is only cut at sentence boundaries so lists can be typeset as lists.
const sentences = (text: string) => text.split(/(?<=\.)\s+/);
const dropStop = (text: string) => text.replace(/\.$/, "");
const [openA, openB, openList] = sentences(STORY_PARTS[0]);
const lede = `${openA} ${openB}`;
const secrets = dropStop(openList).split(", ");
const dreamSentences = sentences(STORY_PARTS[3]);
const dreamsLead = dreamSentences.slice(0, 2).join(" ");
const dreams = dreamSentences.slice(2).map(dropStop);
const [noteLead, noteBody] = STORY_PARTS[4].split("\n\n");
const noteText = noteBody.replace(/^"|"$/g, "");

function Photo({ shot, priority }: { shot: Shot; priority?: boolean }) {
  const [missing, setMissing] = useState(false);
  return (
    <>
      <Image
        src={missing ? shot.mock : resolveAsset(shot.file)}
        alt={shot.alt}
        fill
        priority={priority}
        sizes={PLATE_SIZES}
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

function Things({ items }: { items: string[] }) {
  return <ul className={styles.things} lang="ml">{items.map((item) => <li key={item}>{item}</li>)}</ul>;
}

export function LastBench() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = root.current;
    if (!section) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cleanup = () => {};

    const setup = () => {
      cleanup();
      if (motion.matches) return;
      // Only the images, the note and the byline ease in — body copy is never animated.
      const reveals = new IntersectionObserver((entries, self) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute("data-shown", "true");
          self.unobserve(entry.target);
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
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
    <section ref={root} id="sec-last-bench-story" aria-labelledby="last-bench-title" className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroMedia}><Photo shot={SHOTS.classroom} priority /></div>
        <div className={styles.heroShade} aria-hidden="true" />
        <div className={styles.dust} aria-hidden="true" />
        <div className={styles.heroBody}>
          <p className={styles.kicker}>Inquation · Memoir</p>
          <h2 id="last-bench-title" className={styles.title} lang="ml">ലാസ്റ്റ്<span>ബെഞ്ച്</span></h2>
          <p className={styles.byline}>Anjali Krishna · ECE 3rd Year</p>
        </div>
      </header>

      <div className={styles.prose}>
        <p className={styles.lede} lang="ml">{lede}</p>
        <Things items={secrets} />
        <p className={styles.p} lang="ml">{STORY_PARTS[1]}</p>
      </div>

      <figure className={styles.plate} data-reveal><Photo shot={SHOTS.dust} /></figure>

      <div className={styles.prose}>
        <p className={styles.p} lang="ml">{STORY_PARTS[2]}</p>
      </div>

      <figure className={styles.plate} data-reveal><Photo shot={SHOTS.carved} /></figure>

      <div className={styles.prose}>
        <p className={styles.p} lang="ml">{dreamsLead}</p>
        <Things items={dreams} />
        <p className={styles.p} lang="ml">{noteLead}</p>
        <div data-reveal>
          <blockquote className={styles.note} lang="ml">“{noteText}”</blockquote>
        </div>
        <p className={styles.p} lang="ml">{STORY_PARTS[5]}</p>
      </div>

      <figure className={styles.plate} data-reveal><Photo shot={SHOTS.farewell} /></figure>

      <footer className={styles.end} data-reveal>
        <div className={styles.author}>
          <Image src={resolveAsset("anjali.webp")} alt="Portrait of Anjali Krishna, the author" width={64} height={64} />
          <p>
            <span className={styles.written}>Written by</span>
            <strong lang="ml">അഞ്ജലി കൃഷ്ണ</strong>
            <span className={styles.role}>3rd Year · ECE</span>
          </p>
        </div>
      </footer>
    </section>
  );
}

export default LastBench;
