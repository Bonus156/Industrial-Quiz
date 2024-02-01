import { useParams } from "react-router-dom";
import { Result } from "../components/Result"
import themes from "../json/questions.json";
import { CurrentResult, ResultType, Theme } from "../types/types";
import { ResultsBox } from "../components/ResultsBox";

function ResultsPage() {

  const {themeRoute} = useParams();

  const theme: Theme | undefined = themes.find(theme => theme.themeRoute === themeRoute);
  const results: ResultType[] = JSON.parse(localStorage.getItem('results') ?? '[]');
  const currentThemeResults: CurrentResult[] | undefined = results.find(result => result.theme == themeRoute)?.results;

  return (
    <div className="container mx-auto flex-grow">
      {Boolean(results.length) && !themeRoute &&
        results.map((result, index) => {
          return (
            <ResultsBox theme={themes.find(theme => theme.themeRoute === result.theme)} key={index}>
              {result.results.map((attempt, index) => {
                return <Result attempt={index + 1} result={attempt} key={index} />
                })
              }
            </ResultsBox>
          )
        })
      }
      {Boolean(results.length) && themeRoute &&
        <ResultsBox theme={theme}>
          {currentThemeResults && 
            currentThemeResults.map((attempt, index) => {
              return <Result attempt={index + 1} result={attempt} key={index} />
            })
          }
        </ResultsBox>
      }
    </div>
  )
}

export { ResultsPage }
