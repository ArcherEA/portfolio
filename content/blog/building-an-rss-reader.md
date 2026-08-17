---
title: Building a Self-Hosted RSS Reader on Supabase
date: 2026-08-10
excerpt: I wanted my own RSS reader that fetches feeds on a schedule without a server I have to babysit. Here's how Supabase — Postgres, Row Level Security, pg_cron, and Edge Functions — did the whole backend.
category: backend
---

I missed Google Reader. So I built my own: a clean, three-pane RSS reader where feeds refresh themselves in the background. The interesting part isn't the UI — it's that there's **no traditional backend server**. Supabase does all of it.

## The architecture in one breath

```
pg_cron (every 30 min) → refresh-feeds Edge Function (Deno)
    → fetch & parse any RSS/Atom feed → upsert into Postgres
React web app ← supabase-js (auth + Row Level Security) ← Postgres
```

There's no Express app, no long-running Node process. A **Postgres cron job** wakes up every 30 minutes and calls a **Deno Edge Function** that fetches and parses feeds and upserts the articles. The React app reads straight from Postgres through `supabase-js`.

## Feeds are just URLs

I stored feeds as **full URLs**, which means any RSS 2.0, RSS 1.0, or Atom feed works out of the box. [RSSHub](https://docs.rsshub.app/) is wired in as a *convenience* for sites that don't publish feeds (a leading `/` route resolves against an RSSHub base URL), but it's optional — plain `https://…/feed.xml` needs nothing extra. Keeping RSSHub a convenience rather than a dependency was a deliberate call: the app doesn't fall over if RSSHub is down.

## Security lives in the database

This is the part I like most. With Supabase, authorization is enforced by **Row Level Security** policies in Postgres, not middleware I could forget to apply:

- `feeds` and `articles` are **global** — any signed-in user can read them, but only the service-role Edge Function can write them. No point re-fetching the same feed once per user.
- `subscriptions` and `article_states` (read / starred) are **per-user**, with owner-only policies. Even if someone crafts a raw query, the database only returns *their* rows.

The dedup story is equally boring-in-a-good-way: articles upsert on `(feed_id, guid)` with duplicates ignored, so a re-run never clobbers read state or creates doubles. Fetch errors get written to `feeds.last_error` and surface as a red `!` in the sidebar, then clear on the next success.

## Monorepo, with one eye on the future

It's a **pnpm monorepo**: `apps/web` (React + Vite + Tailwind + TanStack Query), a shared `packages/shared` for DB types and the Supabase client factory, and an empty `apps/desktop` reserved for an Electron build that will reuse the same components and shared package. TanStack Query handles all the server-state caching, so the UI stays snappy and I never hand-wrote a loading spinner state machine.

## What I learned

- **Push logic into Postgres when you can.** RLS + pg_cron replaced an entire auth layer and a job scheduler I'd otherwise have written and hosted.
- **Model shared vs per-user data explicitly.** Global feeds + per-user state is what makes the whole thing cheap to run.
- **"Optional dependency" is a feature.** Making RSSHub non-load-bearing kept the core simple and resilient.

It only refreshes while my machine is on for now, which is fine for personal use — moving the Supabase stack to a VPS makes it always-on. Code's on [GitHub](https://github.com/ArcherEA/RSS).
