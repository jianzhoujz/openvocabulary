/** 法语四小时系列课件，页面在 public/ 下，是独立的 HTML，不走 React */
export interface Course {
  href: string;
  level: string;
  title: string;
  summary: string;
}

// public/course/deck.js 里的 SERIES 是课件内部的目录，两边的 href 和顺序要一致（有测试核对）
export const COURSES: Course[] = [
  {
    href: "french-4h.html",
    level: "A1",
    title: "入门：从读音到开口",
    summary: "发音、冠词、现在时、否定疑问、30 秒自我介绍",
  },
  {
    href: "french-4h-2.html",
    level: "A1→A2",
    title: "日常生活",
    summary: "不规则动词、代动词、数字钟点、复合过去时",
  },
  {
    href: "french-4h-3.html",
    level: "A2→B1",
    title: "讲经历、谈打算",
    summary: "宾语代词、y 和 en、未完成过去时、将来时、条件式",
  },
  {
    href: "french-4h-4.html",
    level: "B1→B2",
    title: "表达观点",
    summary: "虚拟式、si 条件句、转述、连接词、论证结构",
  },
  {
    href: "french-4h-5.html",
    level: "应试",
    title: "TCF 听力与阅读",
    summary: "题型、分数线、同义替换、陷阱、加拿大口语听辨",
  },
  {
    href: "french-4h-6.html",
    level: "应试",
    title: "TCF 写作与口语",
    summary: "六个任务的结构和范文、扣分清单、全程路线",
  },
];

/** 英语课件：独立页面，自带样式和脚本，不属于上面的法语系列 */
export const ENGLISH_COURSES: Course[] = [
  {
    href: "pte-core-4h.html",
    level: "CLB 9",
    title: "PTE Core 四小时冲刺",
    summary: "听 82 · 读 78 · 说 84 · 写 88：计分规律、口语写作模板、听写练习",
  },
];
