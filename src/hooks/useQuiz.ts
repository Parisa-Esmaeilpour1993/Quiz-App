import { useReducer, useEffect } from "react";

interface QuizState {
  currentQuestionIndex: number;
  selectedAnswers: { [key: number]: string };
  shuffledQuestions: { [key: number]: string[] };
}

interface ActionProps {
  type: "NEXT_QUESTION" | "PREV_QUESTION" | "SELECT_ANSWER" | "SHUFFLE_ANSWERS";
  payload?: any;
}

function quizReducer(state: QuizState, action: ActionProps): QuizState {
  switch (action.type) {
    case "NEXT_QUESTION":
      return {
        ...state,
        currentQuestionIndex: Math.min(
          state.currentQuestionIndex + 1,
          action.payload!.quizLength - 1
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
          [state.currentQuestionIndex]: action.payload!.answer,
        },
      };
    case "SHUFFLE_ANSWERS":
      return {
        ...state,
        shuffledQuestions: {
          ...state.shuffledQuestions,
          [state.currentQuestionIndex]: action.payload!.shuffledAnswers,
        },
      };
    default:
      return state;
  }
}

export function useQuiz(quizList: any[]) {
  const initialState: QuizState = {
    currentQuestionIndex: 0,
    selectedAnswers: {},
    shuffledQuestions: {},
  };

  const [state, dispatch] = useReducer(quizReducer, initialState);

  useEffect(() => {
    if (
      quizList.length > 0 &&
      !state.shuffledQuestions[state.currentQuestionIndex]
    ) {
      const shuffledAnswers = shuffleAnswers(
        quizList[state.currentQuestionIndex].correct_answer,
        quizList[state.currentQuestionIndex].incorrect_answers
      );
      dispatch({
        type: "SHUFFLE_ANSWERS",
        payload: { shuffledAnswers },
      });
    }
  }, [quizList, state.currentQuestionIndex]);

  function shuffleAnswers(correct_answer: string, incorrect_answers: string[]) {
    const allAnswers = [correct_answer, ...incorrect_answers];
    for (let i = allAnswers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
    }
    return allAnswers;
  }

  return { state, dispatch };
}
