---
title: "Before Code: Product Definition & Validation"
slug: "before-code"
description: "How to define what you are building, validate the idea, and align stakeholders before any code is written."
---

# Before Code: Product Definition & Validation

Before you open an editor, you need to answer a simple question: **what are we actually building, and why will anyone pay for it?**

For Bookify, the answer might look like this:

- **Product:** An ebook store for a single author.
- **User:** A reader who wants instant access to a digital book.
- **Admin:** The author, who needs to see sales and deliver the book.
- **Core transaction:** Browse &rarr; Buy &rarr; Pay &rarr; Download.
- **Differentiator:** Faster, simpler, and mobile-friendly compared to generic marketplaces.

## Stakeholders & owners

| Role | Owner | Responsibility |
|---|---|---|
| Product Manager | Validates the problem, defines MVP scope, writes initial user stories | Owns the "what" and "why" |
| Founder / Author | Provides business goals, pricing, content rights, brand voice | Approves scope and risk tolerance |
| Designer | Proposes UX flow, checkout simplicity, mobile layouts | Owns usability |
| Engineering Lead | Flags feasibility, compliance, hosting costs | Owns rough architecture and effort |
| Legal / Compliance | Reviews terms of sale, copyright, tax, privacy, refund policy | Owns legal risk |

## PM validation questions

Before engineering starts, the PM should confirm:

1. **Has anyone committed to buying this?** Even one pre-order validates demand.
2. **What is the exact minimum transaction we can launch with?**
3. **Who handles refunds, chargebacks, and customer support?**
4. **In which countries will we sell?** This drives tax and compliance requirements.
5. **What is the acceptable downtime or data-loss tolerance?**
6. **Will checkout require a user account, or can it be guest-only?**

## Why this matters

A well-defined product prevents:

- Engineers building features that get cut
- Discovering tax or accessibility requirements two days before launch
- Teams arguing about scope because "done" was never defined

## Pros of doing this rigorously

| Pros | Cons of skipping |
|---|---|
| Prevents wasted engineering effort | Build features nobody wants |
| Surfaces compliance issues early | Launch blockers appear late |
| Creates a shared definition of success | Scope arguments slow the team |
| Enables realistic effort estimates | Timeline and cost surprises |

## Edge cases

- **Global sales:** Selling in the EU means VAT collection. In the US, sales tax varies by state.
- **Digital vs. physical goods:** Refund laws differ. Make your terms explicit.
- **Accessibility:** You may be legally required to meet WCAG 2.1 AA.
- **Payment timing:** Customers expect instant delivery, but funds may not settle for days.
- **Copyright:** Ensure the author owns or has licensed all content.

## Try it yourself

Draft a one-page product brief for Bookify. Include:

- Target user
- Core transaction
- MVP scope
- Out-of-scope items
- Open questions

Share it with someone who is not on your team. If they cannot explain what you are building, your brief is not clear enough.

[Next: Architecture &rarr;](./01-architecture)
