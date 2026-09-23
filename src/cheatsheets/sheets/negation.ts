import type { Sheet } from "@/cheatsheets/types";

const sheet: Sheet = {
  id: "negation",
  title: "否定句",
  summary: "ne … pas 这个“夹子”",
  lead: "法语的否定像一个夹子：**ne** 和 **pas** 把动词夹在中间。",
  sections: [
    {
      title: "1. 基本句型：ne + 动词 + pas",
      blocks: [
        {
          kind: "examples",
          items: [
            { fr: "Je **ne** comprends **pas**.", zh: "我不明白。" },
            { fr: "Elle **ne** travaille **pas** aujourd'hui.", zh: "她今天不上班。" },
            { fr: "Il **n'**est **pas** là.", zh: "他不在。ne 碰上元音写成 n'" },
          ],
        },
      ],
    },
    {
      title: "2. 换个“夹子”，意思就变",
      blocks: [
        {
          kind: "table",
          head: ["夹子", "意思", "例句"],
          fr: [2],
          rows: [
            ["ne … jamais", "从不", "Je ne fume jamais."],
            ["ne … plus", "不再", "Il n'habite plus ici."],
            ["ne … rien", "什么也不", "Je ne vois rien."],
            ["ne … personne", "谁也不", "Je ne connais personne."],
            ["ne … pas encore", "还没", "Le magasin n'est pas encore ouvert."],
          ],
        },
      ],
    },
    {
      title: "3. 否定句里 un、une、du、des 变成 de",
      blocks: [
        {
          kind: "examples",
          items: [
            { fr: "Je n'ai pas **de** voiture.", zh: "我没有车。（肯定句：J'ai une voiture.）" },
            { fr: "Il ne boit pas **de** café.", zh: "他不喝咖啡。（肯定句：Il boit du café.）" },
            { fr: "Il n'y a pas **d'**eau.", zh: "没有水。元音前写成 d'" },
          ],
        },
        {
          kind: "tip",
          text: "两个例外不变：定冠词 [[Je n'aime pas le café.]]；être 后面 [[Ce n'est pas un problème.]]",
        },
      ],
    },
    {
      title: "4. 有助动词或原形时，夹子夹哪里",
      blocks: [
        {
          kind: "examples",
          items: [
            { fr: "Je **n'**ai **pas** mangé.", zh: "我没吃饭。过去时：夹住助动词 ai" },
            {
              fr: "Je **ne** veux **pas** partir.",
              zh: "我不想走。夹住变位的 veux，partir 在外面",
            },
          ],
        },
      ],
    },
    {
      title: "5. 口语里 ne 常常被吞掉",
      blocks: [
        {
          kind: "p",
          text: "日常说话时，法国人和加拿大人经常省掉 ne，只说 pas。听的时候要认得出，写作和考试要写全。",
        },
        {
          kind: "examples",
          items: [
            { fr: "Je sais pas.", zh: "我不知道。完整说法：Je ne sais pas." },
            { fr: "C'est pas grave.", zh: "没关系。完整说法：Ce n'est pas grave." },
          ],
        },
      ],
    },
  ],
};

export default sheet;
