function FillPage() {
  return (
    <div className="wrapper">
      <div className="theme-block">
        <label htmlFor="theme">Тема:</label>
        <textarea id="theme" name="theme" rows={4} cols={50}></textarea>
      </div>
      <div className="question-block">
        <label htmlFor="question">Question:</label>
        <textarea id="question" name="question" rows={4} cols={50}></textarea>
      </div>
      <div className="answers">
        <div className="answer-block">
          <input type="radio" id="answer1" />
          <label htmlFor="answer1">
            <textarea id="answer1-text" name="answer" rows={4} cols={50}></textarea>
          </label>
        </div>
        <div className="answer-block">
          <input type="radio" id="answer2" />
          <label htmlFor="answer2">
            <textarea id="answer2-text" name="answer" rows={4} cols={50}></textarea>
          </label>
        </div>
        <div className="answer-block">
          <input type="radio" id="answer3" />
          <label htmlFor="answer3">
            <textarea id="answer3-text" name="answer" rows={4} cols={50}></textarea>
          </label>
        </div>
        <button type="button" id="push">Push</button>
        <button type="button" id ="show">To Clipboard and Show</button> 
      </div>
      <textarea id="result" name="result" readOnly rows={8} cols={60}></textarea>
    </div>
  )
}

export {FillPage}