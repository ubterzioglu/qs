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
      <p className="qs-label">New revision request</p>
      <AdminField name="title" label="Title" required />
      <div className="grid gap-5 sm:grid-cols-2">
        <AdminField name="page" label="Page / section (e.g. /services/legal-compliance)" />
        <AdminSelect
          name="priority"
          label="Priority"
          defaultValue="normal"
          options={[
            { value: "low", label: "Low" },
            { value: "normal", label: "Normal" },
            { value: "high", label: "High" },
          ]}
        />
      </div>
      <AdminTextArea name="description" label="What should change?" rows={4} />
      <div className="flex items-center gap-4">
        <AdminSubmit label="Create request" />
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
      <AdminTextArea name="body" label="Add a comment" rows={3} required />
      <div className="flex items-center gap-4">
        <AdminSubmit label="Comment" />
        <AdminResult state={state} />
      </div>
    </form>
  );
}
