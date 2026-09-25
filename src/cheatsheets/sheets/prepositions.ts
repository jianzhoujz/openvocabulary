import type { Sheet } from "@/cheatsheets/types";

const sheet: Sheet = {
  id: "prepositions",
  title: "介词：在哪儿、去哪儿、什么时候",
  summary: "à、en、au、chez，城市国家怎么搭",
  lead: "中文一个“在”、一个“去”就够了，法语要看后面是城市还是国家、是人还是地方。好在规律很整齐，查一次就记住。",
  sections: [
    {
      title: "1. 城市和国家",
      blocks: [
        {
          kind: "p",
          text: "“在”和“去”用同一个介词，“从……来”换成 de 那一列：",
        },
        {
          kind: "table",
          head: ["后面是", "在 / 去", "从……来"],
          fr: [1, 2],
          rows: [
            ["城市", "à Paris", "de Paris"],
            ["阴性国家", "en France", "de France"],
            ["元音开头的国家", "en Iran", "d'Iran"],
            ["阳性国家", "au Canada", "du Canada"],
            ["复数国家", "aux États-Unis", "des États-Unis"],
          ],
        },
        {
          kind: "tip",
          text: "怎么判断阴阳性：**以 -e 结尾的国家大多是阴性**（[[la Chine]]、[[la France]]、[[la Belgique]]），其余多是阳性（[[le Canada]]、[[le Japon]]）。例外要记：[[le Mexique]]、[[le Cambodge]]。",
        },
        {
          kind: "examples",
          items: [
            { fr: "J'habite **à** Montréal, **au** Canada.", zh: "我住在加拿大蒙特利尔。" },
            { fr: "Je vais **en** Chine cet été.", zh: "我今年夏天回中国。" },
            { fr: "Il vient **du** Japon.", zh: "他是从日本来的。" },
          ],
        },
      ],
    },
    {
      title: "2. à、dans、chez、en",
      blocks: [
        {
          kind: "table",
          head: ["介词", "用于", "例子"],
          fr: [0, 2],
          rows: [
            ["à", "某个地点、场所", "à la banque, à l'école, au bureau"],
            ["dans", "在……里面", "dans la boîte, dans le métro"],
            ["chez", "在某人家、某人的店里", "chez moi, chez Marie, chez le médecin"],
            ["en", "固定说法", "en ville, en classe, en vacances"],
          ],
        },
        {
          kind: "tip",
          text: "“去看医生”说 [[chez le médecin]]，不说 à le médecin：chez 后面接**人**，à 后面接**地方**。",
        },
      ],
    },
    {
      title: "3. 坐车还是走路",
      blocks: [
        {
          kind: "table",
          head: ["en：坐在里面", "à：骑在上面或走路"],
          fr: [0, 1],
          rows: [
            ["en voiture", "à pied"],
            ["en bus", "à vélo"],
            ["en train", "à moto"],
            ["en avion", "à cheval"],
            ["en métro", ""],
          ],
        },
      ],
    },
    {
      title: "4. 方位",
      blocks: [
        {
          kind: "table",
          head: ["法语", "意思", "法语", "意思"],
          fr: [0, 2],
          rows: [
            ["sur", "在……上", "sous", "在……下"],
            ["devant", "在……前", "derrière", "在……后"],
            ["entre", "在……之间", "à côté de", "在……旁边"],
            ["près de", "离……近", "loin de", "离……远"],
            ["à gauche de", "在……左边", "à droite de", "在……右边"],
            ["en face de", "在……对面", "au milieu de", "在……中间"],
          ],
        },
        {
          kind: "tip",
          text: "带 de 的那几个碰上 le、les 也会合体：[[à côté du parc]]、[[près des magasins]]。",
        },
      ],
    },
    {
      title: "5. 时间",
      blocks: [
        {
          kind: "table",
          head: ["法语", "意思", "例子"],
          fr: [0, 2],
          rows: [
            ["à", "几点", "à huit heures"],
            ["en", "月份、年份、季节", "en juin, en 2026, en été"],
            ["au", "只有春天", "au printemps"],
            ["le", "星期几、日期（不用介词）", "le lundi, le 3 mai"],
            ["pendant", "在……期间，持续多久", "pendant deux heures"],
            ["depuis", "自从、已经……了", "depuis trois ans"],
            ["il y a", "……以前", "il y a deux jours"],
            ["dans", "……以后（从现在算）", "dans une semaine"],
            ["en", "用多长时间完成", "en dix minutes"],
          ],
        },
        {
          kind: "tip",
          text: "[[depuis]] 表示“到现在还在继续”，动词用**现在时**：[[J'habite ici depuis trois ans.]] 我在这儿住了三年（现在还住）。中国学生常误用过去时。",
        },
        {
          kind: "tip",
          text: "[[le lundi]] 是“每周一”，[[lundi]] 不带冠词是“这周一”：[[Je travaille le lundi.]] / [[Je pars lundi.]]",
        },
      ],
    },
    {
      title: "6. 动词后面的固定介词",
      blocks: [
        {
          kind: "p",
          text: "动词接另一个动词时，有的直接跟原形，有的要加 à 或 de，只能跟着动词一起记：",
        },
        {
          kind: "table",
          head: ["+ 原形", "+ à + 原形", "+ de + 原形"],
          fr: [0, 1, 2],
          rows: [
            ["aimer", "commencer à", "finir de"],
            ["vouloir", "apprendre à", "essayer de"],
            ["pouvoir", "aider à", "oublier de"],
            ["devoir", "réussir à", "décider de"],
            ["aller", "continuer à", "arrêter de"],
          ],
        },
        {
          kind: "examples",
          items: [
            { fr: "J'apprends **à** nager.", zh: "我在学游泳。" },
            { fr: "J'ai oublié **de** fermer la porte.", zh: "我忘了关门。" },
            {
              fr: "Il joue **au** foot. / Il joue **du** piano.",
              zh: "踢球用 jouer à，演奏乐器用 jouer de",
            },
          ],
        },
      ],
    },
  ],
};

export default sheet;
