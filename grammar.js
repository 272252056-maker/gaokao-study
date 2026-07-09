const GRAMMAR_CATEGORIES = [
  {
    id: 'tense',
    name: '时态',
    icon: '⏱️',
    topics: [
      {
        id: 'simple-present',
        title: '一般现在时',
        summary: '表示经常性、习惯性动作或客观真理。',
        structure: '主语 + 动词原形/第三人称单数',
        examples: [
          { en: 'I study English every day.', zh: '我每天学英语。' },
          { en: 'The sun rises in the east.', zh: '太阳从东方升起。' },
          { en: 'She likes reading books.', zh: '她喜欢读书。' }
        ],
        tips: ['标志词：always, usually, often, every day', '第三人称单数要加 s/es']
      },
      {
        id: 'simple-past',
        title: '一般过去时',
        summary: '表示过去某个时间发生的动作或存在的状态。',
        structure: '主语 + 动词过去式',
        examples: [
          { en: 'I visited Wuhan last summer.', zh: '我去年夏天去了武汉。' },
          { en: 'He did not finish his homework.', zh: '他没做完作业。' }
        ],
        tips: ['标志词：yesterday, last week, ago, in 2020', '不规则动词需单独记忆']
      },
      {
        id: 'simple-future',
        title: '一般将来时',
        summary: '表示将来要发生的动作或状态。',
        structure: '主语 + will/shall/be going to + 动词原形',
        examples: [
          { en: 'I will take the exam next month.', zh: '我下个月参加考试。' },
          { en: 'It is going to rain.', zh: '快要下雨了。' }
        ],
        tips: ['will 表意愿或预测', 'be going to 表计划或迹象']
      },
      {
        id: 'present-continuous',
        title: '现在进行时',
        summary: '表示现在正在进行的动作。',
        structure: '主语 + am/is/are + doing',
        examples: [
          { en: 'She is doing her homework now.', zh: '她正在做作业。' },
          { en: 'They are preparing for the test.', zh: '他们在备考。' }
        ],
        tips: ['标志词：now, at the moment, look, listen']
      },
      {
        id: 'present-perfect',
        title: '现在完成时',
        summary: '表示过去发生但对现在有影响，或持续到现在的动作。',
        structure: '主语 + have/has + 过去分词',
        examples: [
          { en: 'I have learned 500 words.', zh: '我已经学了500个单词。' },
          { en: 'He has lived here for 3 years.', zh: '他在这里住了3年。' }
        ],
        tips: ['标志词：already, yet, ever, never, for, since', 'for + 时间段，since + 时间点']
      },
      {
        id: 'past-perfect',
        title: '过去完成时',
        summary: '表示过去某一时间之前已完成的动作（过去的过去）。',
        structure: '主语 + had + 过去分词',
        examples: [
          { en: 'When I arrived, the class had started.', zh: '我到的时候，课已经开始了。' }
        ],
        tips: ['常与一般过去时连用', '标志词：by the time, before, after']
      }
    ]
  },
  {
    id: 'clause',
    name: '从句',
    icon: '🔗',
    topics: [
      {
        id: 'attributive',
        title: '定语从句',
        summary: '修饰名词或代词，由关系词引导。',
        structure: '先行词 + 关系词(who/which/that/where/when) + 从句',
        examples: [
          { en: 'The boy who won the prize is my classmate.', zh: '得奖的那个男孩是我同学。' },
          { en: 'This is the school where I study.', zh: '这是我上学的学校。' }
        ],
        tips: ['who 指人，which 指物', 'that 可指人或物', 'where 表地点，when 表时间']
      },
      {
        id: 'noun-clause',
        title: '名词性从句',
        summary: '包括主语从句、宾语从句、表语从句、同位语从句。',
        structure: 'that / whether / if / wh- 词 + 陈述语序',
        examples: [
          { en: 'I know that he is honest.', zh: '我知道他是诚实的。' },
          { en: 'What he said is true.', zh: '他说的是真的。' }
        ],
        tips: ['宾语从句用陈述语序', 'if/whether 表"是否"', 'that 在宾语从句中可省略']
      },
      {
        id: 'adverbial',
        title: '状语从句',
        summary: '表示时间、原因、条件、让步、目的、结果等。',
        structure: '连词 + 从句, 主句',
        examples: [
          { en: 'I will go if it does not rain.', zh: '如果不下雨我就去。' },
          { en: 'Although he is young, he works hard.', zh: '虽然他年轻，但很努力。' }
        ],
        tips: ['although 不与 but 连用', 'because 不与 so 连用', '常用连词：when, because, if, although, so that']
      }
    ]
  },
  {
    id: 'nonfinite',
    name: '非谓语动词',
    icon: '📝',
    topics: [
      {
        id: 'infinitive',
        title: '不定式 (to do)',
        summary: '作宾语、宾补、定语、状语等。',
        structure: 'to + 动词原形',
        examples: [
          { en: 'I want to improve my English.', zh: '我想提高英语。' },
          { en: 'He asked me to help him.', zh: '他请我帮他。' }
        ],
        tips: ['want/decide/hope/plan 等后接 to do', 'too...to 太……而不能', 'enough to 足够……去']
      },
      {
        id: 'gerund',
        title: '动名词 (doing)',
        summary: '具有名词性质，可作主语、宾语、表语。',
        structure: '动词-ing',
        examples: [
          { en: 'Reading is my hobby.', zh: '阅读是我的爱好。' },
          { en: 'He enjoys playing basketball.', zh: '他喜欢打篮球。' }
        ],
        tips: ['enjoy/finish/mind/practice 等后接 doing', 'look forward to 中的 to 是介词，后接 doing']
      },
      {
        id: 'participle',
        title: '分词 (doing/done)',
        summary: '现在分词表主动进行，过去分词表被动完成。',
        structure: '现在分词 doing / 过去分词 done',
        examples: [
          { en: 'The girl standing there is my sister.', zh: '站在那儿的女孩是我妹妹。' },
          { en: 'Written in English, the book is popular.', zh: '这本书用英文写，很受欢迎。' }
        ],
        tips: ['现在分词作定语表主动', '过去分词作定语表被动', '可作状语、补语']
      }
    ]
  },
  {
    id: 'voice',
    name: '被动语态',
    icon: '🔄',
    topics: [
      {
        id: 'passive',
        title: '被动语态',
        summary: '强调动作的承受者，结构为 be + 过去分词。',
        structure: '主语 + be + done (+ by sb)',
        examples: [
          { en: 'English is spoken in many countries.', zh: '许多国家说英语。' },
          { en: 'The homework was finished yesterday.', zh: '作业昨天被完成了。' }
        ],
        tips: ['各时态被动 = 该时态的 be + done', '不及物动词无被动', '双宾语被动有两种形式']
      }
    ]
  },
  {
    id: 'subjunctive',
    name: '虚拟语气',
    icon: '💭',
    topics: [
      {
        id: 'subjunctive-mood',
        title: '虚拟语气',
        summary: '表示与事实相反的假设或愿望。',
        structure: 'If + 过去式, would/could/might + do',
        examples: [
          { en: 'If I were you, I would study harder.', zh: '如果我是你，我会更努力学习。' },
          { en: 'I wish I could fly.', zh: '我希望我能飞。' }
        ],
        tips: ['与现在事实相反：If did, would do', '与过去相反：If had done, would have done', 'wish 后接虚拟语气']
      }
    ]
  },
  {
    id: 'agreement',
    name: '主谓一致',
    icon: '⚖️',
    topics: [
      {
        id: 'subject-verb',
        title: '主谓一致',
        summary: '谓语动词在人称和数上与主语保持一致。',
        structure: '单数主语 → 单数动词；复数主语 → 复数动词',
        examples: [
          { en: 'Each student has a book.', zh: '每个学生有一本书。' },
          { en: 'Neither he nor I am wrong.', zh: '他和我都没错。' }
        ],
        tips: ['each/every/no one 后用单数', '就近原则：either...or, neither...nor', '集合名词视语境而定']
      }
    ]
  }
];

const GRAMMAR_QUIZ = [
  { tag: '时态', q: 'I ___ English every day.', options: ['study', 'studied', 'am studying', 'have studied'], answer: 0, hint: 'every day 是一般现在时标志词' },
  { tag: '时态', q: 'She ___ to Wuhan last summer.', options: ['goes', 'went', 'has gone', 'is going'], answer: 1, hint: 'last summer 用一般过去时' },
  { tag: '时态', q: 'Look! The children ___ in the playground.', options: ['play', 'played', 'are playing', 'have played'], answer: 2, hint: 'Look! 表示正在进行的动作' },
  { tag: '时态', q: 'I ___ this book for two weeks.', options: ['read', 'have read', 'am reading', 'was reading'], answer: 1, hint: 'for + 时间段，用现在完成时' },
  { tag: '时态', q: 'He said he ___ the homework before dinner.', options: ['finished', 'had finished', 'has finished', 'was finishing'], answer: 1, hint: '过去的过去用过去完成时' },
  { tag: '从句', q: 'The boy ___ won the prize is my friend.', options: ['which', 'who', 'where', 'when'], answer: 1, hint: '先行词是 boy（人），用 who' },
  { tag: '从句', q: 'This is the house ___ I lived ten years ago.', options: ['which', 'who', 'where', 'that'], answer: 2, hint: '先行词是 house（地点），用 where' },
  { tag: '从句', q: 'I don\'t know ___ he will come or not.', options: ['if', 'that', 'what', 'which'], answer: 0, hint: 'whether/if ... or not 表示"是否"' },
  { tag: '从句', q: '___ he is young, he speaks English well.', options: ['Because', 'Although', 'If', 'So'], answer: 1, hint: 'although 引导让步状语从句' },
  { tag: '非谓语', q: 'I enjoy ___ music in my free time.', options: ['listen', 'to listen', 'listening', 'listened'], answer: 2, hint: 'enjoy 后接动名词 doing' },
  { tag: '非谓语', q: 'He asked me ___ him with English.', options: ['help', 'to help', 'helping', 'helped'], answer: 1, hint: 'ask sb to do sth' },
  { tag: '非谓语', q: 'The girl ___ on the stage is my sister.', options: ['sing', 'sang', 'singing', 'to sing'], answer: 2, hint: '现在分词作定语表主动进行' },
  { tag: '被动', q: 'English ___ in many countries.', options: ['speaks', 'is spoken', 'spoke', 'was speaking'], answer: 1, hint: '主语 English 是动作承受者，用被动' },
  { tag: '被动', q: 'The window ___ by Tom yesterday.', options: ['breaks', 'broke', 'was broken', 'is broken'], answer: 2, hint: 'yesterday + 被动 = was/were + done' },
  { tag: '虚拟', q: 'If I ___ you, I would work harder.', options: ['am', 'was', 'were', 'be'], answer: 2, hint: '与现在事实相反的虚拟语气，be 动词用 were' },
  { tag: '主谓一致', q: 'Each of the students ___ a dictionary.', options: ['have', 'has', 'having', 'had'], answer: 1, hint: 'each of + 复数名词，谓语用单数' },
  { tag: '主谓一致', q: 'Neither Tom nor I ___ wrong.', options: ['is', 'am', 'are', 'be'], answer: 1, hint: '就近原则：I 后用 am' },
  { tag: '时态', q: 'We ___ a test next Friday.', options: ['take', 'took', 'will take', 'have taken'], answer: 2, hint: 'next Friday 是一般将来时' },
  { tag: '从句', q: 'Do you know ___ he lives?', options: ['what', 'where', 'which', 'who'], answer: 1, hint: '宾语从句询问地点用 where' },
  { tag: '非谓语', q: 'It\'s too difficult for me ___.', options: ['understand', 'understanding', 'to understand', 'understood'], answer: 2, hint: 'too ... to do 结构' }
];

/** 语法知识点专项练习（topicId → 3～5 题） */
const GRAMMAR_TOPIC_QUIZ = {
  'simple-present': [
    { tag: '一般现在时', q: 'He usually ___ to school by bike.', options: ['go', 'goes', 'going', 'went'], answer: 1, hint: '第三人称单数 + goes' },
    { tag: '一般现在时', q: 'The earth ___ around the sun.', options: ['move', 'moves', 'moved', 'moving'], answer: 1, hint: '客观真理用一般现在时' },
    { tag: '一般现在时', q: 'They ___ TV every evening.', options: ['watch', 'watches', 'watched', 'watching'], answer: 0, hint: '复数主语用动词原形' }
  ],
  'simple-past': [
    { tag: '一般过去时', q: 'I ___ my keys at home yesterday.', options: ['leave', 'left', 'have left', 'am leaving'], answer: 1, hint: 'yesterday → 过去式 left' },
    { tag: '一般过去时', q: 'She ___ happy when she heard the news.', options: ['is', 'was', 'has been', 'will be'], answer: 1, hint: 'heard 是过去时，主句也用过去时' },
    { tag: '一般过去时', q: 'We ___ to the park last Sunday.', options: ['go', 'went', 'have gone', 'going'], answer: 1, hint: 'last Sunday 用一般过去时' }
  ],
  'simple-future': [
    { tag: '一般将来时', q: 'I ___ call you when I arrive.', options: ['will', 'would', 'was', 'am'], answer: 0, hint: 'when 引导时间状语从句，主句用 will' },
    { tag: '一般将来时', q: 'Look at the clouds. It ___ rain.', options: ['will', 'is going to', 'rained', 'rains'], answer: 1, hint: '有迹象用 be going to' },
    { tag: '一般将来时', q: 'They ___ a meeting tomorrow morning.', options: ['have', 'had', 'will have', 'having'], answer: 2, hint: 'tomorrow → 将来时' }
  ],
  'present-continuous': [
    { tag: '现在进行时', q: 'Listen! Someone ___ at the door.', options: ['knocks', 'knocked', 'is knocking', 'has knocked'], answer: 2, hint: 'Listen! 表正在发生' },
    { tag: '现在进行时', q: 'She ___ an exam paper now.', options: ['writes', 'is writing', 'wrote', 'has written'], answer: 1, hint: 'now → 现在进行时' },
    { tag: '现在进行时', q: 'What ___ you ___ at the moment?', options: ['do, do', 'are, doing', 'did, do', 'have, done'], answer: 1, hint: 'at the moment 用现在进行时' }
  ],
  'present-perfect': [
    { tag: '现在完成时', q: 'I ___ never ___ such a beautiful place.', options: ['have, seen', 'had, seen', 'am, seeing', 'was, seeing'], answer: 0, hint: 'never 常和现在完成时连用' },
    { tag: '现在完成时', q: 'She ___ here since 2020.', options: ['lives', 'lived', 'has lived', 'is living'], answer: 2, hint: 'since + 时间点 → 现在完成时' },
    { tag: '现在完成时', q: '___ you finished your homework yet?', options: ['Do', 'Did', 'Have', 'Are'], answer: 2, hint: 'yet 用于现在完成时疑问句' }
  ],
  'past-perfect': [
    { tag: '过去完成时', q: 'When I got to the station, the train ___.', options: ['left', 'has left', 'had left', 'was leaving'], answer: 2, hint: '过去的过去 → had left' },
    { tag: '过去完成时', q: 'She told me she ___ the book before.', options: ['read', 'has read', 'had read', 'reads'], answer: 2, hint: 'told 是过去时，之前读完用过去完成时' },
    { tag: '过去完成时', q: 'By the time he arrived, we ___ dinner.', options: ['finish', 'finished', 'had finished', 'have finished'], answer: 2, hint: 'By the time + 过去时 → 过去完成时' }
  ],
  'attributive': [
    { tag: '定语从句', q: 'The man ___ is talking to our teacher is my father.', options: ['which', 'who', 'where', 'what'], answer: 1, hint: '先行词 man 指人 → who' },
    { tag: '定语从句', q: 'This is the book ___ I bought yesterday.', options: ['who', 'which', 'where', 'when'], answer: 1, hint: '先行词 book 指物 → which/that' },
    { tag: '定语从句', q: 'I\'ll never forget the day ___ I first met you.', options: ['which', 'who', 'when', 'where'], answer: 2, hint: '先行词 day 表时间 → when' }
  ],
  'noun-clause': [
    { tag: '名词性从句', q: '___ he said at the meeting surprised everyone.', options: ['What', 'Which', 'That', 'Where'], answer: 0, hint: '主语从句缺"说的内容"→ What' },
    { tag: '名词性从句', q: 'I wonder ___ she will accept our invitation.', options: ['that', 'if', 'what', 'which'], answer: 1, hint: 'wonder 后"是否"→ if/whether' },
    { tag: '名词性从句', q: 'The problem is ___ we don\'t have enough time.', options: ['what', 'that', 'which', 'where'], answer: 1, hint: '表语从句陈述事实用 that' }
  ],
  'adverbial': [
    { tag: '状语从句', q: '___ it rains tomorrow, we will stay at home.', options: ['Although', 'If', 'Because', 'So'], answer: 1, hint: '条件状语从句 → If' },
    { tag: '状语从句', q: 'He was late ___ he missed the bus.', options: ['because', 'although', 'if', 'unless'], answer: 0, hint: '原因 → because' },
    { tag: '状语从句', q: '___ hard you try, you should never give up.', options: ['However', 'Whatever', 'Whichever', 'Whoever'], answer: 0, hint: 'However hard = No matter how hard' }
  ],
  'infinitive': [
    { tag: '不定式', q: 'She decided ___ abroad for further study.', options: ['go', 'going', 'to go', 'gone'], answer: 2, hint: 'decide to do' },
    { tag: '不定式', q: 'It\'s important for us ___ English every day.', options: ['practice', 'practicing', 'to practice', 'practiced'], answer: 2, hint: 'It is + adj + for sb + to do' },
    { tag: '不定式', q: 'Would you like ___ with me?', options: ['come', 'to come', 'coming', 'came'], answer: 1, hint: 'would like to do' }
  ],
  'gerund': [
    { tag: '动名词', q: 'I can\'t imagine ___ without music.', options: ['live', 'to live', 'living', 'lived'], answer: 2, hint: 'imagine doing' },
    { tag: '动名词', q: '___ English is not easy, but practice helps.', options: ['Learn', 'Learning', 'To learn', 'Learned'], answer: 1, hint: '动名词作主语' },
    { tag: '动名词', q: 'He admitted ___ the window by mistake.', options: ['break', 'to break', 'breaking', 'broken'], answer: 2, hint: 'admit doing' }
  ],
  'participle': [
    { tag: '分词', q: 'Seen from the hill, the city looks beautiful.', options: ['This is correct', 'Should be "Seeing"', 'Should be "See"', 'Should be "To see"'], answer: 0, hint: '过去分词作状语，city 是被看' },
    { tag: '分词', q: 'The boy ___ under the tree is reading.', options: ['sit', 'sits', 'sitting', 'sat'], answer: 2, hint: '现在分词作定语表主动' },
    { tag: '分词', q: 'With the work ___, he went home happily.', options: ['finish', 'finishing', 'finished', 'to finish'], answer: 2, hint: 'with + 名词 + 过去分词' }
  ],
  'passive': [
    { tag: '被动语态', q: 'The classroom ___ every day.', options: ['cleans', 'is cleaned', 'cleaned', 'was cleaning'], answer: 1, hint: 'every day + 被动 → is cleaned' },
    { tag: '被动语态', q: 'A new school ___ in our town next year.', options: ['builds', 'built', 'will be built', 'is building'], answer: 2, hint: 'next year + 被动 → will be built' },
    { tag: '被动语态', q: 'The letter ___ by hand.', options: ['was written', 'wrote', 'writes', 'is writing'], answer: 0, hint: '信是被写的 → 被动' }
  ],
  'subjunctive-mood': [
    { tag: '虚拟语气', q: 'I wish I ___ taller.', options: ['am', 'was', 'were', 'be'], answer: 2, hint: 'wish + 与现在相反 → were' },
    { tag: '虚拟语气', q: 'If he ___ harder, he would pass the exam.', options: ['studied', 'studies', 'will study', 'has studied'], answer: 0, hint: 'If did, would do' },
    { tag: '虚拟语气', q: 'If I ___ you, I would apologize first.', options: ['am', 'was', 'were', 'be'], answer: 2, hint: 'If I were you 固定搭配' }
  ],
  'subject-verb': [
    { tag: '主谓一致', q: 'The number of students ___ increasing.', options: ['is', 'are', 'were', 'have'], answer: 0, hint: 'the number of → 单数' },
    { tag: '主谓一致', q: 'Not only he but also I ___ interested in science.', options: ['is', 'am', 'are', 'be'], answer: 1, hint: '就近原则：I → am' },
    { tag: '主谓一致', q: 'Ten dollars ___ enough for lunch.', options: ['is', 'are', 'were', 'have'], answer: 0, hint: '金额/时间/距离作主语常视为单数' }
  ]
};

function getGrammarQuizByTopic(topicId) {
  return GRAMMAR_TOPIC_QUIZ[topicId] || [];
}

function findGrammarTopic(catId, topicId) {
  const cat = GRAMMAR_CATEGORIES.find(c => c.id === catId);
  return cat?.topics.find(t => t.id === topicId) || null;
}
