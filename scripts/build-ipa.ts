/**
 * 为词表生成音标查找表。
 *
 * 运行：vp run build:ipa（需要联网，从 GitHub 拉音标词典）
 * 产物：vocab/tools/ipa-en.tsv、vocab/tools/ipa-fr.tsv
 *
 * 数据源 open-dict-data/ipa-dict（MIT）：
 *   英语用 en_US（通用美音，音系上最接近加拿大英语）
 *   法语用 fr_FR（标准法语）。ipa-dict 也有 fr_QC，但那是窄式转写，
 *   带双元音化和塞擦化（cordialement 记成 /kɑɔ̯ʁd͡zjalmæ̃/），
 *   对照学习用不便；魁北克特有的词汇已经由词表的 CANADA 模块覆盖。
 *   想换成魁北克读音，把下面 JOBS 里的 dict 改成 "fr_QC" 即可。
 *
 * **只给能归约成单个词的条目标音标。** 多词语块一律跳过：逐词拼接出来的音标
 * 每个词都带主重音、法语还丢了联诵（`met en avant` 实际读 /mɛt‿ɑ̃navɑ̃/ 而不是
 * /ma ɑ̃ avɑ̃/），读着是错的，还会把 PTE 的 RA 模块要练的弱读教反。
 * 那部分交给页面上的 TTS 朗读。
 *
 * 词条写成 `enrol / enrolment` 这种并列变体时逐个查，音标也用 / 并列。
 *
 * 产物是 TSV，提交进仓库，**可以手工修正**。build-data.ts 只读这份表、不联网，
 * 所以日常构建不依赖这个脚本。
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT_DIR = join(dirname(fileURLToPath(import.meta.url)), "..");
const VOCAB_DIR = join(ROOT_DIR, "vocab");
const OUT_DIR = join(VOCAB_DIR, "tools");

const SOURCE = "https://raw.githubusercontent.com/open-dict-data/ipa-dict/master/data";

type Job = {
  out: string;
  dict: string;
  src: string;
  /** _src.psv 里词条所在的列（0 起） */
  termCol: number;
  /** 查词前剥掉的冠词等前缀——词典按裸词收录 */
  strip: RegExp;
};

const JOBS: Job[] = [
  {
    out: "ipa-en.tsv",
    dict: "en_US",
    src: join(VOCAB_DIR, "pte-core", "_src.psv"),
    termCol: 2,
    strip: /^(the|a|an)\s+/i,
  },
  {
    out: "ipa-fr.tsv",
    dict: "fr_FR",
    src: join(VOCAB_DIR, "tcf-canada", "_src.psv"),
    termCol: 2,
    strip: /^(le|la|les|un|une|des|du)\s+|^l'/i,
  },
];

async function loadDict(name: string): Promise<Map<string, string>> {
  const res = await fetch(`${SOURCE}/${name}.txt`);
  if (!res.ok) throw new Error(`拉取 ${name} 失败：HTTP ${res.status}`);

  const map = new Map<string, string>();
  for (const line of (await res.text()).split("\n")) {
    const tab = line.indexOf("\t");
    if (tab < 0) continue;
    const word = line.slice(0, tab).toLowerCase();
    // 同一个词可能给多个读音，逗号分隔，取第一个
    const ipa = line
      .slice(tab + 1)
      .split(",")[0]
      .trim();
    if (ipa && !map.has(word)) map.set(word, ipa);
  }
  return map;
}

/** 归约成单个待查的词；null 表示这条不适合标音标 */
function reduceToWord(term: string, strip: RegExp): string | null {
  const cleaned = term
    .replace(/[…（）()]/g, " ")
    .trim()
    .replace(strip, "");

  // 含占位符、标点或中文的条目跳过
  if (/[+、，。？！:;"'’]|[一-鿿]/.test(cleaned)) return null;

  const word = cleaned.replace(/^[^\p{L}'-]+|[^\p{L}'-]+$/gu, "").toLowerCase();
  if (!word || /[\s-]/.test(word)) return null;
  return word;
}

mkdirSync(OUT_DIR, { recursive: true });

for (const job of JOBS) {
  const dict = await loadDict(job.dict);

  const terms = readFileSync(job.src, "utf8")
    .replace(/^﻿/, "")
    .split(/\r?\n/)
    .slice(1)
    .filter(Boolean)
    .map((line) => line.split("|")[job.termCol]);

  const rows: string[] = [];
  const seen = new Set<string>();
  let hit = 0;

  for (const term of terms) {
    if (seen.has(term)) continue;
    seen.add(term);

    // 并列变体逐个查，任一查不到就整条放弃，免得音标和词条对不上
    const parts = term.split(" / ").map((variant) => {
      const word = reduceToWord(variant, job.strip);
      return word ? dict.get(word) : undefined;
    });
    if (parts.some((part) => !part)) continue;

    rows.push(`${term}\t${parts.join(" / ")}`);
    hit += 1;
  }

  const header = [
    `# ${job.out} —— 由 scripts/build-ipa.ts 生成，可手工修正`,
    `# 数据源：open-dict-data/ipa-dict ${job.dict}（MIT）`,
    `# 只收能归约成单个词的条目，多词语块靠页面上的 TTS 朗读`,
    `# 格式：<词条><TAB><音标>，词条须与 _src.psv 第 ${job.termCol + 1} 列完全一致`,
  ].join("\n");

  writeFileSync(join(OUT_DIR, job.out), `${header}\n${rows.join("\n")}\n`);
  console.log(
    `${job.out.padEnd(12)} ${String(hit).padStart(5)} / ${String(seen.size).padStart(5)} 条覆盖  (${Math.round((hit / seen.size) * 100)}%)`,
  );
}
