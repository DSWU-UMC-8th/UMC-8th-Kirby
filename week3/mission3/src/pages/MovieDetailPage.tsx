import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Movie } from "../types/movie";

interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string;
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
const PROFILE_BASE_URL = "https://image.tmdb.org/t/p/w185";

const MovieDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [cast, setCast] = useState<Cast[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMovieAndCredits = async () => {
      setIsLoading(true);
      try {
        const [movieRes, creditRes] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/movie/${id}?language=ko-KR`, {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
            },
          }),
          axios.get(
            `https://api.themoviedb.org/3/movie/${id}/credits?language=ko-KR`,
            {
              headers: {
                Authorization: `Bearer ${
                  import.meta.env.VITE_TMDB_ACCESS_TOKEN
                }`,
              },
            }
          ),
        ]);
        setMovie(movieRes.data);
        setCast(creditRes.data.cast.slice(0, 15)); // 상위 15명만 표시
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchMovieAndCredits();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="w-10 h-10 border-4 border-purple-300 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!movie)
    return (
      <p className="text-center mt-10">영화 정보를 불러오지 못했습니다.</p>
    );

  return (
    <div className="text-white">
      {/* 배경 및 정보 */}
      <div className="relative w-full min-h-[600px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${IMAGE_BASE_URL}${movie.backdrop_path})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        </div>

        {/* 텍스트 영역 */}
        <div className="relative z-10 max-w-4xl px-6 pt-64 pb-12">
          <h1 className="text-4xl font-extrabold mb-2">{movie.title}</h1>
          <p className="text-gray-300 mb-2">
            {movie.release_date} · {movie.vote_average.toFixed(1)} 점 ·{" "}
            {movie.runtime}분
          </p>
          <p className="leading-relaxed">{movie.overview}</p>
        </div>
      </div>

      {/* 출연진 */}
      <div className="bg-black px-6 py-12">
        <h2 className="text-2xl font-bold mb-6">🎬 감독 / 출연</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
          {cast.map((actor) => (
            <div key={actor.id} className="text-center">
              <img
                src={
                  actor.profile_path
                    ? `${PROFILE_BASE_URL}${actor.profile_path}`
                    : "/default-profile.png"
                }
                alt={actor.name}
                className="w-20 h-20 rounded-full mx-auto object-cover"
              />
              <p className="text-sm mt-2 font-semibold">{actor.name}</p>
              <p className="text-xs text-gray-400">{actor.character}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
