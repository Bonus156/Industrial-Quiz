import { QState } from "../pages/QuizPage";

export type AnswerFormField = {
  answer: string;
  num: number;
  isCorrect: boolean;
  correctAnswer: string;
  indexAnswer: number;
};

export type QuestionType = {
  question: string;
  answers: string[];
  rightAnswer: string;
  link: string;
  linkText: string;
  imageLink?: string;
}

export type Theme = {
  theme: string;
  themeRoute: string;
  questions: QuestionType[];
}

export interface Save {
  theme: string;
  state: QState[];
}

export interface IconProps {
  size?: number
  onClick?: () => void
  active?: boolean
  className?: string
}

