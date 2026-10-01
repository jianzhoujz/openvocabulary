import type { Sheet } from "@/cheatsheets/types";

const sheet: Sheet = {
  id: "prepositions-sons",
  title: "常用介词：发音与用法",
  summary: "à、de、en、avec……一个个读准、用对",
  lead: "介词是法语里出现频率最高的小词，也是听力里**最容易糊过去**的地方：它们短、常常轻读，还总和后面的冠词粘成一个音。这一页只做一件事——把最常用的那些一个一个过：怎么念、大致什么意思、配什么词。「读作」那列是音标，看个大概就行；表里点一下就出声，**听比看准**。按场景怎么选（城市还是国家、几点还是几月），见「介词：在哪儿、去哪儿、什么时候」那一页。",
  sections: [
    {
      title: "1. 先认三个“合体”",
      blocks: [
        {
          kind: "p",
          text: "à 和 de 碰上定冠词会**粘成一个词**，读音也跟着变。这几个音在听力里出现得极多，认不出来就整句听不懂：",
        },
        {
          kind: "table",
          head: ["合体", "读作", "本来是", "例子"],
          fr: [0, 3],
          rows: [
            ["au", "/o/，像“哦”", "à + le", "au Canada, au bureau"],
            ["aux", "/o/，和 au 同音", "à + les", "aux États-Unis"],
            ["du", "/dy/，d 加“于”的口型", "de + le", "du Japon, du café"],
            ["des", "/de/", "de + les", "des États-Unis"],
          ],
        },
        {
          kind: "tip",
          text: "de 碰到元音开头的词会缩写成 d'，只读一个 /d/：[[d'accord]]、[[d'Iran]]。à 不缩写，后面跟元音也照常分开读：[[à une heure]]。",
        },
        {
          kind: "tip",
          text: "[[du]] 也当部分冠词（[[du café]] 喝点咖啡），[[des]] 也是日常最常见的复数冠词（[[des amis]]）。写法和读音都一样，意思看后面的名词。",
        },
      ],
    },
    {
      title: "2. 最常用的十二个",
      blocks: [
        {
          kind: "table",
          head: ["介词", "读作", "大致什么意思", "例子"],
          fr: [0, 3],
          rows: [
            ["à", "/a/", "到、在（一个点）", "à Montréal, à midi"],
            ["de", "/də/", "从、的（来源、所属）", "de Paris, le livre de Marie"],
            ["en", "/ɑ̃/，鼻音", "在……里；用（材料、交通）；月份", "en France, en voiture, en juin"],
            ["dans", "/dɑ̃/，鼻音", "在……里面；过……之后", "dans la boîte, dans deux jours"],
            ["sur", "/syʁ/", "在……上；关于", "sur la table, sur Internet"],
            ["sous", "/su/", "在……下面", "sous la table"],
            ["avec", "/avɛk/", "和……一起；用（工具）", "avec moi, avec un crayon"],
            ["sans", "/sɑ̃/，鼻音", "没有、不带", "sans sucre, sans lui"],
            ["pour", "/puʁ/", "为了、给（对象）；持续", "pour toi, pour deux jours"],
            ["par", "/paʁ/", "通过、用（方式）；被", "par courriel, par exemple"],
            ["chez", "/ʃe/", "在、去某人那儿", "chez moi, chez le médecin"],
            ["entre", "/ɑ̃tʁ/", "在……之间", "entre nous, entre deux cours"],
          ],
        },
        {
          kind: "tip",
          text: "[[en]]、[[dans]]、[[sans]] 里的元音是**同一个鼻音 /ɑ̃/**，区别只在开头：一个没有辅音，一个带 d，一个带 s。听的时候先抓住这个鼻音，再看前后文。",
        },
      ],
    },
    {
      title: "3. 位置和方向",
      blocks: [
        {
          kind: "table",
          head: ["介词", "读作", "意思"],
          fr: [0],
          rows: [
            ["devant", "/dəvɑ̃/", "在……前面"],
            ["derrière", "/dɛʁjɛʁ/", "在……后面"],
            ["contre", "/kɔ̃tʁ/", "靠着、反对"],
            ["vers", "/vɛʁ/", "朝、往；大约（时间）"],
            ["près de", "/pʁɛ də/", "离……近"],
            ["loin de", "/lwɛ̃ də/", "离……远"],
            ["à côté de", "/a kote də/", "在……旁边"],
            ["en face de", "/ɑ̃ fas də/", "在……对面"],
            ["jusqu'à", "/ʒyska/", "直到"],
          ],
        },
        {
          kind: "tip",
          text: "带 de 的那几个碰上 le、les 照样合体：[[à côté du parc]]、[[près des magasins]]。",
        },
      ],
    },
    {
      title: "4. 时间",
      blocks: [
        {
          kind: "table",
          head: ["介词", "读作", "意思", "例子"],
          fr: [0, 3],
          rows: [
            ["avant", "/avɑ̃/", "在……之前", "avant midi"],
            ["après", "/apʁɛ/", "在……之后", "après le dîner"],
            ["depuis", "/dəpɥi/", "自从（到现在还在继续）", "depuis trois ans"],
            ["pendant", "/pɑ̃dɑ̃/", "在……期间", "pendant les vacances"],
            ["dans", "/dɑ̃/", "过……之后（从现在算）", "dans une semaine"],
            ["il y a", "/il ja/", "……以前（固定短语，不算介词，用法一样）", "il y a deux jours"],
            ["en", "/ɑ̃/", "用多长时间完成", "en dix minutes"],
          ],
        },
        {
          kind: "tip",
          text: "[[en dix minutes]] 是用十分钟**做完**，[[dans dix minutes]] 是十分钟**以后**才开始。",
        },
      ],
    },
    {
      title: "5. 读好介词的三个小地方",
      blocks: [
        {
          kind: "tip",
          text: "**de 常常轻到听不见。**读 /də/，说快了只剩一个 /d/：[[pas de problème]] 听着像 /pa d pʁɔblɛm/。句中一个很轻的“的”音，多半就是 de。",
        },
        {
          kind: "tip",
          text: "**au 和 du 要当熟词听。**[[au]] 读 /o/，和 [[haut]]（高）同音；[[du]] 读 /dy/，加拿大读音里 d 还要“咬”成近似 dz（见「发音规则」）。句子中间冒出一个 /o/ 或 /dy/，往往就是 à + le 和 de + le。",
        },
        {
          kind: "p",
          text: "**介词后面接元音开头的词要联诵**，连起来读成一个音节。这是最容易卡住的地方——耳朵里会多出一个 z、n 的音，那不是生词，就是介词带来的：",
        },
        {
          kind: "table",
          head: ["连起来写", "实际读作"],
          rows: [
            ["[[chez‿eux|chez eux]]", "/ʃe.zø/"],
            ["[[dans‿un|dans un]]", "/dɑ̃.zœ̃/"],
            ["[[sans‿argent|sans argent]]", "/sɑ̃.zaʁ.ʒɑ̃/"],
            ["[[en‿avion|en avion]]", "/ɑ̃.na.vjɔ̃/"],
          ],
        },
        {
          kind: "tip",
          text: "[[avec elle]] 听着也像 /a.vɛ.kɛl/，但这不是联诵：avec 的 c 本来就读，只是顺势和后面的元音连成一个音节。",
        },
        {
          kind: "tip",
          text: "自己说的时候宁可**慢一点、分开念**，也别含糊带过；但听的时候要预期那个多出来的辅音，才不会被它带偏。",
        },
      ],
    },
  ],
};

export default sheet;
