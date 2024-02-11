import { useContext, useEffect, useState } from "react";
import { AnswerFormField, QuestionType } from "../types/types";
import { QState, QuestionContext } from "../pages/QuizPage";
import { AnswerMark } from "./QuestionMark";

interface AnswerFormProps {
  question: QuestionType;
  num: number;
  onGiveAnswer: (data: AnswerFormField) => void;
}

type AnsFormFields = {
  answer: RadioNodeList,
}

function AnswerForm({question, num, onGiveAnswer}: AnswerFormProps) {
  const qState: QState[] = useContext(QuestionContext);
  const [isCheckedAnswer, setIsCheckedAnswer] = useState<boolean>(false)
  const [isSubmitWithoutCheckedAnswer, setIsSubmitWithoutCheckedAnswer] = useState<boolean>(false)
  
  const handleSubmit: React.FormEventHandler<HTMLFormElement & AnsFormFields> = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const { answer } = form;
    const indexAnswer = Array.from(answer).findIndex((input) => (input as HTMLInputElement).checked === true);
    onGiveAnswer({
      answer: answer.value,
      num,
      isCorrect: question.rightAnswer.slice(18) === answer.value,
      correctAnswer: question.rightAnswer,
      indexAnswer: indexAnswer,
    });
    if (indexAnswer !== -1) {
      qState[num].isAnswered = true;
    } else {
      setIsSubmitWithoutCheckedAnswer(true);
    }
    setIsCheckedAnswer(false);
  }

  const onCheck = () => {
    setIsCheckedAnswer(true);
    setIsSubmitWithoutCheckedAnswer(false);
  }

  const cancelChoice = () => {
    setIsCheckedAnswer(false);
    if (document.querySelector('input[type="radio"]:checked') && !qState[num].isAnswered) {
      (document.querySelector('input[type="radio"]:checked') as HTMLInputElement).checked = false;
    } else return
  }

  useEffect(() => {
    cancelChoice();
    setIsSubmitWithoutCheckedAnswer(false);
  }, [num])

  return (
    <form onSubmit={handleSubmit} >
      {question.answers.map((currAnswer, index) => (
        <div className="answer_variant flex w-full justify-between px-2 my-2" key={currAnswer}>
          <label className="flex items-start cursor-pointer" htmlFor={`variant-${num}_${index}`} onClick={onCheck}>
            <input 
              type="radio"
              className="variant-radio mr-1.5 mt-1.5 cursor-pointer focus:shadow-focus focus-visible:shadow-focus"
              name="answer"
              id={`variant-${num}_${index}`}
              value={currAnswer}
              disabled={qState[num].isAnswered}
              defaultChecked={qState[num].index === index}
            />
            <span className="letter mr-1">{String.fromCharCode(97 + index)}. </span>
            <span className="variant-text" id={`variant-answer-${index}`}>{currAnswer}</span>
          </label>
          <div className="mark relative m-1.5"><AnswerMark num={num} index={index} /></div>
        </div>
      ))}
      {!qState[num].isAnswered && isCheckedAnswer &&
        <div className="cursor-pointer text-blue hover:text-linkhover hover:underline" onClick={cancelChoice}>Очистить мой выбор</div>
        }
      {isSubmitWithoutCheckedAnswer && !qState[num].isAnswered &&
        <div className="text-red-550" >Пожалуйста, выберите ответ</div>
        }
      {!qState[num].isAnswered &&
        <input type="submit"
          className="border cursor-pointer bg-secondary p-2 my-2 hover:bg-sechover text-prev"
          value="Ответить"
          disabled={qState[num].isAnswered || isSubmitWithoutCheckedAnswer} />}
    </form>
  )
}

export { AnswerForm }
