import { Navigate } from "react-router-dom";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    alert("로그인이 필요한 서비스입니다!");
    return <Navigate to="/login" replace />;
  }

  return children;
}
