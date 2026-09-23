"use client";

import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { resolveAsset } from "@/lib/asset-registry";
import { REPORT_PHOTOS, type ReportPhotoId } from "@/lib/report-photos";

const EASE = [0.16, 1, 0.3, 1] as const;

export interface ReportTone {
  paper: string;
  ink: string;
  accent: string;
  muted: string;
  rule: string;
}

export interface ReportPhotoItem {
  id: ReportPhotoId;
  alt: string;
  caption?: string;
}

export interface TimelineItem {
  date: string;
  title?: string;
  body: string;
}

export function ReportSection({
  id,
  tone,
  className = "",
  children,
}: {
  id: string;
  tone: ReportTone;
  className?: string;
  children: ReactNode;
}) {
  const style = {
    "--paper": tone.paper,
    "--ink": tone.ink,
    "--accent": tone.accent,
    "--muted": tone.muted,
    "--rule": tone.rule,
  } as CSSProperties;

  return (
    <section
      id={id}
      style={style}
      className={`relative w-full overflow-hidden bg-[var(--paper)] text-[color:var(--ink)] selection:bg-[var(--accent)] selection:text-[color:var(--paper)] ${className}`}
    >
      {children}
    </section>
  );
}

export function Container({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1600px] px-5 sm:px-10 lg:px-16 ${className}`}>
      {children}
    </div>
  );
}

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function Rail({ left, right }: { left: string; right: string }) {
  return (
    <header className="flex items-center justify-between border-b border-[color:var(--rule)] pb-5 pt-6 font-mono text-[9px] uppercase tracking-[0.24em] text-[color:var(--muted)] sm:pt-8">
      <span>2025—26</span>
      <span>{left}</span>
      <span className="hidden sm:inline">{right}</span>
    </header>
  );
}

export function Kicker({ children }: { children: ReactNode }) {
  return (
    <p className="mb-6 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.34em] text-[color:var(--accent)]">
      <span className="h-px w-8 bg-[var(--accent)]" />
      {children}
    </p>
  );
}

export function Prose({
  paragraphs,
  className = "",
}: {
  paragraphs: string[];
  className?: string;
}) {
  return (
    <div className={`space-y-5 text-[15px] leading-[1.85] sm:text-base ${className}`}>
      {paragraphs.map((text, index) => (
        <Reveal key={index} y={16}>
          <p>{text}</p>
        </Reveal>
      ))}
    </div>
  );
}

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-t border-[color:var(--rule)] pt-4">
      <p className="font-heading text-5xl leading-none text-[color:var(--accent)] sm:text-6xl">
        {value}
      </p>
      <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.22em] text-[color:var(--muted)]">
        {label}
      </p>
    </div>
  );
}

export function ReportPhoto({
  id,
  alt,
  caption,
  ratio,
  position = "center",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  className = "",
}: ReportPhotoItem & {
  ratio?: string;
  position?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const { width, height } = REPORT_PHOTOS[id];
  const src = resolveAsset(`${id}.webp`);

  return (
    <figure className={className}>
      {ratio ? (
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: ratio }}>
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
            style={{ objectPosition: position }}
          />
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          priority={priority}
          className="h-auto w-full"
        />
      )}
      {caption && (
        <figcaption className="mt-2 font-mono text-[9px] uppercase leading-relaxed tracking-[0.18em] text-[color:var(--muted)]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export function PhotoMasonry({
  photos,
  className = "columns-2 gap-3 md:columns-3 lg:gap-4",
}: {
  photos: ReportPhotoItem[];
  className?: string;
}) {
  return (
    <div className={className}>
      {photos.map((photo, index) => (
        <Reveal key={photo.id} delay={(index % 3) * 0.06} y={18} className="mb-3 break-inside-avoid lg:mb-4">
          <ReportPhoto {...photo} sizes="(max-width: 768px) 50vw, 33vw" />
        </Reveal>
      ))}
    </div>
  );
}

export function Timeline({
  items,
  className = "",
}: {
  items: TimelineItem[];
  className?: string;
}) {
  return (
    <ol className={`border-t border-[color:var(--rule)] ${className}`}>
      {items.map((item, index) => (
        <li
          key={`${item.date}-${index}`}
          className="grid gap-2 border-b border-[color:var(--rule)] py-6 md:grid-cols-[11rem_1fr] md:gap-10 md:py-8"
        >
          <Reveal y={12}>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[color:var(--accent)]">
              {item.date}
            </p>
          </Reveal>
          <Reveal y={12} delay={0.05}>
            {item.title && (
              <h4 className="mb-2 font-heading text-2xl uppercase leading-none tracking-wide sm:text-3xl">
                {item.title}
              </h4>
            )}
            <p className="max-w-3xl text-[15px] leading-[1.8] text-[color:var(--muted)] sm:text-base">
              {item.body}
            </p>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
