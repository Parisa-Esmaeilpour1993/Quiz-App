import { Input, Select } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import powerButton from "../../assets/images/power-button.svg";
import { QuizContext } from "../../context/QuizContext";
import { getCategory, getData } from "../../services/api/Apis";
import { toast } from "react-toastify";

export default function QuizSetup() {
  const [category, setCategory] = useState<{ id: number; name: string }[]>([]);
  const navigate = useNavigate();
  const quizContext = useContext(QuizContext);
  const [formValues, setFormValues] = useState({
    count: "",
    category: "",
    difficulty: "",
  });

  const [countError, setCountError] = useState(""); // State for count error message

  if (!quizContext) {
    return <p className="text-red-500 text-lg">Context not found!</p>;
  }
  const { setQuizList } = quizContext;

  useEffect(() => {
    getCategory().then((res) => {
      setCategory(res);
    });
  }, []);

  // Handle input changes
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (name === "count") {
      setCountError("");
    }
  }

  // Handle select changes
  function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  }

  // Validate count value
  function validateCount(count: string): boolean {
    const countValue = Number(count);
    if (countValue < 5 || countValue > 55) {
      setCountError("Please enter a number between 5 and 55.");
      return false;
    }
    setCountError(""); // Clear error if valid
    return true;
  }

  // Handle form submission
  function handleSubmitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { count, category, difficulty } = formValues;

    // Validate count
    if (!validateCount(count)) {
      return; // Stop further execution if count is invalid
    }

    if (!category && !difficulty) {
      toast("Please select a category and difficulty level.");
      return;
    }
    if (!category) {
      toast("Please select a category level.");
      return;
    }

    if (!difficulty) {
      toast("Please select a difficulty level.");
      return;
    }

    // Fetch data and navigate to the next page
    getData(Number(count), category, difficulty).then((res) => {
      setQuizList(res);
      navigate("/question");
    });
  }


  return (
    <div className="flex flex-col gap-4 items-center p-12 text-center min-h-screen bg-gradient-to-br from-purple-800 to-blue-300 text-white">
      <h1 className="text-5xl font-extrabold text-yellow-400 tracking-wide text-shadow-md">
        QUIZ
      </h1>
      <p className="text-xl font-semibold tracking-wide">Setup Quiz</p>
      <form
        className="w-full text-left flex flex-col gap-8"
        onSubmit={handleSubmitForm}
      >
        {/* Number of Questions */}
        <div>
          <label
            htmlFor="num-questions"
            className="block text-lg font-medium mb-2 text-yellow-400"
          >
            Number of Questions:
          </label>
          <Input
            id="num-questions"
            type="number"
            name="count"
            placeholder="Enter number of questions"
            className={`bg-white text-gray-800 rounded-md ${
              countError ? "border-red-500" : ""
            }`}
            value={formValues.count}
            onChange={handleInputChange}
          />
          {countError && (
            <p className="text-red-500 text-sm mt-1">{countError}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="block text-lg font-medium mb-2 text-yellow-400"
          >
            Category:
          </label>
          <Select
            id="category"
            name="category"
            placeholder="Select category"
            className="bg-white text-gray-800 rounded-md"
            value={formValues.category}
            onChange={handleSelectChange}
          >
            {category.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Select>
        </div>

        {/* Difficulty */}
        <div>
          <label
            htmlFor="difficulty"
            className="block text-lg font-medium mb-2 text-yellow-400"
          >
            Difficulty:
          </label>
          <Select
            id="difficulty"
            name="difficulty"
            placeholder="Select difficulty"
            className="bg-white text-gray-800 rounded-md"
            value={formValues.difficulty}
            onChange={handleSelectChange}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </Select>
        </div>

        {/* Submit Button */}
        <div className="self-center flex flex-col items-center justify-center gap-2 mt-6">
          <button
            className="text-purple-900 font-semibold text-xl rounded-lg transition-all duration-500 hover:text-yellow-400"
            type="submit"
          >
            Start
          </button>
          <img
            src={powerButton}
            alt="power-button"
            className="w-10 h-10 transition-all duration-500 hover:scale-110"
          />
        </div>
      </form>
    </div>
  );
}
