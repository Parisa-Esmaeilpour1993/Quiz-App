import { createContext, Dispatch, SetStateAction } from "react";

interface Question {
  id: number;
  question: string;
  answers: string[];
  correct_answer: string;
  incorrect_answers: string[];
}
interface QuizContextProps {
  quizList: Question[];
  setQuizList: Dispatch<SetStateAction<Question[]>>;
  selectedAnswers: { [key: number]: string };
  setSelectedAnswers: Dispatch<SetStateAction<{ [key: number]: string }>>;
}
export const QuizContext = createContext<QuizContextProps>({
  quizList: [],
  setQuizList: () => {},
  selectedAnswers: {},
  setSelectedAnswers: () => {},
});
