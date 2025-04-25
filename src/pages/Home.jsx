"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Film, Tv, TrendingUp, Bookmark } from "lucide-react";
import MovieCard from "../components/MovieCard";
import HeroSection from "../components/HeroSection";
import { useWatchlist } from "../context/WatchlistContext";

function Home() {
  const navigate = useNavigate();
  const { watchlist } = useWatchlist();
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingSeries, setTrendingSeries] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularSeries, setPopularSeries] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [dramaMovies, setDramaMovies] = useState([]);
  const [sciFiMovies, setSciFiMovies] = useState([]);
  const [actionSeries, setActionSeries] = useState([]);
  const [comedySeries, setComedySeries] = useState([]);
  const [dramaSeries, setDramaSeries] = useState([]);
  const [sciFiSeries, setSciFiSeries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("trending");
  const [activeMovieSection, setActiveMovieSection] = useState("popular");
  const [activeSeriesSection, setActiveSeriesSection] = useState("popular");
  const [activeTrendingSection, setActiveTrendingSection] = useState("movies");

  // Genre IDs for reference
  const genreIds = {
    action: 28,
    comedy: 35,
    drama: 18,
    sciFi: 878,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Fetch trending movies for hero section
        const trendingMoviesResponse = await fetch(
          "https://api.themoviedb.org/3/trending/movie/day?api_key=63cde8fd18a00a64a918a37fe2fc455b"
        );
        const trendingMoviesData = await trendingMoviesResponse.json();
        setTrendingMovies(trendingMoviesData.results);

        // Fetch trending TV series
        const trendingSeriesResponse = await fetch(
          "https://api.themoviedb.org/3/trending/tv/day?api_key=63cde8fd18a00a64a918a37fe2fc455b"
        );
        const trendingSeriesData = await trendingSeriesResponse.json();
        setTrendingSeries(trendingSeriesData.results);

        // Fetch popular movies
        const moviesResponse = await fetch(
          "https://api.themoviedb.org/3/movie/popular?api_key=63cde8fd18a00a64a918a37fe2fc455b&language=en-US&page=1"
        );
        const moviesData = await moviesResponse.json();
        setPopularMovies(moviesData.results);

        // Fetch popular TV series
        const seriesResponse = await fetch(
          "https://api.themoviedb.org/3/tv/popular?api_key=63cde8fd18a00a64a918a37fe2fc455b&language=en-US&page=1"
        );
        const seriesData = await seriesResponse.json();
        setPopularSeries(seriesData.results);

        // Fetch movies by genre
        const fetchMoviesByGenre = async (genreId, setter) => {
          const response = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=63cde8fd18a00a64a918a37fe2fc455b&with_genres=${genreId}&sort_by=popularity.desc&page=1`
          );
          const data = await response.json();
          setter(data.results);
        };

        // Fetch TV series by genre
        const fetchSeriesByGenre = async (genreId, setter) => {
          const response = await fetch(
            `https://api.themoviedb.org/3/discover/tv?api_key=63cde8fd18a00a64a918a37fe2fc455b&with_genres=${genreId}&sort_by=popularity.desc&page=1`
          );
          const data = await response.json();
          setter(data.results);
        };

        // Fetch all genre-specific content
        await Promise.all([
          fetchMoviesByGenre(genreIds.action, setActionMovies),
          fetchMoviesByGenre(genreIds.comedy, setComedyMovies),
          fetchMoviesByGenre(genreIds.drama, setDramaMovies),
          fetchMoviesByGenre(genreIds.sciFi, setSciFiMovies),
          fetchSeriesByGenre(genreIds.action, setActionSeries),
          fetchSeriesByGenre(genreIds.comedy, setComedySeries),
          fetchSeriesByGenre(genreIds.drama, setDramaSeries),
          fetchSeriesByGenre(genreIds.sciFi, setSciFiSeries),
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const renderTrendingContent = () => {
    return (
      <>
        <div className="flex mb-6 border-b border-gray-800">
          <button
            onClick={() => setActiveTrendingSection("movies")}
            className={`px-6 py-3 font-medium ${
              activeTrendingSection === "movies"
                ? "text-red-600 border-b-2 border-red-600"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Movies
          </button>
          <button
            onClick={() => setActiveTrendingSection("series")}
            className={`px-6 py-3 font-medium ${
              activeTrendingSection === "series"
                ? "text-red-600 border-b-2 border-red-600"
                : "text-gray-400 hover:text-white"
            }`}
          >
            TV Series
          </button>
        </div>

        {activeTrendingSection === "movies" ? (
          <>
            <h2 className="text-2xl font-bold mb-4">Trending Movies</h2>
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
                : trendingMovies
                    .slice(0, 10)
                    .map((movie) => (
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
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">Trending TV Series</h2>
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
                : trendingSeries
                    .slice(0, 10)
                    .map((series) => (
                      <MovieCard
                        key={series.id}
                        id={series.id}
                        title={series.name}
                        posterPath={series.poster_path}
                        voteAverage={series.vote_average}
                        mediaType="tv"
                      />
                    ))}
            </div>
          </>
        )}
      </>
    );
  };

  const renderMovieContent = () => {
    const getMoviesBySection = () => {
      switch (activeMovieSection) {
        case "popular":
          return popularMovies;
        case "action":
          return actionMovies;
        case "comedy":
          return comedyMovies;
        case "drama":
          return dramaMovies;
        case "sciFi":
          return sciFiMovies;
        default:
          return popularMovies;
      }
    };

    const currentMovies = getMoviesBySection();

    return (
      <>
        <div className="flex mb-6 overflow-x-auto border-b border-gray-800 pb-1">
          <button
            onClick={() => setActiveMovieSection("popular")}
            className={`px-6 py-3 font-medium whitespace-nowrap ${
              activeMovieSection === "popular"
                ? "text-red-600 border-b-2 border-red-600"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Popular
          </button>
          <button
            onClick={() => setActiveMovieSection("action")}
            className={`px-6 py-3 font-medium whitespace-nowrap ${
              activeMovieSection === "action"
                ? "text-red-600 border-b-2 border-red-600"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Action
          </button>
          <button
            onClick={() => setActiveMovieSection("comedy")}
            className={`px-6 py-3 font-medium whitespace-nowrap ${
              activeMovieSection === "comedy"
                ? "text-red-600 border-b-2 border-red-600"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Comedy
          </button>
          <button
            onClick={() => setActiveMovieSection("drama")}
            className={`px-6 py-3 font-medium whitespace-nowrap ${
              activeMovieSection === "drama"
                ? "text-red-600 border-b-2 border-red-600"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Drama
          </button>
          <button
            onClick={() => setActiveMovieSection("sciFi")}
            className={`px-6 py-3 font-medium whitespace-nowrap ${
              activeMovieSection === "sciFi"
                ? "text-red-600 border-b-2 border-red-600"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Sci-Fi
          </button>
        </div>

        <h2 className="text-2xl font-bold mb-4">
          {activeMovieSection === "popular"
            ? "Popular Movies"
            : activeMovieSection === "action"
            ? "Action Movies"
            : activeMovieSection === "comedy"
            ? "Comedy Movies"
            : activeMovieSection === "drama"
            ? "Drama Movies"
            : "Sci-Fi Movies"}
        </h2>
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
            : currentMovies
                .slice(0, 10)
                .map((movie) => (
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
      </>
    );
  };

  const renderSeriesContent = () => {
    const getSeriesBySection = () => {
      switch (activeSeriesSection) {
        case "popular":
          return popularSeries;
        case "action":
          return actionSeries;
        case "comedy":
          return comedySeries;
        case "drama":
          return dramaSeries;
        case "sciFi":
          return sciFiSeries;
        default:
          return popularSeries;
      }
    };

    const currentSeries = getSeriesBySection();

    return (
      <>
        <div className="flex mb-6 overflow-x-auto border-b border-gray-800 pb-1">
          <button
            onClick={() => setActiveSeriesSection("popular")}
            className={`px-6 py-3 font-medium whitespace-nowrap ${
              activeSeriesSection === "popular"
                ? "text-red-600 border-b-2 border-red-600"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Popular
          </button>
          <button
            onClick={() => setActiveSeriesSection("action")}
            className={`px-6 py-3 font-medium whitespace-nowrap ${
              activeSeriesSection === "action"
                ? "text-red-600 border-b-2 border-red-600"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Action
          </button>
          <button
            onClick={() => setActiveSeriesSection("comedy")}
            className={`px-6 py-3 font-medium whitespace-nowrap ${
              activeSeriesSection === "comedy"
                ? "text-red-600 border-b-2 border-red-600"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Comedy
          </button>
          <button
            onClick={() => setActiveSeriesSection("drama")}
            className={`px-6 py-3 font-medium whitespace-nowrap ${
              activeSeriesSection === "drama"
                ? "text-red-600 border-b-2 border-red-600"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Drama
          </button>
          <button
            onClick={() => setActiveSeriesSection("sciFi")}
            className={`px-6 py-3 font-medium whitespace-nowrap ${
              activeSeriesSection === "sciFi"
                ? "text-red-600 border-b-2 border-red-600"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Sci-Fi
          </button>
        </div>

        <h2 className="text-2xl font-bold mb-4">
          {activeSeriesSection === "popular"
            ? "Popular TV Series"
            : activeSeriesSection === "action"
            ? "Action TV Series"
            : activeSeriesSection === "comedy"
            ? "Comedy TV Series"
            : activeSeriesSection === "drama"
            ? "Drama TV Series"
            : "Sci-Fi TV Series"}
        </h2>
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
            : currentSeries
                .slice(0, 10)
                .map((series) => (
                  <MovieCard
                    key={series.id}
                    id={series.id}
                    title={series.name}
                    posterPath={series.poster_path}
                    voteAverage={series.vote_average}
                    mediaType="tv"
                  />
                ))}
        </div>
      </>
    );
  };

  const renderWatchlistContent = () => {
    if (watchlist.length === 0) {
      return (
        <>
          <h2 className="text-2xl font-bold mb-6">Your Watchlist</h2>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Bookmark className="h-16 w-16 text-gray-600 mb-4" />
            <h3 className="text-xl font-medium mb-2">
              Your watchlist is empty
            </h3>
            <p className="text-gray-400 max-w-md">
              Add movies and TV shows to your watchlist to keep track of what
              you want to watch.
            </p>
          </div>
        </>
      );
    }

    // Separate movies and TV shows
    const movies = watchlist.filter((item) => item.mediaType === "movie");
    const tvShows = watchlist.filter((item) => item.mediaType === "tv");

    return (
      <>
        <h2 className="text-2xl font-bold mb-6">Your Watchlist</h2>

        {movies.length > 0 && (
          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-4">Movies</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {movies.map((movie) => (
                <MovieCard
                  key={`movie-${movie.id}`}
                  id={movie.id}
                  title={movie.title}
                  posterPath={movie.posterPath}
                  voteAverage={movie.voteAverage}
                  mediaType="movie"
                />
              ))}
            </div>
          </div>
        )}

        {tvShows.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-4">TV Shows</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {tvShows.map((show) => (
                <MovieCard
                  key={`tv-${show.id}`}
                  id={show.id}
                  title={show.title}
                  posterPath={show.posterPath}
                  voteAverage={show.voteAverage}
                  mediaType="tv"
                />
              ))}
            </div>
          </div>
        )}
      </>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "trending":
        return renderTrendingContent();
      case "movies":
        return renderMovieContent();
      case "series":
        return renderSeriesContent();
      case "watchlist":
        return renderWatchlistContent();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      {!isLoading && trendingMovies.length > 0 && (
        <HeroSection movies={trendingMovies.slice(0, 5)} />
      )}

      {/* Search Bar */}
      <div className="container mx-auto px-4 py-6">
        <form onSubmit={handleSearch} className="flex gap-2 max-w-xl mx-auto">
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
            <Search className="h-4 w-4 mr-2" />
            Search
          </button>
        </form>
      </div>

      {/* Content Tabs */}
      <div className="container mx-auto px-4 py-8">
        <div className="w-full">
          <div className="grid w-full grid-cols-4 mb-8 bg-gray-900 rounded-lg overflow-hidden">
            <button
              onClick={() => setActiveTab("trending")}
              className={`flex items-center justify-center gap-2 py-3 transition-colors ${
                activeTab === "trending"
                  ? "bg-red-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <TrendingUp className="h-4 w-4" />
              <span>Trending</span>
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
              <span>Movies</span>
            </button>
            <button
              onClick={() => setActiveTab("series")}
              className={`flex items-center justify-center gap-2 py-3 transition-colors ${
                activeTab === "series"
                  ? "bg-red-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Tv className="h-4 w-4" />
              <span>TV Series</span>
            </button>
            <button
              onClick={() => setActiveTab("watchlist")}
              className={`flex items-center justify-center gap-2 py-3 transition-colors ${
                activeTab === "watchlist"
                  ? "bg-red-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Bookmark className="h-4 w-4" />
              <span>Watchlist</span>
            </button>
          </div>

          <div className="space-y-4">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
