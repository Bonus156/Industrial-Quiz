import { Route, Routes } from 'react-router-dom';
import './App.css'
import { HomePage } from './pages/HomePage';
import { QuizPage } from './pages/Quizpage';
import { FillPage } from './pages/Fillpage';
import { NotFoundPage } from './pages/Notfoundpage';
import { Layout } from './components/Layout';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="quiz" element={<QuizPage />} />
          <Route path="fill" element={<FillPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
