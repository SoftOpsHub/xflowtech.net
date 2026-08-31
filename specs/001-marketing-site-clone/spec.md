# Feature Specification: xFlow Tech Marketing Site Clone

**Feature Branch**: `001-marketing-site-clone`

**Created**: 2026-08-31

**Status**: Draft

**Input**: User description: "https://xflowresearch.com/ clone this exact same ditto website and also scrape data and images and logo from this asset and use them as static assets"

## Overview

Rebuild the public xFlow Tech marketing website (`xflowresearch.com`) as a self-contained
static site. The rebuilt site must look and read the same as the current live site, page for
page, and must serve every image, logo, and other media from within this project rather than
from the original domain or any third-party host.

The current live site is a purely informational marketing site with three pages reachable from
the navigation: **Home** (`/`), **About Us** (`/about-us`), and **Contact** (`/contact`). It
has no contact form, login, search, blog, or any other server-backed behaviour.

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Prospective client evaluates xFlow Tech on the home page (Priority: P1)

A telecom or enterprise decision-maker lands on the home page from a referral or search result.
They need to quickly understand who xFlow Tech is and the full breadth of what the company
offers — services, open-source contributions, research and standardization involvement, and
products — presented exactly as on the current site.

**Why this priority**: The home page is the single most visited page and carries the majority of
the company's positioning. A faithful home page alone is a usable, demonstrable site.

**Independent Test**: Open the home page of the rebuilt site with no network access to the
original domain. Confirm every section that exists on the live home page is present, in the same
order, with the same headings, copy, and imagery, and that it renders correctly at desktop and
mobile widths.

**Acceptance Scenarios**:

1. **Given** the rebuilt site is served statically, **When** a visitor opens the home page,
   **Then** they see the same hero, service listing, open-source contributions, research &
   standardization partners, products, and partner logos as the live site, in the same order.
2. **Given** the visitor is on a 375px-wide phone, **When** the home page loads, **Then** the
   layout adapts the same way the live site does and all content remains readable and reachable.
3. **Given** the visitor inspects network activity, **When** the home page and its assets load,
   **Then** no request is made to `xflowresearch.com` or any external image/font/script host.

---

### User Story 2 - Visitor assesses company credibility on About Us (Priority: P2)

A potential partner or hire reads the About Us page to understand the company's history, depth of
expertise (SDN, NFV, OpenStack, DPDK, controllers, overlays, benchmarking, etc.), and its client
and academic portfolio.

**Why this priority**: About Us is the primary trust-building page and is linked from every page,
but the site is still viable for a first demo without it.

**Independent Test**: Open the About Us page on the rebuilt site and confirm its narrative
content and any imagery match the live About Us page, and that the shared header and footer are
present.

**Acceptance Scenarios**:

1. **Given** the rebuilt site, **When** a visitor opens `/about-us`, **Then** the company
   history and expertise narrative match the live page's text.
2. **Given** any page, **When** the visitor clicks "About Us" in the navigation, **Then** they
   arrive at the About Us page.

---

### User Story 3 - Visitor finds how to contact the company (Priority: P3)

A visitor ready to reach out opens the Contact page to find the company's offices and email
address.

**Why this priority**: Important for conversion but low effort and low risk; it is a short
informational page.

**Independent Test**: Open the Contact page and confirm the three office entries and the email
address are present and correct, and that the email is a working `mailto:` link.

**Acceptance Scenarios**:

1. **Given** the rebuilt site, **When** a visitor opens `/contact`, **Then** they see the three
   office locations — X Flow Software Technology LLC (Dubai, UAE), xFlow Tech Inc. (Austin,
   Texas, USA), and xFlow Tech Pvt. Ltd. (Islamabad, Pakistan) — with the same addresses as
   the live site.
2. **Given** the Contact page, **When** the visitor selects the `info@xflowresearch.com` email,
   **Then** their mail client opens a new message to that address.

---

### User Story 4 - All media is self-hosted (Priority: P2)

The site owner needs the rebuilt site to be fully portable: it can be deployed to any static host
and will keep working even if the original `xflowresearch.com` and its asset hosts disappear.

**Why this priority**: This is the core of the "use them as static assets" request and protects
against link rot and third-party outages, but the site can be demoed before every asset is
localised.

**Independent Test**: Disable all outbound network access except the host serving the rebuilt
site. Load every page and confirm all logos, illustrations, product images, icons, and fonts
still render.

**Acceptance Scenarios**:

1. **Given** the rebuilt site with no access to external hosts, **When** any page loads, **Then**
   every image and font renders and no asset appears broken.
2. **Given** the project repository, **When** an inventory of media assets is reviewed, **Then**
   each asset records where it was captured from and the date of capture.

---

### Edge Cases

- **Unknown URL**: A visitor requests a path that does not exist (e.g. an old deep link) → the
  site shows a branded "page not found" screen with a link back to the home page.
- **Asset missing at capture time**: An image on the live site fails to download during content
  capture → the gap is recorded and surfaced for a human decision (re-capture, substitute, or
  omit) rather than shipping a broken image.
- **Live site changes after capture**: The live site is edited after the snapshot is taken → the
  rebuilt site continues to reflect the recorded snapshot date; re-syncing is a deliberate,
  separate action.
- **Very small / very large viewports**: At ~320px and at ultra-wide desktop widths the layout
  must not overflow horizontally or leave content unreachable.
- **Reduced motion / slow connection**: Any motion respects the visitor's reduced-motion
  preference; pages remain readable while images are still loading.
- **Per-service detail pages**: If the live site is found to contain standalone pages for
  individual services or products (beyond the three navigation pages), those are out of scope for
  this feature and recorded as a follow-up.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: The site MUST provide three pages at the same paths as the live site: Home (`/`),
  About Us (`/about-us`), and Contact (`/contact`).
- **FR-002**: Each page's visible text content MUST match the corresponding live page's content
  at the time of capture (headings, body copy, lists, labels, footer text).
- **FR-003**: Each page's visual design — layout, typography, colour, spacing, imagery placement,
  and responsive behaviour — MUST match the live site to a close visual tolerance at both a
  representative desktop width and a representative mobile width.
- **FR-004**: A shared navigation (Home, About Us, Contact Us) and a shared footer (copyright
  line "© 2026 · xFlow Tech Inc · All Rights Reserved") MUST appear on every page and match
  the live site.
- **FR-005**: All media shown on the live site — the xFlow Tech logo, section illustrations
  and icons, partner and technology logos, and product images — MUST be captured from the live
  site and stored within this project as local static assets.
- **FR-006**: At runtime the site MUST NOT load images, fonts, style, or scripts from
  `xflowresearch.com` or any third-party host; all such resources MUST be served from the same
  origin as the site.
- **FR-007**: The Contact page MUST list the three office locations with their full addresses as
  shown on the live site, and MUST present `info@xflowresearch.com` as a `mailto:` link.
- **FR-008**: The site MUST be responsive and usable from approximately 320px wide up to large
  desktop widths, following the same breakpoints and reflow as the live site.
- **FR-009**: All in-site links MUST resolve to a real page within the site; requests to unknown
  paths MUST return a branded not-found page.
- **FR-010**: The site MUST be deliverable as a set of static files with no server, database, or
  other backend dependency at runtime.
- **FR-011**: Every meaningful image MUST have descriptive alternative text; decorative images
  MUST be marked as decorative.
- **FR-012**: The project MUST record the capture date and source URLs for the content and
  assets, so the snapshot is reproducible and auditable.
- **FR-013**: Page metadata (page titles, meta descriptions, favicon, and social-share preview
  image) MUST mirror the live site's equivalents.
- **FR-014**: The site MUST meet WCAG 2.1 AA for colour contrast and keyboard operability; all
  interactive elements (navigation, links, email) MUST be reachable and operable by keyboard with
  a visible focus indicator.

### Key Entities _(include if feature involves data)_

- **Page**: One of Home, About Us, Contact. Attributes: URL path, page title, meta description,
  ordered list of content sections.
- **Content Section**: A titled block within a page. Attributes: heading, body copy, associated
  media, layout style (e.g. hero, grid of cards, logo wall), order within the page.
- **Media Asset**: An image, logo, icon, or font file. Attributes: original source URL, local
  storage path, asset type, alternative text (for images), intended display context, capture
  date.
- **Office Location**: A physical office shown on the Contact page. Attributes: legal entity
  name, full postal address, contact email (where provided).
- **Partner / Technology Reference**: A named organisation or project shown via logo or text
  (e.g. ETSI, Linux Foundation, Dell, Intel, VMware, Red Hat, GSMA, SONiC, Khalifa University).
  Attributes: name, logo asset, the section it appears in.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: A reviewer familiar with the live site compares it against the rebuilt Home, About
  Us, and Contact pages and confirms 100% of the live sections and their text are present and
  unchanged.
- **SC-002**: In a side-by-side comparison at a desktop width and a mobile width, the reviewer
  rates the rebuilt pages as visually matching the live site (no unintended differences in
  layout, type, colour, or imagery).
- **SC-003**: Loading any page of the rebuilt site with network monitoring shows zero requests to
  `xflowresearch.com` or to any external image, font, or script host.
- **SC-004**: Every image on every page renders successfully — a full crawl of the site reports no
  broken or missing media.
- **SC-005**: Each page becomes readable within 1 second and fully interactive within 2 seconds on
  a typical broadband connection.
- **SC-006**: An automated accessibility scan of all three pages reports zero critical or serious
  violations, and the full navigation and contact email can be operated using only the keyboard.
- **SC-007**: The site can be deployed to a static file host and served correctly with no
  additional runtime services.
- **SC-008**: The asset inventory accounts for every media file used on the site, each with a
  recorded source URL and capture date.

## Assumptions

- **Ownership and rights**: The organisation commissioning this rebuild owns or controls
  `xflowresearch.com` and its content, and has the right to reproduce its text, images, and its
  own logo. Partner, client, and technology logos are reproduced in the same context and
  prominence in which xFlow Tech already publishes them on the current live site.
- **Scope is the current three-page navigation**: Home, About Us, and Contact. No blog, no
  search, no gated or authenticated area, and no standalone per-service or per-product detail
  pages. If such pages are discovered on the live site during capture, they are logged as
  out-of-scope follow-ups.
- **No interactive/server features to reproduce**: The live site has no contact form, newsletter
  signup, or other server-backed interaction. The rebuild reproduces informational content only;
  the sole "action" is the `mailto:` email link.
- **Point-in-time snapshot**: Content and assets are captured once, at a recorded date. Keeping
  the rebuilt site in sync with future live-site edits is a separate, deliberate effort, not an
  automated feed.
- **Fonts**: Where the live site uses a web font that cannot be self-hosted for licensing
  reasons, a visually close, openly-licensed substitute may be used and noted in the asset
  inventory.
- **Analytics, tag managers, chat widgets, and other third-party embeds** present on the live
  site are omitted unless explicitly requested, since they conflict with the "no external
  requests" requirement.
- **Copyright year** in the footer matches the live site as captured ("© 2026").

## Dependencies

- Read access to the live `xflowresearch.com` site (all three pages and their linked assets) at
  content-capture time.
- A static hosting target for deployment (any static file host is acceptable).
