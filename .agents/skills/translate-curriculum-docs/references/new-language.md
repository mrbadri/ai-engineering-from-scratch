# Adding a new site language

Translating lesson bodies and localizing the interface are two separate jobs.
`docs/<lang>.md` files can land for a language the site has never heard of — the
lesson text will be translated while every button, label, and error message
around it stays English. Use this file when the interface should follow.

Persian (`fa`) is the reference implementation; grep for `fa` across `site/` to
see every touch point at once.

## 1. Register the language

`site/i18n.js`, `LANGS`:

```js
var LANGS = [
  { code: 'en', label: 'English', short: 'EN', dir: 'ltr' },
  { code: 'fa', label: 'فارسی',   short: 'فا', dir: 'rtl' }
];
```

- `code` — ISO 639-1, must match the `docs/<code>.md` filename.
- `label` — the language's name in itself, shown as the switcher tooltip.
- `short` — two or three characters for the header button.
- `dir` — `ltr` or `rtl`. This is what flips the whole layout.

The switcher cycles through this array, so a third entry needs no extra UI work.

## 2. Add the strings

`site/i18n-strings.js`, `STRINGS.<code>`. English is the source of truth: any
key you omit falls back to `STRINGS.en`, and a key missing from both renders as
the key itself so the gap is visible rather than blank.

Three other tables in the same file are optional but worth filling:

| Table | Contents | If omitted |
| --- | --- | --- |
| `STRINGS.<code>` | interface strings | English chrome |
| `PHASE_LABELS.<code>` | the 20 phase names and descriptions (these come from `README.md`, which has no per-language source) | English phase names on the home page, roadmap, and sidebar |
| `QUIZ_BANK.<code>` | fallback quiz questions per topic, used when a lesson has no `quiz.json` | English fallback questions |

Conventions:

- `{name}` placeholders are filled by `t(key, vars)`; keep every placeholder the
  source key uses.
- Keys ending `_html` are inserted with `innerHTML` — preserve their tags and
  attributes, translate only the text.
- Keep interface arrows inside the strings and point them the right way for the
  language: `'lesson.navPrev': '→ قبلی'` in RTL, `'← Previous'` in LTR.
- Use ASCII digits; `build.js` rewrites the lesson/phase/output counts in this
  file and needs to find them.

## 3. Teach the build about it

`site/build.js`, `SITE_LANGS`:

```js
const SITE_LANGS = ['fa'];
```

This drives which localized URLs and `hreflang` alternates go into
`sitemap.xml`. It covers the chrome-only pages; lesson pages are listed per
lesson from whichever `docs/<lang>.md` files exist.

If the language's count words differ, add a pattern to `syncCounts()` so the
published numbers stay in step, following the Persian ones:

```js
.replace(/\b\d+ درس/g, `${lessons} درس`)
```

Note the missing trailing `\b`: JavaScript's `\b` is ASCII-only and never
matches after a non-Latin script, which would make the pattern unmatchable.

## 4. Right-to-left languages only

`dir: 'rtl'` in the registry is enough to mirror the layout — `site/rtl.css`
holds every mirroring rule and is keyed on `html[dir="rtl"]`, so it applies to
any RTL language without change. What *is* language-specific:

- **A font with coverage for the script.** `site/i18n.js` injects one stylesheet
  for RTL languages (`RTL_FONT_HREF`, currently Vazirmatn). Arabic script needs
  it because the display and body faces are Latin-only. Add or branch this if
  the new language needs a different face.
- **The `html[data-lang="fa"]` block in `rtl.css`.** Copy it for the new code.
  It does three things that are not generic RTL:
  1. puts the script's font at the front of `--font-body` / `--font-display`,
     leaving the Latin faces behind it so per-glyph fallback keeps identifiers
     in JetBrains Mono;
  2. splits `--font-mono` (used for tracked-out interface labels) from
     `--font-code` (real code), because a Latin monospace space character opens
     huge word gaps in Arabic-script labels;
  3. resets `letter-spacing` — positive tracking breaks the cursive joins in
     Arabic script and renders words as disconnected shapes.

Also register the language's section-heading wording in `SECTIONS` in
`site/lesson.html`; see `site-integration.md`.

## 5. Verify

```bash
node site/build.js
python3 scripts/serve_site.py --port 8899
```

Open each page with `?lang=<code>` — `/`, `/catalog.html`,
`glossary.html`, `prereqs.html`, `about.html`, and a `lesson.html?path=…` — and
check:

- `<html lang>` and `<html dir>` are correct, with no flash of the wrong
  direction on load
- no horizontal scrollbar at 1440px, 768px, and 390px
- no console errors, and no raw dotted keys (`panel.quiz.title`) on screen
- the language switcher round-trips, and the choice survives following a normal
  internal link
- both light and dark themes
- for RTL: sidebars, table of contents, list markers, and accent bars mirrored;
  code blocks, commands, and numeric fractions still reading left-to-right

Then confirm English is untouched by loading the same pages with no `?lang=`
in a fresh browser profile — the preference is sticky in `localStorage`, so a
reused profile will keep serving the language you just tested.
