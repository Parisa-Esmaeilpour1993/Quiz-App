import { useState } from "react";
import { QuizContext } from "./context/QuizContext";
import HomePage from "./pages/home/HomePage";
import { Question } from "./types/types";

function App() {
  const [quizList, setQuizList] = useState<Question[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string;
  }>({});
  return (
    <QuizContext.Provider
      value={{ quizList, setQuizList, selectedAnswers, setSelectedAnswers }}
    >
      <HomePage />
    </QuizContext.Provider>
  );
}
export default App;
