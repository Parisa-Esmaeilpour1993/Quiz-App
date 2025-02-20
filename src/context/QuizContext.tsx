import { createContext } from "react";
import { QuizContextProps } from "../types/types";

export const QuizContext = createContext<QuizContextProps>({
  quizList: [],
  setQuizList: () => {},
  selectedAnswers: {},
  setSelectedAnswers: () => {},
});
