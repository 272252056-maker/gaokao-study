const GRADES = [
  { id: 'g1', name: '高一', ready: true, icon: '📘' },
  { id: 'g2', name: '高二', ready: false, icon: '📗' },
  { id: 'g3', name: '高三', ready: false, icon: '📙' },
  { id: 'review', name: '总复习', ready: false, icon: '🎓' }
];

const MODULES = []; // 已废弃，测试移至英语模块下

const ENGLISH_SECTIONS = [
  { id: 'today', name: '今日学习', desc: '任务 · 进度 · 打卡', icon: '📅' },
  { id: 'plan', name: '计划', desc: '学习任务安排', icon: '📋' },
  { id: 'knowledge', name: '知识点', desc: '单词 · 语法 · 阅读 · 听力', icon: '📚' },
  { id: 'test', name: '测试', desc: '单词 · 语法 · 真题', icon: '✅' },
  { id: 'stats', name: '统计', desc: '学习数据与趋势', icon: '📊' },
  { id: 'settings', name: '设置', desc: '每日词数等', icon: '⚙️' }
];

const KNOWLEDGE_MODULES = [
  { id: 'words', name: '单词', desc: '新词 + 艾宾浩斯复习', icon: '📝' },
  { id: 'grammar', name: '语法', desc: '6 大类 + 专项练习', icon: '📖' },
  { id: 'reading', name: '阅读', desc: '10 篇精读', icon: '📰' },
  { id: 'listening', name: '听力', desc: '5 段模拟', icon: '🎧' }
];

const ENGLISH_MODULES = KNOWLEDGE_MODULES; // 兼容旧引用

const SUBJECTS = [
  { id: 'english', name: '英语', icon: '🔤', ready: true },
  { id: 'chinese', name: '语文', icon: '📜', ready: false },
  { id: 'physics', name: '物理', icon: '⚛️', ready: false },
  { id: 'math', name: '数学', icon: '🔢', ready: false },
  { id: 'chemistry', name: '化学', icon: '🧪', ready: false },
  { id: 'biology', name: '生物', icon: '🧬', ready: false }
];

const state = {
  grade: null,
  subject: null,
  englishSection: null,
  knowledgeModule: null,
  currentWords: [],
  hideMeanings: false,
  quiz: null,
  inQuiz: false,
  grammarTopic: null,
  wordSearch: '',
  wordMode: 'browse',
  alphaLetter: 'A',
  studyQueue: [],
  studyIndex: 0,
  studyFlipped: false,
  studyMode: 'mixed',
  wrongFilter: 'all',
  readingArticleId: null,
  listeningItemId: null,
  grammarTopicRef: null,
  alphaIndex: null,
  prefixIndex: null,
  wordsLoaded: false,
  wordsLoading: false,
  quizType: 'word',
  inWrongBook: false,
  preferredVoice: null,
  ttsReady: false,
  gaokaoPaperId: null,
  gaokaoShowAll: false
};

let WORD_BANK = [];

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

function showToast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2000);
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickRandom(n) {
  if (!WORD_BANK.length) return [];
  return shuffle(WORD_BANK).slice(0, Math.min(n, WORD_BANK.length));
}

async function loadWordBank() {
  if (state.wordsLoaded || state.wordsLoading) return WORD_BANK;
  state.wordsLoading = true;
  try {
    if (window.WORD_BANK_DATA?.length) {
      WORD_BANK = window.WORD_BANK_DATA;
    } else {
      const res = await fetch('data/words.json');
      if (!res.ok) throw new Error('词库加载失败');
      WORD_BANK = await res.json();
    }
    state.wordsLoaded = true;
    buildAlphaIndex();
    state.prefixIndex = buildConfusingIndex(WORD_BANK);
  } catch (err) {
    console.error(err);
    showToast('词库加载失败');
  } finally {
    state.wordsLoading = false;
  }
  return WORD_BANK;
}

function buildAlphaIndex() {
  const index = {};
  for (const w of WORD_BANK) {
    const c = (w.word[0] || '#').toUpperCase();
    const letter = /[A-Z]/.test(c) ? c : '#';
    if (!index[letter]) index[letter] = [];
    index[letter].push(w);
  }
  state.alphaIndex = index;
}

function renderAlphaBar() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'.split('');
  const bar = $('#alphaBar');
  const info = $('#alphaInfo');
  if (state.wordMode !== 'alpha' || state.wordSearch.trim()) {
    bar.hidden = true;
    info.hidden = true;
    return;
  }
  bar.hidden = false;
  info.hidden = false;
  bar.innerHTML = letters.map(l => {
    const cnt = state.alphaIndex?.[l]?.length || 0;
    return `<button class="alpha-btn ${l === state.alphaLetter ? 'active' : ''}" data-letter="${l}" type="button" ${cnt ? '' : 'disabled style="opacity:0.35"'}>${l}<span class="cnt">${cnt || ''}</span></button>`;
  }).join('');
  const list = state.alphaIndex?.[state.alphaLetter] || [];
  info.textContent = `${state.alphaLetter} 开头共 ${list.length} 个单词`;
}

function initVoice() {
  const pick = () => {
    const voices = window.speechSynthesis?.getVoices() || [];
    state.preferredVoice =
      voices.find(v => /samantha|zira|karen|victoria|fiona|serena|jenny|aria|female|女/i.test(v.name) && /en/i.test(v.lang)) ||
      voices.find(v => /en-US/i.test(v.lang) && /google|microsoft|apple/i.test(v.name)) ||
      voices.find(v => /en-US/i.test(v.lang)) ||
      voices.find(v => /en/i.test(v.lang)) ||
      voices[0] || null;
    if (voices.length) state.ttsReady = true;
  };
  pick();
  if (window.speechSynthesis) {
    window.speechSynthesis.onvoiceschanged = pick;
  }
}

function unlockTTS() {
  if (!window.speechSynthesis || state.ttsReady) return;
  const u = new SpeechSynthesisUtterance(' ');
  u.volume = 0.01;
  window.speechSynthesis.speak(u);
  initVoice();
}

function getWordExample(w) {
  if (w.example?.trim()) {
    return { en: w.example, zh: w.exampleZh || '' };
  }
  const m = (w.meaning || '').split(/[；;,，]/)[0].slice(0, 20);
  return {
    en: `I am learning the word "${w.word}" for the exam.`,
    zh: `我正在为考试学习「${w.word}」(${m})。`
  };
}

function speak(text, rate = 0.88) {
  if (!('speechSynthesis' in window) || !text) {
    showToast('当前浏览器不支持朗读');
    return;
  }
  unlockTTS();
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(String(text).trim());
  u.lang = 'en-US';
  u.rate = rate;
  u.pitch = 1;
  const voices = window.speechSynthesis.getVoices();
  const voice = state.preferredVoice ||
    voices.find(v => /en-US/i.test(v.lang)) ||
    voices.find(v => /en/i.test(v.lang));
  if (voice) u.voice = voice;
  u.onerror = () => showToast('朗读失败，请再点一次');
  window.speechSynthesis.speak(u);
}

function speakWord(w) {
  if (!w?.word) return;
  speak(w.word, 0.85);
}

function loadWrongBook() {
  return LearningCore.loadWrongBook();
}

function saveWrongBook(list) {
  LearningCore.saveWrongBook(list);
  updateWrongBookCount();
}

function updateWrongBookCount() {
  const n = loadWrongBook().length;
  if ($('#wrongBookCount')) $('#wrongBookCount').textContent = n;
  if ($('#wrongListCount')) $('#wrongListCount').textContent = n;
}

function addToWrongBook(entry) {
  LearningCore.addToWrongBook(entry);
  updateWrongBookCount();
}

function addWordWrong(cur, wrongWord) {
  addToWrongBook({
    id: `word:${cur.word}`,
    type: 'word',
    word: cur.word,
    meaning: cur.meaning,
    pos: cur.pos,
    example: getWordExample(cur).en,
    exampleZh: getWordExample(cur).zh,
    wrongAnswer: wrongWord,
    correctAnswer: cur.word
  });
}

function addGrammarWrong(cur, wrongIdx) {
  addToWrongBook({
    id: `grammar:${cur.q}`,
    type: 'grammar',
    tag: cur.tag,
    q: cur.q,
    options: cur.options,
    wrongAnswer: cur.options[wrongIdx],
    correctAnswer: cur.options[cur.answer],
    hint: cur.hint,
    answer: cur.answer
  });
}

function openWrongBook() {
  state.inWrongBook = true;
  renderWrongBook();
  showView('wrong-book');
}

function renderWrongBook() {
  const list = LearningCore.getWrongBookSorted(state.wrongFilter);
  updateWrongBookCount();
  $$('#wrongFilters .filter-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.wrongFilter === state.wrongFilter);
  });
  if (!list.length) {
    $('#wrongList').innerHTML = '<div class="placeholder-box"><p>暂无错题</p><small>测验答错的题目会自动收录到这里</small></div>';
    return;
  }
  $('#wrongList').innerHTML = list.map(item => {
    const badge = `<span class="wrong-count-badge">错 ${item.count || 1} 次</span>`;
    if (item.type === 'word') {
      return `
        <div class="wrong-item" data-id="${escapeHtml(item.id)}">
          <div class="wrong-item-head">
            <div class="wrong-item-title">${escapeHtml(item.word)}${badge}</div>
            <button class="wrong-item-del" data-del-wrong="${escapeHtml(item.id)}" type="button">×</button>
          </div>
          <div class="wrong-meta">${escapeHtml(item.pos || '')} ${escapeHtml(item.meaning || '')}</div>
          <div class="wrong-meta">例句：${escapeHtml(item.example || '')}</div>
          <div class="wrong-meta">你的答案：<span class="wrong-a">${escapeHtml(item.wrongAnswer)}</span> → 正确：<span class="right-a">${escapeHtml(item.correctAnswer)}</span></div>
        </div>`;
    }
    if (item.type === 'reading') {
      return `
        <div class="wrong-item" data-id="${escapeHtml(item.id)}">
          <div class="wrong-item-head">
            <div class="wrong-item-title"><span class="tag">阅读</span> ${escapeHtml(item.q)}${badge}</div>
            <button class="wrong-item-del" data-del-wrong="${escapeHtml(item.id)}" type="button">×</button>
          </div>
          <div class="wrong-meta">你的答案：<span class="wrong-a">${escapeHtml(item.wrongAnswer)}</span> → 正确：<span class="right-a">${escapeHtml(item.correctAnswer)}</span></div>
          <div class="wrong-meta">💡 ${escapeHtml(item.hint || '')}</div>
        </div>`;
    }
    return `
      <div class="wrong-item" data-id="${escapeHtml(item.id)}">
        <div class="wrong-item-head">
          <div class="wrong-item-title"><span class="tag">${escapeHtml(item.tag)}</span> ${escapeHtml(item.q)}${badge}</div>
          <button class="wrong-item-del" data-del-wrong="${escapeHtml(item.id)}" type="button">×</button>
        </div>
        <div class="wrong-meta">你的答案：<span class="wrong-a">${escapeHtml(item.wrongAnswer)}</span> → 正确：<span class="right-a">${escapeHtml(item.correctAnswer)}</span></div>
        <div class="wrong-meta">💡 ${escapeHtml(item.hint || '')}</div>
      </div>`;
  }).join('');
}

function startWrongReview() {
  const list = LearningCore.getWrongBookSorted(state.wrongFilter);
  if (!list.length) {
    showToast('错题库是空的');
    return;
  }
  const pool = list.slice(0, Math.min(10, list.length));
  state.quizType = 'wrong';
  state.quiz = { pool, index: 0, score: 0, answered: false };
  state.inQuiz = true;
  state.inWrongBook = false;
  renderWrongReviewQuestion();
  showView('quiz');
}

function renderWrongReviewQuestion() {
  const q = state.quiz;
  if (q.index >= q.pool.length) {
    $('#quizArea').innerHTML = `
      <div class="quiz-result">
        <div class="quiz-score">${q.score}/${q.pool.length}</div>
        <p style="margin-top:12px;color:var(--text-muted)">错题复习完成！</p>
        <div class="btn-row" style="margin-top:20px">
          <button class="btn" id="retryQuiz">再来一次</button>
          <button class="btn btn-secondary" id="backTest">返回错题库</button>
        </div>
      </div>`;
    $('#retryQuiz').onclick = startWrongReview;
    $('#backTest').onclick = () => { state.inQuiz = false; openWrongBook(); };
    return;
  }
  const item = q.pool[q.index];
  if (item.type === 'word') {
    const wrongOpts = shuffle(WORD_BANK.filter(w => w.word !== item.word)).slice(0, 3).map(w => w.word);
    const options = shuffle([item.word, ...wrongOpts]);
    $('#quizArea').innerHTML = `
      <div class="quiz-progress">错题复习 ${q.index + 1} / ${q.pool.length}</div>
      <div class="quiz-tag">单词</div>
      <div class="quiz-meaning">${escapeHtml(item.meaning)}</div>
      <div class="quiz-options">
        ${options.map(o => `<button class="quiz-opt" data-word="${escapeHtml(o)}" type="button">${escapeHtml(o)}</button>`).join('')}
      </div>`;
  } else {
    const opts = shuffle([...item.options]);
    const shuffledAnswer = opts.indexOf(item.correctAnswer);
    item._shuffledAnswer = shuffledAnswer;
    $('#quizArea').innerHTML = `
      <div class="quiz-progress">错题复习 ${q.index + 1} / ${q.pool.length}</div>
      <div class="quiz-tag">${escapeHtml(item.tag)}</div>
      <div class="quiz-meaning">${escapeHtml(item.q)}</div>
      <div class="quiz-options">
        ${opts.map((o, i) => `<button class="quiz-opt" data-idx="${i}" type="button">${escapeHtml(o)}</button>`).join('')}
      </div>`;
  }
}

function handleWrongReviewAnswer(word, idx) {
  if (state.quiz.answered) return;
  state.quiz.answered = true;
  const item = state.quiz.pool[state.quiz.index];
  let correct = false;
  if (item.type === 'word') {
    correct = word === item.word;
    $$('.quiz-opt').forEach(btn => {
      if (btn.dataset.word === item.word) btn.classList.add('correct');
      else if (btn.dataset.word === word && !correct) btn.classList.add('wrong');
      btn.disabled = true;
    });
  } else {
    correct = idx === item._shuffledAnswer;
    $$('.quiz-opt').forEach(btn => {
      const i = Number(btn.dataset.idx);
      if (i === item._shuffledAnswer) btn.classList.add('correct');
      else if (i === idx && !correct) btn.classList.add('wrong');
      btn.disabled = true;
    });
  }
  if (correct) {
    state.quiz.score++;
    LearningCore.handleWrongReviewResult(item, true);
  } else {
    LearningCore.handleWrongReviewResult(item, false);
    if (item.type === 'grammar') {
      addToWrongBook({
        id: item.id,
        type: 'grammar',
        tag: item.tag,
        q: item.q,
        options: item.options,
        wrongAnswer: item.options[idx],
        correctAnswer: item.correctAnswer,
        hint: item.hint,
        answer: item.answer
      });
    } else if (item.type === 'word') {
      addToWrongBook({
        id: item.id,
        type: 'word',
        word: item.word,
        meaning: item.meaning,
        pos: item.pos,
        example: item.example,
        exampleZh: item.exampleZh,
        wrongAnswer: word,
        correctAnswer: item.word
      });
    }
  }
  setTimeout(() => {
    state.quiz.index++;
    state.quiz.answered = false;
    renderWrongReviewQuestion();
  }, 800);
}

function getLearnedCount() {
  return LearningCore.getProgressStats(WORD_BANK).mastered;
}

function loadPlans() {
  return LearningCore.loadPlans();
}

function savePlans(plans) {
  LearningCore.savePlans(plans);
}

function showView(id) {
  $$('.view').forEach(v => v.classList.remove('active'));
  $(`#view-${id}`).classList.add('active');
  document.body.classList.toggle('is-home', id === 'home');
  if (id === 'home') renderHome();
  if (id === 'today') renderToday();
  if (id === 'stats') renderStats();
  if (id === 'settings') renderSettings();
  updateHeader();
}

function getBreadcrumb() {
  const parts = ['高中学习'];
  if (state.grade) parts.push(state.grade.name);
  if (state.subject) parts.push(state.subject.name);
  if (state.inWrongBook) parts.push('错题库');
  else if (state.readingArticleId) {
    parts.push('阅读');
    const a = getReadingById(state.readingArticleId);
    if (a) parts.push(a.titleZh || a.title);
  } else if (state.listeningItemId) {
    parts.push('听力');
    const l = getListeningById(state.listeningItemId);
    if (l) parts.push(l.titleZh || l.title);
  } else if ($('#view-word-study')?.classList.contains('active')) {
    parts.push('单词学习');
  } else if ($('#view-today')?.classList.contains('active')) {
    parts.push('今日学习');
  } else if ($('#view-stats')?.classList.contains('active')) {
    parts.push('学习统计');
  } else if ($('#view-settings')?.classList.contains('active')) {
    parts.push('学习设置');
  } else if (state.grammarTopic) {
    if (state.englishSection) parts.push(state.englishSection);
    parts.push(state.knowledgeModule || '语法');
    parts.push(state.grammarTopic.title);
  } else if (state.gaokaoPaperId) {
    parts.push('测试');
    const paper = GAOKAO_PAPERS.find(p => p.id === state.gaokaoPaperId);
    parts.push(paper ? paper.title : '高考真题');
  } else if ($('#view-exam')?.classList.contains('active')) {
    parts.push('历年高考真题');
  } else if (state.knowledgeModule) {
    if (state.englishSection) parts.push(state.englishSection);
    parts.push(state.knowledgeModule);
  } else if (state.englishSection) parts.push(state.englishSection);
  return parts;
}

function updateHeader() {
  const bc = getBreadcrumb();
  $('#pageTitle').textContent = bc[bc.length - 1];
  $('#pageSubtitle').textContent = bc.length > 1 ? bc.slice(0, -1).join(' › ') : '选择年级，开始今日学习';
  $('#breadcrumb').innerHTML = bc.map((p, i) =>
    i < bc.length - 1 ? `${p} › ` : `<span>${p}</span>`
  ).join('');
  $('#backBtn').classList.toggle('show', bc.length > 1);
}

function goHome() {
  state.grade = null;
  state.subject = null;
  state.englishSection = null;
  state.knowledgeModule = null;
  state.grammarTopic = null;
  state.gaokaoPaperId = null;
  showView('home');
}

function goBack() {
  const bc = getBreadcrumb();
  if (bc.length <= 1) return;
  if (state.readingArticleId) {
    state.readingArticleId = null;
    showView('reading');
  } else if (state.listeningItemId) {
    state.listeningItemId = null;
    showView('listening');
  } else if ($('#view-word-study')?.classList.contains('active')) {
    showView('words');
  } else if ($('#view-reading-detail')?.classList.contains('active')) {
    state.readingArticleId = null;
    showView('reading');
  } else if ($('#view-listening-detail')?.classList.contains('active')) {
    state.listeningItemId = null;
    showView('listening');
  } else if (state.grammarTopic) {
    state.grammarTopic = null;
    showView('grammar');
  } else if (state.knowledgeModule) {
    state.knowledgeModule = null;
    showView('knowledge');
  } else if (state.inQuiz) {
    state.inQuiz = false;
    if (state.quizType === 'wrong') openWrongBook();
    else showView('test');
  } else if (state.inWrongBook) {
    state.inWrongBook = false;
    showView('test');
  } else if ($('#view-exam')?.classList.contains('active')) {
    if (state.gaokaoPaperId) {
      state.gaokaoPaperId = null;
      state.gaokaoShowAll = false;
      renderGaokaoList();
    } else {
      showView('test');
    }
  } else if (state.englishSection === '知识点' && !state.knowledgeModule) {
    state.englishSection = null;
    showView('english');
  } else if (state.englishSection) {
    state.englishSection = null;
    showView('english');
  } else if ($('#view-today')?.classList.contains('active')) {
    goHome();
  } else if (state.subject) {
    state.subject = null;
    showView('subjects');
  } else if (state.grade) {
    goHome();
  }
}

function renderHome() {
  const hour = new Date().getHours();
  let greet = '晚上好';
  if (hour < 6) greet = '夜深了';
  else if (hour < 12) greet = '早上好';
  else if (hour < 18) greet = '下午好';
  const el = $('#homeGreeting');
  if (el) el.textContent = `${greet}，今天也要坚持学习 💪`;

  const days = ['日', '一', '二', '三', '四', '五', '六'];
  const d = new Date();
  const dateEl = $('#homeDate');
  if (dateEl) dateEl.textContent = `${d.getMonth() + 1}月${d.getDate()}日 周${days[d.getDay()]}`;

  const learnedEl = $('#homeStatLearned');
  const plansEl = $('#homeStatPlans');
  const wrongEl = $('#homeStatWrong');
  const stats = LearningCore.getProgressStats(WORD_BANK);
  if (learnedEl) learnedEl.textContent = stats.mastered;
  if (plansEl) plansEl.textContent = loadPlans().filter(p => !p.done).length;
  if (wrongEl) wrongEl.textContent = loadWrongBook().length;
}

function ensureEnglishContext() {
  const g = GRADES.find(x => x.id === 'g1');
  if (!g?.ready) return false;
  state.grade = g;
  state.subject = SUBJECTS.find(x => x.id === 'english');
  state.knowledgeModule = null;
  state.grammarTopic = null;
  state.gaokaoPaperId = null;
  return true;
}

function openToday() {
  if (!ensureEnglishContext()) return;
  state.englishSection = '今日学习';
  LearningCore.ensureSystemPlans();
  renderToday();
  showView('today');
}

function renderToday() {
  const progress = LearningCore.getTodayProgress();
  const streak = LearningCore.loadStreak();
  const stats = LearningCore.getProgressStats(WORD_BANK);
  const due = LearningCore.getDueReviewWords(WORD_BANK).length;
  const newTarget = LearningCore.getTodayNewWordTarget();

  const r = 42;
  const circ = 2 * Math.PI * r;
  const offset = circ - (progress.pct / 100) * circ;

  $('#todayHero').innerHTML = `
    <div class="streak-badge">🔥 已连续学习 ${streak.current || 0} 天 · 最高 ${streak.longest || 0} 天</div>
    <div class="progress-ring-wrap">
      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle class="progress-ring-bg" cx="50" cy="50" r="${r}"/>
        <circle class="progress-ring-fg" cx="50" cy="50" r="${r}"
          stroke-dasharray="${circ}" stroke-dashoffset="${offset}"/>
      </svg>
      <div class="progress-ring-text">
        <span class="pct">${progress.pct}%</span>
        <span class="lbl">${progress.done}/${progress.total} 任务</span>
      </div>
    </div>
    <p style="font-size:0.82rem;color:var(--text-muted)">已掌握 ${stats.mastered} 词 · 待复习 ${due} 词 · 今日新词 ${newTarget} 个</p>`;

  $('#todayTasks').innerHTML = progress.tasks.map(t => {
    const desc = {
      word_new: `目标 ${newTarget} 个新词`,
      word_review: due > 0 ? `${due} 个到期复习` : '暂无到期',
      grammar: '浏览 1 个语法知识点',
      quiz: '单词或语法测验 10 题',
      reading: '完成 1 篇阅读并答题'
    }[t.key] || '';
    return `
      <div class="task-item ${t.done ? 'done' : ''}" data-task="${t.key}">
        <span class="task-icon">${t.icon}</span>
        <div class="task-body">
          <div class="task-text">${escapeHtml(t.text)}</div>
          <div class="task-desc">${desc}</div>
        </div>
        <div class="task-check"></div>
      </div>`;
  }).join('');

  $('#todayQuick').innerHTML = `
    <div class="card" data-today-quick="word-study"><div class="card-icon">📝</div><div class="card-title">开始背词</div></div>
    <div class="card" data-today-quick="test"><div class="card-icon">✅</div><div class="card-title">做测验</div></div>
    <div class="card" data-today-quick="reading"><div class="card-icon">📰</div><div class="card-title">阅读</div></div>
    <div class="card" data-today-quick="english"><div class="card-icon">📚</div><div class="card-title">全部模块</div></div>`;
}

function handleTodayTask(key) {
  if (!ensureEnglishContext()) return;
  if (key === 'word_new' || key === 'word_review') {
    state.englishSection = '知识点';
    openWordStudy(key === 'word_review' ? 'review' : 'new');
  } else if (key === 'grammar') {
    state.englishSection = '知识点';
    openKnowledgeModule('grammar');
  } else if (key === 'quiz') {
    state.englishSection = '测试';
    showView('test');
  } else if (key === 'reading') {
    state.englishSection = '知识点';
    openReading();
  }
}

function buildStudyQueue(mode) {
  const settings = LearningCore.loadSettings();
  const review = LearningCore.getDueReviewWords(WORD_BANK);
  const newWords = LearningCore.getNewWordsForToday(WORD_BANK, settings.dailyNewWords);
  if (mode === 'review') return shuffle(review);
  if (mode === 'new') return shuffle(newWords);
  const queue = settings.reviewPriority ? [...shuffle(review), ...shuffle(newWords)] : [...shuffle(newWords), ...shuffle(review)];
  return queue;
}

async function openWordStudy(mode = 'mixed') {
  state.englishSection = state.englishSection || '知识点';
  state.knowledgeModule = '单词';
  if (!state.wordsLoaded) await loadWordBank();
  state.studyMode = mode;
  state.studyQueue = buildStudyQueue(mode);
  state.studyIndex = 0;
  state.studyFlipped = false;
  if (!state.studyQueue.length) {
    showView('words');
    showToast(mode === 'review' ? '今日复习已完成 🎉' : '暂无新词，进入复习模式');
    if (mode !== 'review') {
      state.studyQueue = buildStudyQueue('review');
      state.studyIndex = 0;
      if (state.studyQueue.length) {
        showView('word-study');
        renderStudyCard();
        return;
      }
    }
    return;
  }
  renderStudyCard();
  showView('word-study');
}

function renderStudyCard() {
  const total = state.studyQueue.length;
  if (state.studyIndex >= total) {
    const studied = state.studyQueue.map(w => w.word);
    if (state.studyMode === 'new' || state.studyMode === 'mixed') {
      LearningCore.markNewWordsStudied(studied);
    }
    if (state.studyMode === 'review' || state.studyMode === 'mixed') {
      LearningCore.completeTask('word_review');
    }
    $('#studyCard').innerHTML = `<div class="placeholder-box"><div class="icon">🎉</div><p>本轮学习完成！</p><small>共 ${total} 个单词</small></div>`;
    $('#studyProgress').textContent = '';
    $('#studyActions').style.display = 'none';
    return;
  }
  const w = state.studyQueue[state.studyIndex];
  const ex = getWordExample(w);
  const entry = LearningCore.getWordEntry(w.word);
  const statusLabel = { new: '新词', learning: '学习中', mastered: '已掌握', reviewing: '复习' }[entry?.status || 'new'] || '新词';

  $('#studyProgress').textContent = `${statusLabel} · ${state.studyIndex + 1} / ${total}`;
  if (!state.studyFlipped) {
    $('#studyCard').innerHTML = `
      <div class="study-word">${escapeHtml(w.word)}</div>
      <div class="study-phonetic">${escapeHtml(w.phonetic || '')}</div>
      <p style="font-size:0.78rem;color:var(--text-dim);margin-top:20px">点击「显示释义」或先自测</p>`;
    $('#studyActions').style.display = 'none';
  } else {
    $('#studyCard').innerHTML = `
      <div class="study-word">${escapeHtml(w.word)}</div>
      <div class="study-meaning">${escapeHtml(w.pos || '')} ${escapeHtml(w.meaning || '')}</div>
      <div class="study-example">${escapeHtml(ex.en)}</div>
      <div class="study-example" style="font-style:normal;color:var(--text-dim)">${escapeHtml(ex.zh)}</div>`;
    $('#studyActions').style.display = 'grid';
  }
  state._currentStudyWord = w;
}

function answerStudyCard(known) {
  if (!state._currentStudyWord) return;
  LearningCore.recordWordKnow(state._currentStudyWord.word, known);
  state.studyIndex++;
  state.studyFlipped = false;
  renderStudyCard();
}

function quickStart(target) {
  if (!ensureEnglishContext()) return;

  if (target === 'today') {
    openToday();
  } else if (target === 'words') {
    state.englishSection = '知识点';
    openWordStudy('mixed');
  } else if (target === 'test') {
    state.englishSection = '测试';
    updateWrongBookCount();
    showView('test');
  } else if (target === 'gaokao') {
    state.englishSection = '测试';
    openGaokao();
  }
}

const GRADE_DESC = {
  g1: '英语模块已上线',
  g2: '内容筹备中',
  g3: '内容筹备中',
  review: '冲刺复习专区'
};

function renderGrades() {
  $('#gradeGrid').innerHTML = GRADES.map(g => `
    <div class="grade-card ${g.ready ? 'ready' : 'locked'}" data-grade="${g.id}">
      <div class="grade-card-bg">${g.icon}</div>
      <div class="grade-card-body">
        <div class="grade-card-top">
          <span class="grade-name">${g.name}</span>
          <span class="grade-tag ${g.ready ? '' : 'soon'}">${g.ready ? '可学习' : '即将上线'}</span>
        </div>
        <div class="grade-desc">${GRADE_DESC[g.id] || (g.ready ? '点击进入' : '敬请期待')}</div>
      </div>
    </div>
  `).join('');
}

function openGrade(id) {
  const g = GRADES.find(x => x.id === id);
  if (!g || !g.ready) {
    $('#comingGrade').textContent = g ? g.name : '';
    state.grade = g;
    showView('coming');
    return;
  }
  state.grade = g;
  state.subject = null;
  state.englishSection = null;
  state.knowledgeModule = null;
  if (g.ready && g.id === 'g1') {
    openToday();
    return;
  }
  if ($('#gradeTip')) $('#gradeTip').textContent = `${g.name} · 选择科目开始学习`;
  renderSubjects();
  showView('subjects');
}

function renderEnglishSections() {
  $('#englishSectionGrid').innerHTML = ENGLISH_SECTIONS.map(m => `
    <div class="card lg card-accent" data-en-section="${m.id}">
      <div class="card-icon">${m.icon}</div>
      <div class="card-title">${m.name}</div>
      <div class="card-desc">${m.desc}</div>
    </div>
  `).join('');
}

function openEnglishSection(id) {
  const sec = ENGLISH_SECTIONS.find(m => m.id === id);
  state.englishSection = sec?.name || id;
  if (id === 'today') {
    renderToday();
    showView('today');
  } else if (id === 'plan') {
    LearningCore.ensureSystemPlans();
    renderPlanForm();
    renderPlans();
    showView('plan');
  } else if (id === 'knowledge') {
    renderKnowledgeModules();
    showView('knowledge');
  } else if (id === 'test') {
    updateWrongBookCount();
    showView('test');
  } else if (id === 'stats') {
    renderStats();
    showView('stats');
  } else if (id === 'settings') {
    renderSettings();
    showView('settings');
  }
}

function renderKnowledgeModules() {
  $('#knowledgeGrid').innerHTML = KNOWLEDGE_MODULES.map(m => `
    <div class="card" data-knowledge="${m.id}">
      <div class="card-icon">${m.icon}</div>
      <div class="card-title">${m.name}</div>
      <div class="card-desc">${m.desc}</div>
    </div>
  `).join('');
}

function openKnowledgeModule(id) {
  state.englishSection = '知识点';
  state.knowledgeModule = KNOWLEDGE_MODULES.find(m => m.id === id)?.name || id;
  if (id === 'words') openWords();
  else if (id === 'reading') openReading();
  else if (id === 'listening') openListening();
  else {
    state.knowledgeModule = '语法';
    renderGrammar();
    showView('grammar');
  }
}

function renderSubjects() {
  $('#subjectGrid').innerHTML = SUBJECTS.map(s => `
    <div class="card ${s.ready ? '' : 'disabled'}" data-subject="${s.id}">
      <div class="card-icon">${s.icon}</div>
      <div class="card-title">${s.name}</div>
    </div>
  `).join('');
}

function openSubject(id) {
  const s = SUBJECTS.find(x => x.id === id);
  if (!s || !s.ready) return;
  state.subject = s;
  if (id === 'english') {
    renderEnglishSections();
    showView('english');
  } else {
    $('#placeholderSubject').textContent = s.name;
    showView('subject-placeholder');
  }
}

async function openWords() {
  state.englishSection = state.englishSection || '知识点';
  state.knowledgeModule = '单词';
  showView('words');
  if (!state.wordsLoaded) {
    $('#wordList').innerHTML = '<div class="loading-box">正在加载高考词库（3500+）...</div>';
    await loadWordBank();
  }
  if (!state.currentWords.length) generateWords();
  else renderWords();
}

function renderGrammar() {
  $('#grammarList').innerHTML = GRAMMAR_CATEGORIES.map(cat => `
    <div class="grammar-cat" data-cat="${cat.id}">
      <div class="grammar-cat-header">
        <span class="icon">${cat.icon}</span>
        <span class="title">${cat.name}</span>
        <span class="count">${cat.topics.length} 个</span>
      </div>
      <div class="grammar-topics">
        ${cat.topics.map(t => `<div class="grammar-topic" data-topic="${cat.id}:${t.id}">${t.title}</div>`).join('')}
      </div>
    </div>
  `).join('');
}

function openGrammarTopic(catId, topicId) {
  const cat = GRAMMAR_CATEGORIES.find(c => c.id === catId);
  const topic = cat?.topics.find(t => t.id === topicId);
  if (!topic) return;
  state.grammarTopic = topic;
  state.grammarTopicRef = { catId, topicId };
  LearningCore.markGrammarVisited();
  const topicQuiz = getGrammarQuizByTopic(topicId);
  $('#grammarDetail').innerHTML = `
    <div class="grammar-block">
      <h3>${topic.title}</h3>
      <p>${topic.summary}</p>
    </div>
    <div class="grammar-block">
      <h3>结构</h3>
      <p>${topic.structure}</p>
    </div>
    <div class="grammar-block">
      <h3>例句</h3>
      ${topic.examples.map(ex => `
        <div class="grammar-example">
          <div class="en">${escapeHtml(ex.en)}</div>
          <div class="zh">${escapeHtml(ex.zh)}</div>
        </div>
      `).join('')}
    </div>
    <div class="grammar-block">
      <h3>要点</h3>
      <ul>${topic.tips.map(t => `<li>${escapeHtml(t)}</li>`).join('')}</ul>
    </div>
    ${topicQuiz.length ? `
      <div class="btn-row">
        <button class="btn" id="startTopicQuiz" type="button">做 ${Math.min(3, topicQuiz.length)} 题巩固</button>
      </div>` : ''}
  `;
  if (topicQuiz.length) {
    $('#startTopicQuiz').onclick = () => startTopicQuiz(topicId);
  }
  showView('grammar-detail');
}

function startTopicQuiz(topicId) {
  const pool = shuffle(getGrammarQuizByTopic(topicId)).slice(0, 3);
  if (!pool.length) return;
  state.quizType = 'grammar';
  state.quiz = { pool, index: 0, score: 0, answered: false, isTopicQuiz: true };
  state.inQuiz = true;
  renderQuizQuestion();
  showView('quiz');
}

function openReading() {
  state.knowledgeModule = '阅读';
  $('#readingList').innerHTML = READING_ARTICLES.map(a => `
    <div class="reading-card" data-reading="${a.id}">
      <div class="card-title">${escapeHtml(a.titleZh || a.title)}</div>
      <div class="reading-meta">难度 ${'★'.repeat(a.difficulty)}${'☆'.repeat(5 - a.difficulty)} · ${a.wordCount} 词 · ${escapeHtml(a.source)}</div>
      <div class="reading-meta">${escapeHtml(a.title)}</div>
    </div>
  `).join('');
  showView('reading');
}

function openReadingDetail(id) {
  const article = getReadingById(id);
  if (!article) return;
  state.readingArticleId = id;
  state.readingQuizIndex = 0;
  state.readingQuizScore = 0;
  state.readingAnswered = false;

  const vocabHtml = (article.vocab || []).map(v =>
    `<span class="vocab-chip" data-add-word="${escapeHtml(v.word)}" title="${escapeHtml(v.meaning)}">${escapeHtml(v.word)}</span>`
  ).join('');

  $('#readingDetail').innerHTML = `
    <div class="section-label">${escapeHtml(article.titleZh || article.title)}</div>
    <div class="reading-meta" style="margin-bottom:14px">${escapeHtml(article.title)} · ${article.wordCount} 词</div>
    <div class="reading-body">${article.paragraphs.map(p => `<p>${escapeHtml(p)}</p>`).join('')}</div>
    ${vocabHtml ? `<div class="section-label" style="margin-top:16px">重点词汇 <small style="font-weight:400;color:var(--text-dim)">点击加入词本</small></div><div>${vocabHtml}</div>` : ''}
    <div class="section-label" style="margin-top:20px">理解题</div>
    <div id="readingQuizArea"></div>`;
  renderReadingQuestion();
  showView('reading-detail');
}

function renderReadingQuestion() {
  const article = getReadingById(state.readingArticleId);
  if (!article) return;
  const idx = state.readingQuizIndex || 0;
  if (idx >= article.questions.length) {
    LearningCore.recordReadingComplete(state.readingArticleId);
    $('#readingQuizArea').innerHTML = `
      <div class="quiz-result">
        <div class="quiz-score">${state.readingQuizScore}/${article.questions.length}</div>
        <p style="margin-top:12px;color:var(--text-muted)">阅读完成！</p>
      </div>`;
    return;
  }
  const q = article.questions[idx];
  $('#readingQuizArea').innerHTML = `
    <div class="quiz-card" style="text-align:left">
      <div class="quiz-progress">第 ${idx + 1} / ${article.questions.length} 题</div>
      <div class="quiz-meaning" style="font-size:1rem;text-align:left">${escapeHtml(q.q)}</div>
      <div class="quiz-options">
        ${q.options.map((o, i) => `<button class="quiz-opt" data-reading-idx="${i}" type="button">${escapeHtml(o)}</button>`).join('')}
      </div>
      <div id="readingHint"></div>
    </div>`;
}

function handleReadingAnswer(optIdx) {
  if (state.readingAnswered) return;
  const article = getReadingById(state.readingArticleId);
  const q = article.questions[state.readingQuizIndex];
  const correct = optIdx === q.answer;
  state.readingAnswered = true;
  if (correct) state.readingQuizScore = (state.readingQuizScore || 0) + 1;
  else {
    addToWrongBook({
      id: `reading:${state.readingArticleId}:${state.readingQuizIndex}`,
      type: 'reading',
      q: q.q,
      options: q.options,
      wrongAnswer: q.options[optIdx],
      correctAnswer: q.options[q.answer],
      hint: q.explanation
    });
    showToast('答错了，已加入错题库');
  }
  $$('#readingQuizArea .quiz-opt').forEach(btn => {
    const i = Number(btn.dataset.readingIdx);
    if (i === q.answer) btn.classList.add('correct');
    else if (i === optIdx && !correct) btn.classList.add('wrong');
    btn.disabled = true;
  });
  if (q.explanation) {
    $('#readingHint').innerHTML = `<div class="quiz-hint">💡 ${escapeHtml(q.explanation)}</div>`;
  }
  setTimeout(() => {
    state.readingQuizIndex++;
    state.readingAnswered = false;
    renderReadingQuestion();
  }, correct ? 800 : 1500);
}

function openListening() {
  state.knowledgeModule = '听力';
  $('#listeningList').innerHTML = LISTENING_ITEMS.map(item => `
    <div class="listening-card" data-listening="${item.id}">
      <div class="card-title">${escapeHtml(item.titleZh || item.title)}</div>
      <div class="listening-meta">${escapeHtml(item.title)} · ${item.duration} · 难度 ${item.difficulty}</div>
    </div>
  `).join('');
  showView('listening');
}

function openListeningDetail(id) {
  const item = getListeningById(id);
  if (!item) return;
  state.listeningItemId = id;
  state.listeningQuizIndex = 0;
  state.listeningQuizScore = 0;
  state.listeningAnswered = false;
  state.listeningShowScript = false;

  $('#listeningDetail').innerHTML = `
    <div class="section-label">${escapeHtml(item.titleZh || item.title)}</div>
    <div class="listening-meta" style="margin-bottom:14px">${escapeHtml(item.title)} · ${item.duration}</div>
    <div class="btn-row" style="margin-top:0;margin-bottom:16px">
      <button class="btn" id="playListening" type="button">🔊 播放听力</button>
      <button class="btn btn-secondary" id="toggleScript" type="button">显示原文</button>
    </div>
    <div id="listeningScript" style="display:none" class="reading-body">
      ${item.script.map(s => `<p><strong>${s.speaker}:</strong> ${escapeHtml(s.text)}</p>`).join('')}
    </div>
    <div class="section-label">听力题</div>
    <div id="listeningQuizArea"></div>`;

  $('#playListening').onclick = () => speak(getListeningScriptText(item), 0.82);
  $('#toggleScript').onclick = () => {
    state.listeningShowScript = !state.listeningShowScript;
    $('#listeningScript').style.display = state.listeningShowScript ? 'block' : 'none';
    $('#toggleScript').textContent = state.listeningShowScript ? '隐藏原文' : '显示原文';
  };
  renderListeningQuestion();
  showView('listening-detail');
}

function renderListeningQuestion() {
  const item = getListeningById(state.listeningItemId);
  if (!item) return;
  const idx = state.listeningQuizIndex || 0;
  if (idx >= item.questions.length) {
    $('#listeningQuizArea').innerHTML = `
      <div class="quiz-result">
        <div class="quiz-score">${state.listeningQuizScore}/${item.questions.length}</div>
        <p style="margin-top:12px;color:var(--text-muted)">听力练习完成！</p>
      </div>`;
    return;
  }
  const q = item.questions[idx];
  $('#listeningQuizArea').innerHTML = `
    <div class="quiz-card" style="text-align:left">
      <div class="quiz-progress">第 ${idx + 1} / ${item.questions.length} 题</div>
      <div class="quiz-meaning" style="font-size:1rem;text-align:left">${escapeHtml(q.q)}</div>
      <div class="quiz-options">
        ${q.options.map((o, i) => `<button class="quiz-opt" data-listening-idx="${i}" type="button">${escapeHtml(o)}</button>`).join('')}
      </div>
      <div id="listeningHint"></div>
    </div>`;
}

function handleListeningAnswer(optIdx) {
  if (state.listeningAnswered) return;
  const item = getListeningById(state.listeningItemId);
  const q = item.questions[state.listeningQuizIndex];
  const correct = optIdx === q.answer;
  state.listeningAnswered = true;
  if (correct) state.listeningQuizScore = (state.listeningQuizScore || 0) + 1;
  $$('#listeningQuizArea .quiz-opt').forEach(btn => {
    const i = Number(btn.dataset.listeningIdx);
    if (i === q.answer) btn.classList.add('correct');
    else if (i === optIdx && !correct) btn.classList.add('wrong');
    btn.disabled = true;
  });
  if (q.explanation) {
    $('#listeningHint').innerHTML = `<div class="quiz-hint">💡 ${escapeHtml(q.explanation)}</div>`;
  }
  setTimeout(() => {
    state.listeningQuizIndex++;
    state.listeningAnswered = false;
    renderListeningQuestion();
  }, correct ? 800 : 1500);
}

function renderStats() {
  const { days, streak, stats, wrongCount } = LearningCore.getWeeklyStats();
  const maxBar = Math.max(1, ...days.map(d => (d.newWords || 0) + (d.quizScore ? 1 : 0)));
  $('#statsContent').innerHTML = `
    <div class="section-label">学习统计</div>
    <div class="word-stats" style="margin-bottom:16px">
      <div class="stat-card"><div class="stat-num">${streak.current || 0}</div><div class="stat-label">连续打卡</div></div>
      <div class="stat-card"><div class="stat-num">${stats.mastered}</div><div class="stat-label">已掌握词</div></div>
      <div class="stat-card"><div class="stat-num">${wrongCount}</div><div class="stat-label">错题数</div></div>
    </div>
    <div class="grammar-block">
      <h3>近 7 日学习</h3>
      <div class="stats-chart">
        ${days.map(d => {
          const h = Math.round(((d.newWords || 0) + (d.quizScore ? 2 : 0)) / maxBar * 80) + 4;
          return `<div class="stats-bar-wrap"><div class="stats-bar" style="height:${h}px"></div><span class="stats-bar-label">${d.label}</span></div>`;
        }).join('')}
      </div>
      <p style="font-size:0.78rem;color:var(--text-dim)">柱高反映新词数与是否完成测验</p>
    </div>
    <div class="grammar-block">
      <h3>词库进度</h3>
      <p>已接触 ${stats.touched} / ${stats.total} · 学习中 ${stats.learning} · 已掌握 ${stats.mastered} · 待复习 ${stats.due}</p>
    </div>`;
}

function renderSettings() {
  const s = LearningCore.loadSettings();
  $('#settingsContent').innerHTML = `
    <div class="section-label">学习设置</div>
    <div class="grammar-block">
      <div class="settings-row">
        <label for="settingNewWords">每日新词数量</label>
        <select id="settingNewWords">
          ${[10, 15, 20, 30, 50].map(n => `<option value="${n}" ${s.dailyNewWords === n ? 'selected' : ''}>${n} 个</option>`).join('')}
        </select>
      </div>
      <div class="settings-row">
        <label for="settingReview">复习优先</label>
        <select id="settingReview">
          <option value="1" ${s.reviewPriority ? 'selected' : ''}>开启</option>
          <option value="0" ${!s.reviewPriority ? 'selected' : ''}>关闭</option>
        </select>
      </div>
      <div class="settings-row">
        <label for="settingQuiz">测验题数</label>
        <select id="settingQuiz">
          ${[5, 10, 15, 20].map(n => `<option value="${n}" ${s.quizQuestionCount === n ? 'selected' : ''}>${n} 题</option>`).join('')}
        </select>
      </div>
      <button class="btn" id="saveSettings" type="button" style="width:100%;margin-top:16px">保存设置</button>
    </div>`;
  $('#saveSettings').onclick = () => {
    LearningCore.saveSettings({
      dailyNewWords: Number($('#settingNewWords').value),
      reviewPriority: $('#settingReview').value === '1',
      quizQuestionCount: Number($('#settingQuiz').value)
    });
    showToast('设置已保存');
  };
}

function generateWords() {
  if (!WORD_BANK.length) return;
  state.currentWords = pickRandom(30);
  state.wordSearch = '';
  if ($('#wordSearch')) $('#wordSearch').value = '';
  renderWords();
}

function getDisplayWords() {
  const q = state.wordSearch.trim().toLowerCase();
  if (q) {
    return WORD_BANK.filter(w =>
      w.word.toLowerCase().includes(q) || (w.meaning && w.meaning.includes(q))
    ).slice(0, 80);
  }
  if (state.wordMode === 'alpha') {
    return state.alphaIndex?.[state.alphaLetter] || [];
  }
  if (state.wordMode === 'study') {
    return LearningCore.getNewWordsForToday(WORD_BANK, LearningCore.getTodayNewWordTarget());
  }
  return state.currentWords.length ? state.currentWords : pickRandom(30);
}

function setWordMode(mode) {
  state.wordMode = mode;
  state.wordSearch = '';
  if ($('#wordSearch')) $('#wordSearch').value = '';
  $$('.mode-tab').forEach(t => t.classList.toggle('active', t.dataset.wordMode === mode));
  if (mode === 'alpha' && !state.alphaLetter) state.alphaLetter = 'A';
  if (mode === 'browse' && !state.currentWords.length) generateWords();
  renderAlphaBar();
  renderWords();
}

function renderWords() {
  const display = getDisplayWords();
  renderAlphaBar();
  $('#bankCount').textContent = WORD_BANK.length || '—';
  const stats = LearningCore.getProgressStats(WORD_BANK);
  $('#learnedCount').textContent = stats.mastered;
  const due = LearningCore.getDueReviewWords(WORD_BANK).length;
  const q = state.wordSearch.trim();
  if (q) {
    $('#wordCount').textContent = display.length;
  } else if (state.wordMode === 'alpha') {
    $('#wordCount').textContent = display.length;
  } else if (state.wordMode === 'study') {
    $('#wordCount').textContent = `${display.length} 新 / ${due} 复习`;
  } else {
    $('#wordCount').textContent = display.length;
  }
  if (!WORD_BANK.length) {
    $('#wordList').innerHTML = '<div class="loading-box">词库未加载</div>';
    return;
  }
  if (!display.length) {
    $('#wordList').innerHTML = '<div class="placeholder-box"><p>未找到相关单词</p></div>';
    return;
  }
  $('#wordList').innerHTML = display.map((w, i) => {
    const ex = getWordExample(w);
    const tense = getWordTense(w);
    const confusing = getConfusingWords(w, WORD_BANK, state.prefixIndex || {});
    const metaRows = [];
    if (tense) {
      metaRows.push(`<span class="word-meta-chip"><strong>时态</strong>${escapeHtml(tense)}</span>`);
    }
    if (confusing.length) {
      metaRows.push(`<span class="word-meta-chip confuse"><strong>混淆</strong>${escapeHtml(confusing.join(' · '))}</span>`);
    }
    return `
    <div class="word-card" data-idx="${i}">
      <div class="word-header">
        <div style="flex:1;min-width:0">
          <div class="word-index">#${i + 1}</div>
          <div class="word-text">${escapeHtml(w.word)}</div>
          <div class="word-phonetic">${escapeHtml(w.phonetic || '')}</div>
          <div class="word-meaning" style="${state.hideMeanings ? 'filter:blur(6px)' : ''}">${escapeHtml(w.pos || '')} ${escapeHtml(w.meaning)}</div>
          ${metaRows.length ? `<div class="word-meta-row">${metaRows.join('')}</div>` : ''}
          <div class="word-example-inline">
            <div class="ex-label">例句 · Example</div>
            <div class="example-en">${escapeHtml(ex.en)}</div>
            <div class="example-zh">${escapeHtml(ex.zh)}</div>
          </div>
        </div>
        <div class="word-actions">
          <button class="tts-btn" data-speak-word="${escapeHtml(w.word)}" type="button" title="朗读单词">🔊</button>
        </div>
      </div>
    </div>`;
  }).join('');
}

function renderPlanForm() {
  const sel = $('#planSubject');
  sel.innerHTML = '<option value="">选择科目（可选）</option>' +
    SUBJECTS.map(s => `<option value="${s.name}">${s.name}</option>`).join('');
}

function renderPlans() {
  LearningCore.ensureSystemPlans();
  const plans = loadPlans();
  const active = plans.filter(p => !p.done).length;
  $('#planStats').textContent = `${active} 项待完成`;
  if (!plans.length) {
    $('#planList').innerHTML = '<div class="placeholder-box"><p>暂无计划，添加第一条吧</p></div>';
    return;
  }
  $('#planList').innerHTML = plans.map(p => `
    <div class="plan-item ${p.done ? 'done' : ''} ${p.type === 'system' ? 'system' : ''}" data-id="${p.id}">
      <div class="plan-check ${p.done ? 'checked' : ''}" data-toggle="${p.id}"></div>
      <div class="plan-body">
        <div class="plan-text">${escapeHtml(p.text)}</div>
        <div class="plan-meta">${p.subject ? `<span class="tag">${p.subject}</span>` : ''}${p.type === 'system' ? '<span class="tag">系统</span>' : ''}</div>
      </div>
      ${p.type === 'system' ? '' : `<button class="plan-del" data-del="${p.id}" type="button">×</button>`}
    </div>
  `).join('');
}

function escapeHtml(s) {
  if (s == null) return '';
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function addPlan() {
  const text = $('#planInput').value.trim();
  if (!text) return;
  const plans = loadPlans();
  plans.unshift({
    id: Date.now().toString(36),
    text,
    subject: $('#planSubject').value,
    done: false,
    createdAt: Date.now()
  });
  savePlans(plans);
  $('#planInput').value = '';
  renderPlans();
  showToast('计划已添加');
}

function startQuiz() {
  if (!WORD_BANK.length) {
    showToast('请先等待词库加载完成');
    return;
  }
  state.englishSection = '测试';
  state.quizType = 'word';
  const n = LearningCore.loadSettings().quizQuestionCount || 10;
  const pool = pickRandom(n);
  state.quiz = { pool, index: 0, score: 0, answered: false };
  state.inQuiz = true;
  renderQuizQuestion();
  showView('quiz');
}

function startGrammarQuiz() {
  state.englishSection = '测试';
  state.quizType = 'grammar';
  const n = LearningCore.loadSettings().quizQuestionCount || 10;
  const pool = shuffle(GRAMMAR_QUIZ).slice(0, n);
  state.quiz = { pool, index: 0, score: 0, answered: false };
  state.inQuiz = true;
  renderQuizQuestion();
  showView('quiz');
}

function renderQuizQuestion() {
  if (state.quizType === 'wrong') {
    renderWrongReviewQuestion();
    return;
  }
  const q = state.quiz;
  if (q.index >= q.pool.length) {
    const retryFn = state.quizType === 'grammar' ? (state.quiz.isTopicQuiz && state.grammarTopicRef
      ? () => startTopicQuiz(state.grammarTopicRef.topicId)
      : startGrammarQuiz) : startQuiz;
    if (!state.quiz.isTopicQuiz) {
      LearningCore.recordQuizComplete(q.score, q.pool.length, state.quizType);
    }
    $('#quizArea').innerHTML = `
      <div class="quiz-result">
        <div class="quiz-score">${q.score}/${q.pool.length}</div>
        <p style="margin-top:12px;color:var(--text-muted)">测验完成！</p>
        <div class="btn-row" style="margin-top:20px">
          <button class="btn" id="retryQuiz">再来一次</button>
          <button class="btn btn-secondary" id="backTest">返回</button>
        </div>
      </div>`;
    $('#retryQuiz').onclick = retryFn;
    $('#backTest').onclick = () => {
      state.inQuiz = false;
      if (state.quiz.isTopicQuiz) showView('grammar-detail');
      else showView('test');
    };
    return;
  }
  const cur = q.pool[q.index];
  if (state.quizType === 'grammar') {
    $('#quizArea').innerHTML = `
      <div class="quiz-progress">第 ${q.index + 1} / ${q.pool.length} 题</div>
      <div class="quiz-tag">${escapeHtml(cur.tag)}</div>
      <div class="quiz-meaning">${escapeHtml(cur.q)}</div>
      <div class="quiz-options">
        ${cur.options.map((o, i) => `<button class="quiz-opt" data-idx="${i}" type="button">${escapeHtml(o)}</button>`).join('')}
      </div>`;
    return;
  }
  const wrong = shuffle(WORD_BANK.filter(w => w.word !== cur.word)).slice(0, 3);
  const options = shuffle([cur, ...wrong]);
  $('#quizArea').innerHTML = `
    <div class="quiz-progress">第 ${q.index + 1} / ${q.pool.length} 题</div>
    <div class="quiz-meaning">${cur.meaning}</div>
    <div class="quiz-options">
      ${options.map(o => `<button class="quiz-opt" data-word="${escapeHtml(o.word)}" type="button">${escapeHtml(o.word)}</button>`).join('')}
    </div>`;
}

function handleQuizAnswer(word, idx) {
  if (state.quizType === 'wrong') {
    handleWrongReviewAnswer(word, idx);
    return;
  }
  if (state.quiz.answered) return;
  state.quiz.answered = true;
  const cur = state.quiz.pool[state.quiz.index];
  let correct = false;
  if (state.quizType === 'grammar') {
    correct = idx === cur.answer;
    $$('.quiz-opt').forEach(btn => {
      const i = Number(btn.dataset.idx);
      if (i === cur.answer) btn.classList.add('correct');
      else if (i === idx && !correct) btn.classList.add('wrong');
      btn.disabled = true;
    });
    if (!correct) {
      addGrammarWrong(cur, idx);
      showToast('答错了，已加入错题库');
      const hint = document.createElement('div');
      hint.className = 'quiz-hint';
      hint.textContent = '💡 ' + cur.hint;
      $('#quizArea').appendChild(hint);
    }
    if (correct) state.quiz.score++;
  } else {
    correct = word === cur.word;
    if (correct) state.quiz.score++;
    else {
      addWordWrong(cur, word);
      showToast('答错了，已加入错题库');
    }
    LearningCore.recordWordQuizResult(cur.word, correct);
    $$('.quiz-opt').forEach(btn => {
      if (btn.dataset.word === cur.word) btn.classList.add('correct');
      else if (btn.dataset.word === word && !correct) btn.classList.add('wrong');
      btn.disabled = true;
    });
  }
  setTimeout(() => {
    state.quiz.index++;
    state.quiz.answered = false;
    renderQuizQuestion();
  }, state.quizType === 'grammar' && !correct ? 1500 : 800);
}

function openGaokao() {
  state.englishSection = '测试';
  state.gaokaoPaperId = null;
  state.gaokaoShowAll = false;
  renderGaokaoList();
  showView('exam');
}

function renderGaokaoList() {
  $('#toggleAllExplain').style.display = 'none';
  $('#printGaokao').style.display = 'none';
  $('#gaokaoContent').innerHTML = `
    <div class="section-label">历年高考真题及讲解</div>
    <div class="hero-tip" style="margin-bottom:14px">完整试卷：听力、阅读理解、七选五、完形填空、语法填空、书面表达等全部题型，每题附解析</div>
    <div class="gaokao-list">
      ${GAOKAO_PAPERS.map(p => `
        <div class="gaokao-paper-card ${p.year === 2024 ? 'card-accent' : ''}" data-paper="${p.id}" style="${p.year === 2024 ? 'border-color:rgba(201,169,110,0.35)' : ''}">
          <div class="year">${p.year} · ${escapeHtml(p.region)}${p.year === 2024 ? ' · 推荐' : ''}</div>
          <div class="title">${escapeHtml(p.title)}</div>
          <div class="sub">${escapeHtml(p.subtitle)} · ${countGaokaoQuestions(p)} 题</div>
        </div>
      `).join('')}
    </div>`;
}

function renderGaokaoQuestion(q, idx) {
  const isWriting = q.type === 'writing';
  const optsHtml = (q.options || []).map(o => `<div class="gaokao-q-opt">${escapeHtml(o)}</div>`).join('');
  const tag = q.type === 'fill' ? '语法填空' : q.type === 'seven' ? '七选五' : q.type === 'writing' ? '书面表达' : q.type === 'error' ? '短文改错' : (q.tag || '选择题');
  return `
    <div class="gaokao-q ${isWriting ? 'gaokao-writing' : ''}" data-q="${idx}">
      <div class="gaokao-q-head">
        <span class="gaokao-q-no">第 ${q.no} 题</span>
        <span class="tag">${escapeHtml(tag)}</span>
      </div>
      <div class="gaokao-q-stem">${escapeHtml(q.stem)}</div>
      ${optsHtml}
      <button class="gaokao-toggle-btn" data-toggle-q="${idx}" type="button">查看解析</button>
      <div class="gaokao-explain" id="explain-${idx}">
        <div class="ans">答案：${escapeHtml(q.answer)}</div>
        <div>💡 ${escapeHtml(q.explanation)}</div>
      </div>
    </div>`;
}

function renderGaokaoSection(sec, startIdx) {
  let idx = startIdx;
  let html = `<div class="gaokao-section">`;
  html += `<div class="gaokao-section-name">${escapeHtml(sec.name)}</div>`;
  if (sec.note) html += `<div class="gaokao-section-note">${escapeHtml(sec.note)}</div>`;
  if (sec.material) html += `<div class="gaokao-material">${escapeHtml(sec.material)}</div>`;

  if (sec.passages) {
    sec.passages.forEach(p => {
      html += `<div class="gaokao-passage-label">阅读 ${escapeHtml(p.label)}</div>`;
      if (p.title) html += `<div class="gaokao-passage-title">${escapeHtml(p.title)}</div>`;
      if (p.text) html += `<div class="gaokao-material">${escapeHtml(p.text)}</div>`;
      (p.questions || []).forEach(q => { html += renderGaokaoQuestion(q, idx++); });
    });
  } else if (sec.questions) {
    sec.questions.forEach(q => { html += renderGaokaoQuestion(q, idx++); });
  }
  html += `</div>`;
  return { html, nextIdx: idx };
}

function renderGaokaoPaper(id) {
  const paper = GAOKAO_PAPERS.find(p => p.id === id);
  if (!paper) return;
  $('#toggleAllExplain').style.display = 'block';
  $('#printGaokao').style.display = 'block';
  $('#toggleAllExplain').textContent = '显示全部解析';

  let body = `<div class="hero-tip" style="margin-bottom:14px">${escapeHtml(paper.region)} · 共 ${countGaokaoQuestions(paper)} 题 · 完整试卷</div>`;
  let idx = 0;

  if (paper.sections) {
    paper.sections.forEach(sec => {
      const r = renderGaokaoSection(sec, idx);
      body += r.html;
      idx = r.nextIdx;
    });
  } else if (paper.questions) {
    paper.questions.forEach(q => { body += renderGaokaoQuestion(q, idx++); });
  }

  $('#gaokaoContent').innerHTML = body;
  updateHeader();
}

function openGaokaoPaper(id) {
  state.gaokaoPaperId = id;
  state.gaokaoShowAll = false;
  renderGaokaoPaper(id);
}

function toggleGaokaoExplain(idx) {
  const el = $(`#explain-${idx}`);
  if (!el) return;
  el.classList.toggle('show');
  const btn = $(`[data-toggle-q="${idx}"]`);
  if (btn) btn.textContent = el.classList.contains('show') ? '隐藏解析' : '查看解析';
}

function toggleAllGaokaoExplain() {
  state.gaokaoShowAll = !state.gaokaoShowAll;
  $$('.gaokao-explain').forEach(el => el.classList.toggle('show', state.gaokaoShowAll));
  $$('[data-toggle-q]').forEach(btn => {
    btn.textContent = state.gaokaoShowAll ? '隐藏解析' : '查看解析';
  });
  $('#toggleAllExplain').textContent = state.gaokaoShowAll ? '隐藏全部解析' : '显示全部解析';
}

function bindEvents() {
  $('#backBtn').addEventListener('click', goBack);
  $('#gradeGrid').addEventListener('click', e => {
    const card = e.target.closest('[data-grade]');
    if (card) openGrade(card.dataset.grade);
  });
  $('#homeQuick')?.addEventListener('click', e => {
    const btn = e.target.closest('[data-quick]');
    if (btn) quickStart(btn.dataset.quick);
  });
  $('#subjectGrid').addEventListener('click', e => {
    const card = e.target.closest('[data-subject]');
    if (card && !card.classList.contains('disabled')) openSubject(card.dataset.subject);
  });
  $('#englishSectionGrid').addEventListener('click', e => {
    const card = e.target.closest('[data-en-section]');
    if (card) openEnglishSection(card.dataset.enSection);
  });
  $('#knowledgeGrid').addEventListener('click', e => {
    const card = e.target.closest('[data-knowledge]');
    if (card) openKnowledgeModule(card.dataset.knowledge);
  });
  $('#shuffleWords')?.addEventListener('click', () => {
    setWordMode('browse');
    generateWords();
    showToast('已换一批单词');
  });
  $('#startWordStudy')?.addEventListener('click', () => openWordStudy('mixed'));
  $('#btnFlipCard')?.addEventListener('click', () => {
    state.studyFlipped = true;
    renderStudyCard();
  });
  $('#btnKnow')?.addEventListener('click', () => answerStudyCard(true));
  $('#btnUnknown')?.addEventListener('click', () => answerStudyCard(false));
  $('#btnSpeakStudy')?.addEventListener('click', () => {
    if (state._currentStudyWord) speakWord(state._currentStudyWord);
  });
  $('#todayTasks')?.addEventListener('click', e => {
    const item = e.target.closest('[data-task]');
    if (item && !item.classList.contains('done')) handleTodayTask(item.dataset.task);
  });
  $('#todayQuick')?.addEventListener('click', e => {
    const card = e.target.closest('[data-today-quick]');
    if (!card) return;
    const q = card.dataset.todayQuick;
    if (q === 'word-study') openWordStudy('mixed');
    else if (q === 'test') { state.englishSection = '测试'; showView('test'); }
    else if (q === 'reading') openReading();
    else if (q === 'english') { renderEnglishSections(); showView('english'); }
  });
  $('#readingList')?.addEventListener('click', e => {
    const card = e.target.closest('[data-reading]');
    if (card) openReadingDetail(card.dataset.reading);
  });
  $('#readingDetail')?.addEventListener('click', e => {
    const opt = e.target.closest('[data-reading-idx]');
    if (opt) { handleReadingAnswer(Number(opt.dataset.readingIdx)); return; }
    const chip = e.target.closest('[data-add-word]');
    if (chip) {
      LearningCore.addWordToProgress(chip.dataset.addWord, WORD_BANK);
      showToast(`「${chip.dataset.addWord}」已加入词本`);
    }
  });
  $('#listeningList')?.addEventListener('click', e => {
    const card = e.target.closest('[data-listening]');
    if (card) openListeningDetail(card.dataset.listening);
  });
  $('#listeningDetail')?.addEventListener('click', e => {
    const opt = e.target.closest('[data-listening-idx]');
    if (opt) handleListeningAnswer(Number(opt.dataset.listeningIdx));
  });
  $('#wrongFilters')?.addEventListener('click', e => {
    const tab = e.target.closest('[data-wrong-filter]');
    if (!tab) return;
    state.wrongFilter = tab.dataset.wrongFilter;
    renderWrongBook();
  });
  $$('.mode-tab').forEach(tab => {
    tab.addEventListener('click', () => setWordMode(tab.dataset.wordMode));
  });
  $('#alphaBar').addEventListener('click', e => {
    const btn = e.target.closest('.alpha-btn');
    if (!btn || btn.disabled) return;
    state.alphaLetter = btn.dataset.letter;
    renderWords();
  });
  $('#hideMeanings').addEventListener('click', () => {
    state.hideMeanings = !state.hideMeanings;
    $('#hideMeanings').textContent = state.hideMeanings ? '显示释义' : '隐藏释义';
    renderWords();
  });
  $('#wordSearch').addEventListener('input', e => {
    state.wordSearch = e.target.value;
    renderWords();
  });
  $('#grammarList').addEventListener('click', e => {
    const topic = e.target.closest('.grammar-topic');
    if (topic) {
      const [catId, topicId] = topic.dataset.topic.split(':');
      openGrammarTopic(catId, topicId);
      return;
    }
    const header = e.target.closest('.grammar-cat-header');
    if (header) header.parentElement.classList.toggle('open');
  });
  $('#wordList').addEventListener('click', e => {
    const speakBtn = e.target.closest('[data-speak-word]');
    if (speakBtn) {
      e.preventDefault();
      e.stopPropagation();
      speakWord({ word: speakBtn.dataset.speakWord });
    }
  });
  $('#addPlanBtn').addEventListener('click', addPlan);
  $('#planInput').addEventListener('keydown', e => { if (e.key === 'Enter') addPlan(); });
  $('#planList').addEventListener('click', e => {
    const id = e.target.dataset.toggle || e.target.dataset.del;
    if (!id) return;
    let plans = loadPlans();
    const target = plans.find(p => p.id === id);
    if (e.target.dataset.toggle && target?.type !== 'system') {
      plans = plans.map(p => p.id === id ? { ...p, done: !p.done } : p);
      savePlans(plans);
      renderPlans();
    }
    if (e.target.dataset.del) {
      plans = plans.filter(p => p.id !== id);
      savePlans(plans);
      renderPlans();
    }
  });
  document.querySelector('[data-action="startQuiz"]').addEventListener('click', startQuiz);
  document.querySelector('[data-action="startGrammarQuiz"]').addEventListener('click', startGrammarQuiz);
  document.querySelector('[data-action="openWrongBook"]').addEventListener('click', openWrongBook);
  document.querySelector('[data-action="openGaokao"]')?.addEventListener('click', openGaokao);
  $('#toggleAllExplain')?.addEventListener('click', toggleAllGaokaoExplain);
  $('#printGaokao')?.addEventListener('click', () => window.print());
  $('#gaokaoContent')?.addEventListener('click', e => {
    const card = e.target.closest('[data-paper]');
    if (card) { openGaokaoPaper(card.dataset.paper); return; }
    const btn = e.target.closest('[data-toggle-q]');
    if (btn) toggleGaokaoExplain(Number(btn.dataset.toggleQ));
  });
  $('#reviewWrongBtn').addEventListener('click', startWrongReview);
  $('#clearWrongBtn').addEventListener('click', () => {
    if (!loadWrongBook().length) return;
    if (!confirm('确定清空全部错题吗？')) return;
    saveWrongBook([]);
    renderWrongBook();
    showToast('错题库已清空');
  });
  $('#wrongList').addEventListener('click', e => {
    const id = e.target.dataset.delWrong;
    if (!id) return;
    saveWrongBook(loadWrongBook().filter(x => x.id !== id));
    renderWrongBook();
  });
  $('#quizArea').addEventListener('click', e => {
    const opt = e.target.closest('.quiz-opt');
    if (!opt) return;
    if (opt.dataset.idx !== undefined) handleQuizAnswer(null, Number(opt.dataset.idx));
    else handleQuizAnswer(opt.dataset.word);
  });
}

function init() {
  renderGrades();
  renderHome();
  bindEvents();
  initVoice();
  document.body.classList.add('is-home');
  document.body.addEventListener('touchstart', unlockTTS, { passive: true });
  document.body.addEventListener('click', unlockTTS);
  updateWrongBookCount();
  updateHeader();
  loadWordBank().then(() => {
    LearningCore.ensureSystemPlans();
  });
}

init();
