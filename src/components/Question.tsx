import { useContext, useEffect, useState } from "react";
import { QuestionType, Theme } from "../types/types";
import { QState, QuestionContext } from "../pages/QuizPage";
import { AnswerFormField } from "../types/types";
import { AnswerMark } from "./QuestionMark";
import { Link, useParams } from "react-router-dom";

type QuestionProps = {
  theme: Theme;
  onGiveAnswer: (data: AnswerFormField) => void;
  setQuestionNumber: (num: number) => void;
}

interface AnswerFormProps {
  question: QuestionType;
  num: number;
  onGiveAnswer: (data: AnswerFormField) => void;
}

type AnsFormFields = {
  answer: RadioNodeList,
}

function AnswerForm(props: AnswerFormProps) {
  const qState: QState[] = useContext(QuestionContext);
  const [isCheckedAnswer, setIsCheckedAnswer] = useState<boolean>(false)
  
  const handleSubmit: React.FormEventHandler<HTMLFormElement & AnsFormFields> = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const { answer } = form;
    console.log('answer.value', answer.value)
    console.log('answer', answer)
    props.onGiveAnswer({
      answer: answer.value,
      num: props.num,
      isCorrect: props.question.rightAnswer.slice(18) === answer.value,
      correctAnswer: props.question.rightAnswer,
      indexAnswer: Array.from(answer).findIndex((input) => (input as HTMLInputElement).checked === true),
    });
    qState[props.num].isAnswered = true;
    setIsCheckedAnswer(false)
  }

  const onCheck = () => {
    setIsCheckedAnswer(true)
  }

  useEffect(() => {
    setIsCheckedAnswer(false)
  }, [props.num])

  return (
    <form onSubmit={handleSubmit} >
      {props.question.answers.map((currAnswer, index) => (
        <div className="answer_variant flex w-full justify-between px-2 my-2" key={currAnswer}>
          <label className="flex items-start" htmlFor={`variant-${props.num}_${index}`} onClick={onCheck}>
            <input 
              type="radio"
              className="variant-radio mr-1.5 mt-1.5"
              name="answer"
              id={`variant-${props.num}_${index}`}
              value={currAnswer}
              disabled={qState[props.num].isAnswered}
              defaultChecked={qState[props.num].index === index}
            />
            <span className="letter mr-1">{String.fromCharCode(97 + index)}. </span>
            <span className="variant-text" id={`variant-answer-${index}`}>{currAnswer}</span>
          </label>
          <div className="mark relative m-1.5"><AnswerMark num={props.num} index={index} /></div>
        </div>
      ))}
      {!qState[props.num].isAnswered && isCheckedAnswer &&
        <input type="submit"
          className="border cursor-pointer bg-secondary p-2 my-2 hover:bg-sechover text-prev"
          value="Ответить"
          disabled={qState[props.num].isAnswered} />}
    </form>
  )
}

export function Question(props: QuestionProps) {
  const {activeQuestion} = useParams();
  const qState: QState[] = useContext(QuestionContext);
  const questionNumber = Number(activeQuestion);
  useEffect(() => {
    props.setQuestionNumber(questionNumber);
  }, [questionNumber]);
  
  
  return (
    <div className="flex flex-wrap p-4 border border-solid border-gray-300">
      <div className="flex gap-5 sm:flex-row flex-col w-full">
        <div className="quest-num sm:w-28 w-full shrink-0">
          <div className="flex flex-col p-2 bg-gray-350 h-16">
            <span className="text-sm">Вопрос <span className="text-base font-bold">{questionNumber + 1}</span></span>
            {qState[questionNumber].isAnswered && <span className="text-sm">{qState[questionNumber].isCorrect ? 'Верно' : 'Неверно'}</span>}
          </div>
        </div>
        <div className="question-answer flex flex-col gap-5 flex-grow">
          <div className="flex flex-col bg-welcome text-ask px-4 py-2">
            <div>
              {props.theme.questions[questionNumber].question}
              {props.theme.questions[questionNumber].imageLink && <img src={props.theme.questions[questionNumber].imageLink} alt="sign" />}
            </div>
            <AnswerForm num={questionNumber} question={props.theme.questions[questionNumber]} onGiveAnswer={props.onGiveAnswer} />          
          </div>
          {qState[questionNumber].isAnswered && <div className="answer flex flex-col bg-fox text-answer px-4 py-2">
            <Link to={props.theme.questions[questionNumber].link} className="text-primhover hover:underline" target="_blank">{props.theme.questions[questionNumber].linkText}</Link>
            <div className="right-answer mt-4">{props.theme.questions[questionNumber].rightAnswer}</div>
          </div>}
        </div>
      </div>
      <div className="navigate-buttons flex w-full justify-between mt-10">
        <Link to={`/quiz/${props.theme.themeRoute}/${questionNumber - 1}`} className={`bg-secondary p-2 mr-3 hover:bg-sechover text-prev ${questionNumber === 0 ? 'pointer-events-none' : 'pointer-events-auto'}`}>Предыдущий вопрос</Link>
        <Link to={`/quiz/${props.theme.themeRoute}/${questionNumber + 1}`} className={`bg-primary p-2 hover:bg-primhover text-white ${questionNumber === props.theme.questions.length - 1 ? 'pointer-events-none' : 'pointer-events-auto'}`}>Следующий вопрос</Link>
      </div>
    </div>
  )
}
