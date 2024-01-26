import { CurrentResult } from "../types/types";

type ResultProps = {
  attempt: number
  result: CurrentResult;
}

function Result(props: ResultProps) {

  return (
    <tr className='border-t border-gray-350 border-solid'>
      <td className='p-3 align-top text-center'>{props.attempt}</td>
      <td className='p-3 align-top text-left'>Завершён<br/><span>{props.result.date}</span></td>
      <td className='p-3 align-top text-center'>{props.result.score}</td>
      <td className='p-3 align-top text-center'>{props.result.mark}</td>
      <td className='p-3 align-top text-center text-white font-bold text-2xl'>
        <p className={`p-1 ${props.result.mark >= 80 ? 'bg-green-450' : 'bg-red-650'}`}>ТЕСТ {props.result.mark >= 80 ? '' : 'НЕ'} СДАН</p>
      </td>
    </tr>
  )
}

export { Result }