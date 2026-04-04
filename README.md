# Web3 Accelerator Grant Hub - Phase 1 PoC

This is a Proof of Concept (PoC) for a Web3 Accelerator Grant Hub built with Next.js 14+, TypeScript, and Tailwind CSS.

## Features

- **Landing Page**: A professional, trust-focused intro page with a blue and white theme.
- **Grant Listings**: A browsable grid of 6 available Web3 grants with metadata.
- **Grant Details**: Dynamic detail pages for each grant with full information and application links.
- **Mobile Responsive**: Fully optimized for all screen sizes.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Data**: Static JSON (`app/data/grants.json`)

## Getting Started

First, install the dependencies:

```bash
npm install
# or
pnpm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/page.tsx`: Landing page
- `app/grants/page.tsx`: Grant listings page
- `app/grants/[id]/page.tsx`: Dynamic grant detail page
- `app/data/grants.json`: Static data source
- `components/`: Reusable UI components (Navbar, Footer, GrantCard)
- `tailwind.config.ts`: Custom theme configuration (Blue/White)

## Phase 1 Scope

This version is a static PoC and does not include:
- Authentication
- Database connections
- AI features
- Complex state management
