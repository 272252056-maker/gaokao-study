/**
 * 阅读理解 · 首批 10 篇（高考难度分级）
 */
const READING_ARTICLES = [
  {
    id: 'read_001',
    title: 'Environmental Protection',
    titleZh: '环境保护',
    difficulty: 2,
    wordCount: 280,
    source: '高考真题改编',
    paragraphs: [
      'Climate change is one of the greatest challenges facing humanity today. Scientists warn that if we do not reduce carbon emissions significantly, global temperatures will continue to rise, leading to more extreme weather events.',
      'Many countries have committed to reaching net-zero emissions by 2050. This requires shifting from fossil fuels to renewable energy sources such as solar and wind power. Individuals can also contribute by saving energy, reducing waste, and choosing public transportation.',
      'Protecting forests and oceans is equally important. Trees absorb carbon dioxide, while oceans regulate the Earth\'s climate. However, deforestation and plastic pollution are destroying these natural systems at an alarming rate.',
      'Education plays a key role in environmental protection. When young people understand the science behind climate change, they are more likely to adopt sustainable habits and advocate for policy changes.'
    ],
    questions: [
      {
        q: 'What is the main purpose of the first paragraph?',
        options: ['To describe weather patterns', 'To introduce the challenge of climate change', 'To explain renewable energy', 'To discuss ocean pollution'],
        answer: 1,
        explanation: '第一段点明气候变化是人类面临的重大挑战，属于引入主题。'
      },
      {
        q: 'According to the passage, net-zero emissions by 2050 requires ___.',
        options: ['more plastic use', 'shifting to renewable energy', 'cutting down more trees', 'avoiding public transport'],
        answer: 1,
        explanation: '文中明确提到需要转向 solar and wind power 等可再生能源。'
      },
      {
        q: 'What can be inferred about young people and environmental protection?',
        options: ['They cannot influence policy', 'Education helps them take action', 'They prefer fossil fuels', 'They ignore climate science'],
        answer: 1,
        explanation: '最后一段说明教育使年轻人更可能养成可持续习惯并推动政策改变。'
      }
    ],
    vocab: [
      { word: 'emission', meaning: 'n. 排放；排放物' },
      { word: 'renewable', meaning: 'adj. 可再生的' },
      { word: 'deforestation', meaning: 'n. 滥伐森林' },
      { word: 'sustainable', meaning: 'adj. 可持续的' }
    ]
  },
  {
    id: 'read_002',
    title: 'The Power of Friendship',
    titleZh: '友谊的力量',
    difficulty: 1,
    wordCount: 220,
    source: '教材拓展',
    paragraphs: [
      'Friendship is one of the most valuable relationships in a teenager\'s life. Good friends support us during difficult times and celebrate our successes. They listen without judging and encourage us to become better versions of ourselves.',
      'However, maintaining friendships requires effort. Trust and honesty form the foundation of any lasting friendship. When misunderstandings occur, open communication can prevent small problems from becoming serious conflicts.',
      'In the digital age, many teenagers connect through social media. While online friendships can be meaningful, face-to-face interaction remains essential for building deep emotional bonds.'
    ],
    questions: [
      {
        q: 'What forms the foundation of lasting friendship?',
        options: ['Wealth and fame', 'Trust and honesty', 'Social media', 'Competition'],
        answer: 1,
        explanation: '文中明确指出 Trust and honesty form the foundation。'
      },
      {
        q: 'The author suggests that face-to-face interaction is ___.',
        options: ['outdated', 'essential for deep bonds', 'less important than online chat', 'only for adults'],
        answer: 1,
        explanation: '最后一句强调面对面交流对建立深层情感联系仍然必不可少。'
      }
    ],
    vocab: [
      { word: 'misunderstanding', meaning: 'n. 误解' },
      { word: 'interaction', meaning: 'n. 互动；交流' }
    ]
  },
  {
    id: 'read_003',
    title: 'Learning from Failure',
    titleZh: '从失败中学习',
    difficulty: 2,
    wordCount: 260,
    source: '高考真题改编',
    paragraphs: [
      'Thomas Edison once said, "I have not failed. I\'ve just found 10,000 ways that won\'t work." This famous quote reminds us that failure is not the opposite of success but a step toward it.',
      'Many successful people experienced repeated failures before achieving their goals. J.K. Rowling\'s Harry Potter manuscript was rejected by twelve publishers before it was finally accepted. Her persistence turned rejection into one of the best-selling book series in history.',
      'For students, failing a test can feel devastating. Yet each mistake reveals gaps in knowledge. By analyzing errors and adjusting study methods, students can transform failure into a powerful learning opportunity.'
    ],
    questions: [
      {
        q: 'Edison\'s quote suggests that failure is ___.',
        options: ['the opposite of success', 'a step toward success', 'always avoidable', 'a sign of laziness'],
        answer: 1,
        explanation: '引语说明失败不是成功的对立面，而是通向成功的一步。'
      },
      {
        q: 'Why is J.K. Rowling mentioned in the passage?',
        options: ['She invented the light bulb', 'She succeeded after many rejections', 'She never failed in writing', 'She rejected twelve publishers'],
        answer: 1,
        explanation: '举例说明她在多次被拒后坚持并最终成功。'
      }
    ],
    vocab: [
      { word: 'persistence', meaning: 'n. 坚持；毅力' },
      { word: 'devastating', meaning: 'adj. 毁灭性的；极糟糕的' },
      { word: 'manuscript', meaning: 'n. 手稿' }
    ]
  },
  {
    id: 'read_004',
    title: 'Artificial Intelligence in Daily Life',
    titleZh: '日常生活中的人工智能',
    difficulty: 3,
    wordCount: 300,
    source: '时事改编',
    paragraphs: [
      'Artificial intelligence (AI) has quietly entered our daily lives. From voice assistants on smartphones to recommendation algorithms on streaming platforms, AI systems analyze vast amounts of data to predict our preferences and automate routine tasks.',
      'In healthcare, AI helps doctors detect diseases earlier by analyzing medical images with remarkable accuracy. In transportation, self-driving technology promises to reduce accidents caused by human error.',
      'Despite these benefits, concerns about privacy and job displacement remain. Critics argue that AI companies must be transparent about how they collect and use personal data. Governments worldwide are debating regulations to ensure AI develops responsibly.',
      'Experts agree that AI literacy will become as important as computer literacy. Understanding how AI works enables citizens to use technology wisely rather than fear it blindly.'
    ],
    questions: [
      {
        q: 'What is one benefit of AI in healthcare mentioned in the passage?',
        options: ['Replacing all doctors', 'Early disease detection', 'Eliminating hospitals', 'Reducing medical costs to zero'],
        answer: 1,
        explanation: '文中提到 AI 通过分析医学影像帮助医生更早发现疾病。'
      },
      {
        q: 'What concern about AI is raised in paragraph 3?',
        options: ['It is too slow', 'Privacy and job displacement', 'It cannot analyze data', 'It only works on phones'],
        answer: 1,
        explanation: '第三段提到 privacy and job displacement 的担忧。'
      }
    ],
    vocab: [
      { word: 'algorithm', meaning: 'n. 算法' },
      { word: 'automate', meaning: 'v. 使自动化' },
      { word: 'transparent', meaning: 'adj. 透明的；公开的' },
      { word: 'literacy', meaning: 'n. 素养；读写能力' }
    ]
  },
  {
    id: 'read_005',
    title: 'Traditional Chinese Festivals',
    titleZh: '中国传统节日',
    difficulty: 1,
    wordCount: 240,
    source: '文化阅读',
    paragraphs: [
      'The Spring Festival, also known as Chinese New Year, is the most important traditional holiday in China. Families gather for reunion dinners, exchange red envelopes, and set off fireworks to welcome the new year and drive away evil spirits.',
      'The Mid-Autumn Festival falls on the fifteenth day of the eighth lunar month. People admire the full moon, eat mooncakes, and express wishes for family unity. The round shape of the moon symbolizes completeness and togetherness.',
      'The Dragon Boat Festival commemorates the ancient poet Qu Yuan. People race dragon boats and eat zongzi, sticky rice wrapped in bamboo leaves. These customs connect modern Chinese people with thousands of years of cultural heritage.'
    ],
    questions: [
      {
        q: 'What do people typically do during the Mid-Autumn Festival?',
        options: ['Race dragon boats', 'Admire the full moon and eat mooncakes', 'Set off fireworks', 'Exchange red envelopes'],
        answer: 1,
        explanation: '中秋节赏月和吃月饼是文中描述的主要活动。'
      },
      {
        q: 'The Dragon Boat Festival is associated with ___.',
        options: ['Qu Yuan', 'Confucius', 'Li Bai', 'Du Fu'],
        answer: 0,
        explanation: '文中明确提到纪念古代诗人屈原。'
      }
    ],
    vocab: [
      { word: 'commemorate', meaning: 'v. 纪念' },
      { word: 'heritage', meaning: 'n. 遗产；传统' },
      { word: 'symbolize', meaning: 'v. 象征' }
    ]
  },
  {
    id: 'read_006',
    title: 'The Benefits of Reading',
    titleZh: '阅读的好处',
    difficulty: 1,
    wordCount: 230,
    source: '教材拓展',
    paragraphs: [
      'Reading regularly offers benefits that extend far beyond the classroom. It expands vocabulary, improves writing skills, and strengthens critical thinking by exposing readers to different perspectives and ideas.',
      'Research shows that reading fiction can increase empathy. When we follow characters through their joys and struggles, we learn to understand emotions that differ from our own experiences.',
      'In an age dominated by short videos and instant messages, deep reading trains our ability to focus for extended periods. This skill is increasingly valuable in both academic and professional settings.'
    ],
    questions: [
      {
        q: 'According to the passage, reading fiction can ___.',
        options: ['reduce vocabulary', 'increase empathy', 'shorten attention span', 'replace all social interaction'],
        answer: 1,
        explanation: '研究表明阅读小说可以增加同理心。'
      }
    ],
    vocab: [
      { word: 'empathy', meaning: 'n. 同理心；共情' },
      { word: 'perspective', meaning: 'n. 观点；视角' },
      { word: 'critical', meaning: 'adj. 批判性的' }
    ]
  },
  {
    id: 'read_007',
    title: 'Volunteering Experience',
    titleZh: '志愿者经历',
    difficulty: 2,
    wordCount: 270,
    source: '高考真题改编',
    paragraphs: [
      'Last summer, I volunteered at a local community center that provides free tutoring for primary school students. Initially, I was nervous about whether I could explain math concepts clearly to young children.',
      'My first student, a shy eight-year-old named Lily, struggled with multiplication tables. Instead of simply giving answers, I used colorful cards and games to make learning fun. Within two weeks, her confidence grew noticeably.',
      'The experience taught me that patience and creativity matter as much as knowledge. More importantly, I discovered the joy of contributing to others\' growth. I plan to continue volunteering throughout high school.'
    ],
    questions: [
      {
        q: 'Why was the author nervous at first?',
        options: ['The center was too far', 'They doubted their ability to teach children', 'Lily refused to learn', 'There were no materials'],
        answer: 1,
        explanation: '作者担心是否能向小孩子清楚地讲解数学概念。'
      },
      {
        q: 'How did the author help Lily learn multiplication?',
        options: ['By giving all the answers', 'By using cards and games', 'By assigning more homework', 'By skipping difficult parts'],
        answer: 1,
        explanation: '作者用彩色卡片和游戏让学习变得有趣。'
      }
    ],
    vocab: [
      { word: 'volunteer', meaning: 'v./n. 志愿；志愿者' },
      { word: 'multiplication', meaning: 'n. 乘法' },
      { word: 'noticeably', meaning: 'adv. 显著地' }
    ]
  },
  {
    id: 'read_008',
    title: 'Sleep and Study Performance',
    titleZh: '睡眠与学习表现',
    difficulty: 2,
    wordCount: 250,
    source: '健康科普',
    paragraphs: [
      'Many high school students sacrifice sleep to study longer hours, believing that more time at the desk equals better grades. However, neuroscience research suggests the opposite may be true.',
      'During sleep, the brain consolidates memories formed during the day. Without adequate rest, information learned the previous evening is less likely to be retained. Teenagers typically need eight to ten hours of sleep per night.',
      'Sleep deprivation also affects concentration, mood, and immune function. Students who consistently sleep less than six hours often perform worse on exams than those who maintain regular sleep schedules, even if they study fewer hours.'
    ],
    questions: [
      {
        q: 'What happens during sleep according to the passage?',
        options: ['The brain forgets old memories', 'The brain consolidates memories', 'Students become more stressed', 'Immune function decreases'],
        answer: 1,
        explanation: '睡眠期间大脑巩固白天形成的记忆。'
      },
      {
        q: 'The passage mainly suggests that ___.',
        options: ['more study time always helps', 'adequate sleep supports learning', 'six hours is enough for teens', 'exams do not reflect sleep habits'],
        answer: 1,
        explanation: '全文论证充足睡眠对学习的重要性。'
      }
    ],
    vocab: [
      { word: 'consolidate', meaning: 'v. 巩固；合并' },
      { word: 'deprivation', meaning: 'n. 剥夺；缺乏' },
      { word: 'neuroscience', meaning: 'n. 神经科学' }
    ]
  },
  {
    id: 'read_009',
    title: 'Wildlife Conservation',
    titleZh: '野生动物保护',
    difficulty: 3,
    wordCount: 290,
    source: '高考真题改编',
    paragraphs: [
      'The giant panda, once endangered, has become a symbol of successful wildlife conservation. Thanks to decades of habitat protection and breeding programs, its status was downgraded from "endangered" to "vulnerable" in 2016.',
      'Conservation efforts involve local communities, scientists, and international organizations working together. Establishing nature reserves limits human activity in critical habitats, giving species space to recover.',
      'However, many other species continue to face extinction due to poaching, habitat loss, and climate change. Protecting biodiversity requires sustained funding and public awareness, not just short-term campaigns.'
    ],
    questions: [
      {
        q: 'Why was the giant panda mentioned?',
        options: ['It is still endangered', 'It represents successful conservation', 'It lives only in zoos', 'It was extinct in 2016'],
        answer: 1,
        explanation: '大熊猫是成功保护野生动物的象征。'
      },
      {
        q: 'What threatens many species according to the last paragraph?',
        options: ['Too many nature reserves', 'Poaching and habitat loss', 'International cooperation', 'Breeding programs'],
        answer: 1,
        explanation: '偷猎、栖息地丧失和气候变化导致许多物种仍面临灭绝。'
      }
    ],
    vocab: [
      { word: 'endangered', meaning: 'adj. 濒危的' },
      { word: 'biodiversity', meaning: 'n. 生物多样性' },
      { word: 'poaching', meaning: 'n. 偷猎' }
    ]
  },
  {
    id: 'read_010',
    title: 'Time Management for Students',
    titleZh: '学生的时间管理',
    difficulty: 2,
    wordCount: 255,
    source: '学习方法',
    paragraphs: [
      'Effective time management is a skill that benefits students throughout their academic careers. Rather than working harder, successful students often work smarter by prioritizing tasks and eliminating distractions.',
      'One popular technique is the Pomodoro Method: study for 25 minutes, then take a 5-minute break. After four cycles, take a longer break. This approach maintains focus while preventing mental fatigue.',
      'Creating a weekly schedule helps balance schoolwork, extracurricular activities, and rest. Reviewing the schedule each Sunday allows students to adjust plans based on upcoming exams and deadlines.'
    ],
    questions: [
      {
        q: 'What is the Pomodoro Method?',
        options: ['Study all night without breaks', '25 minutes study + 5 minutes break', 'One hour study + one hour break', 'Study only on weekends'],
        answer: 1,
        explanation: '番茄工作法：学习25分钟，休息5分钟。'
      },
      {
        q: 'When does the passage suggest reviewing the weekly schedule?',
        options: ['Every morning', 'Each Sunday', 'After every exam', 'Never'],
        answer: 1,
        explanation: '每周日回顾并调整计划。'
      }
    ],
    vocab: [
      { word: 'prioritize', meaning: 'v. 优先处理' },
      { word: 'eliminate', meaning: 'v. 消除；排除' },
      { word: 'extracurricular', meaning: 'adj. 课外的' }
    ]
  }
];

function getReadingById(id) {
  return READING_ARTICLES.find(a => a.id === id);
}

function getTodayReadingSuggestion() {
  const day = new Date().getDate();
  return READING_ARTICLES[day % READING_ARTICLES.length];
}
