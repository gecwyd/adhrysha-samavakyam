"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

const SCRIPT_ID = "instagram-embed-script";

function loadInstagramScript(): Promise<void> {
  return new Promise((resolve) => {
    if (window.instgrm) {
      resolve();
      return;
    }
    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      return;
    }
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
}

/** Renders a public Instagram post/reel via Instagram's own oEmbed widget (instagram.com/embed.js). */
export function InstagramEmbed({ url, caption }: { url: string; caption?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    loadInstagramScript().then(() => {
      if (!cancelled) window.instgrm?.Embeds.process();
    });
    return () => {
      cancelled = true;
    };
  }, [url]);

  return (
    <div ref={containerRef} className="w-full">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{ background: "#000", border: 0, margin: 0, width: "100%", minWidth: "270px" }}
      />
      {caption && (
        <p className="mt-2 font-mono text-[9px] uppercase leading-relaxed tracking-[0.18em] text-[color:var(--muted)]">
          {caption}
        </p>
      )}
    </div>
  );
}
