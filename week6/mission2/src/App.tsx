import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MyPage from "./pages/MyPage";
import HomePage from "./pages/HomePage";
import GoogleCallbackPage from "./pages/GoogleCallbackPage";
import ProtectedRoute from "./components/ProtectedRoute";
import RootLayout from "./layout/RootLayout";
import LpDetailPage from "./pages/LpDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/mypage"
            element={
              <ProtectedRoute>
                <MyPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lps/:lpId"
            element={
              <ProtectedRoute>
                <LpDetailPage />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/v1/auth/google/callback"
          element={<GoogleCallbackPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
