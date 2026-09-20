import { Download, Upload } from "lucide-react";
import { useMemo, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { isMastered, isNew, masteryOf } from "@/lib/scheduler";
import { downloadProgress, importProgress } from "@/lib/storage";
import { useStore } from "@/store";
import type { Deck } from "@/types";

type Props = {
  deck: Deck;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const NEW_CARD_LIMITS = [
  { value: "0", label: "不限" },
  { value: "10", label: "10" },
  { value: "20", label: "20" },
  { value: "50", label: "50" },
];

const THEMES = [
  { value: "system", label: "跟随系统" },
  { value: "light", label: "浅色" },
  { value: "dark", label: "深色" },
];

export function StatsDialog({ deck, open, onOpenChange }: Props) {
  const stats = useStore((s) => s.progress[deck.id].stats);
  const settings = useStore((s) => s.settings);
  const updateSettings = useStore((s) => s.updateSettings);
  const resetDeck = useStore((s) => s.resetDeck);

  const fileRef = useRef<HTMLInputElement>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const [importError, setImportError] = useState("");

  const overall = useMemo(() => masteryOf(deck.cards, stats), [deck.cards, stats]);

  const bySection = useMemo(() => {
    const rows = new Map<string, { seen: number; mastered: number }>();
    for (const card of deck.cards) {
      const row = rows.get(card.section) ?? { seen: 0, mastered: 0 };
      if (!isNew(stats[card.id])) row.seen += 1;
      if (isMastered(stats[card.id])) row.mastered += 1;
      rows.set(card.section, row);
    }
    return deck.sections.map((section) => ({
      ...section,
      ...(rows.get(section.code) ?? { seen: 0, mastered: 0 }),
    }));
  }, [deck.cards, deck.sections, stats]);

  const onImportFile = async (file: File) => {
    const ok = importProgress(await file.text());
    if (ok) {
      // 进度是在水合时读入 store 的，导入后必须重载页面才能生效
      window.location.reload();
    } else {
      setImportError("这个文件不是有效的进度备份。");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85svh] gap-0 overflow-hidden p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle>{deck.name} · 进度与设置</DialogTitle>
          <DialogDescription>
            已掌握 {overall.mastered} / {overall.total}，背过 {overall.seen}
          </DialogDescription>
        </DialogHeader>

        <div className="flex min-h-0 flex-col gap-6 overflow-y-auto px-6 pb-6">
          <div>
            <Progress value={(overall.mastered / overall.total) * 100} className="h-2.5" />
            <ul className="mt-4 flex flex-col gap-2.5">
              {bySection.map((section) => (
                <li key={section.code}>
                  <div className="mb-1 flex items-baseline justify-between gap-2 text-xs">
                    <span className="truncate">
                      <span className="font-medium">{section.code}</span>
                      <span className="text-muted-foreground ml-2">{section.label}</span>
                    </span>
                    <span className="text-muted-foreground shrink-0 tabular-nums">
                      {section.mastered}/{section.count}
                    </span>
                  </div>
                  <Progress value={(section.mastered / section.count) * 100} className="h-1.5" />
                </li>
              ))}
            </ul>
          </div>

          <section className="flex flex-col gap-4 border-t pt-5">
            <label className="flex cursor-pointer items-start gap-3">
              <Checkbox
                checked={settings.includeMastered}
                onCheckedChange={(v) => updateSettings({ includeMastered: v === true })}
                className="mt-0.5"
              />
              <span>
                <span className="text-sm font-medium">已掌握的词也出现</span>
                <span className="text-muted-foreground block text-xs">
                  默认不再出现；打开后仍以最低权重偶尔复习
                </span>
              </span>
            </label>

            <label className="flex cursor-pointer items-start gap-3">
              <Checkbox
                checked={settings.autoSpeak}
                onCheckedChange={(v) => updateSettings({ autoSpeak: v === true })}
                className="mt-0.5"
              />
              <span>
                <span className="text-sm font-medium">翻面时自动朗读</span>
                <span className="text-muted-foreground block text-xs">
                  用浏览器自带的语音合成朗读词条。卡片上的喇叭按钮随时可以手动触发
                </span>
              </span>
            </label>

            <div>
              <div className="text-sm font-medium">新词节流</div>
              <p className="text-muted-foreground mt-0.5 mb-2 text-xs">
                同时最多放多少个没背过的词进池子。背熟一个补一个，避免上千个新词一起涌上来。
              </p>
              <ToggleGroup
                type="single"
                className="w-full"
                value={String(settings.newCardLimit)}
                onValueChange={(v) => v && updateSettings({ newCardLimit: Number(v) })}
              >
                {NEW_CARD_LIMITS.map((opt) => (
                  <ToggleGroupItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>

            <div>
              <div className="mb-2 text-sm font-medium">主题</div>
              <ToggleGroup
                type="single"
                className="w-full"
                value={settings.theme}
                onValueChange={(v) =>
                  v && updateSettings({ theme: v as "system" | "light" | "dark" })
                }
              >
                {THEMES.map((opt) => (
                  <ToggleGroupItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
          </section>

          <section className="flex flex-col gap-3 border-t pt-5">
            <div>
              <div className="text-sm font-medium">备份</div>
              <p className="text-muted-foreground mt-0.5 text-xs">
                进度只存在这台设备的浏览器里。iOS Safari 连续 7 天没访问就可能清掉，
                建议「添加到主屏幕」，并定期导出备份。
              </p>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={downloadProgress}>
                <Download /> 导出
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => fileRef.current?.click()}>
                <Upload /> 导入
              </Button>
            </div>

            <input
              ref={fileRef}
              type="file"
              accept="application/json,.json"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void onImportFile(file);
                e.target.value = "";
              }}
            />

            {importError && <p className="text-destructive text-xs">{importError}</p>}

            <Button
              variant={confirmReset ? "destructive" : "outline"}
              onClick={() => {
                if (confirmReset) {
                  resetDeck(deck.id);
                  setConfirmReset(false);
                  onOpenChange(false);
                } else {
                  setConfirmReset(true);
                }
              }}
              onBlur={() => setConfirmReset(false)}
            >
              {confirmReset ? "再点一次，清空本词表进度" : `重置 ${deck.name} 的进度`}
            </Button>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
