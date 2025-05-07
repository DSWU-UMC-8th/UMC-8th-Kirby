// src/apis/axios.ts
import axios, { AxiosError, AxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

// 요청 인터셉터: Access Token 자동 삽입
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터: Access Token 만료 시 Refresh Token으로 재발급
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // 조건: 401 오류 + 한 번만 재시도
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await api.post("/v1/auth/refresh");
        const newAccessToken = (res.data as any).accessToken;
        localStorage.setItem("accessToken", newAccessToken);

        // 새 토큰으로 Authorization 헤더 다시 설정 후 재요청
        if (originalRequest.headers)
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("🔒 Refresh 실패:", refreshError);
        // 자동 로그아웃 처리
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
