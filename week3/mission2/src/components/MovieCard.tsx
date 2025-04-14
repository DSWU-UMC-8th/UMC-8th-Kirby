import { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg group">
      {/* 영화 포스터 */}
      <img
        src={`${IMAGE_BASE_URL}${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-auto object-cover"
      />

      {/* Hover 시 나타나는 텍스트 오버레이 */}
      <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center px-4 text-white backdrop-blur-sm">
        <h3 className="text-lg font-bold mb-2 text-center">{movie.title}</h3>
        <p className="text-sm text-gray-200 line-clamp-3 text-center">
          {movie.overview}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
