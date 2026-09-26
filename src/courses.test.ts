import { describe, expect, it } from "vite-plus/test";

import deckJs from "../public/course/deck.js?raw";
import { COURSES, ENGLISH_COURSES } from "@/courses";

const pages = import.meta.glob<string>("../public/french-4h*.html", {
  query: "?raw",
  import: "default",
  eager: true,
});
const page = (href: string) => pages[`../public/${href}`];

describe("法语四小时课件", () => {
  it("首页列出的每一册都有对应的页面，没有漏列的", () => {
    expect(Object.keys(pages).sort()).toEqual(COURSES.map((c) => `../public/${c.href}`).sort());
  });

  it("首页和课件内部目录（deck.js 的 SERIES）顺序一致", () => {
    const series = [...deckJs.matchAll(/\{ href: "([^"]+)"/g)].map((m) => m[1]);
    expect(series).toEqual(COURSES.map((c) => c.href));
  });

  it("每一册都接上共用的样式和脚本", () => {
    for (const course of COURSES) {
      const html = page(course.href);
      expect(html, course.href).toContain('href="course/deck.css"');
      expect(html, course.href).toContain('src="course/deck.js"');
      expect(html, course.href).toContain("data-series");
    }
  });

  it("每一册的页码存储键不重复", () => {
    const ids = COURSES.map((c) => /<body data-deck="([^"]+)"/.exec(page(c.href))?.[1]);
    expect(new Set(ids).size).toBe(COURSES.length);
  });
});

const englishPages = import.meta.glob<string>("../public/pte-*.html", {
  query: "?raw",
  import: "default",
  eager: true,
});

describe("英语课件", () => {
  it("首页列出的每一份都有对应的页面，没有漏列的", () => {
    expect(Object.keys(englishPages).sort()).toEqual(
      ENGLISH_COURSES.map((c) => `../public/${c.href}`).sort(),
    );
  });
});
