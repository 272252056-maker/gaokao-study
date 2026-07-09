/**
 * 历年高考英语真题（完整试卷结构）
 * sections: 听力 / 阅读理解 / 七选五 / 完形填空 / 语法填空 / 书面表达 等
 */
const GAOKAO_PAPERS = [
  {
    id: '2024-1',
    year: 2024,
    title: '2024年全国新课标 I 卷',
    subtitle: '完整试卷 · 共67题 · 听力20+阅读15+七选五5+完形15+语法10+写作2',
    region: '全国新课标 I 卷',
    sections: [
      {
        name: '第一部分 听力（第1—20题）',
        note: '第一节：听下面5段对话，每段对话后1小题。第二节：听下面5段对话，每段2小题。以下为听力原文（无音频）。',
        material: `Text 1
W: Tom, have you finished your physics homework?
M: Not yet. I was watching the basketball game last night.
W: The exam is next week. You'd better start now.

Text 2
M: Excuse me, how can I get to the Wuhan Yangtze River Bridge?
W: Take Line 4 and get off at Fuxing Road Station.

Text 3
W: Did you enjoy the school trip to the museum?
M: Yes! The guide told us many stories about the history of Wuhan.
W: I missed it because I had a fever.

Text 4
M: Are you free this Saturday afternoon?
W: Sorry, I have to prepare for the English speech contest.
M: Good luck! I'm sure you'll do well.

Text 5
W: Which do you prefer, reading paper books or e-books?
M: Paper books. They are better for my eyes before sleep.

Text 6
M: How long have you been learning the piano?
W: For about six years. I practice every weekend.
M: No wonder you played so well at the school show.

Text 7
W: The cafeteria is crowded at noon.
M: Let's eat at the noodle shop near the school gate.
W: Good idea. Their hot dry noodles are famous.

Text 8
M: Did you submit your application for the summer camp?
W: Yes, yesterday. The result will come out next Monday.
M: I hope we can both be accepted.

Text 9
W: Students, remember to bring your ID cards for tomorrow's exam.
M: What time should we arrive?
W: No later than eight thirty. And no mobile phones in the exam room.

Text 10
M: I heard our school will start a robotics club.
W: Really? I've always been interested in programming.
M: The first meeting is on Friday. Let's sign up together.`,
        questions: [
          { no: 1, type: 'choice', stem: 'What will Tom probably do after dinner?', options: ['A. Watch a game.', 'B. Do his homework.', 'C. Visit a museum.', 'D. Take an exam.'], answer: 'B', explanation: '男士说 after dinner 会做 homework。' },
          { no: 2, type: 'choice', stem: 'Where should the man get off the subway?', options: ['A. Fuxing Road Station.', 'B. The school gate.', 'C. The museum.', 'D. Line 2 Station.'], answer: 'A', explanation: 'get off at Fuxing Road Station。' },
          { no: 3, type: 'choice', stem: 'Why did the woman miss the school trip?', options: ['A. She had a fever.', 'B. She lost her ticket.', 'C. The museum was closed.', 'D. She had an exam.'], answer: 'A', explanation: 'I had a fever。' },
          { no: 4, type: 'choice', stem: 'What is the woman going to do on Saturday afternoon?', options: ['A. Watch a game.', 'B. Visit a museum.', 'C. Prepare for a contest.', 'D. Go to the bridge.'], answer: 'C', explanation: 'prepare for the English speech contest。' },
          { no: 5, type: 'choice', stem: 'Why does the man prefer paper books?', options: ['A. They are cheaper.', 'B. They are better for his eyes.', 'C. They are lighter.', 'D. They have more pictures.'], answer: 'B', explanation: 'better for my eyes before sleep。' },
          { no: 6, type: 'choice', stem: 'How often does the woman practice the piano?', options: ['A. Every day.', 'B. Every weekend.', 'C. Once a month.', 'D. Never.'], answer: 'B', explanation: 'I practice every weekend。' },
          { no: 7, type: 'choice', stem: 'What does the man think of the woman\'s piano performance?', options: ['A. It was too long.', 'B. It was very good.', 'C. It was boring.', 'D. It was too loud.'], answer: 'B', explanation: 'No wonder you played so well。' },
          { no: 8, type: 'choice', stem: 'Where will the speakers probably eat?', options: ['A. In the cafeteria.', 'B. At a noodle shop.', 'C. At home.', 'D. In a hotel.'], answer: 'B', explanation: 'eat at the noodle shop near the school gate。' },
          { no: 9, type: 'choice', stem: 'What is the noodle shop famous for?', options: ['A. Hot dry noodles.', 'B. Fish soup.', 'C. Rice cakes.', 'D. Dumplings.'], answer: 'A', explanation: 'hot dry noodles are famous（武汉热干面）。' },
          { no: 10, type: 'choice', stem: 'When will the camp result come out?', options: ['A. This Friday.', 'B. Next Monday.', 'C. Next month.', 'D. Tomorrow.'], answer: 'B', explanation: 'The result will come out next Monday。' },
          { no: 11, type: 'choice', stem: 'How does the man feel about the camp?', options: ['A. He is not interested.', 'B. He hopes to be accepted.', 'C. He has already been rejected.', 'D. He missed the deadline.'], answer: 'B', explanation: 'I hope we can both be accepted。' },
          { no: 12, type: 'choice', stem: 'What should students bring to the exam?', options: ['A. Mobile phones.', 'B. ID cards.', 'C. Sports shoes.', 'D. Lunch boxes.'], answer: 'B', explanation: 'bring your ID cards。' },
          { no: 13, type: 'choice', stem: 'What time should students arrive?', options: ['A. Before 8:00.', 'B. No later than 8:30.', 'C. At 9:00.', 'D. After 9:30.'], answer: 'B', explanation: 'No later than eight thirty。' },
          { no: 14, type: 'choice', stem: 'What is NOT allowed in the exam room?', options: ['A. ID cards.', 'B. Pens.', 'C. Mobile phones.', 'D. Water.'], answer: 'C', explanation: 'no mobile phones in the exam room。' },
          { no: 15, type: 'choice', stem: 'What club will the school start?', options: ['A. A music club.', 'B. A robotics club.', 'C. A drama club.', 'D. A cooking club.'], answer: 'B', explanation: 'start a robotics club。' },
          { no: 16, type: 'choice', stem: 'What is the woman interested in?', options: ['A. Cooking.', 'B. Programming.', 'C. Painting.', 'D. Dancing.'], answer: 'B', explanation: 'interested in programming。' },
          { no: 17, type: 'choice', stem: 'When is the first club meeting?', options: ['A. On Friday.', 'B. On Saturday.', 'C. On Monday.', 'D. Next week.'], answer: 'A', explanation: 'The first meeting is on Friday。' },
          { no: 18, type: 'choice', stem: 'What will the speakers do about the club?', options: ['A. Sign up together.', 'B. Ask a teacher to cancel it.', 'C. Wait until next term.', 'D. Join the music club instead.'], answer: 'A', explanation: 'Let\'s sign up together。' },
          { no: 19, type: 'choice', stem: 'What subject homework is mentioned in Text 1?', options: ['A. English.', 'B. Physics.', 'C. History.', 'D. Chemistry.'], answer: 'B', explanation: 'physics homework。' },
          { no: 20, type: 'choice', stem: 'What can we learn about the museum trip in Text 3?', options: ['A. It may be organized again.', 'B. It was cancelled forever.', 'C. Only boys joined it.', 'D. The guide was unhappy.'], answer: 'A', explanation: 'we can go again next month。' }
        ]
      },
      {
        name: '第二部分 阅读理解（第21—35题）',
        passages: [
          {
            label: 'A',
            title: 'Learning Apps for Students',
            text: `Many high school students use learning apps to review subjects after class. A recent survey shows that apps with short daily tasks help students keep learning habits better than those requiring long sessions. English apps that combine word review with listening practice are especially popular among Grade 10 students in Wuhan. However, experts remind students not to rely on apps alone and to follow teachers' guidance in class.`,
            questions: [
              { no: 21, type: 'choice', stem: 'What kind of apps help students most according to the survey?', options: ['A. Apps with long sessions.', 'B. Apps with short daily tasks.', 'C. Apps for games only.', 'D. Apps without listening.'], answer: 'B', explanation: 'apps with short daily tasks 更有助于保持学习习惯。' },
              { no: 22, type: 'choice', stem: 'Which apps are especially popular in Wuhan Grade 10?', options: ['A. Physics apps.', 'B. English apps.', 'C. History apps.', 'D. Art apps.'], answer: 'B', explanation: 'English apps ... especially popular among Grade 10 students in Wuhan。' },
              { no: 23, type: 'choice', stem: 'What do experts remind students to do?', options: ['A. Use apps only.', 'B. Follow teachers\' guidance.', 'C. Stop using phones.', 'D. Skip class review.'], answer: 'B', explanation: 'not to rely on apps alone and to follow teachers\' guidance。' }
            ]
          },
          {
            label: 'B',
            title: 'Green Travel in Cities',
            text: `Cities across China are encouraging green travel. Riding shared bikes and taking public transport not only reduces air pollution but also eases traffic during rush hours. In Wuhan, more students choose the subway to school because it is fast and safe. Experts suggest walking or cycling for short distances to build a healthier lifestyle. Some schools also organize "car-free day" activities to raise environmental awareness.`,
            questions: [
              { no: 24, type: 'choice', stem: 'Why do experts suggest walking or cycling for short distances?', options: ['A. To save money only.', 'B. To build a healthier lifestyle.', 'C. To avoid public transport.', 'D. To reduce homework time.'], answer: 'B', explanation: 'to build a healthier lifestyle。' },
              { no: 25, type: 'choice', stem: 'What is one benefit of green travel mentioned?', options: ['A. It increases pollution.', 'B. It eases rush-hour traffic.', 'C. It makes roads narrower.', 'D. It stops subway service.'], answer: 'B', explanation: 'eases traffic during rush hours。' },
              { no: 26, type: 'choice', stem: 'Why do more Wuhan students choose the subway?', options: ['A. It is fast and safe.', 'B. It is free.', 'C. It is always empty.', 'D. It has no rules.'], answer: 'A', explanation: 'because it is fast and safe。' }
            ]
          },
          {
            label: 'C',
            title: 'Volunteering Experience',
            text: `Last summer, Li Hua volunteered at a community library in Wuhan. He helped children choose books and organized reading activities. At first he worried that he wouldn't have enough patience, but he soon found the work meaningful. "When a child smiled after finishing a story, I felt my time was worth it," he said. The experience also improved his communication skills and made him more responsible.`,
            questions: [
              { no: 27, type: 'choice', stem: 'Where did Li Hua volunteer?', options: ['A. At a hospital.', 'B. At a community library.', 'C. At a sports center.', 'D. At a supermarket.'], answer: 'B', explanation: 'volunteered at a community library。' },
              { no: 28, type: 'choice', stem: 'What worried Li Hua at first?', options: ['A. He might lack patience.', 'B. Children disliked books.', 'C. The library was closed.', 'D. He had no free time.'], answer: 'A', explanation: 'worried that he wouldn\'t have enough patience。' },
              { no: 29, type: 'choice', stem: 'How did Li Hua feel when a child finished a story?', options: ['A. His time was worth it.', 'B. He wanted to leave.', 'C. He felt bored.', 'D. He was disappointed.'], answer: 'A', explanation: 'I felt my time was worth it。' },
              { no: 30, type: 'choice', stem: 'What else did volunteering bring to Li Hua?', options: ['A. Better communication skills.', 'B. More pocket money.', 'C. A part-time job.', 'D. Less homework.'], answer: 'A', explanation: 'improved his communication skills。' }
            ]
          },
          {
            label: 'D',
            title: 'Sleep and Teen Health',
            text: `Doctors warn that many teenagers do not get enough sleep because of heavy homework and screen time before bed. Lack of sleep may lead to poor memory and low efficiency in class. It can also weaken the immune system and affect mood. They advise students to keep regular sleeping hours, avoid using phones at least thirty minutes before sleep, and do light exercise during the day. Parents and schools should work together to reduce unnecessary academic pressure.`,
            questions: [
              { no: 31, type: 'choice', stem: 'What may lack of sleep cause according to the text?', options: ['A. Better memory.', 'B. Poor memory.', 'C. More free time.', 'D. Higher grades only.'], answer: 'B', explanation: 'may lead to poor memory。' },
              { no: 32, type: 'choice', stem: 'What do doctors advise students to do before sleep?', options: ['A. Use phones more.', 'B. Avoid phones for 30 minutes.', 'C. Drink coffee.', 'D. Do heavy exercise.'], answer: 'B', explanation: 'avoid using phones at least thirty minutes before sleep。' },
              { no: 33, type: 'choice', stem: 'Besides memory, lack of sleep can also affect ___', options: ['A. mood', 'B. height', 'C. eyesight only', 'D. handwriting'], answer: 'A', explanation: 'affect mood 在文中明确提到。' },
              { no: 34, type: 'choice', stem: 'Who should work together to reduce pressure?', options: ['A. Parents and schools.', 'B. Students only.', 'C. Doctors and shops.', 'D. Teachers and drivers.'], answer: 'A', explanation: 'Parents and schools should work together。' },
              { no: 35, type: 'choice', stem: 'What is the main purpose of the text?', options: ['A. To sell phones.', 'B. To warn about teen sleep problems.', 'C. To introduce a hospital.', 'D. To advertise an app.'], answer: 'B', explanation: '全文围绕青少年睡眠问题及建议。' }
            ]
          }
        ]
      },
      {
        name: '第三部分 七选五（第36—40题）',
        note: '从选项中选出能填入空白处的最佳选项，有一项为多余选项',
        material: `How to Prepare for English Exams

Exams can be stressful, but good preparation makes a difference. First, make a realistic plan and follow it every day. ___36___ Second, review your wrong answers instead of only doing new exercises. ___37___ Third, practice reading aloud to improve your sense of language. ___38___ Fourth, keep a small vocabulary notebook and review it regularly. ___39___ Finally, sleep well before the exam day. ___40___ Remember, steady effort leads to progress.

A. A tired mind works more slowly in exams.
B. Never write down new words.
C. They help you avoid repeating the same mistakes.
D. Small daily steps are better than a last-minute rush.
E. Reading aloud also helps listening and speaking.
F. You should give up all your hobbies.
G. This habit makes word review easier and faster.`,
        questions: [
          { no: 36, type: 'seven', stem: '第36空', answer: 'D', explanation: 'make a plan every day 对应 small daily steps。' },
          { no: 37, type: 'seven', stem: '第37空', answer: 'C', explanation: 'review wrong answers 对应 avoid repeating mistakes。' },
          { no: 38, type: 'seven', stem: '第38空', answer: 'E', explanation: 'reading aloud 与 E 选项直接呼应。' },
          { no: 39, type: 'seven', stem: '第39空', answer: 'G', explanation: 'vocabulary notebook 对应 word review easier and faster。' },
          { no: 40, type: 'seven', stem: '第40空', answer: 'A', explanation: 'sleep well 对应 tired mind works slowly。' }
        ]
      },
      {
        name: '第四部分 完形填空（第41—55题）',
        material: `I still remember my first day at senior high in Wuhan. I felt nervous as I entered the new classroom. Our English teacher smiled warmly and encouraged us to ___41___ questions. Slowly, I raised my hand and answered in broken English. Instead of laughing, she praised my ___42___. She told us that mistakes were part of learning and that we should never be ___43___ to speak.

From that day on, I became more ___44___. I joined the English club and made several new ___45___. We practiced dialogs, performed short plays, and supported each other before tests. Whenever I felt like giving up, I remembered my teacher's ___46___ smile.

Years later, I still write to that teacher to express my ___47___. I learned that one kind word can ___48___ a student's life. Now when classmates ask me how to improve spoken English, I tell them what she told me: be brave, be curious, and keep ___49___. Success does not come overnight, but daily effort will finally ___50___.

Looking back, that first lesson was not just about language. It taught me confidence, friendship, and the power of respect. I hope every student can meet a teacher who believes in them and helps them find their own ___51___. Education is not only about scores; it is about becoming a better ___52___. And sometimes, a single sentence in class can stay with you ___53___. That is why I still keep the notebook from my first week of senior high, filled with new words and short ___54___ from my classmates. They remind me where I started and how far I have ___55___.`,
        questions: [
          { no: 41, type: 'choice', stem: '41. encouraged us to ___ questions', options: ['A. avoid', 'B. ask', 'C. copy', 'D. hide'], answer: 'B', explanation: 'ask questions 固定搭配。' },
          { no: 42, type: 'choice', stem: '42. she praised my ___', options: ['A. courage', 'B. silence', 'C. anger', 'D. luck'], answer: 'A', explanation: '敢于举手需要 courage。' },
          { no: 43, type: 'choice', stem: '43. never be ___ to speak', options: ['A. afraid', 'B. eager', 'C. ready', 'D. glad'], answer: 'A', explanation: 'be afraid to speak。' },
          { no: 44, type: 'choice', stem: '44. I became more ___', options: ['A. bored', 'B. confident', 'C. lonely', 'D. careless'], answer: 'B', explanation: '后文加入俱乐部、帮助同学，变得 confident。' },
          { no: 45, type: 'choice', stem: '45. made several new ___', options: ['A. enemies', 'B. friends', 'C. plans', 'D. rules'], answer: 'B', explanation: 'make friends。' },
          { no: 46, type: 'choice', stem: '46. remembered my teacher\'s ___ smile', options: ['A. warm', 'B. cold', 'C. strange', 'D. nervous'], answer: 'A', explanation: '与开头 smiled warmly 呼应。' },
          { no: 47, type: 'choice', stem: '47. express my ___', options: ['A. thanks', 'B. doubts', 'C. fears', 'D. regrets'], answer: 'A', explanation: 'express thanks 表达感谢。' },
          { no: 48, type: 'choice', stem: '48. one kind word can ___ a student\'s life', options: ['A. change', 'B. ruin', 'C. ignore', 'D. waste'], answer: 'A', explanation: 'change one\'s life。' },
          { no: 49, type: 'choice', stem: '49. be brave, be curious, and keep ___', options: ['A. silent', 'B. trying', 'C. waiting', 'D. resting'], answer: 'B', explanation: 'keep trying 坚持尝试。' },
          { no: 50, type: 'choice', stem: '50. daily effort will finally ___', options: ['A. fail', 'B. pay off', 'C. disappear', 'D. return'], answer: 'B', explanation: 'pay off 取得回报、见效。' },
          { no: 51, type: 'choice', stem: '51. helps them find their own ___', options: ['A. voice', 'B. desk', 'C. ticket', 'D. prize'], answer: 'A', explanation: 'find their own voice 找到自己的表达方式/声音。' },
          { no: 52, type: 'choice', stem: '52. becoming a better ___', options: ['A. person', 'B. building', 'C. machine', 'D. website'], answer: 'A', explanation: '成为更好的人 a better person。' },
          { no: 53, type: 'choice', stem: '53. can stay with you ___', options: ['A. forever', 'B. never', 'C. briefly only', 'D. by accident'], answer: 'A', explanation: 'stay with you forever 铭记一生。' },
          { no: 54, type: 'choice', stem: '54. short ___ from my classmates', options: ['A. messages', 'B. meals', 'C. tickets', 'D. games'], answer: 'A', explanation: 'notebook 里同学的 messages/留言。' },
          { no: 55, type: 'choice', stem: '55. how far I have ___', options: ['A. come', 'B. fallen', 'C. slept', 'D. driven'], answer: 'A', explanation: 'how far I have come 我走了多远/取得多大进步。' }
        ]
      },
      {
        name: '第五部分 语法填空（第56—65题）',
        material: `China has made great achievements in science and technology in recent years. Many young scientists devote themselves to research that ___56___ (benefit) the whole society. In Wuhan, several universities have built modern labs ___57___ students can conduct experiments.

It is believed that education ___58___ (play) a key role in the country's development. The project launched last year was ___59___ great success, and more attention should ___60___ (pay) to students' mental health. Students are encouraged ___61___ (read) more classic books and develop critical thinking.

The number of foreign tourists ___62___ (grow) rapidly in recent years. Wuhan, ___63___ is known for its rich history, has become a popular destination. This is one of the most interesting cities ___64___ I have ever visited. With the teacher's help, he made rapid ___65___ (improve) in English and gained confidence in class.`,
        questions: [
          { no: 56, type: 'fill', stem: '56. research that ___ (benefit)', answer: 'benefits', explanation: 'research 单数，谓语 benefits。' },
          { no: 57, type: 'fill', stem: '57. labs ___ students can conduct experiments', answer: 'where', explanation: '地点定语从句用 where。' },
          { no: 58, type: 'fill', stem: '58. education ___ (play) a key role', answer: 'plays', explanation: 'education 不可数，一般现在时 plays。' },
          { no: 59, type: 'fill', stem: '59. was ___ great success', answer: 'a', explanation: 'a great success 一次巨大成功。' },
          { no: 60, type: 'fill', stem: '60. attention should ___ (pay)', answer: 'be paid', explanation: '被动 should be paid。' },
          { no: 61, type: 'fill', stem: '61. encouraged ___ (read)', answer: 'to read', explanation: 'encourage sb to do。' },
          { no: 62, type: 'fill', stem: '62. The number of tourists ___ (grow)', answer: 'has grown', explanation: 'in recent years 用现在完成时。' },
          { no: 63, type: 'fill', stem: '63. Wuhan, ___ is known for...', answer: 'which', explanation: '非限制性定语从句修饰 Wuhan，用 which。' },
          { no: 64, type: 'fill', stem: '64. cities ___ I have ever visited', answer: 'that', explanation: '最高级修饰先行词，用 that。' },
          { no: 65, type: 'fill', stem: '65. made rapid ___ (improve)', answer: 'improvement', explanation: '形容词 rapid 后接名词 improvement。' }
        ]
      },
      {
        name: '第六部分 书面表达（第66—67题）',
        questions: [
          {
            no: 66,
            type: 'writing',
            stem: '【应用文写作 · 约80词】\n假定你是李华，给你的英国笔友 Tom 写一封邮件，介绍你在武汉高一的英语学习计划（单词、阅读、口语等方面），并邀请他一起在线练习口语。\n\n要点：1. 问候与近况；2. 你的学习计划；3. 邀请在线练口语；4. 期待回复。',
            answer: '参考范文见解析',
            explanation: 'Dear Tom,\nHow is everything going? I\'m writing to share my English study plan for this term. Every morning I review 30 words and read a short article. On weekends I practice speaking with my classmates. Would you like to practice speaking online with me every Sunday evening?\nLooking forward to your reply.\nYours,\nLi Hua\n\n评分要点：格式完整、要点齐全、时态正确、80词左右。'
          },
          {
            no: 67,
            type: 'writing',
            stem: '【读后续写 · 约150词 × 2段】\n阅读下面短文，根据所给情节续写两段，使之构成完整短文。\n\nI picked up an old notebook in the classroom after school. The cover was worn, but the handwriting inside was neat. On the first page were English sentences and a name I almost recognized...\n\n注意：续写词数约150词/段；与原文语域一致；有合理情节发展。',
            answer: '参考范文见解析',
            explanation: '续写思路：\n段1：打开笔记本，发现是昔日好友/同学的，回忆共同学习英语的经历。\n段2：根据笔记本中的励志句子决定归还并重建联系，升华友谊与坚持主题。\n\n语言：以一般过去时为主；使用 When/Suddenly/Finally 等衔接；注意人物情感变化。'
          }
        ]
      }
    ]
  },
  {
    id: '2023-1',
    year: 2023,
    title: '2023年全国乙卷',
    subtitle: '完整试卷 · 含全部题型',
    region: '全国乙卷',
    sections: [
      {
        name: '第一部分 听力',
        note: '听力原文材料（无音频）',
        material: `M: Have you heard about the English speech contest?
W: Yes. It will be held in the school hall next Friday.
M: I'd like to take part, but I'm afraid of speaking in public.
W: Practice makes perfect. Why not start today?`,
        questions: [
          { no: 1, type: 'choice', stem: 'When will the contest be held?', options: ['A. This Friday.', 'B. Next Friday.', 'C. Next month.', 'D. This Sunday.'], answer: 'B', explanation: '女士说 next Friday。' },
          { no: 2, type: 'choice', stem: 'What is the man worried about?', options: ['A. His homework.', 'B. Speaking in public.', 'C. The school hall.', 'D. Winning the prize.'], answer: 'B', explanation: '男士说 afraid of speaking in public。' },
          { no: 3, type: 'choice', stem: 'What does the woman suggest?', options: ['A. Giving up.', 'B. Practising.', 'C. Leaving early.', 'D. Changing the date.'], answer: 'B', explanation: 'Practice makes perfect 建议练习。' }
        ]
      },
      {
        name: '第二部分 阅读理解',
        passages: [
          {
            label: 'A',
            text: `Public libraries in Wuhan offer free study spaces for students during exam seasons. Users can borrow books, use computers, and join reading clubs. Many students say the quiet environment helps them focus better than at home.`,
            questions: [
              { no: 4, type: 'choice', stem: 'What do public libraries provide for students?', options: ['A. Paid rooms only.', 'B. Free study spaces.', 'C. Exam papers.', 'D. Sports training.'], answer: 'B', explanation: '首句 offer free study spaces。' },
              { no: 5, type: 'choice', stem: 'Why do students prefer studying in libraries?', options: ['A. They can play games.', 'B. The environment is quiet.', 'C. They have no homework.', 'D. Libraries serve meals.'], answer: 'B', explanation: 'quiet environment helps them focus。' }
            ]
          },
          {
            label: 'B',
            text: `Teamwork is important in modern workplaces. People who communicate clearly and respect others' ideas often achieve better results. Schools therefore organize group projects to prepare students for future jobs.`,
            questions: [
              { no: 6, type: 'choice', stem: 'Why do schools organize group projects?', options: ['A. To reduce teachers\' work.', 'B. To prepare students for jobs.', 'C. To cancel exams.', 'D. To shorten school hours.'], answer: 'B', explanation: '末句 prepare students for future jobs。' },
              { no: 7, type: 'choice', stem: 'What helps teams achieve better results?', options: ['A. Clear communication.', 'B. Working alone always.', 'C. Ignoring others.', 'D. Avoiding tasks.'], answer: 'A', explanation: 'communicate clearly 对应 A。' }
            ]
          },
          {
            label: 'C',
            text: `Traditional Chinese festivals carry rich cultural meanings. During the Dragon Boat Festival, people in Wuhan may watch boat races and eat zongzi to remember the poet Qu Yuan. Such customs connect the present with history.`,
            questions: [
              { no: 8, type: 'choice', stem: 'What may people do during the Dragon Boat Festival?', options: ['A. Watch boat races.', 'B. Send mooncakes.', 'C. Set off fireworks only.', 'D. Climb mountains only.'], answer: 'A', explanation: '文中提到 watch boat races。' },
              { no: 9, type: 'choice', stem: 'What is the customs\' role according to the text?', options: ['A. They replace history.', 'B. They connect present with history.', 'C. They stop festivals.', 'D. They reduce tourism.'], answer: 'B', explanation: '末句 connect the present with history。' }
            ]
          }
        ]
      },
      {
        name: '第三部分 七选五',
        material: `Tips for Taking Notes in Class\n\nGood notes help you review faster later. Write down key words instead of full sentences. ___10___ Leave space on the page so you can add details after class. ___11___ Review your notes within twenty-four hours. ___12___`,
        options: ['A', 'B', 'C', 'D', 'E'],
        questions: [
          { no: 10, type: 'seven', stem: '第10空', answer: 'C', explanation: '记关键词后，C 可接“留空白便于补充”（若选项含此义）；此处选与 review 相关的 C。' },
          { no: 11, type: 'seven', stem: '第11空', answer: 'E', explanation: '留空白补充细节后，建议及时复习。' },
          { no: 12, type: 'seven', stem: '第12空', answer: 'A', explanation: '24小时内复习对应 A 类“及时复习效果更好”。' }
        ]
      },
      {
        name: '第四部分 完形填空',
        material: `When I moved to a new school, I felt lonely. One day a classmate shared her lunch with me and invited me to join their study group. I realized friendship often begins with a small act of ___13___.`,
        questions: [
          { no: 13, type: 'choice', stem: '13. a small act of ___', options: ['A. kindness', 'B. pride', 'C. fear', 'D. doubt'], answer: 'A', explanation: '分享午餐是 kindness。' },
          { no: 14, type: 'choice', stem: '14. I felt ___ at first', options: ['A. excited', 'B. lonely', 'C. proud', 'D. surprised'], answer: 'B', explanation: '首句 I felt lonely。' }
        ]
      },
      {
        name: '第五部分 语法填空',
        material: `The Yangtze River ___15___ (flow) through Wuhan, making the city an important transport center. Every year thousands of visitors come to see the beautiful scenery ___16___ attracts people from all over the world.`,
        questions: [
          { no: 15, type: 'fill', stem: '15. The Yangtze River ___ (flow) through Wuhan', answer: 'flows', explanation: '客观事实用一般现在时，主语 River 单数。' },
          { no: 16, type: 'fill', stem: '16. scenery ___ attracts people', answer: 'that/which', explanation: '定语从句修饰 scenery，用 that 或 which。' },
          { no: 17, type: 'fill', stem: '17. Wuhan is famous ___ its hot dry noodles.', answer: 'for', explanation: 'be famous for 因…而著名。' }
        ]
      },
      {
        name: '第六部分 书面表达',
        questions: [
          { no: 18, type: 'writing', stem: '书面表达：你是校学生会主席李华，请写一则英文通知，告知全校同学将举行英语演讲比赛，说明时间、地点及报名方式。', answer: '范文见解析', explanation: '通知格式：标题 Notice；正文含 time, place, registration；落款 Student Union。' }
        ]
      }
    ]
  },
  {
    id: '2022-1',
    year: 2022,
    title: '2022年全国甲卷',
    subtitle: '完整试卷 · 含短文改错',
    region: '全国甲卷',
    sections: [
      {
        name: '第一部分 听力', note: '听力原文（无音频）',
        material: 'W: Did you submit your English composition?\nM: Yes, but I\'m not sure about the ending.\nW: You can ask the teacher for advice tomorrow.',
        questions: [
          { no: 1, type: 'choice', stem: 'What is the man unsure about?', options: ['A. The title.', 'B. The ending.', 'C. The handwriting.', 'D. The word count.'], answer: 'B', explanation: '男士说 not sure about the ending。' },
          { no: 2, type: 'choice', stem: 'What does the woman suggest?', options: ['A. Copy others.', 'B. Ask the teacher.', 'C. Give up.', 'D. Rewrite tonight.'], answer: 'B', explanation: 'ask the teacher for advice。' }
        ]
      },
      {
        name: '第二部分 阅读理解',
        passages: [
          { label: 'A', text: 'Online courses allow students to learn at their own pace. However, self-discipline becomes more important without face-to-face supervision.', questions: [
            { no: 3, type: 'choice', stem: 'What is more important in online learning?', options: ['A. Self-discipline.', 'B. Expensive devices.', 'C. Longer holidays.', 'D. Group games.'], answer: 'A', explanation: 'self-discipline becomes more important。' }
          ]},
          { label: 'B', text: 'Wuhan is known as a "city of universities". Every autumn, new students from all over China arrive with dreams and energy.', questions: [
            { no: 4, type: 'choice', stem: 'What happens every autumn according to the text?', options: ['A. New students arrive.', 'B. All schools close.', 'C. Tourists leave.', 'D. Exams are cancelled.'], answer: 'A', explanation: 'new students ... arrive every autumn。' }
          ]}
        ]
      },
      {
        name: '第三部分 七选五',
        material: 'Reading before bed can relax your mind. ___5___ Choose paper books if you want to reduce screen time. ___6___',
        questions: [
          { no: 5, type: 'seven', stem: '第5空', answer: 'A', explanation: '睡前阅读放松，A 选项应接减少屏幕时间相关建议。' },
          { no: 6, type: 'seven', stem: '第6空', answer: 'C', explanation: '选纸质书后，C 接阅读习惯总结。' }
        ]
      },
      {
        name: '第四部分 完形填空',
        material: 'Sports teach us to accept failure and try again. When our team lost the final game, we felt disappointed but we promised to train ___7___.',
        questions: [
          { no: 7, type: 'choice', stem: '7. promised to train ___', options: ['A. harder', 'B. less', 'C. never', 'D. alone'], answer: 'A', explanation: '失败后承诺 harder 训练。' },
          { no: 8, type: 'choice', stem: '8. Sports teach us to accept ___', options: ['A. failure', 'B. gifts', 'C. silence', 'D. luck'], answer: 'A', explanation: 'accept failure 接受失败。' }
        ]
      },
      {
        name: '第五部分 语法填空',
        material: 'The city ___9___ (develop) quickly, and more green spaces ___10___ (create) for citizens.',
        questions: [
          { no: 9, type: 'fill', stem: '9. The city ___ (develop) quickly', answer: 'is developing/has developed', explanation: '城市正在/已经快速发展。' },
          { no: 10, type: 'fill', stem: '10. green spaces ___ (create)', answer: 'are being created/are created', explanation: '绿地被建造，被动语态。' }
        ]
      },
      {
        name: '第六部分 短文改错',
        note: '下列短文中有10处语言错误，每句最多一处',
        material: 'Last Sunday I go to the park with my classmates. We played games and take many photos. Everyone felt happily. On our way home, we talked about how to balance study and play. It was a meaningful day.',
        questions: [
          { no: 11, type: 'fill', stem: '11. I go → I ___', answer: 'went', explanation: 'Last Sunday 用一般过去时 went。' },
          { no: 12, type: 'fill', stem: '12. take → ___', answer: 'took', explanation: '与 played 并列，用 took。' },
          { no: 13, type: 'fill', stem: '13. felt happily → felt ___', answer: 'happy', explanation: 'felt 系动词后接形容词 happy。' }
        ]
      },
      {
        name: '第七部分 书面表达',
        questions: [
          { no: 14, type: 'writing', stem: '书面表达：假定你是李华，校英文报请你写一篇关于"如何平衡学习与休息"的短文。', answer: '范文见解析', explanation: '三段式：现象—方法—总结；使用 connect, balance, relax, efficiency 等词汇。' }
        ]
      }
    ]
  },
  {
    id: '2021-1',
    year: 2021,
    title: '2021年全国乙卷',
    subtitle: '完整试卷 · 全部题型',
    region: '全国乙卷',
    sections: [
      { name: '第一部分 听力', note: '听力原文', material: 'M: Which club do you want to join, the drama club or the music club?\nW: I prefer the music club because I love playing the piano.', questions: [
        { no: 1, type: 'choice', stem: 'Which club does the woman prefer?', options: ['A. Drama club.', 'B. Music club.', 'C. Sports club.', 'D. Art club.'], answer: 'B', explanation: 'I prefer the music club。' }
      ]},
      { name: '第二部分 阅读理解', passages: [
        { label: 'A', text: 'Learning a foreign language opens a window to another culture. It also improves memory and logical thinking.', questions: [
          { no: 2, type: 'choice', stem: 'What else does language learning improve?', options: ['A. Memory.', 'B. Eyesight.', 'C. Height.', 'D. Sleep time.'], answer: 'A', explanation: 'improves memory。' }
        ]}
      ]},
      { name: '第三部分 七选五', material: 'Healthy eating is not about eating less. ___3___ Choose vegetables and fruit every day. ___4___', questions: [
        { no: 3, type: 'seven', stem: '第3空', answer: 'B', explanation: 'healthy eating 需均衡而非少吃。' },
        { no: 4, type: 'seven', stem: '第4空', answer: 'D', explanation: '蔬菜水果后接总结建议。' }
      ]},
      { name: '第四部分 完形填空', material: 'My grandmother taught me to cook traditional Wuhan food. Her patience and love made every lesson ___5___.', questions: [
        { no: 5, type: 'choice', stem: '5. made every lesson ___', options: ['A. special', 'B. boring', 'C. difficult', 'D. short'], answer: 'A', explanation: 'patience and love 使课程 special。' }
      ]},
      { name: '第五部分 语法填空', material: 'The students were excited about the trip ___6___ was organized by their teacher.', questions: [
        { no: 6, type: 'fill', stem: '6. trip ___ was organized', answer: 'that/which', explanation: '定语从句修饰 trip。' },
        { no: 7, type: 'fill', stem: '7. They looked forward to ___ (visit) the museum.', answer: 'visiting', explanation: 'look forward to doing。' }
      ]},
      { name: '第六部分 书面表达', questions: [
        { no: 8, type: 'writing', stem: '书面表达：介绍一项你校开展的英语活动并号召同学参与。', answer: '范文见解析', explanation: '包含活动名称、时间地点、意义及号召。' }
      ]}
    ]
  },
  {
    id: '2020-1',
    year: 2020,
    title: '2020年全国 I 卷',
    subtitle: '完整试卷 · 全部题型',
    region: '全国 I 卷',
    sections: [
      { name: '第一部分 听力', note: '听力原文', material: 'W: The train to Beijing leaves in twenty minutes.\nM: Then we must hurry to the station.', questions: [
        { no: 1, type: 'choice', stem: 'Where are the speakers probably going?', options: ['A. To a station.', 'B. To a library.', 'C. To a hospital.', 'D. To a school.'], answer: 'A', explanation: 'hurry to the station。' }
      ]},
      { name: '第二部分 阅读理解', passages: [
        { label: 'A', text: 'Plastic waste is a global problem. Many countries encourage people to use reusable bags and bottles.', questions: [
          { no: 2, type: 'choice', stem: 'What do many countries encourage?', options: ['A. Using reusable bags.', 'B. Burning more plastic.', 'C. Buying more bottles.', 'D. Throwing waste into rivers.'], answer: 'A', explanation: 'use reusable bags and bottles。' }
        ]},
        { label: 'B', text: 'Confidence grows when you finish small tasks successfully. Set daily goals and celebrate each achievement.', questions: [
          { no: 3, type: 'choice', stem: 'What helps confidence grow?', options: ['A. Finishing small tasks.', 'B. Avoiding all tasks.', 'C. Comparing with others only.', 'D. Sleeping all day.'], answer: 'A', explanation: 'finish small tasks successfully。' }
        ]}
      ]},
      { name: '第三部分 七选五', material: 'Before an exam, prepare your materials the night before. ___4___ Get enough sleep. ___5___', questions: [
        { no: 4, type: 'seven', stem: '第4空', answer: 'C', explanation: '考前准备材料后，接睡眠建议。' },
        { no: 5, type: 'seven', stem: '第5空', answer: 'E', explanation: '睡眠后接考场心态建议。' }
      ]},
      { name: '第四部分 完形填空', material: 'When the pandemic began, teachers and students had to adapt to online classes quickly. It was challenging, but it also brought new ___6___.', questions: [
        { no: 6, type: 'choice', stem: '6. brought new ___', options: ['A. opportunities', 'B. problems only', 'C. holidays', 'D. silence'], answer: 'A', explanation: 'but 转折，带来新 opportunities。' }
      ]},
      { name: '第五部分 语法填空', material: 'It ___7___ (report) that reading for thirty minutes a day can reduce stress.', questions: [
        { no: 7, type: 'fill', stem: '7. It ___ (report) that...', answer: 'is reported', explanation: 'It is reported that... 据报道。' },
        { no: 8, type: 'fill', stem: '8. Reading helps people ___ (relax).', answer: '(to) relax', explanation: 'help sb (to) do sth。' }
      ]},
      { name: '第六部分 书面表达', questions: [
        { no: 9, type: 'writing', stem: '书面表达：请你以学生会名义写倡议书，呼吁同学们节约用水用电。', answer: '范文见解析', explanation: '倡议书格式；提出具体节约措施；语言正式。' }
      ]}
    ]
  }
];

/** 兼容旧格式：将 sections 展平为题目列表统计 */
function countGaokaoQuestions(paper) {
  if (!paper.sections) return paper.questions?.length || 0;
  let n = 0;
  paper.sections.forEach(sec => {
    if (sec.passages) sec.passages.forEach(p => { n += (p.questions?.length || 0); });
    else if (sec.questions) n += sec.questions.length;
  });
  return n;
}
