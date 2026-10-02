import type { Sheet } from "@/cheatsheets/types";

const sheet: Sheet = {
  id: "prepositions",
  title: "介词",
  summary: "à、de、en、chez……怎么念、怎么选",
  lead: "中文一个“在”、一个“去”就够了，法语还要看后面是城市还是国家、是人还是地方；介词又短、常常轻读，还爱和冠词粘在一起，是听力里**最容易糊过去**的小词。这一页先讲最核心的 à 和 de，再按地点、交通、时间、动词搭配过一遍，最后讲听的时候怎么认出它们。每个介词都附了大致对应的英语：**对得上的直接借用英语的感觉，对不上的单独提醒**。音标看个大概就行，点一下就出声，**听比看准**。",
  sections: [
    {
      title: "1. à 和 de：最核心的两个",
      blocks: [
        {
          kind: "p",
          text: "法语里出现最多的两个介词，读音都很短：[[à]] 读 /a/，[[de]] 读 /də/。意思很多，大致这样分：**à 管“到哪、在哪、几点”，de 管“从哪来、谁的、装着什么”。**",
        },
        {
          kind: "table",
          head: ["à 的用法", "例子", "英语"],
          rows: [
            ["去某地", "[[Je vais à Montréal.]] 我去蒙特利尔。", "to：go to Montreal"],
            ["在某地", "[[J'habite à Québec.]] 我住在魁北克市。", "in：live in Quebec City"],
            ["时间点", "[[à 8 h|à huit heures]] 八点", "at：at 8"],
            ["给某人、对某人", "[[Je parle à Marie.]] 我跟玛丽说话。", "to：talk to Marie"],
            ["用途", "[[une tasse à café]] 咖啡杯", "不用介词：a coffee cup"],
            ["方式", "[[à pied]] 步行", "on：on foot"],
          ],
        },
        {
          kind: "table",
          head: ["de 的用法", "例子", "英语"],
          rows: [
            ["从某地来", "[[Je viens de Chine.]] 我来自中国。", "from：from China"],
            ["谁的", "[[le livre de Paul]] 保罗的书", "'s / of：Paul's book"],
            ["装着什么", "[[une tasse de café]] 一杯咖啡", "of：a cup of coffee"],
            ["数量", "[[beaucoup de gens]] 很多人", "of：a lot of people"],
            ["关于", "[[parler de son travail]] 谈自己的工作", "about：talk about work"],
            [
              "从……到……",
              "[[de 9 h à 17 h|de neuf heures à dix-sept heures]] 早上九点到下午五点",
              "from … to：from 9 to 5",
            ],
          ],
        },
        {
          kind: "tip",
          text: "粗略记：**à ≈ to / at，de ≈ from / of / 's**。但别一一硬套：英语“在某城市”用 in（in Montreal），法语用 à；英语的 's 放在前面（Paul's book），法语倒过来，相当于 the book of Paul。",
        },
        {
          kind: "tip",
          text: "[[une tasse à café]] 和 [[une tasse de café]] 正好看出区别：à 说的是杯子**拿来装什么**（咖啡杯，可以是空的），de 说的是杯里**现在装着什么**（一杯咖啡）。",
        },
        {
          kind: "tip",
          text: "de 碰到元音开头的词缩写成 d'，只读一个 /d/：[[d'accord]] 好的，[[d'Iran]] 从伊朗。à 不缩写，后面跟元音也分开读：[[à une heure]] 一点钟。",
        },
      ],
    },
    {
      title: "2. 碰上 le、les 必须“合体”",
      blocks: [
        {
          kind: "p",
          text: "à、de 后面紧跟定冠词 le 或 les 时，**必须**粘成一个词，读音也跟着变，写成 à le、de les 是错的。这几个音在听力里极多，认不出来就整句听不懂：",
        },
        {
          kind: "table",
          head: ["合体", "本来是", "英语", "例子"],
          rows: [
            [
              "[[au]] /o/",
              "à + le",
              "to / at the",
              "[[au Canada]] 在加拿大；[[au bureau]] 在办公室",
            ],
            ["[[aux]] /o/", "à + les", "to / at the", "[[aux États-Unis]] 在美国"],
            [
              "[[du]] /dy/",
              "de + le",
              "from / of the",
              "[[du Japon]] 从日本；[[le prix du café]] 咖啡的价格",
            ],
            ["[[des]] /de/", "de + les", "from / of the", "[[des États-Unis]] 从美国"],
          ],
        },
        {
          kind: "tip",
          text: "**只管 le 和 les。**la 和 l' 不合体：[[à la gare]] 在火车站，[[de l'école]] 从学校。地名里的 Le 照样合体：[[au Havre]] 在勒阿弗尔，[[du Caire]] 从开罗。",
        },
        {
          kind: "p",
          text: "**le、les 当代词时不合体。**看后面跟什么：跟名词是冠词，必须合体；跟动词是代词（“它”“他们”），不合体：",
        },
        {
          kind: "examples",
          items: [
            { fr: "Je parle **au** professeur.", zh: "我跟老师说话。（le 是冠词，要合体）" },
            { fr: "Je commence **à le** comprendre.", zh: "我开始明白它了。（le 是代词，不合体）" },
            { fr: "J'ai décidé **de les** inviter.", zh: "我决定邀请他们。（les 是代词，不合体）" },
          ],
        },
        {
          kind: "tip",
          text: "两个容易混的地方：de 后面再碰上复数冠词 des，只留一个 de，[[J'ai besoin de livres.]] 我需要几本书。另外 [[du]]、[[des]] 也当冠词用，[[du café]] 一点咖啡，[[des amis]] 一些朋友，写法读音都一样，意思看上下文（见「冠词」那一页）。",
        },
      ],
    },
    {
      title: "3. 另外十个常用介词",
      blocks: [
        {
          kind: "table",
          head: ["介词", "意思", "英语", "例子"],
          rows: [
            [
              "[[en]] /ɑ̃/",
              "在……里；坐（交通）；月份",
              "in / by",
              "[[en France]] 在法国；[[en voiture]] 坐车；[[en juin]] 在六月",
            ],
            [
              "[[dans]] /dɑ̃/",
              "在……里面；……之后",
              "in / inside",
              "[[dans la boîte]] 在盒子里；[[dans deux jours]] 两天后",
            ],
            [
              "[[sur]] /syʁ/",
              "在……上；关于",
              "on / about",
              "[[sur la table]] 在桌上；[[sur Internet]] 在网上",
            ],
            ["[[sous]] /su/", "在……下面", "under", "[[sous la table]] 在桌子底下"],
            [
              "[[avec]] /avɛk/",
              "和……一起；用（工具）",
              "with",
              "[[avec moi]] 和我一起；[[avec un crayon]] 用铅笔",
            ],
            [
              "[[sans]] /sɑ̃/",
              "没有、不带",
              "without",
              "[[sans sucre]] 不加糖；[[sans lui]] 没有他",
            ],
            [
              "[[pour]] /puʁ/",
              "为了、给；为期",
              "for",
              "[[pour toi]] 给你；[[pour deux jours]] 为期两天",
            ],
            [
              "[[par]] /paʁ/",
              "通过（方式）；被",
              "by / through",
              "[[par courriel]] 通过电子邮件；[[par exemple]] 比如",
            ],
            [
              "[[chez]] /ʃe/",
              "在、去某人那儿",
              "at / to someone's",
              "[[chez moi]] 在我家；[[chez le médecin]] 在医生那儿",
            ],
            [
              "[[entre]] /ɑ̃tʁ/",
              "在……之间",
              "between / among",
              "[[entre nous]] 我们之间；[[entre deux cours]] 两节课之间",
            ],
          ],
        },
        {
          kind: "tip",
          text: "[[en]]、[[dans]]、[[sans]] 是**同一个鼻音 /ɑ̃/**，区别只在开头：一个没有辅音，一个带 d，一个带 s。听的时候先抓住这个鼻音，再看前后文。",
        },
        {
          kind: "tip",
          text: "[[chez]] 后面接**人**，[[à]] 后面接**地方**：去看医生说 [[chez le médecin]]，去医院说 [[à l'hôpital]]。英语的 **at the doctor's、at my place** 正好就是 chez：[[chez le médecin]]、[[chez moi]]。",
        },
        {
          kind: "tip",
          text: "英语一个 **in**，法语分成 en 和 dans：[[en]] 后面一般**不带冠词**，说的是笼统的状态或范围（[[en France]]、[[en classe]]）；[[dans]] 后面**带冠词**，说的是具体的某个空间（[[dans la boîte]]、[[dans la classe]] 在那间教室里）。",
        },
        {
          kind: "tip",
          text: "en 还有一批固定说法，整个记：[[en ville]] 在城里，[[en classe]] 在课上，[[en vacances]] 在度假。",
        },
      ],
    },
    {
      title: "4. 城市和国家",
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
            ["城市（蒙特利尔）", "à Montréal", "de Montréal"],
            ["阴性国家（法国）", "en France", "de France"],
            ["元音开头的国家（伊朗）", "en Iran", "d'Iran"],
            ["阳性国家（加拿大）", "au Canada", "du Canada"],
            ["复数国家（美国）", "aux États-Unis", "des États-Unis"],
          ],
        },
        {
          kind: "tip",
          text: "怎么判断阴阳性：**以 -e 结尾的国家大多是阴性**（[[la Chine]] 中国、[[la France]] 法国、[[la Belgique]] 比利时），其余多是阳性（[[le Canada]] 加拿大、[[le Japon]] 日本）。例外要记：[[le Mexique]] 墨西哥、[[le Cambodge]] 柬埔寨。",
        },
        {
          kind: "examples",
          items: [
            { fr: "J'habite **à** Montréal, **au** Canada.", zh: "我住在加拿大蒙特利尔。" },
            { fr: "Je vais **en** Chine cet été.", zh: "我今年夏天回中国。" },
            { fr: "Il vient **du** Japon.", zh: "他是从日本来的。" },
          ],
        },
        {
          kind: "tip",
          text: "英语不管城市还是国家、阴性还是阳性，一律 **in / to / from**：in Montreal、to France、from Canada。另外英语国名大多不带冠词（Canada），法语带（[[le Canada]]），所以才会和 à、de 合体成 au、du。",
        },
      ],
    },
    {
      title: "5. 坐车还是走路",
      blocks: [
        {
          kind: "table",
          head: ["en：坐在里面", "à：骑在上面或走路"],
          rows: [
            ["[[en voiture]] 坐汽车", "[[à pied]] 走路"],
            ["[[en autobus]] 坐公交", "[[à vélo]] 骑自行车"],
            ["[[en train]] 坐火车", "[[à moto]] 骑摩托"],
            ["[[en avion]] 坐飞机", "[[à cheval]] 骑马"],
            ["[[en métro]] 坐地铁", ""],
          ],
        },
        {
          kind: "tip",
          text: "英语不分坐在里面还是骑在上面，都用 **by**：by car、by bus、by bike。法语要分开，可以借英语的 **in the car / on the bike** 来记：en 像 in，à 像 on。走路两边都特殊：on foot = [[à pied]]。",
        },
        {
          kind: "tip",
          text: "魁北克说 [[en autobus]]（法国说 en bus），口语也常说 [[en auto]] 开车、坐车。",
        },
      ],
    },
    {
      title: "6. 位置和方向",
      blocks: [
        {
          kind: "table",
          head: ["介词", "意思", "英语", "例子"],
          rows: [
            ["[[devant]] /dəvɑ̃/", "在……前面", "in front of", "[[devant la maison]] 在房子前面"],
            ["[[derrière]] /dɛʁjɛʁ/", "在……后面", "behind", "[[derrière la porte]] 在门后"],
            [
              "[[à gauche de]] /a ɡoʃ də/",
              "在……左边",
              "to the left of",
              "[[à gauche de l'église]] 在教堂左边",
            ],
            [
              "[[à droite de]] /a dʁwat də/",
              "在……右边",
              "to the right of",
              "[[à droite du dépanneur]] 在小卖部右边",
            ],
            ["[[à côté de]] /a kote də/", "在……旁边", "next to", "[[à côté du parc]] 在公园旁边"],
            [
              "[[en face de]] /ɑ̃ fas də/",
              "在……对面",
              "across from",
              "[[en face de la banque]] 在银行对面",
            ],
            [
              "[[au milieu de]] /o miljø də/",
              "在……中间",
              "in the middle of",
              "[[au milieu de la salle]] 在房间中间",
            ],
            ["[[près de]] /pʁɛ də/", "离……近", "near", "[[près de chez moi]] 离我家近"],
            ["[[loin de]] /lwɛ̃ də/", "离……远", "far from", "[[loin du centre-ville]] 离市中心远"],
            ["[[contre]] /kɔ̃tʁ/", "靠着；反对", "against", "[[contre le mur]] 靠着墙"],
            [
              "[[vers]] /vɛʁ/",
              "朝、往；大约（时间）",
              "toward / around",
              "[[vers la sortie]] 朝出口；[[vers 8 h|vers huit heures]] 八点左右",
            ],
            [
              "[[jusqu'à]] /ʒyska/",
              "直到",
              "up to / until",
              "[[jusqu'au coin de la rue]] 一直到街角",
            ],
          ],
        },
        {
          kind: "tip",
          text: "和英语对着看，带不带 de 常常对不上：英语 **near** 后面直接跟名词，法语要说 [[près de]]；英语 **in front of** 带 of，法语 [[devant]] 反而什么都不带。",
        },
        {
          kind: "tip",
          text: "带 de、à 的这几个碰上 le、les 照样合体，上表就有 [[à côté du parc]]、[[loin du centre-ville]]、[[jusqu'au coin de la rue]]；复数是 [[près des magasins]] 离商店近。[[dépanneur]] 是魁北克的街角小卖部，法国说 épicerie。",
        },
      ],
    },
    {
      title: "7. 时间",
      blocks: [
        {
          kind: "table",
          head: ["说法", "意思", "英语", "例子"],
          rows: [
            ["[[à]]", "几点", "at", "[[à 8 h|à huit heures]] 八点"],
            [
              "[[en]]",
              "月份、年份、季节",
              "in",
              "[[en juin]] 六月；[[en 2027|en deux mille vingt-sept]] 2027 年；[[en été]] 夏天",
            ],
            ["[[au]]", "只有春天用 au", "in", "[[au printemps]] 春天"],
            [
              "[[le]]",
              "星期几、日期（不用介词）",
              "on",
              "[[le lundi]] 每周一；[[le 3 mai]] 五月三日",
            ],
            ["[[avant]] /avɑ̃/", "在……之前", "before", "[[avant midi]] 中午之前"],
            [
              "[[après]] /apʁɛ/",
              "在……之后",
              "after",
              "[[après le dîner]] 午饭后（魁北克 dîner 是午饭，法国指晚饭）",
            ],
            [
              "[[pendant]] /pɑ̃dɑ̃/",
              "在……期间；持续多久",
              "during / for",
              "[[pendant deux heures]] 持续两个小时",
            ],
            [
              "[[depuis]] /dəpɥi/",
              "自从（到现在还在继续）",
              "since / for",
              "[[depuis trois ans]] 三年来",
            ],
            [
              "[[il y a]] /il ja/",
              "……以前（固定短语，用法像介词）",
              "ago（法语放前面）",
              "[[il y a deux jours]] 两天前",
            ],
            ["[[dans]] /dɑ̃/", "……以后（从现在算）", "in", "[[dans une semaine]] 一周后"],
            ["[[en]] /ɑ̃/", "用多长时间完成", "in / within", "[[en dix minutes]] 十分钟内（做完）"],
          ],
        },
        {
          kind: "tip",
          text: "[[en dix minutes]] 是用十分钟**做完**，[[dans dix minutes]] 是十分钟**以后**才开始。英语两个都说 **in ten minutes**，法语必须分清。",
        },
        {
          kind: "tip",
          text: "英语一个 **for** 管时长，法语分三种：实际持续了多久用 [[pendant]]（[[pendant deux heures]]），计划好的期限用 [[pour]]（[[pour deux jours]]），到现在还在继续的用 [[depuis]]。",
        },
        {
          kind: "tip",
          text: "[[depuis]] 表示“到现在还在继续”，动词用**现在时**：[[J'habite ici depuis trois ans.]] 我在这儿住了三年（现在还住）。英语这里用现在完成时 I have lived here for three years，照搬英语或中文的“了”都容易误用过去时。",
        },
        {
          kind: "tip",
          text: "[[le lundi]] 是“每周一”，[[lundi]] 不带冠词是“这周一”：[[Je travaille le lundi.]] 我每周一上班。[[Je pars lundi.]] 我这周一走。",
        },
      ],
    },
    {
      title: "8. 动词定死了用 à 还是 de",
      blocks: [
        {
          kind: "p",
          text: "动词后面接名词或另一个动词时，用不用介词、用哪个，很多时候不看意思，而是**动词定死的**，只能跟着动词一起记：",
        },
        {
          kind: "table",
          head: ["直接跟原形", "+ à", "+ de"],
          rows: [
            [
              "[[aimer]] 喜欢 like",
              "[[commencer à]] 开始 start to",
              "[[finir de]] 做完 finish -ing",
            ],
            [
              "[[vouloir]] 想要 want to",
              "[[apprendre à]] 学 learn to",
              "[[essayer de]] 试着 try to",
            ],
            ["[[pouvoir]] 能 can", "[[aider à]] 帮着 help", "[[oublier de]] 忘了 forget to"],
            [
              "[[devoir]] 必须 must",
              "[[réussir à]] 成功做到 manage to",
              "[[décider de]] 决定 decide to",
            ],
            [
              "[[aller]] 去（做）be going to",
              "[[continuer à]] 继续 keep -ing",
              "[[arrêter de]] 停止 stop -ing",
            ],
            [
              "[[préférer]] 更喜欢 prefer",
              "[[penser à]] 想着 think about",
              "[[parler de]] 谈论 talk about",
            ],
            ["", "", "[[avoir besoin de]] 需要 need"],
          ],
        },
        {
          kind: "examples",
          items: [
            { fr: "J'aime lire.", zh: "我喜欢看书。（aimer 直接跟原形）" },
            { fr: "J'apprends **à** nager.", zh: "我在学游泳。" },
            { fr: "Je pense **à** toi.", zh: "我想着你。" },
            { fr: "J'ai oublié **de** fermer la porte.", zh: "我忘了关门。" },
            { fr: "J'ai besoin **d'**aide.", zh: "我需要帮忙。" },
            {
              fr: "Il joue **au** hockey. / Il joue **du** piano.",
              zh: "他打冰球。/ 他弹钢琴。（玩运动用 jouer à，奏乐器用 jouer de）",
            },
          ],
        },
        {
          kind: "tip",
          text: "**别拿英语的 to 去猜。**英语 try to、forget to、decide to 都是 to，法语偏偏用 de；英语 need、play 后面不带介词，法语要说 [[avoir besoin de]]、[[jouer au hockey]]、[[jouer du piano]]。",
        },
        {
          kind: "tip",
          text: "背这类动词时**把介词一起背**：直接记 [[avoir besoin de]]，不要只记 avoir besoin。",
        },
      ],
    },
    {
      title: "9. 听力里为什么听不出介词",
      blocks: [
        {
          kind: "tip",
          text: "**de 常常轻到听不见。**说快了只剩一个 /d/：[[pas de problème]]（没问题）听着像 /pa d pʁɔblɛm/。句中一个很轻的“的”音，多半就是 de。",
        },
        {
          kind: "tip",
          text: "**au 和 du 要当熟词听。**[[au]] 读 /o/，和 [[haut]]（高）同音；[[du]] 读 /dy/，加拿大读音里 d 还要“咬”成近似 dz（见「发音规则」）。句子中间冒出一个 /o/ 或 /dy/，往往就是 à + le 和 de + le。",
        },
        {
          kind: "p",
          text: "**介词后面接元音开头的词要联诵**，连起来读成一个音节。耳朵里会多出一个 z、n 的音，那不是生词，就是介词带来的：",
        },
        {
          kind: "table",
          head: ["连起来写", "实际读作", "意思"],
          rows: [
            ["[[chez‿eux|chez eux]]", "/ʃe.zø/", "在他们家"],
            ["[[dans‿un|dans un]]", "/dɑ̃.zœ̃/", "在一个……里"],
            ["[[sans‿argent|sans argent]]", "/sɑ̃.zaʁ.ʒɑ̃/", "没有钱"],
            ["[[en‿avion|en avion]]", "/ɑ̃.na.vjɔ̃/", "坐飞机"],
          ],
        },
        {
          kind: "tip",
          text: "[[avec elle]]（和她一起）听着也像 /a.vɛ.kɛl/，但这不是联诵：avec 的 c 本来就读，只是顺势和后面的元音连成一个音节。",
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
