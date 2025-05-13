import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState<string | null>(null);

  // 로그인 상태 감지
  useEffect(() => {
    const storedName = localStorage.getItem("nickname");
    setNickname(storedName);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("nickname");
    alert("로그아웃 되었습니다.");
    navigate("/");
    setNickname(null);
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 h-16 flex justify-between items-center px-6 bg-zinc-900 shadow-md text-white">
      <div className="flex items-center gap-4">
        <button
          onClick={() => {
            if (window.innerWidth < 768) {
              const event = new CustomEvent("toggleSidebar");
              window.dispatchEvent(event);
            }
          }}
          className="p-2 text-white"
        >
          ☰
        </button>

        <h1
          className="text-pink-500 font-bold text-xl cursor-pointer"
          onClick={() => navigate("/")}
        >
          돌려돌려LP판
        </h1>
      </div>

      <div className="flex gap-2 items-center text-sm">
        {nickname ? (
          <>
            <span className="text-gray-200">{nickname}님 반갑습니다.</span>
            <button
              onClick={handleLogout}
              className="px-3 py-1 rounded hover:bg-pink-500 transition-all"
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className="px-3 py-1 rounded hover:bg-pink-500 transition-all"
            >
              로그인
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-3 py-1 rounded hover:bg-pink-500 transition-all"
            >
              회원가입
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TopBar;
