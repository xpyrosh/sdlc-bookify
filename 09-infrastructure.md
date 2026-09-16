---
title: "Infrastructure & Deployment"
slug: "infrastructure"
description: "Run Bookify in production with the right hosting, DNS, SSL, and scaling strategy."
---

# Infrastructure & Deployment

You now need a live environment that users can reach.

## Deployment options

| Approach | Best for | Example |
|---|---|---|
| PaaS (Render, Railway, Fly) | Fastest setup, small team | Bookify MVP |
| Serverless (Vercel + Lambda/Cloud Run) | Variable traffic | Marketing frontends |
| Managed containers (ECS, GKE) | More control, multiple services | Growing teams |
| Kubernetes | Many microservices | Not needed for Bookify |

## Stakeholders & owners

| Role | Owner | Responsibility |
|---|---|---|
| DevOps / Platform Engineer | Provisions infrastructure, networking, SSL, scaling | Owns uptime and cost |
| Engineering Lead | Architecture, vendor selection, disaster recovery | Owns reliability strategy |
| Founder / CTO | Hosting budget and downtime tolerance | Owns business risk |
| PM | Launch timing and maintenance communication | Owns user communication |

## Pros of PaaS deployment

| Pros | Cons |
|---|---|
| Deploy in minutes | Higher cost per compute at scale |
| Managed DB, SSL, scaling | Less control |
| Lower operational burden | Potential vendor lock-in |

## Edge cases

- **Domain and DNS:** Use a reliable registrar. Lower TTL before migrations.
- **HTTPS:** Managed certificates only. Never ship HTTP.
- **Environment parity:** Same container image and Postgres version everywhere.
- **Cost guards:** Set billing alerts.
- **DDoS protection:** Use Cloudflare or AWS Shield.
- **Connection limits:** Use connection pooling (Pgbouncer) if many app instances connect to Postgres.

## Try it yourself

Deploy the Bookify backend to Railway or Fly. Point a custom domain at it and verify HTTPS.

[Next: Observability &rarr;](./10-observability)
