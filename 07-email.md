---
title: "Email Delivery"
slug: "email"
description: "Send the Bookify download link reliably after purchase."
---

# Email Delivery

After payment, the buyer needs the ebook. Email is the simplest durable delivery channel.

## Example email sender

```ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendDownloadEmail(email: string, token: string) {
  const downloadUrl = `${process.env.APP_URL}/download/${token}`;

  await resend.emails.send({
    from: 'Bookify <orders@bookify.example>',
    to: email,
    subject: 'Your Bookify ebook download',
    html: `
      <h1>Thank you for your purchase!</h1>
      <p><a href="${downloadUrl}">Download now</a></p>
      <p>This link expires in 7 days.</p>
    `,
    text: `Download: ${downloadUrl}`,
  });
}
```

## Stakeholders & owners

| Role | Owner | Responsibility |
|---|---|---|
| Backend Engineer | Provider integration, templating, retry logic | Owns delivery code |
| Marketing / Founder | Email copy, branding, sender identity | Owns messaging |
| Security / Compliance | Unsubscribe handling, PII | Owns compliance |

## Pros of transactional email services

| Pros | Cons |
|---|---|
| High deliverability | Cost scales with volume |
| Built-in analytics | Provider outages possible |
| Simple APIs | Domain reputation matters |

## Edge cases

- **Idempotency:** Track `emailSentAt` to avoid duplicates.
- **Bounces/complaints:** Handle provider webhooks to suppress bad addresses.
- **Deliverability:** Configure SPF, DKIM, DMARC.
- **Plain text:** Always include a text version.
- **Retries:** Use a job queue for transient failures.
- **Unsubscribe:** Honor requests where legally required.
- **Rendering:** Test in Gmail, Outlook, Apple Mail.

## Try it yourself

Sign up for Resend or Mailpit. Send a test email locally and view it in Mailpit at `http://localhost:8025`.

[Next: CI/CD &rarr;](./08-cicd)
