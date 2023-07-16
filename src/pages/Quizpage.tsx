import { useParams } from "react-router-dom";
import { Route, Routes, Link } from "react-router-dom";
import { themes } from "../json/questions";
import { QuestionMark } from "../components/QuestionMark";

function QuizPage() {
  const {themeRoute} = useParams();
  const theme = themes.find((currentTheme) => currentTheme.themeRoute === themeRoute);
  return (
    <div className="container mx-auto flex-grow">
      <h1>Quiz</h1>
      <p>Industrial quiz</p>
      <h2>Темa: {theme?.theme}</h2>
      <div>Вопрос</div>
      {/* <ul>{themes.map((theme) => (
        <li><Link to={theme.themeRoute}>{theme.theme} | {theme.questions.length} вопросов</Link></li>
      ))}
      </ul>
      <Routes>{themes.map((theme) => (
        <Route path={theme.themeRoute} element={<QuizPage />} />
      ))}
      </Routes> */}
      <ol className="flex flex-wrap list-inside gap-1.5">
        {theme?.questions.map((_) => (
          <QuestionMark />
        ))}
      </ol>
    </div>
  )
}

export {QuizPage}