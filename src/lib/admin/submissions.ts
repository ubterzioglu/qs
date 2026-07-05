/**
 * Shared definitions for the submission inbox + CSV export.
 * kind (URL segment) -> table + display columns (snake_case as stored).
 */
export const SUBMISSION_KINDS = {
  contact: {
    table: "contact_messages",
    label: "Contact messages",
    columns: ["created_at", "first_name", "last_name", "email", "phone", "message"],
  },
  careers: {
    table: "career_applications",
    label: "Career applications",
    columns: ["created_at", "first_name", "last_name", "dob", "email", "phone", "resume_url"],
  },
  innoventure: {
    table: "innoventure_applications",
    label: "InnoVenture applications",
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
    label: "Start-up Hub submissions",
    columns: ["created_at", "first_name", "last_name", "email", "company", "file_url", "message"],
  },
} as const;

export type SubmissionKind = keyof typeof SUBMISSION_KINDS;

export function isSubmissionKind(v: string): v is SubmissionKind {
  return v in SUBMISSION_KINDS;
}
