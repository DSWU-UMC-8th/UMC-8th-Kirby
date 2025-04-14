// src/router.tsx
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import MovieListPage from "./pages/MovieListPage";
import MovieDetailPage from "./pages/MovieDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "", element: <div>홈입니다!</div> }, // 홈
      { path: "movies/popular", element: <MovieListPage category="popular" /> },
      {
        path: "movies/upcoming",
        element: <MovieListPage category="upcoming" />,
      },
      {
        path: "movies/top-rated",
        element: <MovieListPage category="top_rated" />,
      },
      {
        path: "movies/now-playing",
        element: <MovieListPage category="now_playing" />,
      },
      { path: "/movies/:id", element: <MovieDetailPage /> },
    ],
  },
]);

export default router;
