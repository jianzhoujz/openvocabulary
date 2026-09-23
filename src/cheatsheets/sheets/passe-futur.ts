import type { Sheet } from "@/cheatsheets/types";

const sheet: Sheet = {
  id: "passe-futur",
  title: "过去和将来",
  summary: "复合过去时与最近将来时",
  lead: "零基础先掌握两个最常用的时态：说将来用“最近将来时”，说过去用“复合过去时”。两个都是“助动词 + 另一个动词”的搭积木结构。",
  sections: [
    {
      title: "1. 将来：aller + 动词原形",
      blocks: [
        {
          kind: "p",
          text: "最简单的将来时，相当于英语的 be going to。[[aller]] 按现在时变位，后面的动词保持原形。",
        },
        {
          kind: "examples",
          items: [
            { fr: "Je **vais manger**.", zh: "我要去吃饭了。" },
            { fr: "Nous **allons partir** demain.", zh: "我们明天出发。" },
            { fr: "Il **va pleuvoir**.", zh: "要下雨了。" },
            { fr: "Tu **vas aimer** ce film.", zh: "你会喜欢这部电影的。" },
          ],
        },
      ],
    },
    {
      title: "2. 过去：avoir + 过去分词",
      blocks: [
        {
          kind: "p",
          text: "结构是 [[avoir]] 的现在时（j'ai、tu as……）+ 过去分词。大部分动词都这样。过去分词按词尾变：",
        },
        {
          kind: "table",
          head: ["规则", "原形", "过去分词"],
          fr: [1, 2],
          rows: [
            ["-er → -é", "parler", "parlé"],
            ["-ir → -i", "finir", "fini"],
            ["-re → -u", "attendre", "attendu"],
          ],
        },
        {
          kind: "examples",
          items: [
            { fr: "J'ai **mangé** une pizza.", zh: "我吃了一个披萨。" },
            { fr: "Nous avons **fini** le travail.", zh: "我们把工作做完了。" },
            { fr: "Elle a **attendu** le bus.", zh: "她等了公交车。" },
          ],
        },
      ],
    },
    {
      title: "3. 常见的不规则过去分词",
      blocks: [
        {
          kind: "table",
          head: ["原形", "过去分词", "原形", "过去分词"],
          fr: [0, 1, 2, 3],
          rows: [
            ["avoir", "eu", "être", "été"],
            ["faire", "fait", "prendre", "pris"],
            ["voir", "vu", "boire", "bu"],
            ["lire", "lu", "pouvoir", "pu"],
            ["vouloir", "voulu", "écrire", "écrit"],
            ["dire", "dit", "mettre", "mis"],
          ],
        },
      ],
    },
    {
      title: "4. 哪些动词用 être",
      blocks: [
        {
          kind: "p",
          text: "表示“移动”或“状态变化”的一小批动词，助动词用 [[être]]，而且过去分词要跟主语配合：阴性加 e，复数加 s。",
        },
        {
          kind: "table",
          head: ["原形", "意思", "过去分词"],
          fr: [0, 2],
          rows: [
            ["aller", "去", "allé"],
            ["venir", "来", "venu"],
            ["arriver", "到达", "arrivé"],
            ["partir", "离开", "parti"],
            ["entrer", "进", "entré"],
            ["sortir", "出", "sorti"],
            ["monter", "上", "monté"],
            ["descendre", "下", "descendu"],
            ["rester", "留下", "resté"],
            ["tomber", "摔倒", "tombé"],
            ["naître", "出生", "né"],
            ["mourir", "去世", "mort"],
          ],
        },
        {
          kind: "tip",
          text: "口诀：想象一座房子，人**进出**、**上下**、**来去**、**到达离开**、**留下**、**摔倒**，还有**生死**。它们的派生词 revenir、devenir、rentrer 也用 être。",
        },
        {
          kind: "tip",
          text: "带 se 的动词（代词式动词）过去时**全部**用 être：[[Je me suis levé à sept heures.]] 我七点起的床。",
        },
        {
          kind: "examples",
          items: [
            { fr: "Je **suis allé** au Canada en 2020.", zh: "我 2020 年去了加拿大。" },
            { fr: "Elle **est arrivée** hier.", zh: "她昨天到的。主语阴性，加 e" },
            { fr: "Ils **sont partis** ce matin.", zh: "他们今天早上走了。主语复数，加 s" },
          ],
        },
      ],
    },
    {
      title: "5. 常用的时间词",
      blocks: [
        {
          kind: "table",
          head: ["过去", "", "将来", ""],
          fr: [0, 2],
          rows: [
            ["hier", "昨天", "demain", "明天"],
            ["ce matin", "今天早上", "ce soir", "今晚"],
            ["la semaine dernière", "上周", "la semaine prochaine", "下周"],
            ["il y a deux jours", "两天前", "dans deux jours", "两天后"],
          ],
        },
      ],
    },
  ],
};

export default sheet;
