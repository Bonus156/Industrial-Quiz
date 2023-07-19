import { useContext } from 'react';
import { QState, QuestionContext } from '../pages/QuizPage';

type QMProps = {
  num: number;
}

type AMProps = {
  num: number;
  index: number;
}

export function QuestionMark(props: QMProps) {
  const qState: QState[] = useContext(QuestionContext);
  return (
    <li className="nav-item relative cursor-pointer shrink-0 list-decimal list-inside w-[var(--nav-element-w)] h-[var(--nav-element-h)] text-center border border-solid rounded border-black">
      <div className={`${qState[props.num].isAnswered ? qState[props.num].isCorrect ? 'correct' : 'incorrect' : ''} correct-mark w-[calc(var(--nav-element-w)-2*var(--border-v))] h-[calc(var(--nav-element-h)/2-2*var(--border-v))] rounded-b-sm absolute bottom-0 after:absolute after:bottom-1 after:left-2.5 after:border-solid after:border-white after:border-r-3 after:border-b-3 after:rotate-45 after:w-2 after:h-3`}></div>
    </li>
  )
}

export function AnswerMark(props: AMProps) {
  const qState: QState[] = useContext(QuestionContext);
  return (
    <>
      <div className={`${(qState[props.num].isAnswered && qState[props.num].isCorrect && qState[props.num].index === props.index) ? 'visible' : 'invisible'} absolute border-solid border-green-700 border-r-3 border-b-3 rotate-45 w-2 h-3`}></div>
      <div className={`${(qState[props.num].isAnswered && !qState[props.num].isCorrect && qState[props.num].index === props.index) ? 'visible' : 'invisible'} absolute bg-red-700 rotate-45 w-1 h-4 after:absolute after:bg-red-700 after:rotate-90 after:h-4 after:w-1`}></div>
    </>
  )
}
