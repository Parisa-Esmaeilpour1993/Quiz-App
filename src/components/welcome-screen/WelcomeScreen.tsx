import { useNavigate } from "react-router";
import rocketImg from "../../assets/images/rocket.svg";
import { useState } from "react";

export default function WelcomeScreen() {
  const [isFlying, setIsFlying] = useState(false);
  const navigate = useNavigate();
  const handleStart = () => {
    setIsFlying(true);
    setTimeout(() => navigate("/setup"), 1000);
  };
  return (
    <div className="flex flex-col gap-16 items-center py-16 justify-between text-center min-h-screen bg-gradient-to-br from-purple-800 to-blue-300 text-white">
      <h1 className="text-5xl font-extrabold text-yellow-400 animate-pulse tracking-wide text-shadow-md">
        QUIZ
      </h1>
      <div className="text-xl font-semibold tracking-wide mb-40">
        Welcome to Quiz App
      </div>
      <div className="flex flex-col items-center justify-center gap-8">
        <button
          onClick={handleStart}
          className="px-4 py-2 bg-yellow-500 text-purple-900 font-semibold rounded-lg shadow-lg transition-all duration-500 hover:bg-yellow-400 hover:scale-105 active:scale-95"
        >
          GET START
        </button>
        <img
          src={rocketImg}
          alt="rocket-img"
          className={`w-12 h-12 transition-all duration-1000 ease-out ${
            isFlying ? "translate-y-[-500px] opacity-0" : "opacity-100"
          } `}
        />
      </div>
    </div>
  );
}
