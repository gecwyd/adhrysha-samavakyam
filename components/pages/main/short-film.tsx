"use client";

import { useRef, useState } from "react";
import { resolveAsset } from "@/lib/asset-registry";
import { cn } from "@/lib/utils";

type ShortFilmProps = {
  id: string;
  video: string;
  poster: string;
  kicker: string;
  title: string;
  hook: string;
  bg: string;
  text: string;
  accent: string;
};

/** A click-to-play student short film, shown as a full-bleed lead-in before the section it introduces. */
export function ShortFilm({ id, video, poster, kicker, title, hook, bg, text, accent }: ShortFilmProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  return (
    <section
      id={id}
      className="relative flex min-h-[70dvh] w-full items-center justify-center overflow-hidden py-16 md:py-24"
      style={{ backgroundColor: bg }}
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-8 px-6 text-center md:px-8">
        <div>
          <span
            lang="en"
            className="font-mono text-[10px] uppercase tracking-[0.4em] sm:text-xs"
            style={{ color: accent }}
          >
            {kicker}
          </span>
          <h3 className="mt-4 font-heading text-2xl leading-tight sm:text-3xl md:text-4xl" style={{ color: text }}>
            {title}
          </h3>
          <p className="mx-auto mt-3 max-w-lg font-serif text-sm italic sm:text-base" style={{ color: `${text}99` }}>
            {hook}
          </p>
        </div>

        <div className="relative aspect-video w-full overflow-hidden rounded-md bg-black shadow-2xl">
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            poster={resolveAsset(poster)}
            controls={playing}
            playsInline
            preload="none"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          >
            <source src={resolveAsset(video)} type="video/webm" />
          </video>

          {!playing && (
            <button
              type="button"
              aria-label={`Play ${title}`}
              onClick={() => videoRef.current?.play()}
              className="group absolute inset-0 flex items-center justify-center bg-black/20 transition-colors hover:bg-black/35"
            >
              <span
                className={cn(
                  "flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg",
                  "transition-transform group-hover:scale-105"
                )}
              >
                <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-[#1a1512]">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
