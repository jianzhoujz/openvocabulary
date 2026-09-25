import type { Sheet } from "@/cheatsheets/types";

const sheet: Sheet = {
  id: "conjugaison",
  title: "动词变位规律",
  summary: "三组动词、词尾和词干怎么变",
  lead: "法语动词看着有几千种变法，其实翻来覆去就几条规律：词尾几乎是固定的，变的主要是词干。掌握下面这些，遇到新动词也能猜个八九不离十。",
  sections: [
    {
      title: "1. 三组动词",
      blocks: [
        {
          kind: "table",
          head: ["组", "怎么认", "例子"],
          rows: [
            ["第一组", "以 -er 结尾（aller 除外），约占九成", "[[parler]]、[[aimer]]、[[manger]]"],
            ["第二组", "以 -ir 结尾，nous 形式带 -iss-", "[[finir]] → [[nous finissons]]"],
            [
              "第三组",
              "其余全部：-re、-oir、不带 -iss- 的 -ir",
              "[[prendre]]、[[voir]]、[[partir]]",
            ],
          ],
        },
        {
          kind: "tip",
          text: "新造的动词一律进第一组，比如 [[googler]]、[[liker]]。所以第一组规则学会了，最能“以一当十”。",
        },
      ],
    },
    {
      title: "2. 现在时的词尾",
      blocks: [
        {
          kind: "table",
          head: ["人称", "第一组", "第二组", "第三组（大多数）"],
          rows: [
            ["je", "-e", "-is", "-s（少数 -x）"],
            ["tu", "-es", "-is", "-s（少数 -x）"],
            ["il / elle / on", "-e", "-it", "-t（-d 结尾的不加）"],
            ["nous", "-ons", "-issons", "-ons"],
            ["vous", "-ez", "-issez", "-ez"],
            ["ils / elles", "-ent", "-issent", "-ent"],
          ],
        },
        {
          kind: "p",
          text: "三组的 nous、vous、ils 几乎一样。例外少到可以一口气背完：",
        },
        {
          kind: "table",
          head: ["规律", "仅有的例外"],
          rows: [
            ["nous 都是 -ons", "[[nous sommes]]"],
            ["vous 都是 -ez", "[[vous êtes]]、[[vous faites]]、[[vous dites]]"],
            ["ils 都是 -ent", "[[ils sont]]、[[ils ont]]、[[ils vont]]、[[ils font]]"],
            ["tu 都以 -s 或 -x 结尾", "没有（[[tu es]]、[[tu peux]]、[[tu veux]]）"],
          ],
        },
      ],
    },
    {
      title: "3. 第三组的两种常见套路",
      blocks: [
        {
          kind: "p",
          text: "**-re 动词**：去掉 -re，单数加 -s、-s、不加。像 [[vendre]] 这样变的还有 [[attendre]]、[[entendre]]、[[répondre]]、[[perdre]]、[[descendre]]。",
        },
        {
          kind: "p",
          text: "**partir 型 -ir 动词**：单数要把词干最后一个辅音也去掉。同类的有 [[dormir]]、[[sortir]]、[[sentir]]、[[servir]]。",
        },
        {
          kind: "table",
          head: ["vendre 卖", "partir 出发", "dormir 睡"],
          fr: [0, 1, 2],
          rows: [
            ["je vends", "je pars", "je dors"],
            ["tu vends", "tu pars", "tu dors"],
            ["il vend", "il part", "il dort"],
            ["nous vendons", "nous partons", "nous dormons"],
            ["vous vendez", "vous partez", "vous dormez"],
            ["ils vendent", "ils partent", "ils dorment"],
          ],
        },
        {
          kind: "tip",
          text: "[[ouvrir]]、[[offrir]]、[[découvrir]] 虽然是 -ir，现在时却按第一组变：[[j'ouvre]]、[[tu offres]]。",
        },
      ],
    },
    {
      title: "4. “两个词干”规律",
      blocks: [
        {
          kind: "p",
          text: "很多不规则动词其实只有两个词干：nous、vous 用一个（通常接近原形），je、tu、il、ils 用另一个。把六个人称画在表上，变形的那四格正好像一只靴子。",
        },
        {
          kind: "table",
          head: ["原形", "je / tu / il", "nous / vous", "ils"],
          fr: [0, 1, 2, 3],
          rows: [
            ["venir", "viens, vient", "venons, venez", "viennent"],
            ["prendre", "prends, prend", "prenons, prenez", "prennent"],
            ["boire", "bois, boit", "buvons, buvez", "boivent"],
            ["devoir", "dois, doit", "devons, devez", "doivent"],
            ["pouvoir", "peux, peut", "pouvons, pouvez", "peuvent"],
            ["vouloir", "veux, veut", "voulons, voulez", "veulent"],
          ],
        },
        {
          kind: "tip",
          text: "ils 的形式“长得像单数，尾巴上的辅音要读出来”：[[il vient]] → [[ils viennent]]，[[il doit]] → [[ils doivent]]。",
        },
      ],
    },
    {
      title: "5. -er 动词的拼写小变化",
      blocks: [
        {
          kind: "p",
          text: "第一组也有“靴子”：词尾不读的那几格（je、tu、il、ils），词干会为了发音改一下拼写，nous、vous 保持原样。",
        },
        {
          kind: "table",
          head: ["变化", "例子", "同类"],
          rows: [
            ["e → è", "[[j'achète]] / [[nous achetons]]", "[[lever]]、[[se promener]]"],
            ["é → è", "[[je préfère]] / [[nous préférons]]", "[[répéter]]、[[espérer]]"],
            ["双写辅音", "[[j'appelle]] / [[nous appelons]]", "[[jeter]] → [[je jette]]"],
            ["y → i", "[[je paie]] / [[nous payons]]", "[[envoyer]]、[[nettoyer]]"],
          ],
        },
        {
          kind: "p",
          text: "反过来，[[manger]]、[[commencer]] 这类**只有 nous 变**，为了让 g、c 保持软音：",
        },
        {
          kind: "examples",
          items: [
            { fr: "Nous **mangeons** à midi.", zh: "我们中午吃饭。加 e，g 读 [ʒ] 不读 [g]" },
            { fr: "Nous **commençons** demain.", zh: "我们明天开始。c 加尾巴，读 [s] 不读 [k]" },
          ],
        },
      ],
    },
    {
      title: "6. 听的时候怎么分单复数",
      blocks: [
        {
          kind: "p",
          text: "第一组动词 je、tu、il、ils 四个读音完全一样，单复数只能靠主语前后的线索：",
        },
        {
          kind: "examples",
          items: [
            { fr: "Il parle. / Ils parlent.", zh: "读音一样，只能靠上下文" },
            { fr: "Il aime. / Ils aiment.", zh: "元音开头的动词，复数 ils 连读出 z 音" },
            {
              fr: "Il finit. / Ils finissent.",
              zh: "第二、三组复数多出一个音节或辅音，一听就知道",
            },
            { fr: "Il prend. / Ils prennent.", zh: "复数末尾有 n 音" },
          ],
        },
      ],
    },
    {
      title: "7. 自反动词：多带一个代词",
      blocks: [
        {
          kind: "p",
          text: "原形前有 [[se]] 的动词，变位时 se 要跟着主语变成 me、te、se、nous、vous、se，动词本身照常变。",
        },
        {
          kind: "table",
          head: ["se lever 起床", "s'appeler 叫……名字"],
          fr: [0, 1],
          rows: [
            ["je me lève", "je m'appelle"],
            ["tu te lèves", "tu t'appelles"],
            ["il se lève", "il s'appelle"],
            ["nous nous levons", "nous nous appelons"],
            ["vous vous levez", "vous vous appelez"],
            ["ils se lèvent", "ils s'appellent"],
          ],
        },
        {
          kind: "examples",
          items: [
            { fr: "Je **me couche** tard.", zh: "我睡得晚。se coucher" },
            { fr: "Je **ne me lève pas** tôt.", zh: "我起得不早。ne 放在代词前面" },
            { fr: "Elle **s'est levée** à sept heures.", zh: "她七点起的床。复合过去时用 être" },
          ],
        },
      ],
    },
    {
      title: "8. 其他时态都从现在时“长”出来",
      blocks: [
        {
          kind: "p",
          text: "学会现在时，别的时态大多能照公式推出来：",
        },
        {
          kind: "table",
          head: ["时态", "公式", "例子"],
          rows: [
            [
              "未完成过去时",
              "nous 形式去掉 -ons，加 -ais、-ais、-ait、-ions、-iez、-aient",
              "[[nous finissons]] → [[je finissais]]",
            ],
            [
              "简单将来时",
              "原形（-re 去 e）加 -ai、-as、-a、-ons、-ez、-ont",
              "[[je parlerai]]、[[je prendrai]]",
            ],
            ["条件式", "将来时的词干 + 未完成过去时的词尾", "[[je parlerais]]、[[je voudrais]]"],
            [
              "虚拟式",
              "ils 形式去掉 -ent，加 -e、-es、-e、-ions、-iez、-ent",
              "[[ils finissent]] → [[que je finisse]]",
            ],
          ],
        },
        {
          kind: "p",
          text: "将来时和条件式的不规则词干要单独记，好在两个时态共用：",
        },
        {
          kind: "table",
          head: ["原形", "词干", "原形", "词干"],
          fr: [0, 1, 2, 3],
          rows: [
            ["être", "ser-", "avoir", "aur-"],
            ["aller", "ir-", "faire", "fer-"],
            ["venir", "viendr-", "voir", "verr-"],
            ["pouvoir", "pourr-", "vouloir", "voudr-"],
            ["devoir", "devr-", "savoir", "saur-"],
          ],
        },
        {
          kind: "tip",
          text: "这些不规则词干**全都以 r 结尾**，这是认出将来时和条件式的最快办法：听到动词里多了个 r 音，就是在说“将会”或“要是……就”。",
        },
      ],
    },
  ],
};

export default sheet;
