# Bookify Tutorial

A hands-on guide that teaches the full modern software-development lifecycle by building a real ebook-selling product called **Bookify**.

The site is built for an "AI Product Engineer" — someone who can use frontend/React skills and wants to learn how to ship a complete product, from idea validation through launch and operations.

## What it covers

- Product discovery, validation, and requirements
- UX/UI design, architecture, and database design
- Backend, frontend, containers, and AI integration
- Object storage, email delivery, and CI/CD
- Security, testing, compliance
- Infrastructure, deployment, observability, maintenance, and analytics

## Tech stack

- **Framework:** Next.js App Router + React + TypeScript
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Deployment:** Static export (configurable for Vercel/Railway/Render/etc.)

## Getting started

```bash
npm install
npm run dev
```

Other useful commands:

```bash
npm run lint
npm run build
```

## Project structure

```
bookify-tutorial/
├── src/
│   ├── app/
│   │   ├── chapter/[slug]/page.tsx   # Chapter detail page
│   │   ├── globals.css               # Tailwind/theme + sidenote styles
│   │   ├── layout.tsx                # Root layout and theme provider
│   │   └── page.tsx                  # Landing page
│   ├── components/
│   │   ├── Callout.tsx               # Notebook-paper sidenote cards
│   │   ├── CodeBlock.tsx             # Syntax-highlighted code blocks
│   │   ├── ConstellationNav.tsx      # Two-tier SDLC phase/chapter timeline
│   │   ├── ContentRenderer.tsx       # Renders chapter content blocks
│   │   ├── HeroBackground.tsx        # Animated mesh hero background
│   │   ├── LifecycleFlowchart.tsx    # SDLC phase explainer on the homepage
│   │   ├── PageNav.tsx               # Previous/next chapter links
│   │   ├── StakeholderBubbles.tsx    # Role/persona bubbles
│   │   ├── ThemeProvider.tsx         # Light/dark theme context
│   │   └── ThemeToggle.tsx           # Theme switch button
│   └── lib/
│       └── chapters.ts               # All chapters, phases, and data
├── public/                           # Static assets
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Routing

| Route | Purpose |
|---|---|
| `/` | Landing page with hero, lifecycle flowchart, and chapter grid |
| `/chapter/[slug]` | Individual chapter page (e.g., `/chapter/before-code`) |

All chapter routes are statically generated at build time via `generateStaticParams`.

## Content model

Chapter data lives in `src/lib/chapters.ts`.

Key types:

- `Phase` — a high-level SDLC stage (Discover, Design, Build, Integrate, Secure, Deploy, Operate)
- `Chapter` — a single page in the guide
- `ContentBlock` — text, heading, code, table, or callout
- `TryItYourself` — structured step-by-step exercise
- `Stakeholder` — role, abbreviation, color, and responsibility

Example chapter shape:

```ts
{
  slug: "before-code",
  phaseId: "discover",
  number: 0,
  title: "Before Code",
  subtitle: "Product Definition & Validation",
  description: "...",
  stakeholders: [...],
  content: [...],
  tryItYourself: { intro, steps, resources, notes },
  bookifyExample: [...],
}
```

## Navigation model

The top navigation is split into **phases** and **chapters**:

- Phase nodes always show their title.
- Clicking a phase expands its chapters inline.
- Chapter subnodes are small numbered pills that expand on hover/current to show the title.
- The current page's phase is expanded by default.
- Only one phase's children are visible at a time.

Phase and chapter gradients are defined in `ConstellationNav.tsx`:

- `parentGradients` — darker colors for phase nodes
- `childGradients` — lighter colors for chapter nodes

## Sidenotes / callouts

Callouts render as notebook-paper "sticky notes." They can be used inside:

- Main chapter `content`
- `bookifyExample` blocks
- `tryItYourself.notes`

Layout behavior:

- 1–2 callouts in a block render in the right gutter on large screens.
- 3+ callouts render as a 3-column grid inline below the relevant content.
- On small screens, all callouts stack inline.

## Adding or reorganizing chapters

1. Open `src/lib/chapters.ts`.
2. Add the new `Phase` to `phases` if needed.
3. Add a new `Chapter` object to `chapters` with the correct `phaseId` and global `number`.
4. Keep chapters sorted by `number`; this drives nav order and prev/next links.
5. Run `npm run lint && npm run build` to verify.
6. Update this README if the folder structure or content model changes.

## Styling conventions

- Tailwind utility classes are used everywhere.
- Theme colors are defined as CSS variables in `src/app/globals.css` under `:root` and `[data-theme="dark"]`.
- The `@theme inline` block maps those variables to Tailwind color utilities.
- Sidenote-specific styles (rotation, lines, punched holes) live at the bottom of `globals.css`.

## Author

Shiva Ramsamooj · 2026
