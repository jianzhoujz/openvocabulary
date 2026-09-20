import { useCallback, useEffect, useState } from "react";

import { primeVoices, speak, speechSupported, stopSpeaking } from "@/lib/speech";

/** 朗读能力。supported 为 false 时调用方应隐藏朗读按钮 */
export function useSpeech(lang: string) {
  const [supported] = useState(speechSupported);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => primeVoices(), []);

  // 离开页面时别让朗读继续
  useEffect(() => stopSpeaking, []);

  const say = useCallback(
    (text: string) => {
      if (!supported) return;
      setSpeaking(true);
      speak(text, lang, () => setSpeaking(false));
    },
    [supported, lang],
  );

  return { supported, speaking, say, stop: stopSpeaking };
}
