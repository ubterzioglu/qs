import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Admin · Qualtron Sinclair",
  robots: { index: false, follow: false },
};

/** Minimal shell for everything under /admin (login + panel). */
export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-[var(--color-obsidian)]">{children}</div>;
}
