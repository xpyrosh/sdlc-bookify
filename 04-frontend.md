---
title: "Frontend"
slug: "frontend"
description: "Build the Bookify purchase experience: landing page, checkout, success screen, and download page."
---

# Frontend

The frontend turns the backend into a usable purchase experience.

## Page structure

```text
/              -> Landing page with book details and buy button
/checkout      -> Stripe Checkout redirect or embedded form
/success       -> Thank you + optional direct download
/download/:token -> Fetches signed URL and triggers download
/admin         -> Author dashboard
```

## Example landing page

```tsx
export default function LandingPage() {
  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold">The Art of Shipping</h1>
      <p className="mt-4">A practical guide to launching real products.</p>
      <p className="mt-2 font-semibold">$19.00</p>
      <form action="/api/checkout" method="POST">
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded"
        >
          Buy now
        </button>
      </form>
    </main>
  );
}
```

## Stakeholders & owners

| Role | Owner | Responsibility |
|---|---|---|
| Frontend Engineer(s) | Pages, components, checkout integration | Owns UI correctness |
| Designer | Mockups, components, interactions | Owns look and feel |
| PM | Conversion funnel and required flows | Owns product behavior |
| QA | Cross-device, cross-browser, accessibility | Owns quality |

## Why Next.js

- Server-side rendering for SEO and speed.
- API routes for lightweight proxies.
- Image/font optimization built in.

## Pros of a modern React frontend

| Pros | Cons |
|---|---|
| Component reuse | Complexity grows fast |
| Strong ecosystem | Hydration mismatches possible |
| Excellent DX with TypeScript | Build times can increase |

## Edge cases

- **Mobile-first:** Test on real devices.
- **Accessibility:** Semantic HTML, ARIA, focus, keyboard, contrast.
- **Loading states:** Disable buy button after click.
- **Error handling:** Declined cards, network failures, 500s.
- **SEO:** Metadata, Open Graph, structured data.
- **Security headers:** CSP, HSTS, X-Frame-Options.
- **Guest checkout:** Do not force account creation.
- **Webhook delay:** Success page can poll for the token.

## Try it yourself

Build the landing page and checkout button. Make the button disabled with a loading spinner after the first click.

[Next: Containers &rarr;](./05-containers)
