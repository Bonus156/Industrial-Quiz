export type QuestionType = {
  question: string;
  answers: string[];
  rightAnswer: string;
  link: string;
  textLink: string;
}

export type Theme = {
  theme: string;
  themeRoute: string;
  questions: QuestionType[];
}

export const themes: Theme[] = [
  {
  theme: 'Сосуды, работающие под давлением',
  themeRoute: 'values',
  questions: [
    {
      question: 'Вопрос один темы 1',
      answers: ['Ответ первый', 'Второй ответ', 'Ответ 3'],
      rightAnswer: 'Правильный ответ: Ответ первый',
      link: 'ссылка',
      textLink: 'текст ссылки',
    },
    {
      question: 'Вопрос два темы 1',
      answers: ['Ответ первый второго вопроса', 'Второй второй ответ', 'Ответ третий второго вопроса'],
      rightAnswer: 'Правильный ответ: Второй второй ответ',
      link: 'ссылка',
      textLink: 'текст второй ссылки',
    },
  ]
  },
  {
  theme: 'Трубопроводы технологические',
  themeRoute: 'pipes',
  questions: [
    {
      question: 'Вопрос 1 темы 2',
      answers: ['Ответ первый', 'Второй ответ', 'Ответ третий'],
      rightAnswer: 'Правильный ответ: Второй ответ',
      link: 'ссылка',
      textLink: 'текст новой ссылки',
    },
    {
      question: 'Вопрос второй темы второй',
      answers: ['Ответ второй темы первый', 'Второй ответ второго вопроса второй темы', 'Ответ третий темы 2'],
      rightAnswer: 'Правильный ответ: Ответ третий темы 2',
      link: 'ссылка',
      textLink: 'текст четвертой ссылки',
    },
  ]
  }
]
