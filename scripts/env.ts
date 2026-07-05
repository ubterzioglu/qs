/**
 * Minimal .env.local loader for standalone tsx scripts (seed, create-admin).
 * No dependency; parses KEY=VALUE lines, ignores comments/blank lines.
 * Values already present in process.env win (so CI can override).
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

export function loadEnvLocal(file = ".env.local"): void {
  let raw: string;
  try {
    raw = readFileSync(resolve(process.cwd(), file), "utf8");
  } catch {
    return; // no file — rely on process env
  }
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    // Strip one layer of surrounding quotes (dotenv-style values).
    if (value.length >= 2 && /^(".*"|'.*')$/s.test(value)) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

export function requireEnv(key: string): string {
  const v = process.env[key]?.trim();
  if (!v) {
    console.error(`Missing required env: ${key} (set it in .env.local)`);
    process.exit(1);
  }
  return v;
}
