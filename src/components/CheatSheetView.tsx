import { ChevronLeft, ChevronRight, Loader2, Volume2 } from "lucide-react";
import { Fragment, useEffect, useState } from "react";

import { SHEETS, loadSheet } from "@/cheatsheets";
import { parseRich, spoken } from "@/cheatsheets/rich";
import { closeSheet, openSheet } from "@/cheatsheets/route";
import type { Block, Rich, Sheet } from "@/cheatsheets/types";
import { SpeechErrorToast } from "@/components/SpeechErrorToast";
import { Button } from "@/components/ui/button";
import { useSpeech } from "@/hooks/useSpeech";
import { cn } from "@/lib/utils";

/** 朗读函数；浏览器不支持时为 null，所有喇叭都不渲染 */
type Say = ((text: string) => void) | null;

const hasLetters = (s: string) => /\p{L}/u.test(s);

/** 行内一段可点读的法语：文字 + 小喇叭 */
function Speakable({ show, text, say }: { show: string; text: string; say: Say }) {
  if (!say) {
    return (
      <span lang="fr" className="font-medium">
        {show}
      </span>
    );
  }
  return (
    <button
      type="button"
      lang="fr"
      aria-label={`朗读 ${text}`}
      onClick={() => say(text)}
      className="hover:bg-accent active:bg-accent focus-visible:ring-ring/50 decoration-muted-foreground/50 -mx-0.5 rounded px-0.5 font-medium underline decoration-dotted underline-offset-4 transition-colors focus-visible:ring-[3px] focus-visible:outline-none"
    >
      {show}
      <Volume2 className="text-muted-foreground ml-0.5 inline size-3.5 align-[-0.125em]" />
    </button>
  );
}

function RichText({ text, say }: { text: Rich; say: Say }) {
  return parseRich(text).map((t, i) =>
    t.kind === "text" ? (
      <Fragment key={i}>{t.text}</Fragment>
    ) : t.kind === "bold" ? (
      <strong key={i} className="font-semibold">
        {t.text}
      </strong>
    ) : (
      <Speakable key={i} show={t.show} text={t.say} say={say} />
    ),
  );
}

function TableBlock({ block, say }: { block: Extract<Block, { kind: "table" }>; say: Say }) {
  const frCols = new Set(block.fr ?? []);
  const showHead = block.head.some(Boolean);

  return (
    <div className="-mx-1 overflow-x-auto px-1">
      <table className="w-full border-collapse text-sm">
        {showHead && (
          <thead>
            <tr>
              {block.head.map((h, i) => (
                <th
                  key={i}
                  className="text-muted-foreground border-b px-2 py-1.5 text-left text-xs font-medium first:pl-0"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {block.rows.map((row, r) => (
            <tr key={r} className="border-b last:border-b-0">
              {row.map((cell, c) => (
                <td
                  key={c}
                  // 首列多是短标签，别把「不定冠词」拆成两行
                  className="px-2 py-2 align-top leading-relaxed first:pl-0 first:break-keep"
                >
                  {frCols.has(c) && hasLetters(cell) ? (
                    <Speakable show={spoken(cell)} text={spoken(cell)} say={say} />
                  ) : (
                    <RichText text={cell} say={say} />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ExamplesBlock({ block, say }: { block: Extract<Block, { kind: "examples" }>; say: Say }) {
  return (
    <ul className="divide-y rounded-xl border">
      {block.items.map((ex, i) => {
        const text = ex.say ?? spoken(ex.fr);
        const body = (
          <>
            <div className="min-w-0 flex-1">
              <div lang="fr" className="leading-snug break-words">
                <RichText text={ex.fr} say={null} />
              </div>
              <div className="text-muted-foreground mt-0.5 text-sm leading-snug">{ex.zh}</div>
            </div>
            {say && <Volume2 className="text-muted-foreground mt-0.5 size-5 shrink-0" />}
          </>
        );
        return (
          <li key={i}>
            {say ? (
              // 整行都是点击区，手机上比单独一个小喇叭好点
              <button
                type="button"
                aria-label={`朗读 ${text}`}
                onClick={() => say(text)}
                className="hover:bg-accent/50 active:bg-accent focus-visible:ring-ring/50 flex w-full items-start gap-3 px-3.5 py-2.5 text-left transition-colors first:rounded-t-xl last:rounded-b-xl focus-visible:ring-[3px] focus-visible:outline-none"
              >
                {body}
              </button>
            ) : (
              <div className="flex items-start gap-3 px-3.5 py-2.5">{body}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function BlockView({ block, say }: { block: Block; say: Say }) {
  switch (block.kind) {
    case "p":
      return (
        <p className="leading-relaxed">
          <RichText text={block.text} say={say} />
        </p>
      );
    case "tip":
      return (
        <p className="bg-muted/60 rounded-xl px-3.5 py-2.5 text-sm leading-relaxed">
          <RichText text={block.text} say={say} />
        </p>
      );
    case "table":
      return <TableBlock block={block} say={say} />;
    case "examples":
      return <ExamplesBlock block={block} say={say} />;
  }
}

function PagerLink({ id, dir }: { id: string; dir: "prev" | "next" }) {
  const meta = SHEETS.find((s) => s.id === id);
  if (!meta) return null;
  return (
    <button
      type="button"
      onClick={() => openSheet(id)}
      className={cn(
        "bg-card hover:bg-accent/50 focus-visible:ring-ring/50 flex min-w-0 flex-1 items-center gap-1 rounded-xl border p-3 text-sm transition-colors outline-none focus-visible:ring-[3px]",
        dir === "next" && "justify-end text-right",
      )}
    >
      {dir === "prev" && <ChevronLeft className="text-muted-foreground size-4 shrink-0" />}
      <span className="min-w-0">
        <span className="text-muted-foreground block text-xs">
          {dir === "prev" ? "上一篇" : "下一篇"}
        </span>
        <span className="block truncate font-medium">{meta.title}</span>
      </span>
      {dir === "next" && <ChevronRight className="text-muted-foreground size-4 shrink-0" />}
    </button>
  );
}

/**
 * 语法速查页：纯展示，只有朗读一种交互。
 *
 * 刻意不接 `useStudyClock`——速查是翻阅资料，不算进打卡的学习时长。
 */
export function CheatSheetView({ id }: { id: string }) {
  // 记下载入结果属于哪一页：id 一变，旧结果自然作废，显示成加载中
  const [loaded, setLoaded] = useState<{ id: string; sheet: Sheet | null } | null>(null);
  const { supported, say, failure, dismissFailure } = useSpeech("fr");

  useEffect(() => {
    let alive = true;
    void loadSheet(id)
      .catch(() => null)
      .then((s) => alive && setLoaded({ id, sheet: s }));
    return () => {
      alive = false;
    };
  }, [id]);

  const sheet = loaded?.id === id ? loaded.sheet : null;
  const state = loaded?.id !== id ? "loading" : sheet ? "ready" : "missing";
  const speak: Say = supported ? (text) => say(text) : null;
  const index = SHEETS.findIndex((s) => s.id === id);
  const title = sheet?.title ?? SHEETS[index]?.title ?? "语法速查";

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-xl flex-col px-4 pb-[calc(2rem+env(safe-area-inset-bottom))]">
      <header className="bg-background/95 sticky top-0 z-10 -mx-4 px-2 pt-[calc(0.5rem+env(safe-area-inset-top))] pb-2 backdrop-blur">
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={closeSheet} aria-label="返回首页">
            <ChevronLeft />
          </Button>
          <div className="flex-1 truncate text-sm font-medium">{title}</div>
          {index >= 0 && (
            <span className="text-muted-foreground mr-2 text-xs tabular-nums">
              {index + 1} / {SHEETS.length}
            </span>
          )}
        </div>
      </header>

      {state === "loading" && (
        <div className="text-muted-foreground flex items-center gap-2 pt-8 text-sm">
          <Loader2 className="size-4 animate-spin" />
          加载中
        </div>
      )}

      {state === "missing" && (
        <div className="text-muted-foreground flex flex-col items-start gap-3 pt-8 text-sm">
          <p>没有找到这一页。</p>
          <Button variant="outline" onClick={closeSheet}>
            返回首页
          </Button>
        </div>
      )}

      {state === "ready" && sheet && (
        <article>
          <h1 className="pt-4 text-2xl font-semibold tracking-tight">{sheet.title}</h1>
          <p className="text-muted-foreground mt-3 leading-relaxed">
            <RichText text={sheet.lead} say={speak} />
          </p>

          {sheet.sections.map((section) => (
            <section key={section.title} className="mt-8">
              <h2 className="mb-3 text-lg font-semibold">{section.title}</h2>
              <div className="flex flex-col gap-3">
                {section.blocks.map((block, i) => (
                  <BlockView key={i} block={block} say={speak} />
                ))}
              </div>
            </section>
          ))}

          <nav className="mt-10 flex gap-3">
            {index > 0 && <PagerLink id={SHEETS[index - 1].id} dir="prev" />}
            {index >= 0 && index < SHEETS.length - 1 && (
              <PagerLink id={SHEETS[index + 1].id} dir="next" />
            )}
          </nav>
        </article>
      )}

      {failure && (
        <SpeechErrorToast
          key={failure.detail ?? failure.message}
          failure={failure}
          onDismiss={dismissFailure}
        />
      )}
    </div>
  );
}
