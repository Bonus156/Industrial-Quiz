import { NavLink, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <header className="bg-gray-100">
        <div className="container flex mx-auto my-2 px-2">
          <h1><NavLink to="/">Industrial Quiz</NavLink></h1>
          <div className="nav mx-auto flex gap-4">
            <NavLink to="/" className="hover:text-blue">На главную</NavLink>
            <NavLink to="/themes" className="hover:text-blue">Темы</NavLink>
            <NavLink to="/results" className="hover:text-blue">Результаты</NavLink>
            {/* <NavLink to="/get">Get</NavLink> */}
          </div>
        </div>
      </header>
      <Outlet />
      <footer className="bg-gray-100">
        <div className="container mx-auto text-center my-2">
          2023
        </div>
      </footer>
    </>
  )
}

export {Layout}
