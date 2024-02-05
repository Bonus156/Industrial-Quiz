import { ReactNode, useEffect, useState } from "react";
import { Theme } from "../types/types";
import { Link } from "react-router-dom";
import { QState } from "../pages/QuizPage";

type ResultsBoxProps = {
  theme: Theme | undefined;
  children: ReactNode;
}

function ResultsBox({theme, children}: ResultsBoxProps) {
  const [startQuestionIndex, setStartQuestionIndex] = useState(0)
  const isTestStarted: boolean = Boolean(localStorage.getItem(`${theme?.themeRoute}`));

  useEffect(() => {
    if (isTestStarted) {
      const savedState: QState[] = JSON.parse(localStorage.getItem(`${theme?.themeRoute}`) ?? '{}').qState;
      const unansweredQuestionNumber = savedState.find(state => !state.isAnswered)?.number ?? 0;
      setStartQuestionIndex(unansweredQuestionNumber);
    }
  },[theme])
  
  return (
    <section className="p-4 my-3 border border-solid border-gray-300">
        <h3 className='px-2 lg:text-2xl md:text-xl sm:text-lg text-base'>{theme?.theme}</h3>
        <Link to={`/quiz/${theme?.themeRoute}/${startQuestionIndex}`} className="block w-fit mx-auto cursor-pointer bg-secondary p-2 hover:bg-sechover text-prev">
          {isTestStarted ? 'Продолжить последнюю попытку' : 'Пройти тест заново'}
        </Link>
        <p className='px-2 my-3'>Результаты ваших предыдущих попыток:</p>
        <table className='w-full text-prev mb-4  text-sm sm:text-base'>
          <thead>
            <tr className='border-b-2 border-t border-gray-350 border-solid'>
              <th className='p-3 align-bottom text-center'><span className='hidden sm:inline'>Попытка</span><span className='sm:hidden inline'>№</span></th>
              <th className='p-3 align-bottom text-left'>Состояние</th>
              <th className='p-3 align-bottom text-center'>Баллы</th>
              <th className='p-3 align-bottom text-center'>Оценка<span className='hidden sm:inline'>/100</span></th>
              <th className='p-3 align-bottom text-left sm:table-cell hidden'>Отзыв</th>
            </tr>
          </thead>
          <tbody className='[&>tr:nth-child(odd)]:bg-black/5 hover:[&>tr]:bg-black/10'>
            {children}
          </tbody>
        </table>
      </section>
  )
}

export { ResultsBox }
