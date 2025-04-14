import { useState } from "react";
import TopBar from "../components/TopBar";
import { FaGoogle } from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { useSignupForm } from "../hooks/useSignupForm";

const SignupPage = () => {
  type Step = 1 | 2 | 3;
  const [step, setStep] = useState<Step>(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
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
  } = useSignupForm();

  const handleSignup = async () => {
    try {
      await axios.post("http://localhost:8000/signup", {
        email,
        password,
        nickname,
      });
      alert("회원가입 성공!");
      window.location.href = "/login";
    } catch (err) {
      alert("회원가입 실패. 다시 시도해주세요.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <TopBar />

      <div className="flex justify-center items-center py-16">
        <div className="w-[400px] bg-zinc-900 p-8 rounded-md shadow-md space-y-6">
          {/* 상단 고정 제목 */}
          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={() => setStep((prev) => Math.max(1, prev - 1) as Step)}
            >
              <FiArrowLeft size={20} />
            </button>
            <h2 className="text-2xl font-bold">회원가입</h2>
          </div>

          {/* STEP 1: 이메일 입력 + 구글 로그인 */}
          {step === 1 && (
            <>
              <button className="flex items-center justify-center gap-2 w-full border border-white py-2 rounded hover:border-pink-500">
                <FaGoogle />
                구글 로그인
              </button>

              <div className="flex items-center my-2">
                <div className="flex-grow border-t border-gray-600"></div>
                <span className="px-3 text-sm text-gray-400">OR</span>
                <div className="flex-grow border-t border-gray-600"></div>
              </div>

              <input
                type="email"
                placeholder="이메일을 입력해주세요!"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded bg-black border border-white placeholder-gray-400 focus:outline-none focus:border-pink-500"
              />
              {!isEmailValid && email && (
                <p className="text-sm text-pink-500">
                  올바른 이메일 형식을 입력하세요.
                </p>
              )}
              <button
                disabled={!isEmailValid}
                onClick={() => setStep(2)}
                className={`w-full py-2 rounded ${
                  isEmailValid
                    ? "bg-pink-500 hover:bg-pink-600"
                    : "bg-zinc-700 text-gray-400"
                }`}
              >
                다음
              </button>
            </>
          )}

          {/* STEP 2: 비밀번호 입력 */}
          {step === 2 && (
            <>
              <p className="flex items-center gap-2 text-sm text-gray-300">
                <HiOutlineMail className="text-white" />
                {email}
              </p>

              {/* 비밀번호 입력 */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="비밀번호를 입력해주세요!"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 pr-10 rounded bg-black border border-white placeholder-gray-400 focus:outline-none focus:border-pink-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </button>
              </div>
              {!isPasswordValid && password && (
                <p className="text-sm text-pink-500">
                  비밀번호는 6자 이상이어야 합니다.
                </p>
              )}

              {/* 비밀번호 확인 입력 */}
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="비밀번호를 다시 입력해주세요!"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="w-full px-4 py-2 pr-10 rounded bg-black border border-white placeholder-gray-400 focus:outline-none focus:border-pink-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((prev) => !prev)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400"
                >
                  {showConfirm ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </button>
              </div>
              {!isPasswordMatch && confirm && (
                <p className="text-sm text-pink-500">
                  비밀번호가 일치하지 않습니다.
                </p>
              )}

              <button
                disabled={!(isPasswordValid && isPasswordMatch)}
                onClick={() => setStep(3 as Step)}
                className={`w-full py-2 rounded ${
                  isPasswordValid && isPasswordMatch
                    ? "bg-pink-500 hover:bg-pink-600"
                    : "bg-zinc-700 text-gray-400"
                }`}
              >
                다음
              </button>
            </>
          )}

          {/* STEP 3: 닉네임 입력 + 프로필 이미지 */}
          {step === 3 && (
            <>
              <p className="text-sm text-gray-300">{email}</p>

              <div className="flex justify-center">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                  alt="기본 프로필"
                  className="w-24 h-24 rounded-full mb-4 bg-white"
                />
              </div>

              <input
                type="text"
                placeholder="닉네임을 입력해주세요!"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="w-full px-4 py-2 rounded bg-black border border-white placeholder-gray-400 focus:outline-none focus:border-pink-500"
              />
              <button
                disabled={!isNicknameValid}
                onClick={handleSignup}
                className={`w-full py-2 rounded ${
                  isNicknameValid
                    ? "bg-pink-500 hover:bg-pink-600"
                    : "bg-zinc-700 text-gray-400"
                }`}
              >
                회원가입 완료
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
