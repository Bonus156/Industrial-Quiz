import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type Answer = {
  text: string;
  isCorrect: boolean;
}

type Question = {
  question: string;
  answers: Answer[];
}

type FormFields = {
  theme: string;
  question: string;
  answer1: string;
  answer2: string;
  answer3: string;
  correctAns: string;
  // file?: FileList;
};

function FillPage() {
  const [questions, setQuestions] = useState<Question[]>([]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormFields>({ mode: 'onSubmit', reValidateMode: 'onSubmit' });

  const addQuestion: SubmitHandler<FormFields> = (data) => {
    console.log(data);
    const newQuestion: Question = {
      question: data.question,
      answers: [
        {text: data.answer1, isCorrect: data.correctAns === 'a'},
        {text: data.answer2, isCorrect: data.correctAns === 'b'},
        {text: data.answer3, isCorrect: data.correctAns === 'c'},
      ]      
    };

    setQuestions([...questions, newQuestion]);
    reset();
  };

  return (
    <div className="container mx-auto flex-grow">
      <form className="flex flex-col" onSubmit={handleSubmit(addQuestion)}>
        <label>
          <span>Question</span>
          <input
            className="cursor-text border rounded px-4 py-2 m-2"
            type="text"
            {...register('question', {
              required: 'Type question',
              minLength: { value: 3, message: 'Too short' },
            })}
          />
          {errors?.question && (
            <span className="text-red-700">{errors?.question?.message?.toString()}</span>
          )}
        </label>
        <div>
          <label className="cursor-pointer mr-4 my-4">
            <input
              className="cursor-pointer mr-2"
              type="radio"
              {...register('correctAns', { required: 'Correct answer must be selected' })}
              value="a"
            />
            <span>a.</span>
            <label>
              <input
                className="cursor-text border rounded px-4 py-2 m-2"
                type="text"
                {...register('answer1', {
                  required: 'Type first answer',
                  minLength: { value: 1, message: 'Type answer' },
                })}
              />
              {errors?.answer1 && (
                <span className="text-red-700">{errors?.answer1?.message?.toString()}</span>
              )}
            </label>
          </label>
          <label className="cursor-pointer mr-4 my-4">
            <input
              className="cursor-pointer mr-2"
              type="radio"
              {...register('correctAns', { required: 'Correct answer must be selected' })}
              value="b"
            />
            <span>b.</span>
            <label>
              <input
                className="cursor-text border rounded px-4 py-2 m-2"
                type="text"
                {...register('answer2', {
                  required: 'Type second answer',
                  minLength: { value: 1, message: 'Type answer' },
                })}
              />
              {errors?.answer2 && (
                <span className="text-red-700">{errors?.answer2?.message?.toString()}</span>
              )}
            </label>
          </label>
          <label className="cursor-pointer mr-4 my-4">
            <input
              className="cursor-pointer mr-2"
              type="radio"
              {...register('correctAns', { required: 'Correct answer must be selected' })}
              value="c"
            />
            <span>c.</span>
            <label>
              <input
                className="cursor-text border rounded px-4 py-2 m-2"
                type="text"
                {...register('answer3', {
                  required: 'Type third answer',
                  minLength: { value: 1, message: 'Type answer' },
                })}
              />
              {errors?.answer3 && (
                <span className="text-red-700">{errors?.answer3?.message?.toString()}</span>
              )}
            </label>
          </label>
          {errors?.correctAns && (
            <span className="text-red-700">{errors?.correctAns?.message?.toString()}</span>
          )}
        </div>
        <div>
          <input
            className="cursor-pointer border font-semibold rounded px-4 py-2 w-fit bg-green-400 hover:bg-green-500"
            type="submit"
            value="Push"
          />
          <button className="cursor-pointer border font-semibold rounded px-4 py-2 w-fit bg-green-400 hover:bg-green-500" type="button" id ="show">To Clipboard and Show</button>
          {/* {confirmText && <span className="ml-2 font-bold text-green-800">{confirmText}</span>} */}
        </div>
      </form>
    </div>
  )
}

export {FillPage}
