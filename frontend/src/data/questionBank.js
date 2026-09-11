export const categoryOrder = ['mood', 'sleep', 'stress'];

export const categoryLabels = {
  mood: 'Mood',
  sleep: 'Neend',
  stress: 'Stress',
};

export const questionBank = [
  {
    id: 'q1',
    category: 'mood',
    text: 'Aaj aap kaisa mehsoos kar rahe hain?',
    options: [
      { value: 'calm', label: 'Shaant / Calm' },
      { value: 'okay', label: 'Theek-thaak' },
      { value: 'tired', label: 'Thaka hua / Exhausted' },
      { value: 'anxious', label: 'Bechain / Anxious' },
      { value: 'low', label: 'Udaas / Low' },
    ],
  },
  {
    id: 'q2',
    category: 'sleep',
    text: 'Kal raat neend kaisi thi?',
    options: [
      { value: 'good', label: 'Achi neend aayi' },
      { value: 'disturbed', label: 'Beech beech mein toot gayi' },
      { value: 'bad', label: 'Bilkul neend nahi aayi' },
    ],
  },
  {
    id: 'q3',
    category: 'stress',
    text: 'Aapka stress level kaisa hai?',
    options: [
      { value: '1', label: '1 - Bilkul Shaant' },
      { value: '2', label: '2' },
      { value: '3', label: '3 - Madhyam' },
      { value: '4', label: '4' },
      { value: '5', label: '5 - Bahut Jyada' },
    ],
  },
];