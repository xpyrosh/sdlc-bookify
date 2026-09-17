import { notFound } from "next/navigation";
import Link from "next/link";
import { Wrench, BookOpenCheck } from "lucide-react";
import type { ResourceLink, TryItYourself, Callout as CalloutData } from "@/lib/chapters";
import {
  chapters,
  getChapterBySlug,
  getAdjacentChapters,
} from "@/lib/chapters";
import ConstellationNav from "@/components/ConstellationNav";
import StakeholderBubbles from "@/components/StakeholderBubbles";
import ContentRenderer from "@/components/ContentRenderer";
import PageNav from "@/components/PageNav";
import Callout from "@/components/Callout";

function InlineMarkdown({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let idx = 0;

  while (remaining.length > 0) {
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    const codeMatch = remaining.match(/`(.+?)`/);
    const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);

    type MatchType = { match: RegExpMatchArray; type: "bold" | "code" | "link" };
    let firstMatch: MatchType | null = null;

    const candidates: (MatchType | null)[] = [
      boldMatch ? { match: boldMatch, type: "bold" as const } : null,
      codeMatch ? { match: codeMatch, type: "code" as const } : null,
      linkMatch ? { match: linkMatch, type: "link" as const } : null,
    ];

    for (const candidate of candidates) {
      if (
        candidate &&
        candidate.match.index !== undefined &&
        (!firstMatch || candidate.match.index < firstMatch.match.index!)
      ) {
        firstMatch = candidate;
      }
    }

    if (!firstMatch) {
      parts.push(remaining);
      break;
    }

    const before = remaining.slice(0, firstMatch.match.index!);
    if (before) parts.push(before);

    if (firstMatch.type === "bold") {
      parts.push(
        <strong key={idx} className="font-semibold text-foreground">
          {firstMatch.match[1]}
        </strong>
      );
    } else if (firstMatch.type === "code") {
      parts.push(
        <code
          key={idx}
          className="rounded-md bg-accent-surface px-1.5 py-0.5 text-sm font-mono text-accent-text"
        >
          {firstMatch.match[1]}
        </code>
      );
    } else {
      parts.push(
        <Link
          key={idx}
          href={firstMatch.match[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-accent underline underline-offset-2 hover:text-accent-light"
        >
          {firstMatch.match[1]}
        </Link>
      );
    }

    remaining = remaining.slice(
      firstMatch.match.index! + firstMatch.match[0].length
    );
    idx++;
  }

  return <>{parts}</>;
}

function TryItYourselfBlock({ exercise }: { exercise: TryItYourself }) {
  return (
    <div className="relative mt-14">
      <div className="rounded-2xl border border-accent/20 bg-accent-surface p-6">
        <div className="flex items-center gap-2 mb-3">
          <Wrench className="h-5 w-5 text-accent" />
          <h3 className="font-semibold text-accent-text">Try It Yourself</h3>
        </div>
        <p className="text-sm leading-relaxed text-muted mb-4">
          <InlineMarkdown text={exercise.intro} />
        </p>
        <ol className="mb-5 ml-5 list-decimal space-y-2 text-sm text-muted">
          {exercise.steps.map((step, i) => (
            <li key={i}>
              <InlineMarkdown text={step} />
            </li>
          ))}
        </ol>
        {exercise.resources.length > 0 && (
          <div className="rounded-xl border border-accent/10 bg-bg/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent-text mb-2">
              Useful docs
            </p>
            <ul className="space-y-1.5">
              {exercise.resources.map((resource: ResourceLink) => (
                <li key={resource.url}>
                  <Link
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-accent underline underline-offset-2 hover:text-accent-light"
                  >
                    {resource.label}
                    <span className="text-xs opacity-60">↗</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {exercise.notes && exercise.notes.length > 0 && (
        <>
          {exercise.notes.length <= 2 && (
            <div className="absolute left-full top-0 ml-6 w-60 space-y-5 hidden xl:block">
              {exercise.notes.map((note: CalloutData, i: number) => (
                <Callout
                  key={i}
                  type={note.type}
                  title={note.title}
                  marker={i + 1}
                >
                  {note.content}
                </Callout>
              ))}
            </div>
          )}
          <div className={`mt-4 grid gap-4 ${exercise.notes.length <= 2 ? "grid-cols-1 xl:hidden" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"}`}>
            {exercise.notes.map((note: CalloutData, i: number) => (
              <Callout
                key={i}
                type={note.type}
                title={note.title}
                marker={i + 1}
              >
                {note.content}
              </Callout>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function generateStaticParams() {
  return chapters.map((ch) => ({ slug: ch.slug }));
}

export async function generateMetadata(props: PageProps<"/chapter/[slug]">) {
  const { slug } = await props.params;
  const chapter = getChapterBySlug(slug);
  if (!chapter) return {};
  return {
    title: `${chapter.title} — Bookify Tutorial`,
    description: chapter.description,
  };
}

export default async function ChapterPage(props: PageProps<"/chapter/[slug]">) {
  const { slug } = await props.params;
  const chapter = getChapterBySlug(slug);
  if (!chapter) notFound();

  const { prev, next } = getAdjacentChapters(slug);

  return (
    <main className="flex flex-col min-h-screen bg-bg">
      <ConstellationNav currentSlug={slug} />

      {/* Content + sidenotes section — centered with equal outer margins.
         56rem content + 1.5rem gap + 15rem sidenotes = 72.5rem total. */}
      <section className="mx-auto w-full max-w-[73rem] px-4 py-10 pb-16 sm:px-6 xl:px-8">
        <div className="relative max-w-4xl">
          {/* Chapter header */}
          <div className="mb-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-surface px-3 py-1 text-xs font-semibold text-accent-text mb-4">
              Chapter {String(chapter.number).padStart(2, "0")}
            </span>
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl leading-tight">
              {chapter.title}
            </h1>
            <p className="mt-2 text-lg text-muted">{chapter.subtitle}</p>
            <p className="mt-3 text-sm text-muted leading-relaxed max-w-2xl">
              {chapter.description}
            </p>
          </div>

          {/* Stakeholders */}
          <div className="mb-10 rounded-2xl border border-border bg-surface p-5">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-muted mb-3 block">
              Stakeholders &amp; Owners
            </span>
            <StakeholderBubbles stakeholders={chapter.stakeholders} />
          </div>

          {/* Main content */}
          <article>
            <ContentRenderer blocks={chapter.content} />
          </article>

          {/* Try it yourself */}
          {chapter.tryItYourself && <TryItYourselfBlock exercise={chapter.tryItYourself} />}

          {/* Bookify example */}
          {chapter.bookifyExample && (
            <div className="mt-14 rounded-2xl border border-border bg-surface p-6">
              <div className="flex items-center gap-2 mb-4">
                <BookOpenCheck className="h-5 w-5 text-accent" />
                <h3 className="font-semibold text-foreground">
                  Bookify Example
                </h3>
              </div>
              <div className="text-sm text-muted leading-relaxed">
                <ContentRenderer blocks={chapter.bookifyExample} />
              </div>
            </div>
          )}
        </div>

        {/* Bottom nav — spans full content + sidenote width */}
        <div className="mt-14">
          <PageNav prev={prev} next={next} />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-auto">
        <div className="mx-auto max-w-4xl px-6 py-6 text-center text-xs text-muted">
          Bookify Tutorial &middot; From Idea to Production &middot; Shiva Ramsamooj 2026
        </div>
      </footer>
    </main>
  );
}
