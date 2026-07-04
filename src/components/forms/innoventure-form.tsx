"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { submitForm, type FormState } from "@/app/actions/submit-form";
import { Field, TextArea, Consent, SubmitButton, FormResult } from "./form-kit";

const initial: FormState = { status: "idle" };

export function InnoventureForm() {
  const t = useTranslations("forms");
  const [state, action] = useActionState(
    submitForm.bind(null, "innoventure"),
    initial,
  );
  const err = state.status === "error" ? state.fieldErrors : undefined;

  return (
    <form action={action} className="grid gap-5 sm:grid-cols-2">
      <Field name="firstName" label={t("firstName")} required error={err?.firstName} />
      <Field name="lastName" label={t("lastName")} required error={err?.lastName} />
      <Field name="email" label={t("email")} type="email" required error={err?.email} />
      <Field name="phone" label={t("phone")} error={err?.phone} />
      <Field name="company" label={t("company")} required error={err?.company} />
      <Field name="position" label={t("position")} required error={err?.position} />
      <Field name="country" label={t("country")} required error={err?.country} full />
      <TextArea name="project" label={t("project")} required error={err?.project} />
      <Field name="cvUrl" label={t("cv")} type="url" error={err?.cvUrl} full />
      <Consent name="consent" label={t("consent")} error={err?.consent} />
      <FormResult state={state} />
      <SubmitButton label={t("apply")} />
    </form>
  );
}
