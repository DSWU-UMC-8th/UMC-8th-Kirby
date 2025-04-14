import { Link } from "react-router-dom";
import { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Link to={`/movies/${movie.id}`}>
      <div className="relative overflow-hidden rounded-lg shadow-lg group hover:scale-105 transition-transform">
        <img
          src={`${IMAGE_BASE_URL}${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-auto object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center px-4 text-white backdrop-blur-sm">
          <h3 className="text-lg font-bold mb-2 text-center">{movie.title}</h3>
          <p className="text-sm text-gray-200 line-clamp-3 text-center">
            {movie.overview}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
