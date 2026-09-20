/**
 * 浏览器自带的语音合成（Web Speech API）。
 *
 * 几个平台差异必须处理：
 * - `getVoices()` 在 Chrome 上首次是空数组，要等 `voiceschanged` 事件
 * - iOS Safari 要求首次朗读发生在用户手势的调用栈里，所以只在点击里调用
 * - iOS 上连续朗读不先 `cancel()` 会卡住不发声
 */
const LANG_PREFERENCE: Record<string, string[]> = {
  // 目标是加拿大考试，优先加拿大口音，没有再退回美音 / 法国法语
  en: ["en-CA", "en-US", "en-GB"],
  fr: ["fr-CA", "fr-FR"],
};

let voices: SpeechSynthesisVoice[] = [];

export function speechSupported(): boolean {
  if (typeof window === "undefined") return false;
  // 查值不查键：部分内嵌 WebView 里 speechSynthesis 属性存在但值是 undefined，
  // 只用 `in` 判断会在后面调 getVoices() 时直接抛异常
  return Boolean(window.speechSynthesis) && typeof window.SpeechSynthesisUtterance === "function";
}

/** 预热声音列表。Chrome 首次返回空，靠 voiceschanged 补上 */
export function primeVoices(): () => void {
  if (!speechSupported()) return () => {};

  const load = () => {
    try {
      voices = window.speechSynthesis.getVoices();
    } catch {
      voices = [];
    }
  };
  load();
  window.speechSynthesis.addEventListener("voiceschanged", load);
  return () => window.speechSynthesis.removeEventListener("voiceschanged", load);
}

/** 按 en-CA → en-US → en-GB → 任意 en 的顺序挑一个声音 */
function pickVoice(lang: string): SpeechSynthesisVoice | undefined {
  if (voices.length === 0) voices = window.speechSynthesis.getVoices();

  for (const tag of LANG_PREFERENCE[lang] ?? []) {
    const exact = voices.find((v) => v.lang.replace("_", "-") === tag);
    if (exact) return exact;
  }
  return voices.find((v) => v.lang.toLowerCase().startsWith(lang));
}

/** 朗读一段文本。lang 用 "en" / "fr" 这样的基础语言码 */
export function speak(text: string, lang: string, onEnd?: () => void): void {
  if (!speechSupported() || !text.trim()) return;

  // iOS 上不先取消，第二次点击会没声音
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  const voice = pickVoice(lang);
  if (voice) utterance.voice = voice;
  utterance.lang = voice?.lang ?? LANG_PREFERENCE[lang]?.[0] ?? lang;
  // 背单词略放慢一点，听清音节
  utterance.rate = 0.9;

  if (onEnd) {
    utterance.addEventListener("end", onEnd);
    utterance.addEventListener("error", onEnd);
  }

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking(): void {
  if (speechSupported()) window.speechSynthesis.cancel();
}
