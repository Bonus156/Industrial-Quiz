import { createContext, useState } from 'react';
import { useParams } from "react-router-dom";
import { Route, Routes, Link } from "react-router-dom";
import { themes } from "../json/questions";
import { QuestionMark } from "../components/QuestionMark";
import { Question } from "../components/Question";
import { AnswerFormField } from '../types/types';

export type QState = {
  isAnswered: boolean;
  isCorrect: boolean;
  number: number;
}

export const QuestionContext = createContext([]);

function QuizPage() {
  const {themeRoute} = useParams();
  const theme = themes.find((currentTheme) => currentTheme.themeRoute === themeRoute);
  const questions = theme?.questions || [];
  // const generateItemsForQState = () => {
  const initialQState = new Array(questions.length).fill('').map((_, i) => ({isAnswered: false, isCorrect: false, number: i}))
  // };
  // const initialQState = generateItemsForQState();
  const [qState, setQState] = useState<QState[]>(initialQState);
  const onGiveAnswer = (formField: AnswerFormField) => {
    console.log(formField);
    
  }

  return (
    <QuestionContext.Provider value={qState}>
      <div className="container mx-auto flex-grow">
        <h1>Quiz</h1>
        <p>Industrial quiz</p>
        <h2>Темa: {theme?.theme}</h2>
        <ol className="flex flex-wrap list-inside gap-1.5">{questions.map((_, number) => (
          <Link to={number.toString()}><QuestionMark num={number} /></Link>
        ))}
        </ol>
        <Routes>{questions.map((question, number) => (
          <Route path={number.toString()} element={<Question question={question} num={number + 1} onGiveAnswer={onGiveAnswer} />} />
        ))}
        </Routes>
      </div>
    </QuestionContext.Provider>
  )
}

export {QuizPage}