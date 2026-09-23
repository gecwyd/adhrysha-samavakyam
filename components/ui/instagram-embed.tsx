"use client";

import { cn } from "@/lib/utils";

interface InstagramEmbedProps {
  url: string;
  caption?: string;
  className?: string;
}

function getInstagramEmbedUrl(url: string) {
  const match = url.match(/\/(p|reel|tv)\/([^/?#]+)/i);
  if (!match) return null;
  return `https://www.instagram.com/${match[1]}/${match[2]}/embed/captioned/`;
}

export function InstagramEmbed({ url, caption, className }: InstagramEmbedProps) {
  const embedUrl = getInstagramEmbedUrl(url);

  if (!embedUrl) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "flex aspect-[4/5] w-full items-center justify-center bg-[#161616] px-6 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-[#f2ecdb]/60",
          className
        )}
      >
        View on Instagram &nearr;
      </a>
    );
  }

  return (
    <div className={cn("relative w-full overflow-hidden bg-white", className)}>
      <iframe
        src={embedUrl}
        title={caption ? `Instagram post: ${caption}` : "Instagram post"}
        loading="lazy"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        className="block h-[620px] w-full border-0 sm:h-[680px]"
      />
      <noscript>
        <a href={url} target="_blank" rel="noopener noreferrer">
          View this post on Instagram
        </a>
      </noscript>
    </div>
  );
}
