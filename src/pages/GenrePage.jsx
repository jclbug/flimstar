"use client";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";

function GenrePage() {
  const { genreId } = useParams();
  const [genre, setGenre] = useState(null);
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("movies");

  useEffect(() => {
    const fetchGenreData = async () => {
      try {
        setIsLoading(true);

        // Fetch genre details
        const genresResponse = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=63cde8fd18a00a64a918a37fe2fc455b&language=en-US`
        );
        const genresData = await genresResponse.json();
        const currentGenre = genresData.genres.find(
          (g) => g.id.toString() === genreId
        );
        setGenre(currentGenre);

        // Fetch movies by genre
        const moviesResponse = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=63cde8fd18a00a64a918a37fe2fc455b&language=en-US&sort_by=popularity.desc&with_genres=${genreId}&page=1`
        );
        const moviesData = await moviesResponse.json();
        setMovies(moviesData.results);

        // Fetch TV shows by genre
        const tvResponse = await fetch(
          `https://api.themoviedb.org/3/discover/tv?api_key=63cde8fd18a00a64a918a37fe2fc455b&language=en-US&sort_by=popularity.desc&with_genres=${genreId}&page=1`
        );
        const tvData = await tvResponse.json();
        setTvShows(tvData.results);
      } catch (error) {
        console.error("Error fetching genre data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGenreData();
  }, [genreId]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="h-8 bg-gray-800 rounded animate-pulse w-1/4 mb-8"></div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Array(10)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="h-64 bg-gray-800 rounded-lg animate-pulse"
              ></div>
            ))}
        </div>
      </div>
    );
  }

  if (!genre) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Genre Not Found</h1>
        <p className="text-gray-400">
          The genre you're looking for doesn't exist or has been removed.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">{genre.name}</h1>

        {/* Tabs */}
        <div className="flex mb-8 border-b border-gray-800">
          <button
            className={`px-6 py-3 font-medium ${
              activeTab === "movies"
                ? "text-red-600 border-b-2 border-red-600"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("movies")}
          >
            Movies
          </button>
          <button
            className={`px-6 py-3 font-medium ${
              activeTab === "tvShows"
                ? "text-red-600 border-b-2 border-red-600"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("tvShows")}
          >
            TV Shows
          </button>
        </div>

        {/* Content */}
        {activeTab === "movies" ? (
          <>
            {movies.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {movies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    posterPath={movie.poster_path}
                    voteAverage={movie.vote_average}
                    mediaType="movie"
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400">No movies found in this genre.</p>
              </div>
            )}
          </>
        ) : (
          <>
            {tvShows.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {tvShows.map((show) => (
                  <MovieCard
                    key={show.id}
                    id={show.id}
                    title={show.name}
                    posterPath={show.poster_path}
                    voteAverage={show.vote_average}
                    mediaType="tv"
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400">
                  No TV shows found in this genre.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default GenrePage;
