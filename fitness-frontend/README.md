# Fitness Frontend

Production-ready frontend for the Fitness Microservice stack using Next.js App Router, TypeScript, TailwindCSS, DaisyUI, React Query, Zustand, and NextAuth.

## Prerequisites
- Node.js 18+
- npm 9+

## Setup
```bash
npm install
cp .env.example .env.local
# generate NEXTAUTH_SECRET:
openssl rand -base64 32
npm run dev
```

## Environment Variables
Use `.env.example` as template. Keep `.env.local` uncommitted.

## Scripts
- `npm run dev`
- `npm run lint`
- `npm run type-check`
- `npm run test`
- `npm run e2e`
- `npm run build`

## Streamline Icons Licensing Log
The design document requires icon tier tracking.

- Current status: No Streamline SVG assets are currently imported.
- `public/icons/`: Reserved for approved Streamline icons.
- Before production use: add each icon name + tier (Free/Pro) here.

Example format:
- `icon-name.svg` -> Tier: `Free`
- `icon-name-pro.svg` -> Tier: `Pro`
