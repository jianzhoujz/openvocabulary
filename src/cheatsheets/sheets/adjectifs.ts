import type { Sheet } from "@/cheatsheets/types";

const sheet: Sheet = {
  id: "adjectifs",
  title: "形容词与物主",
  summary: "配合、位置、我的你的",
  lead: "形容词要跟着名词变：**阴性加 e，复数加 s**。大部分放在名词**后面**，正好和中文相反。",
  sections: [
    {
      title: "1. 跟着名词变",
      blocks: [
        {
          kind: "table",
          head: ["", "阳性", "阴性"],
          fr: [1, 2],
          rows: [
            ["单数", "un sac noir", "une voiture noire"],
            ["复数", "des sacs noirs", "des voitures noires"],
          ],
        },
        {
          kind: "tip",
          text: "加 e 以后，原来不读的词尾辅音要读出来：[[petit]]（t 不读）→ [[petite]]（t 要读）。",
        },
      ],
    },
    {
      title: "2. 不按常规变的阴性",
      blocks: [
        {
          kind: "table",
          head: ["规则", "阳性", "阴性"],
          fr: [1, 2],
          rows: [
            ["本来以 e 结尾：不变", "rouge", "rouge"],
            ["-eux → -euse", "heureux", "heureuse"],
            ["-if → -ive", "sportif", "sportive"],
            ["-er → -ère", "cher", "chère"],
            ["-en / -on：双写再加 e", "canadien, bon", "canadienne, bonne"],
            ["特殊，单独记", "beau, nouveau, vieux", "belle, nouvelle, vieille"],
          ],
        },
      ],
    },
    {
      title: "3. 放在名词前还是后",
      blocks: [
        {
          kind: "p",
          text: "大部分放在名词**后面**。颜色、国籍、形状一定在后面：",
        },
        {
          kind: "examples",
          items: [
            { fr: "une voiture **rouge**", zh: "一辆红色的车" },
            { fr: "un restaurant **chinois**", zh: "一家中餐馆" },
            { fr: "une table **ronde**", zh: "一张圆桌" },
          ],
        },
        {
          kind: "p",
          text: "少数短小常用的放在**前面**，口诀 **BAGS**：美丑（Beauty）、年龄（Age）、好坏（Goodness）、大小（Size）。",
        },
        {
          kind: "examples",
          items: [
            { fr: "un **beau** jardin", zh: "一个漂亮的花园" },
            { fr: "une **jeune** femme", zh: "一位年轻女子" },
            { fr: "un **bon** livre", zh: "一本好书" },
            { fr: "une **petite** maison", zh: "一座小房子" },
          ],
        },
        {
          kind: "tip",
          text: "beau、nouveau、vieux 放在元音开头的阳性名词前，要换成 bel、nouvel、vieil：[[un bel homme]]、[[un nouvel ami]]。",
        },
      ],
    },
    {
      title: "4. 我的、你的：物主形容词",
      blocks: [
        {
          kind: "table",
          head: ["", "阳性单数", "阴性单数", "复数"],
          fr: [1, 2, 3],
          rows: [
            ["我的", "mon", "ma", "mes"],
            ["你的", "ton", "ta", "tes"],
            ["他的 / 她的", "son", "sa", "ses"],
            ["我们的", "notre", "notre", "nos"],
            ["您的 / 你们的", "votre", "votre", "vos"],
            ["他们的", "leur", "leur", "leurs"],
          ],
        },
        {
          kind: "tip",
          text: "son、sa 看的是**被拥有的东西**是阴是阳，不看主人是男是女：[[sa maison]] 可以是“他的房子”，也可以是“她的房子”。",
        },
        {
          kind: "tip",
          text: "阴性名词以元音开头时，用 mon、ton、son 代替 ma、ta、sa，否则念不顺：[[mon amie]]、[[mon école]]。",
        },
      ],
    },
    {
      title: "5. 这个、这些：指示形容词",
      blocks: [
        {
          kind: "table",
          head: ["阳性", "阴性", "复数"],
          fr: [0, 1, 2],
          rows: [["ce livre", "cette maison", "ces livres"]],
        },
        {
          kind: "tip",
          text: "阳性名词以元音开头时，ce 变成 cet：[[cet homme]]、[[cet hôtel]]。",
        },
      ],
    },
  ],
};

export default sheet;
