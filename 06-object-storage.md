---
title: "Object Storage for Files"
slug: "object-storage"
description: "Store the ebook in object storage and serve it through signed, time-limited URLs."
---

# Object Storage for Files

The ebook PDF/EPUB should not live in your Git repo or Docker image. Use object storage with signed URLs.

## Why not serve files from the backend

- Wastes bandwidth and CPU.
- Object storage is cheaper, faster, and globally distributed.
- Signed URLs provide access control without complex auth.

## Example flow

1. Upload `ebook.pdf` to a private bucket.
2. Database stores the `file_key`.
3. Verified buyer requests download.
4. Backend generates a presigned URL valid for 15 minutes.
5. Browser downloads directly from storage.

## Signed URL generation

```ts
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3 = new S3Client({ region: process.env.AWS_REGION });

export async function getSignedDownloadUrl(fileKey: string) {
  const command = new GetObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: fileKey,
  });
  return getSignedUrl(s3, command, { expiresIn: 900 }); // 15 minutes
}
```

## Stakeholders & owners

| Role | Owner | Responsibility |
|---|---|---|
| Backend Engineer | Upload flow, signed URL generation | Owns file delivery logic |
| DevOps / Platform | Bucket policy, CDN, lifecycle, cost | Owns storage infrastructure |
| Security Lead | Permissions and encryption | Owns data protection |

## Pros of object storage

| Pros | Cons |
|---|---|
| Cheap and durable | Egress fees on some providers |
| Offloads your servers | Requires IAM/bucket policy care |
| Versioning and lifecycle built in | Signed URLs add backend logic |

## Edge cases

- **Never make the bucket public.**
- **Versioning:** Enable it so updates don't overwrite unexpectedly.
- **Integrity:** Store SHA-256 checksum in DB.
- **Virus scanning:** Scan user uploads before delivery.
- **CDN:** Use CloudFront/Cloudflare for global speed.
- **Metadata:** Set correct `Content-Type` and `Content-Disposition`.
- **Backup:** Use cross-region replication or lifecycle rules.

## Try it yourself

Create a private S3/R2 bucket. Upload a test PDF. Generate a signed URL and verify it expires as expected.

[Next: Email &rarr;](./07-email)
