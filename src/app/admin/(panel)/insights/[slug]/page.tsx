import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { createServiceClient } from "@/lib/supabase/server";
import { PostEditForm, type PostFormData } from "@/components/admin/post-edit-form";

export default async function AdminPostEdit({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await requireAdmin();
  const { slug } = await params;

  const db = createServiceClient();
  if (!db) notFound();
  const { data: row } = await db.from("blog_posts").select("*").eq("slug", slug).maybeSingle();
  if (!row) notFound();

  const post: PostFormData = {
    slug: row.slug,
    status: row.status,
    title: row.title ?? {},
    excerpt: row.excerpt ?? {},
    body: row.body ?? {},
    author: row.author ?? "",
    cover: row.cover,
    readTimeMinutes: row.read_time_minutes ?? 2,
  };

  return (
    <div>
      <Link href="/admin/insights" className="qs-label text-[var(--color-slate)] hover:text-[var(--color-mist)]">
        ← Insights
      </Link>
      <h1 className="qs-display mt-4 text-3xl text-[var(--color-cream)]">{post.title.en ?? slug}</h1>
      <PostEditForm post={post} />
    </div>
  );
}
