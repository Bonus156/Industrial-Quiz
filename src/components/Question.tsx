import { useContext } from "react";
import { QuestionType } from "../types/types";
import { QState, QuestionContext } from "../pages/QuizPage";
import { AnswerFormField } from "../types/types";
import { AnswerMark } from "./QuestionMark";
import { useParams } from "react-router-dom";

type QuestionProps = {
  questions: QuestionType[];
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
  
  const handleSubmit: React.FormEventHandler<HTMLFormElement & AnsFormFields> = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const { answer } = form;
    props.onGiveAnswer({
      answer: answer.value,
      num: props.num,
      isCorrect: props.question.rightAnswer.slice(18) === answer.value,
      correctAnswer: props.question.rightAnswer,
      indexAnswer: Array.from(answer).findIndex((input) => (input as HTMLInputElement).checked === true),
    });
    console.log(answer);
    qState[props.num].isAnswered = true;
  }

  return (
    <form onSubmit={handleSubmit}>
      {props.question.answers.map((currAnswer, index) => (
        <div className="answer_variant flex w-full justify-between" key={currAnswer}>
          <label htmlFor={`variant-${props.num}_${index}`}>
            <input type="radio" className="variant-radio" name="answer" id={`variant-${props.num}_${index}`} value={currAnswer} disabled={qState[props.num].isAnswered} defaultChecked={qState[props.num].index === index} />
            <span className="letter">{String.fromCharCode(97 + index)}. </span>
            <span className="variant-text" id={`variant-answer-${index}`}>{currAnswer}</span>
          </label>
          <div className="mark relative"><AnswerMark num={props.num} index={index} /></div>
        </div>
      ))}
      <input type="submit" className="border cursor-pointer bg-gray-100 hover:bg-gray-200" value="Ответить" disabled={qState[props.num].isAnswered} />
    </form>
  )
}

export function Question(props: QuestionProps) {
  const {activeQuestion} = useParams();
  const questionNumber = Number(activeQuestion);
  props.setQuestionNumber(questionNumber);
  
  return (
    <div className="flex flex-wrap peer">
      <div className="flex">
        <div className="flex flex-col">
          <span>Вопрос {questionNumber + 1}</span>
        </div>
        <div className="flex flex-col">
          <div>{props.questions[questionNumber].question}</div>
          <AnswerForm num={questionNumber} question={props.questions[questionNumber]} onGiveAnswer={props.onGiveAnswer} />          
        </div>
      </div>
    </div>
  )
}
