---
name: translate-curriculum-docs
description: Translate AI Engineering from Scratch lesson Markdown from English into another language while preserving technical accuracy, curriculum structure, code, math, diagrams, links, and repository invariants. Use when asked to translate one or more `phases/**/docs/en.md` lessons, localize curriculum documentation, review an existing lesson translation, make translated technical lessons natural and learner-friendly, or add a new site language.
---

# Translate Curriculum Docs

Translate lesson prose faithfully and naturally. Treat `docs/en.md` as the
canonical source and write the result beside it as `docs/<language-code>.md`.

A translation is not finished when the prose is good. The website reads these
files directly and derives the lesson title, summary, search keywords, section
layout, and quiz placement from their structure. Read
[site-integration.md](references/site-integration.md) before translating your
first lesson — a structurally-wrong translation renders as a broken page even
when every sentence is correct.

Worked example: `phases/00-setup-and-tooling/01-dev-environment/docs/fa.md` is a
complete translation of the `en.md` beside it. Read both side by side to see
what "preserve the structure" means in practice.

## Resolve the request

1. Determine the target language and its lowercase ISO 639-1 code, such as
   `fa`, `es`, `fr`, `de`, `pt`, `ar`, `tr`, `zh`, `ja`, or `ko`.
2. Check whether the site already ships that language: look for the code in the
   `LANGS` registry in `site/i18n.js`. If it is absent, the lesson will
   translate but the surrounding interface will stay English — follow
   [new-language.md](references/new-language.md) to add it, or say plainly that
   you are only translating lesson bodies this pass.
3. Resolve the scope to explicit source files:
   - lesson: one `phases/**/docs/en.md`
   - phase: every `docs/en.md` below one phase
   - curriculum: every `phases/**/docs/en.md`

   A lesson's quiz is a separate file — `quiz.json` beside `docs/`, translated as
   `quiz.<language-code>.json`. Translate it when the request covers the lesson
   as a whole, or on its own when asked for quizzes specifically; the structural
   rules are strict and are listed in
   [site-integration.md](references/site-integration.md).
4. If the target language or source scope is missing and cannot be inferred
   safely, ask one concise question before writing files.
5. Inspect any existing `docs/<language-code>.md` and preserve good,
   user-authored localization choices unless replacement was requested.
6. For multi-file work, translate and validate in small batches. Never use
   blind machine replacement across lesson files.

## Translate each lesson

Read the entire English lesson before translating. Preserve its teaching
sequence, claims, distinctions, examples, tone, and level of detail.

Translate:

- titles, hooks, headings, paragraphs, lists, tables, callouts, captions, and
  human-readable Mermaid labels
- the values of `Type`, `Prerequisites`, and `Time` when a natural localized
  form is useful
- code comments and displayed output only when doing so does not change
  executable behavior or a literal being taught

Keep unchanged:

- Markdown syntax and heading levels
- `**Type:**`, `**Languages:**`, `**Prerequisites:**`, and `**Time:**` field
  keys — the key stays English *inside* the bold markers, exactly as written;
  the site localizes the visible label itself and automation depends on the key
- fenced-code language tags and the code itself
- inline code, commands, paths, filenames, URLs, anchors, package names,
  API identifiers, model names, environment variables, and config keys
- equations, variable names, units, numerical values, citations, and link
  destinations
- Western/ASCII digits — do not convert to Persian-Indic, Arabic-Indic, or
  full-width numerals, even where that is conventional prose style
- image paths and Mermaid structure, identifiers, directives, and syntax

The first `# H1` in `docs/<language-code>.md` is the localized lesson title.
Keep exactly one title there and translate it independently from the English
`docs/en.md` title. `site/data.js` intentionally keeps the canonical English
title in the lesson's top-level `name` field and stores the localized title in
`i18n.<language-code>.name`; never hand-edit `site/data.js` or replace the
canonical English field with a translation.

Use the target language naturally rather than mirroring English word order.
On first use of a specialized term, prefer the globally conventional developer
term first, followed by a concise Persian explanation in parentheses:

```text
benchmark (معیارسنجی)
```

Afterward, keep the English developer term as the primary form and use the
Persian explanation only when it adds clarity. This is an English-origin
preservation rule, not a request to transliterate every word: use terms that
developers actually search for, type in terminals, and say in technical
conversation. Never invent facts, citations, examples, or explanations to make
the translation sound complete.
If the English source appears technically wrong or ambiguous, preserve the
meaning and report the issue separately instead of silently rewriting it.

### Standard section headings

The site recognizes the lesson's standard sections by their wording in order to
draw the Learning Objectives box, put the accent bar on Build/Use/Ship, and
place the quizzes. Reuse the wording already registered for your language
instead of inventing a synonym; if the language is new, or a lesson genuinely
needs different wording, register it in `SECTIONS` in `site/lesson.html`.
[site-integration.md](references/site-integration.md) lists the current table.

### Right-to-left languages

Write plain prose and let the browser handle direction. Specifically:

- Do not insert directional control characters (RLM/LRM/RLE/PDF) to "fix"
  punctuation or numbers. The site sets `dir` on the document and isolates
  code, identifiers, and numeric fractions in CSS.
- Do not mirror arrows or brackets in prose (`→`, `←`, `»`). Interface arrows
  live in `site/i18n-strings.js`, already pointing the right way per language.
- Leave fenced code, commands, and paths exactly as in the source. They render
  as left-to-right islands regardless of the page direction.

## Make the result AI- and learner-friendly

- Prefer direct, concrete sentences and explicit referents.
- Preserve definitions and causal language precisely: distinguish "causes,"
  "correlates with," "approximates," and "may."
- Keep prerequisites, inputs, outputs, constraints, and step order explicit.
- Retain repeated technical terms when repetition prevents ambiguity; do not
  replace them with creative synonyms.
- Preserve the lesson's "Build It / Use It" distinction.
- Keep paragraphs focused and lists parallel without adding new sections.
- Maintain searchable English terminology on first mention.

### Developer-facing Persian terminology

When the target language is Persian (`fa`), optimize for readers who will
search documentation and terminal output in English. Keep established tool and
workflow nouns in English. For a term that benefits from explanation, put the
conventional English developer term first and the Persian meaning in
parentheses on first use. Prefer these conventions consistently across lessons:

| Concept | Preferred Persian rendering | Avoid |
| --- | --- | --- |
| toolchain | toolchain (زنجیرهٔ ابزار) | زنجیره‌ابزارهای چسبیده |
| runtime | runtime (محیط اجرا) | زمان اجرای زبان |
| package manager | package manager (مدیر بسته) | مدیر بسته‌ها when the English term is needed for search |
| build | build (ساخت) | ساخت when it makes a technical build sound like a generic construction |
| prompt | prompt (درخواست/دستور) | اعلان (which means a notification) |
| performance-critical | performance-critical (نیازمند کارایی بالا) | حساس به کارایی |
| training-heavy | training-heavy (آموزش مدل سنگین) | سنگین از نظر آموزش |
| benchmark | benchmark (معیارسنجی) | ترجمهٔ مبهمی مثل آزمون در متن سنجش کارایی |
| speedup | speedup (افزایش سرعت) | حذف اصطلاح انگلیسی در گزارش عملکرد |
| tensor operation | tensor operation (عملیات تانسور) | عملیات تانسور without the searchable English term |
| verification script | verification script (اسکریپت بررسی) | اسکریپت بررسی when the artifact is a developer command |
| GPU acceleration | GPU acceleration (شتاب‌دهی GPU) | شتاب‌دهی GPU without the searchable English term |
| GPU backend | GPU backend (بک‌اند GPU) | بک‌اند GPU without the searchable English term |
| training run | training run (اجرای آموزش) | اجرای آموزشی when referring to one model run |
| local GPU / cloud GPU | local GPU (GPU محلی) / cloud GPU (GPU ابری) | GPU محلی or GPU ابری without the origin term on first use |
| dataset | dataset (مجموعه‌داده) | مجموعه‌داده without the searchable English term |
| notebook | notebook (نوت‌بوک) | دفترچه when referring to a computational notebook |
| quick experiment | quick experiment (آزمایش سریع) | آزمایش سریع without the origin term on first use |
| reproducible build | reproducible build (build قابل‌بازتولید) | ساخت بازتولیدپذیر when the build workflow is meant |
| standard build | standard build (build معمولی) | ساخت ساده when referring to a package or binary build |
| package | package (بسته) | بستهٔ نرم‌افزاری without the origin term on first use |
| dependency resolver | dependency resolver (حل‌کنندهٔ وابستگی) | حل‌کنندهٔ وابستگی without the origin term |
| Python package installer | Python package installer (نصب‌کنندهٔ packageهای Python) | نصب‌کنندهٔ بستهٔ Python without the origin term |
| course repository | course repository (مخزن دوره) | مخزن دوره without the origin term on first use |
| daily workflow | daily workflow (گردش‌کار روزانه) | گردش‌کار روزانه without the origin term on first use |
| version control | version control (کنترل نسخه) | کنترل نسخه without the origin term on first use |
| workflow | workflow (گردش‌کار) | گردش‌کار without the origin term on first use |
| codebase | codebase (پایه‌کد) | کد مشترک when referring to a repository's codebase |
| dependency | dependency (وابستگی) | وابستگی without the origin term on first use |
| model checkpoint | model checkpoint (checkpoint مدل) | checkpoint مدل without the origin term on first use |
| system RAM | system RAM (RAM سیستم) | RAM اصلی without the origin term on first use |
| video memory | video memory (حافظهٔ ویدیویی) | حافظهٔ ویدیویی without the origin term on first use |
| parallel computing platform | parallel computing platform (سکوی محاسبات موازی) | سکوی محاسبات موازی without the origin term |
| half precision | half precision (دقت نیمه) | دقت نیمه without the origin term on first use |
| command | command (فرمان) | فرمان when the command itself is the subject being taught |
| flag | flag (پرچم) | پرچم without the origin term on first use |
| switch | switch (سوئیچ) | سوئیچ without the origin term on first use |
| rule of thumb | rule of thumb (قاعدهٔ سرانگشتی) | قاعدهٔ سرانگشتی without the origin term on first use |
| maintainer, fork, clone, commit, push, checkpoint, snapshot | keep the English term in developer prose | forced literal translations that hide the searchable term |
| branch | branch (شاخه) | شاخه without the searchable English term |
| merge | merge (ادغام) | ادغام without the searchable English term |
| remote (repository) | remote repository (مخزن راه‌دور) | مخزن راه دور without the ZWNJ |
| staging area | staging area (ناحیهٔ آماده‌سازی) | استیج |
| repository | repository (مخزن) on first use, then repository or مخزن | ریپازیتوری |
| history | history (تاریخچه) | تاریخ, which reads as a calendar date |
| binary file | binary file (فایل باینری) | فایل دودویی |
| container runtime | container runtime (runtime کانتینر) | زمان اجرای کانتینر |
| language runtimes (stack layer) | language runtimeها (runtimeهای زبان) | زمان‌های اجرای زبان |
| system foundation (stack layer) | زیربنای سیستم | — |

Do not translate shell commands, flags, paths, filenames, API names, or code
identifiers. In explanatory Persian, keep the English developer term visible
and attach Persian grammar only when necessary (for example, `runtime`ها or
`commit`ها). Do not hide the origin term behind a Persian-only translation.

### Mandatory terminology feedback loop

Translation decisions are reusable project knowledge, not one-off wording
choices. During every translation or review:

1. Search existing `docs/<language-code>.md` files for the technical term or
   phrase before selecting a rendering.
2. If you discover a reusable term, ambiguity, or recurring pattern that is
   not already covered here, update this skill in the same change before
   finishing. Record the source term, preferred rendering, avoided rendering,
   and the reason for the choice.
3. Put language-specific decisions under that language's section (for example,
   the Persian developer terminology table); put cross-language rules in the
   general guidance above.
4. Apply the new rule consistently across every lesson in the requested scope,
   and search that scope for older inconsistent forms.
5. Report the terminology rule in the completion summary so future reviewers
   can distinguish an intentional convention from an accidental translation.

Never leave a reusable terminology decision only in a lesson file. If no new
reusable pattern was found, say so explicitly in the completion report.

## Validate before finishing

Read [quality-checks.md](references/quality-checks.md) and apply every relevant
check. At minimum:

1. Compare the source and translation structurally.
2. Confirm every code fence has the same language tag and balanced delimiters.
3. Confirm links, image paths, inline code, equations, numbers, and identifiers
   were not altered accidentally.
4. Confirm the lesson-contract fields remain present and `Languages` still
   matches the source.
5. Confirm exactly one `# H1` and one leading `> blockquote` — the site uses
   them as the localized lesson title and summary.
6. Search for untranslated prose, placeholder text, translation notes, and
   accidental additions.
7. For a translated quiz, confirm `stage`, `correct`, and the option order and
   count are unchanged from the source, and that code-literal options were left
   untranslated.
8. Run `node site/build.js`. It discovers the new files and records them in
   `site/data.js`; confirm the run reports your language under
   "Translated lessons" and "Translated quizzes" with the counts you expect, and
   that it printed no ⚠️ quiz-mismatch warnings. For each translated lesson,
   verify that top-level `name` still matches `docs/en.md` while
   `i18n.<language-code>.name` matches the first H1 in the translated file.
9. Run `python3 scripts/audit_lessons.py` after repository changes.
10. Review `git diff --check` and the final diff. Never hand-edit generated
   files — `site/data.js`, `site/sitemap.xml`, `site/llms.txt`,
   `site/build-meta.js`, and the lesson counts in README and the site pages are
   all rewritten by `site/build.js`.

To see the page rather than the Markdown, follow the preview steps in
[site-integration.md](references/site-integration.md). Serve the repository root
(not `site/`) and `lesson.html` reads your working tree directly, so no commit is
needed to review your own rendering.

Report the target language, translated files, validation performed, whether the
interface strings were localized or left English, and any source ambiguity. Do
not claim fluency or validation that was not performed.
