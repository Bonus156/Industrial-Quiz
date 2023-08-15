import { useRef, useState } from "react";

export function GetPage() {
  const clearStorage = useRef<HTMLTextAreaElement>(null);
  const scriptTextArea = useRef<HTMLTextAreaElement>(null);
  const storageToClipboard = useRef<HTMLTextAreaElement>(null);
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
    const button: HTMLButtonElement = e.target;
    button.innerText = "Copied!";
    setTimeout(() => {
      button.innerText = "Copy";
    }, 1000);
  };

  const setTheme = () => {

    setIsEmptyField(!themeTitle || !themeRoute);
  }

  return (
    <div className="get-page container mx-auto flex-grow">
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
        <div className="inputs-block w-full mr-4">
          <div className="theme-title">
            <label htmlFor="titleinput">Название&nbsp;темы</label>
            <input type="text" id="titleinput" className="border mb-4 w-full" onChange={e => setThemeTitle(e.target.value)} value={themeTitle} ref={themeTitleInput} />
          </div>
          <div className="theme-route">
            <label htmlFor="themeroute">Theme&nbsp;route</label>
            <input type="text" id="themeroute" className="border w-full" onChange={e => setThemeRoute(e.target.value)} value={themeRoute} ref={themeRouteInput} />
          </div>
          {isEmptyField && <span className="text-red-550 font-semibold">Заполните поля "Название темы" и "Theme route"</span>}
        </div>
        <button
          className="cursor-pointer border font-semibold rounded px-4 py-2 mt-6 w-24 h-fit bg-green-400 hover:bg-green-500"
          onClick={setTheme}
        >
          Set
        </button>
      </div>
    </div>
  );
}
