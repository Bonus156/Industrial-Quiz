import { useContext, useEffect, useState } from "react";
import { QuestionType, Theme } from "../types/types";
import { QState, QuestionContext } from "../pages/QuizPage";
import { AnswerFormField } from "../types/types";
import { AnswerMark } from "./QuestionMark";
import { Link, useParams } from "react-router-dom";
import { TheEnd } from "./TheEnd";

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
  const [isSubmitWithoutCheckedAnswer, setIsSubmitWithoutCheckedAnswer] = useState<boolean>(false)
  
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
    if (qState[props.num].index !== -1) {
      qState[props.num].isAnswered = true;
    } else {
      setIsSubmitWithoutCheckedAnswer(true);
    }
    setIsCheckedAnswer(false)
  }

  const onCheck = () => {
    setIsCheckedAnswer(true);
    setIsSubmitWithoutCheckedAnswer(false);
  }

  const cancelChoice = () => {
    setIsCheckedAnswer(false);
    if (document.querySelector('input[type="radio"]:checked') && !qState[props.num].isAnswered) {
      (document.querySelector('input[type="radio"]:checked') as HTMLInputElement).checked = false;
    } else return
  }

  useEffect(() => {
    // setIsCheckedAnswer(false)
    cancelChoice();
    setIsSubmitWithoutCheckedAnswer(false);
  }, [props.num])

  return (
    <form onSubmit={handleSubmit} >
      {props.question.answers.map((currAnswer, index) => (
        <div className="answer_variant flex w-full justify-between px-2 my-2" key={currAnswer}>
          <label className="flex items-start cursor-pointer" htmlFor={`variant-${props.num}_${index}`} onClick={onCheck}>
            <input 
              type="radio"
              className="variant-radio mr-1.5 mt-1.5 cursor-pointer"
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
      {!qState[props.num].isAnswered && 
        <div className="cursor-pointer text-blue hover:text-linkhover hover:underline" onClick={cancelChoice}>Очистить мой выбор</div>
        }
      {isSubmitWithoutCheckedAnswer && 
        <div className="text-red-550" >Пожалуйста, выберите ответ</div>
        }
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
  const [isAllQuestionsAnswered, setIsAllQuestionsAnswered] = useState<boolean>(false)

  useEffect(() => {
    props.setQuestionNumber(questionNumber);
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
              {props.theme.questions[questionNumber].imageLink && <img src={props.theme.questions[questionNumber].imageLink} alt="sign" />}
              {props.theme.questions[questionNumber].question}
            </div>
            <AnswerForm num={questionNumber} question={props.theme.questions[questionNumber]} onGiveAnswer={props.onGiveAnswer} />          
          </div>
          {qState[questionNumber].isAnswered && <div className="answer flex flex-col bg-fox text-answer px-4 py-2">
            <Link to={props.theme.questions[questionNumber].link} className="text-primhover hover:underline" target="_blank">{props.theme.questions[questionNumber].linkText}</Link>
            <div className="right-answer mt-4">{props.theme.questions[questionNumber].rightAnswer}</div>
          </div>}
        </div>
      </div>
      <div className={`navigate-buttons flex w-full mt-10 ${!questionNumber ? 'justify-end' : 'justify-between'}`}>
        {!!questionNumber && <Link to={`/quiz/${props.theme.themeRoute}/${questionNumber - 1}`} className={`bg-secondary p-2 mr-3 hover:bg-sechover text-prev ${questionNumber === 0 ? 'pointer-events-none' : 'pointer-events-auto'}`}>Предыдущий вопрос</Link>}
        {isAllQuestionsAnswered && (questionNumber === props.theme.questions.length - 1) ?
        <TheEnd theme={props.theme} qState={qState} className="cursor-pointer bg-primary hover:bg-primhover text-white p-2" />
        : <Link to={`/quiz/${props.theme.themeRoute}/${questionNumber + 1}`} className={`bg-primary p-2 hover:bg-primhover text-white ${questionNumber === props.theme.questions.length - 1 ? 'pointer-events-none' : 'pointer-events-auto'}`}>Следующий вопрос</Link>}
      </div>
    </div>
  )
}
