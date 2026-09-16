"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { chapters } from "@/lib/chapters";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "./ThemeProvider";

interface Props {
  currentSlug?: string;
}

const pillGradients: Record<number, string> = {
  0: "from-blue-500 to-cyan-500",
  1: "from-amber-400 to-orange-500",
  2: "from-emerald-400 to-teal-500",
  3: "from-rose-400 to-pink-500",
  4: "from-lime-400 to-green-500",
  5: "from-sky-400 to-blue-500",
  6: "from-amber-300 to-red-500",
  7: "from-teal-300 to-emerald-500",
  8: "from-pink-400 to-rose-500",
  9: "from-orange-400 to-amber-500",
  10: "from-green-400 to-lime-500",
  11: "from-red-400 to-rose-600",
  12: "from-cyan-400 to-blue-600",
  13: "from-emerald-400 to-teal-500",
};

export default function ConstellationNav({ currentSlug }: Props) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const currentIdx = chapters.findIndex((c) => c.slug === currentSlug);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-30 flex items-center gap-4 border-b px-4 py-3 md:px-6 shadow-lg ${
        isDark
          ? "border-white/10 shadow-blue-900/20"
          : "border-white/20 shadow-blue-500/15"
      }`}
    >
      {/* Frosted blur layer */}
      <div className="absolute inset-0 -z-20 backdrop-blur-md" />

      {/* Gradient background layer with smooth opacity fade */}
      <div
        className={`absolute inset-0 -z-10 bg-gradient-to-r transition-opacity duration-700 ease-in-out ${
          isDark
            ? "from-blue-950 to-blue-900"
            : "from-blue-600 to-cyan-500"
        } ${scrolled ? "opacity-75" : "opacity-100"}`}
      />
      {/* Logo — left */}
      <Link
        href="/"
        className="flex shrink-0 items-center gap-2 text-white hover:text-white/80 transition-colors"
      >
        <BookOpen className="h-5 w-5" />
        <span className="hidden sm:inline text-sm font-semibold tracking-tight">
          Bookify
        </span>
      </Link>

      {/* Timeline — center/fill */}
      <div className="relative flex flex-1 items-center justify-center min-w-0">
        {/* Background connector line */}
        <div className="pointer-events-none absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-white/25" />
        <div
          className="pointer-events-none absolute left-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-white/60 to-white transition-all duration-500"
          style={{
            width:
              currentIdx >= 0
                ? `${(currentIdx / (chapters.length - 1)) * 100}%`
                : "0%",
          }}
        />

        <ul className="relative flex w-full items-center justify-between gap-1">
          {chapters.map((ch, i) => {
            const isCurrent = i === currentIdx;
            const isVisited = currentIdx >= 0 && i < currentIdx;
            const gradient = pillGradients[i] ?? "from-blue-500 to-cyan-500";
            const active = isCurrent || isVisited;

            return (
              <li key={ch.slug} className="relative list-none">
                <Link href={`/chapter/${ch.slug}`}>
                  <div
                    className={`
                      group relative flex h-9 items-center justify-center
                      overflow-hidden rounded-full shadow-sm
                      transition-all duration-500 ease-out
                      ${
                        active
                          ? "text-white"
                          : isDark
                            ? "bg-blue-950 text-white hover:text-white"
                            : "bg-surface text-muted hover:text-white"
                      }
                    `}
                    style={{ width: hoveredIdx === i ? "140px" : "36px" }}
                    onMouseEnter={() => setHoveredIdx(i)}
                    onMouseLeave={() => setHoveredIdx(null)}
                  >
                    {/* Gradient background */}
                    <span
                      className={`
                        absolute inset-0 bg-gradient-to-r ${gradient}
                        opacity-0 transition-opacity duration-500
                        ${hoveredIdx === i || active ? "opacity-100" : ""}
                      `}
                    />

                    {/* Glow */}
                    <span
                      className={`
                        absolute inset-0 -z-10 translate-y-1 rounded-full bg-gradient-to-r ${gradient}
                        opacity-0 blur-lg transition-opacity duration-500
                        ${hoveredIdx === i ? "opacity-60" : ""}
                      `}
                    />

                    {/* Number / icon */}
                    <span
                      className={`
                        absolute z-10 flex h-9 w-9 items-center justify-center
                        text-xs font-bold transition-all duration-300
                        ${
                          hoveredIdx === i
                            ? "scale-0 opacity-0"
                            : "scale-100 opacity-100"
                        }
                      `}
                    >
                      {ch.number}
                    </span>

                    {/* Title */}
                    <span
                      className={`
                        z-10 whitespace-nowrap px-3 text-xs font-semibold uppercase tracking-wider
                        transition-all duration-300
                        ${
                          hoveredIdx === i
                            ? "scale-100 opacity-100 delay-100"
                            : "scale-0 opacity-0"
                        }
                      `}
                    >
                      {ch.title}
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Theme toggle — right */}
      <ThemeToggle />
    </header>
  );
}
