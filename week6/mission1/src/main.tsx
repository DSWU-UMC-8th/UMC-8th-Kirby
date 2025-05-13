import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// react-query import 추가
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 클라이언트 인스턴스 생성
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
