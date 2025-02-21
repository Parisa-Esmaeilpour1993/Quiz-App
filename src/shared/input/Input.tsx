import React from "react";
import {
  FormControl,
  FormLabel,
  Input as ChakraInput,
  FormErrorMessage,
} from "@chakra-ui/react";

interface InputProps {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export default function Input({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
  error,
}: InputProps) {
  return (
    <FormControl isInvalid={!!error}>
      {" "}
      <FormLabel
        htmlFor={name}
        color="yellow.400"
        fontSize="lg"
        fontWeight="medium"
        mb="2"
      >
        {label}
      </FormLabel>
      <ChakraInput
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        variant="outline"
        size="md"
        borderColor={error ? "red.500" : "gray.300"}
        _hover={{
          borderColor: error ? "red.500" : "blue.300",
        }}
        _focus={{
          borderColor: error ? "red.500" : "blue.500",
        }}
      />
      {error && (
        <FormErrorMessage mt="1" color="red.500" fontSize="sm">
          {error}
        </FormErrorMessage>
      )}
    </FormControl>
  );
}
