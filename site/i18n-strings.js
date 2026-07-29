/**
 * UI string catalogue for AI Engineering from Scratch.
 *
 * Every user-facing string that is *chrome* (navigation, buttons, labels,
 * panel headings, error messages) lives here. Lesson bodies are NOT here —
 * those are translated Markdown at phases/**\/docs/<lang>.md.
 *
 * Adding a language:
 *   1. add an entry to AIFS_LANGS in i18n.js
 *   2. add a block to AIFS_STRINGS below (missing keys fall back to English)
 *   3. add a PHASE_LABELS block if the phase names should be localized
 *
 * Placeholders use {name} and are filled by AIFS_I18N.t(key, vars).
 * Keys ending in `_html` are inserted as HTML; everything else as text.
 */
(function () {
  'use strict';

  var STRINGS = {};

  // ─── English (source of truth: every key must exist here) ───────────────
  STRINGS.en = {
    // Shared chrome
    'skip': 'Skip to content',
    'nav.contents': 'Contents',
    'nav.books': 'Books',
    'nav.catalog': 'Catalog',
    'nav.roadmap': 'Roadmap',
    'nav.glossary': 'Glossary',
    'nav.about': 'About',
    'nav.home': 'Home',
    'nav.github': 'GitHub',
    'nav.report': 'Report',
    'nav.reportSuggest': 'Report / Suggest',
    'aria.ghStars': 'GitHub stars',
    'aria.search': 'Search (⌘K)',
    'aria.theme': 'Toggle theme',
    'aria.language': 'Change language',
    'footer.copy': '© 2026 · open source · free forever',
    'footer.tagline': 'AI Engineering from Scratch · open source · free forever.',

    // Home
    'index.docTitle': 'AI Engineering from Scratch',
    'index.metaLeft_html': '<span class="i18n-id">FIG_000</span> · curriculum <span class="i18n-id">v1.0</span> · 2026',
    'index.metaRight': 'open source · MIT',
    'index.title1': 'AI Engineering',
    'index.title2': 'from Scratch',
    'index.tagline': '503 lessons. 20 phases. Every algorithm built from raw math before a single framework gets imported.',
    'index.attribution': 'Maintained by Rohit Ghumare and contributors. Run on your own machine.',
    'index.starOnGithub': 'Star on GitHub',
    'index.followAuthor_html': 'Follow <span class="i18n-id">@rohitg00</span>',
    'index.preface.eyebrow': 'How this works',
    'index.preface.p1': "Most AI material teaches in scattered pieces. A paper here, a fine-tuning post there, a flashy agent demo somewhere else. The pieces rarely line up. You ship a chatbot but can't explain its loss curve. You hook a function to an agent but can't say what attention does inside the model that's calling it.",
    'index.preface.p2': "This curriculum is the spine. 20 phases, 503 lessons, four languages: Python, TypeScript, Rust, Julia. Linear algebra at one end, autonomous swarms at the other. Every algorithm gets built from raw math first. Backprop. Tokenizer. Attention. Agent loop. By the time PyTorch shows up, you already know what it's doing under the hood.",
    'index.preface.p3': 'Each lesson runs the same loop: read the problem, derive the math, write the code, run the test, keep the artifact. No five-minute videos, no copy-paste deploys, no hand-holding. Free, open source, and built to run on your own laptop.',
    'index.stats.title': 'Current Progress',
    'index.stats.finished': 'Finished Lessons',
    'index.stats.phases': 'Phases',
    'index.stats.languages': 'Languages',
    'index.stats.glossary': 'Glossary Terms',
    'index.toc.title': 'Curriculum · 20 phases · 503 lessons',
    'index.toc.subtitle': 'Tap a phase to expand its lessons. Each one ships when its math, code, and test are all written.',
    'index.legend.complete': 'Complete',
    'index.legend.inProgress': 'In progress',
    'index.legend.planned': 'Planned',
    'index.books.title': 'The book edition · six volumes',
    'index.books.subtitle': 'The course, compiled. EPUB and PDF built from the same lessons and attached to every GitHub release. The site stays the living edition — every chapter links back here for the animated figures, quizzes, and code.',
    'index.books.note_html': 'Links resolve to the newest <a href="https://github.com/rohitg00/ai-engineering-from-scratch/releases" target="_blank" rel="noopener">GitHub release</a> · rebuilt by CI from the lessons on every release · <a href="https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/book/README.md" target="_blank" rel="noopener">how it\'s made</a>',
    'index.books.phasesLabel': 'phases {range}',
    'index.vol1.title': 'Foundations',
    'index.vol1.subtitle': 'Math, Tooling, and Classical Machine Learning',
    'index.vol2.title': 'Deep Learning',
    'index.vol2.subtitle': 'Networks, Vision, and Speech',
    'index.vol3.title': 'Language',
    'index.vol3.subtitle': 'NLP Foundations and the Transformer',
    'index.vol4.title': 'Large Language Models',
    'index.vol4.subtitle': 'Generation, Reinforcement, Pretraining, and Engineering',
    'index.vol5.title': 'Agents',
    'index.vol5.subtitle': 'Multimodality, Protocols, Autonomy, and Swarms',
    'index.vol6.title': 'Production',
    'index.vol6.subtitle': 'Infrastructure, Safety, and Capstones',
    'index.colophon.eyebrow': 'Colophon',
    'index.colophon.p': 'The entire curriculum is on GitHub. Clone it, fork it, learn at your own pace. No paywall, no signup. Every lesson has runnable code in Python, TypeScript, Rust, or Julia, depending on what fits the concept best.',
    'index.colophon.copyAria': 'Copy command',

    // Phase modal (home)
    'modal.phase': 'PHASE {num}',
    'modal.footerNote': 'Progress saved in browser only',
    'modal.reset': 'Reset progress',
    'modal.confirmReset': 'Clear all your local progress (quiz answers and completed lessons)? This cannot be undone.',
    'modal.completed': 'completed',
    'modal.read': 'Read',
    'modal.review': 'Review',
    'modal.youCompleted': 'You completed this lesson',
    'modal.markComplete': 'Mark complete',
    'modal.markNotDone': 'Mark as not done',
    'modal.combines': 'Combines: {list}',
    // Short forms: these render inside the compact mobile toggle button.
    'modal.markShort': 'Mark',
    'modal.doneShort': 'Done',

    // Catalog
    'catalog.docTitle': 'Lesson Catalog - AI Engineering from Scratch',
    'catalog.h1': 'Lesson Catalog',
    'catalog.subtitle': 'Every lesson across all 20 phases. Search, filter, sort.',
    'catalog.searchPlaceholder': 'Search lessons...',
    'catalog.allPhases': 'All Phases',
    'catalog.allStatus': 'All Status',
    'catalog.th.phase': 'Phase',
    'catalog.th.lesson': 'Lesson',
    'catalog.th.type': 'Type',
    'catalog.th.lang': 'Language',
    'catalog.th.status': 'Status',
    'catalog.count': '{shown} of {total} lessons',
    'catalog.empty': 'No lessons match your filters.',

    // Status vocabulary (shared)
    'status.complete': 'complete',
    'status.in-progress': 'in progress',
    'status.planned': 'planned',

    // Glossary
    'glossary.docTitle': 'AI Glossary - AI Engineering from Scratch',
    'glossary.h1': 'AI Glossary',
    'glossary.subtitle_html': 'What people <em>say</em> vs what things actually <em>mean</em>',
    'glossary.searchPlaceholder': 'Search terms...',
    'glossary.count': '{shown} of {total} terms',
    'glossary.empty': 'No terms match your search.',
    'glossary.says': 'What people say',
    'glossary.means': 'What it actually means',

    // Roadmap
    'prereqs.docTitle': 'Roadmap - AI Engineering from Scratch',
    'prereqs.h1': 'Roadmap',
    'prereqs.subtitle': 'Click any phase to see its prerequisites and what it unlocks downstream.',
    'prereqs.clear': '✕ Clear selection',
    'prereqs.scrollHint': '↔ Scroll to explore the full graph',
    'prereqs.selectPhase': 'Select Phase {num}: {name}',
    'prereqs.goToPhase': 'Go to Phase {num}: {name}',
    'prereqs.prerequisites': 'Prerequisites',
    'prereqs.unlocks': 'Unlocks',
    'prereqs.noPrereqs': 'None. This is a starting point.',
    'prereqs.noUnlocks': 'Final destination. End of the curriculum.',
    'prereqs.stats_html': '<strong>{done}</strong> of <strong>{total}</strong> lessons complete &nbsp;·&nbsp; <strong>{ancestors}</strong> prerequisite phases &nbsp;·&nbsp; <strong>{descendants}</strong> phases unlocked',
    'prereqs.read': 'Read',
    'prereqs.viewGithub': 'View on GitHub',
    'prereqs.phaseNum': 'Phase {num}',

    // About
    'about.docTitle': 'About - AI Engineering from Scratch',
    'about.eyebrow': 'About',
    'about.h1': 'About this project',
    'about.lede': 'AI Engineering from Scratch is a free, open-source curriculum that builds every core AI algorithm by hand. 503 lessons across 20 phases, from linear algebra to autonomous agents, in Python, TypeScript, Rust, and Julia.',
    'about.h2.why': 'Why it exists',
    'about.why.p1': 'Most AI material teaches in scattered pieces. A paper here, a fine-tuning post there, a framework demo somewhere else. You can ship a chatbot without being able to explain its loss curve, or wire a tool to an agent without knowing what attention does inside the model calling it.',
    'about.why.p2': 'This curriculum is the spine. Every algorithm gets written from raw math first, then run through the production library so you can see what the library was doing. By the time PyTorch shows up, you already know what it computes. Each lesson ends with a reusable artifact you keep: a prompt, a skill, an agent, or an MCP server.',
    'about.h2.how': 'How it is made',
    'about.how.p1': 'The lessons are authored with AI assistance and reviewed by a human against primary sources. Where a lesson states a fact, it cites the original: an RFC, a spec, or a research paper, not a secondary summary. Corrections are welcome and tracked in the open on GitHub.',
    'about.how.p2_html': 'The site itself is deliberately plain: hand-written HTML, CSS, and vanilla JavaScript, no framework. A single build script (<code>site/build.js</code>) reads the lesson Markdown in the repository and generates the catalog, search index, sitemap, and <code>llms.txt</code> on every deploy, so the published numbers can never drift from the source. It is hosted on Vercel.',
    'about.h2.who': 'Who builds it',
    'about.who.p_html': 'Maintained by <a href="https://github.com/rohitg00" target="_blank" rel="noopener">Rohit Ghumare</a> and contributors. It is MIT-licensed and free forever. There is no token, no course upsell, and no gated content.',
    'about.h2.involved': 'Get involved',
    'about.involved.li1_html': 'Read the source: <a href="https://github.com/rohitg00/ai-engineering-from-scratch" target="_blank" rel="noopener">github.com/rohitg00/ai-engineering-from-scratch</a>',
    'about.involved.li2_html': 'Found an error or have a lesson idea? <a href="https://github.com/rohitg00/ai-engineering-from-scratch/issues/new/choose" target="_blank" rel="noopener">Open an issue</a>.',
    'about.involved.li3_html': 'Start learning: <a href="catalog.html">browse the catalog</a> or <a href="prereqs.html">follow the roadmap</a>.',

    // Command palette
    'cp.placeholder': 'Search lessons and glossary…',
    'cp.aria.dialog': 'Search lessons and glossary',
    'cp.aria.input': 'Search',
    'cp.aria.results': 'Search results',
    'cp.esc': 'Esc',
    'cp.navigate': 'navigate',
    'cp.open': 'open',
    'cp.close': 'close',
    'cp.hint': 'Type to search 503 lessons, 499 outputs, and glossary terms',
    'cp.noResults_html': 'No results for <em>{query}</em>',
    'cp.chip.phase': 'Phase {num}',
    'cp.chip.glossary': 'Glossary',

    // Lesson page — shell
    'lesson.docTitleSuffix': 'AI Engineering from Scratch',
    'lesson.loading': 'Loading lesson...',
    'lesson.lessonsToggle': 'Lessons',
    'lesson.onThisPage': 'On this page',
    'lesson.backHome': 'Back to Home',
    'lesson.err.noPath.title': 'No lesson path specified',
    'lesson.err.noPath.msg_html': 'Add <code>?path=phases/01-math-foundations/01-linear-algebra-intuition</code> to the URL.',
    'lesson.err.render.title': 'Render error',
    'lesson.err.render.msg': 'Loaded the lesson markdown but failed to render it. Details in the browser console.',
    'lesson.err.unavailable.title': 'Lesson temporarily unavailable',
    'lesson.err.unavailable.msg_html': 'Could not load the lesson at <code>{path}</code> right now. Try reloading the page.',
    'lesson.err.notFound.title': 'Lesson not found',
    'lesson.err.notFound.msg_html': 'Could not fetch the lesson at <code>{path}</code>. It may not have been written yet.',
    'lesson.err.readOnGithub_html': ' <a href="{url}" target="_blank" rel="noopener">Read it on GitHub</a>.',
    'lesson.fallbackNotice_html': 'This lesson has not been translated yet — showing the English original. <a href="{url}" target="_blank" rel="noopener">Help translate it</a>.',
    'lesson.phasePrev': '← Phase {num}: {name}',
    'lesson.phaseNext': 'Phase {num}: {name} →',
    'lesson.navPrev': '← Previous',
    'lesson.navNext': 'Next →',

    // Lesson page — article furniture
    'lesson.learningObjectives': 'Learning Objectives',
    'lesson.labChallenge': 'Lab Challenge',
    'lesson.copy': 'Copy',
    'lesson.copied': 'Copied!',
    'lesson.expand': 'Expand',
    'lesson.diagram': 'Diagram',
    'lesson.closeDialog': 'Close',
    'lesson.renderingDiagram': 'Rendering diagram...',
    'lesson.diagramFailed': 'Diagram could not be rendered.',
    'lesson.meta.type': 'Type',
    'lesson.meta.languages': 'Languages',
    'lesson.meta.prerequisites': 'Prerequisites',
    'lesson.meta.time': 'Time',

    // Lesson page — inline quizzes (from quiz.json)
    'quiz.pre': 'Pre-Lesson Check',
    'quiz.check': 'Mid-Lesson Check',
    'quiz.post': 'Post-Lesson Quiz',
    'quiz.all': 'Quiz',
    'quiz.correctCount': '{correct}/{total} correct',

    // Lesson page — AI panels
    'panel.outputs.title': 'What This Lesson Ships',
    'panel.outputs.subtitle': 'Prompts, skills, and artifacts you can use right now',
    'panel.outputs.loading': 'Loading outputs...',
    'panel.outputs.loadingDesc': 'Loading description...',
    'panel.badge.prompt': 'Prompt',
    'panel.badge.skill': 'Skill',
    'panel.badge.output': 'Output',
    'panel.install': 'Install',
    'panel.installPrompt': 'Paste into Claude, Cursor, Codex, OpenClaw, Hermes, or any agent that reads prompts',
    'panel.viewOnGithub': 'View on GitHub',
    'panel.viewLessonOnGithub': 'View lesson on GitHub',
    'panel.code.title': 'Run the Code',
    'panel.code.subtitle': 'Executable files from this lesson',
    'panel.code.loading': 'Loading code files...',
    'panel.code.copyCommand': 'Copy command',
    'panel.quiz.title': 'Test Your Understanding',
    'panel.quiz.subtitle': 'Did you get it?',
    'panel.quiz.loading': 'Loading questions...',
    'panel.quiz.questionOf': 'Question {n} of {total}',
    'panel.quiz.scorePrompt': 'Complete all questions to see your score',
    'panel.quiz.perfect': 'Perfect score!',
    'panel.quiz.great': 'Great work!',
    'panel.quiz.keep': 'Keep studying!',
    'panel.quiz.deeper_html': 'Want a deeper quiz? Run <code>/check-understanding {phase}</code> in Claude, Cursor, Codex, OpenClaw, Hermes, or any agent with the curriculum skills installed',
    'panel.path.title': 'Learning Path',
    'panel.path.phase': 'Phase {num}: {name}',
    'panel.path.progress': "You've completed {done} of {total} lessons in this phase",
    'panel.path.ready': 'Ready for Phase {num}: {name}',
    'panel.path.earlier': '{n} earlier lessons',
    'panel.path.later': '{n} later lessons',
    'panel.continue.title': 'Continue Learning',
    'panel.continue.finished': '✅ You finished this phase!',
    'panel.continue.browsePhase': 'Browse all Phase {num} lessons',
    'panel.continue.catalog': 'Full course catalog',
    'panel.continue.callout_html': 'Run <code>/find-your-level</code> in Claude, Cursor, Codex, OpenClaw, Hermes, or any agent with the curriculum skills installed for a personalized learning path'
  };

  // ─── Persian / فارسی ────────────────────────────────────────────────────
  // Technical terms practitioners keep in English (PyTorch, backprop names,
  // command names, model names) are deliberately left untranslated.
  STRINGS.fa = {
    'skip': 'رفتن به محتوا',
    'nav.contents': 'فهرست',
    'nav.books': 'کتاب‌ها',
    'nav.catalog': 'کاتالوگ',
    'nav.roadmap': 'نقشه راه',
    'nav.glossary': 'واژه‌نامه',
    'nav.about': 'درباره',
    'nav.home': 'خانه',
    'nav.github': 'گیت‌هاب',
    'nav.report': 'گزارش',
    'nav.reportSuggest': 'گزارش / پیشنهاد',
    'aria.ghStars': 'ستاره‌های گیت‌هاب',
    'aria.search': 'جست‌وجو (⌘K)',
    'aria.theme': 'تغییر پوسته',
    'aria.language': 'تغییر زبان',
    'footer.copy': '© 2026 · متن‌باز · همیشه رایگان',
    'footer.tagline': 'مهندسی AI از صفر · متن‌باز · همیشه رایگان.',

    'index.docTitle': 'مهندسی AI از صفر',
    'index.metaLeft_html': '<span class="i18n-id">FIG_000</span> · برنامهٔ درسی <span class="i18n-id">v1.0</span> · 2026',
    'index.metaRight': 'متن‌باز · MIT',
    'index.title1': 'مهندسی AI',
    'index.title2': 'از صفر',
    'index.tagline': '503 درس. 20 فاز. هر الگوریتم پیش از آنکه حتی یک فریم‌ورک import شود، از ریاضیات خام ساخته می‌شود.',
    'index.attribution': 'نگهداری‌شده توسط Rohit Ghumare و مشارکت‌کنندگان. روی ماشین خودتان اجرا کنید.',
    'index.starOnGithub': 'ستاره در گیت‌هاب',
    'index.followAuthor_html': 'دنبال کردن <span class="i18n-id">@rohitg00</span>',
    'index.preface.eyebrow': 'این دوره چطور کار می‌کند',
    'index.preface.p1': 'بیشتر منابع AI به‌صورت تکه‌تکه آموزش می‌دهند. یک مقاله این‌جا، یک پست fine-tuning آن‌جا، و یک دموی پرهیجان از agent در جایی دیگر. این تکه‌ها به‌ندرت به هم می‌چسبند. شما یک چت‌بات منتشر می‌کنید، اما نمی‌توانید منحنی خطای آن را توضیح دهید. یک تابع را به یک agent وصل می‌کنید، اما نمی‌توانید بگویید attention درون مدلی که آن را صدا می‌زند، چه کاری انجام می‌دهد.',
    'index.preface.p2': 'این برنامهٔ درسی، ستون فقرات ماجرا است. 20 فاز، 503 درس، چهار زبان: Python، TypeScript، Rust و Julia. از جبر خطی در یک سر تا ازدحام‌های خودمختار در سر دیگر. هر الگوریتم ابتدا از ریاضیات خام ساخته می‌شود: backprop، tokenizer، attention و حلقهٔ agent. تا زمانی که نوبت به PyTorch برسد، شما از قبل می‌دانید زیر پوستهٔ آن چه می‌گذرد.',
    'index.preface.p3': 'هر درس همان حلقه را طی می‌کند: مسئله را بخوان، ریاضیات را استخراج کن، کد را بنویس، تست را اجرا کن و خروجی را نگه دار. نه ویدیوی پنج‌دقیقه‌ای، نه استقرار کپی‌پیستی، نه راهنمای قدم‌به‌قدم دست‌گرفتن. رایگان، متن‌باز و ساخته‌شده برای اجرا روی لپ‌تاپ خودتان.',
    'index.stats.title': 'پیشرفت فعلی',
    'index.stats.finished': 'درس‌های تمام‌شده',
    'index.stats.phases': 'فازها',
    'index.stats.languages': 'زبان‌ها',
    'index.stats.glossary': 'واژگان واژه‌نامه',
    'index.toc.title': 'برنامهٔ درسی · 20 فاز · 503 درس',
    'index.toc.subtitle': 'روی هر فاز بزنید تا درس‌هایش باز شود. هر درس زمانی منتشر می‌شود که ریاضیات، کد و تستش نوشته شده باشد.',
    'index.legend.complete': 'کامل',
    'index.legend.inProgress': 'در حال انجام',
    'index.legend.planned': 'برنامه‌ریزی‌شده',
    'index.books.title': 'نسخهٔ کتاب · شش جلد',
    'index.books.subtitle': 'همین دوره، کامپایل‌شده. EPUB و PDF از همان درس‌ها ساخته و به هر release گیت‌هاب پیوست می‌شوند. سایت، نسخهٔ زندهٔ ماجرا می‌ماند — هر فصل برای شکل‌های متحرک، آزمون‌ها و کد به همین‌جا برمی‌گردد.',
    'index.books.note_html': 'لینک‌ها به جدیدترین <a href="https://github.com/rohitg00/ai-engineering-from-scratch/releases" target="_blank" rel="noopener">release گیت‌هاب</a> اشاره می‌کنند · در هر release توسط CI از دل درس‌ها بازسازی می‌شوند · <a href="https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/book/README.md" target="_blank" rel="noopener">چگونه ساخته می‌شود</a>',
    'index.books.phasesLabel': 'فازهای {range}',
    'index.vol1.title': 'مبانی',
    'index.vol1.subtitle': 'ریاضیات، ابزار و یادگیری ماشین کلاسیک',
    'index.vol2.title': 'یادگیری عمیق',
    'index.vol2.subtitle': 'شبکه‌ها، بینایی و گفتار',
    'index.vol3.title': 'زبان',
    'index.vol3.subtitle': 'مبانی NLP و ترنسفورمر',
    'index.vol4.title': 'مدل‌های زبانی بزرگ',
    'index.vol4.subtitle': 'تولید، یادگیری تقویتی، پیش‌آموزش و مهندسی',
    'index.vol5.title': 'عامل‌ها',
    'index.vol5.subtitle': 'چندوجهی، پروتکل‌ها، خودمختاری و ازدحام',
    'index.vol6.title': 'تولید عملیاتی',
    'index.vol6.subtitle': 'زیرساخت، ایمنی و پروژه‌های نهایی',
    'index.colophon.eyebrow': 'شناسنامه',
    'index.colophon.p': 'تمام برنامهٔ درسی روی گیت‌هاب است. کلون کنید، fork کنید و با سرعت خودتان یاد بگیرید. نه پی‌وال، نه ثبت‌نام. هر درس کد اجراشدنی در Python، TypeScript، Rust یا Julia دارد؛ بسته به این‌که کدام برای آن مفهوم مناسب‌تر است.',
    'index.colophon.copyAria': 'کپی دستور',

    'modal.phase': 'فاز {num}',
    'modal.footerNote': 'پیشرفت فقط در مرورگر شما ذخیره می‌شود',
    'modal.reset': 'بازنشانی پیشرفت',
    'modal.confirmReset': 'همهٔ پیشرفت محلی شما (پاسخ آزمون‌ها و درس‌های کامل‌شده) پاک شود؟ این کار قابل بازگشت نیست.',
    'modal.completed': 'کامل‌شده',
    'modal.read': 'خواندن',
    'modal.review': 'مرور',
    'modal.youCompleted': 'این درس را کامل کرده‌اید',
    'modal.markComplete': 'علامت‌زدن به‌عنوان کامل',
    'modal.markNotDone': 'برداشتن علامت کامل',
    'modal.combines': 'ترکیب می‌کند: {list}',
    'modal.markShort': 'علامت',
    'modal.doneShort': 'انجام شد',

    'catalog.docTitle': 'کاتالوگ درس‌ها - مهندسی AI از صفر',
    'catalog.h1': 'کاتالوگ درس‌ها',
    'catalog.subtitle': 'همهٔ درس‌ها در تمام 20 فاز. جست‌وجو، فیلتر و مرتب‌سازی کنید.',
    'catalog.searchPlaceholder': 'جست‌وجوی درس‌ها...',
    'catalog.allPhases': 'همهٔ فازها',
    'catalog.allStatus': 'همهٔ وضعیت‌ها',
    'catalog.th.phase': 'فاز',
    'catalog.th.lesson': 'درس',
    'catalog.th.type': 'نوع',
    'catalog.th.lang': 'زبان',
    'catalog.th.status': 'وضعیت',
    'catalog.count': '{shown} از {total} درس',
    'catalog.empty': 'هیچ درسی با فیلترهای شما مطابقت ندارد.',

    'status.complete': 'کامل',
    'status.in-progress': 'در حال انجام',
    'status.planned': 'برنامه‌ریزی‌شده',

    'glossary.docTitle': 'واژه‌نامهٔ AI - مهندسی AI از صفر',
    'glossary.h1': 'واژه‌نامهٔ AI',
    'glossary.subtitle_html': 'آنچه مردم <em>می‌گویند</em> در برابر آنچه واقعاً <em>معنا</em> می‌دهد',
    'glossary.searchPlaceholder': 'جست‌وجوی واژه‌ها...',
    'glossary.count': '{shown} از {total} واژه',
    'glossary.empty': 'هیچ واژه‌ای با جست‌وجوی شما مطابقت ندارد.',
    'glossary.says': 'آنچه مردم می‌گویند',
    'glossary.means': 'آنچه واقعاً معنا می‌دهد',

    'prereqs.docTitle': 'نقشه راه - مهندسی AI از صفر',
    'prereqs.h1': 'نقشه راه',
    'prereqs.subtitle': 'روی هر فاز کلیک کنید تا پیش‌نیازهایش و آنچه در ادامه باز می‌کند را ببینید.',
    'prereqs.clear': '✕ پاک کردن انتخاب',
    'prereqs.scrollHint': '↔ برای دیدن کل گراف اسکرول کنید',
    'prereqs.selectPhase': 'انتخاب فاز {num}: {name}',
    'prereqs.goToPhase': 'رفتن به فاز {num}: {name}',
    'prereqs.prerequisites': 'پیش‌نیازها',
    'prereqs.unlocks': 'باز می‌کند',
    'prereqs.noPrereqs': 'هیچ. این یک نقطهٔ شروع است.',
    'prereqs.noUnlocks': 'مقصد نهایی. پایان برنامهٔ درسی.',
    'prereqs.stats_html': '<strong>{done}</strong> از <strong>{total}</strong> درس کامل &nbsp;·&nbsp; <strong>{ancestors}</strong> فاز پیش‌نیاز &nbsp;·&nbsp; <strong>{descendants}</strong> فاز باز‌شده',
    'prereqs.read': 'خواندن',
    'prereqs.viewGithub': 'مشاهده در گیت‌هاب',
    'prereqs.phaseNum': 'فاز {num}',

    'about.docTitle': 'درباره - مهندسی AI از صفر',
    'about.eyebrow': 'درباره',
    'about.h1': 'دربارهٔ این پروژه',
    'about.lede': 'مهندسی AI از صفر یک برنامهٔ درسی رایگان و متن‌باز است که هر الگوریتم اصلی AI را با دست می‌سازد. 503 درس در 20 فاز، از جبر خطی تا عامل‌های خودمختار، با Python، TypeScript، Rust و Julia.',
    'about.h2.why': 'چرا وجود دارد',
    'about.why.p1': 'بیشتر منابع AI به‌صورت تکه‌تکه آموزش می‌دهند. یک مقاله این‌جا، یک پست fine-tuning آن‌جا، یک دموی فریم‌ورک در جایی دیگر. می‌توانید یک چت‌بات منتشر کنید بدون آن‌که بتوانید منحنی خطایش را توضیح دهید، یا ابزاری را به یک agent وصل کنید بدون آن‌که بدانید attention درون مدلی که آن را صدا می‌زند چه می‌کند.',
    'about.why.p2': 'این برنامهٔ درسی، ستون فقرات ماجرا است. هر الگوریتم ابتدا از ریاضیات خام نوشته می‌شود و سپس با کتابخانهٔ عملیاتی اجرا می‌شود تا ببینید آن کتابخانه دقیقاً چه می‌کرده است. تا زمانی که نوبت به PyTorch برسد، از قبل می‌دانید چه چیزی را محاسبه می‌کند. هر درس با یک خروجی قابل‌استفادهٔ مجدد تمام می‌شود که برای خودتان می‌ماند: یک prompt، یک skill، یک agent یا یک سرور MCP.',
    'about.h2.how': 'چگونه ساخته می‌شود',
    'about.how.p1': 'درس‌ها با کمک AI نوشته و توسط انسان در برابر منابع اصلی بازبینی می‌شوند. هر جا درسی واقعیتی را بیان می‌کند، به منبع اصلی ارجاع می‌دهد: یک RFC، یک مشخصهٔ فنی یا یک مقالهٔ پژوهشی، نه یک خلاصهٔ دست‌دوم. اصلاحات پذیرفته و به‌صورت عمومی روی گیت‌هاب پیگیری می‌شوند.',
    'about.how.p2_html': 'خود سایت عمداً ساده است: HTML، CSS و JavaScript خالص دست‌نویس، بدون فریم‌ورک. یک اسکریپت ساخت واحد (<code>site/build.js</code>) مارک‌داون درس‌ها را در مخزن می‌خواند و در هر استقرار کاتالوگ، ایندکس جست‌وجو، sitemap و <code>llms.txt</code> را تولید می‌کند، تا اعداد منتشرشده هرگز از منبع فاصله نگیرند. سایت روی Vercel میزبانی می‌شود.',
    'about.h2.who': 'چه کسی می‌سازد',
    'about.who.p_html': 'نگهداری‌شده توسط <a href="https://github.com/rohitg00" target="_blank" rel="noopener">Rohit Ghumare</a> و مشارکت‌کنندگان. با مجوز MIT و همیشه رایگان. نه توکنی وجود دارد، نه فروش دورهٔ جانبی و نه محتوای قفل‌شده.',
    'about.h2.involved': 'مشارکت کنید',
    'about.involved.li1_html': 'کد منبع را بخوانید: <a href="https://github.com/rohitg00/ai-engineering-from-scratch" target="_blank" rel="noopener">github.com/rohitg00/ai-engineering-from-scratch</a>',
    'about.involved.li2_html': 'خطایی پیدا کردید یا ایدهٔ درسی دارید؟ <a href="https://github.com/rohitg00/ai-engineering-from-scratch/issues/new/choose" target="_blank" rel="noopener">یک issue باز کنید</a>.',
    'about.involved.li3_html': 'شروع به یادگیری کنید: <a href="catalog.html">کاتالوگ را مرور کنید</a> یا <a href="prereqs.html">نقشه راه را دنبال کنید</a>.',

    'cp.placeholder': 'جست‌وجو در درس‌ها و واژه‌نامه…',
    'cp.aria.dialog': 'جست‌وجو در درس‌ها و واژه‌نامه',
    'cp.aria.input': 'جست‌وجو',
    'cp.aria.results': 'نتایج جست‌وجو',
    'cp.esc': 'Esc',
    'cp.navigate': 'جابه‌جایی',
    'cp.open': 'باز کردن',
    'cp.close': 'بستن',
    'cp.hint': 'برای جست‌وجو در 503 درس، 499 خروجی و واژه‌های واژه‌نامه تایپ کنید',
    'cp.noResults_html': 'نتیجه‌ای برای <em>{query}</em> پیدا نشد',
    'cp.chip.phase': 'فاز {num}',
    'cp.chip.glossary': 'واژه‌نامه',

    'lesson.docTitleSuffix': 'مهندسی AI از صفر',
    'lesson.loading': 'در حال بارگذاری درس...',
    'lesson.lessonsToggle': 'درس‌ها',
    'lesson.onThisPage': 'در این صفحه',
    'lesson.backHome': 'بازگشت به خانه',
    'lesson.err.noPath.title': 'مسیر درس مشخص نشده است',
    'lesson.err.noPath.msg_html': 'به انتهای نشانی، <code>?path=phases/01-math-foundations/01-linear-algebra-intuition</code> را اضافه کنید.',
    'lesson.err.render.title': 'خطای رندر',
    'lesson.err.render.msg': 'مارک‌داون درس بارگذاری شد اما رندر آن شکست خورد. جزئیات در کنسول مرورگر است.',
    'lesson.err.unavailable.title': 'درس موقتاً در دسترس نیست',
    'lesson.err.unavailable.msg_html': 'در این لحظه امکان بارگذاری درس در <code>{path}</code> نبود. صفحه را دوباره بار کنید.',
    'lesson.err.notFound.title': 'درس پیدا نشد',
    'lesson.err.notFound.msg_html': 'دریافت درس در <code>{path}</code> ممکن نبود. ممکن است هنوز نوشته نشده باشد.',
    'lesson.err.readOnGithub_html': ' <a href="{url}" target="_blank" rel="noopener">آن را در گیت‌هاب بخوانید</a>.',
    'lesson.fallbackNotice_html': 'این درس هنوز ترجمه نشده است — متن اصلی انگلیسی نمایش داده می‌شود. <a href="{url}" target="_blank" rel="noopener">در ترجمهٔ آن کمک کنید</a>.',
    'lesson.phasePrev': '→ فاز {num}: {name}',
    'lesson.phaseNext': '← فاز {num}: {name}',
    'lesson.navPrev': '→ قبلی',
    'lesson.navNext': 'بعدی ←',

    'lesson.learningObjectives': 'اهداف یادگیری',
    'lesson.labChallenge': 'چالش آزمایشگاه',
    'lesson.copy': 'کپی',
    'lesson.copied': 'کپی شد!',
    'lesson.expand': 'بزرگ‌نمایی',
    'lesson.diagram': 'نمودار',
    'lesson.closeDialog': 'بستن',
    'lesson.renderingDiagram': 'در حال رسم نمودار...',
    'lesson.diagramFailed': 'نمودار قابل رسم نبود.',
    'lesson.meta.type': 'نوع',
    'lesson.meta.languages': 'زبان‌ها',
    'lesson.meta.prerequisites': 'پیش‌نیازها',
    'lesson.meta.time': 'زمان',

    'quiz.pre': 'سنجش پیش از درس',
    'quiz.check': 'سنجش میان درس',
    'quiz.post': 'آزمون پس از درس',
    'quiz.all': 'آزمون',
    'quiz.correctCount': '{correct} از {total} درست',

    'panel.outputs.title': 'این درس چه چیزی تحویل می‌دهد',
    'panel.outputs.subtitle': 'prompt‌ها، skill‌ها و خروجی‌هایی که همین حالا می‌توانید استفاده کنید',
    'panel.outputs.loading': 'در حال بارگذاری خروجی‌ها...',
    'panel.outputs.loadingDesc': 'در حال بارگذاری توضیح...',
    'panel.badge.prompt': 'Prompt',
    'panel.badge.skill': 'Skill',
    'panel.badge.output': 'خروجی',
    'panel.install': 'نصب',
    'panel.installPrompt': 'در Claude، Cursor، Codex، OpenClaw، Hermes یا هر agent دیگری که prompt می‌خواند، جای‌گذاری کنید',
    'panel.viewOnGithub': 'مشاهده در گیت‌هاب',
    'panel.viewLessonOnGithub': 'مشاهدهٔ درس در گیت‌هاب',
    'panel.code.title': 'کد را اجرا کنید',
    'panel.code.subtitle': 'فایل‌های اجراشدنی این درس',
    'panel.code.loading': 'در حال بارگذاری فایل‌های کد...',
    'panel.code.copyCommand': 'کپی دستور',
    'panel.quiz.title': 'فهم خود را بسنجید',
    'panel.quiz.subtitle': 'گرفتی؟',
    'panel.quiz.loading': 'در حال بارگذاری پرسش‌ها...',
    'panel.quiz.questionOf': 'پرسش {n} از {total}',
    'panel.quiz.scorePrompt': 'برای دیدن امتیازتان همهٔ پرسش‌ها را کامل کنید',
    'panel.quiz.perfect': 'امتیاز کامل!',
    'panel.quiz.great': 'عالی بود!',
    'panel.quiz.keep': 'مطالعه را ادامه دهید!',
    'panel.quiz.deeper_html': 'آزمون عمیق‌تری می‌خواهید؟ در Claude، Cursor، Codex، OpenClaw، Hermes یا هر agent دیگری که skill‌های این برنامهٔ درسی را نصب دارد، <code>/check-understanding {phase}</code> را اجرا کنید',
    'panel.path.title': 'مسیر یادگیری',
    'panel.path.phase': 'فاز {num}: {name}',
    'panel.path.progress': 'شما {done} از {total} درس این فاز را کامل کرده‌اید',
    'panel.path.ready': 'آمادهٔ فاز {num}: {name}',
    'panel.path.earlier': '{n} درس پیشین',
    'panel.path.later': '{n} درس بعدی',
    'panel.continue.title': 'ادامهٔ یادگیری',
    'panel.continue.finished': '✅ این فاز را تمام کردید!',
    'panel.continue.browsePhase': 'مرور همهٔ درس‌های فاز {num}',
    'panel.continue.catalog': 'کاتالوگ کامل دوره',
    'panel.continue.callout_html': 'برای یک مسیر یادگیری شخصی‌سازی‌شده، در Claude، Cursor، Codex، OpenClaw، Hermes یا هر agent دیگری که skill‌های این برنامهٔ درسی را نصب دارد، <code>/find-your-level</code> را اجرا کنید'
  };

  // ─── Phase names / descriptions ─────────────────────────────────────────
  // Phase names come from README.md (English). Lesson names and summaries are
  // picked up automatically from each lesson's docs/<lang>.md by build.js, but
  // phases have no per-language source file, so they are translated here.
  var PHASE_LABELS = {
    fa: {
      0:  { name: 'راه‌اندازی و ابزار',        desc: 'محیط، ابزارها و گردش‌کاری که هر درس بعدی روی آن اجرا می‌شود.' },
      1:  { name: 'مبانی ریاضی',              desc: 'جبر خطی، حساب دیفرانسیل، احتمال و بهینه‌سازی که یادگیری ماشین بر آن استوار است.' },
      2:  { name: 'یادگیری ماشین کلاسیک',      desc: 'رگرسیون، دسته‌بندی، درخت‌ها و خوشه‌بندی، پیاده‌سازی‌شده از پایه.' },
      3:  { name: 'یادگیری عمیق',             desc: 'شبکه‌های عصبی، انتشار رو‌به‌عقب، بهینه‌سازها و آموزش، دست‌ساز.' },
      4:  { name: 'بینایی کامپیوتر',           desc: 'کانولوشن، تشخیص، قطعه‌بندی و ترنسفورمرهای بینایی.' },
      5:  { name: 'مبانی NLP',                desc: 'توکن‌سازی، امبدینگ، مدل‌های زبانی و مدل‌های دنباله‌به‌دنباله.' },
      6:  { name: 'گفتار و صدا',              desc: 'بازنمایی صدا، تشخیص گفتار و سنتز.' },
      7:  { name: 'ترنسفورمرها',              desc: 'attention، معماری ترنسفورمر و هر قطعه‌ای که آن را می‌سازد.' },
      8:  { name: 'هوش مصنوعی مولد',           desc: 'تولید، نمونه‌گیری، مدل‌های انتشار و کنترل خروجی.' },
      9:  { name: 'یادگیری تقویتی',           desc: 'سیاست‌ها، تابع ارزش، گرادیان سیاست و RL از بازخورد انسانی.' },
      10: { name: 'مدل‌های زبانی بزرگ',        desc: 'پیش‌آموزش، مقیاس‌پذیری، fine-tuning و ارزیابی LLM.' },
      11: { name: 'مهندسی LLM',               desc: 'ارائهٔ سرویس، استنتاج، RAG، ابزارها و الگوهای عملیاتی.' },
      12: { name: 'AI چندوجهی',               desc: 'مدل‌هایی که متن، تصویر، صدا و ویدیو را با هم می‌بینند.' },
      13: { name: 'پروتکل‌ها و یکپارچه‌سازی',   desc: 'MCP، فراخوانی ابزار و اتصال استاندارد مدل‌ها به سیستم‌ها.' },
      14: { name: 'عامل‌ها',                  desc: 'حلقهٔ عامل، حافظه، برنامه‌ریزی و اجرای خودمختار.' },
      15: { name: 'عامل‌های پیشرفته',          desc: 'همکاری، بازتاب، شکست‌های آبشاری و رفتار بلندمدت.' },
      16: { name: 'ازدحام و چندعاملی',         desc: 'هماهنگی، مذاکره و رفتار نوپدید در جمعیت عامل‌ها.' },
      17: { name: 'زیرساخت',                  desc: 'GPU، آموزش توزیع‌شده، ذخیره‌سازی و اقتصاد سرویس‌دهی.' },
      18: { name: 'ایمنی و هم‌راستایی',        desc: 'ارزیابی، حصارهای حفاظتی، تیم قرمز و رفتار قابل‌اعتماد.' },
      19: { name: 'پروژه‌های نهایی',            desc: 'پروژه‌های پایانی که چند فاز را در یک سیستم واحد ترکیب می‌کنند.' }
    }
  };

  // ─── Fallback quiz bank (used when a lesson has no quiz.json) ───────────
  // Keyed by topic; lesson.html maps the lesson path onto one of these keys.
  var QUIZ_BANK = {
    en: {
      math: [
        { q: 'What does a dot product measure between two vectors?', opts: ['Their sum', 'How aligned they are', 'Their cross product', 'The distance between them'], answer: 1, explain: 'The dot product measures the similarity or alignment between two vectors. When it is zero, the vectors are orthogonal.' },
        { q: 'What does the gradient of a function point toward?', opts: ['The minimum', 'The steepest ascent', 'The nearest saddle point', 'A random direction'], answer: 1, explain: 'The gradient always points in the direction of steepest increase. Gradient descent moves opposite to the gradient to find minima.' },
        { q: 'A matrix with shape (3, 5) multiplied by (5, 2) produces what shape?', opts: ['(3, 2)', '(5, 5)', '(3, 5)', '(2, 3)'], answer: 0, explain: 'Matrix multiplication: (m, n) x (n, p) = (m, p). So (3, 5) x (5, 2) = (3, 2).' }
      ],
      ml: [
        { q: 'What is the purpose of a loss function in machine learning?', opts: ['To generate data', 'To measure how wrong predictions are', 'To select features', 'To split data'], answer: 1, explain: 'A loss function quantifies the difference between predicted and actual values. The optimizer minimizes this value during training.' },
        { q: 'Why do we split data into train and test sets?', opts: ['To save memory', 'To evaluate generalization on unseen data', 'To make training faster', 'To reduce the dataset size'], answer: 1, explain: 'The test set acts as unseen data, revealing whether the model memorized training data or learned generalizable patterns.' },
        { q: 'What does overfitting mean?', opts: ['The model is too simple', 'The model memorizes training data but fails on new data', 'The model trains too slowly', 'The loss is too low'], answer: 1, explain: 'Overfitting occurs when a model performs well on training data but poorly on new data because it learned noise rather than signal.' }
      ],
      dl: [
        { q: 'What does backpropagation compute?', opts: ['Forward predictions', 'The gradient of the loss with respect to each weight', 'The learning rate', 'New training data'], answer: 1, explain: 'Backpropagation uses the chain rule to compute how much each weight contributed to the error, then adjusts weights accordingly.' },
        { q: 'Why do neural networks need non-linear activation functions?', opts: ['To speed up training', 'Without them, stacking layers is equivalent to a single linear layer', 'To reduce memory usage', 'To normalize outputs'], answer: 1, explain: 'Without non-linearities, any composition of linear layers collapses to a single linear transformation. Activations like ReLU let the network learn complex patterns.' },
        { q: 'What does the learning rate control?', opts: ['How many epochs to train', 'The size of each weight update step', 'The number of layers', 'The batch size'], answer: 1, explain: 'The learning rate scales the gradient update. Too large causes divergence, too small causes slow or stuck training.' }
      ],
      llm: [
        { q: 'What does self-attention allow a transformer to do?', opts: ['Process tokens in order', 'Weight the importance of every token relative to every other token', 'Reduce vocabulary size', 'Compress the model'], answer: 1, explain: 'Self-attention computes pairwise relevance scores across all positions, allowing the model to relate distant tokens without recurrence.' },
        { q: 'Why do LLMs use tokenizers instead of raw characters?', opts: ['Characters are too large', 'Tokens compress frequent patterns into single units, reducing sequence length', 'Tokenizers are faster to train', 'Characters cannot be embedded'], answer: 1, explain: 'Subword tokenizers like BPE balance vocabulary size against sequence length, making common words single tokens while handling rare words as pieces.' },
        { q: 'What is the key difference between pre-training and fine-tuning?', opts: ['Pre-training uses labeled data', 'Pre-training learns general language; fine-tuning adapts to a specific task', 'Fine-tuning uses more data', 'There is no difference'], answer: 1, explain: 'Pre-training learns language patterns from massive unlabeled text. Fine-tuning takes that foundation and specializes it on smaller, task-specific data.' }
      ],
      rag: [
        { q: 'What is the core idea behind RAG?', opts: ['Training a larger model', 'Retrieving relevant context before generating a response', 'Using more GPUs', 'Reducing model size'], answer: 1, explain: 'RAG (Retrieval-Augmented Generation) grounds LLM responses in retrieved documents, reducing hallucination and enabling knowledge updates without retraining.' },
        { q: 'What do embedding models produce?', opts: ['Text summaries', 'Dense vector representations of text', 'Token counts', 'Grammar corrections'], answer: 1, explain: 'Embedding models map text into fixed-dimensional vectors where semantic similarity corresponds to geometric proximity.' },
        { q: 'Why use cosine similarity for comparing embeddings?', opts: ['It is the only metric', 'It measures angular similarity regardless of vector magnitude', 'It is faster than dot product', 'It works with integers only'], answer: 1, explain: 'Cosine similarity normalizes for magnitude, focusing on direction. Two texts about the same topic will have high cosine similarity regardless of length.' }
      ],
      agents: [
        { q: 'What distinguishes an AI agent from a simple chatbot?', opts: ['Agents are faster', 'Agents can take actions and use tools autonomously', 'Agents use bigger models', 'There is no difference'], answer: 1, explain: 'Agents have a loop: observe, decide, act. They can call tools, read files, search the web, and chain multiple steps to complete complex tasks.' },
        { q: 'What is MCP (Model Context Protocol)?', opts: ['A model training format', 'A standardized protocol for connecting AI models to tools and data sources', 'A compression algorithm', 'A testing framework'], answer: 1, explain: 'MCP provides a universal interface between AI assistants and external tools/data, replacing one-off integrations with a standard protocol.' },
        { q: 'Why is tool-use important for LLMs?', opts: ['It reduces cost', 'It lets LLMs access real-time information and take actions beyond text generation', 'It makes responses shorter', 'It removes hallucinations entirely'], answer: 1, explain: 'Tools extend LLMs beyond their training data cutoff, enabling real-time lookups, calculations, code execution, and interaction with external systems.' }
      ],
      safety: [
        { q: 'Why are evals critical for production AI systems?', opts: ['To save money', 'To measure performance objectively before and after changes', 'To make the model bigger', 'Evals are optional'], answer: 1, explain: 'Evals are the tests of AI engineering. Without them, you cannot know if a change improved or regressed quality. They should run on every code change.' },
        { q: 'What does "alignment" mean in AI safety?', opts: ['Aligning text on screen', 'Ensuring AI systems act according to human intentions and values', 'Making models faster', 'Using the same training data'], answer: 1, explain: 'Alignment ensures that as AI systems become more capable, they remain helpful, honest, and harmless, acting in accordance with human goals.' },
        { q: 'What is a guardrail in the context of deployed LLMs?', opts: ['A physical barrier', 'A check that prevents harmful, off-topic, or policy-violating outputs', 'A backup model', 'A caching layer'], answer: 1, explain: 'Guardrails filter inputs and outputs at runtime, catching toxicity, prompt injection, PII leaks, and other risks before they reach the user.' }
      ],
      general: [
        { q: 'What does "from scratch" mean in this course?', opts: ['Using no computer', 'Building each concept by implementing it yourself, not just reading theory', 'Starting from assembly language', 'Only using pen and paper'], answer: 1, explain: 'This course follows a Build-Use-Ship methodology: first understand by building it, then apply it, then ship it as a real artifact.' },
        { q: 'Why does this course combine math, ML, and engineering?', opts: ['To make it longer', 'Because real AI engineering requires all three to build production systems', 'Math is just for fun', 'Engineering is optional'], answer: 1, explain: 'Production AI systems require mathematical foundations (for understanding), ML knowledge (for modeling), and engineering skills (for deployment and reliability).' },
        { q: 'What is the "Ship" step in the Build-Use-Ship framework?', opts: ['Mailing physical goods', 'Creating a reusable artifact like a prompt, skill, or tool from what you learned', 'Publishing a paper', 'Deleting your code'], answer: 2, explain: 'The Ship step turns your learning into something tangible: a prompt, skill file, MCP tool, or CLI utility that others (or future you) can use immediately.' }
      ]
    },
    fa: {
      math: [
        { q: 'ضرب داخلی بین دو بردار چه چیزی را می‌سنجد؟', opts: ['مجموع آن‌ها', 'میزان هم‌راستایی آن‌ها', 'ضرب خارجی آن‌ها', 'فاصلهٔ میان آن‌ها'], answer: 1, explain: 'ضرب داخلی شباهت یا هم‌راستایی دو بردار را می‌سنجد. وقتی صفر باشد، دو بردار متعامد هستند.' },
        { q: 'گرادیان یک تابع به کدام سمت اشاره می‌کند؟', opts: ['کمینه', 'تندترین شیب افزایش', 'نزدیک‌ترین نقطهٔ زینی', 'یک جهت تصادفی'], answer: 1, explain: 'گرادیان همیشه در جهت تندترین افزایش است. گرادیان کاهشی در جهت مخالف گرادیان حرکت می‌کند تا کمینه‌ها را پیدا کند.' },
        { q: 'ضرب یک ماتریس با شکل (3, 5) در ماتریسی با شکل (5, 2) چه شکلی تولید می‌کند؟', opts: ['(3, 2)', '(5, 5)', '(3, 5)', '(2, 3)'], answer: 0, explain: 'ضرب ماتریسی: (m, n) × (n, p) = (m, p). پس (3, 5) × (5, 2) = (3, 2).' }
      ],
      ml: [
        { q: 'هدف تابع خطا (loss function) در یادگیری ماشین چیست؟', opts: ['تولید داده', 'سنجش میزان اشتباه بودن پیش‌بینی‌ها', 'انتخاب ویژگی', 'تقسیم داده'], answer: 1, explain: 'تابع خطا اختلاف میان مقادیر پیش‌بینی‌شده و واقعی را کمّی می‌کند. بهینه‌ساز در طول آموزش این مقدار را کمینه می‌کند.' },
        { q: 'چرا داده را به مجموعهٔ آموزش و آزمون تقسیم می‌کنیم؟', opts: ['برای صرفه‌جویی در حافظه', 'برای ارزیابی تعمیم‌پذیری روی دادهٔ دیده‌نشده', 'برای سریع‌تر شدن آموزش', 'برای کوچک کردن مجموعهٔ داده'], answer: 1, explain: 'مجموعهٔ آزمون نقش دادهٔ دیده‌نشده را بازی می‌کند و نشان می‌دهد مدل دادهٔ آموزش را حفظ کرده یا الگوهای تعمیم‌پذیر یاد گرفته است.' },
        { q: 'بیش‌برازش (overfitting) به چه معناست؟', opts: ['مدل بیش از حد ساده است', 'مدل دادهٔ آموزش را حفظ می‌کند اما روی دادهٔ جدید شکست می‌خورد', 'مدل بیش از حد کند آموزش می‌بیند', 'خطا بیش از حد کم است'], answer: 1, explain: 'بیش‌برازش وقتی رخ می‌دهد که مدل روی دادهٔ آموزش خوب کار کند اما روی دادهٔ جدید ضعیف باشد، چون نوفه را یاد گرفته و نه سیگنال را.' }
      ],
      dl: [
        { q: 'انتشار رو‌به‌عقب (backpropagation) چه چیزی را محاسبه می‌کند؟', opts: ['پیش‌بینی‌های رو به جلو', 'گرادیان خطا نسبت به هر وزن', 'نرخ یادگیری', 'دادهٔ آموزشی جدید'], answer: 1, explain: 'انتشار رو‌به‌عقب با قاعدهٔ زنجیره‌ای محاسبه می‌کند هر وزن چه سهمی در خطا داشته است و سپس وزن‌ها را بر همان اساس تنظیم می‌کند.' },
        { q: 'چرا شبکه‌های عصبی به توابع فعال‌سازی غیرخطی نیاز دارند؟', opts: ['برای تسریع آموزش', 'بدون آن‌ها، روی هم چیدن لایه‌ها معادل یک لایهٔ خطی واحد است', 'برای کاهش مصرف حافظه', 'برای نرمال‌سازی خروجی‌ها'], answer: 1, explain: 'بدون غیرخطی‌بودن، هر ترکیبی از لایه‌های خطی به یک تبدیل خطی واحد فرومی‌ریزد. فعال‌سازهایی مثل ReLU به شبکه امکان یادگیری الگوهای پیچیده را می‌دهند.' },
        { q: 'نرخ یادگیری چه چیزی را کنترل می‌کند؟', opts: ['تعداد دوره‌های آموزش', 'اندازهٔ هر گام به‌روزرسانی وزن', 'تعداد لایه‌ها', 'اندازهٔ دسته'], answer: 1, explain: 'نرخ یادگیری، به‌روزرسانی گرادیان را مقیاس می‌دهد. بیش از حد بزرگ باعث واگرایی و بیش از حد کوچک باعث آموزش کند یا گیرکرده می‌شود.' }
      ],
      llm: [
        { q: 'خودتوجهی (self-attention) چه امکانی به یک ترنسفورمر می‌دهد؟', opts: ['پردازش توکن‌ها به ترتیب', 'وزن‌دهی به اهمیت هر توکن نسبت به همهٔ توکن‌های دیگر', 'کاهش اندازهٔ واژگان', 'فشرده‌سازی مدل'], answer: 1, explain: 'خودتوجهی امتیازهای ارتباط دوبه‌دو را در همهٔ موقعیت‌ها محاسبه می‌کند و به مدل امکان می‌دهد توکن‌های دور را بدون بازگشتی‌بودن به هم مرتبط کند.' },
        { q: 'چرا LLM‌ها به جای کاراکترهای خام از tokenizer استفاده می‌کنند؟', opts: ['کاراکترها بیش از حد بزرگ‌اند', 'توکن‌ها الگوهای پرتکرار را در واحدهای یگانه فشرده می‌کنند و طول دنباله را کم می‌کنند', 'آموزش tokenizer سریع‌تر است', 'کاراکترها را نمی‌توان امبد کرد'], answer: 1, explain: 'tokenizer‌های زیرواژه‌ای مانند BPE تعادلی میان اندازهٔ واژگان و طول دنباله برقرار می‌کنند: واژه‌های رایج یک توکن می‌شوند و واژه‌های کم‌یاب به قطعه‌ها شکسته می‌شوند.' },
        { q: 'تفاوت کلیدی پیش‌آموزش و fine-tuning چیست؟', opts: ['پیش‌آموزش از دادهٔ برچسب‌دار استفاده می‌کند', 'پیش‌آموزش زبان عمومی را یاد می‌گیرد؛ fine-tuning آن را به یک وظیفهٔ خاص تطبیق می‌دهد', 'fine-tuning از دادهٔ بیشتری استفاده می‌کند', 'تفاوتی وجود ندارد'], answer: 1, explain: 'پیش‌آموزش الگوهای زبانی را از حجم عظیمی از متن بی‌برچسب یاد می‌گیرد. fine-tuning آن پایه را می‌گیرد و روی دادهٔ کوچک‌تر و وظیفه‌محور تخصصی می‌کند.' }
      ],
      rag: [
        { q: 'ایدهٔ اصلی RAG چیست؟', opts: ['آموزش یک مدل بزرگ‌تر', 'بازیابی زمینهٔ مرتبط پیش از تولید پاسخ', 'استفاده از GPU بیشتر', 'کوچک کردن مدل'], answer: 1, explain: 'RAG (تولید تقویت‌شده با بازیابی) پاسخ‌های LLM را به اسناد بازیابی‌شده متصل می‌کند و بدون آموزش مجدد، توهم را کم و به‌روزرسانی دانش را ممکن می‌کند.' },
        { q: 'مدل‌های امبدینگ چه چیزی تولید می‌کنند؟', opts: ['خلاصهٔ متن', 'بازنمایی‌های برداری چگال از متن', 'شمارش توکن', 'اصلاح دستور زبان'], answer: 1, explain: 'مدل‌های امبدینگ متن را به بردارهایی با ابعاد ثابت نگاشت می‌کنند که در آن‌ها شباهت معنایی معادل نزدیکی هندسی است.' },
        { q: 'چرا برای مقایسهٔ امبدینگ‌ها از شباهت کسینوسی استفاده می‌شود؟', opts: ['تنها معیار موجود است', 'شباهت زاویه‌ای را مستقل از بزرگی بردار می‌سنجد', 'از ضرب داخلی سریع‌تر است', 'فقط با اعداد صحیح کار می‌کند'], answer: 1, explain: 'شباهت کسینوسی بزرگی را نرمال می‌کند و بر جهت تمرکز دارد. دو متن دربارهٔ یک موضوع، مستقل از طولشان شباهت کسینوسی بالایی دارند.' }
      ],
      agents: [
        { q: 'چه چیزی یک agent هوش مصنوعی را از یک چت‌بات ساده متمایز می‌کند؟', opts: ['agent‌ها سریع‌ترند', 'agent‌ها می‌توانند خودمختار عمل کنند و از ابزار استفاده کنند', 'agent‌ها از مدل‌های بزرگ‌تری استفاده می‌کنند', 'تفاوتی وجود ندارد'], answer: 1, explain: 'agent‌ها یک حلقه دارند: مشاهده، تصمیم، عمل. می‌توانند ابزار صدا بزنند، فایل بخوانند، وب را جست‌وجو کنند و چند گام را برای انجام وظایف پیچیده به هم زنجیر کنند.' },
        { q: 'MCP (پروتکل زمینهٔ مدل) چیست؟', opts: ['یک قالب آموزش مدل', 'یک پروتکل استانداردشده برای اتصال مدل‌های AI به ابزارها و منابع داده', 'یک الگوریتم فشرده‌سازی', 'یک چارچوب تست'], answer: 1, explain: 'MCP یک واسط جهانی میان دستیارهای AI و ابزارها/داده‌های بیرونی فراهم می‌کند و یکپارچه‌سازی‌های موردی را با یک پروتکل استاندارد جایگزین می‌کند.' },
        { q: 'چرا استفاده از ابزار برای LLM‌ها مهم است؟', opts: ['هزینه را کم می‌کند', 'به LLM‌ها امکان دسترسی به اطلاعات لحظه‌ای و انجام کارهایی فراتر از تولید متن را می‌دهد', 'پاسخ‌ها را کوتاه‌تر می‌کند', 'توهم را کاملاً حذف می‌کند'], answer: 1, explain: 'ابزارها LLM را از مرز دادهٔ آموزشی‌اش فراتر می‌برند و جست‌وجوی لحظه‌ای، محاسبه، اجرای کد و تعامل با سیستم‌های بیرونی را ممکن می‌کنند.' }
      ],
      safety: [
        { q: 'چرا eval‌ها برای سیستم‌های AI عملیاتی حیاتی‌اند؟', opts: ['برای صرفه‌جویی در هزینه', 'برای سنجش عینی عملکرد، پیش و پس از تغییرات', 'برای بزرگ‌تر کردن مدل', 'eval‌ها اختیاری‌اند'], answer: 1, explain: 'eval‌ها تست‌های مهندسی AI هستند. بدون آن‌ها نمی‌دانید یک تغییر کیفیت را بهتر کرده یا بدتر. باید در هر تغییر کد اجرا شوند.' },
        { q: '«هم‌راستایی» (alignment) در ایمنی AI به چه معناست؟', opts: ['تراز کردن متن روی صفحه', 'اطمینان از این‌که سیستم‌های AI بر اساس مقاصد و ارزش‌های انسانی عمل کنند', 'سریع‌تر کردن مدل‌ها', 'استفاده از دادهٔ آموزشی یکسان'], answer: 1, explain: 'هم‌راستایی تضمین می‌کند که سیستم‌های AI با توانمندتر شدن، هم‌چنان یاری‌رسان، صادق و بی‌آزار بمانند و مطابق اهداف انسانی عمل کنند.' },
        { q: 'حصار حفاظتی (guardrail) در LLM‌های مستقرشده چیست؟', opts: ['یک مانع فیزیکی', 'بررسی‌ای که از خروجی‌های آسیب‌زا، بی‌ربط یا ناقض سیاست جلوگیری می‌کند', 'یک مدل پشتیبان', 'یک لایهٔ کش'], answer: 1, explain: 'حصارهای حفاظتی ورودی و خروجی را در زمان اجرا فیلتر می‌کنند و سمّیت، تزریق prompt، افشای اطلاعات شخصی و سایر ریسک‌ها را پیش از رسیدن به کاربر می‌گیرند.' }
      ],
      general: [
        { q: '«از صفر» در این دوره به چه معناست؟', opts: ['استفاده نکردن از کامپیوتر', 'ساختن هر مفهوم با پیاده‌سازی خودتان، نه فقط خواندن نظریه', 'شروع از زبان اسمبلی', 'استفاده تنها از کاغذ و قلم'], answer: 1, explain: 'این دوره از روش بساز-استفاده کن-عرضه کن پیروی می‌کند: نخست با ساختن بفهم، سپس به کار ببر و در پایان به‌عنوان یک خروجی واقعی عرضه کن.' },
        { q: 'چرا این دوره ریاضیات، یادگیری ماشین و مهندسی را با هم ترکیب می‌کند؟', opts: ['برای طولانی‌تر شدن', 'چون مهندسی AI واقعی برای ساخت سیستم‌های عملیاتی به هر سه نیاز دارد', 'ریاضیات فقط برای سرگرمی است', 'مهندسی اختیاری است'], answer: 1, explain: 'سیستم‌های AI عملیاتی به مبانی ریاضی (برای فهم)، دانش یادگیری ماشین (برای مدل‌سازی) و مهارت مهندسی (برای استقرار و اتکاپذیری) نیاز دارند.' },
        { q: 'گام «عرضه» در چارچوب بساز-استفاده کن-عرضه کن چیست؟', opts: ['ارسال کالای فیزیکی', 'ساختن یک خروجی قابل‌استفادهٔ مجدد مثل prompt، skill یا ابزار از آنچه یاد گرفتید', 'انتشار یک مقاله', 'حذف کردن کدتان'], answer: 2, explain: 'گام عرضه، یادگیری شما را به چیزی ملموس تبدیل می‌کند: یک prompt، یک فایل skill، یک ابزار MCP یا یک برنامهٔ خط فرمان که دیگران (یا خودِ آیندهٔ شما) بی‌درنگ بتوانند استفاده کنند.' }
      ]
    }
  };

  window.AIFS_STRINGS = STRINGS;
  window.AIFS_PHASE_LABELS = PHASE_LABELS;
  window.AIFS_QUIZ_BANK = QUIZ_BANK;
}());
