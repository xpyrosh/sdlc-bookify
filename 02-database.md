---
title: "Database Design"
slug: "database"
description: "How to design a PostgreSQL schema for Bookify that is correct, safe, and ready for production."
---

# Database Design

The database is the source of truth for anything that must survive a server restart: orders, customers, products, payment references, and download tokens.

## Schema

```sql
CREATE TABLE customers (
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
  status TEXT NOT NULL CHECK (status IN ('pending', 'paid', 'failed', 'refunded')),
  total_cents INTEGER NOT NULL,
  currency TEXT NOT NULL,
  stripe_payment_intent_id TEXT UNIQUE,
  tax_cents INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id),
  product_id UUID NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price_cents INTEGER NOT NULL
);

CREATE TABLE download_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id),
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

## Stakeholders & owners

| Role | Owner | Responsibility |
|---|---|---|
| Backend Engineer / DBA | Schema design, indexes, migrations, query performance | Owns data integrity |
| PM | Confirms what entities to track | Owns required fields and statuses |
| Security / Compliance | Reviews PII handling and retention | Owns privacy |
| Founder | Approves retention and refund policy implications | Owns business rules |

## Why PostgreSQL

- ACID transactions: order + items created together, or not at all.
- Supports complex queries, JSONB, full-text search as you grow.
- Managed Postgres is available everywhere.

## Pros of a relational database

| Pros | Cons |
|---|---|
| Strong consistency | Vertical scaling limits |
| Mature tooling | Schema migrations require planning |
| Easy to reason about | Less flexible than document stores |

## Edge cases

- **Idempotency:** Stripe webhooks can fire twice. Use `UNIQUE` on `stripe_payment_intent_id`.
- **Money:** Store amounts as integers in the smallest unit. Never use floats.
- **Tax:** Add `tax_cents` even if zero today.
- **Refunds:** Refunded orders must not serve downloads.
- **Soft deletes:** Use `is_active` or `deleted_at` instead of hard deletes.
- **Indexes:** Index `orders.customer_id`, `orders.stripe_payment_intent_id`, and `download_tokens.token`.
- **Backups:** Daily backups plus point-in-time recovery. Test restores quarterly.
- **PII:** Encrypt or mask emails in logs.

## Try it yourself

Write the schema in `packages/db/schema.sql`. Create the database locally and run the SQL. Insert one product and one test customer.

[Next: Backend &rarr;](./03-backend)
