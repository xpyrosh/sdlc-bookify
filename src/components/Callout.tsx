"use client";

import {
  AlertTriangle,
  Lightbulb,
  AlertOctagon,
  Info,
} from "lucide-react";

interface Props {
  type: "edge-case" | "warning" | "tip" | "note";
  title: string;
  children: React.ReactNode;
  marker?: number;
}

const config = {
  "edge-case": {
    icon: AlertOctagon,
    bg: "var(--callout-edge-bg)",
    border: "var(--callout-edge-border)",
    text: "var(--callout-edge-text)",
    label: "Edge Case",
  },
  warning: {
    icon: AlertTriangle,
    bg: "var(--callout-warn-bg)",
    border: "var(--callout-warn-border)",
    text: "var(--callout-warn-text)",
    label: "Warning",
  },
  tip: {
    icon: Lightbulb,
    bg: "var(--callout-tip-bg)",
    border: "var(--callout-tip-border)",
    text: "var(--callout-tip-text)",
    label: "Tip",
  },
  note: {
    icon: Info,
    bg: "var(--callout-note-bg)",
    border: "var(--callout-note-border)",
    text: "var(--callout-note-text)",
    label: "Note",
  },
};

export default function Callout({ type, title, children, marker }: Props) {
  const c = config[type];
  const Icon = c.icon;

  return (
    <aside
      className="rounded-xl border-l-2 p-3 text-xs shadow-sm transition-shadow hover:shadow-md"
      style={{
        backgroundColor: c.bg,
        borderColor: c.border,
      }}
    >
      <div className="flex items-center gap-1.5 mb-1">
        <Icon className="h-3 w-3 shrink-0" style={{ color: c.border }} />
        <span
          className="font-bold uppercase tracking-wider"
          style={{ color: c.border }}
        >
          {c.label}
        </span>
        {marker && (
          <span className="ml-auto font-mono opacity-40 text-[10px]">
            {marker}
          </span>
        )}
      </div>
      <p className="font-semibold mb-0.5 leading-snug" style={{ color: c.text }}>
        {title}
      </p>
      <div className="leading-snug text-muted">{children}</div>
    </aside>
  );
}
