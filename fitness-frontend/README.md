# fitness-frontend

Interactive Next.js frontend scaffold for the Fitness Microservice, implemented from `FRONTEND_DESIGN.md` and `SETUP_GUIDE.md`.

## Implemented
- Landing page with hero and feature highlights
- Auth pages: `/auth/login` and `/auth/register`
- Dashboard page: `/dashboard` with
  - Stats cards
  - Weekly activity chart (interactive bars)
  - Activity tracker form + recent logs table
  - Recommendation filter panel
  - Profile and settings cards
- DaisyUI fitness theme + theme switcher
- Tailwind/TypeScript/Next.js app structure
- Environment variables from setup guide

## Run
1. Install dependencies
```bash
npm install
```
2. Start dev server
```bash
npm run dev
```

> Note: dependency install requires internet access to npm registry.
