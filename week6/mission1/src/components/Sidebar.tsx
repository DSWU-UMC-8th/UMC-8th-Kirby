import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const handleResize = () => {
    const isSmall = window.innerWidth < 768;
    setIsMobile(isSmall);
    setIsOpen(!isSmall); // 모바일이면 닫기, 데스크탑이면 열기
  };

  useEffect(() => {
    handleResize(); // 초기 상태
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // TopBar에서 햄버거 클릭 시 사이드바 토글하는 이벤트 리스너
  useEffect(() => {
    const handler = () => {
      setIsOpen((prev) => !prev);
    };
    window.addEventListener("toggleSidebar", handler);
    return () => window.removeEventListener("toggleSidebar", handler);
  }, []);

  return (
    <>
      {/* 모바일 오버레이 */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 사이드바 */}
      <aside
        className={`
    fixed top-16 left-0 h-[calc(100%-4rem)] w-64 z-[60] bg-zinc-900 text-white transition-transform duration-300
    ${
      isMobile
        ? isOpen
          ? "translate-x-0"
          : "-translate-x-full"
        : "translate-x-0"
    }
  `}
      >
        <div className="p-4 font-bold text-pink-500 text-lg">DOLIGO</div>

        <nav className="space-y-4 px-4">
          <Link to="/" className="block hover:text-pink-400">
            🔍 찾기
          </Link>
          <Link to="/mypage" className="block hover:text-pink-400">
            👤 마이페이지
          </Link>
        </nav>

        <div className="absolute bottom-4 left-4 text-gray-400 text-sm">
          탈퇴하기
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
