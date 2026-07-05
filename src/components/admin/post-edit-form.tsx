"use client";

import { useActionState } from "react";
import { updateBlogPostAction, type AdminActionState } from "@/app/admin/actions";
import { AdminField, AdminTextArea, AdminSelect, AdminSubmit, AdminResult } from "./editor-kit";

const initial: AdminActionState = { status: "idle" };

export interface PostFormData {
  slug: string;
  status: string;
  title: { en?: string; tr?: string };
  excerpt: { en?: string; tr?: string };
  body: { en?: string; tr?: string };
  author: string;
  cover?: string | null;
  readTimeMinutes: number;
}

export function PostEditForm({ post }: { post: PostFormData }) {
  const [state, action] = useActionState(
    updateBlogPostAction.bind(null, post.slug),
    initial,
  );

  return (
    <form action={action} className="mt-8 grid gap-6 lg:grid-cols-2">
      <AdminField name="title_en" label="Başlık (EN)" defaultValue={post.title.en} required />
      <AdminField name="title_tr" label="Başlık (TR)" defaultValue={post.title.tr} />
      <AdminTextArea name="excerpt_en" label="Özet (EN)" defaultValue={post.excerpt.en} rows={3} />
      <AdminTextArea name="excerpt_tr" label="Özet (TR)" defaultValue={post.excerpt.tr} rows={3} />
      <AdminTextArea name="body_en" label="İçerik (EN, markdown)" defaultValue={post.body.en} rows={16} />
      <AdminTextArea name="body_tr" label="İçerik (TR, markdown)" defaultValue={post.body.tr} rows={16} />
      <AdminField name="author" label="Yazar" defaultValue={post.author} />
      <AdminField name="cover" label="Kapak yolu (/media/…)" defaultValue={post.cover ?? ""} />
      <AdminSelect
        name="status"
        label="Durum"
        defaultValue={post.status}
        options={[
          { value: "published", label: "Yayında" },
          { value: "draft", label: "Taslak (sitede gizli)" },
        ]}
      />
      <AdminField name="read_time" label="Okuma süresi (dakika)" defaultValue={String(post.readTimeMinutes)} />
      <div className="flex items-center gap-4 lg:col-span-2">
        <AdminSubmit />
        <AdminResult state={state} />
      </div>
    </form>
  );
}
