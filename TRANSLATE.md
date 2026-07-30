# Translate a Lesson

Use this short workflow to translate a lesson and submit a pull request.

## 1. Fork and Clone

Fork [mrbadri/ai-engineering-from-scratch](https://github.com/mrbadri/ai-engineering-from-scratch),
then clone your fork:

```bash
git clone https://github.com/<your-user>/ai-engineering-from-scratch.git
cd ai-engineering-from-scratch
git checkout -b translate-fa-lesson-name
```

## 2. Use the Translation Skill

Ask your AI agent to use:

```text
.agents/skills/translate-curriculum-docs
```

Example:

```text
Use .agents/skills/translate-curriculum-docs to translate
phases/00-setup-and-tooling/04-apis-and-keys into Persian.
Translate the lesson and quiz, then run all required checks.
```

The translated files should be:

```text
phases/<phase>/<lesson>/docs/fa.md
phases/<phase>/<lesson>/quiz.fa.json
```

Replace `fa` with the correct language code for another language.

## 3. Follow the Important Rules

- Translate prose, headings, tables, lists, and quiz text.
- Do not change code, commands, paths, URLs, identifiers, or numbers.
- Keep `**Type:**`, `**Languages:**`, `**Prerequisites:**`, and `**Time:**`
  written in English.
- Keep quiz stages, answer indices, questions, and options in the same order.
- Do not translate files inside `code/` or `outputs/`.
- For Persian, keep the English `# H1` lesson title unchanged.
- Keep searchable English technical terms when useful.
- If you create a reusable terminology rule, add it to
  `.agents/skills/translate-curriculum-docs/SKILL.md`.

## 4. Test

Run:

```bash
node site/build.js
python3 scripts/audit_lessons.py
git diff --check
```

The build should show your language under `Translated lessons` and `Translated
quizzes` without warnings.

Preview the lesson:

```bash
python3 -m http.server 8000
```

Run the command from the repository root, then open:

```text
http://localhost:8000/site/lesson.html?path=phases/<phase>/<lesson>&lang=fa
```

Check the layout, RTL direction, code blocks, diagrams, and quiz answers.

Do not commit generated site files. After testing, run:

```bash
git restore site/data.js
git status --short
```

## 5. Commit and Push

Stage only the translation files:

```bash
git add phases/<phase>/<lesson>/docs/fa.md
git add phases/<phase>/<lesson>/quiz.fa.json
git commit -m "feat(phase-00/04): add Persian translation"
git push -u origin translate-fa-lesson-name
```

Use one commit per translated lesson.

## 6. Open a Pull Request

Open a pull request to:

```text
https://github.com/mrbadri/ai-engineering-from-scratch
```

In the pull request, list:

- the translated lesson and language
- the checks you ran
- whether you added a terminology rule

Before submitting, confirm:

- [ ] I used `.agents/skills/translate-curriculum-docs`
- [ ] The lesson and quiz are translated
- [ ] Code and identifiers are unchanged
- [ ] Tests pass
- [ ] Generated files are not included
