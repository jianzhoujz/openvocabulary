import { useEffect } from "react";

import { useStore } from "@/store";

/** 把主题设置同步到 <html> 的 dark class；设为「跟随系统」时监听系统切换 */
export function useTheme() {
  const theme = useStore((s) => s.settings.theme);

  useEffect(() => {
    const root = document.documentElement;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");

    const apply = () => {
      root.classList.toggle("dark", theme === "dark" || (theme === "system" && mq.matches));
    };

    apply();
    if (theme !== "system") return;

    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [theme]);
}
