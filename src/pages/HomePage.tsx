import { Link } from "react-router-dom"

function HomePage() {
  return (
    <div className="container mx-auto flex-grow">
      <p className='px-2 mb-3'>Подготовка к проверке знаний</p>
      <Link className="underline p-2 hover:no-underline hover:bg-gray-200" to={'/themes'}>Перейти к списку доступных тем для подготовки к проверке знаний</Link>
    </div>
  )
}

export {HomePage}