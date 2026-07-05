import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Label } from "./blueprint";
import { getSiteSettings } from "@/content";

export async function SiteFooter() {
  const f = await getTranslations("footer");
  const n = await getTranslations("nav");
  const c = await getTranslations("contact");
  const settings = await getSiteSettings();
  const year = 2025;

  return (
    <footer className="border-t border-[var(--color-ink)] bg-[var(--color-paper-2)]">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="bp-display text-2xl text-[var(--color-ink)]">{f("buildLine")}</p>
            <Link
              href="/contact"
              className="mt-4 inline-block bp-label text-[var(--color-blueprint)] underline underline-offset-4"
            >
              {n("contact")} →
            </Link>
          </div>

          <div>
            <Label>{c("offices")}</Label>
            <ul className="mt-4 space-y-3">
              {settings.locations.map((loc) => (
                <li key={loc.city} className="text-sm text-[var(--color-graphite)]">
                  <span className="text-[var(--color-ink)]">{loc.city}</span>
                  <br />
                  {loc.address}
                </li>
              ))}
              <li className="text-sm text-[var(--color-graphite)]">
                <span className="text-[var(--color-ink)]">Delaware</span>
                <br />
                United States
              </li>
            </ul>
          </div>

          <div>
            <Label>{f("legal")}</Label>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/impressum" className="text-[var(--color-graphite)] hover:text-[var(--color-ink)]">
                  {f("impressum")}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-[var(--color-graphite)] hover:text-[var(--color-ink)]">
                  {f("privacy")}
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-[var(--color-graphite)] hover:text-[var(--color-ink)]">
                  {f("cookies")}
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${settings.contactEmail}`}
                  className="text-[var(--color-graphite)] hover:text-[var(--color-ink)]"
                >
                  {settings.contactEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-2 border-t border-[var(--color-rule)] pt-6 sm:flex-row">
          <p className="bp-label">{f("locations")}</p>
          <p className="bp-label">{f("rights", { year })}</p>
        </div>
      </div>
    </footer>
  );
}
