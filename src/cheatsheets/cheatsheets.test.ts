import { describe, expect, it } from "vite-plus/test";

import { SHEETS, loadSheet } from "@/cheatsheets";
import { parseRich, spoken } from "@/cheatsheets/rich";
import type { Rich, Sheet } from "@/cheatsheets/types";

describe("parseRich", () => {
  it("切出可点读的法语、强调和普通文本", () => {
    expect(parseRich("用 [[le]] 或 **重点**，再 [[l'|l'ami]]。")).toEqual([
      { kind: "text", text: "用 " },
      { kind: "fr", show: "le", say: "le" },
      { kind: "text", text: " 或 " },
      { kind: "bold", text: "重点" },
      { kind: "text", text: "，再 " },
      { kind: "fr", show: "l'", say: "l'ami" },
      { kind: "text", text: "。" },
    ]);
  });

  it("朗读文本去掉强调星号", () => {
    expect(spoken("Je bois **du** café.")).toBe("Je bois du café.");
  });
});

/** 一页里所有带标记的文本 */
function richTexts(sheet: Sheet): Rich[] {
  const out: Rich[] = [sheet.lead];
  for (const section of sheet.sections) {
    for (const block of section.blocks) {
      if (block.kind === "p" || block.kind === "tip") out.push(block.text);
      if (block.kind === "table") out.push(...block.rows.flat());
      if (block.kind === "examples") out.push(...block.items.map((x) => x.fr));
    }
  }
  return out;
}

describe("速查页内容", () => {
  it("id 不重复", () => {
    expect(new Set(SHEETS.map((s) => s.id)).size).toBe(SHEETS.length);
  });

  it.each(SHEETS)("$id：能载入，元信息与首页一致", async (meta) => {
    const sheet = await loadSheet(meta.id);
    expect(sheet).not.toBeNull();
    expect(sheet).toMatchObject(meta);
  });

  it.each(SHEETS)("$id：标记都配对，没有漏写的 [[ ]] 或 **", async (meta) => {
    const sheet = (await loadSheet(meta.id))!;
    for (const text of richTexts(sheet)) {
      const leftover = parseRich(text)
        .filter((t) => t.kind === "text")
        .map((t) => t.text)
        .join("");
      expect(leftover, text).not.toMatch(/\[\[|\]\]|\*\*/);
    }
  });

  it.each(SHEETS)("$id：表格每行列数与表头一致，法语列号不越界", async (meta) => {
    const sheet = (await loadSheet(meta.id))!;
    for (const section of sheet.sections) {
      for (const block of section.blocks) {
        if (block.kind !== "table") continue;
        for (const row of block.rows) expect(row, section.title).toHaveLength(block.head.length);
        for (const col of block.fr ?? []) expect(col).toBeLessThan(block.head.length);
      }
    }
  });

  it("未知的 id 返回 null", async () => {
    expect(await loadSheet("nope")).toBeNull();
  });
});
