/**
 * i18n engine for AI Engineering from Scratch.
 *
 * Loaded synchronously in <head> (after i18n-strings.js, before the page body)
 * so `lang`/`dir` are set on <html> before first paint — no LTR flash on an
 * RTL page.
 *
 * Resolution order: ?lang=xx  →  localStorage  →  navigator.language  →  en.
 *
 * Public API (window.AIFS_I18N, plus the shorthand window.T for t):
 *   lang, dir, isRTL          current language state
 *   t(key, vars)              translate; {placeholders} filled from vars
 *   apply(root)               translate [data-i18n*] inside root
 *   decorate(root)            add ?lang= to internal links inside root
 *   url(href)                 lang-preserving version of one href
 *   setLang(code)             persist + reload into another language
 *   phaseLabel(phase)         {name, desc} localized where available
 *   lessonName(lesson)        localized lesson title where available
 *   lessonSummary(lesson)     localized lesson one-liner where available
 *   quizBank(topic)           fallback quiz questions for the current language
 *   observe()                 keep dynamically-inserted DOM translated
 */
(function () {
  'use strict';

  // ─── Language registry ──────────────────────────────────────────────────
  var LANGS = [
    { code: 'en', label: 'English', short: 'EN', dir: 'ltr' },
    { code: 'fa', label: 'فارسی',   short: 'فا', dir: 'rtl' }
  ];

  var STORAGE_KEY = 'aifs:lang';
  var DEFAULT_LANG = 'en';

  var STRINGS = window.AIFS_STRINGS || { en: {} };
  var PHASE_LABELS = window.AIFS_PHASE_LABELS || {};
  var QUIZ_BANK = window.AIFS_QUIZ_BANK || { en: {} };

  function findLang(code) {
    if (!code) return null;
    var normalized = String(code).toLowerCase().split('-')[0];
    for (var i = 0; i < LANGS.length; i++) {
      if (LANGS[i].code === normalized) return LANGS[i];
    }
    return null;
  }

  // ─── Resolve the active language ────────────────────────────────────────
  function readParam() {
    try {
      return new URLSearchParams(window.location.search).get('lang');
    } catch (e) {
      return null;
    }
  }

  function readStored() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function writeStored(code) {
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch (e) {
      // localStorage may be disabled; the ?lang= param still carries the choice
    }
  }

  var fromParam = findLang(readParam());
  var active =
    fromParam ||
    findLang(readStored()) ||
    findLang(navigator.language || (navigator.languages || [])[0]) ||
    findLang(DEFAULT_LANG);

  // An explicit ?lang= is a deliberate choice — remember it for later visits.
  if (fromParam) writeStored(fromParam.code);

  var LANG = active.code;
  var DIR = active.dir;
  var IS_RTL = DIR === 'rtl';

  // ─── Paint the document shell before the body renders ───────────────────
  (function paintShell() {
    var html = document.documentElement;
    html.setAttribute('lang', LANG);
    html.setAttribute('dir', DIR);
    html.setAttribute('data-lang', LANG);

  }());

  // ─── Translation ────────────────────────────────────────────────────────
  function fill(template, vars) {
    if (!vars) return template;
    return template.replace(/\{(\w+)\}/g, function (whole, name) {
      return Object.prototype.hasOwnProperty.call(vars, name)
        ? String(vars[name])
        : whole;
    });
  }

  /**
   * Look up `key` in the active language, falling back to English and then to
   * the key itself (which makes a missing string visible instead of blank).
   */
  function t(key, vars) {
    var table = STRINGS[LANG] || {};
    var value = table[key];
    if (value === undefined) value = (STRINGS.en || {})[key];
    if (value === undefined) return key;
    return fill(value, vars);
  }

  // ─── DOM application ────────────────────────────────────────────────────
  /**
   * Translate an element tree.
   *
   *   data-i18n="key"        → textContent
   *   data-i18n-html="key"   → innerHTML (keys carrying inline markup)
   *   data-i18n-attr="placeholder:key;title:other"
   *
   * Values are looked up fresh each call, so this is safe to re-run on
   * dynamically inserted nodes.
   */
  function apply(root) {
    root = root || document;
    if (!root.querySelectorAll) return;

    var textEls = root.querySelectorAll('[data-i18n]');
    for (var i = 0; i < textEls.length; i++) {
      textEls[i].textContent = t(textEls[i].getAttribute('data-i18n'));
    }

    var htmlEls = root.querySelectorAll('[data-i18n-html]');
    for (var j = 0; j < htmlEls.length; j++) {
      htmlEls[j].innerHTML = t(htmlEls[j].getAttribute('data-i18n-html'));
    }

    var attrEls = root.querySelectorAll('[data-i18n-attr]');
    for (var k = 0; k < attrEls.length; k++) {
      var spec = attrEls[k].getAttribute('data-i18n-attr') || '';
      var pairs = spec.split(';');
      for (var p = 0; p < pairs.length; p++) {
        var pair = pairs[p].trim();
        if (!pair) continue;
        var sep = pair.indexOf(':');
        if (sep === -1) continue;
        var attr = pair.slice(0, sep).trim();
        var key = pair.slice(sep + 1).trim();
        if (attr && key) attrEls[k].setAttribute(attr, t(key));
      }
    }
  }

  // ─── Lang-preserving links ──────────────────────────────────────────────
  var INTERNAL_PAGE = /(^|\/)(index|lesson|catalog|glossary|prereqs|about)\.html(\?|#|$)/;

  /** Add `lang=` to an internal href so the choice survives navigation. */
  function url(href) {
    if (LANG === DEFAULT_LANG) return href;
    if (!href) return href;
    if (/^(https?:|mailto:|tel:|#|javascript:)/i.test(href)) return href;
    if (!INTERNAL_PAGE.test(href)) return href;
    if (/[?&]lang=/.test(href)) return href;

    var hashAt = href.indexOf('#');
    var hash = hashAt === -1 ? '' : href.slice(hashAt);
    var base = hashAt === -1 ? href : href.slice(0, hashAt);
    return base + (base.indexOf('?') === -1 ? '?' : '&') + 'lang=' + LANG + hash;
  }

  function decorate(root) {
    if (LANG === DEFAULT_LANG) return;
    root = root || document;
    if (!root.querySelectorAll) return;
    var links = root.querySelectorAll('a[href]');
    for (var i = 0; i < links.length; i++) {
      var raw = links[i].getAttribute('href');
      var next = url(raw);
      if (next !== raw) links[i].setAttribute('href', next);
    }
  }

  // ─── Switching language ─────────────────────────────────────────────────
  /**
   * Persist the choice and reload with ?lang= set. A reload (rather than an
   * in-place re-render) is deliberate: lesson.html has to refetch a different
   * Markdown file, and every page rebuilds its lists from data.js on load.
   */
  function setLang(code) {
    var target = findLang(code);
    if (!target || target.code === LANG) return;
    writeStored(target.code);
    try {
      var next = new URL(window.location.href);
      next.searchParams.set('lang', target.code);
      window.location.href = next.toString();
    } catch (e) {
      window.location.reload();
    }
  }

  // ─── Language switcher control ──────────────────────────────────────────
  /**
   * Insert a switcher into the site header, styled like the theme toggle.
   * With two languages it reads as a single toggle showing the *other*
   * language; with more it cycles through the registry.
   */
  function mountSwitcher() {
    var header = document.querySelector('.site-header .header-inner');
    if (!header || header.querySelector('.lang-toggle')) return;

    var idx = 0;
    for (var i = 0; i < LANGS.length; i++) {
      if (LANGS[i].code === LANG) { idx = i; break; }
    }
    var next = LANGS[(idx + 1) % LANGS.length];

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'lang-toggle';
    btn.setAttribute('aria-label', t('aria.language'));
    btn.setAttribute('title', next.label);
    btn.setAttribute('lang', next.code);
    btn.textContent = next.short;
    btn.addEventListener('click', function () { setLang(next.code); });

    var themeToggle = header.querySelector('.theme-toggle');
    if (themeToggle) header.insertBefore(btn, themeToggle);
    else header.appendChild(btn);
  }

  // ─── Content helpers ────────────────────────────────────────────────────
  function phaseLabel(phase) {
    var out = { name: phase.name, desc: phase.desc || '' };
    var table = PHASE_LABELS[LANG];
    var entry = table && table[phase.id];
    if (entry) {
      if (entry.name) out.name = entry.name;
      if (entry.desc) out.desc = entry.desc;
    }
    return out;
  }

  /**
   * Localized lesson title. build.js copies the H1 of each docs/<lang>.md into
   * `lesson.i18n[lang].name`, so titles localize automatically as translations
   * land and fall back to the English name until then.
   */
  function lessonName(lesson) {
    if (!lesson) return '';
    var entry = lesson.i18n && lesson.i18n[LANG];
    return (entry && entry.name) || lesson.name || '';
  }

  function lessonSummary(lesson) {
    if (!lesson) return '';
    var entry = lesson.i18n && lesson.i18n[LANG];
    return (entry && entry.summary) || lesson.summary || '';
  }

  /** True when this lesson has a translated Markdown file for the active lang. */
  function lessonTranslated(lesson) {
    if (LANG === DEFAULT_LANG) return true;
    return !!(lesson && lesson.langs && lesson.langs.indexOf(LANG) !== -1);
  }

  function quizBank(topic) {
    var table = QUIZ_BANK[LANG] || QUIZ_BANK.en || {};
    return table[topic] || table.general || (QUIZ_BANK.en || {}).general || [];
  }

  // ─── Keep dynamic DOM translated + linked ───────────────────────────────
  var observing = false;

  function observe() {
    if (observing || !window.MutationObserver) return;
    observing = true;

    var pending = [];
    var scheduled = false;

    function flush() {
      scheduled = false;
      var batch = pending;
      pending = [];
      for (var i = 0; i < batch.length; i++) {
        apply(batch[i]);
        decorate(batch[i]);
      }
    }

    new MutationObserver(function (records) {
      for (var i = 0; i < records.length; i++) {
        var added = records[i].addedNodes;
        for (var j = 0; j < added.length; j++) {
          if (added[j].nodeType === 1) pending.push(added[j]);
        }
      }
      if (pending.length && !scheduled) {
        scheduled = true;
        window.requestAnimationFrame(flush);
      }
    }).observe(document.documentElement, { childList: true, subtree: true });
  }

  // ─── Boot ───────────────────────────────────────────────────────────────
  function boot() {
    // CSS-generated labels (e.g. the mobile "Mark"/"Done" pseudo-elements)
    // read these instead of hard-coding English.
    var root = document.documentElement;
    root.style.setProperty('--i18n-mark', JSON.stringify(t('modal.markShort')));
    root.style.setProperty('--i18n-done', JSON.stringify(t('modal.doneShort')));

    apply(document);
    decorate(document);
    mountSwitcher();
    observe();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  window.AIFS_I18N = {
    lang: LANG,
    dir: DIR,
    isRTL: IS_RTL,
    langs: LANGS,
    defaultLang: DEFAULT_LANG,
    t: t,
    apply: apply,
    decorate: decorate,
    url: url,
    setLang: setLang,
    phaseLabel: phaseLabel,
    lessonName: lessonName,
    lessonSummary: lessonSummary,
    lessonTranslated: lessonTranslated,
    quizBank: quizBank,
    observe: observe
  };

  window.T = t;
}());
