import type { Sheet } from "@/cheatsheets/types";

const sheet: Sheet = {
  id: "vs-anglais",
  title: "对照英语学法语",
  summary: "哪些照搬英语，哪些要重新学",
  lead: "懂英语的人学法语，**词汇和语序**多半能直接沿用，真正要下功夫的是**“配合”**：冠词、形容词、动词都要跟着名词的阴阳性、单复数和人称变。",
  sections: [
    {
      title: "1. 可以照搬英语的地方",
      blocks: [
        {
          kind: "table",
          head: ["方面", "英语", "法语"],
          fr: [2],
          rows: [
            ["基本语序：主-谓-宾", "I eat an apple.", "Je mange une pomme."],
            ["有定冠词和不定冠词", "the book / a book", "le livre / un livre"],
            ["复数多数加 s", "books", "des livres"],
            ["助动词加过去分词", "I have eaten.", "J'ai mangé."],
            ["连词", "and / but / or", "et / mais / ou"],
          ],
        },
        {
          kind: "p",
          text: "英语大约三分之一的词汇来自法语，很多词拼写几乎一样：[[information]]、[[important]]、[[possible]]、[[restaurant]]。",
        },
        {
          kind: "tip",
          text: "差别在读音：法语复数的 s **通常不读**，[[livre]] 和 [[livres]] 听起来一样，单复数要靠冠词 [[le]] / [[les]] 分辨。",
        },
      ],
    },
    {
      title: "2. 名词分阴阳性（最大的新概念）",
      blocks: [
        {
          kind: "p",
          text: "英语只有一个 the。法语每个名词都有性别，冠词跟着变：",
        },
        {
          kind: "table",
          head: ["", "阳性", "阴性", "复数"],
          fr: [1, 2, 3],
          rows: [
            ["the", "le livre", "la table", "les livres"],
            ["a / 一些", "un livre", "une table", "des tables"],
          ],
        },
        {
          kind: "tip",
          text: "性别大多**没道理可讲**，比如桌子是阴性，书是阳性。背单词时**连冠词一起背**：记 [[la table]]，不要只记 table。",
        },
      ],
    },
    {
      title: "3. 形容词要变形，多数放在名词后面",
      blocks: [
        {
          kind: "p",
          text: "英语形容词不变，而且放在名词前。法语形容词**跟着名词的性、数变**，**多数放在名词后面**：",
        },
        {
          kind: "table",
          head: ["英语", "法语", "说明"],
          fr: [1],
          rows: [
            ["a red car", "une voiture rouge", "“一辆车红的”，形容词在后"],
            ["a small book", "un petit livre", "阳性单数，原形"],
            ["a small table", "une petite table", "阴性加 e"],
            ["small books", "des petits livres", "复数加 s"],
          ],
        },
        {
          kind: "tip",
          text: "少数短小常用的形容词放在前面：[[petit]]、[[grand]]、[[bon]]、[[beau]]、[[jeune]]、[[vieux]]。",
        },
      ],
    },
    {
      title: "4. 动词每个人称都变",
      blocks: [
        {
          kind: "p",
          text: "英语现在时基本只有 eat / eats 两种形式，法语几乎每个人称一个词尾：",
        },
        {
          kind: "table",
          head: ["英语", "manger 吃", "英语", "être 是"],
          fr: [1, 3],
          rows: [
            ["I eat", "je mange", "I am", "je suis"],
            ["you eat", "tu manges", "you are", "tu es"],
            ["he / she eats", "il mange", "he is", "il est"],
            ["we eat", "nous mangeons", "we are", "nous sommes"],
            ["you (复数/尊称) eat", "vous mangez", "you are", "vous êtes"],
            ["they eat", "ils mangent", "they are", "ils sont"],
          ],
        },
        {
          kind: "tip",
          text: "好消息：[[je mange]]、[[tu manges]]、[[il mange]]、[[ils mangent]] **读音完全相同**，听说比读写容易。",
        },
      ],
    },
    {
      title: "5. 代词宾语挪到动词前面",
      blocks: [
        {
          kind: "p",
          text: "英语母语者最常犯的错。宾语是**名词**时和英语一样放在动词后；换成**代词**就要挪到动词前：",
        },
        {
          kind: "examples",
          items: [
            { fr: "Je vois **Paul**.", zh: "I see Paul.（名词：在动词后）" },
            { fr: "Je **le** vois.", zh: "I see him.（代词：“我 他 看见”）" },
            { fr: "Je **t'**aime.", zh: "I love you." },
            { fr: "Je **le lui** ai donné.", zh: "I gave it to her." },
          ],
        },
      ],
    },
    {
      title: "6. 否定：用 ne … pas 夹住动词",
      blocks: [
        {
          kind: "p",
          text: "法语没有 do 这个助动词，不说 don't，而是用 **ne … pas** 把动词夹在中间：",
        },
        {
          kind: "examples",
          items: [
            { fr: "Je **ne** mange **pas**.", zh: "I don't eat." },
            { fr: "Je **ne** sais **pas**.", zh: "I don't know." },
            { fr: "Je sais **pas**.", zh: "口语常把 ne 吞掉" },
          ],
        },
      ],
    },
    {
      title: "7. 疑问句：三种问法",
      blocks: [
        {
          kind: "p",
          text: "英语要用 do 或倒装。法语同一个问题（Do you speak French?）有三种问法：",
        },
        {
          kind: "table",
          head: ["问法", "例句", "场合"],
          fr: [1],
          rows: [
            ["只把句尾语调扬上去", "Tu parles français?", "最口语、最常用"],
            ["句首加 Est-ce que", "Est-ce que tu parles français?", "标准，什么场合都行"],
            ["主语和动词倒装", "Parles-tu français?", "书面、正式"],
          ],
        },
        {
          kind: "tip",
          text: "初学先用前两种就够了。",
        },
      ],
    },
    {
      title: "8. 时态：没有进行时，过去时分两种",
      blocks: [
        {
          kind: "table",
          head: ["英语", "法语", "说明"],
          fr: [1],
          rows: [
            ["I eat / I am eating", "Je mange.", "法语**没有进行时**，一个形式管两种意思"],
            ["I ate / I have eaten", "J'ai mangé.", "复合过去时：讲发生过的一件事"],
            ["I was eating / I used to eat", "Je mangeais.", "未完成过去时：背景、状态、习惯"],
            ["I'm going to eat", "Je vais manger.", "最近将来时，和 going to 一样好用"],
          ],
        },
        {
          kind: "tip",
          text: "少数表示移动、变化的动词，完成时用 **être** 而不是 avoir：I went 是 [[Je suis allé.]]（“我是去了”），不是 J'ai allé。",
        },
      ],
    },
    {
      title: "9. 所有格：没有 's，his / her 看东西不看人",
      blocks: [
        {
          kind: "p",
          text: "英语的 Paul's book 在法语里说成“书 of 保罗”：[[le livre de Paul]]。",
        },
        {
          kind: "p",
          text: "英语的 his / her 看**主人**是男是女；法语的 son / sa 看**东西**是阳性还是阴性：",
        },
        {
          kind: "table",
          head: ["英语", "法语", "为什么"],
          fr: [1],
          rows: [
            ["his book / her book", "son livre", "livre 是阳性"],
            ["his house / her house", "sa maison", "maison 是阴性"],
          ],
        },
        {
          kind: "tip",
          text: "所以 [[sa maison]] 可以是“他的房子”，也可以是“她的房子”。",
        },
      ],
    },
    {
      title: "10. 英语里没有的几样东西",
      blocks: [
        {
          kind: "p",
          text: "**部分冠词 du / de la**：说“一些”不可数的东西，英语光秃秃一个名词，法语**必须加冠词**。",
        },
        {
          kind: "examples",
          items: [
            { fr: "Je bois **de l'**eau.", zh: "I drink water." },
            { fr: "Je mange **du** pain.", zh: "I eat bread." },
          ],
        },
        {
          kind: "p",
          text: "**反身动词**：很多英语的普通动词，法语要带一个“自己”（me / se）。",
        },
        {
          kind: "examples",
          items: [
            { fr: "Je **me** lève.", zh: "I get up.（我把自己抬起来）" },
            { fr: "Je **m'**appelle Marie.", zh: "My name is Marie.（我称呼自己玛丽）" },
          ],
        },
        {
          kind: "p",
          text: "**虚拟式**：英语只剩 if I were 这种残留，法语在 [[il faut que]]（必须）、[[je veux que]]（我要某人……）之后很常用。**入门阶段可以先跳过。**",
        },
      ],
    },
    {
      title: "11. 一眼对照",
      blocks: [
        {
          kind: "table",
          head: ["", "英语", "法语"],
          rows: [
            ["语序", "主-谓-宾", "主-谓-宾，相同"],
            ["名词性别", "无", "阴 / 阳"],
            ["形容词", "不变，放在名词前", "变形，多放在名词后"],
            ["动词变位", "几乎不变", "每个人称都变"],
            ["代词宾语", "动词后：see him", "动词前：[[le vois]]"],
            ["否定", "don't", "[[ne … pas|ne pas]]"],
            ["疑问", "do / 倒装", "升调 / [[est-ce que]] / 倒装"],
            ["进行时", "有", "无"],
            ["his / her", "看主人", "看东西"],
          ],
        },
        {
          kind: "tip",
          text: "学习顺序：名词连冠词背 → 背熟 [[être]]、[[avoir]]、[[aller]]、[[faire]] → 学会 ne … pas 和 est-ce que → 复合过去时。这几样会了，就能说出大量句子。",
        },
      ],
    },
  ],
};

export default sheet;
