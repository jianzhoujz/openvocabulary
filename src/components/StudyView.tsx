import { BarChart3, Check, ChevronLeft, Loader2, SlidersHorizontal, X } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import { SectionFilter } from "@/components/SectionFilter";
import { StatsDialog } from "@/components/StatsDialog";
import { StudyCard } from "@/components/StudyCard";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useAnswerKeys } from "@/hooks/useAnswerKeys";
import { useStore } from "@/store";
import type { Mode } from "@/types";

export function StudyView() {
  const deck = useStore((s) => s.deck);
  const status = useStore((s) => s.status);
  const current = useStore((s) => s.current);
  const revealed = useStore((s) => s.revealed);
  const session = useStore((s) => s.session);
  const mode = useStore((s) => s.settings.mode);
  const reveal = useStore((s) => s.reveal);
  const answer = useStore((s) => s.answer);
  const leaveDeck = useStore((s) => s.leaveDeck);
  const updateSettings = useStore((s) => s.updateSettings);

  const [filterOpen, setFilterOpen] = useState(false);
  const [statsOpen, setStatsOpen] = useState(false);

  const sectionLabels = useMemo(
    () => new Map(deck?.sections.map((s) => [s.code, s.label]) ?? []),
    [deck],
  );

  const onAnswer = useCallback((correct: boolean) => answer(correct), [answer]);

  useAnswerKeys({
    enabled: status === "ready" && current !== null && !filterOpen && !statsOpen,
    revealed,
    onReveal: reveal,
    onAnswer,
  });

  if (status === "loading" || !deck) {
    return (
      <div className="text-muted-foreground flex h-dvh items-center justify-center gap-2 text-sm">
        {status === "error" ? (
          <div className="flex flex-col items-center gap-3">
            <p>词表加载失败。</p>
            <Button variant="outline" onClick={leaveDeck}>
              返回
            </Button>
          </div>
        ) : (
          <>
            <Loader2 className="size-4 animate-spin" />
            加载词表
          </>
        )}
      </div>
    );
  }

  const answered = session.ok + session.bad;
  const rate = answered > 0 ? Math.round((session.ok / answered) * 100) : 0;

  return (
    <div className="mx-auto flex h-dvh w-full max-w-xl flex-col px-3 sm:px-4">
      <header className="shrink-0 pt-[calc(0.5rem+env(safe-area-inset-top))] pb-2">
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={leaveDeck} aria-label="返回词表列表">
            <ChevronLeft />
          </Button>
          <div className="flex-1 truncate text-sm font-medium">{deck.name}</div>
          {answered > 0 && (
            <span className="text-muted-foreground mr-1 text-xs tabular-nums">
              {answered} 题 · {rate}%
            </span>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setFilterOpen(true)}
            aria-label="选择模块"
          >
            <SlidersHorizontal />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setStatsOpen(true)}
            aria-label="进度与设置"
          >
            <BarChart3 />
          </Button>
        </div>

        <ToggleGroup
          type="single"
          className="mt-2 w-full"
          value={mode}
          onValueChange={(v) => v && updateSettings({ mode: v as Mode })}
        >
          <ToggleGroupItem value="front-to-gloss">看词猜义</ToggleGroupItem>
          <ToggleGroupItem value="gloss-to-front">看义猜词</ToggleGroupItem>
        </ToggleGroup>
      </header>

      <main className="min-h-0 flex-1 py-2">
        {current ? (
          <StudyCard
            card={current}
            deck={deck}
            mode={mode}
            revealed={revealed}
            sectionLabel={sectionLabels.get(current.section) ?? current.section}
            onReveal={reveal}
          />
        ) : (
          <div className="text-muted-foreground flex h-full flex-col items-center justify-center gap-3 text-center text-sm">
            <p>
              当前筛选条件下没有可背的词。
              <br />
              可能是模块全没选，或者这些模块都背完了。
            </p>
            <Button variant="outline" onClick={() => setFilterOpen(true)}>
              调整模块
            </Button>
          </div>
        )}
      </main>

      <footer className="shrink-0 pt-2 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
        {revealed && current ? (
          <div className="flex gap-3">
            <Button variant="bad" size="answer" onClick={() => onAnswer(false)}>
              <X />
              没记住
              <kbd className="ml-1 hidden font-mono text-xs opacity-70 sm:inline">←</kbd>
            </Button>
            <Button variant="ok" size="answer" onClick={() => onAnswer(true)}>
              <Check />
              记住了
              <kbd className="ml-1 hidden font-mono text-xs opacity-70 sm:inline">→</kbd>
            </Button>
          </div>
        ) : (
          <Button size="answer" className="w-full" disabled={!current} onClick={reveal}>
            看答案
          </Button>
        )}
      </footer>

      <SectionFilter deck={deck} open={filterOpen} onOpenChange={setFilterOpen} />
      <StatsDialog deck={deck} open={statsOpen} onOpenChange={setStatsOpen} />
    </div>
  );
}
