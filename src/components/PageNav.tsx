"use client";

import Link from "next/link";
import type { Chapter } from "@/lib/chapters";

interface Props {
  prev: Chapter | null;
  next: Chapter | null;
}

export default function PageNav({ prev, next }: Props) {
  return (
    <div className="mt-14 flex gap-3 pt-6">
      {prev ? (
        <Link
          href={`/chapter/${prev.slug}`}
          className="group flex-1 rounded-2xl border border-border bg-surface p-5 transition-all hover:border-accent/30 hover:shadow-md"
        >
          <span className="text-[11px] font-medium uppercase tracking-wider text-muted">
            Previous
          </span>
          <p className="mt-1.5 text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
            &larr; {prev.title}
          </p>
          <p className="mt-0.5 text-xs text-muted">{prev.subtitle}</p>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
      {next ? (
        <Link
          href={`/chapter/${next.slug}`}
          className="group flex-1 rounded-2xl border border-border bg-surface p-5 text-right transition-all hover:border-accent/30 hover:shadow-md"
        >
          <span className="text-[11px] font-medium uppercase tracking-wider text-muted">
            Next
          </span>
          <p className="mt-1.5 text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
            {next.title} &rarr;
          </p>
          <p className="mt-0.5 text-xs text-muted">{next.subtitle}</p>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
}
