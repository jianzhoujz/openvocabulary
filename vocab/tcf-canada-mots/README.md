# TCF Canada 单词表

针对 **TCF Canada** 的纯单词部分，不是通用法语词表。
三语对照：`français` → `English` → `中文`。

**435 条**，词汇难度刻意控制在 **B2 区间**（对应 NCLC 7），不堆 C1 词。

这是原 `tcf-canada` 总表拆出来的两半之一。拆分规则很机械：
**去掉冠词后只剩一个词的条目在这里**（`le courriel`、`démissionner`、`Or`、
`-tion` 词尾规则都算）；两个词及以上的复合词、搭配、整句全在隔壁
[`tcf-canada-phrases`](../tcf-canada-phrases/) 短语表。
`la résidence permanente`、`faire du bénévolat` 这类词典里的复合词也算多词，
所以在短语表，不在这里——找词时先想清楚它是几个词。

三个刻意的取舍：

1. **名词一律带冠词**（`le loyer` / `la caution`），背裸词等于没背。
2. **语法基本功在这里**：`CONJUG` 的 25 个核心不规则动词原形、
   `GENRE` 的词尾规则与易错词、`PIEGES` 的假朋友单词。
   中文标题的语法规则（如"虚拟式触发词"）和多词的时态表达在短语表。
3. **加拿大与魁北克用词单列**（`CANADA`，36 条），`courriel`、`cégep`、
   `dépanneur` 这些和法国法语不一样的地方，用法国教材是背不到的。

只有 `le préavis` 一条在两个模块各出现一次：在 `TRAVAIL` 指劳动合同的离职通知期，
在 `COCE` 指规章要求的提前告知期，词同义不同。两条都在本表。

## 文件

| 文件 | 用途 |
|---|---|
| `_src.psv` | 唯一数据源，`\|` 分隔。要增删词条改这个文件 |
| `tcf-canada-mots-vocab.tsv` | 制表符分隔，直接导入 Anki / Excel |
| `tcf-canada-mots-vocab.md` | 按模块分组的阅读版 |

改完 `_src.psv` 后在仓库根目录跑 `bash vocab/tools/build.sh`，再跑 `vp run build:data` 同步到网页。

字段顺序：`section / theme / fr / pos / en / zh / note / exemple`

## 分数目标

TCF Canada 各项对应 NCLC 的大致区间（**换算标准会调整，用之前请核对考试官方说明**）：

| NCLC | Compréhension orale (0–699) | Compréhension écrite (0–699) | Expression écrite (0–20) | Expression orale (0–20) |
|---|---|---|---|---|
| 10 | 549+ | 549+ | 16–20 | 16–20 |
| 9 | 523–548 | 524–548 | 14–15 | 14–15 |
| 8 | 503–522 | 499–523 | 12–13 | 12–13 |
| 7 | 458–502 | 453–498 | 10–11 | 10–11 |

**四项全部 NCLC 7 是硬门槛**——四项都要达标，一项不到整体就作废。
先保四项到 7，再考虑单项冲高。

## 模块构成

### 语法基本功（83 条）

| 模块 | 条数 | 内容 |
|---|---|---|
| `GENRE` | 47 | 阴阳性词尾规则（`-tion` `-té` `-ure` 全阴性、`-ment` `-age` `-eau` 全阳性）、易错词、同形异性词、复数陷阱里的单词 |
| `CONJUG` | 29 | 25 个核心不规则动词原形（`être` 到 `vivre`），另加 `imparfait`、`plus-que-parfait`、`en / y`、`on` 四个单点 |
| `PIEGES` | 7 | 假朋友单词（`actuellement`、`sensible`、`la librairie`……，全是和英语长得像意思不一样的坑） |
| `COCE` | 3 | 公告文件体里的单词（`le préavis`、`le formulaire`、`le renouvellement`） |

### 功能模块里的单词（6 条）

| 模块 | 条数 | 内容 |
|---|---|---|
| `ARGU` | 4 | 论证里的单个词（`dénonce`、`Or`、`Toutefois / Néanmoins`、`entraîner / provoquer`） |
| `EE` | 2 | `Cordialement`、`Finalement` |

### 主题词汇（346 条）

| 模块 | 条数 | 内容 |
|---|---|---|
| `ABSTRAIT` | 70 | B2 抽象与议论词汇里的单词：程度、可行价值、因果、趋势、观点、社会制度、数据、人与行为 |
| `CANADA` | 36 | 加法用词差异、机构缩写、社会福利、冬季生活、文化生活里的单词 |
| `LOGEMENT` | 35 | 租房、维修、购房、邻里、社会议题里的单词 |
| `TRAVAIL` | 31 | 求职、雇佣条款、日常职场、职场问题里的单词 |
| `SANTE` | 27 | 就医、症状、健康生活里的单词 |
| `TRANSPORT` | 25 | 公共交通、驾车、出行里的单词 |
| `NUMERIQUE` | 21 | 数字生活与媒体里的单词 |
| `EDUCATION` | 20 | 魁北克学制、课程学习、资助费用里的单词 |
| `QUOTIDIEN` | 19 | 购物、餐饮、天气、休闲里的单词 |
| `SOCIETE` | 19 | 政治制度、社会议题、家庭关系里的单词 |
| `ARGENT` | 16 | 银行、消费、保险里的单词 |
| `ENVIRO` | 15 | 环境与可持续发展里的单词 |
| `VERBES` | 9 | 不带介词的高频动词（`constater`、`signaler`、`renseigner`……，带 `de / à` 的搭配在短语表） |

## 建议的背诵顺序

1. **`GENRE` 词尾规则**（16 条）——背规则比背单个词高效，
   `-tion` `-té` `-ure` `-ance` 全阴性、`-ment` `-age` `-eau` `-isme` 全阳性，
   几条就覆盖法语大部分抽象名词。
2. **`CONJUG` 动词原形**（25 条）——先认得这些脸，后面变位和时态才有地方挂。
3. **`CANADA`**（36 条）——听力和阅读的理解障碍主要来自这里。
4. **`ABSTRAIT`**（70 条）——把 Tâche 3 的表达从"能说清楚"推到"说得有分量"，
   同时抬高 CE 新闻类文本的理解上限。
5. **主题模块**——`TRAVAIL` / `LOGEMENT` / `SANTE` / `ARGENT` 优先，
   这四块覆盖 TCF Canada 绝大部分题材；其余按 `QUOTIDIEN` → `SOCIETE` → `TRANSPORT`
   → `EDUCATION` → `NUMERIQUE` → `ENVIRO` 的顺序补。

## 用法要点

- `note` 列标了大量**加法差异**和**语法触发条件**。这一列比中文释义重要得多。
- `GENRE` 模块前 16 条是**词尾规则**，背规则不背词。
- 背单词的同时建议同步背短语表（`EO1` → `EO2` → `ARGU` → `EE`），
  NCLC 7 的瓶颈是 Expression écrite 和 orale 的整句产出，不是词汇量。
