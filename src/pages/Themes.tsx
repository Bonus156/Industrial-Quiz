import { ListItem } from "../components/ListItem";
import themes from "../json/questions.json";

function ThemesPage() {
  return (
    <div className="container mx-auto flex-grow">
      <h2>Темы для подготовки к проверке знаний:</h2>
      <ol className="p-4 border border-solid border-gray-300">{themes.map((theme) => (
        <ListItem theme={theme} key={theme.themeRoute}/>
      ))}
      </ol>
    </div>
  )
}

export {ThemesPage}