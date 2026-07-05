"use client";

import { useActionState } from "react";
import { updateServiceAction, type AdminActionState } from "@/app/admin/actions";
import { AdminField, AdminTextArea, AdminSubmit, AdminResult } from "./editor-kit";

const initial: AdminActionState = { status: "idle" };

export interface ServiceFormData {
  slug: string;
  title: { en?: string; tr?: string };
  description: { en?: string; tr?: string };
  quote: { en?: string; tr?: string };
  subtitle?: { en?: string; tr?: string } | null;
  image: string;
}

export function ServiceEditForm({ service }: { service: ServiceFormData }) {
  const [state, action] = useActionState(
    updateServiceAction.bind(null, service.slug),
    initial,
  );

  return (
    <form action={action} className="mt-8 grid gap-6 lg:grid-cols-2">
      <AdminField name="title_en" label="Başlık (EN)" defaultValue={service.title.en} required />
      <AdminField name="title_tr" label="Başlık (TR)" defaultValue={service.title.tr} />
      <AdminTextArea name="description_en" label="Açıklama (EN)" defaultValue={service.description.en} rows={6} />
      <AdminTextArea name="description_tr" label="Açıklama (TR)" defaultValue={service.description.tr} rows={6} />
      <AdminTextArea name="quote_en" label="İlke sözü (EN)" defaultValue={service.quote.en} rows={2} />
      <AdminTextArea name="quote_tr" label="İlke sözü (TR)" defaultValue={service.quote.tr} rows={2} />
      <AdminField name="subtitle_en" label="Alt başlık (EN, opsiyonel)" defaultValue={service.subtitle?.en ?? ""} />
      <AdminField name="subtitle_tr" label="Alt başlık (TR, opsiyonel)" defaultValue={service.subtitle?.tr ?? ""} />
      <div className="lg:col-span-2">
        <AdminField name="image" label="Görsel yolu (/media/…)" defaultValue={service.image} />
      </div>
      <div className="flex items-center gap-4 lg:col-span-2">
        <AdminSubmit />
        <AdminResult state={state} />
      </div>
    </form>
  );
}
