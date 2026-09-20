# openvocabulary

> **如果你是 AI 或自动化代理，动手前请先阅读 [AGENTS.md](AGENTS.md)。**

针对 PTE Core 与 TCF Canada 两门语言考试的词表，以及配套的背单词网页。

|                    |                                                                                                                                                |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| [`vocab/`](vocab/) | 两份词表的数据源与生成产物。PTE Core 1266 条、TCF Canada 1113 条，按考试题型而非字母/词频组织。设计原则见 [`vocab/README.md`](vocab/README.md) |
| 本目录其余部分     | 背单词网页。纯前端，进度存浏览器 localStorage，无后端                                                                                          |

网页的用法：选词表 → 随机出词 → 可切换「看词猜义」/「看义猜词」→ 点开答案 → 自评 ✅/❌。
自评结果会改变该词之后出现的概率：没背过的权重最高，答错的次之，已掌握的最低。

```bash
vp install
vp dev
```

## 技术栈

| 项          | 选型                                              |
| ----------- | ------------------------------------------------- |
| 构建 / 任务 | Vite+（`vp`），含 Vite 8、Oxlint、Oxfmt、Vitest   |
| 语言        | TypeScript                                        |
| 框架        | React 19                                          |
| UI          | Tailwind CSS v4 + shadcn/ui（Radix + vaul）       |
| 状态        | zustand + persist                                 |
| 持久化      | localStorage（节流写入），支持导出/导入 JSON 备份 |
| 测试        | Vitest + happy-dom + Testing Library              |

## 常用命令

装依赖走 `vp add` / `vp install`，不要直接敲 `npm install`（原因见 [AGENTS.md](AGENTS.md)）。

```bash
vp dev              # 开发服务器
vp build            # 生产构建
vp preview          # 预览构建产物
vp check            # 格式 + lint + 类型检查，提交前跑这个
vp fmt              # Oxfmt，内建 Tailwind class 排序，无需额外插件
vp lint             # Oxlint（含 type-aware 规则与类型检查）
vp test             # Vitest（--run 跑一次不进 watch）
vp run build:data   # 从 vocab/*/_src.psv 重新生成 public/data/*.json
vp run build:icons  # 重新生成 public/icon-*.png 与 favicon.svg
vp run build:ipa    # 重新生成 vocab/tools/ipa-*.tsv（需联网）
```

## 目录结构

```
vocab/                     词表数据，唯一需要手动编辑的内容
  <exam>/_src.psv          数据源
  tools/build.sh           生成 .tsv 与 .md
  tools/ipa-*.tsv          音标查找表，生成物但可手工修正

scripts/build-data.ts      PSV → JSON 的数据管线
scripts/build-icons.ts     生成主屏幕图标与 favicon（纯算术绘制，无图像库）
scripts/build-ipa.ts       从 ipa-dict 生成音标查找表
public/data/               生成的词库 JSON，已提交，勿手改
src/
  types.ts                 共享类型
  store.ts                 zustand store，含持久化与抽词循环
  lib/
    scheduler.ts           抽词策略（纯函数，可单测）
    storage.ts             节流 localStorage、导出/导入
    utils.ts               cn()
  hooks/
    useTheme.ts            深浅色跟随系统 / 手动
    useAnswerKeys.ts       PC 键盘快捷键
    useSpeech.ts           朗读能力探测与调用
  components/
    DeckPicker.tsx         选词表页
    StudyView.tsx          背诵页骨架
    StudyCard.tsx          卡片正反面
    SectionFilter.tsx      模块筛选（底部抽屉）
    StatsDialog.tsx        进度、设置与备份
    InstallHint.tsx        iOS 添加到主屏幕指引
    ui/                    shadcn 组件，源码在仓库里，直接改
```

## 抽词策略

`src/lib/scheduler.ts`。Leitner 盒子 + 加权随机，不用 SM-2——SM-2 要求按日排复习队列，而这个应用的用法是「随时打开、随机出词、背多久算多久」。

```
权重 = 等级基础权重 × 时间加成 × 近错加成

等级基础权重   lv 0..5 → 10 / 6 / 3 / 1.5 / 0.7 / 0.2
时间加成       1 + min(距上次出现天数 / 3, 2)      最多 ×3
近错加成       上次答错 ×2

答对 lv +1（封顶 5）；答错 lv −2（保底 0），惩罚重于奖励
```

实际效果，以最熟的词为基准：没背过的约 50 倍，刚答错的约 100～300 倍。另有最近 15 张的防重复缓冲。

**新词节流**默认开启（20 张）：没背过的词按词表原始顺序只放前 20 个进池子，背熟一个补一个。不加这个限制的话，因为新词权重最高，前期抽到的几乎全是新词，上千条会一起涌上来。可在设置里调整或关闭。

所有系数集中在 `SCHEDULER` 常量里，背一阵子后可以按手感调。改完跑 `vp test` —— 策略有 23 条单测覆盖。

## 音标与朗读

**音标**只给能归约成单个词的条目——英语 533 条、法语 353 条。多词语块刻意不标：
逐词拼接出来的音标每个词都带主重音，法语还丢了联诵（`met en avant` 实际读
/mɛt‿ɑ̃navɑ̃/ 而不是 /ma ɑ̃ avɑ̃/），读着是错的，还会把 PTE 的 `RA` 模块
要练的弱读教反。那部分交给朗读。

数据来自 [open-dict-data/ipa-dict](https://github.com/open-dict-data/ipa-dict)（MIT）：
英语取 `en_US`（通用美音，音系上最接近加拿大英语），法语取 `fr_FR`。
ipa-dict 也有 `fr_QC`，但那是窄式转写，带双元音化和塞擦化
（`cordialement` 记成 /kɑɔ̯ʁd͡zjalmæ̃/），对照学习不便；
魁北克特有的**词汇**已经由词表的 `CANADA` 模块覆盖。想换成魁北克读音，
改 `scripts/build-ipa.ts` 里 `JOBS` 的 `dict` 字段即可。

产物 `vocab/tools/ipa-*.tsv` 提交进仓库，**可以手工修正**。`vp run build:ipa`
需要联网，日常构建不依赖它。

**朗读**用浏览器自带的语音合成（Web Speech API），词条和例句各有一个喇叭按钮，
设置里可以打开「翻面时自动朗读」。声音优先选 `en-CA` / `fr-CA`，没有再退回
`en-US` / `fr-FR`。看义猜词模式下翻面前不显示音标、也没有朗读按钮——那等于直接给答案。

## 数据来源

`public/data/*.json` 是**生成产物**，由 `scripts/build-data.ts` 从 `vocab/pte-core/_src.psv` 和 `vocab/tcf-canada/_src.psv` 生成。

不要直接编辑 JSON。改词表请编辑对应的 `_src.psv`，然后：

```bash
bash vocab/tools/build.sh   # 重新生成 .tsv 与 .md
vp run build:data           # 重新生成网页用的 .json
```

卡片 ID 取 `section|theme|词条` 三元组的 sha256 前 10 位（该三元组在两份词表中均唯一，生成时会校验冲突）。因此重排 `_src.psv` 或修改释义、用法要点、例句都不会丢失学习进度；只有改动词条本身才会重置那一条。

## 安装到主屏幕与 iOS 存储

**进度只存在设备本地，而 iOS 上这件事有个硬性限制。**

WebKit 的 ITP 会在**连续 7 天浏览器使用时间内对本站零交互**后，清除站点的全部 script-writable storage（localStorage、IndexedDB、Cache 等）。换 Chrome 或 Edge 没用 —— iOS 上所有浏览器都必须用 WebKit 引擎，都是 WKWebView 的壳，这条策略一样生效。

唯一的豁免是**从主屏幕以 standalone 模式启动的 Web App**：它不属于 Safari，有自己的使用天数计数器，只要你在用就不会被清。

本项目已具备这一项（`apple-mobile-web-app-capable` meta + `apple-touch-icon` + manifest），**在 iPhone 上 Safari 打开 → 分享 → 添加到主屏幕即可**，不需要 Service Worker。

两个必须知道的点：

- **主屏幕 Web App 与 Safari 是互不相通的存储容器。** 在 Safari 里背的进度，添加到主屏幕后打开是空的。要么一开始就只在主屏幕里背，要么用设置面板里的导出/导入搬一次。别两边同时用，会分裂成两份进度。
- 无论装不装，**定期导出备份**都是更稳的兜底，也顺带解决换设备的问题。

### PWA 能力现状

| 能力                             | 状态                                          |
| -------------------------------- | --------------------------------------------- |
| 可安装 / 主屏幕 standalone 启动  | ✅                                            |
| 应用元信息（图标、名称、主题色） | ✅ `manifest.webmanifest` + `icon-*.png`      |
| 离线可用（Service Worker）       | ❌ 未做。只影响没网时能否打开，与存储保命无关 |
| 推送通知                         | ❌ 未做，也用不上                             |

### 其他 iOS 适配

- 已处理 `100dvh`、`env(safe-area-inset-*)`（配合 `viewport-fit=cover`）、`touch-action: manipulation`、`overscroll-behavior: none`。
- 落盘走 500ms 节流，并在 `pagehide` / `visibilitychange` 时强制刷写 —— iOS 的 `beforeunload` 不可靠。
