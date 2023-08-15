import themes from "../json/questions.json";
import { Link } from "react-router-dom";

function ThemesPage() {
  return (
    <div className="container mx-auto flex-grow">
      <h1>Themes</h1>
      <h2>Темы для подготовки к проверке знаний:</h2>
      <ol className="p-4 border border-solid border-gray-300">{themes.map((theme) => (
          <li className="list-decimal list-inside p-3 even:bg-gray-100" key={theme.themeRoute}><Link to={`/quiz/${theme.themeRoute}/0`} className="text-primhover hover:underline">{theme.theme} | вопросов: {theme.questions.length}</Link></li>
      ))}
      </ol>
    </div>
  )
}

export {ThemesPage}