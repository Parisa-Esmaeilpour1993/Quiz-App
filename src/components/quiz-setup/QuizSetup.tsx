import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import powerButton from "../../assets/images/power-button.svg";
import { QuizContext } from "../../context/QuizContext";
import { getCategory, getData } from "../../services/api/Apis";
import Input from "../../shared/input/Input";
import Select from "../../shared/select/Select";

export default function QuizSetup() {
  const [category, setCategory] = useState<{ id: number; name: string }[]>([]);
  const navigate = useNavigate();
  const quizContext = useContext(QuizContext);
  const [formValues, setFormValues] = useState({
    count: "",
    category: "",
    difficulty: "",
  });

  const [countError, setCountError] = useState("");

  if (!quizContext) {
    return <p className="text-red-500 text-lg">Context not found!</p>;
  }

  const { setQuizList } = quizContext;

  useEffect(() => {
    getCategory().then((res) => {
      setCategory(res);
    });
  }, []);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    if (name === "count") {
      setCountError("");
    }
  }

  function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  }

  function validateCount(count: string): boolean {
    const countValue = Number(count);
    if (countValue < 5 || countValue > 55) {
      setCountError("Please enter a number between 5 and 55.");
      return false;
    }
    setCountError("");
    return true;
  }

  function handleSubmitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { count, category, difficulty } = formValues;

    if (!validateCount(count)) {
      return;
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
        <Input
          label="Number of Questions"
          type="number"
          name="count"
          placeholder="Enter number of questions"
          value={formValues.count}
          onChange={handleInputChange}
          error={countError}
        />
        {/* Category */}
        <Select
          label="Category"
          name="category"
          options={category.map((item) => ({
            value: item.id.toString(),
            label: item.name,
          }))}
          value={formValues.category}
          onChange={handleSelectChange}
        />

        {/* Difficulty */}
        <Select
          label="Difficulty"
          name="difficulty"
          options={[
            { value: "easy", label: "Easy" },
            { value: "medium", label: "Medium" },
            { value: "hard", label: "Hard" },
          ]}
          value={formValues.difficulty}
          onChange={handleSelectChange}
        />
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
