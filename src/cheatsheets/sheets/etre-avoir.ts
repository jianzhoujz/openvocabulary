import type { Sheet } from "@/cheatsheets/types";

const sheet: Sheet = {
  id: "etre-avoir",
  title: "人称代词与 être、avoir",
  summary: "我你他，“是”和“有”",
  lead: "[[être]]（是）和 [[avoir]]（有）是法语里用得最多的两个动词，后面讲过去时还要靠它们当“零件”。先把这两张表念熟。",
  sections: [
    {
      title: "1. 我、你、他：主语代词",
      blocks: [
        {
          kind: "table",
          head: ["中文", "法语", "说明"],
          fr: [1],
          rows: [
            ["我", "je", "元音前写成 j'"],
            ["你", "tu", "对朋友、家人、小孩"],
            ["他 / 她", "il / elle", "也用来指阳性 / 阴性的东西"],
            ["我们（口语）", "on", "日常说话最常用，动词跟 il 一样变"],
            ["我们", "nous", "书面、正式"],
            ["您 / 你们", "vous", "礼貌的“您”，也是“你们”"],
            ["他们 / 她们", "ils / elles", "只要有一个阳性就用 ils"],
          ],
        },
        {
          kind: "tip",
          text: "对陌生人、长辈、店员、面试官一律用 **vous**，拿不准也用 vous，不会失礼。",
        },
      ],
    },
    {
      title: "2. être：是",
      blocks: [
        {
          kind: "table",
          head: ["单数", "复数"],
          fr: [0, 1],
          rows: [
            ["je suis", "nous sommes"],
            ["tu es", "vous êtes"],
            ["il / elle / on est", "ils / elles sont"],
          ],
        },
        {
          kind: "examples",
          items: [
            { fr: "Je **suis** étudiant.", zh: "我是学生。职业前不加冠词" },
            { fr: "Elle **est** canadienne.", zh: "她是加拿大人。" },
            { fr: "Nous **sommes** à Montréal.", zh: "我们在蒙特利尔。être 也表示“在”" },
            { fr: "**C'est** mon ami.", zh: "这是我的朋友。c'est = 这是" },
          ],
        },
      ],
    },
    {
      title: "3. avoir：有",
      blocks: [
        {
          kind: "table",
          head: ["单数", "复数"],
          fr: [0, 1],
          rows: [
            ["j'ai", "nous avons"],
            ["tu as", "vous avez"],
            ["il / elle / on a", "ils / elles ont"],
          ],
        },
        {
          kind: "examples",
          items: [
            { fr: "J'**ai** une voiture.", zh: "我有一辆车。" },
            { fr: "Ils **ont** deux enfants.", zh: "他们有两个孩子。" },
            { fr: "Il y **a** un problème.", zh: "有个问题。il y a = 有、存在" },
          ],
        },
        {
          kind: "tip",
          text: "[[ils sont]]（他们是）和 [[ils ont]]（他们有）很像：sont 是 s 音，ont 连读成 z 音。",
        },
      ],
    },
    {
      title: "4. 中文说“是 / 很”，法语却用 avoir",
      blocks: [
        {
          kind: "examples",
          items: [
            { fr: "J'**ai** 30 ans.", zh: "我 30 岁。直译“我有 30 年”", say: "J'ai trente ans." },
            { fr: "J'**ai** faim.", zh: "我饿了。" },
            { fr: "J'**ai** soif.", zh: "我渴了。" },
            { fr: "J'**ai** froid.", zh: "我冷。" },
            { fr: "J'**ai** besoin d'aide.", zh: "我需要帮助。" },
          ],
        },
        {
          kind: "tip",
          text: "说年龄只能用 avoir。“我 30 岁”说成 Je suis 30 ans 是初学者最常见的错误。",
        },
      ],
    },
  ],
};

export default sheet;
