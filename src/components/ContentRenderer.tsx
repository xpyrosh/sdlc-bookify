"use client";

import type { ContentBlock } from "@/lib/chapters";
import CodeBlock from "./CodeBlock";
import Callout from "./Callout";

interface Props {
  blocks: ContentBlock[];
}

function renderMarkdownText(text: string) {
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  let listItems: React.ReactNode[] = [];
  let isInList = false;

  const processInline = (line: string, key: number) => {
    const parts: React.ReactNode[] = [];
    let remaining = line;
    let idx = 0;

    while (remaining.length > 0) {
      const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
      const codeMatch = remaining.match(/`(.+?)`/);

      let firstMatch: {
        match: RegExpMatchArray;
        type: "bold" | "code";
      } | null = null;

      if (boldMatch && boldMatch.index !== undefined) {
        firstMatch = { match: boldMatch, type: "bold" };
      }
      if (
        codeMatch &&
        codeMatch.index !== undefined &&
        (!firstMatch || codeMatch.index < firstMatch.match.index!)
      ) {
        firstMatch = { match: codeMatch, type: "code" };
      }

      if (!firstMatch) {
        parts.push(remaining);
        break;
      }

      const before = remaining.slice(0, firstMatch.match.index!);
      if (before) parts.push(before);

      if (firstMatch.type === "bold") {
        parts.push(
          <strong key={`${key}-${idx}`} className="font-semibold text-foreground">
            {firstMatch.match[1]}
          </strong>
        );
      } else {
        parts.push(
          <code
            key={`${key}-${idx}`}
            className="rounded-md bg-accent-surface px-1.5 py-0.5 text-sm font-mono text-accent-text"
          >
            {firstMatch.match[1]}
          </code>
        );
      }

      remaining = remaining.slice(
        firstMatch.match.index! + firstMatch.match[0].length
      );
      idx++;
    }

    return parts;
  };

  const flushList = (key: string) => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={key} className="my-3 ml-5 space-y-1.5 list-disc text-muted">
          {listItems}
        </ul>
      );
      listItems = [];
    }
  };

  lines.forEach((line, i) => {
    const trimmed = line.trim();

    if (/^\d+\.\s/.test(trimmed)) {
      if (!isInList) {
        flushList(`flush-${i}`);
        isInList = true;
      }
      const content = trimmed.replace(/^\d+\.\s/, "");
      listItems.push(
        <li key={`li-${i}`} className="text-muted leading-relaxed">
          {processInline(content, i)}
        </li>
      );
      return;
    }

    if (trimmed.startsWith("- ")) {
      if (!isInList) {
        flushList(`flush-${i}`);
        isInList = true;
      }
      const content = trimmed.slice(2);
      if (content.startsWith("[ ] ") || content.startsWith("[x] ")) {
        const checked = content.startsWith("[x]");
        const label = content.slice(4);
        listItems.push(
          <li
            key={`li-${i}`}
            className="flex items-start gap-2.5 text-muted leading-relaxed list-none -ml-5"
          >
            <span
              className={`mt-1 inline-block h-4 w-4 rounded border ${
                checked
                  ? "border-accent bg-accent-surface"
                  : "border-border"
              } flex-shrink-0`}
            />
            {processInline(label, i)}
          </li>
        );
      } else {
        listItems.push(
          <li key={`li-${i}`} className="text-muted leading-relaxed">
            {processInline(content, i)}
          </li>
        );
      }
      return;
    }

    if (isInList) {
      flushList(`flush-${i}`);
      isInList = false;
    }

    if (trimmed === "") {
      elements.push(<div key={`br-${i}`} className="h-3" />);
    } else {
      elements.push(
        <p key={`p-${i}`} className="text-muted leading-relaxed">
          {processInline(trimmed, i)}
        </p>
      );
    }
  });

  flushList("flush-end");
  return elements;
}

function ContentBlock({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "heading":
      return block.level === 2 ? (
        <h2 className="text-xl font-bold text-foreground">{block.content}</h2>
      ) : (
        <h3 className="text-lg font-semibold text-foreground">{block.content}</h3>
      );

    case "text":
      return <>{renderMarkdownText(block.content || "")}</>;

    case "code":
      return (
        <CodeBlock
          code={block.code!.code}
          language={block.code!.language}
          filename={block.code!.filename}
        />
      );

    case "table":
      return (
        <div className="overflow-x-auto rounded-2xl border border-border bg-surface">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-2">
                {block.tableHeaders!.map((h, j) => (
                  <th
                    key={j}
                    className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.tableRows!.map((row, j) => (
                <tr
                  key={j}
                  className="border-b border-border/50 transition-colors hover:bg-surface-2/50"
                >
                  {row.map((cell, k) => (
                    <td key={k} className="px-5 py-3 text-muted">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    default:
      return null;
  }
}

// Group each main content block with any immediately following callouts.
function groupBlocks(blocks: ContentBlock[]) {
  const groups: { main?: ContentBlock; callouts: ContentBlock[] }[] = [];

  for (const block of blocks) {
    if (block.type === "callout") {
      const last = groups[groups.length - 1];
      if (last) {
        last.callouts.push(block);
      } else {
        groups.push({ callouts: [block] });
      }
    } else {
      groups.push({ main: block, callouts: [] });
    }
  }

  return groups;
}

function CalloutNode({
  block,
  marker,
}: {
  block: ContentBlock;
  marker: number;
}) {
  if (block.type !== "callout") return null;
  return (
    <Callout
      type={block.callout!.type}
      title={block.callout!.title}
      marker={marker}
    >
      {block.callout!.content}
    </Callout>
  );
}

export default function ContentRenderer({ blocks }: Props) {
  const groups = groupBlocks(blocks);
  let marker = 1;

  return (
    <div className="space-y-5">
      {groups.map((group, i) => {
        const hasMain = !!group.main;

        return (
          <div key={i} className="relative my-5">
            {/* Main content */}
            {hasMain && <ContentBlock block={group.main!} />}

            {/* Right gutter sidenotes on large screens */}
            {group.callouts.length > 0 && (
              <div className="hidden xl:flex xl:absolute xl:left-full xl:top-0 xl:ml-6 xl:w-60 xl:flex-col xl:gap-5">
                {group.callouts.map((c) => {
                  const m = marker++;
                  return <CalloutNode key={m} block={c} marker={m} />;
                })}
              </div>
            )}

            {/* Inline sidenotes for smaller screens */}
            {group.callouts.length > 0 && (
              <div className="xl:hidden mt-3 space-y-3">
                {group.callouts.map((c) => {
                  const m = marker++;
                  return <CalloutNode key={m} block={c} marker={m} />;
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
