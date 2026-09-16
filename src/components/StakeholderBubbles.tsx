"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Stakeholder } from "@/lib/chapters";

interface Props {
  stakeholders: Stakeholder[];
}

export default function StakeholderBubbles({ stakeholders }: Props) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <div className="flex flex-wrap items-center gap-2">
      {stakeholders.map((s, i) => (
        <div key={s.role} className="relative">
          <button
            onMouseEnter={() => setActiveIdx(i)}
            onMouseLeave={() => setActiveIdx(null)}
            onClick={() => setActiveIdx(activeIdx === i ? null : i)}
            className="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm transition-all duration-150 border border-transparent hover:shadow-md"
            style={{
              backgroundColor: `${s.color}14`,
              borderColor: activeIdx === i ? s.color : "transparent",
              boxShadow:
                activeIdx === i ? `0 0 0 1px ${s.color}40` : undefined,
            }}
          >
            <span
              className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white shadow-sm"
              style={{ backgroundColor: s.color }}
            >
              {s.abbr}
            </span>
            <span className="text-foreground text-xs font-medium hidden sm:inline">
              {s.role}
            </span>
          </button>

          <AnimatePresence>
            {activeIdx === i && (
              <motion.div
                initial={{ opacity: 0, y: 4, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.97 }}
                transition={{ duration: 0.12 }}
                className="absolute left-0 top-full z-50 mt-2 w-60 rounded-xl border border-border bg-surface p-3 shadow-lg"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className="flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold text-white"
                    style={{ backgroundColor: s.color }}
                  >
                    {s.abbr}
                  </span>
                  <span className="text-xs font-semibold text-foreground">
                    {s.role}
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-muted">
                  {s.responsibility}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
