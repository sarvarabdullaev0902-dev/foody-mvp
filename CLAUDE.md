# Foody Moody — Claude Code conventions

This file is loaded automatically by Claude Code at the start of each session.
It encodes project-specific conventions that should persist across sessions.

## What this is

Foody Moody is a marketplace for near-expiry discounted food in Uzbekistan, connecting consumers with restaurants, supermarkets, bakeries, and other food businesses at 30–70% discounts. Central Asia's first food rescue platform.

Bilingual: Uzbek (Latin script) + Russian. English is a third locale for international visibility.

## Stack

Next.js 14 (App Router), TypeScript, Tailwind CSS, Supabase, Leaflet/OpenStreetMap, Framer Motion, next-intl. Deployed on Vercel at foody-mvp.vercel.app.

## Workflow conventions

### Push policy
- Visual / styling / copy / i18n / Tailwind changes: commit and push after diff approval
- API routes / Supabase queries / auth / env vars / build config / package.json: commit locally only, wait for explicit "push" from the user
- When uncertain which category a change falls into, ask before pushing

### Git
- Remote uses SSH: git@github.com:sarvarabdullaev0902-dev/foody-mvp.git
- Do not modify the remote URL
- Do not suggest switching to HTTPS or embedding tokens

### Code conventions
- Use next-intl for all user-facing text — no hardcoded strings in components
- Mobile-first responsive design
- Use the Supabase client from lib/supabase.ts (do not instantiate new clients)
- All prices in UZS (Uzbek Som)
- Time format: 24-hour

### i18n
- Translation files: src/messages/{en,uz,ru}.json
- Existing convention: flat snake_case keys (e.g. hero_line1, hero_badge_today)
- For new nested groups, sub-objects under a namespace are acceptable (e.g. hero.bagAlt)
- Uzbek uses Latin script, not Cyrillic
- When adding a new translation key, add it to all three locale files in the same commit

### Images
- Use next/image, not plain <img> tags
- Hero and above-fold images need the priority prop
- Always include a sizes attribute matching responsive breakpoints
- Source images live in /public

### Breakpoints
- md: 768px (tablet)
- lg: 1024px (desktop) — primary desktop breakpoint
- xl: not used in this codebase

### Domain model
Supplier categories: restaurant, bakery, supermarket, pharmacy, cafe, convenience_store, other.