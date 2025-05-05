import { useState } from "react";

export const useSignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [nickname, setNickname] = useState("");

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = password.length >= 6;
  const isPasswordMatch = password === confirm;
  const isNicknameValid = nickname.trim().length > 0;
  const isFormValid =
    isEmailValid && isPasswordValid && isPasswordMatch && isNicknameValid;

  return {
    email,
    setEmail,
    password,
    setPassword,
    confirm,
    setConfirm,
    nickname,
    setNickname,
    isEmailValid,
    isPasswordValid,
    isPasswordMatch,
    isNicknameValid,
    isFormValid,
  };
};
