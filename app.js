const GRADES = [
  { id: 'g1', name: '高一', ready: true, icon: '📘' },
  { id: 'g2', name: '高二', ready: false, icon: '📗' },
  { id: 'g3', name: '高三', ready: false, icon: '📙' },
  { id: 'review', name: '总复习', ready: false, icon: '🎓' }
];

const MODULES = [
  { id: 'plan', name: '计划', desc: '学习任务安排', icon: '📅' },
  { id: 'knowledge', name: '知识点', desc: '按科目学习', icon: '📚' },
  { id: 'test', name: '测试', desc: '自测与练习', icon: '✅' }
];

const SUBJECTS = [
  { id: 'english', name: '英语', icon: '🔤', ready: true },
  { id: 'chinese', name: '语文', icon: '📜', ready: false },
  { id: 'math', name: '数学', icon: '🔢', ready: false },
  { id: 'physics', name: '物理', icon: '⚛️', ready: false },
  { id: 'chemistry', name: '化学', icon: '🧪', ready: false },
  { id: 'biology', name: '生物', icon: '🧬', ready: false }
];

const ENGLISH_MODULES = [
  { id: 'words', name: '单词', desc: '高考3500+词库', icon: '📝' },
  { id: 'grammar', name: '语法', desc: '语法知识点', icon: '📖' }
];

const state = {
  grade: null,
  subject: null,
  currentWords: [],
  hideMeanings: false,
  quiz: null,
  inQuiz: false,
  grammarTopic: null,
  wordSearch: '',
  wordMode: 'random',
  alphaLetter: 'A',
  alphaIndex: null,
  wordsLoaded: false,
  wordsLoading: false,
  quizType: 'word',
  inWrongBook: false,
  preferredVoice: null
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
  };
  pick();
  if (window.speechSynthesis) {
    window.speechSynthesis.onvoiceschanged = pick;
  }
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

function speak(text, rate = 0.92) {
  if (!('speechSynthesis' in window) || !text) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-US';
  u.rate = rate;
  u.pitch = 1.05;
  if (state.preferredVoice) u.voice = state.preferredVoice;
  window.speechSynthesis.speak(u);
}

function speakWordWithExample(w) {
  const ex = getWordExample(w);
  speak(`${w.word}. ${ex.en}`, 0.9);
}

function loadWrongBook() {
  return JSON.parse(localStorage.getItem('hs_wrong_book') || '[]');
}

function saveWrongBook(list) {
  localStorage.setItem('hs_wrong_book', JSON.stringify(list));
  updateWrongBookCount();
}

function updateWrongBookCount() {
  const n = loadWrongBook().length;
  if ($('#wrongBookCount')) $('#wrongBookCount').textContent = n;
  if ($('#wrongListCount')) $('#wrongListCount').textContent = n;
}

function addToWrongBook(entry) {
  const list = loadWrongBook();
  const id = entry.id;
  const existing = list.find(x => x.id === id);
  if (existing) {
    existing.wrongAnswer = entry.wrongAnswer;
    existing.count = (existing.count || 1) + 1;
    existing.addedAt = Date.now();
  } else {
    list.unshift({ ...entry, count: 1, addedAt: Date.now() });
  }
  saveWrongBook(list);
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
  const list = loadWrongBook();
  updateWrongBookCount();
  if (!list.length) {
    $('#wrongList').innerHTML = '<div class="placeholder-box"><p>暂无错题</p><small>测验答错的题目会自动收录到这里</small></div>';
    return;
  }
  $('#wrongList').innerHTML = list.map(item => {
    if (item.type === 'word') {
      return `
        <div class="wrong-item" data-id="${escapeHtml(item.id)}">
          <div class="wrong-item-head">
            <div class="wrong-item-title">${escapeHtml(item.word)}</div>
            <button class="wrong-item-del" data-del-wrong="${escapeHtml(item.id)}" type="button">×</button>
          </div>
          <div class="wrong-meta">${escapeHtml(item.pos || '')} ${escapeHtml(item.meaning || '')}</div>
          <div class="wrong-meta">例句：${escapeHtml(item.example || '')}</div>
          <div class="wrong-meta">你的答案：<span class="wrong-a">${escapeHtml(item.wrongAnswer)}</span> → 正确：<span class="right-a">${escapeHtml(item.correctAnswer)}</span></div>
        </div>`;
    }
    return `
      <div class="wrong-item" data-id="${escapeHtml(item.id)}">
        <div class="wrong-item-head">
          <div class="wrong-item-title"><span class="tag">${escapeHtml(item.tag)}</span> ${escapeHtml(item.q)}</div>
          <button class="wrong-item-del" data-del-wrong="${escapeHtml(item.id)}" type="button">×</button>
        </div>
        <div class="wrong-meta">你的答案：<span class="wrong-a">${escapeHtml(item.wrongAnswer)}</span> → 正确：<span class="right-a">${escapeHtml(item.correctAnswer)}</span></div>
        <div class="wrong-meta">💡 ${escapeHtml(item.hint || '')}</div>
      </div>`;
  }).join('');
}

function startWrongReview() {
  const list = loadWrongBook();
  if (!list.length) {
    showToast('错题库是空的');
    return;
  }
  const pool = shuffle(list).slice(0, Math.min(10, list.length));
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
  if (correct) state.quiz.score++;
  setTimeout(() => {
    state.quiz.index++;
    state.quiz.answered = false;
    renderWrongReviewQuestion();
  }, 800);
}

function getLearnedCount() {
  return JSON.parse(localStorage.getItem('hs_learned') || '[]').length;
}

function markLearned(word) {
  const set = new Set(JSON.parse(localStorage.getItem('hs_learned') || '[]'));
  set.add(word);
  localStorage.setItem('hs_learned', JSON.stringify([...set]));
}

function loadPlans() {
  return JSON.parse(localStorage.getItem('hs_plans') || '[]');
}

function savePlans(plans) {
  localStorage.setItem('hs_plans', JSON.stringify(plans));
}

function showView(id) {
  $$('.view').forEach(v => v.classList.remove('active'));
  $(`#view-${id}`).classList.add('active');
  updateHeader();
}

function getBreadcrumb() {
  const parts = ['高中学习'];
  if (state.grade) parts.push(state.grade.name);
  if (state.module) parts.push(state.module);
  if (state.subject) parts.push(state.subject.name);
  if (state.inWrongBook) parts.push('错题库');
  else if (state.grammarTopic) parts.push(state.grammarTopic.title);
  else if (state.englishModule) parts.push(state.englishModule);
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
  state.module = null;
  state.subject = null;
  state.englishModule = null;
  state.grammarTopic = null;
  showView('home');
}

function goBack() {
  const bc = getBreadcrumb();
  if (bc.length <= 1) return;
  if (state.grammarTopic) {
    state.grammarTopic = null;
    showView('grammar');
  } else if (state.englishModule) {
    state.englishModule = null;
    showView('english');
  } else if (state.subject) {
    state.subject = null;
    showView('subjects');
  } else if (state.inQuiz) {
    state.inQuiz = false;
    if (state.quizType === 'wrong') openWrongBook();
    else showView('test');
  } else if (state.inWrongBook) {
    state.inWrongBook = false;
    showView('test');
  } else if (state.module) {
    state.module = null;
    if (state.grade && state.grade.ready) showView('grade');
    else goHome();
  } else if (state.grade) {
    goHome();
  }
}

function renderGrades() {
  $('#gradeGrid').innerHTML = GRADES.map(g => `
    <div class="card ${g.ready ? '' : 'disabled'}" data-grade="${g.id}">
      <div class="card-icon">${g.icon}</div>
      <div class="card-title">${g.name}</div>
      <div class="card-desc">${g.ready ? '点击进入' : '即将上线'}</div>
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
  state.module = null;
  renderModules();
  showView('grade');
}

function renderModules() {
  $('#moduleGrid').innerHTML = MODULES.map(m => `
    <div class="card" data-module="${m.id}">
      <div class="card-icon">${m.icon}</div>
      <div class="card-title">${m.name}</div>
      <div class="card-desc">${m.desc}</div>
    </div>
  `).join('');
}

function openModule(id) {
  state.module = MODULES.find(m => m.id === id)?.name || id;
  if (id === 'plan') {
    renderPlanForm();
    renderPlans();
    showView('plan');
  } else if (id === 'knowledge') {
    renderSubjects();
    showView('subjects');
  } else if (id === 'test') {
    updateWrongBookCount();
    showView('test');
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
  if (!s) return;
  state.subject = s;
  if (id === 'english') {
    renderEnglishModules();
    showView('english');
  } else {
    $('#placeholderSubject').textContent = s.name + ' · 知识点';
    showView('subject-placeholder');
  }
}

function renderEnglishModules() {
  $('#englishGrid').innerHTML = ENGLISH_MODULES.map(m => `
    <div class="card" data-en="${m.id}">
      <div class="card-icon">${m.icon}</div>
      <div class="card-title">${m.name}</div>
      <div class="card-desc">${m.desc}</div>
    </div>
  `).join('');
}

function openEnglishModule(id) {
  state.englishModule = ENGLISH_MODULES.find(m => m.id === id)?.name || id;
  if (id === 'words') {
    openWords();
  } else {
    renderGrammar();
    showView('grammar');
  }
}

async function openWords() {
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
  `;
  showView('grammar-detail');
}

function generateWords() {
  if (!WORD_BANK.length) return;
  state.currentWords = pickRandom(30);
  state.currentWords.forEach(w => markLearned(w.word));
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
  return state.currentWords;
}

function setWordMode(mode) {
  state.wordMode = mode;
  state.wordSearch = '';
  if ($('#wordSearch')) $('#wordSearch').value = '';
  $$('.mode-tab').forEach(t => t.classList.toggle('active', t.dataset.wordMode === mode));
  if (mode === 'alpha' && !state.alphaLetter) state.alphaLetter = 'A';
  renderAlphaBar();
  renderWords();
}

function renderWords() {
  const display = getDisplayWords();
  renderAlphaBar();
  $('#bankCount').textContent = WORD_BANK.length || '—';
  $('#learnedCount').textContent = getLearnedCount();
  const q = state.wordSearch.trim();
  if (q) {
    $('#wordCount').textContent = display.length;
  } else if (state.wordMode === 'alpha') {
    $('#wordCount').textContent = display.length;
  } else {
    $('#wordCount').textContent = state.currentWords.length;
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
    return `
    <div class="word-card" data-idx="${i}">
      <div class="word-header">
        <div style="flex:1;min-width:0">
          <div class="word-index">#${i + 1}</div>
          <div class="word-text">${escapeHtml(w.word)}</div>
          <div class="word-phonetic">${escapeHtml(w.phonetic || '')}</div>
          <div class="word-meaning" style="${state.hideMeanings ? 'filter:blur(6px)' : ''}">${escapeHtml(w.pos || '')} ${escapeHtml(w.meaning)}</div>
          <div class="word-example-inline">
            <div class="ex-label">例句 · Example</div>
            <div class="example-en">${escapeHtml(ex.en)}</div>
            <div class="example-zh">${escapeHtml(ex.zh)}</div>
          </div>
        </div>
        <div class="word-actions">
          <button class="tts-btn" data-speak-word="${escapeHtml(w.word)}" type="button" title="朗读单词+例句">🔊</button>
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
  const plans = loadPlans();
  const active = plans.filter(p => !p.done).length;
  $('#planStats').textContent = `${active} 项待完成`;
  if (!plans.length) {
    $('#planList').innerHTML = '<div class="placeholder-box"><p>暂无计划，添加第一条吧</p></div>';
    return;
  }
  $('#planList').innerHTML = plans.map(p => `
    <div class="plan-item ${p.done ? 'done' : ''}" data-id="${p.id}">
      <div class="plan-check ${p.done ? 'checked' : ''}" data-toggle="${p.id}"></div>
      <div class="plan-body">
        <div class="plan-text">${escapeHtml(p.text)}</div>
        <div class="plan-meta">${p.subject ? `<span class="tag">${p.subject}</span>` : ''}</div>
      </div>
      <button class="plan-del" data-del="${p.id}" type="button">×</button>
    </div>
  `).join('');
}

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
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
  state.quizType = 'word';
  const pool = pickRandom(10);
  state.quiz = { pool, index: 0, score: 0, answered: false };
  state.inQuiz = true;
  renderQuizQuestion();
  showView('quiz');
}

function startGrammarQuiz() {
  state.quizType = 'grammar';
  const pool = shuffle(GRAMMAR_QUIZ).slice(0, 10);
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
    const retryFn = state.quizType === 'grammar' ? startGrammarQuiz : startQuiz;
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
    $('#backTest').onclick = () => { state.inQuiz = false; showView('test'); };
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

function bindEvents() {
  $('#backBtn').addEventListener('click', goBack);
  $('#gradeGrid').addEventListener('click', e => {
    const card = e.target.closest('[data-grade]');
    if (card) openGrade(card.dataset.grade);
  });
  $('#moduleGrid').addEventListener('click', e => {
    const card = e.target.closest('[data-module]');
    if (card) openModule(card.dataset.module);
  });
  $('#subjectGrid').addEventListener('click', e => {
    const card = e.target.closest('[data-subject]');
    if (card && !card.classList.contains('disabled')) openSubject(card.dataset.subject);
  });
  $('#englishGrid').addEventListener('click', e => {
    const card = e.target.closest('[data-en]');
    if (card) openEnglishModule(card.dataset.en);
  });
  $('#shuffleWords').addEventListener('click', () => {
    setWordMode('random');
    generateWords();
    showToast('已换一批单词');
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
      const w = getDisplayWords().find(x => x.word === speakBtn.dataset.speakWord);
      if (w) speakWordWithExample(w);
    }
  });
  $('#addPlanBtn').addEventListener('click', addPlan);
  $('#planInput').addEventListener('keydown', e => { if (e.key === 'Enter') addPlan(); });
  $('#planList').addEventListener('click', e => {
    const id = e.target.dataset.toggle || e.target.dataset.del;
    if (!id) return;
    let plans = loadPlans();
    if (e.target.dataset.toggle) {
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
  bindEvents();
  initVoice();
  updateWrongBookCount();
  updateHeader();
  loadWordBank();
}

init();
