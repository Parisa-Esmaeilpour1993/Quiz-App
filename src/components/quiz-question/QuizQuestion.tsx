import { Button, Spinner } from "@chakra-ui/react";
import { useContext, useReducer, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { QuizContext } from "../../context/QuizContext";

interface ActionProps {
  type: "NEXT_QUESTION" | "PREV_QUESTION" | "SELECT_ANSWER" | "SHUFFLE_ANSWERS";
  payload?: any;
}

// Reducer function
function quizReducer(state: any, action: ActionProps) {
  switch (action.type) {
    case "NEXT_QUESTION":
      return {
        ...state,
        currentQuestionIndex: Math.min(
          state.currentQuestionIndex + 1,
          action.payload.quizLength - 1
        ),
      };
    case "PREV_QUESTION":
      return {
        ...state,
        currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0),
      };
    case "SELECT_ANSWER":
      return {
        ...state,
        selectedAnswers: {
          ...state.selectedAnswers,
          [state.currentQuestionIndex]: action.payload.answer,
        },
      };
    case "SHUFFLE_ANSWERS":
      return {
        ...state,
        shuffledQuestions: {
          ...state.shuffledQuestions,
          [state.currentQuestionIndex]: action.payload.shuffledAnswers,
        },
      };
    default:
      return state;
  }
}

export default function QuizQuestion() {
  const { quizList = [] } = useContext(QuizContext) || {};
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); // State for loading
  const [hasError, setHasError] = useState(false); // State for error (e.g., loading takes too long)

  // Reducer for managing question index & selected answers
  const [state, dispatch] = useReducer(quizReducer, {
    currentQuestionIndex: 0,
    selectedAnswers: {},
    shuffledQuestions: {},
  });

  // Effect to handle loading state and timeout
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      if (quizList.length === 0) {
        setIsLoading(false); // Stop loading
        setHasError(true); // Show error (loading took too long)
      }
    }, 5000); // 5 seconds timeout

    // If quizList is loaded, clear the timeout and stop loading
    if (quizList.length > 0) {
      clearTimeout(loadingTimeout);
      setIsLoading(false);
      setHasError(false);
    }

    // Cleanup timeout on unmount
    return () => clearTimeout(loadingTimeout);
  }, [quizList]);

  // Show loading spinner while data is being fetched
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-800 to-blue-300 p-8 text-white">
        <Spinner size="xl" />
        <p className="mt-4">Loading questions...</p>
      </div>
    );
  }

  // Show error message if loading took too long
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

  // Show error message if no quiz data is found
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

  // Fisher-Yates Shuffle for randomizing answers
  function shuffleAnswers(correct_answer: string, incorrect_answers: string[]) {
    const allAnswers = [correct_answer, ...incorrect_answers];

    for (let i = allAnswers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]]; // Swap elements
    }

    return allAnswers;
  }

  // Check if answers are already shuffled for the current question
  const shuffledAnswers =
    state.shuffledQuestions[state.currentQuestionIndex] ||
    shuffleAnswers(
      currentQuestion.correct_answer,
      currentQuestion.incorrect_answers
    );

  // Dispatch action to store shuffled answers if not already stored
  if (!state.shuffledQuestions[state.currentQuestionIndex]) {
    dispatch({
      type: "SHUFFLE_ANSWERS",
      payload: { shuffledAnswers },
    });
  }

  // Retrieve selected answer for current question
  const selectedAnswer =
    state.selectedAnswers[state.currentQuestionIndex] || null;

  // Handle answer selection
  function handleSelectAnswer(answer: string) {
    dispatch({ type: "SELECT_ANSWER", payload: { answer } });
  }

  // Handle next question
  function handleNextQuestion() {
    if (state.currentQuestionIndex === quizList.length - 1) {
      navigate("/result", {
        state: { selectedAnswers: state.selectedAnswers }, // Pass selected answers to Result page
      });
    } else {
      dispatch({
        type: "NEXT_QUESTION",
        payload: { quizLength: quizList.length },
      });
    }
  }

  // Handle previous question
  function handlePrevQuestion() {
    dispatch({ type: "PREV_QUESTION" });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-800 to-blue-300 p-8 text-white">
      <h2 className="text-2xl font-bold mb-4">{`Question ${
        state.currentQuestionIndex + 1
      } of ${quizList.length}`}</h2>
      <p className="text-lg mb-6 bg-white text-gray-900 p-4 rounded-xl">
        {currentQuestion.question}
      </p>

      <div className="flex flex-col gap-4 w-full max-w-lg">
        {shuffledAnswers.map((answer: string, index: number) => (
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
