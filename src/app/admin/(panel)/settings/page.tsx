import { requireAdmin } from "@/lib/admin/auth";
import { createServiceClient } from "@/lib/supabase/server";
import { SettingsForm } from "@/components/admin/settings-form";

export default async function AdminSettingsPage() {
  await requireAdmin();

  const db = createServiceClient();
  let brandName = "Qualtron Sinclair";
  let contactEmail = "contact@qualtronsinclair.com";
  let locations: { city: string; address: string; phone: string }[] = [];

  if (db) {
    const [settings, locs] = await Promise.all([
      db.from("site_settings").select("value").eq("key", "site").maybeSingle(),
      db.from("locations").select("city,address,phone").order("ord"),
    ]);
    const v = settings.data?.value as { brandName?: string; contactEmail?: string } | undefined;
    if (v?.brandName) brandName = v.brandName;
    if (v?.contactEmail) contactEmail = v.contactEmail;
    locations = locs.data ?? [];
  }

  return (
    <div>
      <p className="qs-label">Yapılandırma</p>
      <h1 className="qs-display mt-2 text-3xl text-[var(--color-cream)]">Site ayarları</h1>

      <SettingsForm brandName={brandName} contactEmail={contactEmail} />

      <h2 className="qs-label mt-12">Ofisler (salt okunur)</h2>
      <ul className="mt-3 space-y-2">
        {locations.map((l) => (
          <li key={l.city} className="text-sm text-[var(--color-mist)]">
            <span className="text-[var(--color-cream)]">{l.city}</span> — {l.address} · {l.phone}
          </li>
        ))}
      </ul>
      <p className="mt-6 text-xs text-[var(--color-slate)]">
        Ofis adresleri veritabanında (locations tablosu) yönetilir; gerektiğinde bir
        düzenleme arayüzü eklenebilir.
      </p>
    </div>
  );
}
