/**
 * 浏览器自带的语音合成（Web Speech API）。
 *
 * 几个平台差异必须处理：
 * - `getVoices()` 在 Chrome 上首次是空数组，要等 `voiceschanged` 事件
 * - iOS Safari 要求首次朗读发生在用户手势的调用栈里，所以只在点击里调用
 * - iOS 上连续朗读不先 `cancel()` 会卡住不发声；但**空队列时也 cancel() 反而会
 *   把 WebKit 的队列弄僵**，所以只在真的在说/在排队时才取消
 * - iOS 上所有浏览器都是 WKWebView，但各家配置的 AVAudioSession 不同：
 *   有的会被侧边静音拨片静掉、有的不会。`speak()` 照常 resolve，只是没声音，
 *   所以要有一个「接受了请求但迟迟没 start」的看门狗，不然用户只看到按钮没反应
 */
const LANG_PREFERENCE: Record<string, string[]> = {
  // 目标是加拿大考试，优先加拿大口音，没有再退回美音 / 法国法语
  en: ["en-CA", "en-US", "en-GB"],
  fr: ["fr-CA", "fr-FR"],
};

/** 朗读失败时给调用方的描述。message 给用户看，detail 给排查用 */
export type SpeechFailure = {
  message: string;
  detail?: string;
};

/** `SpeechSynthesisErrorEvent.error` 的取值 → 人话 */
const ERROR_MESSAGES: Record<string, string> = {
  "not-allowed": "浏览器拦下了这次朗读，通常是它没把这次调用算作用户点击。再点一下喇叭试试。",
  "audio-busy": "音频设备正忙，可能有别的应用或标签页在占用。",
  "audio-hardware": "系统找不到可用的音频输出设备。",
  network: "这个声音要联网合成，当前网络不通。",
  "synthesis-unavailable": "这个浏览器没有可用的语音合成引擎。",
  "synthesis-failed": "语音合成引擎处理这段文本时失败了。",
  "language-unavailable": "系统里没有装这个语言的语音包。",
  "voice-unavailable": "选中的声音已经不可用了。",
  "text-too-long": "这段文本太长，引擎读不下来。",
  "invalid-argument": "语速或音高超出了引擎支持的范围。",
};

/** 我们自己调 cancel() 造成的，属于正常打断，不该弹错误 */
const BENIGN_ERRORS = new Set(["interrupted", "canceled"]);

/** 没指定语速时用的默认值。背单词要听清音节，比引擎默认慢一些 */
const DEFAULT_RATE = 0.7;

/** 点了没声音时，多久算「引擎吞了这次请求」 */
const START_TIMEOUT_MS = 2000;

let voices: SpeechSynthesisVoice[] = [];
let watchdog: ReturnType<typeof setTimeout> | undefined;

function clearWatchdog(): void {
  if (watchdog !== undefined) {
    clearTimeout(watchdog);
    watchdog = undefined;
  }
}

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

/** 排查信息：能不能挑到声音、系统给了多少个声音 */
function diagnostics(lang: string, voice: SpeechSynthesisVoice | undefined): string {
  const list = voices.length === 0 ? "系统没报告任何声音" : `系统有 ${voices.length} 个声音`;
  return `${list} · ${lang} 用的是 ${voice ? `${voice.name}（${voice.lang}）` : "引擎默认声音"}`;
}

type SpeakHandlers = {
  /** 语速，1 为引擎默认。不传用 DEFAULT_RATE */
  rate?: number;
  /** 念完、或者出错收尾时都会调一次，用来复位「正在朗读」状态 */
  onSettled?: () => void;
  onError?: (failure: SpeechFailure) => void;
};

/** 朗读一段文本。lang 用 "en" / "fr" 这样的基础语言码 */
export function speak(text: string, lang: string, handlers: SpeakHandlers = {}): void {
  const { rate = DEFAULT_RATE, onSettled, onError } = handlers;

  const fail = (failure: SpeechFailure) => {
    clearWatchdog();
    onError?.(failure);
    onSettled?.();
  };

  if (!speechSupported()) {
    fail({
      message: "这个浏览器不支持语音合成（Web Speech API），换 Safari 或 Edge 试试。",
      detail: typeof navigator === "undefined" ? undefined : navigator.userAgent,
    });
    return;
  }
  if (!text.trim()) {
    onSettled?.();
    return;
  }

  clearWatchdog();
  // iOS 上不先取消，第二次点击会没声音；但队列空的时候 cancel() 反而会弄僵引擎
  if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
    window.speechSynthesis.cancel();
  }

  const utterance = new SpeechSynthesisUtterance(text);
  const voice = pickVoice(lang);
  if (voice) utterance.voice = voice;
  utterance.lang = voice?.lang ?? LANG_PREFERENCE[lang]?.[0] ?? lang;
  utterance.rate = rate;

  utterance.addEventListener("start", clearWatchdog);
  utterance.addEventListener("end", () => {
    clearWatchdog();
    onSettled?.();
  });
  utterance.addEventListener("error", (event) => {
    const code = (event as SpeechSynthesisErrorEvent).error ?? "unknown";
    if (BENIGN_ERRORS.has(code)) {
      clearWatchdog();
      onSettled?.();
      return;
    }
    fail({
      message: ERROR_MESSAGES[code] ?? `语音合成报错：${code}`,
      detail: `错误码 ${code} · ${diagnostics(lang, voice)}`,
    });
  });

  // 引擎收下了请求却不出声：iOS 上最常见的失败形态，既不报错也不播放。
  // 必须在 speak() 之前装好——有的实现会在 speak() 调用栈里就同步派发 start
  watchdog = setTimeout(() => {
    watchdog = undefined;
    onError?.({
      message:
        "浏览器接受了朗读请求，但一直没有出声。先看看手机侧边的静音拨片和媒体音量；" +
        "iOS 版 Chrome 对语音合成的支持一直不完整，换 Safari 或 Edge 一般就好了。",
      detail: diagnostics(lang, voice),
    });
    onSettled?.();
  }, START_TIMEOUT_MS);

  try {
    window.speechSynthesis.speak(utterance);
  } catch (err) {
    fail({
      message: "调用语音合成时抛异常了。",
      detail: err instanceof Error ? `${err.name}: ${err.message}` : String(err),
    });
  }
}

export function stopSpeaking(): void {
  clearWatchdog();
  if (speechSupported()) window.speechSynthesis.cancel();
}
