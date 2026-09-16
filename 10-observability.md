---
title: "Observability"
slug: "observability"
description: "Instrument Bookify so you can detect, debug, and fix problems quickly."
---

# Observability

When a buyer says "I paid but got no book," you need to reconstruct the transaction in seconds.

## The three pillars

| Pillar | Example |
|---|---|
| Logs | "Payment intent pi_123 succeeded for order abc" |
| Metrics | Checkout success rate, p95 latency, error rate |
| Traces | Request from click -> API -> Stripe -> email -> response |

## Stakeholders & owners

| Role | Owner | Responsibility |
|---|---|---|
| DevOps / SRE | Log aggregation, dashboards, paging | Owns observability platform |
| Backend Engineer | Structured logs and metrics | Owns instrumentation |
| Engineering Lead | SLOs and reliability targets | Owns reliability strategy |
| Founder / PM | Business metrics | Owns business dashboards |

## Pros of strong observability

| Pros | Cons |
|---|---|
| Detect problems early | Tools cost money |
| Reduce MTTR | Instrumentation can add noise |
| Data-driven decisions | Alert fatigue is real |

## Edge cases

- **Structured logs:** Use JSON with `trace_id`, `order_id`, `payment_intent_id`.
- **Don't log PII:** Redact emails, IPs, card tokens.
- **Alert on symptoms:** Page when checkout success drops, not when CPU is high.
- **Retention:** Operational logs for months, audit logs for years.
- **SLOs:** Define objective metrics. "Fast checkout" becomes "p95 latency < 2s."
- **On-call:** Someone must respond to alerts.

## Try it yourself

Add structured logging to the webhook handler. Log the `payment_intent_id` and `order_id` on every step.

[Next: Security &rarr;](./11-security)
