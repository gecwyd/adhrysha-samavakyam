"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { resolveAsset } from "@/lib/asset-registry";
import { preload } from "@/lib/preload";
import { cn } from "@/lib/utils";

type ShortFilmProps = {
  id: string;
  video: string;
  poster: string;
  kicker: string;
  title: string;
  hook: string;
  credits: string;
  bg: string;
  text: string;
  accent: string;
};

/**
 * A short film lead-in, framed as a true 16:9 screen so it always reads as horizontal,
 * never cropped to fill the viewport. Scrolling it into view plays it and attempts to
 * unmute automatically (Chrome/Safari allow this once the visitor has clicked anywhere
 * on the page already, which is true almost every time someone scrolls this deep) — if
 * the browser refuses, it silently falls back to a muted loop with a manual sound toggle
 * rather than throwing a console error. Scrolling out pauses it; scrolling back in resumes
 * from where it left off and re-attempts sound.
 */
export function ShortFilm({ id, video, poster, kicker, title, hook, credits, bg, text, accent }: ShortFilmProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [soundOn, setSoundOn] = useState(false);

  const videoSrc = resolveAsset(video);
  const posterSrc = resolveAsset(poster);

  useEffect(() => {
    preload(videoSrc, "video");
    preload(posterSrc, "image");
  }, [videoSrc, posterSrc]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const syncFromElement = () => setSoundOn(!el.muted && !el.paused);
    el.addEventListener("volumechange", syncFromElement);
    el.addEventListener("pause", syncFromElement);
    el.addEventListener("play", syncFromElement);
    return () => {
      el.removeEventListener("volumechange", syncFromElement);
      el.removeEventListener("pause", syncFromElement);
      el.removeEventListener("play", syncFromElement);
    };
  }, []);

  const isInView = useInView(frameRef, { amount: 0.6 });

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (isInView) {
      el.muted = false;
      el.play().catch(() => {
        el.muted = true;
        el.play().catch(() => {});
      });
    } else {
      el.pause();
    }
  }, [isInView]);

  const toggleSound = () => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = !el.muted;
  };

  return (
    <section
      id={id}
      aria-label={`${title}: ${hook}`}
      className="relative flex w-full flex-col items-center justify-center gap-6 overflow-hidden px-6 py-12 md:gap-8 md:px-8 md:py-16"
      style={{ backgroundColor: bg }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(ellipse 70% 50% at 50% 40%, ${accent}14 0%, transparent 70%)` }}
      />

      <div className="relative z-10 max-w-2xl text-center">
        <span lang="en" className="font-mono text-[10px] uppercase tracking-[0.4em] sm:text-xs" style={{ color: accent }}>
          {kicker}
        </span>
        <h3 className="mt-3 font-heading text-2xl leading-tight sm:text-3xl md:text-4xl" style={{ color: text }}>
          {title}
        </h3>
        <p className="mx-auto mt-2 max-w-lg font-serif text-sm italic sm:text-base" style={{ color: `${text}b3` }}>
          {hook}
        </p>
      </div>

      <div
        ref={frameRef}
        className="relative z-10 aspect-video w-full max-w-5xl overflow-hidden rounded-lg shadow-2xl ring-1"
        style={{ boxShadow: `0 0 80px -20px ${accent}55`, ["--tw-ring-color" as string]: `${accent}40` }}
      >
        {/* Ambient blurred fill so the true horizontal frame never letterboxes on odd container ratios */}
        <video
          aria-hidden
          loop
          muted
          autoPlay
          playsInline
          preload="none"
          poster={posterSrc}
          className="absolute inset-0 h-full w-full scale-110 object-cover opacity-50 blur-2xl"
        >
          <source src={videoSrc} type="video/webm" />
        </video>

        <video
          ref={videoRef}
          loop
          muted
          playsInline
          preload="auto"
          poster={posterSrc}
          className="absolute inset-0 h-full w-full object-contain"
        >
          <source src={videoSrc} type="video/webm" />
        </video>

        <button
          type="button"
          onClick={toggleSound}
          aria-label={soundOn ? "Mute" : "Unmute"}
          className="group absolute bottom-4 right-4 z-20 flex items-center gap-2 rounded-full border px-3.5 py-2 backdrop-blur-md transition-transform hover:scale-105 sm:bottom-5 sm:right-5"
          style={{ borderColor: `${accent}55`, backgroundColor: `${bg}aa`, color: text }}
        >
          {soundOn ? (
            <Volume2 className="h-4 w-4" style={{ color: accent }} />
          ) : (
            <VolumeX className={cn("h-4 w-4", isInView && "animate-pulse")} style={{ color: accent }} />
          )}
          <span className="font-mono text-[10px] uppercase tracking-[0.25em]">{soundOn ? "Sound On" : "Muted"}</span>
        </button>
      </div>

      <p className="relative z-10 font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: `${text}80` }}>
        {credits}
      </p>
    </section>
  );
}
