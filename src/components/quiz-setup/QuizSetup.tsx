import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import powerButton from "../../assets/images/power-button.svg";
import SetupForm from "../../base/SetupForm";
import { QuizContext } from "../../context/QuizContext";
import { getCategory, getData } from "../../services/api/Apis";

export default function QuizSetup() {
  const [category, setCategory] = useState<{ id: number; name: string }[]>([]);
  const navigate = useNavigate();
  const quizContext = useContext(QuizContext);

  if (!quizContext) {
    return <p className="text-red-500 text-lg">Context not found!</p>;
  }

  const { setQuizList } = quizContext;

  useEffect(() => {
    getCategory().then((res) => {
      setCategory(res);
    });
  }, []);

  function handleFormSubmit(values: {
    count: string;
    category: string;
    difficulty: string;
  }) {
    const { count, category, difficulty } = values;
    getData(Number(count), category, difficulty).then((res) => {
      setQuizList(res);
      navigate("/question");
    });
  }

  return (
    <div className="flex flex-col gap-4 items-center p-10 text-center min-h-screen bg-gradient-to-br from-purple-800 to-blue-300 text-white">
      <h1 className="text-5xl font-extrabold text-yellow-400 tracking-wide text-shadow-md">
        QUIZ
      </h1>
      <p className="text-xl font-semibold tracking-wide">Setup Quiz</p>
      <SetupForm category={category} onSubmit={handleFormSubmit} />
      <img
        src={powerButton}
        alt="power-button"
        className="w-10 h-10 transition-all duration-500 hover:scale-110 self-center mt-4"
      />
    </div>
  );
}
