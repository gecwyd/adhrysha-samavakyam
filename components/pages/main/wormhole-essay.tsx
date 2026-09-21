"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { resolveAsset } from "@/lib/asset-registry";
import styles from "./wormhole-essay.module.css";

const MOVEMENTS = [
  {
    numeral: "I",
    ml: "ഭൗതികം",
    image: "wormhole-tunnel-throat.webp",
    crop: { pos: "70% 48%", zoom: 1.35, hue: 0 },
    alt: "Looking down the throat of a wormhole tunnel toward a distant field of stars",
    passages: [
      {
        n: "01",
        ml: "ഒരു സ്ഥലത്തുനിന്ന് മറ്റൊരു സ്ഥലത്തേക്ക് സഞ്ചരിക്കുമ്പോൾ, സാധാരണയായി ആ രണ്ട് സ്ഥലങ്ങൾക്കിടയിലുള്ള ദൂരം നമ്മൾ മറികടക്കേണ്ടതുണ്ട്. എന്നാൽ സ്ഥലകാലത്തിന്റെ ഘടന തന്നെ വളയ്ക്കാനോ ചുരുക്കാനോ കഴിയുമെങ്കിൽ എന്ത് സംഭവിക്കും?",
      },
      {
        n: "02",
        ml: "പ്രപഞ്ചത്തിലെ വളരെ അകലെയുള്ള രണ്ട് പ്രദേശങ്ങളെ ഒരു തുരങ്കം പോലെ ബന്ധിപ്പിക്കുന്ന സാങ്കൽപ്പിക ഘടനയാണ് വിശദദ്വാരം (Wormhole). ഐൻസ്റ്റീന്റെ സാമാന്യ ആപേക്ഷികതാ സിദ്ധാന്തത്തിലെ സമവാക്യങ്ങളിൽ നിന്ന് സാധ്യമായ ഒരു ആശയമാണിത്.",
      },
      {
        n: "03",
        ml: "പ്രകാശവേഗത്തേക്കാൾ വേഗത്തിൽ സഞ്ചരിക്കാനുള്ള ഒരു മാർഗമല്ലിത്; പകരം, സ്ഥലകാലത്തിലൂടെയുള്ള ദൂരം തന്നെ ചുരുക്കുന്ന ഒരു സാങ്കൽപ്പിക പാതയാണിത്.",
      },
    ],
  },
  {
    numeral: "II",
    ml: "ദൂരം",
    image: "wormhole-two-rooms.webp",
    crop: { pos: "25% 45%", zoom: 1.6, hue: -20 },
    alt: "Two people sitting apart in the same dim room, turned away from one another",
    passages: [
      {
        n: "04",
        ask: "“ദൂരം എന്നത് ശരിക്കും എന്താണ്?”",
        ml: "ഒരേ വീട്ടിൽ താമസിച്ചിട്ടും പരസ്പരം മനസ്സിലാക്കാൻ കഴിയാത്ത രണ്ട് മനുഷ്യർക്കിടയിലെ ദൂരം എത്രയാണ്? വർഷങ്ങളോളം സംസാരിക്കാതിരുന്ന രണ്ട് സുഹൃത്തുക്കൾക്കിടയിലെ ദൂരം എത്രയാണ്?",
      },
      {
        n: "05",
        ml: "ഒരിക്കൽ നമ്മുടേതായിരുന്ന ഒരാളും ഇന്ന് ഒരു ഓർമ്മമാത്രമായി മാറിയ ഒരാളും തമ്മിലുള്ള ദൂരം എത്രയാണ്? അവ കിലോമീറ്ററുകളിലോ പ്രകാശവർഷത്തിലോ അളക്കാൻ കഴിയില്ല.",
      },
    ],
  },
  {
    numeral: "III",
    ml: "മനസ്സ്",
    image: "wormhole-memory-shortcut.webp",
    crop: { pos: "90% 85%", zoom: 1.7, hue: 25 },
    alt: "A faded photograph and an old cassette tape lit by a shaft of pale light",
    passages: [
      {
        n: "06",
        ml: "ഒരു പഴയ പാട്ട് കേൾക്കുമ്പോൾ നമ്മൾ വർഷങ്ങൾ പിന്നിലേക്ക് പോകുന്നു. ഒരു പഴയ ഫോട്ടോ കാണുമ്പോൾ ഒരു ദിവസം വീണ്ടും മുന്നിൽ വരുന്നു. മനുഷ്യന്റെ ഓർമ്മകൾക്ക് സ്വന്തമായ ചില ചുരുക്കവഴികളുണ്ട്. അവ യഥാർത്ഥ വിശദദ്വാരമല്ലെങ്കിലും…",
      },
      {
        n: "07",
        ml: "ദൂരം എത്ര വലുതായാലും, അതിനെ മറികടക്കാനുള്ള വഴികളെക്കുറിച്ച് ചിന്തിക്കാൻ മനുഷ്യന്റെ സങ്കൽപ്പത്തിന് ഒരിക്കലും പരിധിയില്ല എന്നതാണ് വിശദദ്വാരം നമ്മെ പഠിപ്പിക്കുന്നത്.",
      },
    ],
  },
];

const CLOSING = {
  ml: "ഇന്ന് വിശദദ്വാരം ഒരു സിദ്ധാന്തമാണ്. നാളെ അതൊരു കണ്ടെത്തലാകാം. എന്നിരുന്നാലും, പ്രപഞ്ചത്തിന്റെ ഏറ്റവും വലിയ ദൂരങ്ങൾ പോലും ആദ്യം മനുഷ്യന്റെ മനസ്സിലാണ് ചെറുതാകുന്നത്.",
};

type Crop = { pos: string; zoom: number; hue: number };

// Until a card's own image is uploaded, show a different crop of the vortex so no card is ever empty.
const FALLBACK_SRC = "prabanchathinte-kurukkuvazhi.webp";
const CLOSING_CROP: Crop = { pos: "12% 78%", zoom: 1.5, hue: 0 };

const CARD_SIZES = "(max-width: 1000px) 100vw, 960px";

/** The textbook fold: the long way round the sheet, and the way straight through. */
function FoldDiagram() {
  const sheet = "M150 120C480 90 700 150 700 230C700 310 480 370 150 340";
  return (
    <svg className={styles.foldSvg} viewBox="95 68 625 330" role="img" aria-labelledby="fold-caption">
      <title id="fold-caption">
        മടക്കിയ സ്ഥലകാലം: ഒരു നീണ്ട വളഞ്ഞ വഴിയും, രണ്ട് ബിന്ദുക്കളെ നേരിട്ട് ബന്ധിപ്പിക്കുന്ന ചെറിയ തുരങ്കവും.
      </title>
      <g className={styles.foldSheet} aria-hidden="true">
        {[0.82, 0.91, 1.09, 1.18].map((k) => (
          <path key={k} d={sheet} transform={`translate(400 230) scale(1 ${k}) translate(-400 -230)`} />
        ))}
      </g>
      <path className={styles.foldRoute} d={sheet} aria-hidden="true" />
      <path className={styles.foldTunnel} d="M150 120C112 175 112 285 150 340" pathLength={1} aria-hidden="true" />
      <g className={styles.foldNodes} aria-hidden="true">
        <circle cx="150" cy="120" r="8" />
        <circle cx="150" cy="340" r="8" />
      </g>
      <g className={styles.foldLabels} aria-hidden="true">
        <text x="138" y="104" textAnchor="end">A</text>
        <text x="138" y="368" textAnchor="end">B</text>
        <text x="182" y="240" className={styles.foldMl}>കുറുക്കുവഴി</text>
      </g>
    </svg>
  );
}

/** Image behind a card. Falls back to a crop of the vortex, then to the card's own gradient. */
function Backdrop({ src, alt, crop }: { src: string; alt: string; crop: Crop }) {
  const [stage, setStage] = useState<"own" | "crop" | "none">("own");
  if (stage === "none") return null;
  const style = { "--pos": crop.pos, "--zoom": stage === "crop" ? crop.zoom : 1, "--hue": `${crop.hue}deg` } as CSSProperties;
  return (
    <div className={styles.media} data-drift style={style}>
      <Image
        src={resolveAsset(stage === "own" ? src : FALLBACK_SRC)}
        alt={stage === "own" ? alt : ""}
        fill
        sizes={CARD_SIZES}
        className={stage === "own" ? styles.mediaImage : `${styles.mediaImage} ${styles.mediaCrop}`}
        onError={() => setStage(stage === "own" ? "crop" : "none")}
      />
    </div>
  );
}

export function WormholeEssay() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = root.current;
    if (!section) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cleanup = () => {};

    const setup = () => {
      cleanup();
      if (motion.matches) return;

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

      // Gentle drift on the images — no scroll hijacking, the page still scrolls at 1:1.
      const plates = Array.from(section.querySelectorAll<HTMLElement>("[data-drift]"));
      let frame = 0;
      let near = false;
      const update = () => {
        frame = 0;
        const view = window.innerHeight;
        plates.forEach((plate) => {
          const box = plate.getBoundingClientRect();
          if (box.bottom < 0 || box.top > view) return;
          const centred = (box.top + box.height / 2 - view / 2) / view;
          plate.style.setProperty("--drift", `${(centred * -22).toFixed(2)}px`);
        });
      };
      const schedule = () => { if (near && !frame) frame = requestAnimationFrame(update); };
      const presence = new IntersectionObserver(([entry]) => { near = entry.isIntersecting; schedule(); });
      presence.observe(section);
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule, { passive: true });
      update();

      cleanup = () => {
        reveals.disconnect();
        presence.disconnect();
        cancelAnimationFrame(frame);
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
        section.querySelectorAll("[data-idle]").forEach((el) => el.removeAttribute("data-idle"));
        plates.forEach((plate) => plate.style.removeProperty("--drift"));
      };
    };

    setup();
    motion.addEventListener("change", setup);
    return () => { cleanup(); motion.removeEventListener("change", setup); };
  }, []);

  return (
    <section ref={root} id="sec-wormhole-essay" aria-labelledby="wormhole-essay-title" className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroPlate} data-drift>
          <Image
            src={resolveAsset("prabanchathinte-kurukkuvazhi.webp")}
            alt="A vast spiral vortex of light bending through a field of galaxies"
            fill
            sizes="100vw"
            priority
            className={styles.heroImage}
          />
        </div>
        <div className={styles.heroShade} aria-hidden="true" />
        <div className={styles.heroBody}>
          <p className={styles.kicker}>Inquation · Essay</p>
          <h2 id="wormhole-essay-title" className={styles.heroTitle} lang="ml">പ്രപഞ്ചത്തിന്റെ കുറുക്കുവഴി</h2>
        </div>
      </header>


      {MOVEMENTS.map((movement, index) => (
        <section key={movement.numeral} className={styles.movement} aria-labelledby={`wormhole-movement-${index + 1}`}>
          <header className={styles.card} data-reveal>
            <Backdrop src={movement.image} alt={movement.alt} crop={movement.crop} />
            <div className={styles.cardShade} aria-hidden="true" />
            <div className={styles.cardText}>
              <p className={styles.eyebrow}><span>{movement.numeral}</span></p>
              <h3 id={`wormhole-movement-${index + 1}`} lang="ml">{movement.ml}</h3>
            </div>
          </header>

          <div className={styles.passages}>
            {movement.passages.map((passage) => (
              <article key={passage.n} data-reveal>
                <p className={styles.eyebrow}><span>{passage.n}</span></p>
                {passage.ask && (
                  <h4 className={styles.ask} lang="ml">{passage.ask}</h4>
                )}
                <p className={styles.ml} lang="ml">{passage.ml}</p>
              </article>
            ))}
          </div>

          {index === 0 && (
            <figure className={styles.fold} data-reveal>
              <FoldDiagram />
              <figcaption lang="ml">ഷീറ്റ് മടക്കിയാൽ രണ്ട് ബിന്ദുക്കളും തൊടും. ദൂരം മാറിയില്ല; വഴിയാണ് മാറിയത്.</figcaption>
            </figure>
          )}
        </section>
      ))}

      <footer className={styles.closing}>
        <div className={`${styles.card} ${styles.cardClosing}`} data-reveal>
          <Backdrop src="wormhole-mind-horizon.webp" alt="A lone figure on a dark ridge looking up at a vast field of stars" crop={CLOSING_CROP} />
          <div className={styles.cardShade} aria-hidden="true" />
          <div className={styles.cardText}>
            <p className={styles.eyebrow}><span>08</span></p>
            <p className={styles.closingMl} lang="ml">{CLOSING.ml}</p>
          </div>
        </div>
      </footer>
    </section>
  );
}

export default WormholeEssay;
