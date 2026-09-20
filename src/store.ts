import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { applyAnswer, candidates, emptyStat, pickNext } from "@/lib/scheduler";
import { STORAGE_KEY, throttledStorage } from "@/lib/storage";
import type { Card, CardStat, Deck, DeckId, DeckProgress, Settings } from "@/types";

export const DECK_IDS = ["pte-core", "tcf-canada"] as const;

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
  "tcf-canada": { stats: {} },
});

type Persisted = {
  progress: Record<DeckId, DeckProgress>;
  settings: Settings;
  lastDeckId: DeckId | null;
};

type Transient = {
  deck: Deck | null;
  status: "idle" | "loading" | "ready" | "error";
  current: Card | null;
  revealed: boolean;
  /** 最近出现过的卡片 id，最新的在末尾 */
  recent: string[];
  session: { ok: number; bad: number };
};

type Actions = {
  openDeck: (id: DeckId) => Promise<void>;
  leaveDeck: () => void;
  reveal: () => void;
  answer: (correct: boolean) => void;
  drawNext: () => void;
  updateSettings: (patch: Partial<Settings>) => void;
  resetDeck: (id: DeckId) => void;
  statOf: (cardId: string) => CardStat;
};

export type Store = Persisted & Transient & Actions;

/** 依据当前词库、进度与设置抽下一张卡 */
function draw(state: Store): Card | null {
  if (!state.deck) return null;
  const stats = state.progress[state.deck.id].stats;
  const pool = candidates(state.deck.cards, stats, state.settings);
  return pickNext(pool, stats, state.recent, Date.now());
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      progress: emptyProgress(),
      settings: DEFAULT_SETTINGS,
      lastDeckId: null,

      deck: null,
      status: "idle",
      current: null,
      revealed: false,
      recent: [],
      session: { ok: 0, bad: 0 },

      statOf: (cardId) => get().progress[get().deck?.id ?? "pte-core"].stats[cardId] ?? emptyStat(),

      openDeck: async (id) => {
        set({ status: "loading", deck: null, current: null, revealed: false });
        try {
          const res = await fetch(`${import.meta.env.BASE_URL}data/${id}.json`);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const deck = (await res.json()) as Deck;
          set({
            deck,
            status: "ready",
            lastDeckId: id,
            recent: [],
            session: { ok: 0, bad: 0 },
            revealed: false,
          });
          get().drawNext();
        } catch {
          set({ status: "error" });
        }
      },

      leaveDeck: () =>
        set({ deck: null, status: "idle", current: null, revealed: false, recent: [] }),

      reveal: () => set({ revealed: true }),

      drawNext: () => set((s) => ({ current: draw(s), revealed: false })),

      answer: (correct) => {
        const { deck, current } = get();
        if (!deck || !current) return;

        set((s) => {
          const deckId = deck.id;
          const stats = s.progress[deckId].stats;
          const next = applyAnswer(stats[current.id], correct, Date.now());

          const updated: Store = {
            ...s,
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
        set((s) => ({
          progress: { ...s.progress, [id]: { stats: {} } },
          recent: [],
          session: { ok: 0, bad: 0 },
        }));
        if (get().deck?.id === id) get().drawNext();
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => throttledStorage),
      version: 1,
      partialize: (s): Persisted => ({
        progress: s.progress,
        settings: s.settings,
        lastDeckId: s.lastDeckId,
      }),
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<Persisted>;
        return {
          ...current,
          ...p,
          // 旧存档可能缺字段，用默认值补齐，避免升级后炸在 undefined 上
          progress: { ...emptyProgress(), ...p.progress },
          settings: { ...DEFAULT_SETTINGS, ...p.settings },
        };
      },
    },
  ),
);
