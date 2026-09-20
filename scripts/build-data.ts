/**
 * 从 `vocab/<exam>/_src.psv` 生成网页用的 JSON 词库。
 *
 * 运行：vp run build:data
 * 产物：public/data/pte-core.json、public/data/tcf-canada.json（生成物，勿手改）
 */
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT_DIR = join(dirname(fileURLToPath(import.meta.url)), "..");
const VOCAB_DIR = join(ROOT_DIR, "vocab");
const OUT_DIR = join(ROOT_DIR, "public", "data");

type RawDeck = {
  id: string;
  name: string;
  subtitle: string;
  /** 卡片正面文本的语言，用于 lang 属性与字体回退 */
  lang: string;
  src: string;
  sectionMap: string;
  /** 音标查找表，由 scripts/build-ipa.ts 生成 */
  ipaTable: string;
  /** 释义列的表头，与 glosses 数组一一对应 */
  glossLabels: string[];
  /** 从 PSV 的一行取出各字段 */
  pick: (f: string[]) => {
    front: string;
    pos: string;
    glosses: string[];
    note: string;
    example: string;
  };
};

const DECKS: RawDeck[] = [
  {
    id: "pte-core",
    name: "PTE Core",
    subtitle: "英语 · 目标 CLB 9",
    lang: "en",
    src: join(VOCAB_DIR, "pte-core", "_src.psv"),
    sectionMap: join(VOCAB_DIR, "tools", "sections-en.txt"),
    ipaTable: join(VOCAB_DIR, "tools", "ipa-en.tsv"),
    glossLabels: ["中文"],
    // section|theme|term|pos|zh|note|example
    pick: (f) => ({ front: f[2], pos: f[3], glosses: [f[4]], note: f[5], example: f[6] }),
  },
  {
    id: "tcf-canada",
    name: "TCF Canada",
    subtitle: "法语 · 目标 NCLC 7+",
    lang: "fr",
    src: join(VOCAB_DIR, "tcf-canada", "_src.psv"),
    sectionMap: join(VOCAB_DIR, "tools", "sections-fr.txt"),
    ipaTable: join(VOCAB_DIR, "tools", "ipa-fr.tsv"),
    glossLabels: ["English", "中文"],
    // section|theme|fr|pos|en|zh|note|exemple
    pick: (f) => ({ front: f[2], pos: f[3], glosses: [f[4], f[5]], note: f[6], example: f[7] }),
  },
];

/** 读取 UTF-8 文本并按行切分，统一处理 CRLF 与 BOM，丢掉空行 */
function readLines(path: string): string[] {
  return readFileSync(path, "utf8")
    .replace(/^﻿/, "")
    .split(/\r?\n/)
    .filter((line) => line.length > 0);
}

/**
 * 卡片 ID：`section|theme|front` 的 sha256 前 10 位 base64url。
 * 该三元组在两份词表中均唯一，所以重排行序、修改释义/用法/例句都不会影响 ID，
 * 学习进度得以保留；只有改动词条本身才会重置那一条。
 */
function cardId(section: string, theme: string, front: string): string {
  return createHash("sha256")
    .update(`${section}|${theme}|${front}`, "utf8")
    .digest("base64url")
    .slice(0, 10);
}

/** 读音标表：<词条><TAB><音标>，# 开头是注释 */
function readIpa(path: string): Map<string, string> {
  const map = new Map<string, string>();
  for (const line of readLines(path)) {
    if (line.startsWith("#")) continue;
    const tab = line.indexOf("	");
    if (tab > 0) map.set(line.slice(0, tab), line.slice(tab + 1));
  }
  return map;
}

function buildDeck(deck: RawDeck) {
  const sectionLabels = new Map<string, string>();
  for (const line of readLines(deck.sectionMap)) {
    const eq = line.indexOf("=");
    if (eq > 0) sectionLabels.set(line.slice(0, eq), line.slice(eq + 1));
  }

  const ipaTable = readIpa(deck.ipaTable);

  const lines = readLines(deck.src);
  const expectedCols = lines[0].split("|").length;

  const cards: Record<string, unknown>[] = [];
  const seenIds = new Set<string>();
  /** section 首次出现的顺序即为建议背诵顺序，与 README 的模块表一致 */
  const sectionOrder: string[] = [];
  const sectionCounts = new Map<string, number>();

  for (const [i, line] of lines.slice(1).entries()) {
    const f = line.split("|");
    if (f.length !== expectedCols) {
      throw new Error(`${deck.src}:${i + 2} 列数为 ${f.length}，应为 ${expectedCols}`);
    }

    const [section, theme] = f;
    const { front, pos, glosses, note, example } = deck.pick(f);
    const id = cardId(section, theme, front);
    if (seenIds.has(id)) {
      throw new Error(`${deck.src}:${i + 2} 卡片 ID 冲突：${section}|${theme}|${front}`);
    }
    seenIds.add(id);

    if (!sectionCounts.has(section)) sectionOrder.push(section);
    sectionCounts.set(section, (sectionCounts.get(section) ?? 0) + 1);

    // 只有能归约成单个词的条目有音标，多词语块靠页面 TTS 朗读
    const ipa = ipaTable.get(front);
    cards.push({ id, section, theme, front, pos, glosses, note, example, ...(ipa ? { ipa } : {}) });
  }

  return {
    id: deck.id,
    name: deck.name,
    subtitle: deck.subtitle,
    lang: deck.lang,
    glossLabels: deck.glossLabels,
    ipaCount: cards.filter((c) => c.ipa).length,
    sections: sectionOrder.map((code) => ({
      code,
      label: sectionLabels.get(code) ?? code,
      count: sectionCounts.get(code) ?? 0,
    })),
    cards,
  };
}

mkdirSync(OUT_DIR, { recursive: true });

/** 选词表页只需要这些元信息，单独出一个小清单，避免开屏就拉两份整库 */
const manifest = [];

for (const deck of DECKS) {
  const built = buildDeck(deck);
  const json = JSON.stringify(built);
  writeFileSync(join(OUT_DIR, `${deck.id}.json`), json);

  manifest.push({
    id: built.id,
    name: built.name,
    subtitle: built.subtitle,
    lang: built.lang,
    count: built.cards.length,
    sectionCount: built.sections.length,
  });

  const kb = Math.round(Buffer.byteLength(json) / 1024);
  console.log(
    `${deck.id.padEnd(12)} ${String(built.cards.length).padStart(5)} 条  ${built.sections.length} 个模块  ${String(built.ipaCount).padStart(4)} 条带音标  ${kb} KB`,
  );
}

writeFileSync(join(OUT_DIR, "index.json"), JSON.stringify(manifest));
console.log(`index.json    ${manifest.length} 个词表`);
