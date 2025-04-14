import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import { Movie, MovieResponse } from "../types/movie";

interface MovieListPageProps {
  category: "popular" | "now_playing" | "top_rated" | "upcoming";
}

const MovieListPage = ({ category }: MovieListPageProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // ✅ 카테고리가 바뀔 때 페이지 초기화
  useEffect(() => {
    setPage(1);
  }, [category]);

  const fetchMovies = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const { data } = await axios.get<MovieResponse>(
        `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
          },
        }
      );
      setMovies(data.results);
    } catch (err) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [category, page]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-40">
        <div className="w-10 h-10 border-4 border-purple-300 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  if (isError)
    return (
      <div className="text-center mt-10 text-red-500">
        에러가 발생했습니다. 다시 시도해주세요.
      </div>
    );

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          &lt;
        </button>
        <span>{page} 페이지</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 bg-purple-300 text-white rounded"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default MovieListPage;
