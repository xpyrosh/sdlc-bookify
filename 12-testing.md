---
title: "Testing"
slug: "testing"
description: "Verify that Bookify works, stays working, and handles failure gracefully."
---

# Testing

Tests are how you ship with confidence.

## Test pyramid

| Layer | Example | Owner |
|---|---|---|
| Unit | Price calculation, token validation | Engineer |
| Integration | POST `/checkout` creates order | Backend + QA |
| Contract | API shapes match | Backend + Frontend |
| E2E | Playwright visitor buys ebook | QA |
| Load | 100 concurrent purchases | Platform / SRE |
| Security | Dependency scans | Security Lead |

## Stakeholders & owners

| Role | Owner | Responsibility |
|---|---|---|
| QA / Test Engineer | Strategy, E2E, acceptance | Owns quality |
| Backend/Frontend Engineers | Unit and integration tests | Owns code correctness |
| Engineering Lead | Coverage targets, flaky-test policy | Owns testing standards |

## Pros of a strong test suite

| Pros | Cons |
|---|---|
| Catches regressions | Takes time to write |
| Documents behavior | Flaky tests destroy trust |
| Enables refactoring | 100% coverage is not the goal |

## Edge cases

- **Stripe test mode:** Never hit live payment APIs in tests.
- **Test isolation:** Fresh DB state per test.
- **Mock externals:** Email, storage, payments.
- **E2E reliability:** Use `data-testid`, not CSS selectors.
- **Load testing:** Before marketing launches, not after crashes.
- **Visual regression:** If UI consistency matters.

## Try it yourself

Write one integration test that creates a checkout session, simulates a Stripe webhook, and asserts that an order and download token exist.

[Next: Launch &rarr;](./13-launch)
