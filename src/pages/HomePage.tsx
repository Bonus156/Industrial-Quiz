import { Link } from "react-router-dom"

function HomePage() {
  return (
    <div className="container mx-auto flex-grow">
      <p className="mb-3">Home page</p>
      <Link className="underline p-2 hover:no-underline hover:bg-gray-200" to={'/themes'}>Перейти к списку доступных тем для подготовки к проверке знаний</Link>
    </div>
  )
}

export {HomePage}