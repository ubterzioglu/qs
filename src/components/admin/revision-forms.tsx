"use client";

import { useActionState } from "react";
import {
  createRevisionAction,
  addRevisionCommentAction,
  type AdminActionState,
} from "@/app/admin/actions";
import { AdminField, AdminTextArea, AdminSelect, AdminSubmit, AdminResult } from "./editor-kit";

const initial: AdminActionState = { status: "idle" };

export function NewRevisionForm() {
  const [state, action] = useActionState(createRevisionAction, initial);

  return (
    <form action={action} className="grid gap-5 border border-[var(--color-navy-line)] bg-[var(--color-navy)] p-6">
      <p className="qs-label">Yeni revizyon isteği</p>
      <AdminField name="title" label="Başlık" required />
      <div className="grid gap-5 sm:grid-cols-2">
        <AdminField name="page" label="Sayfa / bölüm (örn. /services/legal-compliance)" />
        <AdminSelect
          name="priority"
          label="Öncelik"
          defaultValue="normal"
          options={[
            { value: "low", label: "Düşük" },
            { value: "normal", label: "Normal" },
            { value: "high", label: "Yüksek" },
          ]}
        />
      </div>
      <AdminField name="author" label="Adınız (opsiyonel)" />
      <AdminTextArea name="description" label="Ne değişmeli?" rows={4} />
      <div className="flex items-center gap-4">
        <AdminSubmit label="İstek oluştur" />
        <AdminResult state={state} />
      </div>
    </form>
  );
}

export function RevisionCommentForm({ requestId }: { requestId: string }) {
  const [state, action] = useActionState(
    addRevisionCommentAction.bind(null, requestId),
    initial,
  );

  return (
    <form action={action} className="grid gap-4">
      <AdminField name="author" label="Adınız (opsiyonel)" />
      <AdminTextArea name="body" label="Yorum ekle" rows={3} required />
      <div className="flex items-center gap-4">
        <AdminSubmit label="Yorum yap" />
        <AdminResult state={state} />
      </div>
    </form>
  );
}
