/**
 * 为词表生成音标查找表。
 *
 * 运行：vp run build:ipa（需要联网，从 GitHub 拉音标词典）
 * 产物：vocab/tools/ipa-en.tsv、vocab/tools/ipa-fr.tsv
 *
 * 数据源 open-dict-data/ipa-dict（MIT）：
 *   英语用 en_US（通用美音，音系上最接近加拿大英语）
 *   法语以**标准加拿大法语**为准（魁北克受教育者的标准音，Radio-Canada 播音即此）。
 *   ipa-dict 的 fr_QC 不能直接用：它记的是魁北克口语音（fête /fat/、père /paʁ/、
 *   table /tab/），带双元音化和塞擦化，拿来备考会把俗语口音当标准。
 *   所以底子用 fr_FR，再由 toCanadianStandard() 补上加拿大标准音保留、而法国已经
 *   合并掉的音位对立：â → /ɑ/（pâte ≠ patte），闭音节里的 ê / aî → /ɛː/（fête ≠ faite）。
 *   /ɛ̃/ ≠ /œ̃/（brin ≠ brun）fr_FR 本来就分，不用改。
 *   t、d 在 i、u 前的塞擦化（tu [t͡sy]）、闭音节高元音松化（petite [pət͡sɪt]）是
 *   自动音变，宽式音标不标，规则写在语法速查的「发音规则」页。
 *
 * **只给能归约成单个词的条目标音标。** 多词语块一律跳过：逐词拼接出来的音标
 * 每个词都带主重音、法语还丢了联诵（`met en avant` 实际读 /mɛt‿ɑ̃navɑ̃/ 而不是
 * /ma ɑ̃ avɑ̃/），读着是错的，还会把 PTE 的 RA 模块要练的弱读教反。
 * 那部分按实际读法手写在 vocab/tools/ipa-*-manual.tsv，本脚本不碰它。
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
  /** 一个音标表可由多个 _src.psv 合并生成（法语单词、短语两表共用 ipa-fr.tsv） */
  srcs: string[];
  /** _src.psv 里词条所在的列（0 起） */
  termCol: number;
  /** 查词前剥掉的冠词等前缀——词典按裸词收录 */
  strip: RegExp;
  /** 按标准加拿大法语调整音标，见 toCanadianStandard */
  canadian?: boolean;
};

const JOBS: Job[] = [
  {
    out: "ipa-en.tsv",
    dict: "en_US",
    srcs: [join(VOCAB_DIR, "pte-core", "_src.psv")],
    termCol: 2,
    strip: /^(the|a|an)\s+/i,
  },
  {
    out: "ipa-fr.tsv",
    dict: "fr_FR",
    srcs: [
      join(VOCAB_DIR, "tcf-canada-mots", "_src.psv"),
      join(VOCAB_DIR, "tcf-canada-phrases", "_src.psv"),
    ],
    termCol: 2,
    strip: /^(le|la|les|un|une|des|du)\s+|^l'/i,
    canadian: true,
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

const FR_VOWELS = "aeiouyéèêâîôûàùëïüœæ";

/**
 * fr_FR 的音标 → 标准加拿大法语的宽式音标，只动法国已合并、加拿大仍区分的两处。
 * 对不上的（多个 a 却只有一个 â）原样返回，交给人工在 manual 表里写。
 * 已经在 ipa-fr-manual.tsv 手写的条目以手写为准，这里只管自动生成的单词。
 */
export function toCanadianStandard(word: string, ipa: string): string {
  let out = ipa;
  // ê / aî 落在最后一个音节、且后面有辅音收尾：fête /fɛːt/、être /ɛːtʁ/；arrêt /aʁɛ/ 是开音节不变
  if (new RegExp(`(ê|aî)[^${FR_VOWELS}]*e?s?$`).test(word)) {
    // 鼻化元音的基字母（ɑ ɔ ɛ œ）已在排除列表里，不用单独排除鼻化符
    out = out.replace(/ɛ(?!ː)(?=[^aeiouyɛɔøœəɑ ‿/]+\/?$)/u, "ɛː");
  }
  if (word.includes("â")) {
    // 只数单独的 a，ɑ̃ 这种带鼻化符（U+0303）的不算
    const plain = [...out.matchAll(/a(?!̃)/gu)];
    if (plain.length === 1) {
      const i = plain[0].index;
      out = out.slice(0, i) + "ɑ" + out.slice(i + 1);
    }
  }
  return out;
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

  const terms = job.srcs.flatMap((src) =>
    readFileSync(src, "utf8")
      .replace(/^﻿/, "")
      .split(/\r?\n/)
      .slice(1)
      .filter(Boolean)
      .map((line) => line.split("|")[job.termCol]),
  );

  const rows: string[] = [];
  const seen = new Set<string>();
  let hit = 0;

  for (const term of terms) {
    if (seen.has(term)) continue;
    seen.add(term);

    // 并列变体逐个查，任一查不到就整条放弃，免得音标和词条对不上
    const parts = term.split(" / ").map((variant) => {
      const word = reduceToWord(variant, job.strip);
      const ipa = word ? dict.get(word) : undefined;
      return ipa && job.canadian ? toCanadianStandard(word!, ipa) : ipa;
    });
    if (parts.some((part) => !part)) continue;

    rows.push(`${term}\t${parts.join(" / ")}`);
    hit += 1;
  }

  const header = [
    `# ${job.out} —— 由 scripts/build-ipa.ts 生成，可手工修正`,
    `# 数据源：open-dict-data/ipa-dict ${job.dict}（MIT）`,
    ...(job.canadian
      ? ["# 已按标准加拿大法语调整：â → /ɑ/，闭音节 ê / aî → /ɛː/（见 toCanadianStandard）"]
      : []),
    `# 只收能归约成单个词的条目，多词语块手写在 ${job.out.replace(".tsv", "-manual.tsv")}`,
    `# 格式：<词条><TAB><音标>，词条须与 _src.psv 第 ${job.termCol + 1} 列完全一致`,
  ].join("\n");

  writeFileSync(join(OUT_DIR, job.out), `${header}\n${rows.join("\n")}\n`);
  console.log(
    `${job.out.padEnd(12)} ${String(hit).padStart(5)} / ${String(seen.size).padStart(5)} 条覆盖  (${Math.round((hit / seen.size) * 100)}%)`,
  );
}
