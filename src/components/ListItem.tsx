import { Link } from "react-router-dom";
import { Theme } from "../types/types";
import { useEffect, useState } from "react";
import { QState } from "../pages/QuizPage";

type ListItemProps = {
  theme: Theme;
}

function ListItem({theme}: ListItemProps) {
  const [startQuestionIndex, setStartQuestionIndex] = useState(0)

  useEffect(() => {
    if (localStorage.getItem(`${theme.themeRoute}`)) {
      const savedState: QState[] = JSON.parse(localStorage.getItem(`${theme.themeRoute}`) ?? '{}').qState;
      const unansweredQuestionNumber = savedState.find(state => !state.isAnswered)?.number ?? 0;
      setStartQuestionIndex(unansweredQuestionNumber);
    }
  },[theme])

  return (
    <li className="list-decimal list-inside p-3 even:bg-gray-100">
      <Link to={`/quiz/${theme.themeRoute}/${startQuestionIndex}`} className="text-primhover hover:underline">{theme.theme} | <span className="text-red-550">вопросов: {theme.questions.length}</span></Link>
    </li>
  )
}

export { ListItem }