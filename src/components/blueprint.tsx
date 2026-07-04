/**
 * Blueprint primitives — the shared vocabulary of the "Architectural Blueprint"
 * design language. Every page composes from these so the identity stays coherent.
 */
import type { ReactNode } from "react";

/** Monospace measurement / coordinate label. e.g. "01 — GROWTH ARCHITECTURE" */
export function Label({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={`bp-label ${className}`}>{children}</span>;
}

/** A drawn hairline rule that animates in on load (reduced-motion respected). */
export function Rule({ className = "" }: { className?: string }) {
  return <div className={`bp-rule ${className}`} aria-hidden="true" />;
}

/**
 * Section wrapper: a titled block framed like a drawing sheet, with a
 * monospace section marker in the margin.
 */
export function Section({
  marker,
  title,
  children,
  className = "",
  id,
}: {
  marker?: string;
  title?: ReactNode;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`border-t border-[var(--color-rule)] ${className}`}>
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24 lg:px-8">
        {(marker || title) && (
          <header className="mb-10 sm:mb-14">
            {marker && <Label>{marker}</Label>}
            {title && (
              <h2 className="bp-display mt-3 text-3xl text-[var(--color-ink)] sm:text-4xl lg:text-5xl">
                {title}
              </h2>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}

/** Corner-ticked frame used to wrap hero / feature blocks. */
export function Frame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`bp-frame border border-[var(--color-rule)] ${className}`}>
      {children}
    </div>
  );
}

/**
 * Numbered / coded card used for verticals and grids. The code (e.g. "TEC")
 * is real information — the internal shorthand for each vertical — not decoration.
 */
export function CodeCard({
  code,
  index,
  children,
  className = "",
}: {
  code?: string;
  index?: number;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bp-frame group relative border border-[var(--color-rule)] bg-[var(--color-paper)] p-6 transition-colors hover:bg-[var(--color-paper-2)] sm:p-8 ${className}`}
    >
      {(code || index !== undefined) && (
        <div className="mb-6 flex items-center justify-between">
          {index !== undefined && (
            <Label>{String(index).padStart(2, "0")}</Label>
          )}
          {code && (
            <span className="bp-label text-[var(--color-blueprint)]">{code}</span>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
