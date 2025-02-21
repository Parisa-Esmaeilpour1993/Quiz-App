import { ReactNode } from "react";
import WelcomePage from "../pages/welcome-page/WelcomePage";
import SetupPage from "../pages/setup-page/SetupPage";
import QuizPage from "../pages/quiz-page/QuizPage";
import ResultPage from "../pages/result-page/ResultPage";
import { ROUTES } from "./route";

interface RoutesType {
  path: string;
  element: ReactNode;
}

export const routeArray: RoutesType[] = [
  {
    path: ROUTES.home,
    element: <WelcomePage />,
  },
  {
    path: ROUTES.setup,
    element: <SetupPage />,
  },
  {
    path: ROUTES.question,
    element: <QuizPage />,
  },
  {
    path: ROUTES.result,
    element: <ResultPage />,
  },
];
