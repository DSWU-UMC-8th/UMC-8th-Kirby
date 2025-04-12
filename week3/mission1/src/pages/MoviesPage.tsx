import { useEffect, useState } from "react";
import axios from "axios";
import { Movie, MovieResponse } from "../types/movie";
import MovieCard from "../components/MovieCard";

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await axios.get<MovieResponse>(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
          },
        }
      );
      setMovies(data.results);
    };

    fetchMovies();
  }, []);

  return (
    <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MoviesPage;
