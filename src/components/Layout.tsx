import { NavLink, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <header className="bg-gray-100">
        <div className="container flex mx-auto my-2">
          <h1>Industrial Quiz</h1>
          <div className="nav mx-auto">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/themes">Themes</NavLink>
            <NavLink to="/quiz">Quiz</NavLink>
            <NavLink to="/get">Get</NavLink>
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
