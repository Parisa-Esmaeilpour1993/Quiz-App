import { createContext, Dispatch, SetStateAction } from "react";
interface QuizContextProps {
  quizList: any[];
  setQuizList: Dispatch<SetStateAction<any[]>>;
}
export const QuizContext = createContext<QuizContextProps | null>(null);
