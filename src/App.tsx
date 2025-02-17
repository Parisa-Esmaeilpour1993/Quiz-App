import { useState } from "react";
import { QuizContext } from "./context/QuizContext";
import HomePage from "./pages/home/HomePage";

function App() {
  const [quizList, setQuizList] = useState<any>([]);
  return (
    <QuizContext.Provider value={{ quizList, setQuizList }}>
      <HomePage />
    </QuizContext.Provider>
  );
}
export default App;
