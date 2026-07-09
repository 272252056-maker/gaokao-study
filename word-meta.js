/** 常见不规则动词时态 */
const IRREGULAR_VERBS = {
  be: 'am/is/are · was/were · been',
  bear: 'bear · bore · borne/born',
  beat: 'beat · beat · beaten',
  become: 'become · became · become',
  begin: 'begin · began · begun',
  blow: 'blow · blew · blown',
  break: 'break · broke · broken',
  bring: 'bring · brought · brought',
  build: 'build · built · built',
  buy: 'buy · bought · bought',
  catch: 'catch · caught · caught',
  choose: 'choose · chose · chosen',
  come: 'come · came · come',
  cost: 'cost · cost · cost',
  cut: 'cut · cut · cut',
  do: 'do/does · did · done',
  draw: 'draw · drew · drawn',
  drink: 'drink · drank · drunk',
  drive: 'drive · drove · driven',
  eat: 'eat · ate · eaten',
  fall: 'fall · fell · fallen',
  feel: 'feel · felt · felt',
  fight: 'fight · fought · fought',
  find: 'find · found · found',
  fly: 'fly · flew · flown',
  forget: 'forget · forgot · forgotten',
  get: 'get · got · got/gotten',
  give: 'give · gave · given',
  go: 'go · went · gone',
  grow: 'grow · grew · grown',
  hang: 'hang · hung · hung',
  have: 'have/has · had · had',
  hear: 'hear · heard · heard',
  hide: 'hide · hid · hidden',
  hit: 'hit · hit · hit',
  hold: 'hold · held · held',
  hurt: 'hurt · hurt · hurt',
  keep: 'keep · kept · kept',
  know: 'know · knew · known',
  lay: 'lay · laid · laid',
  lead: 'lead · led · led',
  learn: 'learn · learnt/learned · learnt/learned',
  leave: 'leave · left · left',
  lend: 'lend · lent · lent',
  let: 'let · let · let',
  lie: 'lie · lay · lain',
  lose: 'lose · lost · lost',
  make: 'make · made · made',
  mean: 'mean · meant · meant',
  meet: 'meet · met · met',
  pay: 'pay · paid · paid',
  put: 'put · put · put',
  read: 'read · read · read',
  ride: 'ride · rode · ridden',
  ring: 'ring · rang · rung',
  rise: 'rise · rose · risen',
  run: 'run · ran · run',
  say: 'say · said · said',
  see: 'see · saw · seen',
  sell: 'sell · sold · sold',
  send: 'send · sent · sent',
  set: 'set · set · set',
  shake: 'shake · shook · shaken',
  shine: 'shine · shone · shone',
  shoot: 'shoot · shot · shot',
  show: 'show · showed · shown',
  shut: 'shut · shut · shut',
  sing: 'sing · sang · sung',
  sit: 'sit · sat · sat',
  sleep: 'sleep · slept · slept',
  speak: 'speak · spoke · spoken',
  spend: 'spend · spent · spent',
  spread: 'spread · spread · spread',
  stand: 'stand · stood · stood',
  steal: 'steal · stole · stolen',
  stick: 'stick · stuck · stuck',
  strike: 'strike · struck · struck',
  swim: 'swim · swam · swum',
  take: 'take · took · taken',
  teach: 'teach · taught · taught',
  tell: 'tell · told · told',
  think: 'think · thought · thought',
  throw: 'throw · threw · thrown',
  understand: 'understand · understood · understood',
  wake: 'wake · woke · woken',
  wear: 'wear · wore · worn',
  win: 'win · won · won',
  write: 'write · wrote · written'
};

/** 高考常见易混词对 */
const CONFUSING_PAIRS = {
  accept: 'except',
  except: 'accept',
  affect: 'effect',
  effect: 'affect',
  adapt: 'adopt',
  adopt: 'adapt',
  altitude: 'attitude',
  attitude: 'altitude',
  principal: 'principle',
  principle: 'principal',
  quite: 'quiet',
  quiet: 'quite',
  rise: 'raise',
  raise: 'rise',
  lie: 'lay',
  lay: 'lie',
  historic: 'historical',
  historical: 'historic',
  sensible: 'sensitive',
  sensitive: 'sensible',
  respectable: 'respectful',
  respectful: 'respectable',
  complement: 'compliment',
  compliment: 'complement',
  desert: 'dessert',
  dessert: 'desert',
  expand: 'expend',
  expend: 'expand',
  ensure: 'insure',
  insure: 'ensure',
  acquire: 'require',
  require: 'acquire',
  adapt: 'adopt',
  adopt: 'adapt',
  alive: 'live',
  live: 'alive',
  borrow: 'lend',
  lend: 'borrow',
  bring: 'take',
  take: 'bring',
  close: 'closely',
  closely: 'close',
  damage: 'destroy',
  destroy: 'damage',
  discover: 'invent',
  invent: 'discover',
  job: 'work',
  work: 'job',
  listen: 'hear',
  hear: 'listen',
  look: 'see',
  see: 'look',
  many: 'much',
  much: 'many',
  other: 'another',
  another: 'other',
  rob: 'steal',
  steal: 'rob',
  sound: 'voice',
  voice: 'sound',
  trip: 'travel',
  travel: 'trip'
};

function isVerb(pos) {
  if (!pos) return false;
  return /^v/i.test(pos) || pos.includes('动词');
}

function getWordTense(w) {
  const word = (w.word || '').toLowerCase();
  if (!isVerb(w.pos)) return null;
  if (IRREGULAR_VERBS[word]) return IRREGULAR_VERBS[word];
  if (word.endsWith('ie')) return `${word} · ${word.slice(0, -2)}ied · ${word.slice(0, -2)}ying`;
  if (/[^aeiou]y$/i.test(word)) return `${word} · ${word.slice(0, -1)}ied · ${word.slice(0, -1)}ying`;
  if (word.endsWith('e')) return `${word} · ${word}d · ${word.slice(0, -1)}ing`;
  if (/([b-df-hj-np-tv-z])$/.test(word)) {
    const c = word.slice(-1);
    return `${word} · ${word}${c}ed · ${word}${c}ing`;
  }
  return `${word} · ${word}ed · ${word}ing`;
}

function editDistance(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

function buildConfusingIndex(bank) {
  const byPrefix = {};
  bank.forEach(w => {
    const p = w.word.slice(0, 3).toLowerCase();
    if (!byPrefix[p]) byPrefix[p] = [];
    byPrefix[p].push(w.word);
  });
  return byPrefix;
}

function getConfusingWords(w, bank, prefixIndex) {
  const word = w.word.toLowerCase();
  const result = new Set();

  if (CONFUSING_PAIRS[word]) result.add(CONFUSING_PAIRS[word]);

  (prefixIndex[word.slice(0, 3)] || []).forEach(x => {
    if (x !== w.word && editDistance(x.toLowerCase(), word) <= 2) result.add(x);
  });

  if (result.size < 2) {
    bank.forEach(x => {
      if (x.word === w.word) return;
      const d = editDistance(x.word.toLowerCase(), word);
      if (d === 1 || (d === 2 && x.word.length === word.length)) result.add(x.word);
    });
  }

  return [...result].slice(0, 4);
}
