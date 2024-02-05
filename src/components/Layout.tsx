import { NavLink, Outlet } from "react-router-dom";

const Layout = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <header className="bg-gray-100">
        <div className="container flex mx-auto my-2 px-2">
          <h1><NavLink to="/">Industrial Quiz</NavLink></h1>
          <div className="nav mx-auto flex sm:gap-4 gap-1">
            <NavLink to="/" className="hover:text-blue">Домой</NavLink>
            <NavLink to="/themes" className="hover:text-blue">Темы</NavLink>
            <NavLink to="/results" className="hover:text-blue">Результаты</NavLink>
            {/* <NavLink to="/get">Get</NavLink> */}
          </div>
        </div>
      </header>
      <Outlet />
      <footer className="bg-gray-100">
        <div className="container mx-auto text-center my-2">
          {`2023 - ${currentYear}`}
        </div>
      </footer>
    </>
  )
}

export {Layout}
