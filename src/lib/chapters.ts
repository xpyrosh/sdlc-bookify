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

export interface Chapter {
  slug: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  stakeholders: Stakeholder[];
  content: ContentBlock[];
  tryItYourself?: string;
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
        content: "PM Validation Questions",
      },
      {
        type: "text",
        content:
          "Before engineering starts, the PM should confirm all of the following:",
      },
      {
        type: "text",
        content:
          "1. **Has anyone committed to buying this?** Even one pre-order validates demand.\n2. **What is the exact minimum transaction we can launch with?**\n3. **Who handles refunds, chargebacks, and customer support?**\n4. **In which countries will we sell?** This drives tax and compliance.\n5. **What is the acceptable downtime or data-loss tolerance?**\n6. **Will checkout require a user account, or can it be guest-only?**",
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
    tryItYourself:
      "Draft a one-page product brief for Bookify. Include: target user, core transaction, MVP scope, out-of-scope items, and open questions. Share it with someone who is not on your team — if they cannot explain what you are building, your brief is not clear enough.",
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
          "Good tech choices match team skills, speed-to-market, operational cost, and expected scale. Here is the stack for Bookify:",
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
    tryItYourself:
      "Create a bookify/ monorepo. Set up empty folders for apps/web, apps/api, and packages/db. Initialize a root package.json with workspaces.",
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
    tryItYourself:
      "Write the schema in packages/db/schema.sql. Create the database locally and run the SQL. Insert one product and one test customer.",
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
          "The backend is the brain of Bookify. It processes checkout, validates payments via Stripe webhooks, generates secure download links, sends emails, and enforces authorization.",
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
    tryItYourself:
      "Implement /api/webhooks/stripe locally. Use the Stripe CLI to forward test webhooks: stripe listen --forward-to localhost:3000/api/webhooks/stripe. Verify that paying once creates exactly one order.",
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
          "The frontend turns the backend into a usable purchase experience. Every page must be fast, accessible, and mobile-first.",
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
    tryItYourself:
      "Build the landing page and checkout button. Make the button disabled with a loading spinner after the first click. Test on a mobile viewport.",
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
          "Containers package your application with everything it needs to run: code, runtime, system libraries, and environment configuration. They solve the \"works on my machine\" problem.",
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
    tryItYourself:
      "Write the Dockerfile and docker-compose.yml. Run docker compose up and verify the API responds on http://localhost:3000/health.",
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
          "The ebook file should not live in your Git repo or Docker image. Use object storage with presigned URLs to deliver files securely.",
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
    tryItYourself:
      "Create a private S3 or R2 bucket. Upload a test PDF. Generate a signed URL from the command line and verify it expires after 15 minutes.",
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
          "After payment, the buyer needs the ebook. Email is the simplest durable delivery channel — it works even if the browser tab is closed.",
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
    tryItYourself:
      "Set up Mailpit locally (via Docker). Send a test email and view it at http://localhost:8025. Verify both HTML and plain-text versions render correctly.",
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
          "CI/CD automates the risky, repetitive parts of shipping: test, build, scan, deploy. It makes deployments routine and low-risk.",
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
    tryItYourself:
      "Create .github/workflows/ci.yml. Make it run npm run lint and npm run test on every pull request. Push a branch and watch it run.",
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
          "You now need a live environment that users can reach. The right choice depends on your team size, traffic patterns, and budget.",
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
    tryItYourself:
      "Deploy the Bookify backend to Railway or Fly.io. Point a custom domain at it and verify HTTPS works with a browser padlock.",
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
          'When a buyer says "I paid but didn\'t get my book," you need to reconstruct the exact transaction in seconds, not hours.',
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
    tryItYourself:
      "Add structured JSON logging to the webhook handler. Log the payment_intent_id and order_id on every step. Search for a specific order in the logs.",
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
          "Security is not a feature. It is a property of the system. Bake it in from the start — retrofitting security is expensive and often incomplete.",
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
    tryItYourself:
      "Run npm audit on your project. Fix any high-severity vulnerabilities. Set up Dependabot alerts on your GitHub repository.",
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
          "Tests are how you ship with confidence. A test suite is not about reaching 100% coverage — it is about verifying the behavior that matters.",
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
    tryItYourself:
      "Write one integration test that creates a checkout session, simulates a Stripe webhook, and asserts that an order and download token exist in the database.",
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
          "This is where preparation meets reality. A launch is not an event — it is the beginning of operations.",
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
    tryItYourself:
      "Do a full staging purchase with a real-looking email. Verify the email arrives, the download link works, and the order appears in the admin dashboard. Then write down your rollback plan.",
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
