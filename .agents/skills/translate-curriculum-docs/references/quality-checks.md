# Translation Quality Checks

Use this checklist for every translated lesson.

## Structural parity

- Keep exactly one top-level title, and make it the lesson title — the site
  reads it as the localized name for the sidebar, catalog, and search.
- After `node site/build.js`, verify the metadata split: the lesson's top-level
  `name` remains the English title from `docs/en.md`, while
  `i18n.<language-code>.name` equals the first H1 from
  `docs/<language-code>.md`. Never hand-edit `site/data.js` to change this
  generated distinction.
- Keep the leading `> blockquote` motto; it becomes the lesson's summary and
  meta description. Stay under 180 characters or it is truncated.
- Preserve heading order and levels.
- Preserve blockquotes, ordered steps, unordered lists, tables, details
  blocks, and horizontal rules.
- Preserve the four lesson-contract keys and all learning-objective bullets.
- Keep every fenced block and its language tag.
- Use the section wording already registered for the language, so the
  Learning Objectives box, the Build/Use/Ship accent bars, and the quiz
  positions still resolve. See `site-integration.md`.

## Translated quizzes (`quiz.<language-code>.json`)

- `stage` is identical to the source for every question.
- `correct` is identical to the source for every question, and the options are
  translated **in place** — never reordered, added to, or dropped. `correct` is
  a positional index, so a re-sorted list marks the wrong answer right while
  looking entirely plausible.
- Option count matches; the renderer labels answers A–D by position.
- Options that are literally code or commands stay untranslated
  (`import torch; print(torch.cuda.is_available())`,
  `git add, git commit, git push`) — the command is the thing being tested.
- No Markdown. Quiz strings are rendered as plain text, so backticks and
  asterisks appear literally on screen. Use the target language's own quotation
  marks (`«…»` for Persian) where the English source used `'…'`.
- Terminology matches the lesson the quiz belongs to, not just the glossary —
  read that lesson's `docs/<language-code>.md` first.
- `node site/build.js` prints no ⚠️ quiz warnings and counts the quiz under
  "Translated quizzes".

Direction needs no attention: quiz text renders with `unicode-bidi: plaintext`
and `text-align: start`, so each question and each answer independently takes
the direction and alignment implied by its own content.

## Protected content

Compare source and target occurrences of:

- inline code and fenced code
- Markdown link destinations and image paths
- URLs, filesystem paths, commands, flags, and environment variables
- equations, symbols, variable names, numbers, percentages, units, and dates
- library, protocol, model, dataset, metric, and API names
- citations and standards identifiers such as RFC numbers

Numerals stay ASCII, including inside prose.

The contract keys keep their English spelling inside the bold markers —
`**Type:**`, not `**نوع:**` and not `**Type**:`. Only the value is translated.

Translate human-readable Mermaid node labels only when syntax remains valid.
Do not translate Mermaid IDs, directives, class names, or edge syntax.

## Language quality

- Use terminology conventional to the target-language technical community.
- Introduce a localized specialist term with its English form on first use
  when that improves searchability or removes ambiguity.
- Keep one translation per concept throughout the lesson and neighboring
  translations.
- Search existing translations before introducing a technical term. If a new
  reusable terminology rule is needed, record the source term, preferred form,
  avoided form, and rationale in `../SKILL.md` in the same change.
- For Persian developer lessons, make the globally conventional English term
  primary on first use and put the Persian explanation in parentheses, for
  example `benchmark (معیارسنجی)`. Do not make a Persian-only technical term
  the primary searchable form.
- Prefer natural target-language grammar over literal English syntax.
- Preserve certainty, negation, comparison, scope, and causal meaning.
- Avoid unexplained slang, promotional intensifiers, and added claims.

## Bidirectional text

For right-to-left languages, confirm the file contains no directional control
characters (U+200E, U+200F, U+202A–U+202E, U+2066–U+2069). The site sets the
document direction and isolates code, identifiers, and numeric fractions in
CSS; hand-inserted marks fight that and misrender elsewhere.

```bash
# grep -P is unavailable on stock macOS, so scan with Python.
python3 -c "import re,sys; p=sys.argv[1]; \
print([i for i,l in enumerate(open(p,encoding='utf-8'),1) \
if re.search(r'[\u200e\u200f\u202a-\u202e\u2066-\u2069]',l)] or 'clean')" \
  phases/<phase>/<lesson>/docs/<lang>.md
```

Prose arrows and brackets are not mirrored by hand either — interface arrows
live in `site/i18n-strings.js`.

## Build and render

- `node site/build.js` reports the language under "Translated lessons" with the
  expected count.
- `python3 scripts/audit_lessons.py` reports no issues.
- `git diff --check` is clean, and no generated file was hand-edited.
- The page itself was loaded with `?lang=<code>` and checked against the render
  list in `site-integration.md`, or the report says explicitly that it was not.

## Final review

Read the translation alone as a learner, then compare it paragraph by
paragraph with the English source. Confirm nothing was skipped, duplicated,
softened, strengthened, or fabricated. List unresolved source ambiguities in
the completion report rather than embedding translator notes in the lesson.
