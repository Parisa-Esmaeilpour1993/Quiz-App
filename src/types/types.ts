import { Dispatch, SetStateAction } from "react";

export interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}
export interface QuizContextProps {
  quizList: Question[];
  setQuizList: Dispatch<SetStateAction<Question[]>>;
  selectedAnswers: { [key: number]: string };
  setSelectedAnswers: Dispatch<SetStateAction<{ [key: number]: string }>>;
}
