import { Route, Routes, Link } from 'react-router-dom';
import './App.css'
import { HomePage } from './pages/HomePage';
import { QuizPage } from './pages/Quizpage';
import { FillPage } from './pages/Fillpage';
import { NotFoundPage } from './pages/Notfoundpage';

function App() {
  return (
    <>
      <header>
        <Link to="/">Home</Link>
        <Link to="/quiz">Quiz</Link>
        <Link to="/Fill">Fill</Link>
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/fill" element={<FillPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
