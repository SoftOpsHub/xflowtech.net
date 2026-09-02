# XFLOW

Research repo for XFLOW frontend work — a static website with no backend,
built with Next.js 16 (App Router, static export), TypeScript strict, and pnpm.
See [`CLAUDE.md`](CLAUDE.md) for the full tech stack, architecture, and
conventions.

## Prerequisites

- Node.js (current LTS)
- [pnpm](https://pnpm.io) — this project never uses npm or yarn

## Setup

```bash
pnpm install
```

## Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
pnpm build
```

Produces a fully static site in `out/`, deployable to any static host.

## Common commands

```bash
pnpm dev        # start the dev server
pnpm build      # static production build → out/
pnpm test       # unit + component tests (Vitest + React Testing Library)
pnpm test:e2e   # Playwright end-to-end tests
pnpm lint       # ESLint
pnpm typecheck  # tsc --noEmit
```

## Architecture

Component-based: files are organised by what they are, not by feature.

```
app/              Next.js routing only
src/components/   ui/ (shadcn/Radix), layout/, shared components
src/hooks/        reusable hooks
src/lib/          pure helpers (utils.ts → cn())
src/store/        Zustand stores
```
