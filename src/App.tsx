import { Route, Routes } from 'react-router-dom';
import { QuizPage } from './pages/QuizPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { Layout } from './components/Layout';
import { ThemesPage } from './pages/Themes';
import { ResultsPage } from './pages/ResultsPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ThemesPage />} />
          <Route path="quiz/:themeRoute/*" element={<QuizPage />} />
          <Route path="quiz/:themeRoute" element={<NotFoundPage />} />
          <Route path="results" element={<ResultsPage />} />
          <Route path="results/:themeRoute" element={<ResultsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
