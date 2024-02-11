import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const Layout = () => {
  const [isBlur, setIsBlur] = useState(false);
  
  useEffect(() => {
    const devToolsPreventer = (e: KeyboardEvent) => {
      if (e.code === 'F12') {
        e.preventDefault();
        setIsBlur(true);
      }
      if (e.code === 'Escape') {
        setIsBlur(false);
      }
    };
    const contextMenuPreventer = (e: MouseEvent) => {
      e.preventDefault();
      setIsBlur(prev => !prev);
    }
    document.addEventListener('keydown', devToolsPreventer);
    document.addEventListener('contextmenu', contextMenuPreventer);
    return () => {
      document.removeEventListener('keydown', devToolsPreventer);
      document.removeEventListener('contextmenu', contextMenuPreventer);
    }
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <>
      <header className="bg-gray-100">
        <div className="container flex mx-auto my-2 px-2">
          <h1><NavLink to="/">Industrial Quiz</NavLink></h1>
          <div className="nav mx-auto flex sm:gap-4 gap-1">
            {/* <NavLink to="/" className="hover:text-blue">Домой</NavLink> */}
            <NavLink to="/" className="hover:text-blue">Темы</NavLink>
            <NavLink to="/results" className="hover:text-blue">Результаты</NavLink>
            {/* <NavLink to="/get">Get</NavLink> */}
          </div>
        </div>
      </header>
      <main className={`flex-grow ${isBlur ? 'blur' : ''}`}>
        <Outlet />
      </main>
      <footer className="bg-gray-100">
        <div className="container mx-auto text-center my-2">
          {`2023 - ${currentYear}`}
        </div>
      </footer>
    </>
  )
}

export {Layout}
