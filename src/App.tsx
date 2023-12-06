import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { QuizPage } from './pages/QuizPpage';
import { FillPage } from './pages/Fillpage';
import { NotFoundPage } from './pages/NotFoundPpage';
import { Layout } from './components/Layout';
import { ThemesPage } from './pages/Themes';
import { GetPage } from './pages/GetPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="quiz/:themeRoute/*" element={<QuizPage />} />
          <Route path="themes" element={<ThemesPage />} />
          <Route path="fill" element={<FillPage />} />
          <Route path="get" element={<GetPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
