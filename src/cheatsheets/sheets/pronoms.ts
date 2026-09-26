import type { Sheet } from "@/cheatsheets/types";

const sheet: Sheet = {
  id: "pronoms",
  title: "人称代词全表",
  summary: "主语、宾语、重读，还有 y 和 en",
  lead: "中文的“我”放在哪儿都是“我”，法语却要看它在句子里当什么：主语、宾语、介词后面，各有各的形式。先看总表，再逐个拆开。",
  sections: [
    {
      title: "1. 总表",
      blocks: [
        {
          kind: "table",
          head: ["", "主语", "重读", "直接宾语", "间接宾语", "自反"],
          fr: [1, 2, 3, 4, 5],
          rows: [
            ["我", "je", "moi", "me", "me", "me"],
            ["你", "tu", "toi", "te", "te", "te"],
            ["他", "il", "lui", "le", "lui", "se"],
            ["她", "elle", "elle", "la", "lui", "se"],
            ["我们", "nous", "nous", "nous", "nous", "nous"],
            ["您 / 你们", "vous", "vous", "vous", "vous", "vous"],
            ["他们", "ils", "eux", "les", "leur", "se"],
            ["她们", "elles", "elles", "les", "leur", "se"],
          ],
        },
        {
          kind: "tip",
          text: "看着多，其实 **nous、vous 五列全一样**，me、te 也只在主语和重读两列不同。真正要记的是第三人称那几行。",
        },
        {
          kind: "tip",
          text: "元音前 je、me、te、le、la、se 都省音：[[j'aime]]、[[il m'aime]]、[[je t'aime]]、[[je l'aime]]。",
        },
      ],
    },
    {
      title: "2. on：口语里的“我们”",
      blocks: [
        {
          kind: "p",
          text: "[[on]] 动词跟 il 一样变，但意思常常是“我们”。说话时 on 比 nous 常用得多；它也可以泛指“人们、大家”。",
        },
        {
          kind: "examples",
          items: [
            { fr: "**On** va au cinéma?", zh: "我们去看电影吧？" },
            { fr: "**On** est fatigués.", zh: "我们累了。意思是复数，形容词可以加 s" },
            { fr: "Ici, **on** parle français.", zh: "这里说法语。泛指“人们”" },
          ],
        },
      ],
    },
    {
      title: "3. 重读代词：moi、toi、lui……",
      blocks: [
        { kind: "p", text: "不当主语、也不紧挨着动词当宾语的时候，用重读形式：" },
        {
          kind: "table",
          head: ["场合", "例子"],
          fr: [1],
          rows: [
            ["介词后面", "avec moi, chez toi, pour lui, sans eux"],
            ["单独回答", "Et toi? Moi aussi. Pas moi."],
            ["强调主语", "Moi, je reste ici."],
            ["c'est 后面", "C'est moi. C'est lui."],
            ["比较", "Il est plus grand que moi."],
          ],
        },
        {
          kind: "tip",
          text: "“我也是”说 [[Moi aussi.]]，“我也不”说 [[Moi non plus.]]。说成 Je aussi 是典型错误。",
        },
      ],
    },
    {
      title: "4. 直接宾语：le、la、les",
      blocks: [
        {
          kind: "p",
          text: "代替动词后面**不带介词**的宾语，“他 / 她 / 它 / 他们”。位置和中文、英语都不一样：**放在动词前面**。",
        },
        {
          kind: "examples",
          items: [
            { fr: "Je vois Marie. → Je **la** vois.", zh: "我看见玛丽。→ 我看见她。" },
            { fr: "Tu aimes ce film? → Oui, je **l'**aime.", zh: "你喜欢这部电影吗？→ 喜欢。" },
            { fr: "Il prend les clés. → Il **les** prend.", zh: "他拿钥匙。→ 他把它们拿走。" },
            { fr: "Tu **me** comprends?", zh: "你明白我的意思吗？" },
          ],
        },
      ],
    },
    {
      title: "5. 间接宾语：lui、leur",
      blocks: [
        {
          kind: "p",
          text: "代替 **à + 人**，“给他 / 对她 / 跟他们”。常见的动词：[[parler à]]、[[téléphoner à]]、[[dire à]]、[[donner à]]、[[demander à]]、[[écrire à]]。",
        },
        {
          kind: "examples",
          items: [
            { fr: "Je parle à Paul. → Je **lui** parle.", zh: "我跟保罗说话。→ 我跟他说话。" },
            { fr: "Je téléphone à ma mère. → Je **lui** téléphone.", zh: "lui 不分男女" },
            { fr: "Il écrit à ses amis. → Il **leur** écrit.", zh: "他给朋友们写信。" },
            { fr: "Tu **me** donnes ton numéro?", zh: "你给我你的电话号码好吗？" },
          ],
        },
        {
          kind: "tip",
          text: "[[leur]] 当代词时**永远不加 s**。加了 s 的 [[leurs]] 是“他们的”（物主形容词），两回事。",
        },
      ],
    },
    {
      title: "6. y 和 en",
      blocks: [
        {
          kind: "table",
          head: ["代词", "代替什么", "例子"],
          rows: [
            ["[[y]]", "à / en / dans + 地点或事物", "[[Je vais à Montréal. → J'y vais.]]"],
            ["[[y]]", "à + 事物", "[[Tu penses à l'examen? → Oui, j'y pense.]]"],
            [
              "[[en]]",
              "de + 东西、部分冠词 du / de la / des",
              "[[Tu veux du café? → Oui, j'en veux.]]",
            ],
            ["[[en]]", "数量，数字留在后面", "[[J'ai deux enfants. → J'en ai deux.]]"],
            ["[[en]]", "从某地来", "[[Tu viens de Toronto? → Oui, j'en viens.]]"],
          ],
        },
        {
          kind: "tip",
          text: "说数量时 en 不能省：“我有两个”要说 [[J'en ai deux.]]，只说 J'ai deux，母语者听着像话没说完。",
        },
      ],
    },
    {
      title: "7. 代词放在哪儿",
      blocks: [
        {
          kind: "table",
          head: ["句型", "位置", "例子"],
          fr: [2],
          rows: [
            ["普通句", "变位动词前", "Je le vois."],
            ["否定句", "ne 和动词之间", "Je ne le vois pas."],
            ["动词 + 原形", "原形前", "Je vais le voir. Je veux lui parler."],
            ["复合过去时", "助动词前", "Je l'ai vu. Je ne l'ai pas vu."],
            ["肯定命令式", "动词后，加连字符", "Regarde-moi! Prends-le!"],
            ["否定命令式", "回到动词前", "Ne le prends pas!"],
          ],
        },
        {
          kind: "tip",
          text: "肯定命令式里 me、te 变成 **moi、toi**：[[Aide-moi!]]、[[Lève-toi!]]。否定时又变回去：[[Ne me regarde pas!]]",
        },
        {
          kind: "tip",
          text: "复合过去时里，直接宾语代词在前面时，过去分词要跟它配合：[[Marie? Je l'ai vue.]]（阴性加 e）。多数时候读音不变，写的时候别忘。",
        },
      ],
    },
    {
      title: "8. 两个代词一起出现",
      blocks: [
        {
          kind: "p",
          text: "顺序固定：**me / te / nous / vous → le / la / les → lui / leur → y → en**。",
        },
        {
          kind: "examples",
          items: [
            { fr: "Il **me le** donne.", zh: "他把它给我。" },
            { fr: "Je **le lui** donne.", zh: "我把它给他。" },
            { fr: "Je **vous en** apporte.", zh: "我给您拿一些来。" },
            { fr: "Il **y en** a trois.", zh: "有三个。il y a + en" },
          ],
        },
        {
          kind: "tip",
          text: "这种叠在一起的说法口语里并不多，看得懂就行。实在拿不准，只用一个代词、另一个说全也完全没问题。",
        },
      ],
    },
  ],
};

export default sheet;
