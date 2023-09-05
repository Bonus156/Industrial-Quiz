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

  const isBtnDisabled: boolean = !themeTitle || !themeRoute || themeRoute.includes(' ') || themeTitle.length < 5 || themeRoute.length < 3;

  return (
    <div className="get-page container mx-auto flex-grow">
      <p className="rules">Текущая версия программы не поддерживает добавление тестов с картинками в тексте вопроса. Поддержка таких вопросов будет добавлена позднее.</p>
      <p className="rules">Список доступных тем можно (и нужно) дополнять. Их можно добавлять (на бесконечное количество попыток и бесконечный срок) после прохождения теста на <a href="https://test.ucp.by/">сайте Госпромнадзора "https://test.ucp.by/"</a>. Для добавления новых тестов в перечень доступных тем для подготовки к проверке знаний необходимо выполнить следующие действия.</p>
      <p className="rules">1. Пройти тест <a href="https://test.ucp.by/">сайте Госпромнадзора "https://test.ucp.by/"</a> из числа тех, которых еще нет в <Link className="underline hover:no-underline" to={'/themes'}>списке доступных тем</Link>.</p>
      <p className="rules">2. Открыть пройденный тест в браузере Google Chrome или Mozilla Firefox. Для этого необходимо скопировать адрес из адресной строки открытого окна теста в адресную строку браузера. Затем кликнуть правой кнопкой мыши в любом месте открытой страницы. Появится контекстное меню. В контекстном меню выбрать пункт (в зависимости от браузера) "Исследовать" или "Посмотреть код" или "Просмотр HTML-кода" или "Inspect" или т.п. Откроется панель разработчика. В панели разработчика открыть вкладку "Консоль" ("Console").</p>
      <p className="rules">3. Очистить локальное хранилище данных браузера. Для этого вставить в открытую консоль браузера на странице с пройденным тестом текст из следующего текстового поля и нажать Ввод (Enter).</p>
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
      <p className="rules">4. Скопировать (нажать кнопку "Copy" рядом с полем) текст из следующего текстового поля и вставить (Ctrl + V или Shift + Insert) в открытую консоль браузера на странице первого вопроса и нажать Ввод (Enter). Затем перейти к следующему вопросу и снова вставить в консоль браузера скопированный текст. (Повторно копировать текст не нужно.) Нажать Enter. Проделать эти действия по одному разу на странице каждого вопроса (вставить скопированный текст в консоль: Ctrl + V, нажать Enter). Это самая трудоёмкая часть. Дальше проще.</p>
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
      <p className="rules">5. После того, как предыдущая операция будет проделана на странице каждого вопроса теста, скопировать (нажать кнопку "Copy" рядом с полем) содержимое следующего текстового поля, вставить (Ctrl + V или Shift + Insert) один раз в открытую консоль браузера на странице любого одного вопроса теста и нажать Ввод (Enter).</p>
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
      <p className="rules">6. В следующее текстовое поле "Название темы" нужно вписать название темы пройденного теста. Скорее всего программа Госпромнадзора скопировать название темы из браузера не позволит, поэтому её нужно набрать с клавиатуры.</p>
      <p className="rules">7. В текстовое поле "Theme route" нужно вписать сокращенное название темы на английском языке латиницей строчными буквами в одно слово без пробелов. Например для темы "Лица, ответственные за безопасную эксплуатацию технологических трубопроводов" в графу Theme route можно вписать "techpipelines" и т.п.</p>
      <div className="flex flex-row items-start">
        <div className="inputs-block w-full max-w-5xl mb-2">
          <div className="theme-title">
            <label htmlFor="titleinput">Название&nbsp;темы
              <input type="text" id="titleinput" className="border mb-4 w-full" onChange={e => setThemeTitle(e.target.value)} value={themeTitle} ref={themeTitleInput} />
            </label>
          </div>
          <div className="theme-route ">
            <label htmlFor="themeroute">Theme&nbsp;route
              <input type="text" id="themeroute" className="border w-full" onChange={e => setThemeRoute(e.target.value)} value={themeRoute} ref={themeRouteInput} />
            </label>
          </div>
        </div>
      </div>
      <p className="rules">8. Нажмите на кнопку Set. Если все предыдущие пункты выполнены верно, в текстовом поле ниже появится много строк текста в формате JSON. Скопируйте его нажатием на кнопку "Copy" рядом с полем и добавьте в массив с темами в файле questions.json или сохраните в файле новаяТема.txt и отправьте файл разработчику.</p>
      <button
        className={`cursor-pointer border font-semibold rounded px-4 py-2 w-24 h-fit bg-green-400 hover:bg-green-500 disabled:cursor-default disabled:text-white disabled:bg-green-300 mt-4`}
        onClick={setTheme}
        // disabled={!themeTitle || !themeRoute || themeRoute.includes(' ') || themeTitle.length < 5 || themeRoute.length < 3}
        disabled={isBtnDisabled}
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
