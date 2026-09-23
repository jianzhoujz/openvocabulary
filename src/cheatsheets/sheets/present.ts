import type { Sheet } from "@/cheatsheets/types";

const sheet: Sheet = {
  id: "present",
  title: "动词现在时",
  summary: "-er 动词和 9 个必背不规则动词",
  lead: "法语动词要跟着主语变形，叫“变位”。好消息是九成动词都以 -er 结尾、变法一样，学会一个就会一大片。",
  sections: [
    {
      title: "1. -er 动词：去掉 -er，加词尾",
      blocks: [
        { kind: "p", text: "以 [[parler]]（说）为例，先去掉 -er 剩下 parl，再按人称加词尾：" },
        {
          kind: "table",
          head: ["人称", "词尾", "parler"],
          fr: [2],
          rows: [
            ["je", "-e", "je parle"],
            ["tu", "-es", "tu parles"],
            ["il / elle / on", "-e", "il parle"],
            ["nous", "-ons", "nous parlons"],
            ["vous", "-ez", "vous parlez"],
            ["ils / elles", "-ent", "ils parlent"],
          ],
        },
        {
          kind: "tip",
          text: "发音秘诀：**-e、-es、-ent 三个词尾都不读**。[[je parle]]、[[tu parles]]、[[ils parlent]] 读起来一模一样。",
        },
        {
          kind: "examples",
          items: [
            { fr: "J'**habite** à Toronto.", zh: "我住在多伦多。habiter" },
            { fr: "Nous **travaillons** ensemble.", zh: "我们一起工作。travailler" },
            { fr: "Vous **aimez** le café?", zh: "您喜欢咖啡吗？aimer" },
          ],
        },
      ],
    },
    {
      title: "2. -ir 动词（像 finir 这样变）",
      blocks: [
        {
          kind: "table",
          head: ["finir 完成", "choisir 选择"],
          fr: [0, 1],
          rows: [
            ["je finis", "je choisis"],
            ["tu finis", "tu choisis"],
            ["il finit", "il choisit"],
            ["nous finissons", "nous choisissons"],
            ["vous finissez", "vous choisissez"],
            ["ils finissent", "ils choisissent"],
          ],
        },
        {
          kind: "tip",
          text: "不是所有 -ir 动词都这么变，比如 [[partir]]（出发）就在下面的不规则表里。",
        },
      ],
    },
    {
      title: "3. 9 个必背不规则动词",
      blocks: [
        {
          kind: "p",
          text: "这几个没规律，但天天用，只能硬背。按 je、tu、il、nous、vous、ils 的顺序：",
        },
        {
          kind: "table",
          head: ["动词", "变位"],
          fr: [1],
          rows: [
            ["[[aller]] 去", "je vais, tu vas, il va, nous allons, vous allez, ils vont"],
            ["[[faire]] 做", "je fais, tu fais, il fait, nous faisons, vous faites, ils font"],
            ["[[venir]] 来", "je viens, tu viens, il vient, nous venons, vous venez, ils viennent"],
            [
              "[[prendre]] 拿、乘、吃",
              "je prends, tu prends, il prend, nous prenons, vous prenez, ils prennent",
            ],
            ["[[pouvoir]] 能", "je peux, tu peux, il peut, nous pouvons, vous pouvez, ils peuvent"],
            [
              "[[vouloir]] 想要",
              "je veux, tu veux, il veut, nous voulons, vous voulez, ils veulent",
            ],
            ["[[devoir]] 必须", "je dois, tu dois, il doit, nous devons, vous devez, ils doivent"],
            ["[[savoir]] 知道", "je sais, tu sais, il sait, nous savons, vous savez, ils savent"],
            [
              "[[partir]] 出发",
              "je pars, tu pars, il part, nous partons, vous partez, ils partent",
            ],
          ],
        },
        {
          kind: "tip",
          text: "偷懒技巧：大多数动词的 je、tu、il 三个形式读音一样（[[je fais]]、[[tu fais]]、[[il fait]]），真正要多花力气记的是 nous、vous、ils。aller 例外，三个读音都不同。",
        },
      ],
    },
    {
      title: "4. 动词 + 动词原形",
      blocks: [
        {
          kind: "p",
          text: "[[pouvoir]]、[[vouloir]]、[[devoir]]、[[aimer]] 后面直接跟动词原形，第二个动词不变位：",
        },
        {
          kind: "examples",
          items: [
            { fr: "Je veux **partir**.", zh: "我想走。" },
            { fr: "Tu peux **venir**?", zh: "你能来吗？" },
            { fr: "Nous devons **travailler**.", zh: "我们得工作。" },
            { fr: "J'aime **cuisiner**.", zh: "我喜欢做饭。" },
          ],
        },
        {
          kind: "tip",
          text: "法语现在时同时管“一般现在”和“正在进行”：[[Je mange.]] 既是“我吃饭”，也是“我正在吃饭”。",
        },
      ],
    },
  ],
};

export default sheet;
