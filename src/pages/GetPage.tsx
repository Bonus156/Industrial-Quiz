import { useRef, useState } from "react";
import { Link } from "react-router-dom";

export function GetPage() {
  const clearStorage = useRef<HTMLTextAreaElement>(null);
  const scriptTextArea = useRef<HTMLTextAreaElement>(null);
  const storageToClipboard = useRef<HTMLTextAreaElement>(null);
  const jsonArea = useRef<HTMLTextAreaElement>(null);
  const themeTitleInput = useRef<HTMLInputElement>(null);
  const themeRouteInput = useRef<HTMLInputElement>(null);
  const [themeTitle, setThemeTitle] = useState('');
  const [themeRoute, setThemeRoute] = useState('');
  const [isEmptyField, setIsEmptyField] = useState(false);

  const copyToClipboard = (
    e: React.MouseEvent<HTMLButtonElement>,
    ref: React.RefObject<HTMLTextAreaElement>
  ) => {
    if (ref.current) {
      navigator.clipboard.writeText(ref.current.value);
    }
    const button: HTMLButtonElement = e.target as HTMLButtonElement;
    button.innerText = "Copied!";
    setTimeout(() => {
      button.innerText = "Copy";
    }, 1000);
  };

  const setTheme = async () => {
    setIsEmptyField(!themeTitle || !themeRoute); // этот useState можно убрать
    if (!isEmptyField) {
      const clipbordText: string = await navigator.clipboard.readText();
      try {
        const jsonText = JSON.stringify({theme: themeTitle,
        themeRoute: themeRoute,
        questions: JSON.parse(clipbordText)}, null, 2);
        if (jsonArea.current) {
          jsonArea.current.value = jsonText;
        }
      } catch(error) {
        console.log('something get wrong.\n', error); // переписать эту обработку ошибок
        if (jsonArea.current) {
          jsonArea.current.value = 'Что-то пошло не так';
        }
      }
    }
  }

  return (
    <div className="get-page container mx-auto flex-grow">
      <p className="rules">Текущая версия программы не поддерживает добавление тестов с картинками в тексте вопроса. Поддержка таких вопросов будет добавлена позднее.</p>
      <p className="rules">Список доступных тем можно (и нужно) дополнять. Их можно добавлять (на бесконечное количество попыток и бесконечный срок) после прохождения теста на <a href="https://test.ucp.by/">сайте Госпромнадзора "https://test.ucp.by/"</a>. Для добавления новых тестов в перечень доступных тем для подготовки к проверке знаний необходимо выполнить следующие действия.</p>
      <p className="rules">1. Пройти тест <a href="https://test.ucp.by/">сайте Госпромнадзора "https://test.ucp.by/"</a> из числа тех, которых еще нет в <Link className="underline hover:no-underline" to={'/themes'}>списке доступных тем</Link>.</p>
      <p className="rules">2. Открыть пройденный тест в браузере Google Chrome или Mozilla Firefox. Для этого необходимо скопировать адрес из адресной строки открытого окна теста в адресную строку браузера. Затем кликнуть правой кнопкой мыши в любом месте открытой страницы. Появится контекстное меню. В контекстном меню выбрать пункт (в зависимости от браузера) "Исследовать" или "Посмотреть код" или "Просмотр HTML-кода" или "Inspect" или т.п.</p>
      <div className="flex flex-row items-center">
        <textarea
          ref={clearStorage}
          className="my-4 mr-2 px-2 border"
          readOnly
          cols={120}
          rows={2}
          defaultValue={`localStorage.clear();`}
        ></textarea>

        <button
          className="cursor-pointer border font-semibold rounded px-4 py-2 w-24 h-fit bg-green-400 hover:bg-green-500"
          onClick={(e) => copyToClipboard(e, clearStorage)}
        >
          Copy
        </button>
      </div>
      <div className="flex flex-row items-center">
        <textarea
          ref={scriptTextArea}
          className="my-4 mr-2 px-2 border"
          readOnly
          cols={120}
          rows={5}
          defaultValue={`localStorage.setItem('questions', JSON.stringify([...JSON.parse(localStorage.getItem('questions') ?? "[]"), {question: document.querySelector('.qtext').textContent, answers: Array.from(document.querySelectorAll('.answernumber')).map(a => a.nextSibling.textContent), rightAnswer: document.querySelector('.rightanswer').textContent, link: document.querySelector('.generalfeedback').firstElementChild.href, linkText: document.querySelector('.generalfeedback').textContent }], null, 2));`}
        ></textarea>

        <button
          className="cursor-pointer border font-semibold rounded px-4 py-2 w-24 h-fit bg-green-400 hover:bg-green-500"
          onClick={(e) => copyToClipboard(e, scriptTextArea)}
        >
          Copy
        </button>
      </div>
      <div className="flex flex-row items-center">
        <textarea
          ref={storageToClipboard}
          className="my-4 mr-2 px-2 border"
          readOnly
          cols={120}
          rows={2}
          defaultValue={`navigator.clipboard.writeText(localStorage.getItem('questions'));`}
        ></textarea>

        <button
          className="cursor-pointer border font-semibold rounded px-4 py-2 w-24 h-fit bg-green-400 hover:bg-green-500"
          onClick={(e) => copyToClipboard(e, storageToClipboard)}
        >
          Copy
        </button>
      </div>
      <div className="flex flex-row items-start">
        <div className="inputs-block w-full max-w-5xl">
          <div className="theme-title">
            <label htmlFor="titleinput">Название&nbsp;темы</label>
            <input type="text" id="titleinput" className="border mb-4 w-full" onChange={e => setThemeTitle(e.target.value)} value={themeTitle} ref={themeTitleInput} />
          </div>
          <div className="theme-route ">
            <label htmlFor="themeroute">Theme&nbsp;route</label>
            <input type="text" id="themeroute" className="border w-full" onChange={e => setThemeRoute(e.target.value)} value={themeRoute} ref={themeRouteInput} />
          </div>
          {isEmptyField && <span className="text-red-550 font-semibold">Заполните поля "Название темы" и "Theme route"</span>}
        </div>
      </div>
      <button
        className={`cursor-pointer border font-semibold rounded px-4 py-2 w-24 h-fit bg-green-400 hover:bg-green-500 disabled:cursor-default disabled:text-white disabled:bg-green-300 ${isEmptyField ? 'mt-4' : 'mt-10'}`}
        onClick={setTheme}
        disabled={!themeTitle || !themeRoute}
      >
        Set
      </button>
      <div className="flex flex-row items-center">
        <textarea
          ref={jsonArea}
          className="my-4 mr-2 px-2 border"
          readOnly
          cols={120}
          rows={5}
          defaultValue={``}
        ></textarea>

        <button
          className="cursor-pointer border font-semibold rounded px-4 py-2 w-24 h-fit bg-green-400 hover:bg-green-500"
          onClick={(e) => copyToClipboard(e, jsonArea)}
        >
          Copy
        </button>
      </div>
    </div>
  );
}
