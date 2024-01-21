import { Link } from "react-router-dom";
import { Theme } from "../types/types";
import { useEffect, useState } from "react";
import { QState } from "../pages/QuizPage";

type ListItemProps = {
  theme: Theme;
}

function ListItem(props: ListItemProps) {
  const [startQuestionIndex, setStartQuestionIndex] = useState(0)

  useEffect(() => {
    if (localStorage.getItem(`${props.theme.themeRoute}`)) {
      const savedState: QState[] = JSON.parse(localStorage.getItem(`${props.theme.themeRoute}`) ?? '{}').qState;
      const unansweredQuestionNumber = savedState.find(state => !state.isAnswered)?.number ?? 0;
      setStartQuestionIndex(unansweredQuestionNumber);
    }
  },[])

  return (
    <li className="list-decimal list-inside p-3 even:bg-gray-100">
      <Link to={`/quiz/${props.theme.themeRoute}/${startQuestionIndex}`} className="text-primhover hover:underline">{props.theme.theme} | <span className="text-red-550">вопросов: {props.theme.questions.length}</span></Link>
    </li>
  )
}

export { ListItem }