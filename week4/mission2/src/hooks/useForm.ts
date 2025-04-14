// src/hooks/useForm.ts
import { useState } from "react";

export const useForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = password.length >= 6;
  const isFormValid = isEmailValid && isPasswordValid;

  return {
    email,
    setEmail,
    password,
    setPassword,
    isEmailValid,
    isPasswordValid,
    isFormValid,
  };
};
