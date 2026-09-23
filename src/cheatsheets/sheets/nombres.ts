import type { Sheet } from "@/cheatsheets/types";

const sheet: Sheet = {
  id: "nombres",
  title: "数字、日期与时间",
  summary: "70、80、90 的怪数法",
  lead: "法语数字 0 到 69 很规整，70 以后要做点算术。日期、时间、价格都要用到数字，值得多听几遍。",
  sections: [
    {
      title: "1. 0 到 20",
      blocks: [
        {
          kind: "table",
          head: ["", "", "", ""],
          fr: [1, 3],
          rows: [
            ["0", "zéro", "11", "onze"],
            ["1", "un", "12", "douze"],
            ["2", "deux", "13", "treize"],
            ["3", "trois", "14", "quatorze"],
            ["4", "quatre", "15", "quinze"],
            ["5", "cinq", "16", "seize"],
            ["6", "six", "17", "dix-sept"],
            ["7", "sept", "18", "dix-huit"],
            ["8", "huit", "19", "dix-neuf"],
            ["9", "neuf", "20", "vingt"],
            ["10", "dix", "", ""],
          ],
        },
      ],
    },
    {
      title: "2. 整十，和 70、80、90 的算术",
      blocks: [
        {
          kind: "table",
          head: ["数字", "法语", "怎么理解"],
          fr: [1],
          rows: [
            ["30", "trente", ""],
            ["40", "quarante", ""],
            ["50", "cinquante", ""],
            ["60", "soixante", ""],
            ["70", "soixante-dix", "60 + 10"],
            ["80", "quatre-vingts", "4 × 20"],
            ["90", "quatre-vingt-dix", "4 × 20 + 10"],
            ["100", "cent", ""],
            ["1000", "mille", ""],
          ],
        },
        {
          kind: "examples",
          items: [
            { fr: "vingt et un", zh: "21：21、31、41、51、61 和 71 用 et 连接" },
            { fr: "quatre-vingt-un", zh: "81：例外，81 和 91 不加 et" },
            { fr: "trente-cinq", zh: "35：其他用连字符" },
            { fr: "soixante-douze", zh: "72 = 60 + 12" },
            { fr: "quatre-vingt-cinq", zh: "85 = 4 × 20 + 5" },
            { fr: "quatre-vingt-dix-neuf", zh: "99 = 4 × 20 + 19" },
          ],
        },
        {
          kind: "tip",
          text: "在比利时和瑞士，70 说 [[septante]]、90 说 [[nonante]]。加拿大和法国都不这么说，听到了认得就行。",
        },
      ],
    },
    {
      title: "3. 星期和月份",
      blocks: [
        {
          kind: "table",
          head: ["", "", "", ""],
          fr: [1, 3],
          rows: [
            ["周一", "lundi", "周五", "vendredi"],
            ["周二", "mardi", "周六", "samedi"],
            ["周三", "mercredi", "周日", "dimanche"],
            ["周四", "jeudi", "", ""],
          ],
        },
        {
          kind: "table",
          head: ["", "", "", ""],
          fr: [1, 3],
          rows: [
            ["1 月", "janvier", "7 月", "juillet"],
            ["2 月", "février", "8 月", "août"],
            ["3 月", "mars", "9 月", "septembre"],
            ["4 月", "avril", "10 月", "octobre"],
            ["5 月", "mai", "11 月", "novembre"],
            ["6 月", "juin", "12 月", "décembre"],
          ],
        },
        {
          kind: "p",
          text: "日期的说法是“le + 数字 + 月份”，顺序和中文相反：",
        },
        {
          kind: "examples",
          items: [
            {
              fr: "Aujourd'hui, c'est le 14 juillet.",
              zh: "今天是 7 月 14 日。",
              say: "Aujourd'hui, c'est le quatorze juillet.",
            },
            { fr: "Mon anniversaire, c'est le premier mai.", zh: "我的生日是 5 月 1 日。" },
          ],
        },
        {
          kind: "tip",
          text: "星期和月份首字母都小写。日期直接用普通数字，只有 1 号要说 [[le premier]]。",
        },
      ],
    },
    {
      title: "4. 几点了",
      blocks: [
        {
          kind: "examples",
          items: [
            { fr: "Quelle heure est-il?", zh: "几点了？" },
            { fr: "Il est trois heures.", zh: "3 点。" },
            { fr: "Il est huit heures et quart.", zh: "8 点一刻（8:15）。" },
            { fr: "Il est midi et demi.", zh: "中午 12 点半。" },
            { fr: "Il est dix heures moins le quart.", zh: "差一刻 10 点（9:45）。" },
            {
              fr: "Le train part à 14 h 30.",
              zh: "火车 14:30 开。时刻表、预约都用 24 小时制",
              say: "Le train part à quatorze heures trente.",
            },
          ],
        },
      ],
    },
  ],
};

export default sheet;
