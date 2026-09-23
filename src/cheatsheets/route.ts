import { useSyncExternalStore } from "react";

/**
 * 速查页的路由：`#/grammar/<id>`。
 *
 * 词表页不走路由（刷新就回首页，正合适），速查页走 hash 是为了两件事：
 * 安卓返回键 / 浏览器后退能回到首页，以及链接可以直接发给别人打开某一页。
 */
const PREFIX = "#/grammar/";

function current(): string | null {
  const { hash } = window.location;
  return hash.startsWith(PREFIX) ? decodeURIComponent(hash.slice(PREFIX.length)) || null : null;
}

function subscribe(onChange: () => void): () => void {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

export function useSheetRoute(): string | null {
  return useSyncExternalStore(subscribe, current, () => null);
}

/** 从首页点进来时为 true：此时回首页走 history.back()，不在历史里多留一条 */
let pushedFromHome = false;
let homeScroll = 0;

export function openSheet(id: string): void {
  if (current() === null) {
    pushedFromHome = true;
    homeScroll = window.scrollY;
    window.location.hash = PREFIX.slice(1) + id;
  } else {
    // 页与页之间用 replace，历史里始终只有「首页 → 某一页」两层，返回一次就回首页
    window.location.replace(PREFIX + id);
  }
  window.scrollTo(0, 0);
}

export function closeSheet(): void {
  if (pushedFromHome) {
    pushedFromHome = false;
    window.history.back();
    return;
  }
  // 直接打开的链接：没有可退的首页，原地换掉 hash
  const { pathname, search } = window.location;
  window.history.replaceState(null, "", pathname + search);
  window.dispatchEvent(new HashChangeEvent("hashchange"));
}

/** 回到首页后恢复列表的滚动位置，只取一次 */
export function takeHomeScroll(): number {
  const y = homeScroll;
  homeScroll = 0;
  return y;
}
