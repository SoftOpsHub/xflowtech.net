# XFLOW Constitution

XFLOW is a static marketing website — no backend, no server, no database.
This constitution captures the rules that keep it that way. `CLAUDE.md` is the
runtime companion; where the two overlap, this document wins.

## Core Principles

### I. Static-Only (NON-NEGOTIABLE)

The site ships as a fully static export (`next build` → `out/`). No server
runtime, auth, database, API layer, route handlers (`app/api/`), Server
Actions, middleware/proxy, or data fetching that assumes a backend. Anything
that would need a server does not belong in this repo. Dynamic-looking
behaviour is client-side only.

### II. Fixed Tech Stack

The stack is authoritative and MUST NOT be substituted: Next.js App Router +
TypeScript (strict), Tailwind CSS v4, shadcn/ui + Radix, Zustand for client
state, React Hook Form + Zod, `sonner`, `lucide-react`, Vitest + React Testing
Library, Playwright, pnpm as the only package manager. Banned — never add,
never suggest: axios, Redux/RTK/RTK Query, Jotai, Material UI, Ant Design,
Chakra, Bootstrap, styled-components, Jest, Storybook. New runtime dependencies
require justification in the PR that adds them.

### III. Component-Based Organization

Organise by what a file is, not by feature. `app/` holds routing, layout, and
metadata only and stays thin; real UI lives in `src/components/`
(`ui/` for primitives, `layout/` for shell, `<Name>.tsx` for shared).
Helpers in `src/lib/`, hooks in `src/hooks/`, stores in `src/store/`
(one file per concern), content data in `src/lib/content/`.

### IV. Server-First Components

Components are Server Components by default. `'use client'` goes only on the
leaf that needs interactivity — never on a layout or a page. Static assets live
in `public/` and are referenced by path; no external image/font/script hosts at
runtime.

### V. Quality Gates

`pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build` MUST all pass
before a change merges. `pnpm test:e2e` covers navigation, contact, and the
no-external-requests guard and MUST pass for changes that touch pages, routing,
or assets. Commits follow Conventional Commits (enforced by commitlint).

## Additional Constraints

- Import alias `@/*` maps to the repo root; paths include `src`
  (e.g. `@/src/lib/utils`).
- Third-party assets are localised into `public/assets/` via the capture
  scripts (`scripts/capture-*`) — the only code permitted to contact the
  original source origin. Built output MUST contain zero references to that
  origin or to third-party asset/font/CDN hosts.
- Exception: a page MAY embed a named third-party interactive widget (e.g. the
  Google Earth Engine maps on the GIS page) when static imagery cannot convey
  it. Such embeds are page-scoped, documented in code, and excluded from the
  no-external-requests guard.
- Spec-driven work lives in `specs/<NNN-slug>/` and follows the spec-kit flow:
  `/speckit-constitution` → `/speckit-specify` → `/speckit-plan` →
  `/speckit-tasks` → `/speckit-implement`.

## Development Workflow (NON-NEGOTIABLE)

- `main` is the trunk. Never commit or push directly to `main`.
- Branch every change off `main` (`feat/*`, `fix/*`, `chore/*`), push the
  branch, and open a Pull Request **into `main`**.
- Every PR must pass the Quality Gates (Principle V) and carry a Conventional
  Commits title before merge.

## Governance

This constitution supersedes ad-hoc practice. Amendments require a PR that
edits this file, bumps the version, and notes the rationale.

- Versioning is semantic: MAJOR = a principle removed or redefined,
  MINOR = a principle or section added, PATCH = clarification/wording.
- PR review verifies compliance; `/speckit-analyze` flags violations during
  spec-driven work. Complexity that appears to break a principle must be
  justified in the PR or removed.
- `CLAUDE.md` carries the day-to-day operational detail and must stay
  consistent with this document.

**Version**: 1.1.0 | **Ratified**: 2026-08-31 | **Last Amended**: 2026-09-02
