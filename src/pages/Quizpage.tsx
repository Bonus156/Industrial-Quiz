import { createContext, useState } from 'react';
import { useParams } from "react-router-dom";
import { Route, Routes, Link } from "react-router-dom";
import { QuestionMark } from "../components/QuestionMark";
import { Question } from "../components/Question";
import { AnswerFormField } from '../types/types';
import themes from "../json/questions.json";

export type QState = {
  isAnswered: boolean;
  isCorrect: boolean;
  number: number;
  index: number;
}

export const QuestionContext = createContext<QState[]>([]);

function QuizPage() {
  const [questNum, setQuestNum] = useState(1);
  const {themeRoute} = useParams();
  
  const theme = themes.find((currentTheme) => currentTheme.themeRoute === themeRoute);
  const questions = theme?.questions || [];
  const initialQState = new Array(questions.length).fill('').map((_, i) => ({isAnswered: false, isCorrect: false, number: i, index: -1}))
  const [qState, setQState] = useState<QState[]>(initialQState);
  
  const onGiveAnswer = (formField: AnswerFormField) => {
    console.log(formField);
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
        <h1>Quiz</h1>
        <p>Industrial quiz</p>
        <h2>Темa: {theme?.theme}</h2>
        <section className="quiz flex">
          <Routes>{questions.map((question, _, questions) => (
            <Route path=':activeQuestion' key={question.question} element={<Question questions={questions} onGiveAnswer={onGiveAnswer} setQuestionNumber={setQuestNum} />} />
            ))}
          </Routes>
          <ol className="flex flex-wrap list-inside gap-1.5 max-w-sm">{questions.map((_, number) => (
            <Link to={number.toString()} key={number}><QuestionMark num={number} questNum={questNum} /></Link>
          ))}
          </ol>          
        </section>
      </div>
    </QuestionContext.Provider>
  )
}

export {QuizPage}