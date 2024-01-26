import { useParams } from "react-router-dom";
import { Result } from "../components/Result"
import themes from "../json/questions.json";
import { CurrentResult, ResultType, Theme } from "../types/types";

function ResultsPage() {

  const {themeRoute} = useParams();

  const theme: Theme | undefined = themes.find(theme => theme.themeRoute === themeRoute);
  const results: ResultType[] = JSON.parse(localStorage.getItem('results') ?? '[]');
  const currentThemeResults: CurrentResult[] | undefined = results.find(result => result.theme == themeRoute)?.results;

  return (
    <div className="container mx-auto flex-grow">
      <section className="p-4 border border-solid border-gray-300">
        <h3>{theme?.theme}</h3>
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
            {currentThemeResults &&
              <>
              {currentThemeResults.map((result, index) => {return <Result attempt={index + 1} result={result} key={index} />})}
              </>
            }
          </tbody>
        </table>
      </section>
    </div>
  )
}

export { ResultsPage }
