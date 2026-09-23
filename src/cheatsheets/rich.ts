import type { Rich } from "@/cheatsheets/types";

export type Token =
  | { kind: "text"; text: string }
  | { kind: "bold"; text: string }
  /** 可点读的法语：show 显示，say 朗读 */
  | { kind: "fr"; show: string; say: string };

const PATTERN = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]|\*\*([^*]+)\*\*/g;

/** 把 `[[..]]` 与 `**..**` 切成片段，见 types.ts 的说明 */
export function parseRich(text: Rich): Token[] {
  const tokens: Token[] = [];
  let last = 0;
  for (const m of text.matchAll(PATTERN)) {
    if (m.index > last) tokens.push({ kind: "text", text: text.slice(last, m.index) });
    if (m[1] !== undefined) tokens.push({ kind: "fr", show: m[1], say: m[2] ?? m[1] });
    else tokens.push({ kind: "bold", text: m[3] });
    last = m.index + m[0].length;
  }
  if (last < text.length) tokens.push({ kind: "text", text: text.slice(last) });
  return tokens;
}

/** 朗读用的纯文本：去掉强调星号 */
export function spoken(text: string): string {
  return text.replaceAll("**", "");
}
