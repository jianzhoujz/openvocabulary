// 法语四小时系列课件的共用脚本：翻页、点读、朗读整页、选声音、页面缩放。
// 每份课件是 public/ 下的一个独立 HTML，<body data-deck="…"> 给出存储用的编号，
// 可选的 window.DECK_ZH 是 { 法语原文: 中文释义 }，也可以直接在 <i> 上写 data-zh。
(() => {
  // 系列目录。增删课件只改这里，每份课件里的 [data-series] 会自动渲染
  const SERIES = [
    { href: "french-4h.html", n: "第 1 册 · A1", t: "入门：从读音到开口" },
    { href: "french-4h-2.html", n: "第 2 册 · A1→A2", t: "日常生活" },
    { href: "french-4h-3.html", n: "第 3 册 · A2→B1", t: "讲经历、谈打算" },
    { href: "french-4h-4.html", n: "第 4 册 · B1→B2", t: "表达观点" },
    { href: "french-4h-5.html", n: "第 5 册 · 应试", t: "TCF 听力与阅读" },
    { href: "french-4h-6.html", n: "第 6 册 · 应试", t: "TCF 写作与口语" },
  ];

  const deckId = document.body.dataset.deck || "fr4h";
  const $ = (id) => document.getElementById(id);

  // 各课件共用的界面：没有法语语音的提示、翻页栏、toast
  document.querySelector(".stage-wrap").insertAdjacentHTML(
    "beforebegin",
    `<aside class="novoice" id="noVoice" hidden>
      <div>
        <b>这台设备没有法语语音，所以暂时不朗读。</b>
        没有法语语音时，浏览器会用中文或英语的声音去念，<em>table</em>
        这类词就会被读成英语，跟着学会学错。可以这样解决：
      </div>
      <ul>
        <li><b>最省事：</b>用 Microsoft Edge 打开本页，它自带加拿大法语在线语音（Sylvie、Antoine 等）。
          Chrome 的在线语音只有一个“Google français”，是法国口音。</li>
        <li><b>Windows：</b>设置 → 时间和语言 → 语音 → 添加语音 → 选“法语（加拿大）”，装好后重启浏览器。
          Edge 能用上，Chrome 不一定认得。</li>
        <li><b>手机：</b>iPhone 在“设置 → 辅助功能 → 朗读内容 → 声音 → 法语”里下载加拿大法语声音，
          增强音质更自然；安卓在系统的“文字转语音”设置里下载法语语音包。</li>
      </ul>
      <button class="btn" id="noVoiceClose">知道了</button>
    </aside>`,
  );
  document.querySelector(".stage-wrap").insertAdjacentHTML(
    "afterend",
    `<nav class="bar" aria-label="翻页">
      <button class="btn" id="prev" aria-label="上一页">← 上一页</button>
      <span class="count" id="count"></span>
      <div class="progress" aria-hidden="true"><div id="prog"></div></div>
      <select class="voice" id="voice" aria-label="朗读用的声音"></select>
      <button class="btn" id="rate" title="切换朗读速度">语速：最慢</button>
      <button class="btn primary" id="readAll">朗读本页</button>
      <button class="btn" id="next" aria-label="下一页">下一页 →</button>
    </nav>
    <div class="toast" id="toast" hidden></div>`,
  );

  const here = location.pathname.split("/").pop() || "french-4h.html";
  document.querySelectorAll("[data-series]").forEach((box) => {
    box.classList.add("series");
    for (const s of SERIES) {
      const a = document.createElement("a");
      a.href = s.href;
      if (s.href === here) a.setAttribute("aria-current", "page");
      const n = document.createElement("span");
      n.className = "n";
      n.textContent = s.n;
      const b = document.createElement("b");
      b.textContent = s.t;
      a.append(n, b);
      box.append(a);
    }
  });

  const slides = [...document.querySelectorAll(".slide")];
  const chip = $("chip"),
    count = $("count"),
    prog = $("prog"),
    readBtn = $("readAll"),
    rateBtn = $("rate");
  const synth = window.speechSynthesis;
  let cur = 0,
    voice = null,
    frVoices = [],
    speed = 0,
    reading = false,
    toastTimer;

  const store = {
    get(k) {
      try {
        return localStorage.getItem(k);
      } catch {
        return null;
      }
    },
    set(k, v) {
      try {
        localStorage.setItem(k, v);
      } catch {}
    },
  };
  // 声音和语速整个系列共用（沿用第 1 册的键名），页码每册各记各的
  const KEY_VOICE = "fr4h-voice",
    KEY_RATE = "fr4h-rate",
    KEY_PAGE = deckId + "-page";

  // 法语下方的中文释义。后面已经紧跟中文解释的（全角空格 + 汉字）不重复标注；
  // 写了 data-zh 的以 data-zh 为准。
  const ZH = window.DECK_ZH || {};
  const hasGlossAfter = (el) => {
    const n = el.nextSibling;
    return n && n.nodeType === 3 && /^　[一-鿿]/.test(n.textContent);
  };
  document.querySelectorAll(".slide i").forEach((el) => {
    el.tabIndex = 0;
    el.setAttribute("role", "button");
    el.title = "点击朗读";
    const text = el.textContent.replace(/\s+/g, " ").trim();
    const zh = el.dataset.zh ?? (hasGlossAfter(el) ? null : ZH[text]);
    if (!zh) return;
    if (!el.dataset.say) el.dataset.say = text;
    const w = document.createElement("span");
    w.className = "w";
    w.textContent = text;
    const z = document.createElement("span");
    z.className = "zh";
    z.textContent = zh;
    el.replaceChildren(w, z);
    el.classList.add("g");
    if (text.length <= 14) el.classList.add("short");
  });

  function toast(msg, ms = 4000) {
    const t = $("toast");
    t.textContent = msg;
    t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      t.hidden = true;
    }, ms);
  }

  function pickVoice() {
    if (!synth) return;
    const vs = synth.getVoices();
    const fr = vs.filter((v) => /^fr/i.test(v.lang));
    // 排序：加拿大法语优先，其次法国法语；同一地区里在线（通常更自然）在前，
    // 离线的高级音质排在标准音质前
    // 多语言声音会自己猜语言，排到同口音的最后
    const region = (v) => (/fr[-_]CA/i.test(v.lang) ? 0 : /fr[-_]FR/i.test(v.lang) ? 16 : 32);
    const score = (v) =>
      region(v) + (isMultilingual(v) ? 8 : 0) + (v.localService ? 4 : 0) + (3 - qualityRank(v));
    // 同一个声音报两遍（voiceURI 完全相同）才合并；同名不同标识的都留着，显示时附上标识
    const seen = new Set();
    frVoices = fr
      .sort((a, b) => score(a) - score(b))
      .filter((v) => {
        if (seen.has(v.voiceURI)) return false;
        seen.add(v.voiceURI);
        return true;
      });
    const saved = store.get(KEY_VOICE);
    voice = frVoices.find((v) => v.voiceURI === saved) || frVoices[0] || null;
    showVoice(vs.length > 0);
  }
  // 苹果系统同一个声音有几种音质，名字一样，只能从 voiceURI 看出来：
  // super-compact（精简，最差）、compact（标准）、enhanced（增强）、premium（高级）
  function qualityRank(v) {
    const id = v.voiceURI + " " + v.name;
    if (/premium|高级/i.test(id)) return 3;
    if (/enhanced|增强|优化/i.test(id)) return 2;
    if (/super-compact/i.test(id)) return 0;
    return 1;
  }
  function qualityLabel(v) {
    if (/\((enhanced|premium|增强|高级|优化)\)/i.test(v.name)) return "";
    const known =
      ["super-compact", "compact", "enhanced", "premium"].some((q) =>
        v.voiceURI.includes("." + q + "."),
      ) || /增强|高级/.test(v.name);
    return known ? ["精简", "标准", "增强", "高级"][qualityRank(v)] : "";
  }
  // Edge 名字带 Multilingual 的声音自动识别文本语言、不认 lang：table、grand 这种
  // 英法同形的单词常被判成英语。按名字里的通用标识判断，不列具体声音名
  function isMultilingual(v) {
    return /multilingual/i.test(v.name);
  }
  const REGIONS = { FR: "法国", CA: "加拿大", BE: "比利时", CH: "瑞士" };
  // 声音名原样显示，后面补上口音、在线／离线，以及名字里看不出来的音质
  function describeVoice(v) {
    const region = REGIONS[v.lang.split(/[-_]/)[1]?.toUpperCase()] || v.lang;
    return [
      v.name,
      region + "法语",
      v.localService ? "离线" : "在线",
      qualityLabel(v),
      isMultilingual(v) ? "多语言，单词可能读成英语" : "",
    ]
      .filter(Boolean)
      .join(" · ");
  }
  // 在翻页栏列出本机可用的法语声音，可以切换。
  // localService 为 false 的是浏览器联网合成的声音（Edge 的 Online、Chrome 的 Google）
  function showVoice(loaded) {
    const sel = $("voice");
    sel.replaceChildren();
    if (!frVoices.length) {
      sel.add(new Option(loaded || !synth ? "没有法语语音" : "正在加载语音…", ""));
      sel.disabled = true;
      sel.title = "";
      return;
    }
    // 显示文字撞车时（iOS 上两个一样的 Amélie）附上完整 voiceURI 区分
    const labels = frVoices.map(describeVoice);
    frVoices.forEach((v, i) => {
      const dup = labels.filter((l) => l === labels[i]).length > 1;
      sel.add(new Option(dup ? labels[i] + " · " + v.voiceURI : labels[i], v.voiceURI));
    });
    sel.disabled = false;
    sel.value = voice.voiceURI;
    sel.title = voice.name + "（" + voice.lang + "）";
    $("noVoice").hidden = true;
  }
  $("voice").onchange = (e) => {
    voice = frVoices.find((v) => v.voiceURI === e.target.value) || voice;
    e.target.title = voice.name + "（" + voice.lang + "）";
    store.set(KEY_VOICE, voice.voiceURI);
    stop();
  };
  $("noVoiceClose").onclick = () => {
    $("noVoice").hidden = true;
  };
  if (synth) {
    pickVoice();
    synth.onvoiceschanged = pickVoice;
  } else {
    showVoice(true);
  }

  function clearMarks() {
    document.querySelectorAll("i.speaking").forEach((e) => e.classList.remove("speaking"));
  }
  function stop() {
    if (synth) synth.cancel();
    clearMarks();
    reading = false;
    readBtn.textContent = "朗读本页";
  }

  function speak(list) {
    if (!synth) {
      toast("这个浏览器不支持朗读，请换用 Chrome、Edge 或 Safari。");
      return false;
    }
    stop();
    if (!voice) pickVoice();
    // 没有法语声音时浏览器会退回系统默认声音（常见是中文或英语），
    // 按那种语言的规则念法语，table 会被读成英语。宁可不读也不教错。
    if (!voice) {
      $("noVoice").hidden = false;
      return false;
    }
    list.forEach((el, idx) => {
      const u = new SpeechSynthesisUtterance(el.dataset.say || el.textContent);
      // lang 跟所选声音一致；写死 fr-CA 会和法国法语的声音互相矛盾
      u.voice = voice;
      u.lang = voice.lang;
      u.rate = SPEEDS[speed].rate;
      u.onstart = () => {
        clearMarks();
        el.classList.add("speaking");
      };
      u.onend = u.onerror = () => {
        el.classList.remove("speaking");
        if (idx === list.length - 1) {
          reading = false;
          readBtn.textContent = "朗读本页";
        }
      };
      synth.speak(u);
    });
    return true;
  }

  function go(n) {
    n = Math.max(0, Math.min(slides.length - 1, n));
    stop();
    slides[cur].classList.remove("on");
    cur = n;
    const s = slides[cur];
    s.classList.add("on");
    s.scrollTop = 0;
    fitSlide(s);
    chip.innerHTML = "<b>" + s.dataset.sec + "</b>";
    count.textContent = cur + 1 + " / " + slides.length;
    prog.style.width = ((cur + 1) / slides.length) * 100 + "%";
    $("prev").disabled = cur === 0;
    $("next").disabled = cur === slides.length - 1;
    try {
      history.replaceState(null, "", "#p" + (cur + 1));
    } catch {}
    store.set(KEY_PAGE, String(cur));
    if (window.innerWidth <= 760) window.scrollTo(0, 0);
  }

  // 内容放不下 16:9 画面时，整页等比缩小字号直到放下，而不是出滚动条。
  // 标题、释义都用 em，跟着一起缩。手机布局是纵向流式排版，不需要。
  const mobile = window.matchMedia("(max-width: 760px)");
  function fitSlide(s) {
    s.style.fontSize = "";
    if (mobile.matches) return;
    let size = parseFloat(getComputedStyle(s).fontSize);
    // 除了整页，也查页内能滚动的容器（表格外层）有没有被撑出滚动条
    const overflows = () =>
      s.scrollHeight > s.clientHeight + 1 ||
      [...s.querySelectorAll(".tbl")].some((t) => t.scrollHeight > t.clientHeight + 1);
    for (let i = 0; i < 40 && overflows(); i++) {
      size *= 0.96;
      s.style.fontSize = size + "px";
    }
  }
  let fitQueued = false;
  const refit = () => {
    if (fitQueued) return;
    fitQueued = true;
    requestAnimationFrame(() => {
      fitQueued = false;
      fitSlide(slides[cur]);
    });
  };
  window.addEventListener("resize", refit);
  // 网页字体晚到会改变行高，到了再量一次
  if (document.fonts) void document.fonts.ready.then(refit);

  $("prev").onclick = () => go(cur - 1);
  $("next").onclick = () => go(cur + 1);
  readBtn.onclick = () => {
    if (reading) {
      stop();
      return;
    }
    const list = [...slides[cur].querySelectorAll("i")];
    if (!list.length) {
      toast("这一页没有法语。");
      return;
    }
    if (speak(list)) {
      reading = true;
      readBtn.textContent = "停止";
    }
  };
  // 默认最慢；0.5 以下浏览器语音会明显失真，所以不再往下调
  const SPEEDS = [
    { rate: 0.5, label: "最慢" },
    { rate: 0.75, label: "较慢" },
    { rate: 1, label: "正常" },
  ];
  const showSpeed = () => {
    rateBtn.textContent = "语速：" + SPEEDS[speed].label;
  };
  rateBtn.onclick = () => {
    speed = (speed + 1) % SPEEDS.length;
    showSpeed();
    store.set(KEY_RATE, String(speed));
  };
  const savedSpeed = parseInt(store.get(KEY_RATE) || "0", 10);
  if (SPEEDS[savedSpeed]) speed = savedSpeed;
  showSpeed();

  $("stage").addEventListener("click", (e) => {
    const el = e.target.closest("i");
    if (el) {
      speak([el]);
      return;
    }
    const g = e.target.closest("[data-goto]");
    if (g) go(slides.indexOf(document.getElementById(g.dataset.goto)));
  });
  $("stage").addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.target.matches(".slide i")) {
      e.preventDefault();
      speak([e.target]);
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.target.closest && e.target.closest("button, i, a, select")) {
      if (e.key === " " || e.key === "Enter") return;
    }
    if (["ArrowRight", "PageDown", " "].includes(e.key)) {
      e.preventDefault();
      go(cur + 1);
    } else if (["ArrowLeft", "PageUp"].includes(e.key)) {
      e.preventDefault();
      go(cur - 1);
    } else if (e.key === "Home") go(0);
    else if (e.key === "End") go(slides.length - 1);
  });

  let sx = null,
    sy = null;
  $("stage").addEventListener(
    "touchstart",
    (e) => {
      sx = e.touches[0].clientX;
      sy = e.touches[0].clientY;
    },
    { passive: true },
  );
  $("stage").addEventListener("touchend", (e) => {
    if (sx === null) return;
    const dx = e.changedTouches[0].clientX - sx,
      dy = e.changedTouches[0].clientY - sy;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) go(cur + (dx < 0 ? 1 : -1));
    sx = null;
  });

  const m = /^#p(\d+)$/.exec(location.hash);
  const saved = parseInt(store.get(KEY_PAGE) || "0", 10);
  slides[0].classList.add("on");
  go(m ? parseInt(m[1], 10) - 1 : isNaN(saved) ? 0 : saved);
})();
