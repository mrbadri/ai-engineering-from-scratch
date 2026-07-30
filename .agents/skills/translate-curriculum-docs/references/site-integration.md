# How the site reads a translated lesson

`site/lesson.html` renders lesson bodies straight from Markdown at runtime, and
`site/build.js` mines the same files for titles, summaries, and search data.
That makes a handful of structural details load-bearing. Everything below is a
contract, not a style preference.

## File location and naming

```
phases/<NN>-<phase-slug>/<NN>-<lesson-slug>/docs/
  en.md          canonical source
  fa.md          translation, ISO 639-1 lowercase
  pt-br.md       optional region subtag, lowercase
```

`site/build.js` matches `^[a-z]{2}(-[a-z]{2})?\.md$`, case-insensitively, in
each `docs/` directory, and lowercases whatever it finds into the language code.
Name the file in lowercase anyway — that is the convention, and it keeps the
filename identical to the `?lang=` value and to the `LANGS` code. A file named
anything else (`farsi.md`, `fa.markdown`, `fa_IR.md`) is invisible to the build,
so the site will never offer it.

## What the build extracts

For every lesson, `build.js` records two new fields in `site/data.js`:

| Field | Meaning |
| --- | --- |
| `langs` | Which translations exist, e.g. `["fa"]` |
| `i18n` | Per-language `{ name, summary, keywords }` |

Those come from the translated Markdown itself:

| Source in your file | Becomes | Shown where |
| --- | --- | --- |
| first `# H1` | `i18n.<lang>.name` | sidebar, catalog, search results, phase modal, prev/next buttons, `<title>` |
| first `> blockquote` | `i18n.<lang>.summary` | search result snippets, page `<meta name="description">`, social cards |
| every `### H3` | `i18n.<lang>.keywords` | command-palette search index |

Consequences:

- **Exactly one `# H1`, and it must be the lesson title.** A translated lesson
  whose first `#` line is something else will show that text as its title
  everywhere on the site.
- **Keep the leading `> blockquote`.** Drop it and the lesson loses its summary
  in search and its social preview text. It is truncated at 180 characters, so
  keep the motto short.
- `### H3` headings feed search. Translating them is correct; the English terms
  remain findable because the palette also indexes the English source strings.

`langs` also controls fetching. On a `?lang=fa` page, `lesson.html` requests
`docs/fa.md` only when `data.js` says it exists — otherwise it skips straight to
`en.md` rather than spending a 404 round trip per lesson. So a new translation
does not appear until `node site/build.js` has run and its output is committed.

## Standard section headings

`lesson.html` classifies each `## H2` by matching its lowercased text against a
table, then stamps `data-section="<key>"` on the heading. Layout and quiz
placement key off that attribute, never off the prose again.

| Key | Matches (any substring) | Effect on the page |
| --- | --- | --- |
| `objectives` | `learning objectives`, `اهداف یادگیری` | replaced by the bordered Learning Objectives box; the bullets that follow become its list |
| `lab` | `lab challenge`, `چالش آزمایشگاه` | opens the dashed Lab Challenge panel |
| `problem` | `the problem`, `مسئله` | — |
| `concept` | `the concept`, `مفهوم` | pre-lesson quiz is inserted before it |
| `build` | `build it`, `آن را بسازید` | blue accent bar; fallback anchor for the pre-lesson quiz |
| `use` | `use it`, `از آن استفاده کنید` | blue accent bar; mid-lesson quiz inserted before it |
| `ship` | `ship it`, `آن را عرضه کنید` | blue accent bar |
| `keyterms` | `key terms`, `واژگان کلیدی` | post-lesson quiz inserted before it |
| `exercises` | `exercises`, `تمرین‌ها`, `تمرین` | — |

Reuse the registered wording for your language. If you need different wording,
or the language is not in the table, add it to `SECTIONS` in `site/lesson.html`
in the same commit — otherwise the lesson silently loses its objectives box,
accent bars, and quiz positions.

## Lesson-contract fields

Write them exactly as the source does, with the key in English *inside* the
bold markers and only the value translated:

```markdown
**Type:** ساخت
**Languages:** Python, Node.js, Rust
**Prerequisites:** هیچ‌کدام
**Time:** حدود 45 دقیقه
```

`lesson.html` matches `**<Key>:**` for `Type`, `Languages`, `Prerequisites`, and
`Time`, then renders the label from `site/i18n-strings.js` (`lesson.meta.*`). So
the reader sees `نوع: ساخت` while the file stays machine-readable. Translating
the key, or moving the colon outside the bold, breaks both the label lookup and
the metadata styling.

`Languages` lists the programming languages of the lesson's code. It must stay
identical to the source.

## Digits

Use ASCII digits. Two reasons:

1. `build.js` rewrites the published lesson/phase/output counts in place with
   patterns like `/\b\d+ درس/`. Non-ASCII numerals drift out of sync silently.
2. Numbers frequently sit next to code, versions, and shapes (`Python 3.11+`,
   `(3, 5)`), where mixed numeral systems read badly.

## Headings and anchors

Heading ids are generated with a Unicode-aware slugifier, so non-Latin headings
get real anchors (`## مسئله` → `id="مسئله"`), deduplicated on collision. You do
not need to add English anchors or ids by hand.

## Quizzes

A lesson's quiz lives beside its docs, not inside them:

```
phases/<phase>/<lesson>/
  quiz.json        canonical source (English)
  quiz.fa.json     translation
```

`build.js` matches `^quiz\.[a-z]{2}(-[a-z]{2})?\.json$` and records the result as
`quizLangs` on the lesson — tracked separately from the prose `langs`, because
the body and the quiz are translated by different passes and either can land
first. A lesson can legitimately have a Persian body with an English quiz.

Translate `question`, the `options` strings, and `explanation`. Keep the
following byte-identical to the source:

| Field | Why |
| --- | --- |
| `stage` | `pre` / `check` / `post` decides where on the page the quiz is injected |
| `correct` | an index into `options` — reordering the options silently marks the wrong answer right |
| option order | same reason; translate in place, never re-sort |
| option count | the renderer labels them A–D positionally |

Options that are literally code stay untranslated — `import torch;
print(torch.cuda.is_available())` and `git add, git commit, git push` are the
things being tested, not prose about them.

`node site/build.js` diffs every translation against its source and warns on a
mismatched question count, `correct`, `stage`, or option count. Treat those
warnings as errors: they describe a quiz that will mark answers incorrectly in
the browser while looking perfectly fine.

Quiz text is rendered with `unicode-bidi: plaintext`, so each question and
option picks up its own direction from its own content. An untranslated English
question therefore still reads correctly inside a Persian page — no direction
work is needed on your side.

## What this skill does not translate

- **`code/`** — runnable implementations. Comments inside fenced blocks *in the
  docs* may be translated per the main skill; the actual source files are not.
- **`outputs/`** — prompts, skills, and agents. These are artifacts the reader
  installs into their own tooling; translating them changes what they do.
- **Phase names and descriptions** — they come from `README.md`, not from any
  `docs/` file. They live in `PHASE_LABELS` in `site/i18n-strings.js`.

## Previewing your work

Use the repository's combined local server so the landing page and working-tree
lesson files share one origin:

```bash
node site/build.js                  # records the translation in data.js
python3 scripts/serve_site.py       # landing site + working-tree lessons
```

Then open `http://localhost:8000/` for the landing page or
`http://localhost:8000/lesson.html?path=phases/00-setup-and-tooling/01-dev-environment&lang=fa`
for a lesson.

On localhost, `lesson.html` tries `/phases/<lesson>/docs/<lang>.md` and the
matching quiz from the working tree first, so you see files you just edited with
no commit or push. It falls back to
`raw.githubusercontent.com/<repo>/<ref>/…` — where `<ref>` comes from
`site/build-meta.js`, written by `build.js` from your current branch — which is
the only path used in production.

If you use Python's plain `http.server` from `site/`, the landing page works but
`/phases/...` returns 404 because the repository is outside that server root.
If you use plain `http.server` from the repository root, the files work but the
landing page is under `/site/`. `scripts/serve_site.py` handles both mappings.

Two production-preview consequences are worth knowing:

- A Vercel PR preview has no working tree, so it resolves against the PR's own
  branch. Push before asking anyone to review the rendered page.

Check on the rendered page:

- the `# H1` is the lesson title, in the sidebar as well as the article
- the Learning Objectives box rendered as a box, not as a plain heading + list
- Build/Use/Ship carry their accent bar
- the contract fields show localized labels and no drop cap
- fenced code, commands, and inline identifiers read left-to-right
- Mermaid labels are translated and legible
- no horizontal scrollbar on the page body
