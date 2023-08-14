import { useRef } from "react";

export function GetPage() {
  const clearStorage = useRef<HTMLTextAreaElement>(null);
  const scriptTextArea = useRef<HTMLTextAreaElement>(null);

  const copyToClipboard = (
    e: MouseEvent,
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

  return (
    <div className="get-page container mx-auto flex-grow">
      <div className="flex flex-row items-center">
        <textarea
          ref={clearStorage}
          className="my-4 mr-2 px-2 border"
          readOnly
          cols={100}
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
          cols={100}
          rows={6}
          defaultValue={`localStorage.setItem('questions', JSON.stringify([...JSON.parse(localStorage.getItem('questions') ?? "[]"), {question: document.querySelector('.qtext').textContent, answers: Array.from(document.querySelectorAll('.answernumber')).map(a => a.nextSibling.textContent), rightAnswer: document.querySelector('.rightanswer').textContent, link: document.querySelector('.generalfeedback').firstElementChild.href, linkText: document.querySelector('.generalfeedback').textContent }], null, 2));`}
        ></textarea>

        <button
          className="cursor-pointer border font-semibold rounded px-4 py-2 w-24 h-fit bg-green-400 hover:bg-green-500"
          onClick={(e) => copyToClipboard(e, scriptTextArea)}
        >
          Copy
        </button>
      </div>
    </div>
  );
}
