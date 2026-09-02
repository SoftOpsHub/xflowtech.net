# XFLOW

A research repo for XFLOW frontend work: a **static website with no backend**,
built and shipped as a fully static export. There is no server, no auth, no API
layer, no database. Anything that would need a backend does not belong here.

## Tech stack (authoritative — do not substitute)

- Next.js 16 App Router + TypeScript strict. `output: 'export'` — `next build`
  emits a static `out/` directory. React Compiler stable.
- Package manager: **pnpm**. Never npm or yarn.
- Styling: Tailwind CSS v4. UI: shadcn/ui + Radix primitives copied into
  `src/components/ui/`.
- Client state: **Zustand** (`src/store/`). No Provider needed.
- Forms: React Hook Form + Zod.
- Toasts: `sonner`. Error boundaries: `react-error-boundary` + Next `error.tsx`.
- Icons: `lucide-react`.
- Testing: Vitest + React Testing Library (`src/test/`), Playwright for e2e.
- Quality: ESLint, Prettier, Husky, lint-staged, commitlint (conventional commits).
- Import alias: `@/*` maps to the repo root — paths include `src`, e.g.
  `@/src/lib/utils`, `@/src/components/ui/button`.

### Banned — never introduce, never suggest, flag if seen

axios, Redux / RTK / RTK Query, Jotai, Material UI, Ant Design, Chakra,
Bootstrap, styled-components, Jest, Storybook. No server-only code, Server
Actions, route handlers (`app/api/`), `proxy.ts`/middleware, or data fetching
that assumes a backend — this is a static site.

## Architecture — component-based (not feature-based)

Organise by **what a file is**, not by feature:

```
app/                  Next.js routing only — thin pages/layouts
src/
  components/
    ui/               shadcn/Radix primitives
    layout/           Container, Header, Footer, …
    <Name>.tsx        shared app components
  hooks/              reusable hooks
  lib/                pure helpers — utils.ts holds cn()
  store/              Zustand stores, one file per concern
  test/               setup.ts, render.tsx
```

- Default to Server Components. Put `'use client'` only on the leaf that needs
  interactivity, never on a layout or page.
- Keep `app/` files thin — layout/routing/metadata only. Real UI lives in
  `src/components/`.
- Static assets go in `public/` and are referenced by path.

## Commands

```
pnpm dev · pnpm build · pnpm test · pnpm test:e2e · pnpm lint · pnpm typecheck
```

`pnpm build` produces the deployable static site in `out/`.

## Spec-driven development (spec-kit)

This repo uses [spec-kit](https://github.com/github/spec-kit). Config, templates,
scripts, and the project constitution live in `.specify/`; the workflow skills
are in `.claude/skills/speckit-*`. Per-feature specs land in `specs/<NNN-slug>/`.

Flow: `/speckit-constitution` → `/speckit-specify` → `/speckit-plan` →
`/speckit-tasks` → `/speckit-implement`. Optional: `/speckit-clarify` (before
plan), `/speckit-analyze` and `/speckit-checklist` (before implement).

The constitution (`.specify/memory/constitution.md`) is still the unfilled
template — run `/speckit-constitution` to populate it.
