"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { submitForm, type FormState } from "@/app/actions/submit-form";
import { Field, TextArea, SubmitButton, FormResult } from "./form-kit";

const initial: FormState = { status: "idle" };

export function ContactForm() {
  const t = useTranslations("forms");
  const [state, action] = useActionState(
    submitForm.bind(null, "contact"),
    initial,
  );
  const err = state.status === "error" ? state.fieldErrors : undefined;

  return (
    <form action={action} className="grid gap-5 sm:grid-cols-2">
      <Field name="firstName" label={t("firstName")} required error={err?.firstName} />
      <Field name="lastName" label={t("lastName")} required error={err?.lastName} />
      <Field name="email" label={t("email")} type="email" required error={err?.email} />
      <Field name="phone" label={t("phone")} error={err?.phone} />
      <TextArea name="message" label={t("message")} required error={err?.message} />
      <FormResult state={state} />
      <SubmitButton label={t("send")} />
    </form>
  );
}
