import { ChevronRight } from "lucide-react";

import { SHEETS } from "@/cheatsheets";
import { openSheet } from "@/cheatsheets/route";

/** 首页词表下方的语法速查入口 */
export function CheatSheetList() {
  return (
    <section className="mt-8">
      <h2 className="text-lg font-semibold">法语语法速查</h2>
      <p className="text-muted-foreground mt-1 text-sm">零基础入门，按顺序看，例句都能点读</p>

      <ol className="bg-card mt-3 divide-y rounded-xl border">
        {SHEETS.map((sheet, i) => (
          <li key={sheet.id}>
            <button
              type="button"
              onClick={() => openSheet(sheet.id)}
              className="hover:bg-accent/50 focus-visible:ring-ring/50 flex w-full items-center gap-3 px-4 py-3 text-left transition-colors outline-none first:rounded-t-xl last:rounded-b-xl focus-visible:ring-[3px]"
            >
              <span className="text-muted-foreground w-5 shrink-0 text-sm tabular-nums">
                {i + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-medium">{sheet.title}</span>
                <span className="text-muted-foreground block truncate text-xs">
                  {sheet.summary}
                </span>
              </span>
              <ChevronRight className="text-muted-foreground size-4 shrink-0" />
            </button>
          </li>
        ))}
      </ol>
    </section>
  );
}
