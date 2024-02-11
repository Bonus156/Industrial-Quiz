import { useContext, useEffect, useState } from "react";
import { Theme } from "../types/types";
import { QState, QuestionContext } from "../pages/QuizPage";
import { AnswerFormField } from "../types/types";
import { Link, useParams } from "react-router-dom";
import { TheEnd } from "./TheEnd";
import { AnswerForm } from "./AnswerForm";

type QuestionProps = {
  theme: Theme;
  onGiveAnswer: (data: AnswerFormField) => void;
  setQuestionNumber: (num: number) => void;
}

function Question({theme, onGiveAnswer, setQuestionNumber}: QuestionProps) {
  const {activeQuestion} = useParams();
  const qState: QState[] = useContext(QuestionContext);
  const questionNumber = Number(activeQuestion);
  const [isAllQuestionsAnswered, setIsAllQuestionsAnswered] = useState<boolean>(false)

  useEffect(() => {
    setQuestionNumber(questionNumber);
  }, [questionNumber]);

  useEffect(() => {
    setIsAllQuestionsAnswered(!qState.some(question => !question.isAnswered))
  }, [qState]);
  
  
  return (
    <div className="flex flex-wrap p-4 border border-solid border-gray-300">
      <div className="flex gap-5 sm:flex-row flex-col w-full">
        <div className="quest-num sm:w-28 w-full shrink-0">
          <div className="flex flex-col p-2 bg-gray-350 h-16">
            <span className="text-sm">Вопрос <span className="text-base font-bold">{questionNumber + 1}</span></span>
            <span className="text-sm">{qState[questionNumber].isAnswered ? qState[questionNumber].isCorrect ? 'Верно' : 'Неверно' : 'Не завершено'}</span>
          </div>
        </div>
        <div className="question-answer flex flex-col gap-5 flex-grow">
          <div className="flex flex-col bg-welcome text-ask px-4 py-2">
            <div>
              {theme.questions[questionNumber].imageLink && <img src={theme.questions[questionNumber].imageLink} alt="sign" />}
              {theme.questions[questionNumber].question}
            </div>
            <AnswerForm num={questionNumber} question={theme.questions[questionNumber]} onGiveAnswer={onGiveAnswer} />          
          </div>
          {qState[questionNumber].isAnswered && <div className="answer flex flex-col bg-fox text-answer px-4 py-2">
            <Link to={theme.questions[questionNumber].link} className="text-primhover hover:underline" target="_blank">{theme.questions[questionNumber].linkText}</Link>
            <div className="right-answer mt-4">{theme.questions[questionNumber].rightAnswer}</div>
          </div>}
        </div>
      </div>
      <div className={`navigate-buttons flex w-full mt-10 ${!questionNumber ? 'justify-end' : 'justify-between'}`}>
        {!!questionNumber && <Link to={`/quiz/${theme.themeRoute}/${questionNumber - 1}`} className={`bg-secondary p-2 mr-3 hover:bg-sechover text-prev ${questionNumber === 0 ? 'pointer-events-none' : 'pointer-events-auto'}`}>Предыдущий вопрос</Link>}
        {isAllQuestionsAnswered && (questionNumber === theme.questions.length - 1) ?
        <TheEnd theme={theme} qState={qState} className="cursor-pointer bg-primary hover:bg-primhover text-white p-2" />
        : <Link to={`/quiz/${theme.themeRoute}/${questionNumber + 1}`} className={`bg-primary p-2 hover:bg-primhover text-white ${questionNumber === theme.questions.length - 1 ? 'pointer-events-none' : 'pointer-events-auto'}`}>Следующий вопрос</Link>}
      </div>
    </div>
  )
}

export { Question }
