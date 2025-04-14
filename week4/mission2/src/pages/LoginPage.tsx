// src/pages/LoginPage.tsx
import { useForm } from "../hooks/useForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi";
import TopBar from "../components/TopBar";

const LoginPage = () => {
  const navigate = useNavigate();
  const {
    email,
    setEmail,
    password,
    setPassword,
    isEmailValid,
    isPasswordValid,
    isFormValid,
  } = useForm();

  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:8000/login", {
        email,
        password,
      });

      const { accessToken } = res.data;
      localStorage.setItem("token", accessToken);
      alert("로그인 성공!");
    } catch (err: any) {
      setError("로그인 실패. 이메일과 비밀번호를 확인해주세요.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <TopBar />

      {/* 로그인 박스 */}
      <div className="flex justify-center items-center py-16">
        <div className="w-[400px] bg-zinc-900 p-8 rounded-md shadow-md space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <button onClick={() => navigate(-1)}>
              <FiArrowLeft size={20} />
            </button>
            <h2 className="text-2xl font-bold">로그인</h2>
          </div>

          <button className="flex items-center justify-center gap-2 w-full border border-white py-2 rounded hover:border-pink-500">
            <FaGoogle />
            구글 로그인
          </button>

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-600"></div>
            <span className="px-3 text-sm text-gray-400">OR</span>
            <div className="flex-grow border-t border-gray-600"></div>
          </div>

          <input
            type="email"
            placeholder="이메일을 입력해주세요!"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded bg-black border border-white text-white placeholder-gray-400 focus:outline-none focus:border-pink-500"
          />
          {!isEmailValid && email && (
            <p className="text-sm text-pink-500">
              올바른 이메일 형식을 입력하세요.
            </p>
          )}

          <input
            type="password"
            placeholder="비밀번호를 입력해주세요!"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded bg-black border border-white text-white placeholder-gray-400 focus:outline-none focus:border-pink-500"
          />
          {!isPasswordValid && password && (
            <p className="text-sm text-pink-500">
              비밀번호는 6자 이상이어야 해요.
            </p>
          )}

          <button
            disabled={!isFormValid}
            onClick={handleLogin}
            className={`w-full py-2 rounded transition-all ${
              isFormValid
                ? "bg-pink-500 hover:bg-pink-600"
                : "bg-zinc-700 text-gray-400"
            }`}
          >
            로그인
          </button>

          {error && <p className="text-center text-pink-400">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
