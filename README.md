# Yukuan Hao — Anime-Themed Developer Portfolio

A high-energy, anime/RPG-styled personal portfolio built with **Next.js 16** and **React 19**. Features RPG-style stat panels, manga-panel layouts, a scroll-snap section slider, light/dark themes, and **Aiko** — an AI character assistant powered by Google Gemini.

🔗 **Live:** https://portfolio-web-gamma.vercel.app

## Tech Stack

- **Framework:** Next.js 16 (App Router, Server Actions)
- **UI:** React 19, Tailwind CSS 4, lucide-react icons
- **AI:** Google Gemini (`@google/genai`, `gemini-2.5-flash`) via a Server Action
- **Analytics:** Vercel Speed Insights
- **Deploy:** Vercel

## Getting Started

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

The AI assistant needs a Gemini API key. Create a `.env.local` file:

```bash
GEMINI_API_KEY=your_google_gemini_api_key
```

Get a key from [Google AI Studio](https://aistudio.google.com/app/apikey). The chat still degrades gracefully (shows an error message) if the key is missing.

## Project Structure

```
app/
  layout.tsx            Root layout, fonts, SEO metadata
  page.tsx              Entry — renders the Portfolio app
  opengraph-image.tsx   Generated 1200x630 social card
  sitemap.ts / robots.ts
  globals.css
components/
  Portfolio.tsx         Main shell: nav, theme, scroll-spy, section slider
  Home.tsx, Skills.tsx, Projects.tsx, Contact.tsx
  features/ChatAssistant.tsx   Aiko chat UI
  features/Typewriter.tsx
  ui/MangaCard.tsx
lib/
  personal_data.ts      ← EDIT THIS: your info, experience, projects, skills
  constants.ts          Derived content + Gemini system prompt
  gemini.ts             Gemini Server Action (with rate limiting)
  types.ts
```

## Customizing

Almost all content lives in [`lib/personal_data.ts`](lib/personal_data.ts) — name, contact, work experience, projects, and skills (rated on a **1–5** scale). Update that file and the site, plus Aiko's knowledge, update automatically.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Deploy

Deploy on [Vercel](https://vercel.com/new). Set the `GEMINI_API_KEY` environment variable in the project settings. Server Actions and image optimization work out of the box.

## License

See [LICENSE](LICENSE).
