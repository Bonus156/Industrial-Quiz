import { useContext } from 'react';
import { QState, QuestionContext } from '../pages/QuizPage';

type QMProps = {
  num: number;
  questNum: number;
}

type AMProps = {
  num: number;
  index: number;
}

export function QuestionMark(props: QMProps) {
  const qState: QState[] = useContext(QuestionContext);

  return (
    <li className={`nav-item relative cursor-pointer shrink-0 list-decimal list-inside w-[var(--nav-element-w)] h-[var(--nav-element-h)] text-center ${props.num === props.questNum ? 'border-2' : 'border'} border-solid rounded border-black hover:underline`}>
      <div className={`${qState[props.num].isAnswered ? qState[props.num].isCorrect ? 'correct' : 'incorrect' : ''} correct-mark w-full h-1/2 rounded-b-sm absolute bottom-0 after:absolute after:border-solid after:border-white after:border-r-3 after:border-b-3 after:rotate-45 after:w-2 after:h-3 after:inset-x-1/3 after:bottom-1.5`}></div>
    </li>
  )
}

// w-[calc(var(--nav-element-w)-2*var(--border-v))] h-[calc(var(--nav-element-h)/2-2*var(--border-v))]

export function AnswerMark(props: AMProps) {
  const qState: QState[] = useContext(QuestionContext);
  
  return (
    <>
      {qState[props.num].isAnswered && qState[props.num].isCorrect && qState[props.num].index === props.index && <div className="absolute border-solid border-green-700 border-r-3 border-b-3 rotate-45 w-2 h-3"></div>}
      {qState[props.num].isAnswered && !qState[props.num].isCorrect && qState[props.num].index === props.index && <div className="absolute bg-red-700 rotate-45 w-1 h-4 after:absolute after:bg-red-700 after:rotate-90 after:h-4 after:w-1"></div>}
    </>
  )
}
