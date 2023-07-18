import { useContext } from "react";
import { QuestionType } from "../json/questions";
import { QState, QuestionContext } from "../pages/QuizPage";
import { AnswerFormField } from "../types/types";

type QuestionProps = {
  question: QuestionType;
  num: number;
  onGiveAnswer: (data: AnswerFormField) => void;
}

interface AnswerFormProps {
  question: QuestionType;
  num: number;
  onGiveAnswer: (data: AnswerFormField) => void;
}

type AnsFormFields = {
  answer: HTMLInputElement,
}

function AnswerForm(props: AnswerFormProps) {
  const qState: QState[] = useContext(QuestionContext);
  const handleSubmit: React.FormEventHandler<HTMLFormElement & AnsFormFields> = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const { answer } = form;
    props.onGiveAnswer({
      answer: answer.value,
      num: props.num,
      isCorrect: props.question.rightAnswer.slice(18) === answer.value,
      correctAnswer: props.question.rightAnswer,
    });
    qState[props.num].isAnswered = true;
  }

  return (
    <form onSubmit={handleSubmit}>
      {props.question.answers.map((currAnswer, index) => (
        <div className="answer_variant" key={currAnswer}>
          <label htmlFor={`variant-${index}`}>
            <input type="radio" className="variant-radio" name="answer" id={`variant-${index}`} value={currAnswer} disabled={qState[props.num].isAnswered} />
            <span className="letter">{String.fromCharCode(97 + index)}. </span>
            <span className="variant-text" id={`variant-answer-${index}`}>{currAnswer}</span>
          </label>
          <div className="mark"></div>
        </div>
      ))}
      <input type="submit" className="border cursor-pointer bg-gray-100 hover:bg-gray-200" value="Ответить" disabled={qState[props.num].isAnswered} />
    </form>
  )
}

export function Question(props: QuestionProps) {
  
  return (
    <div className="flex flex-wrap">
      <div className="flex">
        <div className="flex flex-col">
          <span>Вопрос {props.num}</span>
        </div>
        <div className="flex flex-col">
          <div>{props.question.question}</div>
          <AnswerForm num={props.num} question={props.question} onGiveAnswer={props.onGiveAnswer} />          
        </div>
      </div>
    </div>
  )
}
