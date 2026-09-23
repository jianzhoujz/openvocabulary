import type { Sheet, SheetMeta } from "@/cheatsheets/types";

/**
 * 法语零基础语法速查，按学习顺序排列。
 *
 * 范围对应 CEFR A1 到 A2 入门：够读懂词表里的例句、够应付 TCF 口语前两题。
 * 首页只需要标题，正文按页懒加载，不占首屏体积。
 */
export const SHEETS: SheetMeta[] = [
  { id: "prononciation", title: "发音规则", summary: "看到生词也能读出来" },
  { id: "accents", title: "字母上的符号", summary: "é è ê ç 各管什么" },
  { id: "noms", title: "名词的阴阳性与单复数", summary: "le 还是 la，怎么加 s" },
  { id: "articles", title: "冠词", summary: "le / un / du 三种“帽子”怎么选" },
  { id: "etre-avoir", title: "人称代词与 être、avoir", summary: "我你他，“是”和“有”" },
  { id: "present", title: "动词现在时", summary: "-er 动词和 9 个必背不规则动词" },
  { id: "negation", title: "否定句", summary: "ne … pas 这个“夹子”" },
  { id: "questions", title: "疑问句", summary: "三种问法和 8 个疑问词" },
  { id: "adjectifs", title: "形容词与物主", summary: "配合、位置、我的你的" },
  { id: "passe-futur", title: "过去和将来", summary: "复合过去时与最近将来时" },
  { id: "nombres", title: "数字、日期与时间", summary: "70、80、90 的怪数法" },
];

const modules = import.meta.glob<{ default: Sheet }>("./sheets/*.ts");

export async function loadSheet(id: string): Promise<Sheet | null> {
  const load = modules[`./sheets/${id}.ts`];
  return load ? (await load()).default : null;
}
