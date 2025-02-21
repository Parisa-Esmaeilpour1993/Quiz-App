import { Button } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { QuizContext } from "../../context/QuizContext";
import Modal from "../result-modal/ResultModal";
import EmojiFeedback from "../emojiFeedback-result/EmojiFeedback";

export default function Result() {
  const { quizList } = useContext(QuizContext);
  const location = useLocation();
  const navigate = useNavigate();

  const selectedAnswers = location.state?.selectedAnswers || {};

  let correctAnswers = 0;
  let incorrectAnswers = 0;
  quizList.forEach((question, index) => {
    const selectedAnswer = selectedAnswers[index];
    if (selectedAnswer) {
      if (selectedAnswer === question.correct_answer) {
        correctAnswers += 1;
      } else {
        incorrectAnswers += 1;
      }
    }
  });

  const totalQuestions = quizList.length;
  const totalScore =
    ((correctAnswers * 3 - incorrectAnswers) / (totalQuestions * 3)) * 100;

  let percentage = parseFloat(totalScore.toFixed(2));

  const emoji = <EmojiFeedback percentage={percentage} />;

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");

  const unansweredQuestions = quizList.filter(
    (_, index) => !selectedAnswers[index]
  );

  const incorrectQuestions = quizList.filter(
    (question, index) =>
      selectedAnswers[index] &&
      selectedAnswers[index] !== question.correct_answer
  );

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
            onClick={() => navigate("/setup")}
            className="w-full my-4"
          >
            Play Again
          </Button>
        </div>
      </div>

      {/* Use the Modal component */}
      <Modal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        modalType={modalType}
        unansweredQuestions={unansweredQuestions}
        incorrectQuestions={incorrectQuestions}
        selectedAnswers={selectedAnswers}
        quizList={quizList}
      />
    </div>
  );
}
