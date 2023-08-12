import { Link } from "react-router-dom"

function HomePage() {
  return (
    <div className="container mx-auto flex-grow">
      <p>Home page</p>
      <Link to={'/themes'}>Перейти к списку доступных тем для подготовки к проверке знаний</Link>
    </div>
  )
}

export {HomePage}