export interface Stakeholder {
  role: string;
  abbr: string;
  color: string;
  responsibility: string;
}

export interface CodeBlock {
  language: string;
  filename?: string;
  code: string;
}

export interface Callout {
  type: "edge-case" | "warning" | "tip" | "note";
  title: string;
  content: string;
}

export interface ContentBlock {
  type: "text" | "code" | "callout" | "table" | "heading";
  content?: string;
  code?: CodeBlock;
  callout?: Callout;
  tableHeaders?: string[];
  tableRows?: string[][];
  level?: 2 | 3;
}

export interface ResourceLink {
  label: string;
  url: string;
}

export interface TryItYourself {
  intro: string;
  steps: string[];
  resources: ResourceLink[];
  notes?: Callout[];
}

export interface Chapter {
  slug: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  stakeholders: Stakeholder[];
  content: ContentBlock[];
  tryItYourself?: TryItYourself;
  bookifyExample?: ContentBlock[];
}

export const chapters: Chapter[] = [
  {
    slug: "before-code",
    number: 0,
    title: "Before Code",
    subtitle: "Product Definition & Validation",
    description:
      "Define what you are building, validate the idea, and align stakeholders before any code is written.",
    stakeholders: [
      {
        role: "Product Manager",
        abbr: "PM",
        color: "#2563eb",
        responsibility:
          "Validates the problem, defines MVP scope, writes initial user stories. Owns the 'what' and 'why.'",
      },
      {
        role: "Founder / Author",
        abbr: "FO",
        color: "#f59e0b",
        responsibility:
          "Provides business goals, pricing, content rights, brand voice. Approves scope and risk tolerance.",
      },
      {
        role: "Designer",
        abbr: "DE",
        color: "#f472b6",
        responsibility:
          "Proposes UX flow, checkout simplicity, mobile layouts. Owns usability.",
      },
      {
        role: "Engineering Lead",
        abbr: "EL",
        color: "#06b6d4",
        responsibility:
          "Flags feasibility, compliance, hosting costs. Owns rough architecture and effort estimates.",
      },
      {
        role: "Legal / Compliance",
        abbr: "LC",
        color: "#f43f5e",
        responsibility:
          "Reviews terms of sale, copyright, tax, privacy, refund policy. Owns legal risk.",
      },
    ],
    content: [
      {
        type: "text",
        content:
          "Before you open an editor, you need to answer a simple question: **what are we actually building, and why will anyone pay for it?**",
      },
      {
        type: "text",
        content:
          "For Bookify, the answer looks like this:\n\n- **Product:** An ebook store for a single author.\n- **User:** A reader who wants instant access to a digital book.\n- **Admin:** The author, who needs to see sales and deliver the book.\n- **Core transaction:** Browse → Buy → Pay → Download.\n- **Differentiator:** Faster, simpler, and mobile-friendly compared to generic marketplaces.",
      },
      {
        type: "heading",
        level: 2,
        content: "What a Product Manager Actually Does Here",
      },
      {
        type: "text",
        content:
          "The PM is not just a question-asker. At this stage they are responsible for turning uncertainty into a decisions document that engineering, design, and the founder can all agree on.\n\nThat usually means:\n\n- **Problem discovery:** Talk to at least 5-10 potential readers or authors. What is painful about buying/selling ebooks today?\n- **Solution shaping:** Sketch the smallest version of Bookify that solves that pain. This is your MVP, not your final vision.\n- **Assumption mapping:** List the beliefs that must be true for the product to succeed. Example: 'Readers will pay without creating an account.' Each assumption needs a cheap test.\n- **Success metrics:** Define one north-star metric (e.g., completed purchases in the first 30 days) and guardrail metrics (refund rate, checkout drop-off, support ticket volume).\n- **Prioritization:** Stack every possible feature by value vs effort. Cut aggressively. Launching late with too many features is riskier than launching early with the wrong one missing.\n- **Stakeholder alignment:** Make sure the founder's business goals, the designer's UX concerns, and engineering's feasibility constraints are visible and reconciled before code starts.",
      },
      {
        type: "heading",
        level: 2,
        content: "PM Validation Questions",
      },
      {
        type: "text",
        content:
          "Before engineering starts, the PM should confirm all of the following. A 'no' or 'not sure' is fine — it just becomes a documented risk with an owner.",
      },
      {
        type: "text",
        content:
          "1. **Demand:** Has anyone committed to buying this? Pre-orders, waitlists, or signed letters of intent are stronger than opinions.\n2. **Transaction scope:** What is the exact minimum transaction we can launch with? Strip it to one book, one price, one payment method.\n3. **Customer support:** Who handles refunds, chargebacks, delivery failures, and confused buyers? What is the response time?\n4. **Geography:** In which countries will we sell? This drives tax, VAT, and payment-method requirements.\n5. **Reliability tolerance:** What is the acceptable downtime or data-loss tolerance? A hobby project tolerates more than a paid storefront.\n6. **Account model:** Will checkout require a user account, or can it be guest-only? Guest checkout usually converts better for a single purchase.\n7. **Pricing experiment:** Have we tested the price point? A $9 ebook and a $49 ebook have very different conversion dynamics.\n8. **Differentiation:** Why would someone buy here instead of Amazon/Kindle/Gumroad?\n9. **Riskiest assumption:** What single belief, if wrong, kills the product? How will we test it in the next two weeks?\n10. **Definition of done:** What does 'launched' mean? First sale, first 100 sales, or breakeven?",
      },
      {
        type: "callout",
        callout: {
          type: "edge-case",
          title: "Global Sales = Tax Complexity",
          content:
            "Selling in the EU means VAT collection and invoicing. In the US, sales tax varies by state. Stripe Tax or TaxJar should be in the architecture from day one if you sell outside your home jurisdiction.",
        },
      },
      {
        type: "heading",
        level: 2,
        content: "Why This Matters",
      },
      {
        type: "table",
        tableHeaders: ["Pros of doing this", "Cons of skipping"],
        tableRows: [
          [
            "Prevents wasted engineering effort",
            "Build features nobody wants",
          ],
          [
            "Surfaces compliance issues early",
            "Launch blockers appear late",
          ],
          [
            "Creates a shared definition of success",
            "Scope arguments slow the team",
          ],
          [
            "Enables realistic effort estimates",
            "Timeline and cost surprises",
          ],
        ],
      },
      {
        type: "callout",
        callout: {
          type: "warning",
          title: "Accessibility Is Not Optional",
          content:
            "Depending on your jurisdiction, you may be legally required to meet WCAG 2.1 AA. Plan for it from the start, not as a post-launch fix.",
        },
      },
      {
        type: "callout",
        callout: {
          type: "tip",
          title: "Payment Timing",
          content:
            "Customers expect instant delivery, but Stripe funds typically settle in T+2 days. Deliver on payment_intent.succeeded, not on settlement.",
        },
      },
    ],
    tryItYourself: {
      intro:
        "Practice product discovery before writing any code. A clear brief is the cheapest way to avoid building the wrong thing.",
      steps: [
        "Open a blank document and write a one-page product brief for Bookify.",
        "Define the **target user**, the **core transaction** (browse → buy → pay → download), and the **MVP scope**.",
        "List at least three **out-of-scope** items and three **open questions** that need answers before engineering starts.",
        "Share the brief with someone outside the project. Ask them to explain Bookify back to you in one sentence.",
        "If they cannot summarize it clearly, rewrite the brief until they can.",
      ],
      resources: [
        {
          label: "Shape Up — Write the Pitch",
          url: "https://basecamp.com/shapeup/1.1-chapter-02",
        },
        {
          label: "Mozilla — How to define product requirements",
          url: "https://docs.google.com/document/d/1E2d-Ur8eH2bS_e-cQI-B24wc4DQUZ9-C/edit",
        },
      ],
      notes: [
        {
          type: "tip",
          title: "Start ugly",
          content:
            "Your first brief will be wrong. That is the point. The goal is to make the mistakes cheap and visible before code locks them in.",
        },
        {
          type: "edge-case",
          title: "Beware solution-first writing",
          content:
            "If your brief starts with 'we need a mobile app,' you are describing a solution. Rewrite it as the problem the app solves.",
        },
      ],
    },
    bookifyExample: [
      {
        type: "heading",
        content: "Bookify Product Requirements Document",
        level: 3,
      },
      {
        type: "text",
        content:
          "**Status:** Draft\n**Owner:** Product Manager\n**Date:** 2026-01-10\n**Version:** 0.4",
      },
      {
        type: "heading",
        content: "1. Problem Statement",
        level: 3,
      },
      {
        type: "text",
        content:
          "Self-published authors who sell ebooks directly to readers struggle with two things: the technical complexity of setting up payments, file delivery, and taxes; and the high platform fees (30-65%) charged by marketplaces like Amazon Kindle, Gumroad, and Etsy. They want a branded, low-fee storefront that they control, without becoming a backend engineer.",
      },
      {
        type: "heading",
        content: "2. Target Audience",
        level: 3,
      },
      {
        type: "text",
        content:
          "**Primary:** Indie authors and subject-matter experts who already have an audience (email list, blog, or social following) and want to sell a single ebook or short guide.\n\n**Secondary:** Small coaches, consultants, and course creators who want a lightweight way to sell a digital PDF as a lead-in to higher-ticket products.\n\n**Not the target:** Publishers with large catalogs, subscription businesses, or users who need a multi-vendor marketplace.",
      },
      {
        type: "heading",
        content: "3. Market Research",
        level: 3,
      },
      {
        type: "text",
        content:
          "We interviewed 12 self-published authors who had sold on Gumroad or Payhip. Recurring themes:\n\n- 9 of 12 complained about platform fees eating margins.\n- 8 of 12 wanted a branded checkout page, not a generic marketplace.\n- 7 of 12 said tax handling was confusing and they preferred to keep it simple at first.\n- 5 of 12 had abandoned a self-hosted attempt because Stripe integration took too long.\n\nThis suggests a market for a simpler, open-source-style storefront that handles payments and delivery out of the box.",
      },
      {
        type: "callout",
        callout: {
          type: "note",
          title: "Small sample size",
          content:
            "Twelve interviews is enough to shape an MVP, not enough to prove market size. Treat these findings as directional, not statistically significant.",
        },
      },
      {
        type: "heading",
        content: "4. Competitor Analysis",
        level: 3,
      },
      {
        type: "table",
        tableHeaders: ["Competitor", "Strengths", "Weaknesses", "Bookify Angle"],
        tableRows: [
          [
            "Gumroad",
            "Easy setup, built-in audience, handles VAT",
            "10% fee, limited branding, payout delays",
            "No platform fee, full brand control",
          ],
          [
            "Amazon KDP",
            "Massive reach, trusted checkout",
            "35-70% royalty, no customer list, no pricing flexibility",
            "Own the customer relationship and email list",
          ],
          [
            "Payhip",
            "Simple, supports memberships",
            "2% transaction fee, basic customization",
            "Open-source codebase, no revenue share",
          ],
          [
            "Self-hosted WooCommerce",
            "Very customizable",
            "WordPress hosting, plugin maintenance, security burden",
            "Modern Node.js stack, no CMS needed",
          ],
        ],
      },
      {
        type: "heading",
        content: "5. Objective",
        level: 3,
      },
      {
        type: "text",
        content:
          "Launch a simple, trustworthy storefront that lets readers buy and instantly download a single ebook. The first version must work on mobile, process payments safely, and deliver files without manual intervention.",
      },
      {
        type: "heading",
        content: "6. Goals",
        level: 3,
      },
      {
        type: "text",
        content:
          "- Validate that readers will pay for a direct-from-author ebook experience.\n- Process the first 100 sales with less than 1% payment failure.\n- Keep operational cost under $50/month before revenue.\n- Support a launch timeline of 6-8 weeks with one part-time engineer.",
      },
      {
        type: "heading",
        content: "7. User Stories",
        level: 3,
      },
      {
        type: "text",
        content:
          "**As a reader**, I want to buy the book with one click so that I can start reading immediately.\n**Acceptance:** Guest checkout works on mobile; payment takes less than 30 seconds; download link arrives by email within 60 seconds.\n\n**As a reader**, I want my download link to expire so that I feel confident the file is not publicly shared forever.\n**Acceptance:** Link expires after 15 minutes or first use, whichever comes first.\n\n**As an author**, I want to see a list of orders so that I can track sales without logging into Stripe.\n**Acceptance:** Admin dashboard shows email, date, amount, and status for each order.\n\n**As an author**, I want refunds to disable future downloads so that I do not give away the book after returning money.\n**Acceptance:** Refunded orders cannot generate new signed URLs.",
      },
      {
        type: "heading",
        content: "8. In Scope (MVP)",
        level: 3,
      },
      {
        type: "text",
        content:
          "- Public landing page with book description, cover, and price.\n- Mobile-first Stripe Checkout flow with guest checkout.\n- Webhook that creates an order and sends a download email.\n- Signed, expiring PDF download URL.\n- Simple admin dashboard listing orders.\n- Refund status reflected in admin and download logic.",
      },
      {
        type: "heading",
        content: "9. Out of Scope",
        level: 3,
      },
      {
        type: "text",
        content:
          "- User accounts, passwords, or login walls.\n- Subscription or multi-product catalog.\n- Customer reviews, ratings, or social features.\n- In-depth analytics beyond order count and revenue.\n- Native mobile apps.\n- Automatic tax calculation for international buyers (handled manually in MVP).",
      },
      {
        type: "heading",
        content: "10. Open Questions",
        level: 3,
      },
      {
        type: "text",
        content:
          "- Which object-storage provider gives the lowest egress cost at launch volume?\n- Will the author handle support email directly or forward to a shared inbox?\n- Do we need a separate staging environment, or can we rely on Stripe test mode?",
      },
    ],
  },
  {
    slug: "architecture",
    number: 1,
    title: "Architecture",
    subtitle: "Tech Stack & Decisions",
    description:
      "Choose the languages, frameworks, and services that will power Bookify.",
    stakeholders: [
      {
        role: "Engineering Lead",
        abbr: "EL",
        color: "#06b6d4",
        responsibility:
          "Final stack decision. Owns scalability, cost, security, and maintainability.",
      },
      {
        role: "CTO / Founder",
        abbr: "CT",
        color: "#f59e0b",
        responsibility:
          "Approves trade-offs and recurring costs. Owns budget and risk appetite.",
      },
      {
        role: "Product Manager",
        abbr: "PM",
        color: "#2563eb",
        responsibility:
          "Confirms stack supports launch timeline. Pushes back on delays.",
      },
      {
        role: "Designer",
        abbr: "DE",
        color: "#f472b6",
        responsibility:
          "Confirms frontend framework supports intended UX. Validates motion, SSR, mobile behavior.",
      },
    ],
    content: [
      {
        type: "text",
        content:
          "Good tech choices match team skills, speed-to-market, operational cost, and expected scale. For Bookify, the team is small (one engineer, part-time), the budget is tight, and the launch window is 6-8 weeks. The architecture must be boring enough to ship quickly and reliable enough to handle real payments.",
      },
      {
        type: "heading",
        level: 2,
        content: "How the Decision Was Made",
      },
      {
        type: "text",
        content:
          "**Speed:** Next.js gives us routing, SSR, and deployment in one framework. The author is already comfortable with React, so there is no learning cliff.\n\n**Cost:** R2 has no egress fees, which matters if a popular tweet drives downloads. Stripe Checkout keeps PCI scope tiny. Resend has a generous free tier for low volume.\n\n**Operational simplicity:** PostgreSQL is familiar and runs on every PaaS. A monorepo with npm workspaces keeps the frontend, backend, and shared types in one repo and one CI pipeline.\n\n**Future-proofing:** The stack can be split later — the API can move to a separate service, the frontend can add user accounts, and R2 can be fronted by a CDN. None of those require a rewrite.",
      },
      {
        type: "heading",
        level: 2,
        content: "Chosen Stack",
      },
      {
        type: "table",
        tableHeaders: ["Layer", "Choice", "Rationale"],
        tableRows: [
          [
            "Frontend",
            "Next.js 14 App Router",
            "SEO-friendly, easy Vercel deploy, React ecosystem",
          ],
          [
            "Backend",
            "Node.js + Fastify",
            "Single language across stack, large ecosystem",
          ],
          [
            "ORM",
            "Prisma",
            "Type-safe migrations and queries",
          ],
          [
            "Database",
            "PostgreSQL",
            "Reliable, transactional, widely supported",
          ],
          [
            "Object Storage",
            "Cloudflare R2",
            "S3-compatible, zero egress fees",
          ],
          [
            "Payments",
            "Stripe Checkout",
            "Reduces PCI scope, hosted payment page",
          ],
          [
            "Email",
            "Resend",
            "High deliverability, simple API",
          ],
          [
            "Containers",
            "Docker",
            "Consistency across environments",
          ],
          [
            "CI/CD",
            "GitHub Actions",
            "Native integration, free tier",
          ],
        ],
      },
      {
        type: "heading",
        level: 2,
        content: "Monorepo Structure",
      },
      {
        type: "code",
        code: {
          language: "text",
          filename: "Project Layout",
          code: `bookify/
├── apps/
│   ├── web/          # Next.js frontend
│   └── api/          # Node.js backend
├── packages/
│   ├── db/           # Prisma schema and client
│   └── shared/       # Types, validation schemas
├── docker-compose.yml
└── README.md`,
        },
      },
      {
        type: "callout",
        callout: {
          type: "tip",
          title: "Type Sharing",
          content:
            "Share Zod or OpenAPI contracts between frontend and backend via the shared package. This prevents API contract drift.",
        },
      },
      {
        type: "heading",
        level: 2,
        content: "Monorepo vs. Traditional",
      },
      {
        type: "text",
        content:
          "Bookify uses a monorepo because it has **multiple deployable apps** (frontend + backend) and **shared packages** (database client, types). That justifies the overhead of workspaces, Turborepo, and cross-project configuration.",
      },
      {
        type: "text",
        content:
          "But not every project needs a monorepo. If you have a single app with one deploy target — like a marketing site, a documentation site, or a solo prototype — a traditional single-project structure is simpler and faster to work with.",
      },
      {
        type: "table",
        tableHeaders: ["Use a monorepo when", "Skip it when"],
        tableRows: [
          [
            "Multiple deployable apps (web, API, admin)",
            "Single app, one deploy target",
          ],
          [
            "Shared packages between apps (DB, types, UI)",
            "No shared code to extract",
          ],
          [
            "Multiple teams working in parallel",
            "Solo developer or small team",
          ],
          [
            "Atomic cross-app changes (API + frontend together)",
            "No cross-project dependencies",
          ],
        ],
      },
      {
        type: "callout",
        callout: {
          type: "warning",
          title: "Don't Monorepo for the Resume",
          content:
            "A monorepo that contains one app is just a regular project with extra configuration files. Turborepo, Nx, and workspace configs add real complexity — dependency hoisting, build caching, task orchestration. If you don't need cross-project sharing, you are paying the cost without the benefit.",
        },
      },
      {
        type: "heading",
        level: 2,
        content: "When to Choose Something Else",
      },
      {
        type: "table",
        tableHeaders: ["Situation", "Alternative"],
        tableRows: [
          [
            "Very high throughput or low latency",
            "Go or Rust backend",
          ],
          [
            "Heavy ML or data processing",
            "Python backend",
          ],
          [
            "Convention-over-configuration",
            "Ruby on Rails",
          ],
          [
            "Just validating the idea",
            "Webflow + Stripe + Zapier",
          ],
        ],
      },
      {
        type: "callout",
        callout: {
          type: "edge-case",
          title: "Vendor Lock-in",
          content:
            "Keep your backend portable with Docker and standard Postgres. Vercel and Railway are convenient but have pricing cliffs at scale.",
        },
      },
    ],
    tryItYourself: {
      intro:
        "Set up the folder skeleton for Bookify. You are not writing app code yet — just deciding where each responsibility lives.",
      steps: [
        "Create a root folder named `bookify/`.",
        "Inside it, create `apps/web/`, `apps/api/`, `packages/db/`, and `packages/shared/`.",
        "Create a root `package.json` with `workspaces: ['apps/*', 'packages/*']`.",
        "Add empty placeholder files (`index.ts`, `README.md`) so the structure is visible in your editor.",
        "Run `npm install` from the root and confirm that `node_modules` is created at the root.",
      ],
      resources: [
        {
          label: "npm — Workspaces",
          url: "https://docs.npmjs.com/cli/v10/using-npm/workspaces",
        },
        {
          label: "Turborepo — Getting Started",
          url: "https://turbo.build/repo/docs/getting-started/create-new",
        },
        {
          label: "Node.js — Package.json guide",
          url: "https://nodejs.org/en/learn/manipulating-files/nodejs-path-module",
        },
      ],
      notes: [
        {
          type: "tip",
          title: "Keep the first version boring",
          content:
            "Do not add Redis, Kafka, or Kubernetes on day one. Boring stacks ship; exciting stacks break at 2 AM.",
        },
        {
          type: "edge-case",
          title: "Shared packages are worth it early",
          content:
            "Putting Zod schemas and types in packages/shared prevents the frontend and backend from drifting apart.",
        },
      ],
    },
    bookifyExample: [
      {
        type: "heading",
        content: "Bookify Stack & Layout",
        level: 3,
      },
      {
        type: "text",
        content:
          "**Frontend:** Next.js 14 (App Router) + Tailwind CSS hosted on Vercel.\n**Backend:** Node.js + Fastify or Next.js API routes.\n**Database:** PostgreSQL accessed through Prisma.\n**Object storage:** Cloudflare R2 for PDFs.\n**Email:** Resend for transactional emails.\n**Payments:** Stripe Checkout + webhooks.\n**CI/CD:** GitHub Actions → Railway/Fly.io.",
      },
      {
        type: "code",
        code: {
          language: "text",
          filename: "bookify/",
          code: `bookify/
├── apps/
│   ├── web/          # Next.js frontend
│   └── api/          # Node.js backend
├── packages/
│   ├── db/           # Prisma schema + client
│   └── shared/       # Zod schemas, types
├── docker-compose.yml
└── package.json`,
        },
      },
    ],
  },
  {
    slug: "database",
    number: 2,
    title: "Database",
    subtitle: "Schema Design & Data Integrity",
    description:
      "Design a PostgreSQL schema for Bookify that is correct, safe, and ready for production.",
    stakeholders: [
      {
        role: "Backend Engineer / DBA",
        abbr: "BE",
        color: "#3b82f6",
        responsibility:
          "Schema design, indexes, migrations, query performance. Owns data integrity.",
      },
      {
        role: "Product Manager",
        abbr: "PM",
        color: "#2563eb",
        responsibility:
          "Confirms what entities need to be tracked. Owns required fields and statuses.",
      },
      {
        role: "Security / Compliance",
        abbr: "SC",
        color: "#f43f5e",
        responsibility:
          "Reviews PII handling and retention policies. Ensures legal and privacy requirements are met.",
      },
      {
        role: "Founder",
        abbr: "FO",
        color: "#f59e0b",
        responsibility:
          "Approves data retention and refund policy implications. Owns business rules.",
      },
    ],
    content: [
      {
        type: "text",
        content:
          "The database is the source of truth for anything that must survive a server restart: orders, customers, products, payment references, and download tokens.",
      },
      {
        type: "heading",
        level: 2,
        content: "Schema Design Decisions",
      },
      {
        type: "text",
        content:
          "Bookify needs four core entities. Each one exists for a reason, not because every app has users and orders.\n\n- **customers:** We only need an email to deliver the book. No passwords, no accounts in the MVP. Email is unique so one address always maps to one customer record.\n- **products:** A single book in the MVP, but modeling it as a product table lets us add more books later without a rewrite. `price_cents` is an integer to avoid floating-point money errors.\n- **orders:** This is the central transaction record. It links to a customer, a product, and a Stripe payment intent. The `status` column drives business rules: do not serve downloads on `pending` or `refunded`.\n- **download_tokens:** These are short-lived, single-use authorization tokens. They separate the public download URL from the actual file URL, so sharing a link does not share the file forever.\n\nRelationships:\n- An `order` belongs to one `customer` and one `product`.\n- A `download_token` belongs to exactly one `order`.\n- `stripe_payment_intent_id` is UNIQUE to prevent duplicate order creation if Stripe sends the webhook twice.",
      },
      {
        type: "heading",
        level: 2,
        content: "Schema",
      },
      {
        type: "code",
        code: {
          language: "sql",
          filename: "schema.sql",
          code: `CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  file_key TEXT NOT NULL,
  price_cents INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  is_active BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id),
  status TEXT NOT NULL CHECK (
    status IN ('pending','paid','failed','refunded')
  ),
  total_cents INTEGER NOT NULL,
  currency TEXT NOT NULL,
  stripe_payment_intent_id TEXT UNIQUE,
  tax_cents INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE download_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id),
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);`,
        },
      },
      {
        type: "callout",
        callout: {
          type: "edge-case",
          title: "Never Use Floats for Money",
          content:
            "Store amounts as integers in the smallest unit (cents). 19.99 becomes 1999. Floating-point arithmetic introduces rounding errors that compound across thousands of transactions.",
        },
      },
      {
        type: "callout",
        callout: {
          type: "edge-case",
          title: "Idempotent Webhooks",
          content:
            "Stripe can send the same webhook twice. Use UNIQUE on stripe_payment_intent_id and only process webhooks where the order status actually changes.",
        },
      },
      {
        type: "heading",
        level: 2,
        content: "Why PostgreSQL",
      },
      {
        type: "table",
        tableHeaders: ["Pros", "Cons"],
        tableRows: [
          [
            "ACID transactions guarantee consistency",
            "Vertical scaling has limits",
          ],
          [
            "Mature tooling and operational knowledge",
            "Schema migrations require planning",
          ],
          [
            "Supports JSONB, full-text search",
            "Less flexible than document stores",
          ],
        ],
      },
      {
        type: "callout",
        callout: {
          type: "warning",
          title: "Refunded Orders Must Not Serve Downloads",
          content:
            "Always check orders.status before generating any signed URL. A refunded order returning a download is a business logic bug.",
        },
      },
      {
        type: "callout",
        callout: {
          type: "tip",
          title: "Backups",
          content:
            "Automated daily backups plus point-in-time recovery. Test restoring them quarterly. An untested backup is not a backup.",
        },
      },
    ],
    tryItYourself: {
      intro:
        "Design the database schema for Bookify and verify it by inserting real test data.",
      steps: [
        "Install PostgreSQL locally or run it with Docker: `docker run --name bookify-db -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres`.",
        "Create `packages/db/schema.sql` with tables for `Product`, `Customer`, `Order`, and `DownloadToken`.",
        "Connect with `psql` and run `\i packages/db/schema.sql`.",
        "Insert one product and one customer using `INSERT` statements.",
        "Run a `SELECT` join between `Order`, `Product`, and `Customer` to verify your relationships.",
      ],
      resources: [
        {
          label: "PostgreSQL — CREATE TABLE",
          url: "https://www.postgresql.org/docs/current/sql-createtable.html",
        },
        {
          label: "PostgreSQL — Docker image",
          url: "https://hub.docker.com/_/postgres",
        },
        {
          label: "Prisma — Data model",
          url: "https://www.prisma.io/docs/orm/prisma-schema/data-model/models",
        },
      ],
      notes: [
        {
          type: "tip",
          title: "Use a migration tool",
          content:
            "For a real project, use Prisma Migrate or Flyway instead of hand-running SQL. Migrations are versioned and repeatable.",
        },
        {
          type: "edge-case",
          title: "Seed realistic data",
          content:
            "Insert prices like 1999 and 4900, not 1 or 2. Real-looking seed data catches formatting bugs early.",
        },
      ],
    },
    bookifyExample: [
      {
        type: "heading",
        content: "Bookify Prisma Schema",
        level: 3,
      },
      {
        type: "code",
        code: {
          language: "prisma",
          filename: "packages/db/schema.prisma",
          code: `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Customer {
  id        String   @id @default(uuid())
  email     String   @unique
  createdAt DateTime @default(now()) @map("created_at")
  orders    Order[]

  @@map("customers")
}

model Product {
  id          String   @id @default(uuid())
  title       String
  fileKey     String   @map("file_key")
  priceCents  Int      @map("price_cents")
  currency    String   @default("USD")
  isActive    Boolean  @default(true) @map("is_active")
  orders      Order[]

  @@map("products")
}

model Order {
  id                    String          @id @default(uuid())
  customerId            String          @map("customer_id")
  productId             String          @map("product_id")
  status                OrderStatus     @default(pending)
  totalCents            Int             @map("total_cents")
  currency              String
  stripePaymentIntentId String?         @unique @map("stripe_payment_intent_id")
  taxCents              Int             @default(0) @map("tax_cents")
  createdAt             DateTime        @default(now()) @map("created_at")
  updatedAt             DateTime        @updatedAt @map("updated_at")
  customer              Customer        @relation(fields: [customerId], references: [id])
  product               Product         @relation(fields: [productId], references: [id])
  downloadTokens        DownloadToken[]

  @@map("orders")
}

model DownloadToken {
  id        String    @id @default(uuid())
  orderId   String    @map("order_id")
  token     String    @unique
  expiresAt DateTime  @map("expires_at")
  usedAt    DateTime? @map("used_at")
  createdAt DateTime  @default(now()) @map("created_at")
  order     Order     @relation(fields: [orderId], references: [id])

  @@map("download_tokens")
}

enum OrderStatus {
  pending
  paid
  failed
  refunded
}`,
        },
      },
      {
        type: "callout",
        callout: {
          type: "note",
          title: "Why no customer passwords?",
          content:
            "Guest checkout keeps the MVP simple. We store only an email. If we add accounts later, we can create passwords then without migrating sensitive data.",
        },
      },
      {
        type: "callout",
        callout: {
          type: "tip",
          title: "priceCents as Int",
          content:
            "$19.99 is stored as 1999. Integers avoid the rounding errors that plague floating-point money calculations.",
        },
      },
      {
        type: "callout",
        callout: {
          type: "edge-case",
          title: "OrderStatus enum over string",
          content:
            "The enum prevents invalid statuses like 'complated' from ever reaching the database. It also makes Prisma-generated types safer in the backend.",
        },
      },
    ],
  },
  {
    slug: "backend",
    number: 3,
    title: "Backend & API",
    subtitle: "Business Logic & Webhooks",
    description:
      "Build the Bookify backend, handle Stripe webhooks, generate secure download links, and enforce business rules.",
    stakeholders: [
      {
        role: "Backend Engineer",
        abbr: "BE",
        color: "#3b82f6",
        responsibility:
          "API, business logic, webhooks, security. Owns correctness and performance.",
      },
      {
        role: "Engineering Lead",
        abbr: "EL",
        color: "#06b6d4",
        responsibility:
          "Code review, architecture decisions, API contract design. Owns maintainability.",
      },
      {
        role: "Product Manager",
        abbr: "PM",
        color: "#2563eb",
        responsibility:
          "Defines business rules — refund policy, download expiry, guest checkout. Owns behavior.",
      },
      {
        role: "Security Lead",
        abbr: "SL",
        color: "#f43f5e",
        responsibility:
          "Reviews webhook verification, secrets handling, authorization. Owns risk.",
      },
    ],
    content: [
      {
        type: "text",
        content:
          "The backend is the brain of Bookify. It processes checkout, validates payments via Stripe webhooks, generates secure download links, sends emails, and enforces authorization. For the MVP we are building one Node.js service. Splitting into microservices now would be premature — one service keeps deployment, monitoring, and debugging simple.",
      },
      {
        type: "heading",
        level: 2,
        content: "API Design Decisions",
      },
      {
        type: "text",
        content:
          "- **Checkout is a POST, not a GET.** A GET could be triggered by a browser prefetch or a shared link, creating sessions unintentionally. POST makes the intent explicit.\n- **Downloads use a token, not an order ID.** The public URL never exposes the order row. The token is single-use and time-limited, so sharing a link does not share the file permanently.\n- **Webhooks return 200 only after the database transaction commits.** If the DB write fails, Stripe retries. Returning 200 early and failing later creates missing orders.\n- **Admin endpoints are protected by API key, not sessions in the MVP.** A simple `Authorization: Bearer <admin-key>` header avoids building login, password reset, and session storage for one user. Replace with proper auth when the team grows.",
      },
      {
        type: "heading",
        level: 2,
        content: "Core Endpoints",
      },
      {
        type: "code",
        code: {
          language: "text",
          filename: "API Routes",
          code: `GET    /api/products              → list active products
POST   /api/checkout              → create Stripe Checkout session
POST   /api/webhooks/stripe       → Stripe payment events
GET    /api/downloads/:token      → return signed file URL
GET    /api/admin/orders          → list orders (protected)
POST   /api/admin/orders/:id/resend → resend download email`,
        },
      },
      {
        type: "heading",
        level: 2,
        content: "Stripe Webhook Handler",
      },
      {
        type: "code",
        code: {
          language: "typescript",
          filename: "webhook-handler.ts",
          code: `import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';
import { sendDownloadEmail } from './email';

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function handleStripeWebhook(req, res) {
  const sig = req.headers['stripe-signature'];
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body, sig, process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return res.status(400).send(
      \`Webhook verification failed: \${err.message}\`
    );
  }

  if (event.type === 'payment_intent.succeeded') {
    const pi = event.data.object as Stripe.PaymentIntent;

    // Idempotency: skip if already processed
    const existing = await prisma.order.findUnique({
      where: { stripePaymentIntentId: pi.id },
    });
    if (existing?.status === 'paid') {
      return res.status(200).json({ received: true });
    }

    // Atomic transaction: customer + order + token
    const result = await prisma.$transaction(async (tx) => {
      const customer = await tx.customer.upsert({
        where: { email: pi.receipt_email! },
        update: {},
        create: { email: pi.receipt_email! },
      });
      const order = await tx.order.create({
        data: {
          customerId: customer.id,
          status: 'paid',
          totalCents: pi.amount,
          currency: pi.currency,
          stripePaymentIntentId: pi.id,
        },
      });
      const token = await tx.downloadToken.create({
        data: {
          orderId: order.id,
          token: crypto.randomUUID(),
          expiresAt: new Date(Date.now() + 7 * 86400000),
        },
      });
      return { order, customer, token };
    });

    // Email outside transaction so DB commits even if email fails
    await sendDownloadEmail(
      result.customer.email,
      result.token.token
    );
  }

  res.status(200).json({ received: true });
}`,
        },
      },
      {
        type: "callout",
        callout: {
          type: "warning",
          title: "Never Trust the Frontend",
          content:
            "A user could send price: 0 in a request. Prices, discounts, and ownership must always be verified server-side. The frontend is a suggestion, not a source of truth.",
        },
      },
      {
        type: "callout",
        callout: {
          type: "edge-case",
          title: "Partial Failures",
          content:
            "If the DB write succeeds but email fails, the order exists and can be retried. Use a job queue (Bull, SQS) for email reliability. Never roll back the order because email failed.",
        },
      },
      {
        type: "callout",
        callout: {
          type: "edge-case",
          title: "Race Conditions on Download Tokens",
          content:
            "Two parallel requests for the same token? Mark used_at atomically with WHERE used_at IS NULL. The second request gets zero rows updated.",
        },
      },
      {
        type: "table",
        tableHeaders: ["Pros of a Dedicated Backend", "Cons"],
        tableRows: [
          [
            "Clear separation of concerns",
            "Another service to deploy and monitor",
          ],
          [
            "Reusable API for web, mobile, admin",
            "More code to maintain",
          ],
          [
            "Centralized security and audit logging",
            "Adds latency vs a fully static frontend",
          ],
        ],
      },
    ],
    tryItYourself: {
      intro:
        "Build and test the Stripe webhook endpoint locally before exposing it to the internet.",
      steps: [
        "Create `apps/api/src/webhooks/stripe.ts` with a POST handler that verifies the Stripe signature.",
        "Install the Stripe CLI and run `stripe login`.",
        "Forward webhooks to your local server: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`.",
        "Create a test checkout session from the frontend and complete a payment.",
        "Check your database — exactly one `Order` and one `DownloadToken` should be created.",
        "Repeat the payment and confirm no duplicate order is created.",
      ],
      resources: [
        {
          label: "Stripe — Webhook signatures",
          url: "https://docs.stripe.com/webhooks/signatures",
        },
        {
          label: "Stripe CLI — Listen for events",
          url: "https://docs.stripe.com/cli/listen",
        },
        {
          label: "Stripe — Test mode",
          url: "https://docs.stripe.com/test-mode",
        },
      ],
      notes: [
        {
          type: "warning",
          title: "Do not trust the event type alone",
          content:
            "Signature verification proves the payload came from Stripe. Always verify signatures before acting on any event.",
        },
        {
          type: "tip",
          title: "Use a test card that fails",
          content:
            "Stripe test cards include ones that decline. Test those paths too — a failed payment should not create an order.",
        },
      ],
    },
    bookifyExample: [
      {
        type: "heading",
        content: "Bookify Checkout Session Endpoint",
        level: 3,
      },
      {
        type: "code",
        code: {
          language: "ts",
          filename: "apps/api/src/routes/checkout.ts",
          code: `import Stripe from "stripe";
import { z } from "zod";
import { prisma } from "@bookify/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

const bodySchema = z.object({
  priceId: z.string().min(1),
});

export async function createCheckoutSession(req: Request) {
  const { priceId } = bodySchema.parse(await req.json());

  const product = await prisma.product.findUnique({
    where: { id: priceId },
  });
  if (!product) throw new Error("Product not found");

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: product.currency.toLowerCase(),
          product_data: { name: product.title },
          unit_amount: product.priceCents,
        },
        quantity: 1,
      },
    ],
    success_url: \`\${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}\`,
    cancel_url: \`\${process.env.FRONTEND_URL}\`,
    metadata: { productId: product.id },
  });

  return { url: session.url };
}`,
        },
      },
      {
        type: "callout",
        callout: {
          type: "note",
          title: "Why metadata matters",
          content:
            "We pass productId in metadata so the webhook can link the Stripe session back to our product without relying on the line item name.",
        },
      },
      {
        type: "callout",
        callout: {
          type: "edge-case",
          title: "Price data vs Price ID",
          content:
            "For a catalog with many products, create Stripe Price objects once and store their IDs. For one ebook, inline price_data is simpler.",
        },
      },
    ],
  },
  {
    slug: "frontend",
    number: 4,
    title: "Frontend",
    subtitle: "Purchase Experience & UI",
    description:
      "Build the Bookify purchase experience: landing page, checkout, success screen, and download page.",
    stakeholders: [
      {
        role: "Frontend Engineer",
        abbr: "FE",
        color: "#06b6d4",
        responsibility:
          "Build pages, components, checkout integration, state management. Owns UI correctness.",
      },
      {
        role: "Designer",
        abbr: "DE",
        color: "#f472b6",
        responsibility:
          "Provides mockups, component specs, interaction patterns. Owns look and feel.",
      },
      {
        role: "Product Manager",
        abbr: "PM",
        color: "#2563eb",
        responsibility:
          "Defines conversion funnel and required user flows. Owns product behavior.",
      },
      {
        role: "QA Engineer",
        abbr: "QA",
        color: "#14b8a6",
        responsibility:
          "Tests across devices, browsers, and screen readers. Owns accessibility and cross-browser quality.",
      },
    ],
    content: [
      {
        type: "text",
        content:
          "The frontend turns the backend into a usable purchase experience. For Bookify, the storefront is deliberately small: one product, one price, one clear call to action. Mobile traffic often dominates ebook purchases, so the design starts at 375px and scales up.\n\nKey frontend decisions:\n\n- **Guest checkout first:** Accounts add friction. Readers buy one book and leave — that is fine.\n- **Single CTA above the fold:** The landing page has one job: get the reader to click Buy.\n- **Disable-after-click:** Prevents double-purchases and gives immediate feedback.\n- **No client-side payment secrets:** Stripe Checkout is hosted, so the frontend never touches card data.",
      },
      {
        type: "heading",
        level: 2,
        content: "Page Structure",
      },
      {
        type: "code",
        code: {
          language: "text",
          filename: "Routes",
          code: `/              → Landing page with book details and buy button
/checkout      → Stripe Checkout redirect or embedded form
/success       → Thank you + optional direct download
/download/:token → Fetches signed URL, triggers download
/admin         → Author dashboard (orders, revenue)`,
        },
      },
      {
        type: "heading",
        level: 2,
        content: "Landing Page Example",
      },
      {
        type: "code",
        code: {
          language: "tsx",
          filename: "app/page.tsx",
          code: `export default function LandingPage() {
  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold">
        The Art of Shipping
      </h1>
      <p className="mt-4">
        A practical guide to launching real products.
      </p>
      <p className="mt-2 font-semibold">$19.00</p>
      <form action="/api/checkout" method="POST">
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white
                     px-6 py-2 rounded"
        >
          Buy now
        </button>
      </form>
    </main>
  );
}`,
        },
      },
      {
        type: "callout",
        callout: {
          type: "edge-case",
          title: "Double-Purchase Prevention",
          content:
            "Disable the buy button after the first click and show a loading spinner. Without this, impatient users will create multiple Stripe sessions.",
        },
      },
      {
        type: "callout",
        callout: {
          type: "tip",
          title: "Guest Checkout",
          content:
            "Do not force account creation. Every extra field in checkout reduces conversion. Collect only the email via Stripe.",
        },
      },
      {
        type: "table",
        tableHeaders: ["Pros of Next.js + React", "Cons"],
        tableRows: [
          [
            "SSR for SEO and fast initial paint",
            "Complexity grows fast",
          ],
          [
            "Component reuse across pages",
            "Hydration mismatches possible",
          ],
          [
            "Excellent TypeScript DX",
            "Build times increase with size",
          ],
        ],
      },
      {
        type: "callout",
        callout: {
          type: "warning",
          title: "Security Headers",
          content:
            "Configure CSP, HSTS, X-Frame-Options, and Referrer-Policy. A frontend without security headers is an invitation for XSS and clickjacking.",
        },
      },
    ],
    tryItYourself: {
      intro:
        "Build the buyer-facing landing page and the checkout button with proper loading and disabled states.",
      steps: [
        "Create `apps/web/src/app/page.tsx` with a marketing hero, product card, and price.",
        "Add a **Buy Now** button that calls `POST /api/checkout` and redirects to Stripe Checkout.",
        "Disable the button and show a loading spinner after the first click to prevent double purchases.",
        "Open DevTools, toggle to a mobile viewport, and confirm the layout is usable at 375px width.",
        "Throttle network to **Slow 3G** and verify the button state is clear while loading.",
      ],
      resources: [
        {
          label: "Next.js — App Router pages",
          url: "https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts",
        },
        {
          label: "Stripe Checkout — Client integration",
          url: "https://docs.stripe.com/checkout/quickstart",
        },
        {
          label: "MDN — form submission UX",
          url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#disabled",
        },
      ],
      notes: [
        {
          type: "tip",
          title: "Use Stripe's test mode URL",
          content:
            "In test mode the checkout page shows a banner. That is your confirmation you are not charging real cards.",
        },
        {
          type: "edge-case",
          title: "Button state matters",
          content:
            "A disabled button with a spinner prevents accidental double clicks better than JavaScript alerts.",
        },
      ],
    },
    bookifyExample: [
      {
        type: "heading",
        content: "Bookify Checkout Button",
        level: 3,
      },
      {
        type: "code",
        code: {
          language: "tsx",
          filename: "apps/web/src/app/page.tsx",
          code: `"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

export function BuyButton({ priceId }: { priceId: string }) {
  const [loading, setLoading] = useState(false);

  async function handleBuy() {
    setLoading(true);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId }),
    });
    const { url } = await res.json();
    window.location.href = url;
  }

  return (
    <button
      onClick={handleBuy}
      disabled={loading}
      className="rounded-lg bg-blue-600 px-6 py-3 text-white disabled:opacity-50"
    >
      {loading ? "Loading..." : "Buy Now"}
    </button>
  );
}`,
        },
      },
      {
        type: "callout",
        callout: {
          type: "note",
          title: "NEXT_PUBLIC prefix",
          content:
            "Only the publishable key can be exposed to the browser. NEXT_PUBLIC_ tells Next.js to include it in client-side JavaScript. Never prefix a secret key with NEXT_PUBLIC_.",
        },
      },
    ],
  },
  {
    slug: "containers",
    number: 5,
    title: "Containers",
    subtitle: "Docker & Environment Parity",
    description:
      "Package Bookify into containers for consistent development, testing, and deployment.",
    stakeholders: [
      {
        role: "Platform / DevOps",
        abbr: "DO",
        color: "#0ea5e9",
        responsibility:
          "Dockerfile, base images, scanning, registry. Owns container standards.",
      },
      {
        role: "Backend Engineer",
        abbr: "BE",
        color: "#3b82f6",
        responsibility:
          "App starts correctly in container, health endpoints. Owns app-container compatibility.",
      },
      {
        role: "Engineering Lead",
        abbr: "EL",
        color: "#06b6d4",
        responsibility:
          "Monorepo image strategy. Owns architecture.",
      },
      {
        role: "Security Lead",
        abbr: "SL",
        color: "#f43f5e",
        responsibility:
          "Base images, user permissions, secrets injection. Owns container security.",
      },
    ],
    content: [
      {
        type: "text",
        content:
          "Containers package your application with everything it needs to run: code, runtime, system libraries, and environment configuration. They solve the \"works on my machine\" problem. For Bookify, containers mean the author can clone the repo, run one command, and have the entire app working locally — without installing PostgreSQL globally or debugging Node version mismatches.",
      },
      {
        type: "heading",
        level: 2,
        content: "Real-World Container Decisions",
      },
      {
        type: "text",
        content:
          "- **Alpine-based images** keep the final image small and reduce the attack surface.\n- **Multi-stage builds** separate the build tooling (TypeScript compiler, dev dependencies) from the runtime image. The production container only ships compiled JS and production `node_modules`.\n- **Non-root user:** The container runs as a dedicated `node` user, not root. This limits damage if the app is compromised.\n- **Health endpoint:** `/health` lets the platform know when the container is ready to receive traffic and when to restart it.\n- **`.dockerignore`:** Excludes `.env`, `node_modules`, `.next`, and local test databases so they never end up in the image.",
      },
      {
        type: "heading",
        level: 2,
        content: "Why Containers Matter",
      },
      {
        type: "text",
        content:
          "1. **Environment parity:** Same image locally, in CI, in staging, and production.\n2. **Reproducible builds:** New developers onboard in minutes.\n3. **Isolation:** No dependency conflicts with the host OS.\n4. **Portability:** Move between Render, AWS, and Fly without rewriting scripts.\n5. **Rollback:** Deploy an older image tag instantly.\n6. **Density:** Run multiple services on one host.",
      },
      {
        type: "heading",
        level: 2,
        content: "Dockerfile (Multi-Stage)",
      },
      {
        type: "code",
        code: {
          language: "dockerfile",
          filename: "Dockerfile",
          code: `# Stage 1: build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: runtime
FROM node:20-alpine
WORKDIR /app
RUN addgroup -g 1001 -S nodejs \\
 && adduser -S node -u 1001
COPY --from=builder --chown=node:nodejs /app/dist ./dist
COPY --from=builder --chown=node:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=node:nodejs /app/package*.json ./
USER node
EXPOSE 3000
CMD ["node", "dist/main.js"]`,
        },
      },
      {
        type: "heading",
        level: 2,
        content: "docker-compose for Local Dev",
      },
      {
        type: "code",
        code: {
          language: "yaml",
          filename: "docker-compose.yml",
          code: `version: "3.9"
services:
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: bookify
      POSTGRES_PASSWORD: bookify
      POSTGRES_DB: bookify_dev
    ports:
      - "5432:5432"
    volumes:
      - db_data:/var/lib/postgresql/data

  api:
    build:
      context: ./apps/api
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgres://bookify:bookify@db:5432/bookify_dev
    depends_on:
      - db

  mailpit:
    image: axllent/mailpit
    ports:
      - "1025:1025"
      - "8025:8025"

volumes:
  db_data:`,
        },
      },
      {
        type: "callout",
        callout: {
          type: "warning",
          title: "Never Bake Secrets Into Images",
          content:
            "Never COPY .env into a Docker image or hardcode secrets in the Dockerfile. Inject secrets at runtime via environment variables or a secrets manager.",
        },
      },
      {
        type: "heading",
        level: 2,
        content: "When You Need More Containers",
      },
      {
        type: "table",
        tableHeaders: ["Service", "Why"],
        tableRows: [
          ["API container", "Main backend"],
          ["Worker container", "Async email retries, reports"],
          ["Cron container", "Cleanup expired tokens, digest emails"],
          ["Redis", "Sessions, rate limits, job queues"],
          ["Reverse proxy (nginx)", "SSL termination, caching, DDoS"],
        ],
      },
      {
        type: "callout",
        callout: {
          type: "edge-case",
          title: "Graceful Shutdown",
          content:
            "Handle SIGTERM in your Node.js process to finish in-flight requests before exiting. Docker sends SIGTERM on stop; if your app ignores it, Docker sends SIGKILL after 10 seconds.",
        },
      },
      {
        type: "callout",
        callout: {
          type: "tip",
          title: "Image Scanning",
          content:
            "Use Trivy, Snyk, or Docker Scout in CI to catch OS/package CVEs before they reach production.",
        },
      },
    ],
    tryItYourself: {
      intro:
        "Containerize the Bookify API and database so the app runs the same way on every machine.",
      steps: [
        "Write a `Dockerfile` for `apps/api` using a Node base image and a multi-stage build.",
        "Create `docker-compose.yml` with two services: `api` and `db`.",
        "Add a `.dockerignore` file to exclude `node_modules`, `.next`, and `.env`.",
        "Run `docker compose up --build` and wait for both services to start.",
        "Visit `http://localhost:3000/health` and confirm a JSON health response.",
        "Run `docker compose down` and confirm both containers stop cleanly.",
      ],
      resources: [
        {
          label: "Docker — Dockerfile reference",
          url: "https://docs.docker.com/reference/dockerfile/",
        },
        {
          label: "Docker Compose — Overview",
          url: "https://docs.docker.com/compose/",
        },
        {
          label: "Node.js — Docker best practices",
          url: "https://nodejs.org/en/docs/guides/nodejs-docker-webapp",
        },
      ],
      notes: [
        {
          type: "tip",
          title: "Layer caching",
          content:
            "Copy package*.json and run npm ci before copying source. This caches dependencies and speeds up rebuilds.",
        },
        {
          type: "warning",
          title: "Do not bake secrets into images",
          content:
            "Images are not secret. Pass environment variables at runtime, not via ENV instructions with real values.",
        },
      ],
    },
    bookifyExample: [
      {
        type: "heading",
        content: "Bookify Local Compose",
        level: 3,
      },
      {
        type: "code",
        code: {
          language: "yaml",
          filename: "docker-compose.yml",
          code: `version: "3.9"
services:
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: bookify
      POSTGRES_PASSWORD: bookify
      POSTGRES_DB: bookify_dev
    ports:
      - "5432:5432"
    volumes:
      - db_data:/var/lib/postgresql/data

  api:
    build:
      context: ./apps/api
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgres://bookify:bookify@db:5432/bookify_dev
      NODE_ENV: development
    depends_on:
      - db

  mailpit:
    image: axllent/mailpit
    ports:
      - "1025:1025"
      - "8025:8025"

volumes:
  db_data:`,
        },
      },
    ],
  },
  {
    slug: "object-storage",
    number: 6,
    title: "Object Storage",
    subtitle: "File Delivery & Signed URLs",
    description:
      "Store the ebook in object storage and serve it through signed, time-limited URLs.",
    stakeholders: [
      {
        role: "Backend Engineer",
        abbr: "BE",
        color: "#3b82f6",
        responsibility:
          "Upload flow, signed URL generation, key naming. Owns file delivery logic.",
      },
      {
        role: "DevOps / Platform",
        abbr: "DO",
        color: "#0ea5e9",
        responsibility:
          "Bucket policy, CDN, lifecycle rules, cost monitoring. Owns storage infrastructure.",
      },
      {
        role: "Security Lead",
        abbr: "SL",
        color: "#f43f5e",
        responsibility:
          "Reviews bucket permissions and encryption. Owns data protection.",
      },
    ],
    content: [
      {
        type: "text",
        content:
          "The ebook file should not live in your Git repo or Docker image. Use object storage with presigned URLs to deliver files securely. For Bookify, the choice of provider matters because ebook downloads are egress-heavy: if a popular post drives 10,000 downloads, egress fees can dominate your bill.",
      },
      {
        type: "heading",
        level: 2,
        content: "Provider Decision",
      },
      {
        type: "text",
        content:
          "- **Cloudflare R2:** S3-compatible, zero egress fees. Best for a bootstrapped product where cost predictability matters.\n- **AWS S3:** Industry standard, rich features, but egress can be expensive at scale. Good if you already live in AWS.\n- **Backblaze B2:** Very cheap storage, but bandwidth caps and pricing change based on integration partners.\n\nFor the MVP, R2 wins on cost. Migration later is straightforward because the code uses the S3 SDK.",
      },
      {
        type: "heading",
        level: 2,
        content: "Download Flow",
      },
      {
        type: "text",
        content:
          "1. Author uploads `ebook.pdf` to a **private** bucket.\n2. Database stores the `file_key` (path in bucket).\n3. Verified buyer requests download → backend generates a presigned URL valid for 15 minutes.\n4. Browser downloads directly from object storage, not through your backend.",
      },
      {
        type: "heading",
        level: 2,
        content: "Signed URL Generation",
      },
      {
        type: "code",
        code: {
          language: "typescript",
          filename: "storage.ts",
          code: `import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3 = new S3Client({ region: process.env.AWS_REGION });

export async function getSignedDownloadUrl(fileKey: string) {
  const command = new GetObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: fileKey,
  });
  return getSignedUrl(s3, command, { expiresIn: 900 });
}`,
        },
      },
      {
        type: "callout",
        callout: {
          type: "warning",
          title: "Never Make the Bucket Public",
          content:
            "A public bucket means anyone with the URL can download the ebook forever. Use presigned URLs with short expiration windows.",
        },
      },
      {
        type: "callout",
        callout: {
          type: "edge-case",
          title: "File Versioning",
          content:
            "Enable bucket versioning so updating the ebook doesn't silently overwrite the old file. Keep old versions for refund disputes or legal issues.",
        },
      },
      {
        type: "callout",
        callout: {
          type: "tip",
          title: "CDN for Speed",
          content:
            "Put CloudFront or Cloudflare in front of the bucket for global download speed. Set correct Content-Type and Content-Disposition headers.",
        },
      },
    ],
    tryItYourself: {
      intro:
        "Set up private object storage for the ebook files and practice generating time-limited download links.",
      steps: [
        "Sign up for Cloudflare R2 or AWS S3 and create a private bucket named `bookify-ebooks`.",
        "Upload a test PDF file through the web console or CLI.",
        "Create an API key with read access only to that bucket.",
        "From your backend, generate a signed URL that expires in 15 minutes.",
        "Open the signed URL in a browser — the download should work.",
        "Wait 15 minutes and confirm the same URL returns an expired/error response.",
      ],
      resources: [
        {
          label: "Cloudflare R2 — Getting started",
          url: "https://developers.cloudflare.com/r2/get-started/",
        },
        {
          label: "AWS S3 — Presigned URLs",
          url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html",
        },
        {
          label: "Backblaze B2 — Signed URLs",
          url: "https://www.backblaze.com/docs/cloud-storage-generate-a-presigned-url-with-the-native-api",
        },
      ],
      notes: [
        {
          type: "tip",
          title: "Scope the API key tightly",
          content:
            "Give the backend key only read access to the bucket. It never needs to delete or list all files.",
        },
        {
          type: "edge-case",
          title: "Test the expiration",
          content:
            "Set the timeout to 60 seconds during testing so you do not wait 15 minutes to confirm expiry works.",
        },
      ],
    },
    bookifyExample: [
      {
        type: "heading",
        content: "Bookify Signed URL Handler",
        level: 3,
      },
      {
        type: "code",
        code: {
          language: "ts",
          filename: "apps/api/src/storage.ts",
          code: `import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY!,
    secretAccessKey: process.env.S3_SECRET_KEY!,
  },
});

export async function createSignedDownloadUrl(key: string) {
  const command = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: key,
  });
  return getSignedUrl(s3, command, { expiresIn: 900 });
}`,
        },
      },
    ],
  },
  {
    slug: "email",
    number: 7,
    title: "Email Delivery",
    subtitle: "Transactional Email & Reliability",
    description:
      "Send the Bookify download link reliably after purchase.",
    stakeholders: [
      {
        role: "Backend Engineer",
        abbr: "BE",
        color: "#3b82f6",
        responsibility:
          "Provider integration, templating, retry logic. Owns delivery code.",
      },
      {
        role: "Founder / Marketing",
        abbr: "FO",
        color: "#f59e0b",
        responsibility:
          "Email copy, branding, sender identity. Owns messaging.",
      },
      {
        role: "Security / Compliance",
        abbr: "SC",
        color: "#f43f5e",
        responsibility:
          "Unsubscribe handling, PII, privacy. Owns compliance.",
      },
    ],
    content: [
      {
        type: "text",
        content:
          "After payment, the buyer needs the ebook. Email is the simplest durable delivery channel — it works even if the browser tab is closed. But 'send email' is not enough. The email must actually arrive, not land in spam, and not expose private information.",
      },
      {
        type: "heading",
        level: 2,
        content: "Deliverability Reality Check",
      },
      {
        type: "text",
        content:
          "Modern inboxes are aggressive. To reach Gmail or Outlook reliably you need three DNS records on your sending domain:\n\n- **SPF** tells receiving servers which IPs are allowed to send mail for your domain.\n- **DKIM** cryptographically signs your emails so they cannot be altered in transit.\n- **DMARC** tells receivers what to do if SPF or DKIM fail and enables reporting.\n\nWithout these, even a perfectly coded email service will end up in spam. Configure them before launch.",
      },
      {
        type: "heading",
        level: 2,
        content: "Email Sender",
      },
      {
        type: "code",
        code: {
          language: "typescript",
          filename: "email.ts",
          code: `import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendDownloadEmail(
  email: string,
  token: string
) {
  const downloadUrl = \`\${process.env.APP_URL}/download/\${token}\`;

  await resend.emails.send({
    from: 'Bookify <orders@bookify.example>',
    to: email,
    subject: 'Your Bookify ebook download',
    html: \`
      <h1>Thank you for your purchase!</h1>
      <p><a href="\${downloadUrl}">Download now</a></p>
      <p>This link expires in 7 days.</p>
    \`,
    text: \`Download your ebook: \${downloadUrl}\`,
  });
}`,
        },
      },
      {
        type: "callout",
        callout: {
          type: "edge-case",
          title: "Idempotent Emails",
          content:
            "Track emailSentAt on the order to avoid sending duplicate emails when webhooks fire twice.",
        },
      },
      {
        type: "callout",
        callout: {
          type: "warning",
          title: "Email DNS Configuration",
          content:
            "Configure SPF, DKIM, and DMARC on your sending domain. Without these, emails land in spam — defeating the purpose of email delivery.",
        },
      },
      {
        type: "callout",
        callout: {
          type: "tip",
          title: "Always Include Plain Text",
          content:
            "Every HTML email must have a plain-text version. Some email clients strip HTML, and it helps deliverability scores.",
        },
      },
    ],
    tryItYourself: {
      intro:
        "Configure local email testing so you can preview transactional emails without sending real messages.",
      steps: [
        "Run Mailpit with Docker: `docker run -d --name mailpit -p 1025:1025 -p 8025:8025 axllent/mailpit`.",
        "In your backend, point the SMTP host to `localhost:1025`.",
        "Create an email template for the Bookify download receipt with both HTML and plain-text parts.",
        "Trigger the email from your webhook handler or a test script.",
        "Open `http://localhost:8025` and verify the email renders correctly.",
        "Check that the download link in the email points to your signed URL.",
      ],
      resources: [
        {
          label: "Mailpit — Documentation",
          url: "https://mailpit.axllent.org/docs/",
        },
        {
          label: "MDN — Multipurpose Internet Mail Extensions",
          url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types",
        },
        {
          label: "Resend — Node.js quickstart",
          url: "https://resend.com/docs/send-with-nodejs",
        },
      ],
      notes: [
        {
          type: "tip",
          title: "Plain text is not optional",
          content:
            "Spam filters and accessibility tools rely on the plain-text part. It takes two minutes and raises deliverability.",
        },
        {
          type: "edge-case",
          title: "Email can fail silently",
          content:
            "Always log send failures and surface them in your admin dashboard. A buyer with no email will contact support.",
        },
      ],
    },
    bookifyExample: [
      {
        type: "heading",
        content: "Bookify Email DNS Records",
        level: 3,
      },
      {
        type: "code",
        code: {
          language: "text",
          filename: "DNS records for bookify.example.com",
          code: `Type: TXT
Host: @
Value: v=spf1 include:_spf.resend.com ~all

Type: TXT
Host: resend._domainkey
Value: v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQ...

Type: TXT
Host: _dmarc
Value: v=DMARC1; p=quarantine; rua=mailto:dmarc@bookify.example.com; pct=100`,
        },
      },
      {
        type: "callout",
        callout: {
          type: "note",
          title: "Replace placeholders",
          content:
            "The DKIM public key comes from your email provider. The DMARC report address should be a real mailbox you monitor.",
        },
      },
    ],
  },
  {
    slug: "cicd",
    number: 8,
    title: "CI/CD",
    subtitle: "Automated Testing & Deployment",
    description:
      "Automate testing, building, scanning, and deploying Bookify with GitHub Actions.",
    stakeholders: [
      {
        role: "DevOps / Platform",
        abbr: "DO",
        color: "#0ea5e9",
        responsibility:
          "Pipeline setup, deployment scripts, environments, secrets. Owns CI/CD infrastructure.",
      },
      {
        role: "Backend / Frontend Engineers",
        abbr: "EN",
        color: "#3b82f6",
        responsibility:
          "Keep tests green, fix flaky tests, respect merge checks. Owns code quality.",
      },
      {
        role: "Engineering Lead",
        abbr: "EL",
        color: "#06b6d4",
        responsibility:
          "Defines branching strategy, deployment approval gates. Owns release process.",
      },
      {
        role: "QA Engineer",
        abbr: "QA",
        color: "#14b8a6",
        responsibility:
          "Ensures test coverage and acceptance criteria are met before release. Owns release readiness.",
      },
    ],
    content: [
      {
        type: "text",
        content:
          "CI/CD automates the risky, repetitive parts of shipping: test, build, scan, deploy. For Bookify, the pipeline runs on every pull request and every merge to main. This means a bug caught in a PR never reaches production.",
      },
      {
        type: "heading",
        level: 2,
        content: "Pipeline Decisions",
      },
      {
        type: "text",
        content:
          "- **Pull-request gates run lint, typecheck, unit tests, and build.** This is the fastest feedback loop.\n- **Main-branch deploys to staging automatically.** Staging should mirror production configuration as closely as possible.\n- **Production deploys require a manual approval gate or a tagged release.** For a solo project this can be as simple as merging a `release` branch; for a team, add an explicit approver.\n- **Secrets are never hard-coded.** Use repository secrets or OIDC to pass API keys to the workflow.\n- **Build artifacts are tagged with the git SHA.** If a deploy breaks, you can roll back to the exact previous image.",
      },
      {
        type: "heading",
        level: 2,
        content: "GitHub Actions Workflow",
      },
      {
        type: "code",
        code: {
          language: "yaml",
          filename: ".github/workflows/ci.yml",
          code: `name: CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16-alpine
        env:
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run test:integration

  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: |
          docker build -t bookify/api:\${{ github.sha }} .
          docker push bookify/api:\${{ github.sha }}
      - run: ./scripts/deploy.sh \${{ github.sha }}`,
        },
      },
      {
        type: "callout",
        callout: {
          type: "warning",
          title: "Run Migrations Separately",
          content:
            "Run database migrations in a separate CI job before deploying new app code. If the new code deploys first, it will crash trying to access columns that don't exist yet.",
        },
      },
      {
        type: "callout",
        callout: {
          type: "edge-case",
          title: "Secrets in CI",
          content:
            "Use GitHub repository secrets, OIDC tokens, or a vault. Never commit secrets to the repository, even in CI workflow files.",
        },
      },
      {
        type: "callout",
        callout: {
          type: "tip",
          title: "Feature Flags",
          content:
            "Decouple deployment from release. Ship code behind a flag, enable it when ready, disable without redeploying if something breaks.",
        },
      },
      {
        type: "table",
        tableHeaders: ["Pros", "Cons"],
        tableRows: [
          ["Catches bugs before production", "Initial setup takes time"],
          [
            "Deployments become routine and low-risk",
            "Requires discipline — flaky tests erode trust",
          ],
          [
            "Fast rollbacks via tagged images",
            "Build minutes cost money at scale",
          ],
        ],
      },
    ],
    tryItYourself: {
      intro:
        "Automate code quality checks so every pull request is validated before it can merge.",
      steps: [
        "Create `.github/workflows/ci.yml` in the root of your repository.",
        "Add a job that checks out the repo, installs Node, and runs `npm install`.",
        "Run `npm run lint` and `npm run build` in the workflow.",
        "If you have tests, add a step that runs `npm run test`.",
        "Push the workflow to a branch and open a pull request.",
        "Verify the workflow appears under the **Actions** tab and passes.",
      ],
      resources: [
        {
          label: "GitHub Actions — Workflow syntax",
          url: "https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions",
        },
        {
          label: "GitHub Actions — Node.js workflow",
          url: "https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-nodejs",
        },
        {
          label: "Turborepo — CI guide",
          url: "https://turbo.build/repo/docs/crafting-your-repository/configuring-ci",
        },
      ],
      notes: [
        {
          type: "tip",
          title: "Fail fast on lint",
          content:
            "Put lint and typecheck before tests and build. They are fast and catch obvious issues early.",
        },
        {
          type: "warning",
          title: "Do not auto-deploy on the first PR",
          content:
            "Get CI passing first, then add deploy steps. Debugging CI and deployment at the same time is painful.",
        },
      ],
    },
    bookifyExample: [
      {
        type: "heading",
        content: "Bookify Staging Deploy Workflow",
        level: 3,
      },
      {
        type: "code",
        code: {
          language: "yaml",
          filename: ".github/workflows/deploy-staging.yml",
          code: `name: Deploy to Staging

on:
  push:
    branches: [main]

jobs:
  checks:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run lint
      - run: npm run build
      - run: npm run test

  deploy:
    needs: checks
    runs-on: ubuntu-latest
    environment: staging
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to Railway
        run: railway up --service bookify-api --environment staging
        env:
          RAILWAY_TOKEN: \${{ secrets.RAILWAY_TOKEN }}`,
        },
      },
    ],
  },
  {
    slug: "infrastructure",
    number: 9,
    title: "Infrastructure",
    subtitle: "Hosting, DNS & Scaling",
    description:
      "Run Bookify in production with the right hosting, DNS, SSL, and scaling strategy.",
    stakeholders: [
      {
        role: "DevOps / Platform",
        abbr: "DO",
        color: "#0ea5e9",
        responsibility:
          "Provisions and manages infrastructure, networking, SSL, scaling. Owns uptime and cost.",
      },
      {
        role: "Engineering Lead",
        abbr: "EL",
        color: "#06b6d4",
        responsibility:
          "Architecture decisions, vendor selection, disaster recovery. Owns reliability strategy.",
      },
      {
        role: "Founder / CTO",
        abbr: "CT",
        color: "#f59e0b",
        responsibility:
          "Approves hosting budget and acceptable downtime. Owns business risk.",
      },
    ],
    content: [
      {
        type: "text",
        content:
          "You now need a live environment that users can reach. The right choice depends on your team size, traffic patterns, and budget. For Bookify, we are optimizing for shipping speed, not maximum scale. A PaaS beats self-managed Kubernetes when the team is small.",
      },
      {
        type: "heading",
        level: 2,
        content: "Environment Strategy",
      },
      {
        type: "text",
        content:
          "Bookify uses three environments:\n\n- **Local:** Docker Compose with Postgres, API, and Mailpit. Developers run everything on their machine.\n- **Staging:** Deployed from the `main` branch. Uses real third-party services in **test mode** (Stripe test keys, Resend test domain). This is where final smoke tests happen.\n- **Production:** Deployed from a tagged release or a `release` branch. Uses live keys and a real sending domain. No test data.\n\nKeep environment configuration in environment variables, never in code. The same Docker image runs in staging and production; only the env vars change.",
      },
      {
        type: "heading",
        level: 2,
        content: "Deployment Options",
      },
      {
        type: "table",
        tableHeaders: ["Approach", "Best For", "Example"],
        tableRows: [
          [
            "PaaS",
            "Fastest setup, small team",
            "Render, Railway, Fly.io",
          ],
          [
            "Serverless",
            "Variable traffic, pay-per-use",
            "Vercel + Lambda / Cloud Run",
          ],
          [
            "Managed Containers",
            "More control, multiple services",
            "ECS, GKE, DigitalOcean",
          ],
          [
            "Kubernetes",
            "Many microservices, complex scaling",
            "Not needed for Bookify",
          ],
        ],
      },
      {
        type: "callout",
        callout: {
          type: "tip",
          title: "Start Simple",
          content:
            "You do not need Kubernetes to sell one ebook. Start with a PaaS (Railway or Fly), upgrade if you outgrow it.",
        },
      },
      {
        type: "callout",
        callout: {
          type: "warning",
          title: "HTTPS Is Mandatory",
          content:
            "Use managed certificates only (Let's Encrypt, Cloudflare, AWS ACM). Never ship an HTTP-only site. Browsers will warn users and search engines will penalize you.",
        },
      },
      {
        type: "callout",
        callout: {
          type: "edge-case",
          title: "Cost Guards",
          content:
            "Set billing alerts on every cloud service. A misconfigured S3 bucket or runaway Lambda can cost thousands before you notice.",
        },
      },
      {
        type: "callout",
        callout: {
          type: "edge-case",
          title: "Database Connection Limits",
          content:
            "If multiple app instances connect to one Postgres database, use a connection pooler (PgBouncer) to avoid exhausting connections.",
        },
      },
    ],
    tryItYourself: {
      intro:
        "Deploy the Bookify backend to a managed platform and verify HTTPS and environment variables work.",
      steps: [
        "Choose a platform (Railway, Fly.io, or Render) and create an account.",
        "Connect your GitHub repository and select the `apps/api` folder as the deploy target.",
        "Add environment variables for `DATABASE_URL`, `STRIPE_SECRET_KEY`, and `WEBHOOK_SECRET`.",
        "Trigger a deploy and check the build logs for errors.",
        "Visit the deployed `/health` endpoint in a browser.",
        "Add a custom domain if available and confirm the browser shows a valid HTTPS padlock.",
      ],
      resources: [
        {
          label: "Railway — Deploy from GitHub",
          url: "https://docs.railway.app/deploy/deploy-from-github",
        },
        {
          label: "Fly.io — Hands-on with Fly",
          url: "https://fly.io/docs/hands-on/",
        },
        {
          label: "Render — Deploy a Node.js app",
          url: "https://docs.render.com/deploy-node-express-app",
        },
      ],
      notes: [
        {
          type: "tip",
          title: "Staging should use real services in test mode",
          content:
            "Use Stripe test keys, a test email domain, and a separate storage bucket. The goal is production-like without production money.",
        },
        {
          type: "warning",
          title: "Do not share production secrets with staging",
          content:
            "If staging is compromised, you do not want live API keys exposed. Use scoped test keys whenever possible.",
        },
      ],
    },
    bookifyExample: [
      {
        type: "heading",
        content: "Bookify Environment Variables",
        level: 3,
      },
      {
        type: "code",
        code: {
          language: "text",
          filename: "apps/api/.env.example",
          code: `DATABASE_URL=postgresql://bookify:bookify@localhost:5432/bookify_dev
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
RESEND_API_KEY=re_...
S3_ENDPOINT=https://...
S3_BUCKET=bookify-ebooks
S3_ACCESS_KEY_ID=...
S3_SECRET_ACCESS_KEY=...
PORT=3000`,
        },
      },
      {
        type: "callout",
        callout: {
          type: "warning",
          title: "Commit the example, not the secrets",
          content:
            "Keep .env.example in git so new developers know what to set. Never commit the real .env file.",
        },
      },
    ],
  },
  {
    slug: "observability",
    number: 10,
    title: "Observability",
    subtitle: "Logs, Metrics & Alerts",
    description:
      "Instrument Bookify so you can detect, debug, and fix problems quickly.",
    stakeholders: [
      {
        role: "DevOps / SRE",
        abbr: "SR",
        color: "#0ea5e9",
        responsibility:
          "Log aggregation, dashboards, paging. Owns observability platform.",
      },
      {
        role: "Backend Engineer",
        abbr: "BE",
        color: "#3b82f6",
        responsibility:
          "Emits structured logs and metrics from application code. Owns instrumentation.",
      },
      {
        role: "Engineering Lead",
        abbr: "EL",
        color: "#06b6d4",
        responsibility:
          "Defines SLOs (e.g. 99.9% checkout success). Owns reliability targets.",
      },
      {
        role: "Founder / PM",
        abbr: "PM",
        color: "#2563eb",
        responsibility:
          "Defines which metrics matter for the business. Owns business dashboards.",
      },
    ],
    content: [
      {
        type: "text",
        content:
          'When a buyer says "I paid but didn\'t get my book," you need to reconstruct the exact transaction in seconds, not hours. Observability is not just collecting logs — it is designing your system so every important event is queryable and every failure is visible before a customer reports it.',
      },
      {
        type: "heading",
        level: 2,
        content: "What to Alert On",
      },
      {
        type: "text",
        content:
          "Avoid alerting on CPU or memory unless you have proven they cause user-facing failures. For Bookify, the most meaningful alerts are:\n\n- **Checkout success rate < 99% over 5 minutes.** This directly measures lost revenue.\n- **Webhook handler error rate > 1%.** Failed webhooks mean missing orders.\n- **Download success rate < 95%.** If buyers cannot download, support tickets spike.\n- **Email send failures > 5%.** No email means no download link.\n- **Database connection errors.** Usually an upstream outage or connection pool exhaustion.\n\nEach alert should have a runbook: where to look, what to try, and who to escalate to.",
      },
      {
        type: "heading",
        level: 2,
        content: "The Three Pillars",
      },
      {
        type: "table",
        tableHeaders: ["Pillar", "Example for Bookify"],
        tableRows: [
          [
            "Logs",
            "\"Payment intent pi_123 succeeded for order abc\"",
          ],
          [
            "Metrics",
            "Checkout success rate, p95 latency, error rate",
          ],
          [
            "Traces",
            "Request from click → API → Stripe → email → response",
          ],
        ],
      },
      {
        type: "callout",
        callout: {
          type: "warning",
          title: "Never Log PII",
          content:
            "Redact emails, IP addresses, and card tokens from logs. Log order_id and payment_intent_id — those are safe and useful for debugging.",
        },
      },
      {
        type: "callout",
        callout: {
          type: "tip",
          title: "Alert on Symptoms, Not Causes",
          content:
            "Page your on-call when checkout success rate drops below 99%, not when CPU usage is high. High CPU might not affect users; low success rate always does.",
        },
      },
      {
        type: "callout",
        callout: {
          type: "edge-case",
          title: "On-Call Rotation",
          content:
            "Alerts without an on-call responder are useless. Define who responds and when, even if the team is small.",
        },
      },
    ],
    tryItYourself: {
      intro:
        "Add structured logging to the webhook handler so you can debug payments without guessing.",
      steps: [
        "Pick a logger (Pino is fast and JSON-first) and install it in `apps/api`.",
        "In the Stripe webhook handler, log an object with `payment_intent_id`, `order_id`, and `event.type`.",
        "Trigger a test payment and view the logs in your terminal or platform dashboard.",
        "Search the logs for a specific `order_id` and confirm every step is recorded.",
        "Add a log line for failures so unhandled webhook errors are visible.",
      ],
      resources: [
        {
          label: "Pino — Node.js logger",
          url: "https://getpino.io/#/docs/getting-started",
        },
        {
          label: "OpenTelemetry — Concepts",
          url: "https://opentelemetry.io/docs/concepts/",
        },
        {
          label: "Stripe — Best practices for webhooks",
          url: "https://docs.stripe.com/webhooks/quickstart",
        },
      ],
      notes: [
        {
          type: "tip",
          title: "Use correlation IDs",
          content:
            "Add a request ID to every log line so you can trace one purchase from click to email.",
        },
        {
          type: "warning",
          title: "Never log PII",
          content:
            "Log order_id and payment_intent_id. Redact emails, IPs, and anything that could identify a person.",
        },
      ],
    },
    bookifyExample: [
      {
        type: "heading",
        content: "Bookify Structured Log Example",
        level: 3,
      },
      {
        type: "code",
        code: {
          language: "json",
          filename: "api logs",
          code: `{
  "level": "info",
  "msg": "checkout.completed",
  "order_id": "550e8400-e29b-41d4-a716-446655440000",
  "payment_intent_id": "pi_3O...",
  "event_type": "payment_intent.succeeded",
  "duration_ms": 124,
  "timestamp": "2026-01-14T09:23:11.004Z"
}`,
        },
      },
    ],
  },
  {
    slug: "security",
    number: 11,
    title: "Security",
    subtitle: "Defense in Depth",
    description:
      "Protect Bookify's users, payments, admin access, and business continuity.",
    stakeholders: [
      {
        role: "Security Lead",
        abbr: "SL",
        color: "#f43f5e",
        responsibility:
          "Threat modeling, security reviews, incident response. Owns security posture.",
      },
      {
        role: "Backend Engineer",
        abbr: "BE",
        color: "#3b82f6",
        responsibility:
          "Implements auth, validation, secure headers, encryption. Owns secure code.",
      },
      {
        role: "DevOps",
        abbr: "DO",
        color: "#0ea5e9",
        responsibility:
          "Network security, secrets, scanning, patching. Owns infrastructure security.",
      },
      {
        role: "Founder / Legal",
        abbr: "FL",
        color: "#f59e0b",
        responsibility:
          "Reviews terms, privacy policy, compliance scope. Owns legal risk.",
      },
    ],
    content: [
      {
        type: "text",
        content:
          "Security is not a feature. It is a property of the system. For Bookify, the most likely attacks are not exotic zero-days: they are leaked API keys, missing webhook signature checks, open admin endpoints, and accidental data exposure. A small team can prevent most of these with discipline, not enterprise tooling.\n\nStart with a simple threat model:\n\n1. **What data do we protect?** Customer email, purchase history, payment references, and the ebook file itself.\n2. **What is the impact of a breach?** Reputational damage, chargebacks, possible legal exposure, loss of author revenue.\n3. **What are the most likely attack paths?** Phished admin credentials, unvalidated webhooks, public S3/R2 bucket, dependency CVE, brute-force admin endpoint.\n4. **What controls map to each path?** MFA and strong admin secrets, webhook signature verification, private bucket + signed URLs, dependency scanning, rate limiting.",
      },
      {
        type: "heading",
        level: 2,
        content: "Security Checklist",
      },
      {
        type: "table",
        tableHeaders: ["Layer", "Control"],
        tableRows: [
          ["Transport", "TLS 1.2+, HSTS, secure cookies"],
          [
            "Authentication",
            "Admin dashboard with strong auth + MFA",
          ],
          [
            "Authorization",
            "Users see only their own orders/downloads",
          ],
          [
            "Input Validation",
            "Zod/Joi schemas, parameterized queries",
          ],
          [
            "Secrets",
            "Vault or cloud secret managers, never in code",
          ],
          [
            "Dependencies",
            "Dependabot, Snyk, npm audit in CI",
          ],
          [
            "File Delivery",
            "Presigned URLs, private buckets",
          ],
          [
            "Payments",
            "Stripe Checkout — never touch raw card data",
          ],
        ],
      },
      {
        type: "callout",
        callout: {
          type: "edge-case",
          title: "PCI Scope",
          content:
            "Using Stripe Checkout keeps you mostly out of PCI scope. The moment you handle raw card numbers, you are in scope for PCI DSS — a massive compliance burden.",
        },
      },
      {
        type: "callout",
        callout: {
          type: "warning",
          title: "SQL Injection",
          content:
            "Use an ORM (Prisma) or parameterized queries exclusively. Never concatenate user input into SQL strings. One injection can expose your entire database.",
        },
      },
      {
        type: "callout",
        callout: {
          type: "tip",
          title: "Secrets Rotation",
          content:
            "Plan to rotate API keys at least annually. Automate rotation where possible. A leaked key that never rotates is a ticking time bomb.",
        },
      },
      {
        type: "callout",
        callout: {
          type: "note",
          title: "Incident Response",
          content:
            "Have a runbook for suspected breaches, including notification timelines. GDPR requires notifying authorities within 72 hours of discovery.",
        },
      },
    ],
    tryItYourself: {
      intro:
        "Audit your dependencies and set up automated alerts so vulnerabilities do not go unnoticed.",
      steps: [
        "Run `npm audit` in the project root and read the report.",
        "Identify any high or critical severity advisories.",
        "Run `npm audit fix` for safe fixes, or review manual updates for breaking changes.",
        "Open your GitHub repo → **Settings → Security → Code security and analysis**.",
        "Enable **Dependabot alerts** and **Dependabot security updates**.",
        "Verify that any remaining issues are documented as accepted risks.",
      ],
      resources: [
        {
          label: "npm — npm audit",
          url: "https://docs.npmjs.com/cli/v10/commands/npm-audit",
        },
        {
          label: "GitHub — Dependabot quickstart",
          url: "https://docs.github.com/en/code-security/getting-started/dependabot-quickstart-guide",
        },
        {
          label: "OWASP — Dependency-Check",
          url: "https://owasp.org/www-project-dependency-check/",
        },
      ],
      notes: [
        {
          type: "tip",
          title: "Fix high-severity issues first",
          content:
            "Not every audit warning is critical. Focus on dependencies in your production dependency tree, not dev-only tools.",
        },
        {
          type: "warning",
          title: "Do not blindly npm audit fix",
          content:
            "Automated fixes can upgrade packages with breaking changes. Review changelogs and run tests after major bumps.",
        },
      ],
    },
    bookifyExample: [
      {
        type: "heading",
        content: "Bookify Secure Headers Middleware",
        level: 3,
      },
      {
        type: "code",
        code: {
          language: "ts",
          filename: "apps/api/src/middleware/security.ts",
          code: `export function securityHeaders(req: Request, res: Response, next: NextFunction) {
  // Prevent clickjacking
  res.setHeader("X-Frame-Options", "DENY");
  // Enforce HTTPS in supported browsers
  res.setHeader("Strict-Transport-Security", "max-age=63072000; includeSubDomains");
  // Stop MIME-type sniffing
  res.setHeader("X-Content-Type-Options", "nosniff");
  // Referrer policy for privacy
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  // Restrict what the page can do
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self'; object-src 'none'; frame-ancestors 'none';"
  );
  next();
}`,
        },
      },
    ],
  },
  {
    slug: "testing",
    number: 12,
    title: "Testing",
    subtitle: "Confidence Through Verification",
    description:
      "Verify that Bookify works, stays working, and handles failure gracefully.",
    stakeholders: [
      {
        role: "QA / Test Engineer",
        abbr: "QA",
        color: "#14b8a6",
        responsibility:
          "Test strategy, E2E suites, manual acceptance. Owns quality.",
      },
      {
        role: "Backend / Frontend Engineers",
        abbr: "EN",
        color: "#3b82f6",
        responsibility:
          "Unit and integration tests alongside their code. Owns code-level correctness.",
      },
      {
        role: "Engineering Lead",
        abbr: "EL",
        color: "#06b6d4",
        responsibility:
          "Coverage targets, flaky-test policy, release gates. Owns testing standards.",
      },
    ],
    content: [
      {
        type: "text",
        content:
          "Tests are how you ship with confidence. A test suite is not about reaching 100% coverage — it is about verifying the behavior that matters. For Bookify, the riskiest behavior is the purchase flow: a reader pays, the order is recorded, the email is sent, and the download works. Tests should concentrate there.\n\nStart with the most valuable tests first:\n\n1. **Integration test for the webhook:** This exercises the database, business logic, and email stub together. If this passes, the most critical path works.\n2. **Unit tests for pure logic:** Token generation, price formatting, date checks.\n3. **E2E smoke test:** One Playwright test that buys the book end-to-end in staging.\n4. **Load test:** Only if you expect a traffic spike. For 100 sales a day, a load test is theater.",
      },
      {
        type: "heading",
        level: 2,
        content: "Test Pyramid",
      },
      {
        type: "table",
        tableHeaders: ["Layer", "Example", "Owner"],
        tableRows: [
          [
            "Unit",
            "Price calculation, token validation",
            "Engineer",
          ],
          [
            "Integration",
            "POST /checkout creates order + token",
            "Backend + QA",
          ],
          [
            "Contract",
            "API request/response shapes match",
            "Backend + Frontend",
          ],
          [
            "E2E",
            "Playwright: visitor buys ebook",
            "QA",
          ],
          [
            "Load",
            "100 concurrent purchases",
            "Platform / SRE",
          ],
          [
            "Security",
            "Dependency scans, OWASP ZAP",
            "Security Lead",
          ],
        ],
      },
      {
        type: "callout",
        callout: {
          type: "warning",
          title: "Never Use Live APIs in Tests",
          content:
            "Use Stripe test mode and test webhook signatures. Mock external services. A test that hits a live payment API is a production incident waiting to happen.",
        },
      },
      {
        type: "callout",
        callout: {
          type: "edge-case",
          title: "Flaky Tests",
          content:
            "A flaky test is worse than no test — it teaches the team to ignore failures. Quarantine flaky tests, fix them within a sprint, or delete them.",
        },
      },
      {
        type: "callout",
        callout: {
          type: "tip",
          title: "Use data-testid",
          content:
            "In E2E tests, use data-testid attributes instead of CSS selectors. CSS changes break tests for no functional reason.",
        },
      },
    ],
    tryItYourself: {
      intro:
        "Write an end-to-end integration test that proves the entire purchase flow works.",
      steps: [
        "Set up a test database that resets before each test run.",
        "Write a test helper that signs a fake Stripe event with your webhook secret.",
        "POST the signed event to `/api/webhooks/stripe`.",
        "Assert the response status is 200 and the database contains one new `Order`.",
        "Assert a `DownloadToken` was created and is linked to the order.",
        "Run the test with `npm run test` and ensure it passes reliably.",
      ],
      resources: [
        {
          label: "Stripe — Testing webhooks",
          url: "https://docs.stripe.com/webhooks/signatures#verify-official-libraries",
        },
        {
          label: "Vitest — Getting started",
          url: "https://vitest.dev/guide/",
        },
        {
          label: "Prisma — Testing guide",
          url: "https://www.prisma.io/docs/orm/prisma-client/testing",
        },
      ],
      notes: [
        {
          type: "tip",
          title: "Reset the database between tests",
          content:
            "Use a test-only database and run migrations before each test file. Isolated data prevents tests from affecting each other.",
        },
        {
          type: "edge-case",
          title: "Sign events with the real secret",
          content:
            "Your test helper should use the same webhook secret as production. That way your tests verify the actual verification logic.",
        },
      ],
    },
    bookifyExample: [
      {
        type: "heading",
        content: "Bookify Webhook Integration Test",
        level: 3,
      },
      {
        type: "code",
        code: {
          language: "ts",
          filename: "apps/api/src/webhooks/stripe.test.ts",
          code: `import { describe, it, expect, beforeEach } from "vitest";
import { handleStripeWebhook } from "./stripe";
import { prisma } from "@bookify/db";

beforeEach(async () => {
  await prisma.$transaction([
    prisma.downloadToken.deleteMany(),
    prisma.order.deleteMany(),
    prisma.customer.deleteMany(),
  ]);
});

describe("payment_intent.succeeded", () => {
  it("creates an order and download token", async () => {
    const event = createFakeStripeEvent({
      paymentIntentId: "pi_test_123",
      email: "reader@example.com",
      amount: 1900,
    });

    const res = await handleStripeWebhook(
      new Request("http://localhost/webhooks/stripe", {
        method: "POST",
        body: JSON.stringify(event),
      }),
      stripeTestSignature(event)
    );

    expect(res.received).toBe(true);
    const order = await prisma.order.findFirst();
    expect(order?.status).toBe("paid");
    expect(await prisma.downloadToken.count()).toBe(1);
  });
});`,
        },
      },
    ],
  },
  {
    slug: "launch",
    number: 13,
    title: "Launch Day",
    subtitle: "Go Live & Keep Improving",
    description:
      "Move from staging to production and build habits for continuous improvement.",
    stakeholders: [
      {
        role: "Product Manager",
        abbr: "PM",
        color: "#2563eb",
        responsibility:
          "Coordinates launch timing, feature roadmap, user feedback. Owns launch and iteration.",
      },
      {
        role: "Engineering Lead",
        abbr: "EL",
        color: "#06b6d4",
        responsibility:
          "Go/no-go decision based on technical readiness. Owns technical launch risk.",
      },
      {
        role: "DevOps / SRE",
        abbr: "SR",
        color: "#0ea5e9",
        responsibility:
          "Monitors infrastructure, responds to incidents. Owns production health.",
      },
      {
        role: "Founder / Author",
        abbr: "FO",
        color: "#f59e0b",
        responsibility:
          "Approves public launch and messaging. Owns business outcome.",
      },
    ],
    content: [
      {
        type: "text",
        content:
          "This is where preparation meets reality. A launch is not an event — it is the beginning of operations. For Bookify, launch means one real customer can complete the entire purchase flow and receive the ebook while you sleep.\n\nBefore launch, do a full dry run in **production but using Stripe test mode**. Use real email addresses on your domain, real-looking data, and the actual deployed services. Do not rely on local development for launch readiness.\n\nA good launch plan has three parts:\n\n1. **Readiness criteria:** The checklist below must be green before public announcement.\n2. **Rollback trigger:** If checkout success rate drops below 95%, or any critical alert fires, pause traffic and investigate.\n3. **Post-launch watch:** Someone must be available for the first 2-4 hours to confirm real payments flow, emails arrive, and downloads work.",
      },
      {
        type: "heading",
        level: 2,
        content: "Pre-Launch Checklist",
      },
      {
        type: "text",
        content:
          "- [ ] End-to-end purchase on staging with Stripe test mode\n- [ ] Production Stripe webhook endpoint live and verified\n- [ ] Email DNS (SPF / DKIM / DMARC) passing\n- [ ] Download link expiration and retry behavior verified\n- [ ] Backups configured and restore tested\n- [ ] Rollback plan documented\n- [ ] Admin access secured with MFA\n- [ ] Terms, privacy policy, refund policy published\n- [ ] Analytics and observability dashboards live\n- [ ] On-call rotation defined",
      },
      {
        type: "heading",
        level: 2,
        content: "Post-Launch Habits",
      },
      {
        type: "text",
        content:
          "1. Monitor checkout conversion and error rates daily.\n2. Review Stripe disputes and fraud signals weekly.\n3. Read support tickets — they reveal real edge cases.\n4. Ship small, measured iterations.\n5. Patch dependencies regularly.",
      },
      {
        type: "callout",
        callout: {
          type: "edge-case",
          title: "Traffic Spikes",
          content:
            "If your marketing goes viral, your single Railway instance may not be enough. Have auto-scaling configured or a CDN in front of static assets before any big campaign.",
        },
      },
      {
        type: "callout",
        callout: {
          type: "tip",
          title: "Blameless Post-Mortems",
          content:
            "After any incident, write a blameless post-mortem with action items. The goal is learning, not blame. Share it with the entire team.",
        },
      },
      {
        type: "callout",
        callout: {
          type: "warning",
          title: "Refund Automation",
          content:
            "Have a clear refund process — automated or manual — before launch. A customer who cannot get a refund will file a chargeback, which costs you $15+ per dispute and damages your Stripe reputation.",
        },
      },
      {
        type: "heading",
        level: 2,
        content: "What to Build Next",
      },
      {
        type: "text",
        content:
          "- Coupons and discounts\n- Customer account area\n- Analytics and A/B testing\n- Background worker queue\n- Expand to multiple products",
      },
    ],
    tryItYourself: {
      intro:
        "Run a full staging purchase from start to finish and document how to roll back if anything breaks.",
      steps: [
        "Open your staging site and complete a purchase using a Stripe test card.",
        "Use a real-looking email address and check that the receipt arrives in Mailpit or your email sandbox.",
        "Click the download link and verify the PDF opens and the token expires after use or timeout.",
        "Open the admin dashboard and confirm the new order is listed with the correct status.",
        "Write a rollback plan: how to revert the last deploy, restore the database, and disable payments if needed.",
        "Share the rollback plan with a teammate or save it in `docs/runbooks/rollback.md`.",
      ],
      resources: [
        {
          label: "Stripe — Testing cards",
          url: "https://docs.stripe.com/testing",
        },
        {
          label: "Twelve-Factor App — Dev/prod parity",
          url: "https://12factor.net/dev-prod-parity",
        },
        {
          label: "Google SRE — Incident response",
          url: "https://sre.google/sre-book-book/being-on-call/",
        },
      ],
      notes: [
        {
          type: "tip",
          title: "Soft-launch first",
          content:
            "Invite ten friendly users before a public announcement. Real users find edge cases your tests missed.",
        },
        {
          type: "warning",
          title: "Have a rollback plan before you need it",
          content:
            "Write the rollback steps when you are calm. During an outage, you will not think clearly enough to invent one.",
        },
      ],
    },
    bookifyExample: [
      {
        type: "heading",
        content: "Bookify Launch Runbook",
        level: 3,
      },
      {
        type: "text",
        content:
          "1. **Pre-launch:** Run full staging purchase, verify emails, confirm downloads, check backups.\n2. **Deploy:** Merge `release` branch, wait for CI/CD green.\n3. **Smoke test:** Run one real test-card purchase in production.\n4. **Monitor:** Watch checkout success rate, error rate, and support inbox for 2 hours.\n5. **Rollback trigger:** If checkout success rate drops below 95% or critical alert fires, run `railway rollback` or redeploy previous image.\n6. **Post-launch:** Blameless post-mortem for any incident within 24 hours.",
      },
    ],
  },
];

export function getChapterBySlug(slug: string): Chapter | undefined {
  return chapters.find((c) => c.slug === slug);
}

export function getAdjacentChapters(slug: string) {
  const idx = chapters.findIndex((c) => c.slug === slug);
  return {
    prev: idx > 0 ? chapters[idx - 1] : null,
    next: idx < chapters.length - 1 ? chapters[idx + 1] : null,
  };
}
