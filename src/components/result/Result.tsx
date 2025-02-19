import { Button } from "@chakra-ui/react";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import { QuizContext } from "../../context/QuizContext";

export default function Result() {
  const { quizList } = useContext(QuizContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve selected answers from navigation state
  const selectedAnswers = location.state?.selectedAnswers || {};

  // Calculate score based on the formula
  let correctAnswers = 0;
  let incorrectAnswers = 0;

  quizList.forEach((question, index) => {
    const selectedAnswer = selectedAnswers[index];
    if (selectedAnswer) {
      if (selectedAnswer === question.correct_answer) {
        correctAnswers += 1; // Correct answer
      } else {
        incorrectAnswers += 1; // Incorrect answer
      }
    }
    // If no answer is selected, it counts as 0 points
  });

  // Calculate total score based on the formula: (correctAnswers * 3 - incorrectAnswers) / (totalQuestions * 3) * 100
  const totalQuestions = quizList.length;
  const totalScore =
    ((correctAnswers * 3 - incorrectAnswers) / (totalQuestions * 3)) * 100;

  // Format the percentage to two decimal places
  let percentage = parseFloat(totalScore.toFixed(2));

  function getEmoji() {
    if (percentage < 25)
      return (
        <div>
          😢 <p className="text-xl text-red-500 mt-3 mb-8">Try More...</p>
        </div>
      );
    if (percentage >= 25 && percentage < 50)
      return (
        <div>
          😕{" "}
          <p className="text-xl text-yellow-500 mt-3 mb-8">
            You Can be Better!
          </p>{" "}
        </div>
      );
    if (percentage >= 50 && percentage < 75)
      return (
        <div>
          🙂 <p className="text-xl text-orange-700 mt-3 mb-8">It's Good!</p>
        </div>
      );
    if (percentage >= 75)
      return (
        <div>
          😄 <p className="text-xl text-green-400 mt-3 mb-8">Excellent!</p>
        </div>
      );
    if ((percentage = 75))
      return (
        <div>
          😍 <p className="text-xl text-green-700 mt-3 mb-8">It's Wonderful!</p>
        </div>
      );
    return "";
  }

  // Get the emoji for the current score
  const emoji = getEmoji();

  return (
    <div className="flex flex-col gap-12 items-center py-12 text-center min-h-screen bg-gradient-to-br from-purple-800 to-blue-300 text-white">
      <h1 className="text-5xl font-extrabold text-yellow-400 tracking-wide text-shadow-md">
        QUIZ RESULT
      </h1>
      <div className="flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 to-blue-200 p-8 text-white rounded-lg shadow-lg">
        <div className="bg-white text-gray-900 px-20 py-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-4xl mb-4 font-semibold">{emoji}</h2>
          <p className=" mb-4">
            Correct Answers:{" "}
            <span className="font-bold text-green-600">{correctAnswers}</span>
          </p>
          <p className=" mb-4">
            Incorrect Answers:{" "}
            <span className="font-bold text-red-600">{incorrectAnswers}</span>
          </p>
          <p className=" mb-4">
            Unanswered Questions:{" "}
            <span className="font-bold text-gray-500">
              {totalQuestions - (correctAnswers + incorrectAnswers)}
            </span>
          </p>
          <p className=" mb-4 font-bold">Your Score: {percentage}%</p>

          <Button
            colorScheme="yellow"
            size="lg"
            onClick={() => navigate("/")}
            className="w-full mt-5"
          >
            Play Again
          </Button>
        </div>
      </div>
    </div>
  );
}
