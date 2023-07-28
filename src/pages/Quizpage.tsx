import { createContext, useState } from 'react';
import { useParams } from "react-router-dom";
import { Route, Routes, Link } from "react-router-dom";
import { QuestionMark } from "../components/QuestionMark";
import { Question } from "../components/Question";
import { AnswerFormField, Theme } from '../types/types';
import themes from "../json/questions.json";
import { endDate, timer } from '../utils/timer';

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
  
  const theme = themes.find((currentTheme) => currentTheme.themeRoute === themeRoute) as Theme;
  const questions = theme.questions;
  const initialQState = new Array(questions.length).fill('').map((_, i) => ({isAnswered: false, isCorrect: false, number: i, index: -1}))
  const [qState, setQState] = useState<QState[]>(initialQState);
  
  const onGiveAnswer = (formField: AnswerFormField) => {
    const currentQuestionState = qState.find((question) => question.number === formField.num);
    if (currentQuestionState) {
      currentQuestionState.isAnswered = true;
      currentQuestionState.isCorrect = formField.isCorrect;
      currentQuestionState.index = formField.indexAnswer;
    }
    setQState([...qState]);
  }
  
  return (
    <QuestionContext.Provider value={qState}>
      <div className="container mx-auto flex-grow">
        <h1>Industrial quiz</h1>
        <p>Подготовка к проверке знаний</p>
        <h2 className='text-4xl my-3'>{theme?.theme}</h2>
        <section className="quiz flex gap-3 flex-col xl:flex-row">
          <div className="test-main  flex-grow">
            <Routes>{questions.map((question, _) => (
              <Route path=':activeQuestion' key={question.question} element={<Question theme={theme} onGiveAnswer={onGiveAnswer} setQuestionNumber={setQuestNum} />} />
              ))}
            </Routes>
          </div>
          <aside className="test-navigation border p-2 xl:w-96 shrink-0 border-gray-300">
            <div>Оставшееся время: {timer(endDate)}</div>
            <div>Навигация по тесту</div>
            <ol className="flex flex-wrap list-inside gap-1.5">{questions.map((_, number) => (
              <Link to={number.toString()} key={number}><QuestionMark num={number} questNum={questNum} /></Link>
            ))}
            </ol>
          </aside>
        </section>
      </div>
    </QuestionContext.Provider>
  )
}

export {QuizPage}