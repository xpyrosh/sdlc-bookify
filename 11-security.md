---
title: "Security"
slug: "security"
description: "Protect Bookify's users, payments, admin access, and business continuity."
---

# Security

Security is not a feature. It is a property of the system.

## Checklist

| Layer | Control |
|---|---|
| Transport | TLS 1.2+, HSTS, secure cookies |
| Authentication | Admin dashboard with strong auth + MFA |
| Authorization | Users see only their own orders/downloads |
| Input validation | Zod/Joi schemas, parameterized queries |
| Secrets management | Vault or cloud secret managers |
| Dependencies | Dependabot, Snyk, `npm audit` |
| File delivery | Presigned URLs, private buckets |
| Payments | Stripe Checkout — never touch raw card data |
| Logging | Never log PII or secrets |

## Stakeholders & owners

| Role | Owner | Responsibility |
|---|---|---|
| Security Lead | Threat modeling, reviews, incident response | Owns security posture |
| Backend Engineer | Auth, validation, headers, encryption | Owns secure code |
| DevOps | Network security, secrets, scanning, patching | Owns infrastructure security |
| Founder / Legal | Terms, privacy policy, compliance | Owns legal risk |

## Pros of baking security in early

| Pros | Cons |
|---|---|
| Avoids costly rework | Adds development time |
| Builds user trust | Requires ongoing attention |
| Reduces incident burden | Can slow feature work if overdone |

## Edge cases

- **PCI scope:** Stripe Checkout keeps you mostly out of scope.
- **CSRF:** Protect state-changing admin endpoints.
- **SQL injection:** Use ORM or parameterized queries.
- **Mass assignment:** Don't write whole request bodies to DB.
- **XSS:** Escape output, sanitize HTML, use CSP.
- **Secrets rotation:** Rotate API keys at least annually.
- **Dependency confusion:** Use lock files and private registries.
- **Incident response:** Have a runbook.

## Try it yourself

Run `npm audit` on your project. Fix any high-severity issues before continuing.

[Next: Testing &rarr;](./12-testing)
