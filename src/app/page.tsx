import Link from "next/link";
import { chapters } from "@/lib/chapters";
import ConstellationNav from "@/components/ConstellationNav";
import {
  ArrowRight,
  Layers,
  Shield,
  Rocket,
  BookOpen,
  Database,
  Server,
  Monitor,
  Container,
  Mail,
  GitBranch,
  Cloud,
  Activity,
  Lock,
  TestTube,
  Zap,
  Palette,
  HardDrive,
} from "lucide-react";

const chapterIcons: Record<string, React.ElementType> = {
  "before-code": BookOpen,
  architecture: Layers,
  database: Database,
  backend: Server,
  frontend: Monitor,
  containers: Container,
  "object-storage": HardDrive,
  email: Mail,
  cicd: GitBranch,
  infrastructure: Cloud,
  observability: Activity,
  security: Lock,
  testing: TestTube,
  launch: Zap,
};

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-bg">
      <ConstellationNav />

      {/* Hero */}
      <section className="mx-auto w-full max-w-[73rem] px-6 pt-20 pb-16">
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:gap-12">
          {/* Left: text */}
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent-surface px-3 py-1 text-xs font-medium text-accent-text mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
              14 chapters &middot; Full production guide
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl leading-[1.1]">
              How to Build a{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Modern Product
              </span>
            </h1>
            <p className="mt-5 text-lg text-muted leading-relaxed max-w-lg">
              Learn the entire software development lifecycle by building{" "}
              <strong className="text-foreground font-semibold">Bookify</strong>{" "}
              — a real ebook store with payments, email delivery, containers,
              CI/CD, and production observability.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/chapter/before-code"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-lg hover:brightness-110"
              >
                Start Learning
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href="#chapters"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-2.5 text-sm font-medium text-muted transition-all hover:border-border-hover hover:text-foreground hover:bg-surface"
              >
                Browse Chapters
              </a>
            </div>
          </div>

          {/* Right: feature pills */}
          <div className="flex flex-col gap-3 md:w-72">
            {[
              {
                icon: Layers,
                title: "Full Stack",
                desc: "Every layer, from database to deploy.",
                color: "#2563eb",
              },
              {
                icon: Shield,
                title: "Production Grade",
                desc: "Security, observability, edge cases.",
                color: "#06b6d4",
              },
              {
                icon: Rocket,
                title: "Ship It",
                desc: "Real payments, email, live deploy.",
                color: "#f59e0b",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-4 transition-all hover:shadow-md hover:border-border-hover"
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${card.color}15` }}
                >
                  <card.icon
                    className="h-4.5 w-4.5"
                    style={{ color: card.color }}
                  />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {card.title}
                  </p>
                  <p className="text-xs text-muted leading-relaxed mt-0.5">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full-width hero mockup */}
      <section className="w-full border-y border-border bg-surface">
        <div className="mx-auto w-full max-w-[73rem] px-6 py-10">
          <div className="overflow-hidden rounded-2xl border border-border shadow-2xl">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 bg-slate-900 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-500" />
              <span className="h-3 w-3 rounded-full bg-yellow-500" />
              <span className="h-3 w-3 rounded-full bg-green-500" />
              <span className="ml-4 rounded-md bg-slate-800 px-3 py-1 text-xs text-slate-400">
                bookify.example.com
              </span>
            </div>
            {/* Mock storefront */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="flex flex-col justify-center gap-5 bg-bg p-8 md:p-12">
                <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-accent-surface px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent-text">
                  Now available
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  The Minimalist&apos;s Guide to Shipping
                </h2>
                <p className="text-muted leading-relaxed">
                  A short, practical ebook for developers who want to go from idea to live product — payments, email, and deploy included.
                </p>
                <div className="text-2xl font-semibold text-foreground">
                  $19
                </div>
                <button className="w-fit rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-lg hover:brightness-110">
                  Buy now
                </button>
              </div>
              <div className="relative hidden md:block bg-gradient-to-br from-blue-50 to-cyan-50 p-8">
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '24px 24px' }} />
                <div className="relative flex h-full items-center justify-center">
                  <div className="w-full max-w-xs space-y-3 rounded-xl border border-border bg-surface p-5 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100" />
                      <div className="space-y-1">
                        <div className="h-2 w-24 rounded bg-border" />
                        <div className="h-2 w-16 rounded bg-border" />
                      </div>
                    </div>
                    <div className="h-2 w-full rounded bg-border" />
                    <div className="h-2 w-5/6 rounded bg-border" />
                    <div className="pt-2">
                      <div className="h-8 w-full rounded-lg bg-accent/10 text-center text-xs font-semibold leading-8 text-accent">
                        Download ready
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter grid */}
      <section
        id="chapters"
        className="mx-auto w-full max-w-[73rem] px-6 pb-20"
      >
        <h2 className="text-2xl font-bold text-foreground mb-2">
          All Chapters
        </h2>
        <p className="text-sm text-muted mb-8">
          Follow the lifecycle from product definition to launch day.
        </p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {chapters.map((ch) => {
            const Icon = chapterIcons[ch.slug] || Palette;
            return (
              <Link
                key={ch.slug}
                href={`/chapter/${ch.slug}`}
                className="group relative flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5 transition-all hover:border-accent/30 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-surface text-accent">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-xs text-muted">
                    {String(ch.number).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-foreground group-hover:text-accent transition-colors">
                    {ch.title}
                  </p>
                  <p className="text-xs text-muted mt-1 line-clamp-2 leading-relaxed">
                    {ch.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-auto">
        <div className="mx-auto max-w-[73rem] px-6 py-8 flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted">
            <BookOpen className="h-4 w-4 text-accent" />
            <span className="text-xs font-medium">Bookify Tutorial</span>
          </div>
          <p className="text-xs text-muted">
            Shiva Ramsamooj &middot; 2026
          </p>
        </div>
      </footer>
    </main>
  );
}
