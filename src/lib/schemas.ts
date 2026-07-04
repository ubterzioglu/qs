/**
 * Zod schemas — the single validation contract for every form.
 * Used by both the client (inline validation) and the server action (trust boundary).
 */
import { z } from "zod";

const email = z.string().trim().email();
const req = (max = 200) => z.string().trim().min(1).max(max);
const optional = (max = 500) => z.string().trim().max(max).optional().or(z.literal(""));

export const contactSchema = z.object({
  firstName: req(),
  lastName: req(),
  email,
  phone: optional(60),
  message: req(2000),
});
export type ContactInput = z.infer<typeof contactSchema>;

export const careersSchema = z.object({
  firstName: req(),
  lastName: req(),
  dob: optional(40),
  email,
  phone: optional(60),
  resumeUrl: optional(500),
});
export type CareersInput = z.infer<typeof careersSchema>;

export const innoventureSchema = z.object({
  firstName: req(),
  lastName: req(),
  email,
  phone: optional(60),
  company: req(),
  position: req(),
  country: req(),
  project: req(2000),
  consent: z.boolean().refine((v) => v === true, "Consent is required"),
  cvUrl: optional(500),
});
export type InnoventureInput = z.infer<typeof innoventureSchema>;

export const startupHubSchema = z.object({
  firstName: req(),
  lastName: req(),
  email,
  company: optional(),
  fileUrl: optional(500),
  message: optional(2000),
});
export type StartupHubInput = z.infer<typeof startupHubSchema>;

export type FormKind = "contact" | "careers" | "innoventure" | "startup-hub";
