"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { resolveAsset } from "@/lib/asset-registry";
import { REPORT_PHOTOS, type ReportPhotoId } from "@/lib/report-photos";
import {
  Container,
  Kicker,
  Rail,
  ReportSection,
  Reveal,
  type ReportTone,
} from "@/components/ui/report-kit";

const TONE: ReportTone = {
  paper: "#e9e7e2",
  ink: "#151515",
  accent: "#8a5a2b",
  muted: "#151515a6",
  rule: "#15151526",
};

interface Work {
  id: ReportPhotoId;
  title: string;
  medium: string;
  alt: string;
}

const PAPER: Record<"profile" | "driver" | "sunglasses" | "sketchbook", Work> = {
  profile: {
    id: "drawing-club-1",
    title: "Wide-brimmed hat",
    medium: "Graphite",
    alt: "Graphite portrait of a man in a wide-brimmed hat with a cigarette",
  },
  driver: {
    id: "drawing-club-2",
    title: "Racing driver",
    medium: "Pencil",
    alt: "Detailed pencil study of a helmeted racing driver",
  },
  sunglasses: {
    id: "drawing-club-3",
    title: "Round sunglasses",
    medium: "Graphite",
    alt: "Graphite portrait of a woman in round sunglasses",
  },
  sketchbook: {
    id: "drawing-club-6",
    title: "Sketchbook portrait",
    medium: "Pencil",
    alt: "Pencil portrait of a young man drawn in a spiral sketchbook",
  },
};

const WALLS: Record<"duo" | "members" | "pillar", Work> = {
  duo: {
    id: "drawing-club-4",
    title: "Two figures",
    medium: "Wall mural",
    alt: "Wall mural of two figures painted by club members on campus",
  },
  members: {
    id: "drawing-club-7",
    title: "Mural by the Drawing Club",
    medium: "Wall mural",
    alt: "Club members standing beside a black-and-white wall mural",
  },
  pillar: {
    id: "drawing-club-5",
    title: "Caricature on a pillar",
    medium: "Paint",
    alt: "A student painting a caricature on a campus pillar",
  },
};

// Viewer order: the studies on paper, then the murals.
const ALL: Work[] = [
  PAPER.profile,
  PAPER.driver,
  PAPER.sunglasses,
  PAPER.sketchbook,
  WALLS.duo,
  WALLS.members,
  WALLS.pillar,
];

const aspectOf = (id: ReportPhotoId) => {
  const { width, height } = REPORT_PHOTOS[id];
  return width / height;
};

function Tile({
  work,
  onOpen,
  ratio,
  sizes,
  position = "center",
  className = "",
}: {
  work: Work;
  onOpen: () => void;
  ratio: string;
  sizes: string;
  position?: string;
  className?: string;
}) {
  return (
    <figure className={`min-w-0 ${className}`}>
      <button
        type="button"
        onClick={onOpen}
        aria-label={`View larger: ${work.title}`}
        className="group relative block w-full cursor-zoom-in overflow-hidden bg-[color:var(--ink)]/10 outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--paper)]"
        style={{ aspectRatio: ratio }}
      >
        <Image
          src={resolveAsset(`${work.id}.webp`)}
          alt={work.alt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          style={{ objectPosition: position }}
        />
      </button>
      <figcaption className="mt-3 flex items-baseline justify-between gap-3">
        <span className="font-heading text-xl uppercase leading-none tracking-wide sm:text-2xl">{work.title}</span>
        <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--muted)]">
          {work.medium}
        </span>
      </figcaption>
    </figure>
  );
}

function Lightbox({
  index,
  onClose,
  onStep,
}: {
  index: number | null;
  onClose: () => void;
  onStep: (delta: number) => void;
}) {
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const work = index === null ? null : ALL[index];

  const lockedScroll = React.useRef(false);

  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (index !== null && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
      lockedScroll.current = true;
    } else if (index === null && dialog.open) {
      dialog.close();
    }
    if (index === null && lockedScroll.current) {
      document.body.style.overflow = "";
      lockedScroll.current = false;
    }
  }, [index]);

  React.useEffect(() => {
    return () => {
      if (lockedScroll.current) document.body.style.overflow = "";
    };
  }, []);

  const { width, height } = work ? REPORT_PHOTOS[work.id] : { width: 1, height: 1 };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={onClose}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") onStep(1);
        if (event.key === "ArrowLeft") onStep(-1);
      }}
      aria-label="Artwork viewer"
      className="m-auto max-h-[100dvh] w-[min(94vw,1100px)] max-w-none overflow-visible bg-transparent p-0 text-[#f4f1ea] backdrop:bg-black/90"
    >
      {work && index !== null && (
        <div className="flex flex-col items-center gap-4 py-4">
          <Image
            src={resolveAsset(`${work.id}.webp`)}
            alt={work.alt}
            width={width}
            height={height}
            sizes="94vw"
            onClick={(event) => event.stopPropagation()}
            className="h-auto max-h-[76vh] w-auto max-w-full object-contain"
          />
          <div
            onClick={(event) => event.stopPropagation()}
            className="flex w-full items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.2em]"
          >
            <p>
              <span className="text-[#f4f1ea]">{work.title}</span>
              <span className="ml-3 text-[#f4f1ea]/60">
                {work.medium} · {index + 1} / {ALL.length}
              </span>
            </p>
            <div className="flex items-center gap-2">
              {[
                { label: "Previous", icon: ChevronLeft, onClick: () => onStep(-1) },
                { label: "Next", icon: ChevronRight, onClick: () => onStep(1) },
                { label: "Close", icon: X, onClick: onClose },
              ].map(({ label, icon: Icon, onClick }) => (
                <button
                  key={label}
                  type="button"
                  aria-label={label}
                  onClick={onClick}
                  className="grid size-10 place-items-center border border-[#f4f1ea]/30 transition-colors hover:bg-[#f4f1ea] hover:text-[#151515] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4f1ea]"
                >
                  <Icon className="size-4" aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}

function GroupHeading({
  title,
  accent,
  blurb,
  count,
}: {
  title: string;
  accent: string;
  blurb: string;
  count: string;
}) {
  return (
    <Reveal>
      <div className="mb-10 grid items-end gap-4 border-t border-[color:var(--ink)] pt-6 md:grid-cols-[1fr_auto] md:gap-10">
        <div>
          <h3 className="font-heading text-[clamp(3rem,7vw,6rem)] uppercase leading-[0.88]">
            {title} <span className="text-[color:var(--accent)]">{accent}</span>
          </h3>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[color:var(--muted)] sm:text-base">{blurb}</p>
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[color:var(--muted)]">{count}</p>
      </div>
    </Reveal>
  );
}

export function DrawingClub() {
  const [active, setActive] = React.useState<number | null>(null);
  const open = (work: Work) => setActive(ALL.indexOf(work));
  const step = React.useCallback(
    (delta: number) => setActive((current) => (current === null ? null : (current + delta + ALL.length) % ALL.length)),
    [],
  );

  return (
    <ReportSection id="sec-drawing-club" tone={TONE}>
      {/* Faint drafting grid behind the opening. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[44rem] bg-[linear-gradient(to_right,rgba(21,21,21,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(21,21,21,0.06)_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]"
      />

      <Container className="relative">
        <Rail left="Drawing Club" right="Clubs & Activities / 02" />

        {/* ── Opening ───────────────────────────────────────────────── */}
        <div className="grid items-end gap-12 pb-16 pt-14 sm:pb-24 sm:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <Reveal>
            <Kicker>Art · Graphite &amp; Wall</Kicker>
            <h2 className="font-heading text-[clamp(4.5rem,15vw,13rem)] uppercase leading-[0.8] tracking-[-0.01em]">
              Drawing
              <span className="block text-[color:var(--accent)]">Club</span>
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="max-w-md space-y-4 font-serif text-[17px] leading-[1.75] text-[color:var(--ink)]/80 sm:text-lg">
              <p>
                This club exists to give the students an artistic outlet and to help enrich and foster an interest
                for art and personal expression through art. Though the club is for artists, it can be enjoyed by all
                who appreciate art.
              </p>
              <p>
                Drawing club is chartered to serve the diverse needs and interests of our students. There are avenues
                for forming friendships, cultural expression, skill development or aiding the students for their
                future career.
              </p>
            </div>
            <dl className="mt-8 grid max-w-md grid-cols-2 gap-6 border-t border-[color:var(--rule)] pt-6">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)]">On paper</dt>
                <dd className="mt-1 font-heading text-5xl leading-none">{Object.keys(PAPER).length}</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)]">On walls</dt>
                <dd className="mt-1 font-heading text-5xl leading-none">{Object.keys(WALLS).length}</dd>
              </div>
            </dl>
          </Reveal>
        </div>

        {/* ── On paper ──────────────────────────────────────────────── */}
        <div className="pb-16 sm:pb-24">
          <GroupHeading
            title="On"
            accent="paper"
            blurb="Portraits and studies in graphite and pencil."
            count="Graphite · Pencil"
          />

          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-12">
            <Reveal className="col-span-2 lg:col-span-6">
              <Tile
                work={PAPER.profile}
                onOpen={() => open(PAPER.profile)}
                ratio="3 / 4"
                sizes="(max-width: 1024px) 100vw, 46vw"
              />
            </Reveal>

            <div className="col-span-2 grid grid-cols-2 items-start gap-3 sm:gap-4 lg:col-span-6">
              <Reveal delay={0.06} className="col-span-2">
                <Tile
                  work={PAPER.driver}
                  onOpen={() => open(PAPER.driver)}
                  ratio="16 / 10"
                  sizes="(max-width: 1024px) 100vw, 46vw"
                />
              </Reveal>
              <Reveal delay={0.1}>
                <Tile
                  work={PAPER.sunglasses}
                  onOpen={() => open(PAPER.sunglasses)}
                  ratio="4 / 5"
                  sizes="(max-width: 1024px) 50vw, 23vw"
                />
              </Reveal>
              <Reveal delay={0.14}>
                <Tile
                  work={PAPER.sketchbook}
                  onOpen={() => open(PAPER.sketchbook)}
                  ratio="4 / 5"
                  sizes="(max-width: 1024px) 50vw, 23vw"
                />
              </Reveal>
            </div>
          </div>
        </div>

        {/* ── On walls ──────────────────────────────────────────────── */}
        <div className="pb-16 sm:pb-24">
          <GroupHeading
            title="On"
            accent="walls"
            blurb="Murals painted by club members around campus."
            count="Paint · Wall"
          />

          {/* Each tile grows by its own aspect ratio, so the row stays one height with no cropping. */}
          <div className="grid grid-cols-2 items-start gap-3 md:flex md:gap-4">
            {[WALLS.duo, WALLS.members, WALLS.pillar].map((work, index) => (
              <div
                key={work.id}
                className={`min-w-0 ${work === WALLS.members ? "order-first col-span-2 md:order-none" : ""}`}
                style={{ flex: `${aspectOf(work.id)} 1 0%` }}
              >
                <Reveal delay={index * 0.07}>
                  <Tile
                    work={work}
                    onOpen={() => open(work)}
                    ratio={`${REPORT_PHOTOS[work.id].width} / ${REPORT_PHOTOS[work.id].height}`}
                    sizes="(max-width: 768px) 50vw, 45vw"
                  />
                </Reveal>
              </div>
            ))}
          </div>
        </div>

        {/* ── Closing line ──────────────────────────────────────────── */}
        <Reveal className="pb-20 sm:pb-28">
          <div className="border-t border-[color:var(--ink)] pt-8">
            <p className="max-w-4xl font-heading text-[clamp(2.75rem,8vw,7rem)] uppercase leading-[0.9]">
              Art for all who <span className="text-[color:var(--accent)]">appreciate it.</span>
            </p>
          </div>
        </Reveal>
      </Container>

      <Lightbox index={active} onClose={() => setActive(null)} onStep={step} />
    </ReportSection>
  );
}
