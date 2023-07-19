import { Link } from "react-router-dom"

function HomePage() {
  return (
    <div className="container mx-auto flex-grow">
      <h1>Home</h1>
      <p>Home page</p>
      <Link to={'/themes'}>Перейти к списку доступных тем проверки знаний</Link>
    </div>
  )
}

export {HomePage}