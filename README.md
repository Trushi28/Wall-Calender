# Wall Calendar

A wall calendar UI built with Next.js. Think of those physical calendars with a nice photo on top — but interactive.

## What's in here

- Calendar grid with date range selection (click start, click end)
- Notes that save to IndexedDB so they stick around
- Sidebar widgets — clock, pomodoro timer, mood tracker, weather, quotes, etc.
- Dark/light mode with a smooth transition
- Indian holidays marked on the calendar
- Works on mobile too

## Tech

- Next.js 16 with App Router
- TypeScript
- Tailwind CSS
- Framer Motion for animations
- Dexie.js for IndexedDB
- date-fns for dates

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:3000

For production:
```bash
npm run build
npm start
```

## Project layout

```
src/
  app/           - page.tsx and globals.css
  components/
    Calendar/    - the main calendar stuff
    Widgets/     - sidebar widgets
    UI/          - shared components
  hooks/         - useCalendar, useNotes, useTheme, etc
  lib/           - utilities, db setup, holidays list
```

## Why these choices?

**Cream colors instead of pure white** — easier on the eyes, feels more like paper.

**IndexedDB for notes** — localStorage works but IndexedDB handles larger data better and doesn't block the thread.

**Framer Motion** — spring animations feel nicer than CSS ease-in-out. Also makes exit animations way easier.

**No backend** — this is a frontend showcase. Everything saves locally.
