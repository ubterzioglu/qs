# syntax=docker/dockerfile:1

# ---- Base: pnpm on Node 22 (alpine) ----
FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm" PATH="/pnpm:$PATH"
RUN corepack enable
# libc6-compat: sharp/next native deps on alpine
RUN apk add --no-cache libc6-compat
WORKDIR /app

# ---- Deps: install with a cached pnpm store ----
FROM base AS deps
# package.json pins `packageManager: pnpm@10.28.1`, so corepack uses that exact
# version (the host's Coolify otherwise defaults to a newer pnpm). All packages with
# build scripts are allow-listed in pnpm.onlyBuiltDependencies, so a frozen-lockfile
# install won't fail on ERR_PNPM_IGNORED_BUILDS.
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

# ---- Builder: compile the standalone server ----
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Skip Next telemetry in CI/build.
ENV NEXT_TELEMETRY_DISABLED=1
# NEXT_PUBLIC_* are inlined at build time. Provide them as build args if set;
# server-only vars (SUPABASE_SERVICE_ROLE_KEY, MAINTENANCE_MODE, ADMIN_EMAILS)
# are read at runtime and passed via the container environment instead.
# NOTE: when an arg is not passed, these ENVs become empty STRINGS (not unset).
# src/lib/env.ts treats empty/whitespace values as absent and validates the site
# URL, so `new URL(siteUrl)` for metadataBase never throws during prerender.
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL \
    NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY \
    NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
RUN pnpm build

# ---- Runner: minimal runtime image ----
FROM base AS runner
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1
# Run as an unprivileged user.
RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

# Standalone server + static assets + public dir (media, robots, etc.)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000
ENV PORT=3000 HOSTNAME=0.0.0.0

# server.js is produced by Next's standalone output.
CMD ["node", "server.js"]
