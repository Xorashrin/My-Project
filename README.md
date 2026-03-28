# StudySprint (Next.js 14 Study App)

A production-oriented, mobile-first, PWA-enabled study platform built with:

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Zustand
- Framer Motion
- next-pwa

## Features

- Subject listing from local TypeScript data files in `/data`
- Subject detail with searchable questions
- Quiz mode + exam mode (fixed-length + countdown)
- Local progress tracking and bookmarks via persisted Zustand store
- Dark mode toggle and reset progress
- Installable PWA with offline support
- Responsive glassmorphism UI optimized for mobile / WebView

## Getting Started

```bash
npm install
npm run build
npm run start
```

For local development:

```bash
npm run dev
```

## Data model

Each subject data file exports:

```ts
{
  id: string;
  name: string;
  questions: {
    id: string;
    question: string;
    options: string[];
    answer: string;
    explanation?: string;
  }[];
}
```

Import and register new subject files in `data/index.ts`.
