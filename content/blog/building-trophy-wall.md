---
title: Trophy Wall — Turning Steam Achievements into a Visual Wall
date: 2026-08-15
excerpt: A full-stack app that pulls my Steam library and achievements and renders them as a trophy wall. Notes on a layered Express backend, background sync with BullMQ, and why the "boring" architecture paid off.
category: full-stack
---

I have hundreds of Steam games and thousands of achievements sitting in Valve's database, invisible. **Trophy Wall** is my attempt to pull all of that out and turn it into something I'd actually want to look at — a wall of games with playtime bars, completion percentages, and a rarity glow on the achievements almost nobody unlocks.

Here's how it's built and what I learned.

## The shape of the thing

- **Frontend:** React 19 + TypeScript + Tailwind, built with Vite.
- **Backend:** Node + Express 5 + TypeScript, talking to the **Steam Web API**.
- **Data:** PostgreSQL via Prisma, with Redis for background jobs.

The core flow is simple to describe and full of sharp edges to implement: *link a Steam account → sync → display*.

## Layered backend, on purpose

Express doesn't tell you how to organize anything, so I imposed a **layered architecture** by hand:

```
routes → controllers → services → (integrations + lib)
```

- **Routes** only map a URL to a controller.
- **Controllers** only touch `req`/`res`.
- **Services** hold the actual business logic and never see HTTP.
- **Integrations** wrap the Steam API into typed functions that know nothing about my database.

This felt like over-engineering for a personal project — right up until I moved the sync off the HTTP request. Because the sync logic lived in a plain `syncAccount(id)` service with no `req`/`res` attached, I could call it from a **BullMQ background worker** without changing a line of it. That's the whole payoff of the split: the same function runs from an endpoint *and* a job queue.

## The sync problem

A big Steam library is **1,000+ API calls** — owned games, then a schema and achievement list per game. Doing that inside an HTTP request means a request that hangs for a minute and hammers Steam's rate limits.

Two decisions fixed it:

1. **Separate catalog data from user data.** Game and achievement *definitions* are the same for everyone, so they're fetched once and cached in their own tables. Only *your* playtime and unlock state is fetched every sync. That cache boundary is the main rate-limit defense.
2. **Move sync to a queue.** `POST /sync/steam` enqueues a job and returns instantly; a worker drains it with bounded concurrency (via `bottleneck`) and retries.

## Testing where the bugs actually were

I didn't chase 100% coverage. I wrote tests where I'd *already been burned*: the Steam client's URL building and response parsing — my number-one bug source — plus the pure transforms like rarity tiers and completion math. Pulling that logic out of components into plain functions (`rarity.ts`, `stats.ts`, `game-filter.ts`) made it testable without mocking React at all. GitHub Actions runs the lot on every PR.

## What I'd tell past me

- **Boring architecture buys you options.** The controller/service split looked like ceremony until it let me add a job queue for free.
- **Find the caching boundary early.** "Shared vs per-user" was the single most important data-modeling call in the project.
- **Test your assumptions about other people's APIs.** Every real bug came from what Steam actually returned, not from my own logic.

Code's on [GitHub](https://github.com/ArcherEA/TrophyWall). Next up: HoYoverse character showcases and rarity-based glow styling.
