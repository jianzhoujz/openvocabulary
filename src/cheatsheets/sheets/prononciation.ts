import type { Sheet } from "@/cheatsheets/types";

const sheet: Sheet = {
  id: "prononciation",
  title: "发音规则",
  summary: "看到生词也能读出来",
  lead: "法语的拼写和读音很有规律。记住下面五条，看到没见过的词也能读个八九不离十。带喇叭的地方都可以点，多听多跟读。",
  sections: [
    {
      title: "1. 词尾的辅音多半不读",
      blocks: [
        {
          kind: "p",
          text: "单词最后的 e、s、t、d、x、z 通常不发音，写出来只是“摆设”。",
        },
        {
          kind: "examples",
          items: [
            { fr: "petit", zh: "小的（t 不读）" },
            { fr: "Paris", zh: "巴黎（s 不读）" },
            { fr: "grand", zh: "大的（d 不读）" },
            { fr: "deux", zh: "二（x 不读）" },
            { fr: "chez", zh: "在……家（z 不读）" },
            { fr: "table", zh: "桌子（e 不读）" },
          ],
        },
        {
          kind: "tip",
          text: "例外口诀 **CaReFuL**：词尾是 c、r、f、l 时一般要读，比如 [[avec]]、[[bonjour]]、[[neuf]]、[[journal]]。但动词结尾的 -er 不读 r：[[parler]]。",
        },
      ],
    },
    {
      title: "2. 字母组合有固定读法",
      blocks: [
        {
          kind: "p",
          text: "几个字母凑在一起时，读法是固定的。中文只是近似，以喇叭为准。",
        },
        {
          kind: "table",
          head: ["写法", "听起来像", "例词"],
          fr: [2],
          rows: [
            ["ou", "乌", "vous, rouge"],
            ["oi", "瓦", "moi, trois"],
            ["au / eau", "哦", "au, beau, eau"],
            ["ai / è / ê", "艾", "lait, mère, fête"],
            ["é / er / ez", "诶（嘴角向两边拉）", "été, parler, nez"],
            ["u", "于（撅嘴说“一”）", "tu, rue"],
            ["eu / œu", "饿（嘴唇撅圆）", "deux, sœur"],
            ["ch", "师", "chat, chose"],
            ["gn", "尼", "montagne, espagnol"],
            ["qu", "k", "qui, quatre"],
            ["ill", "一耶（ville、mille 例外，读“伊勒”）", "fille, famille"],
            ["h", "永远不读", "homme, hôtel"],
          ],
        },
        {
          kind: "tip",
          text: "u 和 ou 是最容易混的一对：[[tu]]（你）撅嘴说“一”，[[tout]]（全部）就是“乌”。",
        },
      ],
    },
    {
      title: "3. 鼻化元音",
      blocks: [
        {
          kind: "p",
          text: "元音后面跟着 n 或 m，而且后面不再接元音时，n、m 不单独发出来，前面的元音带上鼻音。",
        },
        {
          kind: "table",
          head: ["写法", "听起来像", "例词"],
          fr: [2],
          rows: [
            ["an / en / am / em", "昂（鼻音）", "enfant, temps"],
            ["on / om", "翁（鼻音）", "bon, nom"],
            ["in / im / ain / ein / un", "安（鼻音）", "vin, pain, un"],
          ],
        },
        {
          kind: "tip",
          text: "在法国，un 和 in 基本读成同一个音；魁北克口音里 un 的嘴唇更圆一些，两种都听得懂。",
        },
        {
          kind: "tip",
          text: "后面紧跟元音、或者 n 双写，就不鼻化了：[[bon]] 带鼻音，[[bonne]] 读成“博呢”。",
        },
      ],
    },
    {
      title: "4. 连读：联诵和省音",
      blocks: [
        {
          kind: "p",
          text: "**联诵**：前一个词不读的词尾辅音，碰上后一个元音开头的词，就要读出来并连过去。s 和 x 连成 z 音。",
        },
        {
          kind: "examples",
          items: [
            { fr: "les amis", zh: "朋友们：读成 lé-za-mi" },
            { fr: "vous avez", zh: "您有：读成 vou-za-vé" },
            { fr: "un ami", zh: "一个朋友：读成 un-na-mi" },
            { fr: "deux heures", zh: "两点钟：读成 deu-zeure（h 不读，照样连）" },
          ],
        },
        {
          kind: "p",
          text: "**省音**：je、le、la、ne、de 这些短词碰上元音开头的词，丢掉自己的元音，换成撇号 '。",
        },
        {
          kind: "examples",
          items: [
            { fr: "j'ai", zh: "我有（je + ai）" },
            { fr: "l'ami", zh: "那个朋友（le + ami）" },
            { fr: "c'est", zh: "这是（ce + est）" },
            { fr: "Il n'est pas là.", zh: "他不在（ne + est）" },
          ],
        },
      ],
    },
    {
      title: "5. 重音永远在最后",
      blocks: [
        {
          kind: "p",
          text: "法语没有英语那样的轻重音，每个音节几乎一样重，只在一组词的最后一个音节稍微拉长。读得平一点、匀一点，反而更像法语。",
        },
        {
          kind: "examples",
          items: [
            { fr: "restaurant", zh: "餐馆：res-tau-RANT" },
            { fr: "université", zh: "大学：u-ni-ver-si-TÉ" },
            { fr: "Je voudrais un café.", zh: "我想要一杯咖啡。只有句末的 fé 稍重" },
          ],
        },
      ],
    },
  ],
};

export default sheet;
