This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Environment variables

The app needs Supabase credentials at runtime (auth). See `.env.example`:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

For local dev, copy `.env.example` to `.env.local` and fill in the values
(Supabase → Settings → API).

## Deploy on Vercel (automatic on every push)

This repo deploys via Vercel's Git integration: once connected, **every push is
deployed automatically** — no GitHub Actions workflow needed. One-time setup:

1. Go to [vercel.com/new](https://vercel.com/new) and import the
   `Muginukas/ConsciousEnergy` GitHub repository (Vercel auto-detects Next.js —
   no build config needed).
2. **Project Settings → Environment Variables**: add
   `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` for the
   Production, Preview, and Development environments.
3. **Project Settings → Git → Production Branch**: set it to
   `claude/consciousness-energy-vibration-map-fwwfmc` so production deploys come
   from this branch (other branches still get automatic preview deployments).
4. Trigger the first deploy by pushing to that branch (or use **Redeploy** in
   the dashboard).

After this, pushing to the production branch ships to production automatically;
pushing any other branch creates a preview URL.

Check out the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
