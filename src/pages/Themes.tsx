import * as json from "../json/questions.json";
import { Link } from "react-router-dom";
import { Theme } from "../types/types";

const themes: Theme[] = json.default;


function ThemesPage() {
  console.log(themes);
  return (
    <div className="container mx-auto flex-grow">
      <h1>Themes</h1>
      <h2>Темы:</h2>
      <ul>{themes.map((theme) => (
          <li key={theme.themeRoute}><Link to={`/quiz/${theme.themeRoute}`}>{theme.theme} | вопросов: {theme.questions.length}</Link></li>
      ))}
      </ul>
    </div>
  )
}

export {ThemesPage}