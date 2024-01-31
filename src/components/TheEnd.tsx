import { CurrentResult, ResultType, Theme } from "../types/types";
import { MouseEvent, useEffect, useState } from "react";
import { Modal } from "./Modal";
import { QState } from "../pages/QuizPage";
import { Link } from "react-router-dom";

type TheEndProps = {
  className: string;
  theme: Theme;
  qState: QState[];
}

function TheEnd({className, theme, qState}: TheEndProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnsweredAnyQuestion, setIsAnsweredAnyQuestion] = useState<boolean>(qState.some(q => q.isAnswered));

  useEffect(() => {
    setIsAnsweredAnyQuestion(qState.some(q => q.isAnswered));
  }, [qState])

  const onCloseModal = () => {
    setIsModalOpen(false);
  }

  const handleClick = (e: MouseEvent) => {
    setIsModalOpen(true);
    e.preventDefault();
  }

  const onConfirm = () => {
    if (!isAnsweredAnyQuestion) return;
    const thisMoment = new Date();
    const results: ResultType[] = JSON.parse(localStorage.getItem('results') ?? "[]");
    const themeResults: ResultType | undefined = results.find(result => result.theme === theme.themeRoute);
    const score = qState.reduce((acc, question) => acc + (question.isCorrect ? 1 : 0), 0);
    const currentResult: CurrentResult = {
      date: thisMoment.toLocaleString('ru-RU', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute:'numeric',
        hour12: false,
      }),
      score: score + ' / ' + qState.length,
      mark: Math.round(score / qState.length * 10000) / 100,
    }
    if (themeResults) {
      themeResults.results.push(currentResult);
    } else {
      results.push({
        theme: theme.themeRoute,
        results: [currentResult]
      })
    }
    localStorage.setItem('results', JSON.stringify(results));
    localStorage.removeItem(theme.themeRoute);
  }

  const onCancel = () => {
    setIsModalOpen(false);
  }

  return (
    <>
      <span className={className} onClick={handleClick}>Закончить попытку...</span>
      {isModalOpen && <Modal onClose={onCloseModal}>
        <>
          
          <div className='p-4 font-medium'>{!isAnsweredAnyQuestion && <span className='font-medium'>Вы не дали ответ ни на один вопрос.<br/></span>}Вы уверены, что хотите закончить попытку?</div>
          <div className='flex justify-around p-4'>
            <Link to={isAnsweredAnyQuestion ? `/results/${theme.themeRoute}` : '/themes'}>
              <button className="cursor-pointer bg-primary p-2 hover:bg-primhover text-white w-28" onClick={onConfirm}>Закончить</button>
            </Link>
            <button className="cursor-pointer bg-secondary p-2 hover:bg-sechover text-prev w-28" onClick={onCancel}>Отмена</button>
          </div>
        </>
      </ Modal>}
    </>
  )
}

export { TheEnd }