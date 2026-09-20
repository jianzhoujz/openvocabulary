import { Eye } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Card, Deck, Mode } from "@/types";

type Props = {
  card: Card;
  deck: Deck;
  mode: Mode;
  revealed: boolean;
  sectionLabel: string;
  onReveal: () => void;
};

export function StudyCard({ card, deck, mode, revealed, sectionLabel, onReveal }: Props) {
  const askingForGloss = mode === "front-to-gloss";
  // 正面考什么，背面就把另一侧作为答案重点呈现
  const promptLang = askingForGloss ? deck.lang : "zh";

  return (
    <div
      className={cn(
        "bg-card flex h-full w-full flex-col rounded-2xl border p-5 sm:p-6",
        !revealed && "cursor-pointer",
      )}
      onClick={!revealed ? onReveal : undefined}
    >
      <div className="text-muted-foreground flex shrink-0 items-center gap-2 text-xs">
        <span className="bg-muted text-foreground/70 rounded px-1.5 py-0.5 font-medium">
          {card.section}
        </span>
        <span className="truncate">{sectionLabel}</span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col justify-center overflow-y-auto py-6">
        {/* 题面 */}
        <div
          lang={promptLang}
          className="text-2xl leading-snug font-semibold break-words sm:text-3xl"
        >
          {askingForGloss ? card.front : card.glosses.join(" / ")}
        </div>

        {card.pos && <div className="text-muted-foreground mt-2 text-sm italic">{card.pos}</div>}

        {revealed && (
          <div className="mt-6 flex flex-col gap-4 border-t pt-6">
            {/* 答案 */}
            <div
              lang={askingForGloss ? "zh" : deck.lang}
              className="text-xl leading-snug font-medium break-words"
            >
              {askingForGloss ? card.glosses.join(" / ") : card.front}
            </div>

            {card.note && (
              <div>
                <div className="text-muted-foreground mb-1 text-xs font-medium">用法要点</div>
                <p className="text-sm leading-relaxed">{card.note}</p>
              </div>
            )}

            {card.example && (
              <div>
                <div className="text-muted-foreground mb-1 text-xs font-medium">例句</div>
                <p lang={deck.lang} className="text-sm leading-relaxed italic">
                  {card.example}
                </p>
              </div>
            )}

            <div className="text-muted-foreground text-xs">{card.theme}</div>
          </div>
        )}
      </div>

      {!revealed && (
        <div className="text-muted-foreground flex shrink-0 items-center justify-center gap-1.5 text-xs">
          <Eye className="size-3.5" />
          点一下看答案
          <kbd className="bg-muted ml-1 hidden rounded px-1.5 py-0.5 font-mono sm:inline">空格</kbd>
        </div>
      )}
    </div>
  );
}
