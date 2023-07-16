import { useState } from "react";
import { QuestionType } from "../json/questions";

type QuestionProps = {
  question: QuestionType;
  num: number;
}

function Question(props: QuestionProps) {
  const [hasAnswer, setHasAnswer] = useState(false);
  return (
    <div className="flex flex-wrap">
      <div className="flex">
        <div className="flex flex-col">
          <span>Вопрос {props.num}</span>
          {/* {isAnswered && isRight} */}
        </div>
        <div className="flex flex-col">
          <div>{props.question.question}</div>
          {props.question.answers.map((answer, index) => (
            <div className="answer_variant">
              <input type="radio" className="variant-radio" name="answer" id={`variant-${index}`} />
              <label htmlFor={`variant-${index}`}>
                <span className="letter">{String.fromCharCode(97 + index)}.</span>
                <span className="variant-text" id={`variant-answer-${index}`}>{answer}</span>
              </label>
              <div className="mark"></div>
            </div>
          ))}

        </div>
      </div>
    </div>
  )
}

export {Question}