"use client";

import type { ReactNode } from "react";

/**
 * Full-bleed ambient video hero on the obsidian base.
 * Muted autoplay loop with a dark gradient overlay for legibility; a poster image
 * covers reduced-motion / slow connections. Content is passed as children.
 */
export function VideoHero({
  src,
  poster,
  children,
}: {
  src: string;
  poster: string;
  children: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-40 motion-reduce:hidden"
        autoPlay
        muted
        loop
        playsInline
        poster={poster}
        aria-hidden="true"
      >
        <source src={src} type="video/mp4" />
      </video>
      {/* Poster fallback for reduced motion */}
      <div
        className="absolute inset-0 hidden bg-cover bg-center opacity-40 motion-reduce:block"
        style={{ backgroundImage: `url(${poster})` }}
        aria-hidden="true"
      />
      {/* Legibility gradient: darker at edges, obsidian at the bottom */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,14,31,0.7) 0%, rgba(10,14,31,0.5) 45%, var(--color-obsidian) 100%)",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32 lg:px-8">
        {children}
      </div>
    </section>
  );
}
