import { Dispatch, SetStateAction, useContext } from "react";
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
  const handleSubmit: React.FormEventHandler<HTMLFormElement & AnsFormFields> = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const { answer } = form;
    props.onGiveAnswer({
      answer: answer.value,
      // answer: answer,
      num: props.num,
      isCorrect: props.question.rightAnswer.slice(18) === answer.value,
      correctAnswer: props.question.rightAnswer,
    })

  }
  return (
    <form onSubmit={handleSubmit}>
      {props.question.answers.map((answer, index) => (
        <div className="answer_variant">
          <label htmlFor={`variant-${index}`}>
            {/* <input type="radio" className="variant-radio" name="answer" id={`variant-${index}`} value={String.fromCharCode(97 + index)} /> */}
            <input type="radio" className="variant-radio" name="answer" id={`variant-${index}`} value={answer} />
            <span className="letter">{String.fromCharCode(97 + index)}. </span>
            <span className="variant-text" id={`variant-answer-${index}`}>{answer}</span>
          </label>
          <div className="mark"></div>
        </div>
      ))}
      <input type="submit" className="border cursor-pointer bg-gray-100 hover:bg-gray-200" value="Ответить" />
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
          {/* <form onSubmit={submitAnswer}>
            {props.question.answers.map((answer, index) => (
              <div className="answer_variant">
                <input type="radio" className="variant-radio" name="answer" id={`variant-${index}`} value={String.fromCharCode(97 + index)} />
                <label htmlFor={`variant-${index}`}>
                  <span className="letter">{String.fromCharCode(97 + index)}. </span>
                  <span className="variant-text" id={`variant-answer-${index}`}>{answer}</span>
                </label>
                <div className="mark"></div>
              </div>
            ))}
            <input type="submit" className="border cursor-pointer bg-gray-100 hover:bg-gray-200" value="Ответить" />
          </form> */}
        </div>
      </div>
    </div>
  )
}
