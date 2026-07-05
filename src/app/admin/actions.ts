"use server";

/**
 * Admin server actions. Every action re-verifies the admin session
 * (requireAdmin) before using the service-role client — never trust the UI.
 */
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/auth";
import { createServiceClient } from "@/lib/supabase/server";

function str(form: FormData, key: string, max = 4000): string {
  const v = form.get(key);
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

// Login + logout live in API routes (src/app/api/admin/{login,logout}) so the
// client is never coupled to a build-specific Server Action id.

export type AdminActionState = { status: "idle" | "saved" | "error"; message?: string };

export async function updateServiceAction(
  slug: string,
  _prev: AdminActionState,
  form: FormData,
): Promise<AdminActionState> {
  await requireAdmin();
  const db = createServiceClient();
  if (!db) return { status: "error", message: "Servis anahtarı yapılandırılmamış." };

  const titleEn = str(form, "title_en", 200);
  if (!titleEn) return { status: "error", message: "İngilizce başlık zorunludur." };

  const { error } = await db
    .from("services")
    .update({
      title: { en: titleEn, tr: str(form, "title_tr", 200) || titleEn },
      description: { en: str(form, "description_en"), tr: str(form, "description_tr") },
      quote: { en: str(form, "quote_en", 500), tr: str(form, "quote_tr", 500) },
      // Keep the subtitle if EITHER locale is provided (not just EN).
      subtitle:
        str(form, "subtitle_en", 200) || str(form, "subtitle_tr", 200)
          ? { en: str(form, "subtitle_en", 200), tr: str(form, "subtitle_tr", 200) }
          : null,
      image: str(form, "image", 500),
      updated_at: new Date().toISOString(),
    })
    .eq("slug", slug);

  if (error) return { status: "error", message: error.message };
  revalidatePath("/", "layout");
  return { status: "saved", message: "Kaydedildi." };
}

export async function updateBlogPostAction(
  slug: string,
  _prev: AdminActionState,
  form: FormData,
): Promise<AdminActionState> {
  await requireAdmin();
  const db = createServiceClient();
  if (!db) return { status: "error", message: "Servis anahtarı yapılandırılmamış." };

  const titleEn = str(form, "title_en", 300);
  if (!titleEn) return { status: "error", message: "İngilizce başlık zorunludur." };
  const status = str(form, "status", 20) === "draft" ? "draft" : "published";
  const readTime = Math.max(1, Math.min(60, Number(str(form, "read_time", 4)) || 2));

  const { error } = await db
    .from("blog_posts")
    .update({
      status,
      title: { en: titleEn, tr: str(form, "title_tr", 300) || titleEn },
      excerpt: { en: str(form, "excerpt_en", 1000), tr: str(form, "excerpt_tr", 1000) },
      body: { en: str(form, "body_en", 100000), tr: str(form, "body_tr", 100000) },
      author: str(form, "author", 120) || "Qualtron Sinclair",
      cover: str(form, "cover", 500) || null,
      read_time_minutes: readTime,
      updated_at: new Date().toISOString(),
    })
    .eq("slug", slug);

  if (error) return { status: "error", message: error.message };
  revalidatePath("/", "layout");
  return { status: "saved", message: "Kaydedildi." };
}

// ============================ revision requests ============================

export async function createRevisionAction(
  _prev: AdminActionState,
  form: FormData,
): Promise<AdminActionState> {
  await requireAdmin();
  const db = createServiceClient();
  if (!db) return { status: "error", message: "Servis anahtarı yapılandırılmamış." };

  const title = str(form, "title", 300);
  if (!title) return { status: "error", message: "Başlık zorunludur." };
  const priority = ["low", "normal", "high"].includes(str(form, "priority", 10))
    ? str(form, "priority", 10)
    : "normal";
  const author = str(form, "author", 120) || "admin";

  const { error } = await db.from("revision_requests").insert({
    title,
    description: str(form, "description", 8000),
    page: str(form, "page", 300),
    priority,
    created_by: author,
  });

  if (error) return { status: "error", message: error.message };
  revalidatePath("/admin/revisions");
  return { status: "saved", message: "Revizyon isteği oluşturuldu." };
}

export async function addRevisionCommentAction(
  requestId: string,
  _prev: AdminActionState,
  form: FormData,
): Promise<AdminActionState> {
  await requireAdmin();
  const db = createServiceClient();
  if (!db) return { status: "error", message: "Servis anahtarı yapılandırılmamış." };

  const body = str(form, "body", 8000);
  if (!body) return { status: "error", message: "Yorum boş olamaz." };
  const author = str(form, "author", 120) || "admin";

  const { error } = await db.from("revision_comments").insert({
    request_id: requestId,
    author,
    body,
  });

  if (error) return { status: "error", message: error.message };
  revalidatePath(`/admin/revisions/${requestId}`);
  return { status: "saved", message: "Yorum eklendi." };
}

export async function setRevisionStatusAction(requestId: string, status: string) {
  await requireAdmin();
  const db = createServiceClient();
  if (!db) return;
  if (!["open", "in_progress", "done"].includes(status)) return;

  const { error } = await db
    .from("revision_requests")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", requestId);
  if (error) {
    console.error("[revision:setStatus] failed", error.message);
    return; // leave the page unchanged so the stale status isn't shown as saved
  }
  revalidatePath(`/admin/revisions/${requestId}`);
  revalidatePath("/admin/revisions");
}

export async function updateSiteSettingsAction(
  _prev: AdminActionState,
  form: FormData,
): Promise<AdminActionState> {
  await requireAdmin();
  const db = createServiceClient();
  if (!db) return { status: "error", message: "Servis anahtarı yapılandırılmamış." };

  const brandName = str(form, "brand_name", 120) || "Qualtron Sinclair";
  const contactEmail = str(form, "contact_email", 200);

  const { error } = await db.from("site_settings").upsert({
    key: "site",
    value: { brandName, contactEmail },
    updated_at: new Date().toISOString(),
  });

  if (error) return { status: "error", message: error.message };
  revalidatePath("/", "layout");
  return { status: "saved", message: "Kaydedildi." };
}
