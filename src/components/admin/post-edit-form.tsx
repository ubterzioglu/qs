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
      <AdminField name="title_en" label="Title (EN)" defaultValue={post.title.en} required />
      <AdminField name="title_tr" label="Title (TR)" defaultValue={post.title.tr} />
      <AdminTextArea name="excerpt_en" label="Excerpt (EN)" defaultValue={post.excerpt.en} rows={3} />
      <AdminTextArea name="excerpt_tr" label="Excerpt (TR)" defaultValue={post.excerpt.tr} rows={3} />
      <AdminTextArea name="body_en" label="Body (EN, markdown)" defaultValue={post.body.en} rows={16} />
      <AdminTextArea name="body_tr" label="Body (TR, markdown)" defaultValue={post.body.tr} rows={16} />
      <AdminField name="author" label="Author" defaultValue={post.author} />
      <AdminField name="cover" label="Cover path (/media/…)" defaultValue={post.cover ?? ""} />
      <AdminSelect
        name="status"
        label="Status"
        defaultValue={post.status}
        options={[
          { value: "published", label: "Published" },
          { value: "draft", label: "Draft (hidden from site)" },
        ]}
      />
      <AdminField name="read_time" label="Read time (minutes)" defaultValue={String(post.readTimeMinutes)} />
      <div className="flex items-center gap-4 lg:col-span-2">
        <AdminSubmit />
        <AdminResult state={state} />
      </div>
    </form>
  );
}
