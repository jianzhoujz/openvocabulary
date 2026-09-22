import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { IDLE_GAP_MS, addDay, dayKey, emptyDay, pruneDaily } from "@/lib/activity";
import { applyAnswer, candidates, emptyStat, isMastered, isNew, pickNext } from "@/lib/scheduler";
import { STORAGE_KEY, throttledStorage } from "@/lib/storage";
import type { Card, CardStat, DayLog, Deck, DeckId, DeckProgress, Settings } from "@/types";

export const DECK_IDS = ["pte-core", "tcf-canada-mots", "tcf-canada-phrases"] as const;

export const DEFAULT_SETTINGS: Settings = {
  mode: "front-to-gloss",
  sections: [],
  includeMastered: false,
  newCardLimit: 20,
  autoSpeak: false,
  theme: "system",
};

const emptyProgress = (): Record<DeckId, DeckProgress> => ({
  "pte-core": { stats: {} },
  "tcf-canada-mots": { stats: {} },
  "tcf-canada-phrases": { stats: {} },
});

type Persisted = {
  progress: Record<DeckId, DeckProgress>;
  /** 按本地日期聚合的打卡日志，跨词表合并 */
  daily: Record<string, DayLog>;
  settings: Settings;
  lastDeckId: DeckId | null;
  /**
   * 拆表前 "tcf-canada" 的进度，等待认领。
   *
   * 单词、短语两表的卡片 ID 与拆分前相同，但启动时还没载入词库，
   * 不知道哪条进度属于哪张表。所以先原样放在这里，`openDeck` 载入某张表后
   * 把属于它的条目搬过去；两张表都认领完就空了。
   */
  legacyStats: Record<string, CardStat>;
};

type Transient = {
  deck: Deck | null;
  status: "idle" | "loading" | "ready" | "error";
  current: Card | null;
  revealed: boolean;
  /** 最近出现过的卡片 id，最新的在末尾 */
  recent: string[];
  session: { ok: number; bad: number };
  /** 学习时长的计时起点；null 表示当前没在背（页面切后台或已退出词表） */
  activeAt: number | null;
};

type Actions = {
  openDeck: (id: DeckId) => Promise<void>;
  leaveDeck: () => void;
  reveal: () => void;
  answer: (correct: boolean) => void;
  drawNext: () => void;
  updateSettings: (patch: Partial<Settings>) => void;
  resetDeck: (id: DeckId) => void;
  resetDaily: () => void;
  statOf: (cardId: string) => CardStat;
  tickActivity: () => void;
  pauseActivity: () => void;
};

export type Store = Persisted & Transient & Actions;

/** 依据当前词库、进度与设置抽下一张卡 */
function draw(state: Store): Card | null {
  if (!state.deck) return null;
  const stats = state.progress[state.deck.id].stats;
  const pool = candidates(state.deck.cards, stats, state.settings);
  return pickNext(pool, stats, state.recent, Date.now());
}

/** 把 `legacyStats` 里属于 `deck` 的条目搬进该词表的进度 */
function claimLegacy(s: Store, deck: Deck): Partial<Pick<Store, "progress" | "legacyStats">> {
  const legacyStats = { ...s.legacyStats };
  const moved: Record<string, CardStat> = {};
  for (const { id } of deck.cards) {
    if (!(id in legacyStats)) continue;
    moved[id] = legacyStats[id];
    delete legacyStats[id];
  }
  if (Object.keys(moved).length === 0) return {};

  const stats = s.progress[deck.id].stats;
  return {
    // 新表里已有的记录更新，优先保留
    progress: { ...s.progress, [deck.id]: { stats: { ...moved, ...stats } } },
    legacyStats,
  };
}

function bump(
  daily: Record<string, DayLog>,
  key: string,
  patch: Partial<DayLog>,
): Record<string, DayLog> {
  return { ...daily, [key]: addDay(daily[key] ?? emptyDay(), patch) };
}

/**
 * 把上次活动到 `now` 之间的时间计入当天，并把计时起点推到 `now`。
 *
 * 学习时长靠「操作之间的间隔」累加，而不是从进入词表到退出的墙上时间——
 * 后者会把中途接个电话、切去微信的半小时全算成学习。间隔超过
 * `IDLE_GAP_MS` 就整段丢掉，只重置起点。背诵页有个心跳定时器定期调用它，
 * 所以正常翻卡时每段间隔都远小于这个上限。
 */
function touch(s: Store, now: number): Pick<Store, "daily" | "activeAt"> {
  const gap = s.activeAt === null ? 0 : now - s.activeAt;
  const daily = gap > 0 && gap <= IDLE_GAP_MS ? bump(s.daily, dayKey(now), { ms: gap }) : s.daily;
  return { daily, activeAt: now };
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      progress: emptyProgress(),
      daily: {},
      settings: DEFAULT_SETTINGS,
      lastDeckId: null,
      legacyStats: {},

      deck: null,
      status: "idle",
      current: null,
      revealed: false,
      recent: [],
      session: { ok: 0, bad: 0 },
      activeAt: null,

      statOf: (cardId) => get().progress[get().deck?.id ?? "pte-core"].stats[cardId] ?? emptyStat(),

      openDeck: async (id) => {
        set({ status: "loading", deck: null, current: null, revealed: false });
        try {
          const res = await fetch(`${import.meta.env.BASE_URL}data/${id}.json`);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const deck = (await res.json()) as Deck;
          set((s) => ({
            ...claimLegacy(s, deck),
            deck,
            status: "ready",
            lastDeckId: id,
            recent: [],
            session: { ok: 0, bad: 0 },
            revealed: false,
            activeAt: Date.now(),
          }));
          get().drawNext();
        } catch {
          set({ status: "error", activeAt: null });
        }
      },

      leaveDeck: () =>
        set((s) => ({
          ...touch(s, Date.now()),
          activeAt: null,
          deck: null,
          status: "idle",
          current: null,
          revealed: false,
          recent: [],
        })),

      reveal: () => set((s) => ({ ...touch(s, Date.now()), revealed: true })),

      drawNext: () => set((s) => ({ current: draw(s), revealed: false })),

      tickActivity: () => set((s) => touch(s, Date.now())),

      pauseActivity: () => set((s) => ({ ...touch(s, Date.now()), activeAt: null })),

      answer: (correct) => {
        const { deck, current } = get();
        if (!deck || !current) return;

        set((s) => {
          const now = Date.now();
          const deckId = deck.id;
          const stats = s.progress[deckId].stats;
          const prev = stats[current.id];
          const next = applyAnswer(prev, correct, now);

          // 同一个词当天反复出现只算一次「学习词数」，靠上次出现时间判断
          const already = prev !== undefined && prev.n > 0 && dayKey(prev.at) === dayKey(now);
          const ticked = touch(s, now);

          const updated: Store = {
            ...s,
            ...ticked,
            daily: bump(ticked.daily, dayKey(now), {
              n: 1,
              ok: correct ? 1 : 0,
              words: already ? 0 : 1,
              fresh: isNew(prev) ? 1 : 0,
              // 只记「升上去」这个事件，之后答错掉级不回撤——当天确实掌握过
              mastered: isMastered(next) && !isMastered(prev) ? 1 : 0,
            }),
            progress: {
              ...s.progress,
              [deckId]: { stats: { ...stats, [current.id]: next } },
            },
            recent: [...s.recent, current.id].slice(-64),
            session: {
              ok: s.session.ok + (correct ? 1 : 0),
              bad: s.session.bad + (correct ? 0 : 1),
            },
          };

          return { ...updated, current: draw(updated), revealed: false };
        });
      },

      updateSettings: (patch) => {
        set((s) => ({ settings: { ...s.settings, ...patch } }));
        // 筛选条件变了，当前这张卡可能已不在池中，直接换一张
        if ("sections" in patch || "includeMastered" in patch || "newCardLimit" in patch) {
          get().drawNext();
        }
      },

      resetDeck: (id) => {
        // 打卡日志是跨词表的，重置单个词表不动它
        set((s) => ({
          progress: { ...s.progress, [id]: { stats: {} } },
          recent: [],
          session: { ok: 0, bad: 0 },
        }));
        if (get().deck?.id === id) get().drawNext();
      },

      resetDaily: () => set({ daily: {} }),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => throttledStorage),
      version: 2,
      partialize: (s): Persisted => ({
        progress: s.progress,
        daily: s.daily,
        settings: s.settings,
        lastDeckId: s.lastDeckId,
        legacyStats: s.legacyStats,
      }),
      migrate: (persisted, version) => {
        const p = { ...(persisted as Record<string, unknown>) };
        if (version < 2) {
          // v1 只有一张 "tcf-canada" 表，v2 拆成单词、短语两张，进度挪进 legacyStats 等认领
          const { "tcf-canada": legacy, ...progress } = (p.progress ?? {}) as Record<
            string,
            DeckProgress
          >;
          p.progress = progress;
          p.legacyStats = legacy?.stats ?? {};
          if (p.lastDeckId === "tcf-canada") p.lastDeckId = "tcf-canada-phrases";
        }
        return p as Persisted;
      },
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<Persisted>;
        return {
          ...current,
          ...p,
          // 旧存档可能缺字段，用默认值补齐，避免升级后炸在 undefined 上
          progress: { ...emptyProgress(), ...p.progress },
          daily: pruneDaily(p.daily ?? {}, Date.now()),
          settings: { ...DEFAULT_SETTINGS, ...p.settings },
          legacyStats: p.legacyStats ?? {},
          lastDeckId: (DECK_IDS as readonly string[]).includes(p.lastDeckId ?? "")
            ? (p.lastDeckId as DeckId)
            : null,
        };
      },
    },
  ),
);
