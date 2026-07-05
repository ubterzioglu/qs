"use client";

import { useFormStatus } from "react-dom";
import { useTranslations } from "next-intl";
import type { FormState } from "@/app/actions/submit-form";

export function Field({
  name,
  label,
  type = "text",
  required = false,
  error,
  full = false,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  error?: string;
  full?: boolean;
}) {
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <span className="bp-label block">
        {label}
        {required && <span className="text-[var(--color-brass)]"> *</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        aria-invalid={error ? "true" : undefined}
        className="mt-2 w-full border border-[var(--color-rule-strong)] bg-[var(--color-paper)] px-3 py-2.5 text-[var(--color-ink)] outline-none focus:border-[var(--color-blueprint)]"
      />
      {error && <span className="mt-1 block text-xs text-[var(--color-brass)]">{error}</span>}
    </label>
  );
}

export function TextArea({
  name,
  label,
  required = false,
  error,
}: {
  name: string;
  label: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <label className="block sm:col-span-2">
      <span className="bp-label block">
        {label}
        {required && <span className="text-[var(--color-brass)]"> *</span>}
      </span>
      <textarea
        name={name}
        required={required}
        rows={4}
        aria-invalid={error ? "true" : undefined}
        className="mt-2 w-full resize-y border border-[var(--color-rule-strong)] bg-[var(--color-paper)] px-3 py-2.5 text-[var(--color-ink)] outline-none focus:border-[var(--color-blueprint)]"
      />
      {error && <span className="mt-1 block text-xs text-[var(--color-brass)]">{error}</span>}
    </label>
  );
}

export function Consent({ name, label, error }: { name: string; label: string; error?: string }) {
  return (
    <label className="flex items-start gap-3 sm:col-span-2">
      <input
        name={name}
        type="checkbox"
        className="mt-1 h-4 w-4 accent-[var(--color-blueprint)]"
      />
      <span className="text-sm text-[var(--color-graphite)]">
        {label}
        {error && <span className="mt-1 block text-xs text-[var(--color-brass)]">{error}</span>}
      </span>
    </label>
  );
}

export function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  const t = useTranslations("forms");
  return (
    <button
      type="submit"
      disabled={pending}
      className="group inline-flex items-center gap-3 self-start border border-[var(--color-ink)] px-8 py-3 text-sm font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] disabled:opacity-50 sm:col-span-2"
    >
      {pending ? t("sending") : label}
      {!pending && <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>}
    </button>
  );
}

export function FormResult({ state }: { state: FormState }) {
  const t = useTranslations("forms");
  if (state.status === "success") {
    return (
      <p className="border border-[var(--color-blueprint)] bg-[var(--color-paper-2)] px-4 py-3 text-sm text-[var(--color-blueprint)] sm:col-span-2">
        {t("success")}
      </p>
    );
  }
  if (state.status === "error") {
    return (
      <p className="border border-[var(--color-brass)] px-4 py-3 text-sm text-[var(--color-brass)] sm:col-span-2">
        {state.message || t("error")}
      </p>
    );
  }
  return null;
}
