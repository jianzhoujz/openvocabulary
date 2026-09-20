# PTE Core 核心词表（目标 CLB 9）

针对 **PTE Core**（不是 PTE Academic）设计。PTE Core 考的是职场与社区日常英语，
所以这份表里**没有**学术论文、实验方法、学科术语那类 PTE Academic 词汇，
取而代之的是邮件功能语块、生活场景词、加拿大制度词、短语动词和发音陷阱。

**1266 条**，覆盖 CLB 9 所需的 B2–C1 区间。

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

有 17 条词在两个模块里各出现一次，是**刻意的交叉收录**——同一个词在不同模块承担不同训练目的。
比如 `receipt` 在 `MONEY` 是消费场景词，在 `ASQ` 是"什么东西能证明你付过钱"的常识问答，
在 `RA` 是"p 不发音"的朗读陷阱；`schedule` 在 `DICT` 是拼写，在 `RA` 是英美双读音。
每条的 `note` 和 `example` 都不同。

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

### 题型专用模块（339 条）

| 模块 | 条数 | 直接影响的题型 | 为什么必须背 |
|---|---|---|---|
| `EMAIL` | 59 | Write Email | 这题评分含 email conventions / organization / vocabulary 三项，全靠现成语块撑 |
| `RTS` | 45 | Respond to a Situation | 评分只看 appropriacy / fluency / pronunciation。语块背熟才能 40 秒不卡壳 |
| `DI` | 37 | Describe Image | 报图型 + 趋势词 + 极值 + 收尾句，是 content 分的直接来源 |
| `SUM` | 28 | Summarize Written/Spoken Text | 25–50 词压缩成一句，靠转述动词和让步结构 |
| `ASQ` | 40 | Answer Short Question | 只考常识词，会就是会，不会就丢分。性价比极高 |
| `RA` | 60 | Read Aloud、Repeat Sentence | 重音位置、静音字母、-ed 读法、弱读与意群停顿。直接决定 pronunciation 和 oral fluency 两个子分 |
| `DICT` | 40 | Write from Dictation | 这一题同时算听力和写作分，拼错直接扣 |
| `SPELL` | 10 | 写作全部 | 加拿大拼写规范，全篇必须统一 |
| `CONFUSE` | 20 | 写作、阅读填空 | 中国考生的固定失分点 |

### 语言能力模块（192 条）

| 模块 | 条数 | 作用 |
|---|---|---|
| `PHRV` | 40 | 高频短语动词。PTE Core 是生活职场英语，短语动词密度远高于学术英语 |
| `COLLOC` | 40 | 高频搭配。决定 vocabulary 子分能否从 80 推到 88 |
| `ABSTR` | 112 | CLB 8–9 的抽象与议论词汇（程度、因果、趋势、态度、制度、数据论证）。这是"天花板词汇"，决定你能不能在听力阅读里不卡壳、在写作里不降级表达 |

### 主题模块（735 条）

覆盖 PTE Core 的全部题材范围，按重要性排序：

| 模块 | 条数 | 内容 |
|---|---|---|
| `WORK` | 137 | 求职、雇佣条款、日常职场、会议项目、绩效、职场问题、工作模式、行业岗位、办公设备、客户销售、培训安全、团队协作、劳动法规 |
| `MONEY` | 80 | 银行、税务、账单消费、保险、社保福利、工资单、购物零售、房贷债务、退休理财、消费者保护 |
| `HOME` | 80 | 租房、维修、购房、社区、房屋结构、家务、租房流程、社区设施 |
| `HEALTH` | 75 | 就医、症状、健康生活、科室人员、检查治疗、急救突发、照护人群、加拿大医疗制度 |
| `CIVIC` | 68 | 三级政府、公共服务、移民流程、社会议题 |
| `TRAVEL` | 61 | 公共交通、驾车、出行、路况天气、机场航班、住宿旅游、通勤 |
| `EDU` | 61 | 加拿大学制、课程学习、资助费用、成人培训、教育议题 |
| `TECH` | 59 | 设备故障、网络账户、数据隐私、媒体信息、AI 与就业 |
| `SERVICE` | 58 | 预约服务、维修安装、订阅账户、投诉升级、客服话术 |
| `ENV` | 56 | 日常环保、气候影响、自然资源、社区行动 |

## 建议的背诵顺序

不要从头背到尾。按这个顺序，前四步做完写作和口语就能明显提分：

1. **`EMAIL` + `RTS`**（104 条）——先背这两块。直接决定两道主观题的分数，
   而且是纯套路，一周能吃下。背到能默写，不是能认出来。
2. **`DI` + `SUM`**（65 条）——再吃掉剩下两道主观题的模板语言。
3. **`RA`**（60 条）——口语四道题的发音与节奏基础。这块不解决，
   Read Aloud 和 Repeat Sentence 的 pronunciation 子分会一直压着总分。
4. **`DICT` + `SPELL` + `CONFUSE`**（70 条）——拼写是白送的分，
   Write from Dictation 一题同时算两个维度。
5. **`ASQ`**（40 条）——一晚上能过完，考场上直接兑现。
6. **`PHRV` + `COLLOC`**（80 条）——把 vocabulary 子分从 80 推到 88。
7. **`ABSTR`**（112 条）——冲 CLB 9 的关键一块。到这一步前四项大概在 CLB 8，
   这 112 条负责把听力阅读的理解上限和写作的表达上限一起抬起来。
8. **主题模块**（735 条）——`WORK` / `MONEY` / `HOME` / `HEALTH` 先背（372 条），
   这四块占 PTE Core 题材的绝大部分；`CIVIC` / `TRAVEL` / `EDU` / `TECH` / `SERVICE` / `ENV` 后补。

## 用法要点

- `note` 列不是可选补充，是这份表的核心。很多条目的坑在搭配和语域上
  （用错 register 会直接扣 Write Email 的 appropriacy），单看中文释义没用。
- 标 `chunk` 的条目要**整条背下来**，不要拆开记单词。PTE 的 AI 评分吃的就是完整语块。
- `RA` 模块的 `note` 列用大写标重音（如 `deVELop`、`COMfortable`），
  朗读时按标注的音节重读。
- 加拿大拼写（`SPELL` 模块）全篇必须统一。`colour` 和 `color` 混用会被判不一致。
