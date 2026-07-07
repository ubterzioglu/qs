import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Label, Rule } from "@/components/blueprint";

export default async function NotFound() {
  const t = await getTranslations("common");

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center px-6 py-24 lg:px-8">
      <div className="bp-frame border border-[var(--color-rule)] bg-[var(--color-paper)] p-8 sm:p-14">
        <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-baseline sm:justify-between">
          <Label>ERR · 404 — NOT FOUND</Label>
          <Label className="text-[var(--color-graphite)]">COORD 00.00 / 00.00</Label>
        </div>

        <div className="mt-8 flex flex-col gap-8 sm:mt-12 sm:flex-row sm:items-end sm:gap-12">
          <span
            className="bp-display text-[6rem] leading-none text-[var(--color-blueprint)] sm:text-[9rem]"
            aria-hidden="true"
          >
            404
          </span>
          <div className="max-w-md pb-1">
            <h1 className="bp-display text-3xl text-[var(--color-ink)] sm:text-4xl">
              {t("notFound")}
            </h1>
            <p className="mt-4 text-[var(--color-graphite)]">{t("notFoundHint")}</p>
          </div>
        </div>

        <Rule className="mt-10 sm:mt-14" />

        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link
            href="/"
            className="bp-label text-[var(--color-blueprint)] underline underline-offset-4"
          >
            {t("backHome")} →
          </Link>
          <Link
            href="/services"
            className="bp-label text-[var(--color-ink)] underline underline-offset-4"
          >
            {t("notFoundServices")} →
          </Link>
          <Link
            href="/contact"
            className="bp-label text-[var(--color-ink)] underline underline-offset-4"
          >
            {t("notFoundContact")} →
          </Link>
        </div>
      </div>
    </div>
  );
}
