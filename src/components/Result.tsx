import { CurrentResult } from "../types/types";
import { MINIMAL_SCORE } from "../utils/constants";

type ResultProps = {
  attempt: number
  result: CurrentResult;
}

function Result({attempt, result}: ResultProps) {

  return (
    <tr className='border-t border-gray-350 border-solid'>
      <td className='p-3 align-top text-center'>{attempt}</td>
      <td className='p-3 align-top text-left'>Завершён<br/><span>{result.date}</span></td>
      <td className='p-3 align-top text-center whitespace-nowrap'>{result.score}</td>
      <td className={`p-3 align-top text-center sm:text-prev ${result.mark >= MINIMAL_SCORE ? 'text-green-450' : 'text-red-650'}`}>{result.mark}</td>
      <td className='p-3 align-top text-center text-white font-bold text-2xl sm:table-cell hidden'>
        <p className={`p-1 ${result.mark >= MINIMAL_SCORE ? 'bg-green-450' : 'bg-red-650'}`}>ТЕСТ {result.mark >= MINIMAL_SCORE ? '' : 'НЕ'} СДАН</p>
      </td>
    </tr>
  )
}

export { Result }