---
title: "Containers & Docker"
slug: "containers"
description: "Package Bookify into containers for consistent development, testing, and deployment."
---

# Containers & Docker

Containers package your application with everything it needs to run: code, runtime, system libraries, and environment configuration.

## Why containers matter

1. **Environment parity:** Same image locally, in CI, in staging, and production.
2. **Reproducible builds:** New developers onboard in minutes.
3. **Isolation:** No dependency conflicts with the host OS.
4. **Portability:** Move between Render, AWS, and Fly without rewriting scripts.
5. **Rollback:** Deploy an older image tag instantly.
6. **Density:** Run multiple services on one host.

## Backend Dockerfile

```dockerfile
# Stage 1: build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: runtime
FROM node:20-alpine
WORKDIR /app
RUN addgroup -g 1001 -S nodejs && adduser -S node -u 1001
COPY --from=builder --chown=node:nodejs /app/dist ./dist
COPY --from=builder --chown=node:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=node:nodejs /app/package*.json ./
USER node
EXPOSE 3000
CMD ["node", "dist/main.js"]
```

## Local docker-compose

```yaml
version: "3.9"
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
  db_data:
```

## Stakeholders & owners

| Role | Owner | Responsibility |
|---|---|---|
| Platform / DevOps Engineer | Dockerfile, base images, scanning, registry | Owns container standards |
| Backend Engineer | App starts correctly in container, health endpoints | Owns app compatibility |
| Engineering Lead | Monorepo image strategy | Owns architecture |
| Security Lead | Base images, permissions, secrets injection | Owns container security |

## Pros of using Docker

| Pros | Cons |
|---|---|
| Identical environments everywhere | Adds build time and storage cost |
| Fast onboarding | Learning curve |
| Easy local services (DB, mail) | Local resource usage |
| Versioned deployment artifacts | Can produce huge images if done badly |

## When to skip Docker

- Very early prototypes where iteration speed matters most.
- Pure serverless platforms like Vercel or Cloudflare Workers.
- Single-developer projects with trivial dependencies.

**For Bookify, use Docker for the backend even if the frontend deploys to Vercel.**

## Cases requiring more containers

| Service | Why |
|---|---|
| API container | Main backend |
| Worker container | Async email retries, reports |
| Cron container | Cleanup, digest emails |
| Reverse proxy / edge | SSL, caching, DDoS protection |
| Cache container (Redis) | Sessions, rate limits, queues |
| Search container | If selling many books later |

## Edge cases

- **Multi-stage builds:** Separate build and runtime to shrink image size.
- **Rootless containers:** Run as non-root.
- **Secrets in images:** Never bake `.env` into images.
- **Health checks:** Add `HEALTHCHECK` or `/health` endpoint.
- **Image scanning:** Use Trivy, Snyk, or Docker Scout in CI.
- **Layer caching:** Order Dockerfile so dependencies cache before code.
- **Graceful shutdown:** Handle `SIGTERM` properly.

## Try it yourself

Write the Dockerfile and `docker-compose.yml`. Run `docker compose up` and verify the API responds on `http://localhost:3000/health`.

[Next: Object Storage &rarr;](./06-object-storage)
