import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MyPage from "./pages/MyPage";
import ProtectedRoute from "./components/ProtectedRoute";
import GoogleCallbackPage from "./pages/GoogleCallbackPage"; // ✅ 콜백 페이지 import

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* ✅ 백엔드가 리디렉션하는 전체 경로를 처리 */}
        <Route
          path="/v1/auth/google/callback"
          element={<GoogleCallbackPage />}
        />

        {/* 보호된 마이페이지 라우트 */}
        <Route
          path="/mypage"
          element={
            <ProtectedRoute>
              <MyPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
