import "server-only";

/**
 * Email notifications for public form submissions (via Resend).
 * Best-effort and non-blocking: if RESEND_API_KEY / notify address is missing,
 * or the send fails, we log and return — the form submission still succeeds.
 */
import { Resend } from "resend";
import { serverEnv } from "@/lib/env.server";
import type { FormKind } from "@/lib/schemas";

const KIND_LABEL: Record<FormKind, string> = {
  contact: "İletişim mesajı",
  careers: "Kariyer başvurusu",
  innoventure: "InnoVenture başvurusu",
  "startup-hub": "Girişim Merkezi gönderisi",
};

const FIELD_LABEL: Record<string, string> = {
  firstName: "Ad",
  lastName: "Soyad",
  email: "E-posta",
  phone: "Telefon",
  message: "Mesaj",
  dob: "Doğum tarihi",
  resumeUrl: "Özgeçmiş",
  company: "Şirket",
  position: "Pozisyon",
  country: "Ülke",
  project: "Proje / açıklama",
  consent: "Onay",
  cvUrl: "CV / LinkedIn",
  fileUrl: "Dosya",
};

function esc(s: string): string {
  return s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
}

function renderRows(data: Record<string, unknown>): string {
  return Object.entries(data)
    .filter(([, v]) => v !== "" && v !== null && v !== undefined)
    .map(([k, v]) => {
      const label = FIELD_LABEL[k] ?? k;
      const value = typeof v === "boolean" ? (v ? "Evet" : "Hayır") : esc(String(v));
      return `<tr><td style="padding:6px 12px;color:#6b7591;white-space:nowrap;vertical-align:top">${esc(label)}</td><td style="padding:6px 12px;color:#14181f">${value}</td></tr>`;
    })
    .join("");
}

/** Fire-and-forget notification. Never throws. */
export async function notifySubmission(
  kind: FormKind,
  data: Record<string, unknown>,
): Promise<void> {
  const { resendApiKey, notifyEmail, notifyFrom } = serverEnv;
  if (!resendApiKey || !notifyEmail) return; // not configured — skip silently

  try {
    const resend = new Resend(resendApiKey);
    const label = KIND_LABEL[kind];
    const replyTo = typeof data.email === "string" && data.email ? data.email : undefined;

    const html = `<div style="font-family:system-ui,sans-serif;max-width:560px">
      <h2 style="font-family:Georgia,serif;color:#1b3a5b;margin:0 0 4px">Yeni ${esc(label)}</h2>
      <p style="color:#6b7591;margin:0 0 16px;font-size:13px">qualtronsinclair.com üzerinden gönderildi</p>
      <table style="border-collapse:collapse;width:100%;font-size:14px;border:1px solid #e5e3db">${renderRows(data)}</table>
    </div>`;

    await resend.emails.send({
      from: notifyFrom,
      to: notifyEmail,
      subject: `Yeni ${label} — Qualtron Sinclair`,
      html,
      ...(replyTo ? { replyTo } : {}),
    });
  } catch (err) {
    console.error(`[notify:${kind}] email failed`, err instanceof Error ? err.message : err);
  }
}
