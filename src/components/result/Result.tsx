import { Button } from "@chakra-ui/react";
import { useContext, useState } from "react";
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
  });

  // Calculate total score based on the formula: (correctAnswers * 3 - incorrectAnswers) / (totalQuestions * 3) * 100
  const totalQuestions = quizList.length;
  const totalScore =
    ((correctAnswers * 3 - incorrectAnswers) / (totalQuestions * 3)) * 100;

  // Format the percentage to two decimal places
  let percentage = parseFloat(totalScore.toFixed(2));

  // Function to determine emoji based on percentage
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
    return "";
  }

  // Get the emoji for the current score
  const emoji = getEmoji();

  // State for showing modal and its type
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // "unanswered" or "incorrect"

  // Filter unanswered questions
  const unansweredQuestions = quizList.filter(
    (_, index) => !selectedAnswers[index]
  );

  // Filter incorrect questions
  const incorrectQuestions = quizList.filter(
    (question, index) =>
      selectedAnswers[index] &&
      selectedAnswers[index] !== question.correct_answer
  );

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setModalType("");
  };

  return (
    <div className="flex flex-col gap-8 items-center py-12 text-center min-h-screen bg-gradient-to-br from-purple-800 to-blue-300 text-white">
      <h1 className="text-5xl font-extrabold text-yellow-400 tracking-wide text-shadow-md">
        QUIZ RESULT
      </h1>

      {/* Main Result Section */}
      <div className="flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 to-blue-200 p-6 text-white rounded-lg shadow-lg">
        <div className="bg-white text-gray-900 px-20 py-3 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-4xl mb-3 font-semibold">{emoji}</h2>
          <p className="mb-3">
            Correct Answers:{" "}
            <span className="font-bold text-green-600">{correctAnswers}</span>
          </p>
          <p className="mb-3">
            Incorrect Answers:{" "}
            <span className="font-bold text-red-600">{incorrectAnswers}</span>
          </p>
          <p className="mb-3">
            Unanswered Questions:{" "}
            <span className="font-bold text-gray-500">
              {totalQuestions - (correctAnswers + incorrectAnswers)}
            </span>
          </p>
          <p className="mb-3 font-bold">Your Score: {percentage}%</p>

          {/* Buttons to show unanswered or incorrect questions */}
          <div className="flex gap-4 mt-5">
            <Button
              colorScheme="red"
              size="md"
              onClick={() => {
                setShowModal(true);
                setModalType("unanswered");
              }}
            >
              Unanswered Questions
            </Button>
            <Button
              colorScheme="orange"
              size="md"
              onClick={() => {
                setShowModal(true);
                setModalType("incorrect");
              }}
            >
              Incorrect Answers
            </Button>
          </div>
          <Button
            colorScheme="yellow"
            size="lg"
            onClick={() => navigate("/")}
            className="w-full my-4"
          >
            Play Again
          </Button>
        </div>
      </div>

      {/* Modal for displaying questions */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl h-5/6 w-full overflow-y-auto max-h-max">
            <h2 className="text-2xl font-bold mb-4 text-center text-black">
              {modalType === "unanswered"
                ? "Unanswered Questions"
                : "Incorrect Answers"}
            </h2>
            <button
              className="absolute top-2 right-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              onClick={handleCloseModal}
            >
              Close
            </button>
            {/* Display unanswered questions */}
            {modalType === "unanswered" && (
              <>
                {unansweredQuestions.length > 0 ? (
                  unansweredQuestions.map((question, index) => (
                    <div
                      key={index}
                      className="mb-4 border p-4 rounded-md text-black"
                    >
                      <p className="font-bold text-red-600 mb-3">
                        Question:{" "}
                        <span className="text-black">{question.question}</span>
                      </p>
                      <p className="text-green-700 font-semibold">
                        Correct Answer:{" "}
                        <span className="font-medium text-green-500">
                          {question.correct_answer}
                        </span>
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 h-5/6">
                    There is no unanswered questions.
                  </div>
                )}
              </>
            )}
            {/* Display incorrect questions */}
            {modalType === "incorrect" && (
              <>
                {incorrectQuestions.length > 0 ? (
                  incorrectQuestions.map((question, index) => (
                    <div
                      key={index}
                      className="mb-4 border p-4 rounded-md text-black"
                    >
                      <p className="font-bold text-red-600 mb-3">
                        Question:{" "}
                        <span className="text-black">{question.question}</span>
                      </p>
                      <p className="text-green-700 font-semibold">
                        Correct Answer:{" "}
                        <span className="text-green-500 font-medium">
                          {question.correct_answer}
                        </span>
                      </p>
                      <p className="text-red-700 font-semibold">
                        Your Answer:{" "}
                        <span className="text-red-500 font-medium">
                          {selectedAnswers[quizList.indexOf(question)]}
                        </span>
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 h-5/6">
                    There is no question with incorrect answer.
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
