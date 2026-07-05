"use client";

import { useActionState } from "react";
import { updateSiteSettingsAction, type AdminActionState } from "@/app/admin/actions";
import { AdminField, AdminSubmit, AdminResult } from "./editor-kit";

const initial: AdminActionState = { status: "idle" };

export function SettingsForm({
  brandName,
  contactEmail,
}: {
  brandName: string;
  contactEmail: string;
}) {
  const [state, action] = useActionState(updateSiteSettingsAction, initial);

  return (
    <form action={action} className="mt-8 grid max-w-xl gap-6">
      <AdminField name="brand_name" label="Brand name" defaultValue={brandName} required />
      <AdminField name="contact_email" label="Contact email" defaultValue={contactEmail} required />
      <div className="flex items-center gap-4">
        <AdminSubmit />
        <AdminResult state={state} />
      </div>
    </form>
  );
}
