"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { chapters, phases } from "@/lib/chapters";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "./ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  currentSlug?: string;
}

const parentGradients: Record<string, string> = {
  discover: "from-blue-700 to-blue-600",
  design: "from-teal-600 to-cyan-500",
  build: "from-emerald-700 to-teal-600",
  integrate: "from-amber-600 to-orange-600",
  secure: "from-rose-700 to-red-600",
  deploy: "from-violet-700 to-purple-600",
  operate: "from-pink-700 to-rose-600",
};

const childGradients: Record<string, string> = {
  discover: "from-blue-500 to-cyan-400",
  design: "from-cyan-500 to-sky-400",
  build: "from-emerald-500 to-teal-400",
  integrate: "from-amber-400 to-orange-400",
  secure: "from-rose-500 to-red-400",
  deploy: "from-violet-500 to-purple-400",
  operate: "from-pink-500 to-rose-400",
};

export default function ConstellationNav({ currentSlug }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const currentChapter = chapters.find((c) => c.slug === currentSlug);
  const currentPhaseId = currentChapter?.phaseId ?? null;
  const activePhase = expandedPhase ?? currentPhaseId;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const phaseChapters = useMemo(() => {
    const map: Record<string, typeof chapters> = {};
    for (const phase of phases) {
      map[phase.id] = chapters.filter((c) => c.phaseId === phase.id);
    }
    return map;
  }, []);

  const togglePhase = (phaseId: string) => {
    setExpandedPhase((prev) => (prev === phaseId ? null : phaseId));
  };

  // Build flat list: every phase node is always present; children are inserted after their parent.
  type NavItem =
    | { type: "phase"; phase: (typeof phases)[number]; gradient: string }
    | { type: "chapter"; chapter: (typeof chapters)[number]; gradient: string };

  const navItems: NavItem[] = phases.reduce((acc, phase) => {
    const parentGradient = parentGradients[phase.id] ?? "from-blue-700 to-blue-600";
    const childGradient = childGradients[phase.id] ?? "from-blue-500 to-cyan-400";
    acc.push({ type: "phase", phase, gradient: parentGradient });
    if (activePhase === phase.id) {
      for (const ch of phaseChapters[phase.id] ?? []) {
        acc.push({ type: "chapter", chapter: ch, gradient: childGradient });
      }
    }
    return acc;
  }, [] as NavItem[]);

  return (
    <header
      className={`sticky top-0 z-30 border-b border-transparent shadow-lg ${
        isDark ? "shadow-blue-900/20" : "shadow-blue-500/15"
      }`}
    >
      <div className="absolute inset-0 -z-20 backdrop-blur-md" />
      <div
        className={`absolute inset-0 -z-10 bg-gradient-to-r transition-opacity duration-700 ease-in-out ${
          isDark ? "from-blue-950 to-blue-900" : "from-blue-600 to-cyan-500"
        } ${scrolled ? "opacity-75" : "opacity-100"}`}
      />

      <div className="flex items-center gap-3 px-3 py-2 md:px-5 md:py-3">
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 text-white hover:text-white/80 transition-colors"
        >
          <BookOpen className="h-5 w-5" />
          <span className="hidden sm:inline text-sm font-semibold tracking-tight">
            Bookify
          </span>
        </Link>

        {/* Timeline — evenly spaced across full width */}
        <nav className="relative flex flex-1 min-w-0 items-center overflow-hidden">
          <div className="pointer-events-none absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-white/15" />

          <motion.ul
            layout
            className="relative flex w-full items-center justify-between"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {navItems.map((item, i) => (
                <motion.li
                  key={
                    item.type === "phase"
                      ? item.phase.id
                      : `${item.chapter.phaseId}-${item.chapter.slug}`
                  }
                  layout
                  initial={{ opacity: 0, scale: 0.6, x: -10 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.6, x: -10 }}
                  transition={{
                    type: "spring",
                    stiffness: 180,
                    damping: 22,
                    duration: 0.45,
                  }}
                  className="list-none"
                >
                  {item.type === "phase" ? (
                    <PhaseNode
                      phase={item.phase}
                      gradient={item.gradient}
                      active={currentPhaseId === item.phase.id}
                      onClick={() => togglePhase(item.phase.id)}
                    />
                  ) : (
                    <ChapterNode
                      chapter={item.chapter}
                      gradient={item.gradient}
                      active={item.chapter.slug === currentSlug}
                      isDark={isDark}
                    />
                  )}
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}

function PhaseNode({
  phase,
  gradient,
  active,
  onClick,
}: {
  phase: { id: string; label: string; color: string };
  gradient: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        relative z-10 flex h-9 items-center justify-center rounded-full px-3
        text-[10px] font-semibold uppercase tracking-wider text-white shadow-sm
        transition-all duration-300 hover:brightness-110
      `}
    >
      <span
        className={`
          absolute inset-0 rounded-full bg-gradient-to-r ${gradient} transition-opacity duration-300
          ${active ? "opacity-100" : "opacity-90"}
        `}
      />
      <span className="relative z-10 truncate max-w-[10ch] md:max-w-[12ch] lg:max-w-none">
        {phase.label}
      </span>
    </button>
  );
}

function ChapterNode({
  chapter,
  gradient,
  active,
  isDark,
}: {
  chapter: (typeof chapters)[number];
  gradient: string;
  active: boolean;
  isDark: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const expanded = hovered || active;

  return (
    <Link href={`/chapter/${chapter.slug}`} className="block">
      <div
        className={`
          group relative flex h-8 items-center justify-center overflow-hidden rounded-full shadow-sm
          transition-all duration-300 ease-out
          ${
            active
              ? "text-white"
              : isDark
                ? "bg-blue-950 text-white hover:text-white"
                : "bg-white/90 text-slate-700 hover:text-white"
          }
        `}
        style={{ width: expanded ? 130 : 32 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <span
          className={`
            absolute inset-0 bg-gradient-to-r ${gradient} transition-opacity duration-300
            ${active || expanded ? "opacity-100" : "opacity-0"}
          `}
        />
        <span
          className={`
            absolute z-10 flex h-8 w-8 items-center justify-center text-[10px] font-bold transition-all duration-300
            ${expanded ? "scale-0 opacity-0" : "scale-100 opacity-100"}
          `}
        >
          {chapter.number}
        </span>
        <span
          className={`
            z-10 whitespace-nowrap px-2 text-[10px] font-semibold uppercase tracking-wider transition-all duration-300
            ${expanded ? "scale-100 opacity-100" : "scale-0 opacity-0"}
          `}
        >
          {chapter.title}
        </span>
      </div>
    </Link>
  );
}
