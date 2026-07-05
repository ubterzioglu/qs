import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Label } from "@/components/blueprint";

export default async function NotFound() {
  const t = await getTranslations("common");
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-6xl flex-col items-start justify-center px-6 lg:px-8">
      <Label>ERR 404</Label>
      <h1 className="bp-display mt-4 text-5xl text-[var(--color-ink)]">{t("notFound")}</h1>
      <Link
        href="/"
        className="mt-8 bp-label text-[var(--color-blueprint)] underline underline-offset-4"
      >
        {t("backHome")} →
      </Link>
    </div>
  );
}
