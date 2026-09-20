// @vitest-environment happy-dom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vite-plus/test";

import App from "@/App";
import { DEFAULT_SETTINGS, useStore } from "@/store";
import type { Card, Deck } from "@/types";

/**
 * 界面层的端到端冒烟测试：渲染整棵组件树并真的点按钮，
 * 覆盖「翻面 → 自评 → 进度落库 → 自动换卡」这条主链路。
 */
function card(id: string, front: string, gloss: string, ipa?: string): Card {
  return {
    id,
    ...(ipa ? { ipa } : {}),
    section: "EMAIL",
    theme: "开头-称呼",
    front,
    pos: "chunk",
    glosses: [gloss],
    note: "正式邮件唯一安全开头",
    example: "Dear Ms. Carter,",
  };
}

const DECK: Deck = {
  id: "pte-core",
  name: "PTE Core",
  subtitle: "英语 · 目标 CLB 9",
  lang: "en",
  glossLabels: ["中文"],
  sections: [{ code: "EMAIL", label: "Write Email 功能语块", count: 2 }],
  cards: [
    card("c1", "Dear Mr./Ms. + 姓", "尊敬的……先生/女士"),
    card("c2", "To whom it may concern", "敬启者"),
    card("c3", "invoice", "发票", "/ˈɪnvɔɪs/"),
  ],
};

function seed(patch: Partial<ReturnType<typeof useStore.getState>> = {}) {
  useStore.setState({
    progress: { "pte-core": { stats: {} }, "tcf-canada": { stats: {} } },
    settings: { ...DEFAULT_SETTINGS },
    lastDeckId: null,
    deck: null,
    status: "idle",
    current: null,
    revealed: false,
    recent: [],
    session: { ok: 0, bad: 0 },
    ...patch,
  });
}

const studying = (current: Card) => ({
  deck: DECK,
  status: "ready" as const,
  current,
  revealed: false,
});

beforeEach(() => {
  seed();
  // 选词表页开屏会拉 data/index.json，测试里没有静态服务器，直接桩掉
  vi.stubGlobal(
    "fetch",
    vi.fn(() => Promise.resolve(new Response(JSON.stringify([])))),
  );
});
afterEach(cleanup);

describe("选词表页", () => {
  it("渲染标题与引导语", () => {
    render(<App />);
    expect(screen.getByText("openvocabulary")).toBeTruthy();
    expect(screen.getByText("选一个词表开始")).toBeTruthy();
  });
});

describe("背诵页", () => {
  it("未翻面时只给题面，不泄露答案", () => {
    seed(studying(DECK.cards[0]));
    render(<App />);

    expect(screen.getByText("Dear Mr./Ms. + 姓")).toBeTruthy();
    expect(screen.getByRole("button", { name: "看答案" })).toBeTruthy();
    expect(screen.queryByText("尊敬的……先生/女士")).toBeNull();
  });

  it("点「看答案」后给出释义、用法要点和例句", () => {
    seed(studying(DECK.cards[0]));
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "看答案" }));

    expect(screen.getByText("尊敬的……先生/女士")).toBeTruthy();
    expect(screen.getByText("正式邮件唯一安全开头")).toBeTruthy();
    expect(screen.getByText("Dear Ms. Carter,")).toBeTruthy();
  });

  it("点卡片本身也能翻面", () => {
    seed(studying(DECK.cards[0]));
    render(<App />);
    fireEvent.click(screen.getByText("Dear Mr./Ms. + 姓"));
    expect(screen.getByText("尊敬的……先生/女士")).toBeTruthy();
  });

  it("自评「记住了」会写入进度、累计战绩并换下一张", () => {
    seed(studying(DECK.cards[0]));
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "看答案" }));
    fireEvent.click(screen.getByRole("button", { name: /记住了/ }));

    const s = useStore.getState();
    expect(s.progress["pte-core"].stats["c1"]).toMatchObject({ lv: 1, ok: 1 });
    expect(s.session).toEqual({ ok: 1, bad: 0 });
    expect(s.revealed).toBe(false);
    expect(screen.getByRole("button", { name: "看答案" })).toBeTruthy();
  });

  it("自评「没记住」计入错误并标记 lastBad", () => {
    seed(studying(DECK.cards[0]));
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "看答案" }));
    fireEvent.click(screen.getByRole("button", { name: /没记住/ }));

    expect(useStore.getState().progress["pte-core"].stats["c1"]).toMatchObject({
      bad: 1,
      lastBad: true,
    });
    expect(useStore.getState().session).toEqual({ ok: 0, bad: 1 });
  });

  it("键盘：空格翻面，→ 判对，← 判错", () => {
    seed(studying(DECK.cards[0]));
    render(<App />);

    fireEvent.keyDown(window, { key: " " });
    expect(useStore.getState().revealed).toBe(true);

    fireEvent.keyDown(window, { key: "ArrowRight" });
    expect(useStore.getState().session).toEqual({ ok: 1, bad: 0 });

    fireEvent.keyDown(window, { key: " " });
    fireEvent.keyDown(window, { key: "ArrowLeft" });
    expect(useStore.getState().session).toEqual({ ok: 1, bad: 1 });
  });

  it("没翻面时按判定键不计分，避免手滑打分", () => {
    seed(studying(DECK.cards[0]));
    render(<App />);

    fireEvent.keyDown(window, { key: "ArrowRight" });
    expect(useStore.getState().session).toEqual({ ok: 0, bad: 0 });
    expect(useStore.getState().revealed).toBe(false);
  });

  it("切到「看义猜词」后题面变成释义，且不泄露词条", () => {
    seed(studying(DECK.cards[1]));
    render(<App />);
    fireEvent.click(screen.getByRole("radio", { name: "看义猜词" }));

    expect(screen.getByText("敬启者")).toBeTruthy();
    expect(screen.queryByText("To whom it may concern")).toBeNull();
  });

  it("抽不出卡时显示空状态而不是白屏", () => {
    seed({ deck: DECK, status: "ready", current: null });
    render(<App />);
    expect(screen.getByText(/没有可背的词/)).toBeTruthy();
  });

  it("词表加载失败时给出返回入口", () => {
    seed({ deck: null, status: "error" });
    render(<App />);
    expect(screen.getByText("词表加载失败。")).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "返回" }));
    expect(useStore.getState().status).toBe("idle");
  });
});

describe("音标与朗读", () => {
  const spoken: string[] = [];

  function stubSpeech() {
    spoken.length = 0;
    vi.stubGlobal("speechSynthesis", {
      getVoices: () => [{ lang: "en-CA", name: "Test Voice" }],
      speak: (u: { text: string }) => spoken.push(u.text),
      cancel: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
    });
    vi.stubGlobal(
      "SpeechSynthesisUtterance",
      class {
        text: string;
        lang = "";
        rate = 1;
        voice: unknown = null;
        constructor(text: string) {
          this.text = text;
        }
        addEventListener() {}
      },
    );
  }

  it("有音标的词条会把音标显示出来", () => {
    seed(studying(DECK.cards[2]));
    render(<App />);
    expect(screen.getByText("/ˈɪnvɔɪs/")).toBeTruthy();
  });

  it("看义猜词模式下，翻面前不显示音标——那等于泄露读音", () => {
    seed({
      ...studying(DECK.cards[2]),
      settings: { ...DEFAULT_SETTINGS, mode: "gloss-to-front" },
    });
    render(<App />);

    expect(screen.queryByText("/ˈɪnvɔɪs/")).toBeNull();
    expect(screen.queryByRole("button", { name: "朗读" })).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "看答案" }));
    expect(screen.getByText("/ˈɪnvɔɪs/")).toBeTruthy();
  });

  it("点喇叭朗读词条，翻面后还能单独朗读例句", () => {
    stubSpeech();
    seed(studying(DECK.cards[2]));
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "朗读" }));
    expect(spoken).toEqual(["invoice"]);

    fireEvent.click(screen.getByRole("button", { name: "看答案" }));
    fireEvent.click(screen.getByRole("button", { name: "朗读例句" }));
    expect(spoken).toEqual(["invoice", "Dear Ms. Carter,"]);
  });

  it("浏览器不支持语音合成时不渲染朗读按钮", () => {
    vi.stubGlobal("speechSynthesis", undefined);
    seed(studying(DECK.cards[2]));
    render(<App />);
    expect(screen.queryByRole("button", { name: "朗读" })).toBeNull();
  });

  it("开了自动朗读，翻面时自己读出来", () => {
    stubSpeech();
    seed({
      ...studying(DECK.cards[2]),
      settings: { ...DEFAULT_SETTINGS, autoSpeak: true },
    });
    render(<App />);

    expect(spoken).toEqual([]);
    fireEvent.click(screen.getByRole("button", { name: "看答案" }));
    expect(spoken).toEqual(["invoice"]);
  });
});
