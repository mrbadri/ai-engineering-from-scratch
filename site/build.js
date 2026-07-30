#!/usr/bin/env node
/**
 * Build script for AI Engineering from Scratch website.
 * Parses README.md, ROADMAP.md, and glossary/terms.md from the repo root
 * and generates data.js with all phase/lesson/glossary data.
 *
 * Run: node site/build.js
 * Called automatically by GitHub Actions on every push.
 */

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');
const README_PATH = path.join(REPO_ROOT, 'README.md');
const ROADMAP_PATH = path.join(REPO_ROOT, 'ROADMAP.md');
const GLOSSARY_PATH = path.join(REPO_ROOT, 'glossary', 'terms.md');
const OUTPUT_PATH = path.join(__dirname, 'data.js');

const GITHUB_BASE = 'https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/';
const SITE_ORIGIN = 'https://aiengineeringfromscratch.com';
const DEFAULT_REPO_SLUG = 'rohitg00/ai-engineering-from-scratch';

// Languages the site *chrome* is translated into, besides English. Keep this
// in step with the LANGS registry in site/i18n.js — it drives which localized
// URLs go into sitemap.xml. Lesson bodies are listed per lesson instead, from
// whichever docs/<lang>.md files actually exist.
const SITE_LANGS = ['fa'];

// GITHUB_BASE lesson url -> site path "phases/<phase>/<lesson>"
function lessonPath(url) {
  if (!url) return null;
  const m = url.match(/(phases\/[^/]+\/[^/]+)\/?$/);
  return m ? m[1] : null;
}

// ─── Parse ROADMAP.md for lesson statuses ────────────────────────────
function parseRoadmap(content) {
  const statuses = {}; // { "Phase 0": { phaseStatus, lessons: { "Dev Environment": "complete" } } }
  let currentPhase = null;
  let currentPhaseStatus = null;

  for (const line of content.split(/\r?\n/)) {
    // Match phase headers like: ## Phase 0: Setup & Tooling — ✅
    const phaseMatch = line.match(/^##\s+Phase\s+(\d+).*?—\s*(✅|🚧|⬚)/);
    if (phaseMatch) {
      const phaseId = parseInt(phaseMatch[1]);
      const statusEmoji = phaseMatch[2];
      currentPhaseStatus = statusEmoji === '✅' ? 'complete' : statusEmoji === '🚧' ? 'in-progress' : 'planned';
      currentPhase = `Phase ${phaseId}`;
      statuses[currentPhase] = { phaseStatus: currentPhaseStatus, lessons: {} };
      continue;
    }

    // Match lesson rows like: | 01 | Dev Environment | ✅ |
    if (currentPhase) {
      const lessonMatch = line.match(/^\|\s*\d+\s*\|\s*(.+?)\s*\|\s*(✅|🚧|⬚)\s*\|/);
      if (lessonMatch) {
        const lessonName = lessonMatch[1].trim();
        const statusEmoji = lessonMatch[2];
        const status = statusEmoji === '✅' ? 'complete' : statusEmoji === '🚧' ? 'in-progress' : 'planned';
        statuses[currentPhase].lessons[lessonName] = status;
      }
    }
  }

  return statuses;
}

// ─── Parse README.md for phases and lessons ──────────────────────────
function parseReadme(content, roadmapStatuses) {
  const phases = [];

  // Split into phase blocks
  // Phase 0 is in a <table> block, phases 1-19 are in <details> blocks
  // We'll parse line by line to extract phase headers and lesson tables

  const lines = content.split(/\r?\n/);
  let currentPhase = null;
  let inLessonTable = false;
  let isCapstoneTable = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Match Phase header - multiple formats supported:
    // Old: ### Phase 0: Setup & Tooling `12 lessons`
    // Old: <summary><strong>Phase 1: Math Foundations</strong> <code>22 lessons</code> ... <em>Description</em></summary>
    // New: ### ![](https://img.shields.io/badge/Phase_0-Setup_&_Tooling-95A5A6?style=for-the-badge) `12 lessons`
    // New: <summary><b>🟣 Phase 1 — Math Foundations</b> &nbsp;<code>22 lessons</code>&nbsp; <em>Description</em></summary>
    const phaseHeaderMatch =
      line.match(/###\s+Phase\s+(\d+):\s+(.+?)\s*`(\d+)\s+lessons?`/) ||
      line.match(/###\s+!\[\]\([^)]*?Phase[_\s]+(\d+)[-_]([^?)]+?)-[A-F0-9]{6}[^)]*\)\s*`(\d+)\s+lessons?`/i);
    const detailsHeaderMatch =
      line.match(/<summary><strong>Phase\s+(\d+):\s+(.+?)<\/strong>\s*<code>(\d+)\s+(?:lessons?|projects?)<\/code>.*?<em>(.*?)<\/em>/) ||
      line.match(/<summary>\s*<b>\s*(?:[^\w\s]+\s+)?Phase\s+(\d+)\s*[—\-:]\s*(.+?)<\/b>.*?<code>(\d+)\s+(?:lessons?|projects?)<\/code>.*?<em>(.*?)<\/em>/);

    if (phaseHeaderMatch) {
      const [, idStr, rawName] = phaseHeaderMatch;
      const id = parseInt(idStr);
      const name = rawName.replace(/_/g, ' ').trim();
      // Look for the description on the next line (blockquote)
      let desc = '';
      for (let j = i + 1; j < Math.min(i + 5, lines.length); j++) {
        if (lines[j].startsWith('>')) {
          desc = lines[j].replace(/^>\s*/, '').trim();
          break;
        }
      }
      const roadmapKey = `Phase ${id}`;
      const phaseStatus = roadmapStatuses[roadmapKey]?.phaseStatus || 'planned';
      currentPhase = { id, name: name.trim(), status: phaseStatus, desc, lessons: [] };
      phases.push(currentPhase);
      inLessonTable = false;
      continue;
    }

    if (detailsHeaderMatch) {
      const [, idStr, name, , desc] = detailsHeaderMatch;
      const id = parseInt(idStr);
      const roadmapKey = `Phase ${id}`;
      const phaseStatus = roadmapStatuses[roadmapKey]?.phaseStatus || 'planned';
      currentPhase = { id, name: name.trim(), status: phaseStatus, desc: desc?.trim() || '', lessons: [] };
      phases.push(currentPhase);
      inLessonTable = false;
      continue;
    }

    // Detect start of lesson table
    if (currentPhase && line.match(/^\|\s*#\s*\|\s*Lesson/)) {
      inLessonTable = true;
      isCapstoneTable = false;
      continue;
    }

    // Skip table separator
    if (inLessonTable && line.match(/^\|[\s:|-]+\|$/)) {
      continue;
    }

    // Parse lesson rows
    if (inLessonTable && currentPhase && line.startsWith('|')) {
      // | 01 | [Dev Environment](phases/00-setup-and-tooling/01-dev-environment/) | Build | Python, Node, Rust |
      // | 02 | Multi-Layer Networks & Forward Pass | Build | Python |
      const cols = line.split('|').map(c => c.trim()).filter(c => c.length > 0);
      if (cols.length >= 4) {
        const lessonCol = cols[1];
        const typeRaw = cols[2];
        const langRaw = cols[3];

        // Type may be plain ("Build") or a shield image: ![Build](https://...)
        const typeBadgeMatch = typeRaw.match(/!\[([^\]]+)\]/);
        const type = typeBadgeMatch ? typeBadgeMatch[1] : typeRaw;

        // Lang may be plain ("Python, Rust") or emoji flags (🐍 🟦 🦀 🟣 ⚛️)
        const EMOJI_LANG = {
          '🐍': 'Python',
          '🟦': 'TypeScript',
          '🦀': 'Rust',
          '🟣': 'Julia',
          '⚛️': 'React',
          '⚛': 'React',
        };
        let lang = langRaw;
        if (/[\uD800-\uDBFF\u2600-\u27BF\u1F300-\u1FAFF]/.test(langRaw) || /[🐍🟦🦀🟣⚛]/u.test(langRaw)) {
          const tokens = Array.from(langRaw)
            .map(ch => EMOJI_LANG[ch])
            .filter(Boolean);
          if (tokens.length) lang = [...new Set(tokens)].join(', ');
          else if (langRaw.trim() === '—' || langRaw.trim() === '-') lang = '';
        }
        if (lang === '—' || lang === '-') lang = '';

        // Check if lesson has a link (meaning it has content)
        const linkMatch = lessonCol.match(/\[(.+?)\]\((.+?)\)/);
        let lessonName, url;
        if (linkMatch) {
          lessonName = linkMatch[1];
          const relativePath = linkMatch[2];
          url = GITHUB_BASE + relativePath.replace(/^\//, '');
        } else {
          lessonName = lessonCol;
          url = null;
        }

        // Get status from roadmap
        const roadmapKey = `Phase ${currentPhase.id}`;
        const roadmapPhase = roadmapStatuses[roadmapKey];
        let status = 'planned';
        if (roadmapPhase) {
          // Try to find matching lesson by fuzzy match
          const lessonNameClean = lessonName.replace(/[-–—:]/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();
          for (const [rName, rStatus] of Object.entries(roadmapPhase.lessons)) {
            const rNameClean = rName.replace(/[-–—:]/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();
            if (rNameClean.includes(lessonNameClean) || lessonNameClean.includes(rNameClean) ||
                rNameClean.split(' ').slice(0, 3).join(' ') === lessonNameClean.split(' ').slice(0, 3).join(' ')) {
              status = rStatus;
              break;
            }
          }
        }

        // If it has a link, it's at least complete (override roadmap if needed)
        if (url && status === 'planned') {
          status = 'complete';
        }

        // Capstone tables use the middle column for prerequisite phase tokens
        // (e.g., "P11 P13 P14"), not a Build/Learn enum. Keep `type` on the
        // Build/Learn axis so CSS selectors (data-type="Build"/"Learn") stay
        // valid, and emit the prereq string in a dedicated `combines` field.
        const lessonEntry = {
          name: lessonName.trim(),
          status,
          type: isCapstoneTable ? 'Capstone' : type.trim(),
          lang: lang.trim() || '—',
          ...(isCapstoneTable && { combines: type.trim() }),
          ...(url && { url }),
        };
        currentPhase.lessons.push(lessonEntry);
      }
    }

    // End of table
    if (inLessonTable && (line.match(/<\/td>/) || line.match(/<\/details>/) || (line.trim() === '' && i + 1 < lines.length && !lines[i + 1].startsWith('|')))) {
      inLessonTable = false;
    }

    // Also detect capstone table format (# | Project | Combines | Lang)
    if (currentPhase && line.match(/^\|\s*#\s*\|\s*Project/)) {
      inLessonTable = true;
      isCapstoneTable = true;
      continue;
    }
  }

  return phases;
}

// ─── Extract lesson metadata from docs/<lang>.md ─────────────────────
/**
 * Per-lesson doc fields read out of the Markdown:
 *   name     — the `# H1` heading (the lesson title in that language).
 *   summary  — first `> blockquote` line (the lesson's one-liner motto).
 *   keywords — all `### H3` heading texts joined by ' · '.
 *              H3 headings are the densest vocabulary in a lesson doc
 *              (e.g. "Scaled dot-product · Causal masking · KV cache"),
 *              so they extend search coverage without bloating data.js.
 *
 * Fields come back empty when the file is absent or has no matching
 * content — expected for planned lessons with no docs yet.
 */
// A lesson's docs/ directory holds en.md plus one file per translation
// (fa.md, es.md, …), named by ISO 639-1 code with an optional region subtag.
const DOC_LANG_FILE = /^([a-z]{2}(?:-[a-z]{2})?)\.md$/i;
const SOURCE_LANG = 'en';

/**
 * Read one lesson doc in a single pass.
 *
 * Adds `name` to the fields above: the `# H1` heading, i.e. the lesson title
 * as written in that language. The site uses it to localize titles in the
 * sidebar, catalog, and search without needing a separate translation table.
 *
 * Returns null when the file is absent or unreadable — expected for planned
 * lessons with no docs, and for every language not yet translated.
 */
function extractDocMeta(docPath) {
  let lines;
  try {
    lines = fs.readFileSync(docPath, 'utf8').split(/\r?\n/);
  } catch (_) {
    return null;
  }
  const result = { name: '', summary: '', keywords: '' };
  const h3s = [];
  for (const raw of lines) {
    const line = raw.trim();
    if (!result.name && line.startsWith('# ')) {
      result.name = line.slice(2).trim();
    }
    if (!result.summary && line.startsWith('> ') && line.length > 3) {
      const s = line.slice(2).trim();
      result.summary = s.length > 180 ? s.slice(0, 177) + '…' : s;
    }
    if (line.startsWith('### ')) {
      const heading = line.slice(4).trim();
      if (heading) h3s.push(heading);
    }
  }
  if (h3s.length) result.keywords = h3s.join(' · ');
  return result;
}

// Quiz translations sit beside the lesson: quiz.json is the English source and
// quiz.<lang>.json is a translation of it.
const QUIZ_LANG_FILE = /^quiz\.([a-z]{2}(?:-[a-z]{2})?)\.json$/i;

/**
 * Which languages this lesson's quiz is translated into.
 *
 * Also sanity-checks each translation against the source, because a quiz that
 * drifts structurally fails silently in the browser: a changed `correct` index
 * marks the wrong answer as right, and a dropped question simply disappears.
 */
function extractQuizLangs(relPath) {
  const lessonDir = path.join(REPO_ROOT, relPath);
  const langs = [];

  let source;
  try {
    source = JSON.parse(fs.readFileSync(path.join(lessonDir, 'quiz.json'), 'utf8'));
  } catch (_) {
    return langs; // no source quiz — nothing to translate against
  }
  const sourceQuestions = (source && source.questions) || source || [];

  let files;
  try {
    files = fs.readdirSync(lessonDir).sort();
  } catch (_) {
    return langs;
  }

  for (const file of files) {
    const match = file.match(QUIZ_LANG_FILE);
    if (!match) continue;
    const code = match[1].toLowerCase();
    if (code === SOURCE_LANG) continue;

    const label = `${relPath}/${file}`;
    let translated;
    try {
      translated = JSON.parse(fs.readFileSync(path.join(lessonDir, file), 'utf8'));
    } catch (err) {
      console.warn(`⚠️  ${label}: invalid JSON, skipped (${err.message})`);
      continue;
    }
    const questions = (translated && translated.questions) || translated || [];

    if (questions.length !== sourceQuestions.length) {
      console.warn(`⚠️  ${label}: ${questions.length} questions, source has ${sourceQuestions.length}`);
    } else {
      questions.forEach((q, i) => {
        const src = sourceQuestions[i];
        if (q.correct !== src.correct) {
          console.warn(`⚠️  ${label} Q${i + 1}: correct=${q.correct}, source has ${src.correct}`);
        }
        if (q.stage !== src.stage) {
          console.warn(`⚠️  ${label} Q${i + 1}: stage="${q.stage}", source has "${src.stage}"`);
        }
        if ((q.options || []).length !== (src.options || []).length) {
          console.warn(`⚠️  ${label} Q${i + 1}: ${(q.options || []).length} options, ` +
            `source has ${(src.options || []).length}`);
        }
      });
    }

    langs.push(code);
  }

  return langs;
}

/**
 * Read every language variant of one lesson's docs.
 *
 * `summary`/`keywords` stay top-level and English so existing consumers are
 * unchanged. Translations land in two new fields: `langs` (which languages
 * exist — the site reads this to decide whether to fall back to English) and
 * `i18n` (localized title/summary/keywords, keyed by language code).
 */
function extractLessonMeta(relPath) {
  const docsDir = path.join(REPO_ROOT, relPath, 'docs');
  const result = { summary: '', keywords: '', langs: [], i18n: {} };

  const source = extractDocMeta(path.join(docsDir, `${SOURCE_LANG}.md`));
  if (source) {
    result.summary = source.summary;
    result.keywords = source.keywords;
  }

  let files;
  try {
    files = fs.readdirSync(docsDir).sort();
  } catch (_) {
    return result; // no docs/ directory — planned lesson
  }

  for (const file of files) {
    const match = file.match(DOC_LANG_FILE);
    if (!match) continue;
    const code = match[1].toLowerCase();
    if (code === SOURCE_LANG) continue;

    const meta = extractDocMeta(path.join(docsDir, file));
    if (!meta) continue;
    result.langs.push(code);

    const entry = {};
    if (meta.name) entry.name = meta.name;
    if (meta.summary) entry.summary = meta.summary;
    if (meta.keywords) entry.keywords = meta.keywords;
    if (Object.keys(entry).length) result.i18n[code] = entry;
  }

  return result;
}

// ─── Parse glossary/terms.md ──────────────────────────────────────────
function parseGlossary(content) {
  const terms = [];
  let currentTerm = null;

  for (const line of content.split(/\r?\n/)) {
    // Match term headers: ### Agent or ### Adam (Optimizer)
    const termMatch = line.match(/^###\s+(.+)/);
    if (termMatch) {
      if (currentTerm && currentTerm.says && currentTerm.means) {
        terms.push(currentTerm);
      }
      currentTerm = { term: termMatch[1].trim(), says: '', means: '' };
      continue;
    }

    if (!currentTerm) continue;

    // Match "What people say" line
    const saysMatch = line.match(/\*\*What people say:\*\*\s*"?(.+?)"?\s*$/);
    if (saysMatch) {
      currentTerm.says = saysMatch[1].replace(/^"/, '').replace(/"$/, '').trim();
      continue;
    }

    // Match "What it actually means" line
    const meansMatch = line.match(/\*\*What it actually means:\*\*\s*(.+)/);
    if (meansMatch) {
      currentTerm.means = meansMatch[1].trim();
      continue;
    }
  }

  // Push the last term
  if (currentTerm && currentTerm.says && currentTerm.means) {
    terms.push(currentTerm);
  }

  return terms;
}

// ─── Discover outputs/ artifacts (skills / prompts / agents) ──────────
function parseFrontmatter(text) {
  if (!text.startsWith('---')) return null;
  const end = text.indexOf('\n---', 4);
  if (end === -1) return null;
  const block = text.slice(4, end);
  const result = {};
  for (const raw of block.split(/\r?\n/)) {
    const line = raw.trimEnd();
    if (!line || line.startsWith('#') || !line.includes(':')) continue;
    const idx = line.indexOf(':');
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (value.startsWith('[') && value.endsWith(']')) {
      const inner = value.slice(1, -1).trim();
      result[key] = inner
        ? inner.split(',').map(s => s.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean)
        : [];
    } else if ((value.startsWith('"') && value.endsWith('"')) ||
               (value.startsWith("'") && value.endsWith("'"))) {
      result[key] = value.slice(1, -1);
    } else {
      result[key] = value;
    }
  }
  return result;
}

function discoverArtifacts() {
  const artifacts = [];
  const phasesDir = path.join(REPO_ROOT, 'phases');
  if (!fs.existsSync(phasesDir)) return artifacts;
  const VALID_TYPES = ['skill', 'prompt', 'agent'];
  for (const phaseDirName of fs.readdirSync(phasesDir).sort()) {
    const phaseMatch = phaseDirName.match(/^([0-9]{2})-([a-z0-9-]+)$/);
    if (!phaseMatch) continue;
    const phaseId = parseInt(phaseMatch[1], 10);
    const phaseDir = path.join(phasesDir, phaseDirName);
    for (const lessonDirName of fs.readdirSync(phaseDir).sort()) {
      const lessonMatch = lessonDirName.match(/^([0-9]{2})-([a-z0-9-]+)$/);
      if (!lessonMatch) continue;
      const lessonId = parseInt(lessonMatch[1], 10);
      const lessonRel = `phases/${phaseDirName}/${lessonDirName}`;
      const outputsDir = path.join(phaseDir, lessonDirName, 'outputs');
      if (fs.existsSync(outputsDir)) {
        for (const file of fs.readdirSync(outputsDir).sort()) {
          if (!file.endsWith('.md')) continue;
          const stem = file.replace(/\.md$/, '');
          const type = VALID_TYPES.find(t => stem.startsWith(`${t}-`));
          if (!type) continue;
          let meta = {};
          try {
            meta = parseFrontmatter(fs.readFileSync(path.join(outputsDir, file), 'utf8')) || {};
          } catch (_) {}
          artifacts.push({
            kind: type,
            name: (meta.name || stem).trim(),
            description: (meta.description || '').trim(),
            tags: Array.isArray(meta.tags) ? meta.tags : [],
            phase: phaseId,
            lesson: lessonId,
            lessonPath: lessonRel,
            file: `${lessonRel}/outputs/${file}`,
          });
        }
      }
      const missionPath = path.join(phaseDir, lessonDirName, 'mission.md');
      if (fs.existsSync(missionPath)) {
        let firstLine = '';
        try {
          firstLine = fs.readFileSync(missionPath, 'utf8').split(/\r?\n/)[0].replace(/^#\s+/, '').trim();
        } catch (_) {}
        artifacts.push({
          kind: 'mission',
          name: firstLine || `${lessonDirName} mission`,
          description: '',
          tags: [],
          phase: phaseId,
          lesson: lessonId,
          lessonPath: lessonRel,
          file: `${lessonRel}/mission.md`,
        });
      }
    }
  }
  return artifacts;
}

// ─── Main build ──────────────────────────────────────────────────────
// Write the git ref this deploy was built from, so lesson.html fetches docs
// from the right branch (PR previews render their own edits, not main).
function resolveRepoSlug() {
  const explicit = (process.env.AIFS_GITHUB_REPO || '').trim();
  if (/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(explicit)) return explicit;

  const owner = (process.env.VERCEL_GIT_REPO_OWNER || '').trim();
  const slug = (process.env.VERCEL_GIT_REPO_SLUG || '').trim();
  if (/^[A-Za-z0-9_.-]+$/.test(owner) && /^[A-Za-z0-9_.-]+$/.test(slug)) {
    return owner + '/' + slug;
  }
  return DEFAULT_REPO_SLUG;
}

function resolveRef() {
  let ref = process.env.VERCEL_GIT_COMMIT_REF || '';
  if (!ref) {
    try {
      ref = require('child_process')
        .execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' })
        .trim();
    } catch (e) { ref = ''; }
  }
  if (!ref || ref === 'HEAD') ref = 'main';
  return ref;
}

function writeBuildMeta() {
  const ref = resolveRef();
  const repo = resolveRepoSlug();
  const js = '// Auto-generated by build.js on each deploy — do not edit.\n'
    + 'window.__AIFS_REPO = ' + JSON.stringify(repo) + ';\n'
    + 'window.__AIFS_REF = ' + JSON.stringify(ref) + ';\n';
  fs.writeFileSync(path.join(__dirname, 'build-meta.js'), js, 'utf8');
  console.log('   wrote build-meta.js (repo: ' + repo + ', ref: ' + ref + ')');
}

function build() {
  console.log('📖 Reading source files...');
  writeBuildMeta();

  const readme = fs.readFileSync(README_PATH, 'utf8');
  const roadmap = fs.readFileSync(ROADMAP_PATH, 'utf8');
  const glossary = fs.readFileSync(GLOSSARY_PATH, 'utf8');

  console.log('🔍 Parsing ROADMAP.md...');
  const roadmapStatuses = parseRoadmap(roadmap);

  console.log('🔍 Parsing README.md...');
  const phases = parseReadme(readme, roadmapStatuses);

  console.log('🔍 Parsing glossary/terms.md...');
  const glossaryTerms = parseGlossary(glossary);

  console.log('🔍 Discovering outputs + Phase 14 missions...');
  const artifacts = discoverArtifacts();

  console.log('📚 Extracting lesson summaries + keywords + translations from docs/...');
  let summarized = 0, withKeywords = 0;
  const translationCounts = {}; // lang code -> lessons translated
  const quizCounts = {};        // lang code -> quizzes translated
  for (const phase of phases) {
    for (const lesson of phase.lessons) {
      if (lesson.url) {
        const relPath = lesson.url.replace(GITHUB_BASE, '').replace(/\/+$/, '');
        const meta = extractLessonMeta(relPath);
        if (meta.summary)  { lesson.summary  = meta.summary;  summarized++;   }
        if (meta.keywords) { lesson.keywords = meta.keywords; withKeywords++; }
        if (meta.langs.length) {
          lesson.langs = meta.langs;
          lesson.i18n = meta.i18n;
          for (const code of meta.langs) {
            translationCounts[code] = (translationCounts[code] || 0) + 1;
          }
        }
        // Quiz translations are tracked separately: a lesson's prose and its
        // quiz are translated by different passes and either can land first.
        const quizLangs = extractQuizLangs(relPath);
        if (quizLangs.length) {
          lesson.quizLangs = quizLangs;
          for (const code of quizLangs) {
            quizCounts[code] = (quizCounts[code] || 0) + 1;
          }
        }
      }
    }
  }

  // Stats
  let totalLessons = 0;
  let completeLessons = 0;
  phases.forEach(p => {
    totalLessons += p.lessons.length;
    completeLessons += p.lessons.filter(l => l.status === 'complete').length;
  });

  console.log(`\n📊 Stats:`);
  console.log(`   Phases: ${phases.length}`);
  console.log(`   Lessons: ${totalLessons}`);
  console.log(`   Complete: ${completeLessons}`);
  console.log(`   Summaries: ${summarized}, Keywords: ${withKeywords}`);
  const translationSummary = Object.keys(translationCounts).sort()
    .map(code => `${code}: ${translationCounts[code]}`).join(', ');
  console.log(`   Translated lessons: ${translationSummary || 'none'}`);
  const quizSummary = Object.keys(quizCounts).sort()
    .map(code => `${code}: ${quizCounts[code]}`).join(', ');
  console.log(`   Translated quizzes: ${quizSummary || 'none'}`);
  console.log(`   Glossary terms: ${glossaryTerms.length}`);
  console.log(`   Artifacts: ${artifacts.length}`);

  // Generate data.js
  const output = `// Auto-generated by build.js — do not edit manually.
// Last built: ${new Date().toISOString()}

const PHASES = ${JSON.stringify(phases, null, 2)};

const GLOSSARY = ${JSON.stringify(glossaryTerms, null, 2)};

const ARTIFACTS = ${JSON.stringify(artifacts, null, 2)};
`;

  fs.writeFileSync(OUTPUT_PATH, output, 'utf8');
  console.log(`\n✅ Generated ${OUTPUT_PATH}`);

  syncCounts(totalLessons, phases.length, artifacts.length);
  syncReadme(totalLessons);
  writeSitemap(phases, glossaryTerms.length, SITE_LANGS);
  writeLlms(phases, glossaryTerms.length, artifacts.length);
}

// ─── sitemap.xml from the same PHASES the site renders ───────────────────
// The site is one set of pages that switch language via ?lang=, so each
// translated page is emitted as its own <url> and every variant of a page
// cross-references the others with xhtml:link alternates. Crawlers need both
// halves: the separate URL to index, and the alternates to know they are the
// same document in another language.
function writeSitemap(phases, glossaryCount, siteLangs) {
  const today = new Date().toISOString().slice(0, 10);

  // Chrome-only pages are translated for every language the site ships.
  const urls = [
    { loc: '/', priority: '1.0', freq: 'weekly', langs: siteLangs },
    { loc: '/catalog.html', priority: '0.8', freq: 'weekly', langs: siteLangs },
    { loc: '/prereqs.html', priority: '0.7', freq: 'monthly', langs: siteLangs },
  ];
  if (glossaryCount > 0) {
    urls.push({ loc: '/glossary.html', priority: '0.6', freq: 'monthly', langs: siteLangs });
  }
  for (const phase of phases) {
    for (const l of phase.lessons) {
      const p = lessonPath(l.url);
      // A lesson page only exists in a language once its docs/<lang>.md does.
      if (p) {
        urls.push({
          loc: '/lesson.html?path=' + p,
          priority: '0.6',
          freq: 'monthly',
          langs: Array.isArray(l.langs) ? l.langs : [],
        });
      }
    }
  }

  const esc = s => s.replace(/&/g, '&amp;');
  const localized = (loc, lang) =>
    lang === SOURCE_LANG ? loc : loc + (loc.includes('?') ? '&' : '?') + 'lang=' + lang;

  const entries = [];
  for (const u of urls) {
    const variants = [SOURCE_LANG, ...u.langs];
    const alternates = variants.map(lang =>
      `    <xhtml:link rel="alternate" hreflang="${lang}" ` +
      `href="${esc(SITE_ORIGIN + localized(u.loc, lang))}"/>`
    ).concat(
      `    <xhtml:link rel="alternate" hreflang="x-default" ` +
      `href="${esc(SITE_ORIGIN + u.loc)}"/>`
    ).join('\n');

    for (const lang of variants) {
      entries.push(
        `  <url>\n    <loc>${esc(SITE_ORIGIN + localized(u.loc, lang))}</loc>\n` +
        `${alternates}\n` +
        `    <lastmod>${today}</lastmod>\n    <changefreq>${u.freq}</changefreq>\n` +
        `    <priority>${u.priority}</priority>\n  </url>`
      );
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n` +
    `        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join('\n')}\n</urlset>\n`;
  fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), xml, 'utf8');
  console.log(`   wrote sitemap.xml (${entries.length} URLs)`);
}

// ─── llms.txt: a link-rich map of the curriculum for AI agents ───────────
function writeLlms(phases, glossaryCount, artifactCount) {
  const repo = resolveRepoSlug();
  const rawOrigin = 'https://raw.githubusercontent.com/' + repo + '/' + resolveRef();
  let total = 0;
  phases.forEach(p => { total += p.lessons.filter(l => lessonPath(l.url)).length; });
  let out = `# AI Engineering from Scratch\n\n`;
  out += `> A free, open-source curriculum that builds every core AI algorithm by hand — ${total} lessons across ${phases.length} phases, from linear algebra to autonomous agents. Python, TypeScript, Rust, Julia.\n\n`;
  out += `Canonical site: ${SITE_ORIGIN}\n`;
  out += `Source: https://github.com/${repo}\n`;
  out += `Glossary terms: ${glossaryCount} · Reusable outputs (prompts/skills/agents): ${artifactCount}\n\n`;
  out += `Lesson pages render client-side. Agents: fetch each lesson's raw markdown link; it is the full text. Lesson directories may also include code/ (runnable implementation) and quiz.json.\n\n`;
  out += `English is the source language. Lessons that carry a "raw <code>" link are also available in that language, both as docs/<code>.md and on the site at ?lang=<code>. Site languages: ${['en', ...SITE_LANGS].join(', ')}.\n\n`;
  for (const phase of phases) {
    out += `## Phase ${phase.id}: ${phase.name}\n`;
    if (phase.desc) out += `${phase.desc}\n`;
    out += `\n`;
    for (const l of phase.lessons) {
      const p = lessonPath(l.url);
      if (!p) continue;
      const note = l.summary ? ` — ${l.summary}` : '';
      const translations = (Array.isArray(l.langs) ? l.langs : [])
        .map(code => ` · [raw ${code}](${rawOrigin}/${p}/docs/${code}.md)`).join('');
      out += `- [${l.name}](${SITE_ORIGIN}/lesson.html?path=${p}) · [raw](${rawOrigin}/${p}/docs/en.md)${translations}${note}\n`;
    }
    out += `\n`;
  }
  out += `## Optional\n`;
  out += `- [Catalog](${SITE_ORIGIN}/catalog.html) — full searchable lesson index\n`;
  out += `- [Roadmap](${SITE_ORIGIN}/prereqs.html) — prerequisite ordering across phases\n`;
  if (glossaryCount > 0) out += `- [Glossary](${SITE_ORIGIN}/glossary.html) — plain-language definitions of ${glossaryCount} terms\n`;
  fs.writeFileSync(path.join(__dirname, 'llms.txt'), out, 'utf8');
  console.log(`   wrote llms.txt`);
}

// ─── Regenerate README stats block + lessons badge from source ───────────
function syncReadme(lessons) {
  const readmePath = path.join(REPO_ROOT, 'README.md');
  if (!fs.existsSync(readmePath)) return;
  let md = fs.readFileSync(readmePath, 'utf8');
  const before = md;

  // Keep the lessons badge in sync with the live count (URL value + alt text)
  md = md.replace(/badge\/lessons-\d+-/g, `badge/lessons-${lessons}-`);
  md = md.replace(/alt="\d+ lessons"/g, `alt="${lessons} lessons"`);

  // Regenerate the traffic proof block from site/stats.json
  const statsPath = path.join(__dirname, 'stats.json');
  if (fs.existsSync(statsPath)) {
    try {
      const s = JSON.parse(fs.readFileSync(statsPath, 'utf8'));
      const fmt = n => Number(n).toLocaleString('en-US');
      const block =
        '<!-- STATS:START (generated from site/stats.json by build.js — do not edit by hand) -->\n' +
        `<p align="center"><sub><b>${fmt(s.visitors30d)}</b> readers &nbsp;·&nbsp; ` +
        `<b>${fmt(s.pageViews30d)}</b> page views in the last ${s.period} &nbsp;·&nbsp; ` +
        `as of ${s.updated}</sub></p>\n` +
        '<!-- STATS:END -->';
      const statsRe = /<!-- STATS:START[\s\S]*?<!-- STATS:END -->/;
      if (statsRe.test(md)) {
        md = md.replace(statsRe, block);
      } else {
        // Self-heal: re-insert the block if the markers were removed/mangled
        md = md.replace(/\n## How this works/, `\n${block}\n\n## How this works`);
      }
    } catch (err) {
      console.warn(`⚠️  README stats sync skipped: ${err.message}`);
    }
  }

  if (md !== before) {
    fs.writeFileSync(readmePath, md, 'utf8');
    console.log('   synced README stats + lessons badge');
  }
}

// ─── Keep marketing counts in sync (single source of truth = this build) ──
function syncCounts(lessons, phaseCount, outputs) {
  const targets = [
    'index.html', 'catalog.html', 'lesson.html', 'prereqs.html', 'about.html',
    'glossary.html', 'cmdpalette.js', 'i18n-strings.js',
  ];
  // Localized counts live in i18n-strings.js alongside the English ones, so
  // they are kept in step here too — otherwise the Persian copy would quietly
  // drift from the real lesson count. Add a pattern per language.
  for (const f of targets) {
    const p = path.join(__dirname, f);
    if (!fs.existsSync(p)) continue;
    const before = fs.readFileSync(p, 'utf8');
    const after = before
      .replace(/\b\d+( AI engineering)? lessons\b/g, `${lessons}$1 lessons`)
      .replace(/\b\d+ phases\b/g, `${phaseCount} phases`)
      .replace(/\b\d+ outputs\b/g, `${outputs} outputs`)
      // Persian: "درس" = lessons, "فاز" = phases, "خروجی" = outputs.
      // No trailing \b — JS \b is ASCII-only and never fires after Arabic
      // script, so it would make these patterns unmatchable.
      .replace(/\b\d+ درس/g, `${lessons} درس`)
      .replace(/\b\d+ فاز/g, `${phaseCount} فاز`)
      .replace(/\b\d+ خروجی/g, `${outputs} خروجی`);
    if (after !== before) {
      fs.writeFileSync(p, after, 'utf8');
      console.log(`   synced counts in ${f}`);
    }
  }
}

build();
