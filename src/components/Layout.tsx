import { NavLink, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <header className="container mx-auto text-center">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/themes">Themes</NavLink>
        <NavLink to="/quiz">Quiz</NavLink>
        <NavLink to="/fill">Fill</NavLink>
      </header>
      <Outlet />
      <footer className="container mx-auto text-center">
        2023
      </footer>
    </>
  )
}

export {Layout}
