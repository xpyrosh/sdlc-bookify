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
    color: "var(--callout-edge-border)",
    label: "Edge Case",
  },
  warning: {
    icon: AlertTriangle,
    color: "var(--callout-warn-border)",
    label: "Warning",
  },
  tip: {
    icon: Lightbulb,
    color: "var(--callout-tip-border)",
    label: "Tip",
  },
  note: {
    icon: Info,
    color: "var(--callout-note-border)",
    label: "Note",
  },
};

export default function Callout({ type, title, children, marker }: Props) {
  const c = config[type];
  const Icon = c.icon;
  const rotate =
    (marker ?? 0) % 2 === 0 ? "sidenote-rotate-left" : "sidenote-rotate-right";

  return (
    <aside className={`sidenote-card ${rotate}`}>
      <div className="absolute right-2 top-1.5 flex flex-col items-end gap-0">
        <Icon className="h-2.5 w-2.5" style={{ color: c.color }} />
        <span
          className="text-[9px] font-bold uppercase tracking-wider leading-none"
          style={{ color: c.color }}
        >
          {c.label}
        </span>
      </div>

      <div className="space-y-0 text-[11px] leading-[1.35rem]">
        <p className="font-semibold" style={{ color: "var(--sidenote-text)" }}>
          {title}
        </p>
        <div className="opacity-80">{children}</div>
      </div>

      {marker && (
        <span className="absolute bottom-1 right-2 font-mono text-[8px] opacity-40">
          {marker}
        </span>
      )}
    </aside>
  );
}
