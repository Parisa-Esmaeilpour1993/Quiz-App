import { Routes, Route } from "react-router-dom";
import WelcomeScreen from "../welcome-screen/WelcomeScreen";
import QuizSetup from "../quiz-setup/QuizSetup";
import QuizQuestion from "../quiz-question/QuizQuestion";
import Result from "../result/Result";

export default function HomeComponent() {
  return (
    <Routes>
      <Route path="/" element={<WelcomeScreen />} />
      <Route path="/setup" element={<QuizSetup />} />
      <Route path="/question" element={<QuizQuestion />} />
      <Route path="/result" element={<Result />} />
    </Routes>
  );
}
