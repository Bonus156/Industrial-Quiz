import themes from "../json/questions.json";
import { Link } from "react-router-dom";

function ThemesPage() {
  return (
    <div className="container mx-auto flex-grow">
      <h1>Themes</h1>
      <h2>Темы:</h2>
      <ul className="p-4 border border-solid border-gray-300">{themes.map((theme) => (
          <li className="p-3 even:bg-gray-100" key={theme.themeRoute}><Link to={`/quiz/${theme.themeRoute}/0`} className="text-primhover hover:underline">{theme.theme} | вопросов: {theme.questions.length}</Link></li>
      ))}
      </ul>
    </div>
  )
}

export {ThemesPage}