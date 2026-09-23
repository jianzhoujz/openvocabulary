import type { Sheet } from "@/cheatsheets/types";

const sheet: Sheet = {
  id: "noms",
  title: "名词的阴阳性与单复数",
  summary: "le 还是 la，怎么加 s",
  lead: "法语每个名词都有“性别”，不是阳性就是阴性。它跟真实性别基本无关，只是个语法标签，但前面的冠词、后面的形容词都要跟着它变。",
  sections: [
    {
      title: "1. 怎么知道是阴性还是阳性",
      blocks: [
        {
          kind: "tip",
          text: "最靠谱的办法：**背单词时连冠词一起背**。记 [[un livre]]，不要只记 livre；记 [[une table]]，不要只记 table。",
        },
        {
          kind: "p",
          text: "忘了的时候，可以看词尾来猜，准确率不低：",
        },
        {
          kind: "table",
          head: ["词尾", "通常是", "例词"],
          fr: [2],
          rows: [
            ["-tion / -sion", "阴性", "la nation, la télévision"],
            ["-té", "阴性", "la liberté, la santé"],
            ["-ure", "阴性", "la voiture, la culture"],
            ["-ence / -ance", "阴性", "la différence, la chance"],
            ["-age", "阳性", "le fromage, le voyage"],
            ["-ment", "阳性", "le moment, le gouvernement"],
            ["-eau", "阳性", "le bureau, le gâteau"],
            ["-isme", "阳性", "le tourisme"],
          ],
        },
        {
          kind: "tip",
          text: "以 -e 结尾的词阴性居多，但例外不少：[[le livre]]、[[le musée]]、[[le problème]] 都是阳性。上表的常见例外也要记：-age 里的 [[la page]]、[[la plage]]、[[l'image]] 是阴性；-té 里的 [[l'été]]（夏天）、[[le côté]] 是阳性；-eau 里的 [[l'eau]]（水）、[[la peau]]（皮肤）是阴性。",
        },
      ],
    },
    {
      title: "2. 人和职业：阳性变阴性",
      blocks: [
        {
          kind: "table",
          head: ["规则", "阳性", "阴性"],
          fr: [1, 2],
          rows: [
            ["加 -e", "un ami", "une amie"],
            ["-eur → -euse", "un vendeur", "une vendeuse"],
            ["-teur → -trice", "un acteur", "une actrice"],
            ["-ien → -ienne", "un Canadien", "une Canadienne"],
            ["-er → -ère", "un boulanger", "une boulangère"],
            ["不变，只换冠词", "un journaliste", "une journaliste"],
          ],
        },
        {
          kind: "tip",
          text: "加了 e 以后，原来不读的辅音要读出来：[[étudiant]]（t 不读）→ [[étudiante]]（t 要读）。",
        },
      ],
    },
    {
      title: "3. 变复数",
      blocks: [
        {
          kind: "table",
          head: ["规则", "单数", "复数"],
          fr: [1, 2],
          rows: [
            ["一般加 -s", "le livre", "les livres"],
            ["本来就以 -s / -x / -z 结尾：不变", "le pays", "les pays"],
            ["-eau / -eu：加 -x", "le bateau", "les bateaux"],
            ["-al → -aux", "le journal", "les journaux"],
            ["特殊", "l'œil", "les yeux"],
          ],
        },
        {
          kind: "tip",
          text: "复数加的 s、x 都**不读**。[[le livre]] 和 [[les livres]] 里的 livre 读音完全一样，听单复数全靠前面的冠词：le 还是 les。",
        },
      ],
    },
  ],
};

export default sheet;
