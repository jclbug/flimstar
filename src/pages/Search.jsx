"use client";

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchIcon, Film, Tv } from "lucide-react";
import MovieCard from "../components/MovieCard";

function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get("query") || "";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState({
    movies: [],
    tvShows: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery);
    }
  }, [initialQuery]);

  const performSearch = async (query) => {
    if (!query.trim()) return;

    try {
      setIsLoading(true);

      // Search movies
      const movieResponse = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=63cde8fd18a00a64a918a37fe2fc455b&language=en-US&query=${encodeURIComponent(
          query
        )}&page=1&include_adult=false`
      );
      const movieData = await movieResponse.json();

      // Search TV shows
      const tvResponse = await fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=63cde8fd18a00a64a918a37fe2fc455b&language=en-US&query=${encodeURIComponent(
          query
        )}&page=1&include_adult=false`
      );
      const tvData = await tvResponse.json();

      setSearchResults({
        movies: movieData.results || [],
        tvShows: tvData.results || [],
      });
    } catch (error) {
      console.error("Error searching:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      performSearch(searchQuery);
    }
  };

  const allResults = [
    ...searchResults.movies.map((item) => ({ ...item, mediaType: "movie" })),
    ...searchResults.tvShows.map((item) => ({ ...item, mediaType: "tv" })),
  ].sort((a, b) => b.popularity - a.popularity);

  const getResultsForTab = () => {
    switch (activeTab) {
      case "movies":
        return searchResults.movies.map((movie) => ({
          ...movie,
          mediaType: "movie",
        }));
      case "tvShows":
        return searchResults.tvShows.map((show) => ({
          ...show,
          mediaType: "tv",
        }));
      default:
        return allResults;
    }
  };

  const currentResults = getResultsForTab();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Search</h1>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="flex gap-2 max-w-2xl mb-8">
          <input
            type="text"
            placeholder="Search for movies or TV shows..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 flex items-center"
          >
            <SearchIcon className="h-4 w-4 mr-2" />
            Search
          </button>
        </form>

        {/* Results */}
        {initialQuery && (
          <div className="mb-4">
            <h2 className="text-xl font-semibold">
              {isLoading ? "Searching..." : `Results for "${initialQuery}"`}
            </h2>
            {!isLoading && currentResults.length === 0 && (
              <p className="text-gray-400 mt-2">
                No results found. Try a different search term.
              </p>
            )}
          </div>
        )}

        {/* Tabs */}
        {(searchResults.movies.length > 0 ||
          searchResults.tvShows.length > 0) && (
          <div className="w-full">
            <div className="grid w-full max-w-md grid-cols-3 mb-8 bg-gray-900 rounded-lg overflow-hidden">
              <button
                onClick={() => setActiveTab("all")}
                className={`py-3 transition-colors ${
                  activeTab === "all"
                    ? "bg-red-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                All ({allResults.length})
              </button>
              <button
                onClick={() => setActiveTab("movies")}
                className={`flex items-center justify-center gap-2 py-3 transition-colors ${
                  activeTab === "movies"
                    ? "bg-red-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <Film className="h-4 w-4" />
                Movies ({searchResults.movies.length})
              </button>
              <button
                onClick={() => setActiveTab("tvShows")}
                className={`flex items-center justify-center gap-2 py-3 transition-colors ${
                  activeTab === "tvShows"
                    ? "bg-red-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <Tv className="h-4 w-4" />
                TV Shows ({searchResults.tvShows.length})
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {isLoading
                  ? Array(10)
                      .fill(0)
                      .map((_, index) => (
                        <div
                          key={index}
                          className="h-64 bg-gray-800 rounded-lg animate-pulse"
                        ></div>
                      ))
                  : currentResults.map((item) => (
                      <MovieCard
                        key={`${item.mediaType}-${item.id}`}
                        id={item.id}
                        title={item.title || item.name}
                        posterPath={item.poster_path}
                        voteAverage={item.vote_average}
                        mediaType={item.mediaType}
                      />
                    ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
