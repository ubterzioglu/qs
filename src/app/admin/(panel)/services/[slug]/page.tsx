import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { createServiceClient } from "@/lib/supabase/server";
import { ServiceEditForm, type ServiceFormData } from "@/components/admin/service-edit-form";

export default async function AdminServiceEdit({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await requireAdmin();
  const { slug } = await params;

  const db = createServiceClient();
  if (!db) notFound();
  const { data: row } = await db.from("services").select("*").eq("slug", slug).maybeSingle();
  if (!row) notFound();

  const service: ServiceFormData = {
    slug: row.slug,
    title: row.title ?? {},
    description: row.description ?? {},
    quote: row.quote ?? {},
    subtitle: row.subtitle,
    image: row.image ?? "",
  };

  return (
    <div>
      <Link href="/admin/services" className="qs-label text-[var(--color-slate)] hover:text-[var(--color-mist)]">
        ← Hizmetler
      </Link>
      <h1 className="qs-display mt-4 text-3xl text-[var(--color-cream)]">
        {service.title.tr ?? service.title.en ?? slug}
        <span className="ml-3 qs-label align-middle text-[var(--color-brass)]">{row.code}</span>
      </h1>
      <ServiceEditForm service={service} />
    </div>
  );
}
