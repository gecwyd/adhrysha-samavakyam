"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { resolveAsset } from "@/lib/asset-registry";
import styles from "./last-tree.module.css";

const STORY_PARAGRAPHS = [
  "വർഷം 2050. പുതിയൊരു അധ്യയന വർഷത്തിന് തുടക്കമായി. പുത്തൻ പ്രതീക്ഷകളും പേറി കോളേജിന്റെ പടികൾ കയറുമ്പോൾ അരുണിന്റെ മനസ്സിൽ ഒരാഗ്രഹം മാത്രം, പഠിച്ച് ഒരു കളക്ടർ ആവണം. പിന്നിട്ട വഴികളിലെ ദുർഗന്ധം വമിക്കുന്ന ഓർമകൾ അതിന് അവനൊരു പ്രചോദനമായി.",
  "പുതിയ സൗഹൃദങ്ങളും പുത്തൻ ക്ലാസ്റൂമും അവന്റെ ആഗ്രഹങ്ങൾ ഉണർവ് പകർന്നു. സമയം വൈകുന്നേരമായി. ക്ലാസ്സ് കഴിഞ്ഞിറങ്ങിയപ്പോൾ ശക്തമായി മഴ പെയ്യാൻ തുടങ്ങി. കോളേജിന്റെ വിജനമായ വരാന്തയിൽനിന്ന് പുറത്തേക്ക് കണ്ണും നട്ട് നിന്നപ്പോൾ മഴയോടൊപ്പം പതുങ്ങി വന്ന ശീതളകാറ്റ് ക്യാമ്പസിനുള്ളിൽ ആഞ്ഞുവീശാൻ തുടങ്ങിയത് അരുൺ കണ്ടു. അവന്റെ ചീകി വൃത്തിയാക്കി വച്ചിരുന്ന മുടിയിഴകളെ അത് വേർപെടുത്തി. നിശബ്ദത തളം കെട്ടിയ വരാന്തയിൽ മഴയുടെ ശബ്ദം ഒരാക്രോഷമായി അവന്റെ ചെവികൾ അലോസരപ്പെടുത്തി.",
  "പല ചിന്തകളും അവന്റെ മനസ്സിൽ ഓടിമറഞ്ഞു കൊണ്ടേയിരുന്നു, ഒരു നേർചിത്രമായി.. പെട്ടെന്നെ അരുണിന്റെ ചിന്ത ദൂരെയുള്ളൊരു കാഴ്ചയിൽ ഉടക്കി. മഴയത്ത് തണുത്ത് വിറച്ച് ലൈബ്രറിയുടെ മുന്നിലുള്ള ഒരു പച്ച മരം. അപ്പോഴാണ് അവൻ മനസ്സിലാക്കിയത് അതാണ് ആ ക്യാമ്പസിലുള്ളിലെ ഒരേയൊരു മരം. മഴയിലും കാറ്റിലും വീഴാൻ തയ്യാറാവതെ വള്ളിപ്പടർപ്പുകളാൽ അണിഞ്ഞൊരുങ്ങിയ പ്രത്യാശ തുളുമ്പുന്ന ഒരു വയസ്സൻ ആൽമരം. അവന്റെ ജീവിതം പോലെ.....",
  "പിന്നീട് ഓരോ ദിവസം കോളേജിൽ എത്തുമ്പോഴും അവന്റെ നോട്ടം ശരങ്ങളായി ആൽമരത്തിന്റെ ഹൃദയത്തിൽ പതിച്ചു. അവൻ എന്നും അതിന്റെ ചുവട്ടിൽ കുറച്ച് നേരം ഇരിക്കാൻ തുടങ്ങി. അപ്പോഴെല്ലാം അവിടെ അവശേഷിച്ച ആ അവസാന മരം അവനെ പ്രതീക്ഷകൾക്ക് തണലേകി. ശക്തമായി പെയ്ത മഴയിൽ മരത്തിന്റെ മുകളിലെ ഒരു ചില്ല ഒടിഞ്ഞ് അതിലൂടെ വെള്ളം ഒലിച്ചുകൊണ്ടേയിരുന്നു. അത് കണ്ടപ്പോൾ ജീവിതഭാരത്തൽ മരം കരയുന്നതായി അവന് തോന്നി.",
  "\"എന്റെ ഒപ്പം ഉണ്ടായിരുന്നവരെയെല്ലാം ഇവിടുള്ളവർ കൊന്നു. അവസാന അവശേഷിപ്പായി ഞാൻ മാത്രം.... നിങ്ങൾക്ക് വേണ്ടതെല്ലാം ഞാൻ തന്നു. പക്ഷെ എനിക്ക് വേണ്ടതൊന്നും നിങ്ങൾ തന്നില്ല.....\" മരത്തിന്റെ ആത്മഗതം അവൻ വായിക്കാൻ ശ്രമിച്ചു..",
  "ആ അനുഭവം ഒരു പുതിയ ആശയത്തിലേക്ക് അവനെ നയിച്ചു. പിറ്റേന്ന് തന്നെ മറ്റു കൂട്ടുകാരുമായി ചേർന്നു അവൻ നേച്ചർ ക്യാമ്പയിനുകൾ സംഘടിപ്പിച്ചു. അവരുടെ കൂട്ടായ പരിശ്രമത്തിനൊടുവിൽ ഒറ്റ മരത്തിന് കൂട്ടായി നിറയെ മരങ്ങൾ അവർ ക്യാമ്പസിനുള്ളിൽ നട്ടുപിടിപ്പിച്ചു.",
  "വർഷങ്ങൾ കഴിഞ്ഞു.... കോളേജ് ജീവിതം അവസാനിച്ചു അരുൺ പടിയിറങ്ങുമ്പോൾ ഒരിക്കൽകൂടി ക്യാമ്പസിനുള്ളിലേക്ക് തിരിഞ്ഞുനോക്കി. ചുറ്റുമുള്ള പുതിയ മരങ്ങൾക്കിടയിൽ ആ വയസ്സൻമരം തീരെ അവശനായി ചില്ലകൾ കൂമ്പി നിൽക്കുന്നു. അത് അവനോട് നന്ദി പറയുന്നതായി അവന് തോന്നി. ഇവിടം സുന്ദരമാക്കിയതിനു... പുത്തൻ പ്രത്യാശ പകർന്നതിന്.... എല്ലാം.. അവന്റെ കണ്ണുകൾ പെയ്യാൻ തുടങ്ങി. കൂടെ മേഘങ്ങളും...",
  "ആഞ്ഞുവീശിയ കാറ്റ് വീണ്ടും അവന്റെ മുടിയിഴകളെ ആക്രമിച്ചു. പക്ഷെ അവൻ ചിന്തകളിൽ മുഴുകിയില്ല. അവന്റെ മനസ് പോലെ പച്ച നിറഞ്ഞ ചുറ്റുമുള്ള ലോകം അവന്റെ ആഗ്രഹങ്ങൾക്ക് പ്രത്യാശ നുകർന്നു. ഇനിയൊരു സ്വപ്നം മാത്രം.. പഠിച്ച് കലക്ടർ ആവണം. ഈ യാത്രയിൽ അരുൺ തനിച്ചല്ലായിരുന്നു.. മരങ്ങളും പ്രകൃതിയും മഴയുമെല്ലാം അവനൊപ്പമുണ്ടായിരുന്നു."
];

/*
 * IMAGES — four visual beats carry the story from isolation, through loss, into renewal.
 * The files are release-backed WebP assets so the section stays lightweight in production.
 * `alt` keeps the visual intent documented alongside the story beat it supports.
 */
const mock = (from: string, to: string, beam: string) =>
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900' preserveAspectRatio='xMidYMid slice'>` +
      `<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='${from}'/><stop offset='1' stop-color='${to}'/></linearGradient>` +
      `<linearGradient id='b' x1='0' y1='0' x2='.5' y2='1'><stop offset='0' stop-color='#cfe6d2' stop-opacity='.32'/><stop offset='1' stop-color='#cfe6d2' stop-opacity='0'/></linearGradient></defs>` +
      `<rect width='1600' height='900' fill='url(#g)'/><polygon points='${beam}' fill='url(#b)'/></svg>`,
  );

type Shot = { n: number; file: string; ratio: string; alt: string; mock: string };

const SHOTS = {
  tree: {
    n: 1,
    file: "last-tree-banyan-rain.webp",
    ratio: "16:9",
    alt: "Wide cinematic shot of a lone, ancient banyan tree standing in front of a plain concrete college library on a rainy evening in a near-future campus. Aerial roots and hanging vines drape the branches, its leaves a deep wet green against a grey, overcast sky and bare paved ground with no other vegetation anywhere. Fine rain falls diagonally; cool desaturated grey-green palette, soft diffuse light, quiet and resilient. No people, no text.",
    mock: mock("#20382a", "#0a130e", "0,0 700,0 1200,900 200,900"),
  },
  branch: {
    n: 2,
    file: "last-tree-broken-branch.webp",
    ratio: "16:9",
    alt: "Close-up of a snapped branch on an old banyan tree in heavy rain. Pale splintered wood at the break, with a steady stream of rainwater running down the bark and dripping from the tip like tears; hanging aerial roots blurred in the foreground. Shallow depth of field, moody deep greens and wet greys, gentle backlight from a pale sky. Melancholic, tender. No people, no text.",
    mock: mock("#1c3025", "#08110c", "900,0 1500,0 1000,900 300,900"),
  },
  saplings: {
    n: 3,
    file: "last-tree-saplings.webp",
    ratio: "16:9",
    alt: "A group of college students of different genders planting young saplings around one old banyan tree on a bare campus lawn, shown from behind and the side so no faces are prominent. Hands pressing soil around thin stems, watering cans, a few wheelbarrows; soft overcast morning light after rain, fresh green and damp brown earth. Hopeful, communal, documentary style. No text.",
    mock: mock("#28442f", "#0b150f", "0,200 1600,0 1600,420 0,900"),
  },
  grove: {
    n: 4,
    file: "last-tree-grove.webp",
    ratio: "16:9",
    alt: "Years later: the same campus now lush and green, dozens of young trees in leaf around the tired old banyan, whose branches droop gently. A lone young man in a backpack, seen from behind, pauses at the gate and looks back; a light rain is falling and soft clouds hang low. Luminous fresh greens, silver mist, warm hope in the light breaking through. Quiet, cinematic. No text.",
    mock: mock("#2f5238", "#0c1710", "400,0 1200,0 1500,900 100,900"),
  },
} satisfies Record<string, Shot>;

const PLATE_SIZES = "(max-width: 1100px) 100vw, 1100px";

// The story text is untouched; it is only cut at sentence boundaries so a closing line can be set apart.
const sentences = (text: string) => text.split(/(?<=\.)\s+/);
const tail = (text: string, count: number) => {
  const parts = sentences(text);
  return [parts.slice(0, -count).join(" "), parts.slice(-count).join(" ")] as const;
};

const [ARRIVAL, EVENING, SIGHTING, VISITS, VOICE, CAMPAIGN, FAREWELL, FINALE] = STORY_PARAGRAPHS;
const [sightingBody, sightingEcho] = tail(SIGHTING, 1);
const [finaleBody, finaleEcho] = tail(FINALE, 2);
const [, voiceText, voiceNote] = VOICE.match(/^"([\s\S]+?)"\s*([\s\S]*)$/) ?? ["", VOICE, ""];

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

// One old tree, then the saplings that joined it. x = trunk position, h = trunk height, r = canopy radius.
const OLD_TREE = { x: 44, h: 46, r: 24 };
const SAPLINGS = [
  { x: 112, h: 22, r: 8 },
  { x: 152, h: 28, r: 10 },
  { x: 194, h: 20, r: 7 },
  { x: 232, h: 30, r: 11 },
  { x: 274, h: 24, r: 9 },
  { x: 312, h: 18, r: 7 },
];
const GROUND = 84;

function Grove() {
  return (
    <svg
      className={styles.grove}
      viewBox="0 0 340 90"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      role="img"
      aria-label="Line drawing of one old tree standing among many young saplings"
    >
      <path className={styles.ground} d={`M0 ${GROUND}H340`} />
      {[OLD_TREE, ...SAPLINGS].map((tree, i) => (
        <g key={tree.x} className={styles.tree} style={{ "--i": i } as CSSProperties}>
          <path d={`M${tree.x} ${GROUND}V${GROUND - tree.h}`} strokeWidth={i === 0 ? 2.5 : 1.5} />
          <circle cx={tree.x} cy={GROUND - tree.h - tree.r * 0.6} r={tree.r} />
        </g>
      ))}
    </svg>
  );
}

export function LastTree() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = root.current;
    if (!section) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cleanup = () => {};

    const setup = () => {
      cleanup();
      if (motion.matches) return;
      // Only the photographs, the tree's voice, the grove and the byline ease in — body copy is never animated.
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
    <section ref={root} id="sec-last-tree" aria-labelledby="last-tree-title" className={styles.page}>
      <header className={styles.head}>
        <p className={styles.kicker}>Short Story</p>
        <h2 id="last-tree-title" className={styles.title} lang="ml">
          ക്യാമ്പസിലെ<span>അവസാന മരം</span>
        </h2>
        <p className={styles.byline}>Adarsh P · Civil 1st Year</p>
      </header>

      <figure className={styles.plate}>
        <Photo shot={SHOTS.tree} priority />
        <div className={styles.rain} aria-hidden="true" />
      </figure>

      <div className={styles.prose}>
        <p className={styles.lede} lang="ml">{ARRIVAL}</p>
        <p className={styles.p} lang="ml">{EVENING}</p>
        <p className={styles.p} lang="ml">{sightingBody}</p>
        <p className={styles.echo} lang="ml">{sightingEcho}</p>
      </div>

      <div className={styles.prose}>
        <p className={styles.p} lang="ml">{VISITS}</p>
      </div>

      <figure className={styles.plate} data-reveal><Photo shot={SHOTS.branch} /></figure>

      <div className={styles.prose}>
        <div data-reveal>
          <blockquote className={styles.voice} lang="ml">
            <p>{voiceText}”</p>
            {voiceNote && <footer>{voiceNote}</footer>}
          </blockquote>
        </div>
        <p className={styles.p} lang="ml">{CAMPAIGN}</p>
      </div>

      <figure className={styles.plate} data-reveal><Photo shot={SHOTS.saplings} /></figure>

      <div className={styles.prose}>
        <p className={styles.p} lang="ml">{FAREWELL}</p>
      </div>

      <figure className={styles.plate} data-reveal><Photo shot={SHOTS.grove} /></figure>

      <div className={styles.prose}>
        <p className={styles.p} lang="ml">{finaleBody}</p>
        <p className={styles.echo} lang="ml">{finaleEcho}</p>
      </div>

      <footer className={styles.end}>
        <div data-reveal><Grove /></div>
        <div className={styles.author} data-reveal>
          <Image src={resolveAsset("adarsh.webp")} alt="Portrait of Adarsh P, the author" width={64} height={64} />
          <p>
            <span className={styles.written}>Written by</span>
            <strong lang="ml">ആദർഷ് പി</strong>
            <span className={styles.role}>1st Year · Civil</span>
          </p>
        </div>
      </footer>
    </section>
  );
}

export default LastTree;
