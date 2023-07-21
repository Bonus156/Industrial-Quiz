import { createContext, useState } from 'react';
import { useParams } from "react-router-dom";
import { Route, Routes, Link } from "react-router-dom";
import { QuestionMark } from "../components/QuestionMark";
import { Question } from "../components/Question";
import { AnswerFormField, Theme } from '../types/types';
import * as json from "../json/questions.json";

export type QState = {
  isAnswered: boolean;
  isCorrect: boolean;
  number: number;
  index: number;
}

const themes: Theme[] = json.default;

// async function getThemes() {  
//   const themes = '../json/questions.json';
//   const response = await fetch(themes);
//   const data = await response.json();
//   return data;
// }

// const themes: Theme[] = getThemes();

// let themes = require('../json/questions.json');

export const QuestionContext = createContext<QState[]>([]);

function QuizPage() {
  const {themeRoute} = useParams();
  const theme = themes.find((currentTheme) => currentTheme.themeRoute === themeRoute);
  const questions = theme?.questions || [];
  
  const initialQState = new Array(questions.length).fill('').map((_, i) => ({isAnswered: false, isCorrect: false, number: i, index: -1}))
  
  const [qState, setQState] = useState<QState[]>(initialQState);
  const onGiveAnswer = (formField: AnswerFormField) => {
    console.log(formField);
    qState[formField.num].isAnswered = true;
    qState[formField.num].isCorrect = formField.isCorrect;
    qState[formField.num].index = formField.indexAnswer;
    setQState([...qState]);
  }

  // const hideButton = (event: PointerEvent) => {
  //   event.currentTarget.classList.add('invisible');
  // }

  return (
    <QuestionContext.Provider value={qState}>
      <div className="container mx-auto flex-grow">
        <h1>Quiz</h1>
        <p>Industrial quiz</p>
        <h2>Темa: {theme?.theme}</h2>
        <Link className="block cursor-pointer border font-semibold rounded px-4 py-2 w-fit bg-green-400 hover:bg-green-500" to='0'>Начать экзамен</Link>
        <ol className="flex flex-wrap list-inside gap-1.5">{questions.map((_, number) => (
          <Link to={number.toString()} key={number}><QuestionMark num={number} /></Link>
        ))}
        </ol>
        <Routes>{questions.map((question, number) => (
          <Route path={number.toString()} key={question.question} element={<Question question={question} num={number} onGiveAnswer={onGiveAnswer} />} />
        ))}
        </Routes>
      </div>
    </QuestionContext.Provider>
  )
}

export {QuizPage}