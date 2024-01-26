import { ReactNode } from "react";

type ResultsBoxProps = {
  themeName: string;
  children: ReactNode;
}

function ResultsBox(props: ResultsBoxProps) {
  return (
    <section className="p-4 border border-solid border-gray-300">
        <h3>{props.themeName}</h3>
        <p className='px-2 mb-3'>Результаты ваших предыдущих попыток</p>
        <table className='w-full text-prev mb-4'>
          <thead>
            <tr className='border-b-2 border-t border-gray-350 border-solid'>
              <th className='p-3 align-bottom text-center'>Попытка</th>
              <th className='p-3 align-bottom text-left'>Состояние</th>
              <th className='p-3 align-bottom text-center'>Баллы</th>
              <th className='p-3 align-bottom text-center'>Оценка / 100</th>
              <th className='p-3 align-bottom text-left'>Отзыв</th>
            </tr>
          </thead>
          <tbody className='[&>tr:nth-child(odd)]:bg-black/5 hover:[&>tr]:bg-black/10'>
            {props.children}
          </tbody>
        </table>
      </section>
  )
}

export { ResultsBox }
