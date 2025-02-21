import React, { useState } from "react";

import { toast } from "react-toastify";
import Input from "../shared/input/Input";
import Select from "../shared/select/Select";

interface SetupFormProps {
  category: { id: number; name: string }[];
  onSubmit: (values: {
    count: string;
    category: string;
    difficulty: string;
  }) => void;
}

export default function SetupForm({ category, onSubmit }: SetupFormProps) {
  const [formValues, setFormValues] = useState({
    count: "",
    category: "",
    difficulty: "",
  });
  const [countError, setCountError] = useState("");

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
    onSubmit(formValues);
  }

  return (
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
      </div>
    </form>
  );
}
