import { Button, Spinner } from "@chakra-ui/react";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { QuizContext } from "../../context/QuizContext";
import { useQuiz } from "../../hooks/useQuiz";

export default function QuizQuestion() {
  const { quizList = [] } = useContext(QuizContext) || {};
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const { state, dispatch } = useQuiz(quizList);

  useEffect(() => {
    setIsLoading(true);
    const loadingTimeout = setTimeout(() => {
      if (quizList.length === 0) {
        setIsLoading(false);
        setHasError(true);
      } else {
        setIsLoading(false);
        setHasError(false);
      }
    }, 3000);

    return () => clearTimeout(loadingTimeout);
  }, [quizList]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-800 to-blue-300 p-8 text-white">
        <Spinner size="xl" />
        <p className="mt-4">Loading questions...</p>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="text-center text-white">
        <p className="text-lg">
          Loading took too long. Please try again later.
        </p>
        <Button mt={4} colorScheme="yellow" onClick={() => navigate("/")}>
          Go Back
        </Button>
      </div>
    );
  }

  if (quizList.length === 0) {
    return (
      <div className="text-center text-white">
        <p className="text-lg">No quiz data found!</p>
        <Button mt={4} colorScheme="yellow" onClick={() => navigate("/")}>
          Go Back
        </Button>
      </div>
    );
  }

  const currentQuestion = quizList[state.currentQuestionIndex];
  const shuffledAnswers =
    state.shuffledQuestions[state.currentQuestionIndex] || [];
  const selectedAnswer =
    state.selectedAnswers[state.currentQuestionIndex] || null;

  function handleSelectAnswer(answer: string) {
    dispatch({ type: "SELECT_ANSWER", payload: { answer } });
  }

  function handleNextQuestion() {
    if (state.currentQuestionIndex === quizList.length - 1) {
      navigate("/result", {
        state: { selectedAnswers: state.selectedAnswers },
      });
    } else {
      dispatch({
        type: "NEXT_QUESTION",
        payload: { quizLength: quizList.length },
      });
    }
  }

  function handlePrevQuestion() {
    dispatch({ type: "PREV_QUESTION" });
  }

  console.log(quizList);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-800 to-blue-300 p-8 text-white">
      <h2 className="text-2xl font-bold mb-4">{`Question ${
        state.currentQuestionIndex + 1
      } of ${quizList.length}`}</h2>
      <p className="text-lg mb-6 bg-white text-gray-900 p-4 rounded-xl">
        {currentQuestion.question}
      </p>
      <div className="flex flex-col gap-4 px-2 min-w-max">
        {shuffledAnswers.map((answer, index) => (
          <Button
            key={index}
            colorScheme={selectedAnswer === answer ? "green" : ""}
            variant={selectedAnswer === answer ? "solid" : "outline"}
            size="lg"
            onClick={() => handleSelectAnswer(answer)}
          >
            {answer}
          </Button>
        ))}
      </div>
      <div className="flex gap-4 mt-8">
        {/* Back Button */}
        <Button
          colorScheme="yellow"
          variant={state.currentQuestionIndex === 0 ? "outline" : "solid"}
          size="lg"
          onClick={handlePrevQuestion}
          isDisabled={state.currentQuestionIndex === 0}
        >
          Back
        </Button>
        {/* Next Button */}
        <Button
          colorScheme="yellow"
          variant="solid"
          size="lg"
          onClick={handleNextQuestion}
        >
          {state.currentQuestionIndex === quizList.length - 1
            ? "Finish"
            : "Next"}
        </Button>
      </div>
    </div>
  );
}
