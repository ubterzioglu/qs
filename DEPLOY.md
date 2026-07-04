# Deploying to Coolify

This app ships a production **Dockerfile** (Next.js standalone output) plus a
`docker-compose.yaml` and a `/api/health` healthcheck. Coolify can deploy it either way.

## Recommended: Dockerfile build pack

1. **Coolify → New Resource → Application → Public/Private Git Repository.**
   - Repository: `https://github.com/ubterzioglu/qs`
   - Branch: `main`
2. **Build Pack:** select **Dockerfile** (Coolify auto-detects the `Dockerfile` at the repo root).
3. **Port:** set the exposed port to **3000**.
4. **Health check path:** `/api/health` (HTTP 200 = healthy).
5. **Domain:** add your domain (e.g. `qualtronsinclair.com`). Coolify provisions HTTPS via Let's Encrypt automatically.
6. **Environment variables:** see the table below.
7. **Deploy.** Coolify builds the image, runs the container, and routes your domain to port 3000.

> Alternative: choose the **Docker Compose** build pack instead — Coolify will use
> `docker-compose.yaml` in the repo. Same env vars apply.

## Environment variables

There are two kinds. Coolify lets you mark a variable as **Build Variable** (available
at image build) vs a plain **runtime** variable.

| Variable | Type | Required | Notes |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | **Build** + runtime | yes | Your public URL, e.g. `https://qualtronsinclair.com`. Used for canonical/OG/sitemap. |
| `NEXT_PUBLIC_SUPABASE_URL` | **Build** + runtime | no* | Enables the DB-backed CMS + form persistence. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | **Build** + runtime | no* | Public anon key. |
| `SUPABASE_SERVICE_ROLE_KEY` | runtime only | no* | **Server-only secret** — never mark as build/public. Used by seed + admin. |
| `ADMIN_EMAILS` | runtime only | no | Comma-separated allowlist for `/admin`. |
| `MAINTENANCE_MODE` | runtime only | no | `1`/`true`/`on` → premium "yenileniyoruz" takeover. Empty → full site. |

\* The site runs **without** Supabase (static seed content; forms accept-and-log). Add
the Supabase vars when you're ready to enable the CMS and persist submissions.

### Important: `NEXT_PUBLIC_*` are baked at build time

Because `NEXT_PUBLIC_*` values are inlined into the client bundle during `next build`,
they must be present as **Build Variables** in Coolify — setting them only at runtime is
not enough. After changing any `NEXT_PUBLIC_*` value, **redeploy** so the bundle rebuilds.

`SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_EMAILS`, and `MAINTENANCE_MODE` are read at runtime,
so changing those only needs a container **restart/redeploy** (no rebuild required).

## Toggling maintenance mode in production

1. Coolify → your app → **Environment Variables** → set `MAINTENANCE_MODE=1`.
2. Redeploy (or restart). All public visitors now see `/maintenance`; `/admin` still works.
3. To go live, set `MAINTENANCE_MODE=` (empty) and redeploy.

## Build notes

- **pnpm is pinned** to `10.28.1` via `packageManager` in `package.json`, so Coolify's
  corepack uses the exact version the lockfile was made with (a newer pnpm would ignore
  the `pnpm.onlyBuiltDependencies` field and fail the install). Don't remove this pin.
- All native packages with install scripts (`sharp`, `esbuild`, `@swc/core`,
  `@parcel/watcher`, `unrs-resolver`) are allow-listed in `pnpm.onlyBuiltDependencies`,
  so `pnpm install --frozen-lockfile` won't fail with `ERR_PNPM_IGNORED_BUILDS`.

## Media / disk

Site imagery lives in `public/media/` and is baked into the image (no volume needed).
Original high-res source files under `ref/Site Files/` are **not** shipped (excluded via
`.dockerignore`) — they stay in git-ignored local reference only.

## Local verification (optional)

```bash
# Build and run exactly what Coolify will run:
docker build -t qs .
docker run --rm -p 3000:3000 -e NEXT_PUBLIC_SITE_URL=http://localhost:3000 qs
# then: curl http://localhost:3000/api/health  ->  {"status":"ok",...}

# Or via compose:
docker compose up --build
```

## Post-deploy checklist

- [ ] `https://<domain>/api/health` returns `{"status":"ok"}`
- [ ] `/` (EN) and `/tr` render
- [ ] Old-slug redirects work (e.g. `/blog` → `/insights`)
- [ ] `MAINTENANCE_MODE=1` shows the takeover, then unset to go live
- [ ] Once Supabase keys are added: run the seed + confirm `/admin` login
