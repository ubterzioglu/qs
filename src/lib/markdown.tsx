/**
 * Minimal, dependency-free markdown renderer for trusted seed/CMS content.
 * Supports the subset our content uses: paragraphs, blank-line breaks,
 * **bold**, _italic_, and ## / ### headings. Not a general-purpose parser —
 * content is authored in-house, not user-supplied.
 */
import type { ReactNode } from "react";

function inline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  // Split on **bold** and _italic_ while keeping delimiters.
  const parts = text.split(/(\*\*[^*]+\*\*|_[^_]+_)/g);
  parts.forEach((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      nodes.push(<strong key={i}>{part.slice(2, -2)}</strong>);
    } else if (part.startsWith("_") && part.endsWith("_")) {
      nodes.push(<em key={i}>{part.slice(1, -1)}</em>);
    } else if (part) {
      nodes.push(part);
    }
  });
  return nodes;
}

export function Markdown({ source }: { source: string }) {
  const blocks = source.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);

  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        if (block.startsWith("### ")) {
          return (
            <h3 key={i} className="bp-display text-xl text-[var(--color-ink)]">
              {inline(block.slice(4))}
            </h3>
          );
        }
        if (block.startsWith("## ")) {
          return (
            <h2 key={i} className="bp-display text-2xl text-[var(--color-ink)]">
              {inline(block.slice(3))}
            </h2>
          );
        }
        return (
          <p key={i} className="leading-relaxed text-[var(--color-graphite)]">
            {inline(block)}
          </p>
        );
      })}
    </div>
  );
}
