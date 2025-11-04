# Plant Detection App

A Next.js (TypeScript + Tailwind) app for plant disease detection, plant chat, seasonal care, and more.

## Prerequisites
- Node.js 18 or newer (recommended LTS)
- npm 9+ (comes with Node)
- Git
- An OpenAI API key

## 1) Clone the repo
```bash
git clone <your-repo-url> plant-detection
cd plant-detection
```

If you already have the project locally, just `cd` into the folder:
```bash
cd C:\Users\HP\Downloads\plant\plant-detection
```

## 2) Configure environment variables
Create a file named `.env.local` in the project root with your key:
```bash
OPENAI_API_KEY=sk-...your_key_here...
```
Note: `.env.local` is ignored by git by default and is used by Next.js at runtime.

## 3) Install dependencies
Use npm (with legacy peer deps to avoid peer conflicts):
```bash
npm install --legacy-peer-deps
```

## 4) Run the app (development)
```bash
npm run dev
```
- Local dev URL: `http://localhost:3000` (if 3000 is busy, Next.js will use 3001)

Quick checks:
- Health/test endpoint: `http://localhost:3000/api/test-openai-connection`
- Detect page: `http://localhost:3000/detect`
- Disease guide: `http://localhost:3000/disease-guide`

## 5) Build and run (production)
```bash
npm run build
npm run start
```
- Default URL: `http://localhost:3000`

## Deploying (Vercel recommended)
1. Push this folder to a Git repository (GitHub/GitLab/Bitbucket).
2. Import the repo at `https://vercel.com`.
3. Set Environment Variable `OPENAI_API_KEY` in Vercel Project Settings.
4. Deploy. You’ll receive a live URL.

## Troubleshooting
- Port in use: If port 3000 is occupied, Next.js will switch to 3001 automatically. Open the printed URL.
- Missing API key: If the endpoint returns `OpenAI API key is missing`, re-check `.env.local` and restart the dev server.
- Clean cache (rare): Delete the `.next` folder and restart `npm run dev` if you see webpack cache errors.

## Tech Stack
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Radix UI / Shadcn components


