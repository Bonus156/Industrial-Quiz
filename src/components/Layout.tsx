import { NavLink, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <header className="text-center">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/quiz">Quiz</NavLink>
        <NavLink to="/Fill">Fill</NavLink>
      </header>
      <Outlet />
      <footer>
        2023
      </footer>
    </>
  )
}

export {Layout}
