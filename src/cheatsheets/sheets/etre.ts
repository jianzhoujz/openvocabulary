import type { Sheet } from "@/cheatsheets/types";

const sheet: Sheet = {
  id: "etre",
  title: "être 的全部变位",
  summary: "从现在时到虚拟式，一页看全",
  lead: "[[être]] 是法语最不规则、也最常用的动词，每个时态几乎都长得不一样。好在除了现在时要硬背，其余时态只靠三个词干：**ét-** 管过去，**ser-** 管将来和假设，**soi- / soy-** 管虚拟和命令。",
  sections: [
    {
      title: "1. 现在时",
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
          kind: "tip",
          text: "[[tu es]] 和 [[il est]] 读音完全一样。后面跟元音时常连读：[[vous êtes]] 读出 z 音，[[c'est un ami]] 读出 t 音。",
        },
      ],
    },
    {
      title: "2. 复合过去时：用 avoir！",
      blocks: [
        {
          kind: "p",
          text: "être 自己的复合过去时，助动词是 **avoir**，过去分词 [[été]] 不变。",
        },
        {
          kind: "table",
          head: ["单数", "复数"],
          fr: [0, 1],
          rows: [
            ["j'ai été", "nous avons été"],
            ["tu as été", "vous avez été"],
            ["il / elle a été", "ils / elles ont été"],
          ],
        },
        {
          kind: "examples",
          items: [
            { fr: "J'**ai été** malade la semaine dernière.", zh: "我上周病了。" },
            {
              fr: "Tu **as** déjà **été** au Canada?",
              zh: "你去过加拿大吗？口语里 être 也当“去过”",
            },
          ],
        },
        {
          kind: "tip",
          text: "千万别说 Je suis été。[[été]] 还是名词“夏天”（[[l'été]]），同形不同义。",
        },
      ],
    },
    {
      title: "3. 未完成过去时：ét-",
      blocks: [
        {
          kind: "p",
          text: "描述过去的状态、背景、“那时候是……”。它是唯一不按“nous 形式去 -ons”公式来的动词，词干固定是 ét-。",
        },
        {
          kind: "table",
          head: ["单数", "复数"],
          fr: [0, 1],
          rows: [
            ["j'étais", "nous étions"],
            ["tu étais", "vous étiez"],
            ["il / elle était", "ils / elles étaient"],
          ],
        },
        {
          kind: "examples",
          items: [
            { fr: "Quand j'**étais** petit, j'habitais à Pékin.", zh: "我小时候住在北京。" },
            { fr: "Il **était** une fois…", zh: "从前……童话的开头" },
            { fr: "C'**était** super!", zh: "那太棒了！说刚经历过的事最常用" },
          ],
        },
        {
          kind: "tip",
          text: "[[étais]]、[[était]]、[[étaient]] 三个读音一样。",
        },
      ],
    },
    {
      title: "4. 简单将来时：ser-",
      blocks: [
        {
          kind: "table",
          head: ["单数", "复数"],
          fr: [0, 1],
          rows: [
            ["je serai", "nous serons"],
            ["tu seras", "vous serez"],
            ["il / elle sera", "ils / elles seront"],
          ],
        },
        {
          kind: "examples",
          items: [
            { fr: "Je **serai** là à huit heures.", zh: "我八点会到。" },
            { fr: "Ce **sera** difficile.", zh: "那会很难。" },
          ],
        },
      ],
    },
    {
      title: "5. 条件式：ser- + 过去时词尾",
      blocks: [
        {
          kind: "p",
          text: "用于假设和委婉语气，词干同将来时，词尾同未完成过去时。",
        },
        {
          kind: "table",
          head: ["单数", "复数"],
          fr: [0, 1],
          rows: [
            ["je serais", "nous serions"],
            ["tu serais", "vous seriez"],
            ["il / elle serait", "ils / elles seraient"],
          ],
        },
        {
          kind: "examples",
          items: [
            { fr: "Ce **serait** bien.", zh: "那样挺好的。" },
            {
              fr: "Si j'étais riche, je **serais** heureux.",
              zh: "要是我有钱，我会很幸福。si + 未完成过去时，主句用条件式",
            },
          ],
        },
        {
          kind: "tip",
          text: "[[je serai]]（将来）和 [[je serais]]（条件）读音几乎一样，写的时候看意思：确定会发生用 -ai，假设用 -ais。",
        },
      ],
    },
    {
      title: "6. 虚拟式与命令式：soi- / soy-",
      blocks: [
        {
          kind: "table",
          head: ["虚拟式单数", "虚拟式复数"],
          fr: [0, 1],
          rows: [
            ["que je sois", "que nous soyons"],
            ["que tu sois", "que vous soyez"],
            ["qu'il / elle soit", "qu'ils / elles soient"],
          ],
        },
        {
          kind: "examples",
          items: [
            {
              fr: "Il faut que tu **sois** à l'heure.",
              zh: "你必须准时。il faut que 后面用虚拟式",
            },
            { fr: "Je veux que vous **soyez** contents.", zh: "我希望你们开心。" },
          ],
        },
        {
          kind: "p",
          text: "命令式只有三个形式，直接借虚拟式的词干：",
        },
        {
          kind: "examples",
          items: [
            { fr: "**Sois** sage!", zh: "乖一点！对 tu 说，常用来叮嘱小孩" },
            { fr: "**Soyons** patients.", zh: "我们耐心点吧。对 nous 说" },
            { fr: "**Soyez** les bienvenus!", zh: "欢迎各位！对 vous 说" },
          ],
        },
      ],
    },
    {
      title: "7. 分词和书面语",
      blocks: [
        {
          kind: "table",
          head: ["形式", "变位", "用途"],
          rows: [
            ["过去分词", "[[été]]", "复合时态：[[j'ai été]]、[[j'avais été]]"],
            ["现在分词", "[[étant]]", "“作为、由于是”：[[Étant malade, il est resté chez lui.]]"],
            ["简单过去时", "[[il fut]]、[[ils furent]]", "小说、历史书里的过去时，认得就行"],
          ],
        },
      ],
    },
    {
      title: "8. être 管的六件事",
      blocks: [
        {
          kind: "table",
          head: ["用法", "例子"],
          fr: [1],
          rows: [
            ["身份、职业（不加冠词）", "Je suis infirmière."],
            ["性质、状态", "Elle est fatiguée."],
            ["在哪儿", "Nous sommes à la maison."],
            ["属于谁：être à", "Ce livre est à moi."],
            ["正在做：être en train de", "Je suis en train de manger."],
            ["被动：être + 过去分词", "La porte est fermée."],
          ],
        },
        {
          kind: "p",
          text: "另外，移动类动词（[[aller]]、[[venir]]、[[partir]]……）和所有自反动词的复合过去时，都用 être 当助动词，详见“过去和将来”一页。",
        },
      ],
    },
    {
      title: "9. c'est 还是 il est",
      blocks: [
        {
          kind: "table",
          head: ["后面跟", "用", "例子"],
          fr: [2],
          rows: [
            ["冠词 + 名词", "[[c'est]]", "C'est un médecin."],
            ["不带冠词的职业、国籍", "[[il est]]", "Il est médecin."],
            ["重读代词、人名", "[[c'est]]", "C'est moi. C'est Paul."],
            ["形容词，指具体的人或物", "[[il est]] / [[elle est]]", "Elle est belle, ta robe."],
            ["形容词，泛指一件事", "[[c'est]]", "C'est beau, Paris!"],
          ],
        },
        {
          kind: "tip",
          text: "c'est 后面的形容词**永远用阳性单数**：说一座城市也是 [[C'est beau.]]，不说 C'est belle。",
        },
      ],
    },
  ],
};

export default sheet;
