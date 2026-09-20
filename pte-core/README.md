# PTE Core 核心词表（目标 CLB 9）

针对 **PTE Core**（不是 PTE Academic）设计。PTE Core 考的是职场与社区日常英语，
所以这份表里**没有**学术论文、实验方法、学科术语那类 PTE Academic 词汇，
取而代之的是邮件功能语块、生活场景词、加拿大制度词和短语动词。

## 文件

| 文件 | 用途 |
|---|---|
| `_src.psv` | 唯一数据源，`\|` 分隔。要增删词条改这个文件 |
| `pte-core-vocab.tsv` | 制表符分隔，直接导入 Anki / Excel / Quizlet |
| `pte-core-vocab.md` | 按模块分组的阅读版，适合通读和打印 |

改完 `_src.psv` 后在项目根目录跑 `bash tools/build.sh` 重新生成后两个文件。

### 导入 Anki

字段顺序：`section / theme / term / pos / zh / note / example`

建议做成两种卡：

- **正面 term → 背面 zh + note + example**（认词，过一遍即可）
- **正面 zh + example 挖空 → 背面 term**（产出，EMAIL / RTS / COLLOC 三个模块必须做这种）

有 10 条词在两个模块里各出现一次，是**刻意的交叉收录**——同一个词在不同模块承担不同训练目的。
比如 `receipt` 在 `MONEY` 是消费场景词，在 `ASQ` 是"什么东西能证明你付过钱"的常识问答；
`accommodation` 在 `TRAVEL` 是主题词，在 `DICT` 是听写拼写陷阱；
`work out` 在 `HEALTH` 是"健身"，在 `PHRV` 是"解决/结果是"。两条的 `note` 和 `example` 都不同。

Anki 会按 term 字段提示重复，选 allow duplicates 即可。若要去重：

```bash
awk -F'\t' 'NR==1 || !seen[$3]++' pte-core-vocab.tsv > pte-core-vocab-unique.tsv
```

## 分数目标

PTE Core 各项对应 CLB 的大致区间（**请以 IRCC 官网 Language test equivalency charts 为准**）：

| CLB | 听 | 读 | 写 | 说 |
|---|---|---|---|---|
| 10 | 89–90 | 88–90 | 90 | 89–90 |
| 9 | 82–88 | 78–87 | 88–89 | 84–88 |
| 8 | 71–81 | 69–77 | 79–87 | 76–83 |
| 7 | 60–70 | 60–68 | 69–78 | 68–75 |

务实目标是**四项 CLB 9**（82 / 78 / 88 / 84）。写作 88 是瓶颈，CLB 10 要求写作满分 90，
只多十几分 CRS，不值得死磕。

## 模块 → 题型对照

| 模块 | 直接影响的题型 | 为什么必须背 |
|---|---|---|
| `EMAIL` | Write Email | 这题评分含 email conventions / organization / vocabulary 三项，全靠现成语块撑 |
| `RTS` | Respond to a Situation | 评分只看 appropriacy / fluency / pronunciation。语块背熟才能 40 秒不卡壳 |
| `DI` | Describe Image | 报图型 + 趋势词 + 极值 + 收尾句，是 content 分的直接来源 |
| `SUM` | Summarize Written Text、Summarize Spoken Text | 25–50 词压缩成一句，靠转述动词和让步结构 |
| `ASQ` | Answer Short Question | 只考常识词，会就是会，不会就丢分。性价比极高的一块 |
| `DICT` `SPELL` | Write from Dictation、Write Email | WfD 同时算听力和写作分，拼错直接扣 |
| `PHRV` `COLLOC` | 口语与写作全部主观题 | 决定 vocabulary 子分能否上 88 |
| `CONFUSE` | 写作、阅读填空 | 中国考生的固定失分点 |
| 主题模块 | 听力、阅读、以及所有输出题的内容 | 加拿大生活场景词，PTE Core 的题材范围就在这里 |

## 建议的背诵顺序

不要从头背到尾。按这个顺序，前三步做完写作和口语就能明显提分：

1. **`EMAIL` + `RTS`**（约 105 条）——先背这两块。它们直接决定两道主观题的分数，
   而且是纯套路，一周就能吃下。背到能默写，不是能认出来。
2. **`DI` + `SUM`**（约 65 条）——再吃掉剩下两道主观题的模板语言。
3. **`DICT` + `SPELL` + `CONFUSE`**（约 70 条）——拼写是白送的分，
   Write from Dictation 一题同时算两个维度。
4. **`ASQ`**（40 条）——一晚上能过完，考场上直接兑现。
5. **`PHRV` + `COLLOC`**（80 条）——把 vocabulary 子分从 80 推到 88。
6. **主题模块**（约 300 条）——WORK / HOME / HEALTH / MONEY 先背，
   这四块占 PTE Core 题材的绝大部分；TRAVEL / EDU / SERVICE / CIVIC / TECH / ENV 后补。

## 用法要点

- `note` 列不是可选补充，是这份表的核心。很多条目的坑在搭配和语域上
  （用错 register 会直接扣 Write Email 的 appropriacy），单看中文释义没用。
- 标 `chunk` 的条目要**整条背下来**，不要拆开记单词。PTE 的 AI 评分吃的就是完整语块。
- 加拿大拼写（`SPELL` 模块）全篇必须统一。`colour` 和 `color` 混用会被判不一致。
