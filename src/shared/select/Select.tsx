import React from "react";
import { Select as ChakraSelect } from "@chakra-ui/react";

interface SelectProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function Select({
  label,
  name,
  options,
  value,
  onChange,
}: SelectProps) {
  return (
    <div>
      <label className="block text-lg font-medium mb-2 text-yellow-400">
        {label}
      </label>
      <ChakraSelect
        name={name}
        value={value}
        onChange={onChange}
        placeholder={`Select ${label.toLowerCase()}`}
        className="bg-white text-gray-800 rounded-md"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </ChakraSelect>
    </div>
  );
}
