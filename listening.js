/**
 * 听力练习 · 首批 5 段（Web 版使用 TTS 朗读脚本）
 */
const LISTENING_ITEMS = [
  {
    id: 'listen_001',
    title: 'At the Library',
    titleZh: '在图书馆',
    difficulty: 1,
    duration: '约 45 秒',
    script: [
      { speaker: 'W', text: 'Excuse me, could you tell me where the English reading section is?' },
      { speaker: 'M', text: 'Sure. Go straight ahead and turn left at the science books. It\'s on the second shelf.' },
      { speaker: 'W', text: 'Thank you. By the way, how long can I keep the books?' },
      { speaker: 'M', text: 'Students can borrow up to five books for two weeks. You can renew them online if you need more time.' }
    ],
    questions: [
      {
        q: 'Where is the English reading section?',
        options: ['On the first shelf near the entrance', 'Turn left at the science books', 'Next to the music section', 'On the third floor'],
        answer: 1,
        explanation: '男士说在 science books 处左转，在第二个书架。'
      },
      {
        q: 'How long can students keep the books?',
        options: ['One week', 'Two weeks', 'One month', 'Three days'],
        answer: 1,
        explanation: '学生可借五本书，期限两周。'
      }
    ]
  },
  {
    id: 'listen_002',
    title: 'Weekend Plans',
    titleZh: '周末计划',
    difficulty: 1,
    duration: '约 50 秒',
    script: [
      { speaker: 'A', text: 'Hey, are you free this Saturday afternoon?' },
      { speaker: 'B', text: 'I have a math competition in the morning, but I should be free after two o\'clock.' },
      { speaker: 'A', text: 'Great! A few of us are going to see the new science exhibition at the city museum.' },
      { speaker: 'B', text: 'That sounds interesting. Should I meet you at the museum or at school first?' },
      { speaker: 'A', text: 'Let\'s meet at the school gate at two thirty, and we\'ll take the bus together.' }
    ],
    questions: [
      {
        q: 'What is the man doing on Saturday morning?',
        options: ['Visiting a museum', 'Attending a math competition', 'Studying at the library', 'Playing basketball'],
        answer: 1,
        explanation: '周六上午有 math competition。'
      },
      {
        q: 'Where will they meet?',
        options: ['At the museum', 'At the school gate', 'At the bus station', 'At the exhibition hall'],
        answer: 1,
        explanation: '两点半在学校门口集合。'
      }
    ]
  },
  {
    id: 'listen_003',
    title: 'Course Selection',
    titleZh: '选课咨询',
    difficulty: 2,
    duration: '约 55 秒',
    script: [
      { speaker: 'S', text: 'Professor Wang, I\'m thinking about taking your advanced writing course next semester. What are the requirements?' },
      { speaker: 'P', text: 'You need to have completed the basic English writing class with a grade of B or above.' },
      { speaker: 'S', text: 'I got an A in that class. How many essays do we need to write?' },
      { speaker: 'P', text: 'There are four major essays plus weekly journal entries. Class size is limited to twenty students, so register early.' }
    ],
    questions: [
      {
        q: 'What is required to take the advanced writing course?',
        options: ['No previous courses needed', 'Basic writing class with grade B+', 'A recommendation letter', 'A placement test only'],
        answer: 1,
        explanation: '需完成基础英语写作课且成绩 B 以上。'
      },
      {
        q: 'How many major essays are required?',
        options: ['Two', 'Four', 'Ten', 'One per week'],
        answer: 1,
        explanation: '四门大作文加上每周日记。'
      }
    ]
  },
  {
    id: 'listen_004',
    title: 'Weather and Activity',
    titleZh: '天气与活动',
    difficulty: 2,
    duration: '约 48 秒',
    script: [
      { speaker: 'M', text: 'The weather forecast says it will rain heavily this afternoon. Our picnic might be cancelled.' },
      { speaker: 'W', text: 'That\'s disappointing. What about moving it to the school hall? We can still play games and share food indoors.' },
      { speaker: 'M', text: 'Good idea. I\'ll text everyone to bring their dishes to the hall at four o\'clock instead of the park.' },
      { speaker: 'W', text: 'Perfect. Indoor activities might be even more fun if we organize a talent show.' }
    ],
    questions: [
      {
        q: 'Why might the picnic be cancelled?',
        options: ['Nobody wants to go', 'Heavy rain is expected', 'The park is closed', 'Food is not ready'],
        answer: 1,
        explanation: '天气预报说下午有大雨。'
      },
      {
        q: 'Where will the activity take place finally?',
        options: ['In the park', 'In the school hall', 'At home', 'At a restaurant'],
        answer: 1,
        explanation: '改到学校 hall 室内进行。'
      }
    ]
  },
  {
    id: 'listen_005',
    title: 'Part-time Job Interview',
    titleZh: '兼职面试',
    difficulty: 3,
    duration: '约 60 秒',
    script: [
      { speaker: 'B', text: 'Good morning. I saw your advertisement for a part-time shop assistant. I\'d like to apply.' },
      { speaker: 'M', text: 'Welcome. Do you have any previous work experience?' },
      { speaker: 'B', text: 'I helped at my uncle\'s bookstore last summer. I was responsible for organizing shelves and assisting customers.' },
      { speaker: 'M', text: 'That\'s helpful. We need someone available on weekends. Can you work every Saturday and Sunday?' },
      { speaker: 'B', text: 'Yes, except during exam weeks. I can also work on weekday evenings after six.' }
    ],
    questions: [
      {
        q: 'Where did the applicant work last summer?',
        options: ['A coffee shop', 'A bookstore', 'A supermarket', 'A school library'],
        answer: 1,
        explanation: '在 uncle\'s bookstore 帮忙。'
      },
      {
        q: 'When can the applicant NOT work on weekends?',
        options: ['Every weekend', 'During exam weeks', 'On Sunday mornings', 'Never'],
        answer: 1,
        explanation: '考试周除外，其余周末可以。'
      }
    ]
  }
];

function getListeningById(id) {
  return LISTENING_ITEMS.find(x => x.id === id);
}

function getListeningScriptText(item) {
  return item.script.map(s => s.text).join(' ');
}
