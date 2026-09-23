/**
 * 语法速查页的内容格式。
 *
 * 文本里有两种轻量标记，由 `rich.ts` 解析：
 * - `[[法语]]` 或 `[[显示|朗读]]`：一段可点读的法语。朗读文本和显示不同时用后者，
 *   例如 `[[l'|l'ami]]`——单念一个 l' 引擎发不出像样的音
 * - `**重点**`：加粗强调，朗读时去掉星号
 */
export type Rich = string;

export type Example = {
  /** 法语例句，可含 `**` 标出要点 */
  fr: string;
  zh: string;
  /** 朗读文本和显示不同时填，例如把「14 h 30」念成「quatorze heures trente」 */
  say?: string;
};

export type Block =
  | { kind: "p"; text: Rich }
  /** 口诀、易错点：带底色的提示框 */
  | { kind: "tip"; text: Rich }
  | {
      kind: "table";
      head: string[];
      rows: Rich[][];
      /** 整列都是法语的列号：这些格子整格可点读，不必逐格写 `[[ ]]` */
      fr?: number[];
    }
  | { kind: "examples"; items: Example[] };

export type Section = {
  title: string;
  blocks: Block[];
};

export type Sheet = {
  id: string;
  title: string;
  /** 首页列表里的一句话说明 */
  summary: string;
  /** 页首的一句话：这一页解决什么问题 */
  lead: Rich;
  sections: Section[];
};

/** 首页列表用的轻量元信息 */
export type SheetMeta = Pick<Sheet, "id" | "title" | "summary">;
