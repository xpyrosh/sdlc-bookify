import { notFound } from "next/navigation";
import { Wrench } from "lucide-react";
import {
  chapters,
  getChapterBySlug,
  getAdjacentChapters,
} from "@/lib/chapters";
import ConstellationNav from "@/components/ConstellationNav";
import StakeholderBubbles from "@/components/StakeholderBubbles";
import ContentRenderer from "@/components/ContentRenderer";
import PageNav from "@/components/PageNav";

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
         56rem content + 1.5rem gap + 14rem sidenotes = 71.5rem total. */}
      <section className="mx-auto w-full max-w-[71.5rem] px-4 py-10 pb-16 sm:px-6 xl:px-8">
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
          {chapter.tryItYourself && (
            <div className="mt-14 rounded-2xl border border-accent/20 bg-accent-surface p-6">
              <div className="flex items-center gap-2 mb-3">
                <Wrench className="h-5 w-5 text-accent" />
                <h3 className="font-semibold text-accent-text">
                  Try It Yourself
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-muted">
                {chapter.tryItYourself}
              </p>
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
