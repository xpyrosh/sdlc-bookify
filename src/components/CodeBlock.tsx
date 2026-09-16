"use client";

import { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { Copy, Check, FileCode } from "lucide-react";

interface Props {
  code: string;
  language: string;
  filename?: string;
}

export default function CodeBlock({ code, language, filename }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const prismLang =
    language === "text" || language === "dockerfile" ? "bash" : language;

  return (
    <div className="my-5 overflow-hidden rounded-2xl border border-border bg-code-bg shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.03] px-4 py-2">
        <div className="flex items-center gap-2">
          <FileCode className="h-3.5 w-3.5 text-white/30" />
          {filename && (
            <span className="text-xs font-medium text-white/50">
              {filename}
            </span>
          )}
          <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-mono text-white/40">
            {language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-white/40 transition-colors hover:bg-white/10 hover:text-white/70"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3" /> Copied
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" /> Copy
            </>
          )}
        </button>
      </div>

      {/* Code */}
      <Highlight
        theme={themes.nightOwl}
        code={code.trim()}
        language={prismLang}
      >
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className="overflow-x-auto p-4 text-[13px] leading-relaxed"
            style={{ ...style, backgroundColor: "transparent" }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })} className="table-row">
                <span className="table-cell select-none pr-4 text-right text-xs text-white/15 w-8">
                  {i + 1}
                </span>
                <span className="table-cell">
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </span>
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
