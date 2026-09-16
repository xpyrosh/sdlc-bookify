---
title: "CI/CD"
slug: "cicd"
description: "Automate testing, building, scanning, and deploying Bookify with GitHub Actions."
---

# CI/CD

CI/CD automates the risky, repetitive parts of shipping software.

## Example GitHub Actions workflow

```yaml
name: CI/CD

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

  build-and-deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build and push Docker image
        run: |
          docker build -t bookify/api:${{ github.sha }} ./apps/api
          docker push bookify/api:${{ github.sha }}
      - name: Deploy to production
        run: ./scripts/deploy.sh ${{ github.sha }}
```

## Stakeholders & owners

| Role | Owner | Responsibility |
|---|---|---|
| DevOps / Platform Engineer | Pipeline, environments, secrets | Owns CI/CD infrastructure |
| Backend/Frontend Engineers | Tests, green builds | Owns code quality |
| Engineering Lead | Branching, approval gates | Owns release process |
| QA | Coverage and acceptance | Owns release readiness |

## Pros of CI/CD

| Pros | Cons |
|---|---|
| Catches bugs early | Initial setup takes time |
| Low-risk deployments | Requires discipline |
| Fast rollbacks | Build minutes cost money |

## Edge cases

- **Migrations:** Run migrations *before* deploying new app code, in a separate job.
- **Rollback:** Keep last N image tags and a one-command rollback.
- **Secrets in CI:** Use GitHub secrets, OIDC, or a vault.
- **Smoke tests:** Hit `/health` and run a synthetic purchase after deploy.
- **Staging parity:** Mirror production architecture.
- **Feature flags:** Decouple deploy from release.

## Try it yourself

Create a `.github/workflows/ci.yml`. Make it run `npm run lint` and `npm run test` on every pull request.

[Next: Infrastructure &rarr;](./09-infrastructure)
