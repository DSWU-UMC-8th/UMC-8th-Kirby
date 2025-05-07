// src/components/TopBar.tsx
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-zinc-900 shadow-md">
      {/* 로고 */}
      <h1
        className="text-pink-500 font-bold text-xl cursor-pointer"
        onClick={() => navigate("/")}
      >
        돌려돌려LP판
      </h1>

      {/* 로그인 / 회원가입 버튼 */}
      <div className="space-x-2">
        <button
          onClick={() => navigate("/login")}
          className="px-4 py-1 rounded text-white hover:bg-pink-500 hover:text-white transition-all"
        >
          로그인
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="px-4 py-1 rounded text-white hover:bg-pink-500 hover:text-white transition-all"
        >
          회원가입
        </button>
      </div>
    </div>
  );
};

export default TopBar;
