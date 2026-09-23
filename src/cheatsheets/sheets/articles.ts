import type { Sheet } from "@/cheatsheets/types";

const sheet: Sheet = {
  id: "articles",
  title: "冠词",
  summary: "le / un / du 三种“帽子”怎么选",
  lead: "法语名词前面几乎都要戴一顶小“帽子”，也就是冠词。中文说“苹果”，法语不能只说 pomme，要说 [[la pomme]]、[[une pomme]] 或者 [[de la pomme]]。",
  sections: [
    {
      title: "1. 三种帽子",
      blocks: [
        {
          kind: "table",
          head: ["帽子", "意思", "什么时候用"],
          rows: [
            ["**定冠词**", "那个", "对方知道是哪个；或者说“某类东西”整体"],
            ["**不定冠词**", "一个", "能数的东西，第一次提到"],
            ["**部分冠词**", "一些、一点", "数不清的东西：水、面包、咖啡"],
          ],
        },
        {
          kind: "table",
          head: ["", "阳性", "阴性", "复数"],
          fr: [1, 2, 3],
          rows: [
            ["定冠词", "le", "la", "les"],
            ["不定冠词", "un", "une", "des"],
            ["部分冠词", "du", "de la", "—"],
          ],
        },
        {
          kind: "tip",
          text: "名词以元音或 h 开头时：le、la 缩成 **l'**，du、de la 变成 **de l'**。比如 [[l'eau]]（那水）、[[de l'eau]]（一些水）。",
        },
      ],
    },
    {
      title: "2. 三步选帽子",
      blocks: [
        {
          kind: "p",
          text: "① **是“那个”吗？** 对方知道你指哪个，或者在说一整类东西 → [[le]] / [[la]] / [[les]]",
        },
        { kind: "p", text: "② **能一个一个数吗？** → [[un]] / [[une]] / [[des]]" },
        { kind: "p", text: "③ **数不清？** → [[du]] / [[de la]] / [[de l'|de l'eau]]" },
      ],
    },
    {
      title: "3. 一个“咖啡”看懂全部",
      blocks: [
        {
          kind: "examples",
          items: [
            { fr: "J'aime **le** café.", zh: "我喜欢咖啡。说咖啡这类东西 → 定冠词" },
            { fr: "Je bois **du** café.", zh: "我喝（点）咖啡。喝掉一些 → 部分冠词" },
            { fr: "Je voudrais **un** café.", zh: "我要一杯咖啡。点单时的“一杯” → 不定冠词" },
            { fr: "**Le** café est chaud.", zh: "（这杯）咖啡很烫。眼前这杯 → 定冠词" },
          ],
        },
        {
          kind: "tip",
          text: "说“喜欢、讨厌”某类东西，法语用定冠词：[[J'aime les chats.]] 我喜欢猫。英语是 I like cats，不加 the，法语必须加。",
        },
      ],
    },
    {
      title: "4. à、de 碰上 le、les 会合体",
      blocks: [
        {
          kind: "table",
          head: ["组合", "变成", "例句"],
          fr: [1, 2],
          rows: [
            ["à + le", "au", "Je vais au cinéma."],
            ["à + les", "aux", "Je parle aux enfants."],
            ["de + le", "du", "le livre du professeur"],
            ["de + les", "des", "la voiture des voisins"],
          ],
        },
        {
          kind: "tip",
          text: "口诀：**le 和 les 会被吃掉，la 和 l' 不会**。[[à la gare]]、[[à l'école]]、[[de la mère]] 都保持原样。",
        },
      ],
    },
    {
      title: "5. 否定句里，“一个”“一些”都变成 de",
      blocks: [
        {
          kind: "examples",
          items: [
            { fr: "Je n'ai pas **de** chat.", zh: "我没有猫。（肯定句是 J'ai un chat.）" },
            { fr: "Je ne bois pas **de** café.", zh: "我不喝咖啡。（肯定句是 Je bois du café.）" },
            { fr: "Il n'y a pas **d'**eau.", zh: "没有水。元音前写成 d'" },
          ],
        },
        {
          kind: "tip",
          text: "定冠词不受影响：[[J'aime le café.]] → [[Je n'aime pas le café.]]",
        },
      ],
    },
    {
      title: "6. 中文不加、法语要加 le / la 的地方",
      blocks: [
        {
          kind: "examples",
          items: [
            { fr: "**Le** Canada est grand.", zh: "加拿大很大。国家名前加" },
            { fr: "J'apprends **le** français.", zh: "我在学法语。语言名前加" },
            { fr: "**Le** lundi, je travaille.", zh: "我每周一上班。“le + 星期”= 每个星期几" },
            { fr: "J'ai mal à **la** tête.", zh: "我头疼。身体部位用 la，不说“我的头”" },
          ],
        },
      ],
    },
  ],
};

export default sheet;
