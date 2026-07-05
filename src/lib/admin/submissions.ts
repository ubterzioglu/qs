/**
 * Shared definitions for the submission inbox + CSV export.
 * kind (URL segment) -> table + display columns (snake_case as stored).
 */
export const SUBMISSION_KINDS = {
  contact: {
    table: "contact_messages",
    label: "İletişim mesajları",
    columns: ["created_at", "first_name", "last_name", "email", "phone", "message"],
  },
  careers: {
    table: "career_applications",
    label: "Kariyer başvuruları",
    columns: ["created_at", "first_name", "last_name", "dob", "email", "phone", "resume_url"],
  },
  innoventure: {
    table: "innoventure_applications",
    label: "InnoVenture başvuruları",
    columns: [
      "created_at",
      "first_name",
      "last_name",
      "email",
      "phone",
      "company",
      "position",
      "country",
      "project",
      "consent",
      "cv_url",
    ],
  },
  "startup-hub": {
    table: "startup_hub_submissions",
    label: "Girişim Merkezi gönderileri",
    columns: ["created_at", "first_name", "last_name", "email", "company", "file_url", "message"],
  },
} as const;

export type SubmissionKind = keyof typeof SUBMISSION_KINDS;

export function isSubmissionKind(v: string): v is SubmissionKind {
  return v in SUBMISSION_KINDS;
}
