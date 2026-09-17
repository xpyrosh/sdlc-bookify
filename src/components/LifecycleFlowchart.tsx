"use client";

import { useState } from "react";
import { Shield } from "lucide-react";
import { phases, chapters } from "@/lib/chapters";

// Map each phase to its chapter titles
const phaseSteps: Record<string, string[]> = {};
for (const phase of phases) {
  phaseSteps[phase.id] = chapters
    .filter((c) => c.phaseId === phase.id)
    .map((c) => c.title);
}

const phaseDescriptionText: Record<string, string> = {
  discover:
    "Define the product, validate demand, and agree on scope before writing code.",
  design:
    "Design the user experience, choose the stack, and model the data.",
  build:
    "Build the core product, including backend, frontend, containers, and AI features.",
  integrate:
    "Wire up file delivery, email, payment webhooks, and automated pipelines.",
  secure:
    "Add security controls, run tests, and handle compliance before shipping.",
  deploy:
    "Put the product online and run the launch checklist.",
  operate:
    "Monitor, maintain, measure, and iterate after launch.",
};

export default function LifecycleFlowchart() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="w-full rounded-2xl border border-border bg-surface p-6 md:p-8">
      <div className="mb-6 text-center">
        <h3 className="text-lg font-semibold text-foreground">How the chapters flow</h3>
        <p className="mt-1 text-sm text-muted">
          A teaching path from idea to launch. Hover a phase to see its chapters and purpose.
        </p>
      </div>

      {/* Security cross-cutting banner */}
      <div className="mb-5 flex items-center justify-center gap-2 rounded-xl border border-rose-500/20 bg-rose-50 px-4 py-2 text-center dark:bg-rose-950/20">
        <Shield className="h-3.5 w-3.5 text-rose-500" />
        <span className="text-[11px] font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
          Security, testing, and compliance run through every phase
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
        {phases.map((phase, i) => {
          const isActive = active === phase.id;

          return (
            <button
              key={phase.id}
              type="button"
              onMouseEnter={() => setActive(phase.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(phase.id)}
              onBlur={() => setActive(null)}
              className={`flex flex-col items-center gap-2 rounded-xl border p-3 text-center transition-all duration-300 ${
                isActive
                  ? "border-foreground/20 bg-accent-surface shadow-md"
                  : "border-border bg-bg hover:border-border-hover hover:bg-surface-2"
              }`}
            >
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white shadow-sm"
                style={{ backgroundColor: phase.color }}
              >
                {i}
              </span>
              <span className="text-sm font-semibold text-foreground">
                {phase.label}
              </span>
              <span className="text-[11px] leading-tight text-muted">
                {phaseSteps[phase.id].slice(0, 3).join(", ")}
                {phaseSteps[phase.id].length > 3 ? "…" : ""}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active phase explanation */}
      <div className="mt-5 min-h-[4.5rem] rounded-xl border border-border bg-bg p-4">
        {active ? (
          <p className="text-sm text-muted">
            <strong className="text-foreground">
              {phases.find((p) => p.id === active)?.label}:
            </strong>{" "}
            {phaseDescriptionText[active]}
            <span className="mt-1 block text-xs text-muted">
              Chapters: {phaseSteps[active].join(" → ")}
            </span>
          </p>
        ) : (
          <p className="text-sm text-muted">
            Hover or focus a phase above to see its chapters and why it is placed there.
          </p>
        )}
      </div>

      <p className="mt-5 text-center text-xs text-muted">
        Tip: chapters like Security and Testing appear late because you need a working system to
        demonstrate them on. In production teams, both start in the first week.
      </p>
    </div>
  );
}
