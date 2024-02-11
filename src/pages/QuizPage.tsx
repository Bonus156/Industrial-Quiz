import { createContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { QuestionMark } from "../components/QuestionMark";
import { Question } from "../components/Question";
import { AnswerFormField, Theme } from '../types/types';
import themes from "../json/questions.json";
import { timer } from '../utils/timer';
import { TheEnd } from '../components/TheEnd';

export type QState = {
  isAnswered: boolean;
  isCorrect: boolean;
  number: number;
  index: number;
}

export const QuestionContext = createContext<QState[]>([]);

function QuizPage() {
  const [questNum, setQuestNum] = useState(0);
  const {themeRoute} = useParams();
  const [timeLeft, setTimeLeft] = useState(timer());
  const [disactive, setDisactive] = useState(false);

  const DEFAULT_THEME: Theme = {
    theme: 'Неверный путь к странице с тестом. Такой темы нет.',
    themeRoute: '',
    questions: []
  }

  const theme: Theme = themes.find((currentTheme) => currentTheme.themeRoute === themeRoute) ?? DEFAULT_THEME;
  const questions = theme.questions;
  const initialQState = new Array(questions.length).fill('').map((_, i) => ({isAnswered: false, isCorrect: false, number: i, index: -1}))
  const [qState, setQState] = useState<QState[]>(initialQState);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(() => timer());
      setDisactive(timeLeft === '0');
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const saveToLS = () => {
    localStorage.setItem(`${theme.themeRoute}`, JSON.stringify({theme: theme.themeRoute, qState}))
  }

  useEffect(() => {
    if (localStorage.getItem(`${theme.themeRoute}`)) {
      const savedState: QState[] = JSON.parse(localStorage.getItem(`${theme.themeRoute}`) ?? '{}').qState;
      setQState(savedState);
    }
  },[])
  
  const onGiveAnswer = (formField: AnswerFormField) => {
    const currentQuestionState = qState.find((question) => question.number === formField.num);
    if (currentQuestionState && formField.indexAnswer !== -1) {
      currentQuestionState.isAnswered = true;
      currentQuestionState.isCorrect = formField.isCorrect;
      currentQuestionState.index = formField.indexAnswer;
    }
    setQState([...qState]);
    saveToLS();
  }
  
  return (
    <QuestionContext.Provider value={qState}>
      <div className='container mx-auto flex-grow'>
        <h2 className='lg:text-3xl md:text-2xl sm:text-xl my-3 px-2 text-base'>{theme?.theme}</h2>
        {!disactive && <section className="quiz flex gap-3 flex-col xl:flex-row">
          <div className="test-main flex-grow">
            <Routes>{questions.map((question) => (
              <Route path=':activeQuestion' key={question.question} element={<Question theme={theme} onGiveAnswer={onGiveAnswer} setQuestionNumber={setQuestNum} />} />
              ))}
            </Routes>
          </div>
          <aside className="test-navigation border p-2 xl:w-96 shrink-0 border-gray-300">
            <TheEnd theme={theme} qState={qState} className="cursor-pointer text-blue hover:text-linkhover hover:underline" />
            <div className='mt-3'>Оставшееся время: <span className='font-bold'>{timeLeft}</span></div>
            <div className='md:mt-5 mb-2 font-thin text-lg'>Навигация по тесту</div>
            <ol className="flex flex-wrap list-inside gap-1.5">{questions.map((_, number) => (
              <QuestionMark number={number} questNum={questNum} />
            ))}
            </ol>
          </aside>
        </section>}
        {disactive && <div className='bg-red-600 text-indigo-200 border-3 border-solid border-red-900'>
          <h2 className='text-4xl my-3 p-4'>Время вышло. Приложение деактивировано.</h2>
        </div>}
      </div>
    </QuestionContext.Provider>
  )
}

export { QuizPage }