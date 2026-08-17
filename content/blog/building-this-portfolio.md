---
title: Building an Anime-Themed Portfolio with Next.js 16
date: 2026-08-16
excerpt: How I built this RPG-styled portfolio — scroll-snap sections, a light/dark theme that survives reloads, and an AI character assistant running on a secured Server Action.
category: dev
---

I wanted my portfolio to feel less like a résumé and more like the character-select screen of a game. This post walks through the pieces that made that work, and the small problems I hit along the way.

## The single-page slider

Every section is a full-screen "slide". Instead of reaching for a JavaScript carousel, I used native **CSS scroll snap** on a scroll container:

```tsx
<main className="h-full w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar">
  <Home />
  <Skills />
  <Projects />
  <Contact />
</main>
```

Each section is `h-screen snap-start`. The browser does the physics; I only had to keep the container height honest on mobile (where the address bar resizes the viewport).

## Remembering where you were

A slider is annoying if a reload dumps you back at the top. I persist the active section in `sessionStorage` via a small scroll-spy, and restore it before paint:

1. Scroll-spy watches which `<section>` is in view and writes its id to `sessionStorage`.
2. On load, I check the URL hash first, then the saved section, then fall back to the top.

The theme is handled the same way — read from `localStorage` in a `useLayoutEffect` so there's no flash of the wrong colors before hydration.

## Aiko, the AI assistant

The fun part is **Aiko**, an anime-styled guide powered by Google Gemini. Her entire personality and knowledge base are generated from a single data file, so updating my experience or skills also updates what she knows.

The key lesson: a chat endpoint is a public door. The call runs through a Next.js **Server Action**, which means anyone can script it. So it's guarded with input length caps, trimmed history, and per-IP rate limiting before a single token is spent:

```ts
if (isRateLimited(ip)) {
  return "Whoa, slow down Senpai! Try again in a minute.";
}
```

Without that, a bored visitor with a `for` loop is a surprise line item on your API bill.

## What I'd tell past me

- **Reach for the platform first.** Scroll snap and `localStorage` did what I'd have reached for a library to do a year ago.
- **Treat every Server Action as untrusted input.** It's an API route wearing a friendly costume.
- **Keep content in data, not markup.** One file drives the whole site *and* the AI — no hunting through components to fix a typo.

More posts on specific projects coming soon. Thanks for reading!
