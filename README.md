# Reel House

A movie discovery app built with Next.js App Router, React, TypeScript, Tailwind CSS, and Framer Motion. Cinematic dark theme, fully mobile responsive, and built for top Lighthouse SEO/performance scores.

## Features

- **Next.js 14 App Router** — server components by default, streaming, `generateStaticParams` for popular titles and genres
- **Full SEO**: per-page `generateMetadata`, Open Graph + Twitter cards, canonical URLs, dynamic `sitemap.xml` and `robots.txt`, JSON-LD (`WebSite` + `Movie` schema with `AggregateRating`)
- **Performance**: `next/image` with AVIF/WebP, `priority` on above-the-fold posters, route-level skeleton loading states, minimal client JS (only interactive components are `"use client"`)
- **Modern UI**: cinematic "marquee" theme (charcoal stage, velvet-crimson accent, brass-gold highlight), Bebas Neue display type paired with Inter body type
- **Animation**: Framer Motion page/section reveals, hover micro-interactions on posters, animated nav underline and mobile menu, `prefers-reduced-motion` respected
- **Fully responsive**: 2-column grid on mobile up to 5-column on desktop, responsive hero and detail layouts
- **Accessible**: skip link, visible focus rings, semantic landmarks, alt text on every image

## Pages

| Route | Description |
|---|---|
| `/` | Hero + trending, popular, top-rated, upcoming sections |
| `/top-rated` | Full top-rated grid |
| `/upcoming` | Full upcoming grid |
| `/genres` | All genres |
| `/genre/[id]` | Movies filtered by genre |
| `/movie/[id]` | Full detail page: poster, backdrop, cast, trailer link, JSON-LD |
| `/search?q=` | Live search results |

## Setup

```bash
npm install
cp .env.local.example .env.local
```

Add a free TMDB API key to `.env.local`:

```
TMDB_API_KEY=your_key_here
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Get a key at https://www.themoviedb.org/settings/api (free, instant).

**No key yet?** The app still runs — every data function falls back to built-in sample movies so you can see the full UI immediately. Add a real key any time to switch to live data automatically.

```bash
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
npm run start
```

## Tech stack

- Next.js 14 (App Router)
- React 18 + TypeScript
- Tailwind CSS
- Framer Motion
- lucide-react icons
