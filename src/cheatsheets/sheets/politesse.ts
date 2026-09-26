import type { Sheet } from "@/cheatsheets/types";

const sheet: Sheet = {
  id: "politesse",
  title: "打招呼与礼貌用语",
  summary: "见面、道谢、道歉、告别",
  lead: "语法还没学，这一页也能先用起来。法语区（魁北克也一样）很看重这些小礼节：进门不说 [[Bonjour]]，后面说得再好也会被当成没礼貌。",
  sections: [
    {
      title: "1. 见面",
      blocks: [
        {
          kind: "table",
          head: ["法语", "什么时候用"],
          fr: [0],
          rows: [
            ["Bonjour", "白天，对谁都行，最安全"],
            ["Bonsoir", "傍晚以后见面时说"],
            ["Salut", "朋友、同学之间，见面和告别都能用"],
            ["Allô", "魁北克口语里的“嗨”，接电话也说"],
            ["Coucou", "很熟的人、家人，带点亲昵（法国更常用）"],
            ["Enchanté / Enchantée", "初次见面：幸会。女性说话者写 Enchantée，读音一样"],
          ],
        },
        {
          kind: "tip",
          text: "进商店、上公交、问路之前先说 [[Bonjour, madame.]] 或 [[Bonjour, monsieur.]]，这是法语里最重要的一条礼貌规则。",
        },
        {
          kind: "tip",
          text: "魁北克人用 tu 比法国随意得多，同事之间、店员对顾客也常说 tu。对方先用 tu，你跟着用就行；面试、办事、写信仍然用 vous。",
        },
      ],
    },
    {
      title: "2. 你好吗",
      blocks: [
        {
          kind: "table",
          head: ["问", "场合"],
          fr: [0],
          rows: [
            ["Comment allez-vous?", "正式，对 vous"],
            ["Comment ça va?", "日常"],
            ["Ça va?", "最随便，语调上扬就是在问"],
          ],
        },
        {
          kind: "table",
          head: ["答", "意思"],
          fr: [0],
          rows: [
            ["Très bien, merci. Et vous?", "很好，谢谢。您呢？"],
            ["Ça va, et toi?", "还行，你呢？"],
            ["Pas mal.", "还不错"],
            ["Comme ci, comme ça.", "马马虎虎"],
            ["Bof.", "不怎么样（口语，法国更常用）"],
          ],
        },
        {
          kind: "tip",
          text: "回答完记得反问一句 [[Et vous?]] 或 [[Et toi?]]，不问会显得冷淡。",
        },
      ],
    },
    {
      title: "3. 介绍自己",
      blocks: [
        {
          kind: "examples",
          items: [
            { fr: "Je m'appelle Li Ming.", zh: "我叫李明。" },
            { fr: "Je suis chinois. / Je suis chinoise.", zh: "我是中国人。男 / 女" },
            { fr: "Je viens de Chine.", zh: "我来自中国。" },
            { fr: "J'habite à Toronto.", zh: "我住在多伦多。" },
            { fr: "Je travaille dans l'informatique.", zh: "我在 IT 行业工作。" },
            { fr: "J'apprends le français depuis six mois.", zh: "我学法语半年了。" },
            { fr: "Et vous, vous vous appelez comment?", zh: "那您叫什么名字？" },
          ],
        },
      ],
    },
    {
      title: "4. 请求与道谢",
      blocks: [
        {
          kind: "table",
          head: ["法语", "意思"],
          fr: [0],
          rows: [
            ["S'il vous plaît.", "请（对 vous）"],
            ["S'il te plaît.", "请（对 tu）"],
            ["Je voudrais un café.", "我想要一杯咖啡。比 je veux 客气得多"],
            ["Vous pouvez m'aider?", "您能帮我一下吗？"],
            ["Merci. / Merci beaucoup.", "谢谢 / 非常感谢"],
          ],
        },
        {
          kind: "table",
          head: ["别人道谢时回答", "语气"],
          fr: [0],
          rows: [
            ["De rien.", "不客气，最常用"],
            ["Bienvenue!", "不客气，魁北克特有，天天听到"],
            ["Je vous en prie.", "不客气，正式"],
            ["Avec plaisir.", "乐意效劳"],
            ["Il n'y a pas de quoi.", "没什么"],
          ],
        },
        {
          kind: "tip",
          text: "点东西、提要求一律用 [[Je voudrais…]]。直接说 Je veux 听起来像小孩在耍脾气。",
        },
      ],
    },
    {
      title: "5. 道歉",
      blocks: [
        {
          kind: "table",
          head: ["法语", "什么时候用"],
          fr: [0],
          rows: [
            ["Pardon.", "碰到人、借过、打断别人"],
            ["Excusez-moi.", "打扰一下，问路、叫服务员"],
            ["Je suis désolé. / Je suis désolée.", "真心道歉：对不起"],
            ["Ce n'est pas grave.", "没关系（回答别人的道歉）"],
          ],
        },
        {
          kind: "tip",
          text: "没听清时用上扬语调说 [[Pardon?]]，意思是“您说什么？”，比 Quoi? 礼貌得多。",
        },
      ],
    },
    {
      title: "6. 听不懂怎么办",
      blocks: [
        {
          kind: "examples",
          items: [
            { fr: "Je ne comprends pas.", zh: "我听不懂。" },
            { fr: "Vous pouvez répéter, s'il vous plaît?", zh: "您能再说一遍吗？" },
            { fr: "Plus lentement, s'il vous plaît.", zh: "请说慢一点。" },
            { fr: "Qu'est-ce que ça veut dire?", zh: "这是什么意思？" },
            {
              fr: "Comment on dit « 筷子 » en français?",
              zh: "“筷子”用法语怎么说？",
              say: "Comment on dit ça en français?",
            },
            { fr: "Je parle un peu français.", zh: "我会说一点法语。" },
          ],
        },
      ],
    },
    {
      title: "7. 告别",
      blocks: [
        {
          kind: "table",
          head: ["法语", "意思"],
          fr: [0],
          rows: [
            ["Au revoir.", "再见，对谁都行"],
            ["À bientôt!", "回头见"],
            ["À demain!", "明天见"],
            ["À tout à l'heure!", "一会儿见（当天还会再见）"],
            ["À plus tard!", "回头见"],
            ["À tantôt!", "一会儿见（魁北克说法，当天还会再见）"],
            ["Bonne journée! / Bonne soirée!", "祝你今天 / 今晚愉快"],
            ["Bonne fin de semaine!", "周末愉快。魁北克说 fin de semaine，法国说 Bon week-end"],
            ["Bonne nuit!", "晚安，睡前才说"],
          ],
        },
        {
          kind: "tip",
          text: "[[Bonne journée]] 和 [[Bonne soirée]] 是**离开时**说的祝福，见面打招呼还是用 Bonjour、Bonsoir。",
        },
      ],
    },
  ],
};

export default sheet;
