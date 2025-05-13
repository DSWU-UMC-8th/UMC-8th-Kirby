// src/pages/GoogleCallbackPage.tsx

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleCallbackPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");

    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      alert("구글 로그인 성공!");
      navigate("/mypage");
    } else {
      alert("구글 로그인 실패: 토큰이 없습니다.");
      navigate("/login");
    }
  }, []);

  return <p className="text-white">로그인 처리 중...</p>;
};

export default GoogleCallbackPage;
