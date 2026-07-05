"use client";

/**
 * Shared client-side form primitives for the admin editors.
 * Server actions are bound via useActionState in the concrete editor forms.
 */
import { useFormStatus } from "react-dom";
import type { AdminActionState } from "@/app/admin/actions";

export function AdminField({
  name,
  label,
  defaultValue = "",
  required = false,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="qs-label">
        {label}
        {required && <span className="text-[var(--color-brass)]"> *</span>}
      </span>
      <input
        name={name}
        defaultValue={defaultValue}
        required={required}
        className="mt-2 w-full border border-[var(--color-navy-line)] bg-[var(--color-obsidian)] px-3 py-2.5 text-[var(--color-cream)] outline-none focus:border-[var(--color-brass)]"
      />
    </label>
  );
}

export function AdminTextArea({
  name,
  label,
  defaultValue = "",
  rows = 4,
  required = false,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  rows?: number;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="qs-label">
        {label}
        {required && <span className="text-[var(--color-brass)]"> *</span>}
      </span>
      <textarea
        name={name}
        defaultValue={defaultValue}
        rows={rows}
        required={required}
        className="mt-2 w-full resize-y border border-[var(--color-navy-line)] bg-[var(--color-obsidian)] px-3 py-2.5 font-mono text-sm text-[var(--color-cream)] outline-none focus:border-[var(--color-brass)]"
      />
    </label>
  );
}

export function AdminSelect({
  name,
  label,
  options,
  defaultValue,
}: {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
}) {
  return (
    <label className="block">
      <span className="qs-label">{label}</span>
      <select
        name={name}
        defaultValue={defaultValue}
        className="mt-2 w-full border border-[var(--color-navy-line)] bg-[var(--color-obsidian)] px-3 py-2.5 text-[var(--color-cream)] outline-none focus:border-[var(--color-brass)]"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function AdminSubmit({ label = "Kaydet" }: { label?: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="qs-btn disabled:opacity-50">
      {pending ? "Kaydediliyor…" : label}
    </button>
  );
}

export function AdminResult({ state }: { state: AdminActionState }) {
  if (state.status === "saved") {
    return <p className="border border-[var(--color-brass)] px-3 py-2 text-sm text-[var(--color-brass-hi)]">{state.message ?? "Kaydedildi."}</p>;
  }
  if (state.status === "error") {
    return <p className="border border-red-800 px-3 py-2 text-sm text-red-300">{state.message ?? "Hata."}</p>;
  }
  return null;
}
