export type DeckId = "pte-core" | "tcf-canada";

export type Card = {
  id: string;
  section: string;
  theme: string;
  /** 卡片正面：PTE 的词条 / TCF 的法语词条 */
  front: string;
  pos: string;
  /** 音标。只有能归约成单个词的条目才有，多词语块没有 */
  ipa?: string;
  /** 释义，与 Deck.glossLabels 一一对应。PTE 为 [中文]，TCF 为 [English, 中文] */
  glosses: string[];
  note: string;
  example: string;
};

export type DeckSection = {
  code: string;
  label: string;
  count: number;
};

export type Deck = {
  id: DeckId;
  name: string;
  subtitle: string;
  lang: string;
  glossLabels: string[];
  sections: DeckSection[];
  cards: Card[];
};

/** 背诵方向 */
export type Mode = "front-to-gloss" | "gloss-to-front";

/** 单张卡片的学习状态。字段名刻意短，因为要整体序列化进 localStorage */
export type CardStat = {
  /** 掌握等级 0..5，见 scheduler.ts 的 LEVEL_WEIGHTS */
  lv: number;
  /** 出现次数 */
  n: number;
  /** 答对次数 */
  ok: number;
  /** 答错次数 */
  bad: number;
  /** 连续答对次数 */
  streak: number;
  /** 上次出现时间，epoch ms */
  at: number;
  /** 上次是否答错，用于加权 */
  lastBad: boolean;
};

export type DeckProgress = {
  stats: Record<string, CardStat>;
};

export type Settings = {
  mode: Mode;
  /** 已选模块；空数组表示全选 */
  sections: string[];
  /** 是否把已掌握（lv 5）的卡片也放进抽取池 */
  includeMastered: boolean;
  /** 新词节流：同时最多放多少张没背过的卡进池子，0 表示不限 */
  newCardLimit: number;
  /** 翻面时自动朗读词条 */
  autoSpeak: boolean;
  theme: "system" | "light" | "dark";
};

/** 选词表页用的轻量元信息，来自 public/data/index.json */
export type DeckSummary = {
  id: DeckId;
  name: string;
  subtitle: string;
  lang: string;
  count: number;
  sectionCount: number;
};
