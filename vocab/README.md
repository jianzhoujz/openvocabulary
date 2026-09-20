# openvocabulary 词表

针对 PTE Core 与 TCF Canada 两门语言考试的词表。不是通用词汇书——每一条都绑定具体考试的具体题型。

仓库根目录是基于这两份词表的背单词网页，见 [根 README](../README.md)。

| 词表 | 考试 | 目标 | 条目数 | 对照语言 |
|---|---|---|---|---|
| [`pte-core/`](pte-core/) | PTE Core（英语） | CLB 9 | 1266 | 英 → 中 |
| [`tcf-canada/`](tcf-canada/) | TCF Canada（法语） | NCLC 7+ | 1113 | 法 → 英 → 中 |

## 设计原则

**按题型组织，不按字母或词频。** 每个模块直接对应一个评分项。
背 `EMAIL` 模块提的是 Write Email 的分，背 `ARGU` 模块提的是 Tâche 3 的分。
每份词表的 README 里有模块 → 题型的完整对照表和建议顺序。

**功能语块优先于单词。** PTE Core 的 Write Email / Respond to a Situation，
TCF Canada 的 Expression écrite / orale，评分吃的是完整语块和语域是否得体，
不是生僻词。所以两份表里大量条目是整句而非单词，标记为 `chunk` / `expr.`，要整条背。

**避开学术词汇。** PTE Core 是职场与社区英语，不是 PTE Academic。
这里没有学术写作、实验方法、学科术语。

**加拿大语境单列。** 英语侧有加拿大拼写规范（`colour` / `centre` / `licence` / `cheque`）、
制度词（EI、CPP、SIN、hydro、bachelor apartment）；
法语侧有专门的魁北克用法模块（`courriel`、`dépanneur`、`cégep`、`déneigement`、
三餐名称的加法差异）。这部分用法国法语或通用英语教材是覆盖不到的。

**收录的不只是词。** 影响分数的不只是词汇量，所以两份表还包含：
英语侧的 `RA`（Read Aloud 的重音位置、静音字母、-ed 读法、弱读与意群停顿，60 条）；
法语侧的 `CONJUG`（核心动词全套变位、时态对立、虚拟式触发词，54 条）和
`GENRE`（阴阳性词尾规则与易错词，50 条）。
这些是 EE/EO 和口语题的固定扣分点，背再多单词也补不上。

**难度对齐目标等级。** 英语侧的抽象词按 CLB 9 所需的 B2–C1 收；
法语侧刻意压在 B2（NCLC 7），不堆 C1 词——背了考场用不到，反而挤占时间。

**每条都带用法要点。** `note` 列写的是搭配限制、语域、易错点、加法/加英差异、
语法触发条件。这一列比中文释义更重要——错的往往不是词义，是用法。

## 每个目录里有什么

```
<exam>/
  _src.psv                 数据源，| 分隔，唯一需要手动编辑的文件
  <exam>-vocab.tsv         制表符分隔，导入 Anki / Excel / Quizlet
  <exam>-vocab.md          按模块分组的阅读版，适合通读和打印
  README.md                分数对照表、模块与题型对照、建议背诵顺序
```

## 修改与重新生成

编辑 `_src.psv`，然后在**仓库根目录**跑：

```bash
bash vocab/tools/build.sh
```

`.tsv` 和 `.md` 都是生成产物，不要直接改。

## 说明

两份 README 里的分数对照表按公开资料整理，**换算标准会调整，用之前请到考试官方页面
核对一次**。

词表内容以考试题型和公开真题题材为依据整理，非官方发布的考纲词表。
