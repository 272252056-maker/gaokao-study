/**
 * 学习核心：本地存储、单词进度、艾宾浩斯复习、打卡、今日任务、计划联动
 */
const LearningCore = (() => {
  const REVIEW_INTERVALS = [1, 2, 4, 7, 15, 30];
  const MASTER_THRESHOLD = 2;
  const DAY_MS = 86400000;

  const KEY_WORD_PROGRESS = 'hs_word_progress';
  const KEY_SETTINGS = 'hs_settings';
  const KEY_STREAK = 'hs_streak';
  const KEY_DAILY_LOG = 'hs_daily_log';
  const KEY_TODAY_TASKS = 'hs_today_tasks';
  const KEY_PLANS = 'hs_plans';
  const KEY_WRONG = 'hs_wrong_book';
  const KEY_LEARNED_LEGACY = 'hs_learned';
  const KEY_GRAMMAR_TODAY = 'hs_grammar_topic_today';

  const DEFAULT_SETTINGS = {
    dailyNewWords: 20,
    reviewPriority: true,
    quizQuestionCount: 10
  };

  const TASK_DEFS = [
    { key: 'word_new', text: '学习新单词', subject: '英语', icon: '📝' },
    { key: 'word_review', text: '复习到期单词', subject: '英语', icon: '🔄' },
    { key: 'grammar', text: '浏览语法知识点', subject: '英语', icon: '📖' },
    { key: 'quiz', text: '完成每日测验', subject: '英语', icon: '✅' },
    { key: 'reading', text: '完成一篇阅读', subject: '英语', icon: '📰' }
  ];

  function loadJSON(key, fallback) {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function saveJSON(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  }

  function todayKey(d = new Date()) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  function startOfDay(ts = Date.now()) {
    const d = new Date(ts);
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  }

  function loadSettings() {
    return { ...DEFAULT_SETTINGS, ...loadJSON(KEY_SETTINGS, {}) };
  }

  function saveSettings(s) {
    saveJSON(KEY_SETTINGS, { ...loadSettings(), ...s });
  }

  function loadWordProgress() {
    migrateLegacyLearned();
    return loadJSON(KEY_WORD_PROGRESS, {});
  }

  function saveWordProgress(map) {
    saveJSON(KEY_WORD_PROGRESS, map);
  }

  function migrateLegacyLearned() {
    const legacy = loadJSON(KEY_LEARNED_LEGACY, []);
    if (!legacy.length) return;
    const map = loadJSON(KEY_WORD_PROGRESS, {});
    let changed = false;
    legacy.forEach(word => {
      if (!map[word]) {
        map[word] = {
          word,
          status: 'learning',
          firstLearnedAt: Date.now(),
          lastReviewedAt: Date.now(),
          nextReviewAt: startOfDay() + REVIEW_INTERVALS[0] * DAY_MS,
          intervalIndex: 0,
          correctStreak: 0,
          wrongCount: 0
        };
        changed = true;
      }
    });
    if (changed) saveJSON(KEY_WORD_PROGRESS, map);
    localStorage.removeItem(KEY_LEARNED_LEGACY);
  }

  function getWordEntry(word) {
    return loadWordProgress()[word] || null;
  }

  function initWordEntry(word) {
    const now = Date.now();
    return {
      word,
      status: 'learning',
      firstLearnedAt: now,
      lastReviewedAt: now,
      nextReviewAt: startOfDay(now) + REVIEW_INTERVALS[0] * DAY_MS,
      intervalIndex: 0,
      correctStreak: 0,
      wrongCount: 0
    };
  }

  function isDue(entry) {
    if (!entry) return false;
    return entry.nextReviewAt <= startOfDay() + DAY_MS - 1;
  }

  function getDueReviewWords(bank) {
    const map = loadWordProgress();
    return bank.filter(w => {
      const e = map[w.word];
      return e && e.status !== 'new' && isDue(e);
    });
  }

  function getNewWordsForToday(bank, count) {
    const map = loadWordProgress();
    const today = todayKey();
    const log = loadDailyLog();
    const studiedToday = new Set(log[today]?.newWordList || []);
    const candidates = bank.filter(w => !map[w.word] || map[w.word].status === 'new');
    const remaining = candidates.filter(w => !studiedToday.has(w.word));
    return remaining.slice(0, count);
  }

  function getTodayNewWordTarget() {
    return loadSettings().dailyNewWords;
  }

  function recordWordKnow(word, known) {
    const map = loadWordProgress();
    const entry = map[word] || initWordEntry(word);
    const now = Date.now();
    entry.lastReviewedAt = now;

    if (known) {
      entry.correctStreak = (entry.correctStreak || 0) + 1;
      const nextIdx = Math.min((entry.intervalIndex || 0) + 1, REVIEW_INTERVALS.length - 1);
      entry.intervalIndex = nextIdx;
      entry.nextReviewAt = startOfDay(now) + REVIEW_INTERVALS[nextIdx] * DAY_MS;
      if (entry.correctStreak >= MASTER_THRESHOLD) entry.status = 'mastered';
      else entry.status = entry.status === 'new' ? 'learning' : (entry.status || 'learning');
    } else {
      entry.correctStreak = 0;
      entry.wrongCount = (entry.wrongCount || 0) + 1;
      entry.intervalIndex = 0;
      entry.nextReviewAt = startOfDay(now) + REVIEW_INTERVALS[0] * DAY_MS;
      entry.status = 'learning';
    }

    map[word] = entry;
    saveWordProgress(map);
    touchDailyLog({ wordStudied: word, known });
    registerActivity();
  }

  function recordWordQuizResult(word, correct) {
    recordWordKnow(word, correct);
  }

  function markNewWordsStudied(words) {
    const map = loadWordProgress();
    const now = Date.now();
    words.forEach(w => {
      const word = typeof w === 'string' ? w : w.word;
      if (!map[word]) map[word] = initWordEntry(word);
      else if (map[word].status === 'new') {
        map[word].status = 'learning';
        map[word].firstLearnedAt = now;
      }
    });
    saveWordProgress(map);
    const tk = todayKey();
    const log = loadDailyLog();
    if (!log[tk]) log[tk] = {};
    const list = new Set(log[tk].newWordList || []);
    words.forEach(w => list.add(typeof w === 'string' ? w : w.word));
    log[tk].newWordList = [...list];
    log[tk].newWords = list.size;
    saveJSON(KEY_DAILY_LOG, log);
    completeTask('word_new');
    registerActivity();
  }

  function getProgressStats(bank) {
    const map = loadWordProgress();
    let learning = 0, mastered = 0, due = 0;
    bank.forEach(w => {
      const e = map[w.word];
      if (!e) return;
      if (e.status === 'mastered') mastered++;
      else if (e.status === 'learning' || e.status === 'reviewing') learning++;
      if (isDue(e)) due++;
    });
    const total = bank.length;
    const touched = Object.keys(map).length;
    return { total, touched, learning, mastered, due, newCount: total - touched };
  }

  function loadStreak() {
    return loadJSON(KEY_STREAK, { current: 0, longest: 0, lastActiveDate: '' });
  }

  function saveStreak(s) {
    saveJSON(KEY_STREAK, s);
  }

  function registerActivity() {
    const tk = todayKey();
    const streak = loadStreak();
    if (streak.lastActiveDate === tk) return streak;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yk = todayKey(yesterday);
    if (streak.lastActiveDate === yk) streak.current = (streak.current || 0) + 1;
    else streak.current = 1;
    streak.longest = Math.max(streak.longest || 0, streak.current);
    streak.lastActiveDate = tk;
    saveStreak(streak);
    return streak;
  }

  function loadDailyLog() {
    return loadJSON(KEY_DAILY_LOG, {});
  }

  function touchDailyLog(partial) {
    const tk = todayKey();
    const log = loadDailyLog();
    if (!log[tk]) log[tk] = { date: tk };
    Object.assign(log[tk], partial);
    saveJSON(KEY_DAILY_LOG, log);
  }

  function loadTodayTasks() {
    const tk = todayKey();
    const stored = loadJSON(KEY_TODAY_TASKS, {});
    if (stored.date === tk && stored.tasks) return stored.tasks;
    const tasks = buildTodayTasks();
    saveJSON(KEY_TODAY_TASKS, { date: tk, tasks });
    return tasks;
  }

  function buildTodayTasks() {
    const bank = window.WORD_BANK_DATA || [];
    const due = getDueReviewWords(bank).length;
    return TASK_DEFS.filter(t => {
      if (t.key === 'word_review') return due > 0;
      return true;
    }).map(t => ({ ...t, done: false }));
  }

  function saveTodayTasks(tasks) {
    saveJSON(KEY_TODAY_TASKS, { date: todayKey(), tasks });
  }

  function completeTask(taskKey) {
    const tasks = loadTodayTasks();
    const t = tasks.find(x => x.key === taskKey);
    if (t && !t.done) {
      t.done = true;
      saveTodayTasks(tasks);
      completeSystemPlan(taskKey);
      registerActivity();
    }
    return tasks;
  }

  function getTodayProgress() {
    const tasks = loadTodayTasks();
    const done = tasks.filter(t => t.done).length;
    return { tasks, done, total: tasks.length, pct: tasks.length ? Math.round(done / tasks.length * 100) : 0 };
  }

  function loadPlans() {
    ensureSystemPlans();
    return loadJSON(KEY_PLANS, []);
  }

  function savePlans(list) {
    saveJSON(KEY_PLANS, list);
  }

  function ensureSystemPlans() {
    const tk = todayKey();
    const all = loadJSON(KEY_PLANS, []);
    const manual = all.filter(p => p.type !== 'system');
    let system = all.filter(p => p.type === 'system' && p.planDate === tk);
    const settings = loadSettings();
    const due = getDueReviewWords(window.WORD_BANK_DATA || []).length;

    const systemDefs = [
      { taskKey: 'word_new', text: `学习 ${settings.dailyNewWords} 个新单词` },
      ...(due > 0 ? [{ taskKey: 'word_review', text: `复习 ${due} 个到期单词` }] : []),
      { taskKey: 'grammar', text: '浏览 1 个语法知识点' },
      { taskKey: 'quiz', text: '完成每日测验' },
      { taskKey: 'reading', text: '完成一篇阅读' }
    ];

    const existingKeys = new Set(system.map(p => p.taskKey));
    const tasks = loadTodayTasks();
    systemDefs.forEach(d => {
      if (existingKeys.has(d.taskKey)) {
        const p = system.find(x => x.taskKey === d.taskKey);
        if (p) {
          p.text = d.text;
          p.done = tasks.find(t => t.key === d.taskKey)?.done || p.done;
        }
        return;
      }
      system.push({
        id: `sys_${d.taskKey}_${tk}`,
        text: d.text,
        subject: '英语',
        type: 'system',
        taskKey: d.taskKey,
        planDate: tk,
        done: tasks.find(t => t.key === d.taskKey)?.done || false,
        createdAt: Date.now()
      });
    });
    saveJSON(KEY_PLANS, [...system, ...manual]);
  }

  function completeSystemPlan(taskKey) {
    const plans = loadJSON(KEY_PLANS, []);
    let changed = false;
    plans.forEach(p => {
      if (p.type === 'system' && p.taskKey === taskKey && !p.done) {
        p.done = true;
        changed = true;
      }
    });
    if (changed) saveJSON(KEY_PLANS, plans);
  }

  function markGrammarVisited() {
    saveJSON(KEY_GRAMMAR_TODAY, { date: todayKey(), done: true });
    completeTask('grammar');
    registerActivity();
  }

  function recordQuizComplete(score, total, type) {
    touchDailyLog({ quizScore: `${score}/${total}`, quizType: type });
    completeTask('quiz');
    registerActivity();
  }

  function recordReadingComplete(articleId) {
    touchDailyLog({ readingId: articleId });
    completeTask('reading');
    registerActivity();
  }

  function loadWrongBook(filter = 'all') {
    const list = loadJSON(KEY_WRONG, []);
    if (filter === 'all') return list;
    return list.filter(x => x.type === filter);
  }

  function saveWrongBook(list) {
    saveJSON(KEY_WRONG, list);
  }

  function addToWrongBook(entry) {
    const list = loadWrongBook();
    const id = entry.id;
    const now = Date.now();
    const existing = list.find(x => x.id === id);
    if (existing) {
      existing.wrongAnswer = entry.wrongAnswer;
      existing.count = (existing.count || 1) + 1;
      existing.lastWrongAt = now;
      existing.addedAt = existing.addedAt || now;
    } else {
      list.unshift({ ...entry, subject: entry.subject || 'english', count: 1, addedAt: now, lastWrongAt: now });
    }
    saveWrongBook(list);
  }

  function handleWrongReviewResult(item, correct) {
    const list = loadWrongBook();
    const idx = list.findIndex(x => x.id === item.id);
    if (idx < 0) return;
    if (correct) {
      list[idx].count = Math.max(0, (list[idx].count || 1) - 1);
      if (list[idx].count <= 0) list.splice(idx, 1);
    } else {
      list[idx].count = (list[idx].count || 1) + 1;
      list[idx].lastWrongAt = Date.now();
    }
    saveWrongBook(list);
  }

  function getWrongBookSorted(filter = 'all') {
    return loadWrongBook(filter).sort((a, b) => {
      const dc = (b.count || 1) - (a.count || 1);
      if (dc !== 0) return dc;
      return (a.addedAt || 0) - (b.addedAt || 0);
    });
  }

  function getWeeklyStats() {
    const log = loadDailyLog();
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const k = todayKey(d);
      days.push({ date: k, label: `${d.getMonth() + 1}/${d.getDate()}`, ...(log[k] || {}) });
    }
    const streak = loadStreak();
    const stats = getProgressStats(window.WORD_BANK_DATA || []);
    return { days, streak, stats, wrongCount: loadWrongBook().length };
  }

  function addWordToProgress(word, bank) {
    const w = bank.find(x => x.word === word);
    if (!w) return;
    const map = loadWordProgress();
    if (!map[word]) {
      map[word] = initWordEntry(word);
      saveWordProgress(map);
    }
  }

  return {
    REVIEW_INTERVALS,
    TASK_DEFS,
    loadSettings,
    saveSettings,
    loadWordProgress,
    getWordEntry,
    getDueReviewWords,
    getNewWordsForToday,
    getTodayNewWordTarget,
    recordWordKnow,
    recordWordQuizResult,
    markNewWordsStudied,
    getProgressStats,
    loadStreak,
    registerActivity,
    loadDailyLog,
    touchDailyLog,
    loadTodayTasks,
    completeTask,
    getTodayProgress,
    loadPlans,
    savePlans,
    ensureSystemPlans,
    markGrammarVisited,
    recordQuizComplete,
    recordReadingComplete,
    loadWrongBook,
    saveWrongBook,
    addToWrongBook,
    handleWrongReviewResult,
    getWrongBookSorted,
    getWeeklyStats,
    addWordToProgress,
    todayKey
  };
})();
