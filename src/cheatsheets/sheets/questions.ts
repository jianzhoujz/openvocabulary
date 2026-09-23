import type { Sheet } from "@/cheatsheets/types";

const sheet: Sheet = {
  id: "questions",
  title: "疑问句",
  summary: "三种问法和 8 个疑问词",
  lead: "法语提问有三种说法，意思一样，区别只在正式程度。零基础先学前两种就够用。",
  sections: [
    {
      title: "1. 三种问法",
      blocks: [
        {
          kind: "table",
          head: ["问法", "例句", "场合"],
          fr: [1],
          rows: [
            ["句尾语调上扬", "Tu parles français?", "口语最常用"],
            ["句首加 est-ce que", "Est-ce que tu parles français?", "口语、书面都行，最稳妥"],
            ["主语和动词倒过来", "Parles-tu français?", "正式、书面"],
          ],
        },
        {
          kind: "tip",
          text: "倒装时如果动词以元音结尾、主语是 il / elle，中间加 -t- 好读：[[Parle-t-il français?]]、[[A-t-elle un chat?]]",
        },
      ],
    },
    {
      title: "2. 8 个疑问词",
      blocks: [
        {
          kind: "table",
          head: ["疑问词", "意思", "例句"],
          fr: [0, 2],
          rows: [
            ["qui", "谁", "Qui est-ce?"],
            ["que / quoi", "什么", "Qu'est-ce que tu fais?"],
            ["où", "哪里", "Où habitez-vous?"],
            ["quand", "什么时候", "Quand est-ce que tu pars?"],
            ["comment", "怎么、怎么样", "Comment allez-vous?"],
            ["pourquoi", "为什么", "Pourquoi est-ce que tu apprends le français?"],
            ["combien", "多少", "C'est combien?"],
            ["quel / quelle", "哪个、什么", "Quelle heure est-il?"],
          ],
        },
        {
          kind: "tip",
          text: "quel 要跟后面的名词配合：[[quel]]、[[quelle]]、[[quels]]、[[quelles]]，写法不同，读音一样。",
        },
      ],
    },
    {
      title: "3. 口语：疑问词直接放句尾",
      blocks: [
        {
          kind: "examples",
          items: [
            { fr: "Tu habites **où**?", zh: "你住哪儿？" },
            { fr: "Tu pars **quand**?", zh: "你什么时候走？" },
            { fr: "Ça coûte **combien**?", zh: "这个多少钱？" },
            { fr: "Tu t'appelles **comment**?", zh: "你叫什么名字？" },
          ],
        },
      ],
    },
    {
      title: "4. 回答：oui、non，还有 si",
      blocks: [
        {
          kind: "p",
          text: "对否定的问题说“不，是……”来反驳时，不用 oui，要用 **si**：",
        },
        {
          kind: "examples",
          items: [
            { fr: "Tu ne viens pas? — **Si**, je viens!", zh: "你不来吗？——不，我来！" },
            { fr: "Tu ne viens pas? — **Non**, je ne viens pas.", zh: "你不来吗？——对，我不来。" },
          ],
        },
      ],
    },
  ],
};

export default sheet;
