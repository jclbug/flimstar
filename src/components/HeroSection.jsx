"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Play, Info } from "lucide-react";
import { X } from "lucide-react";

function HeroSection({ movies }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const currentMovie = movies[currentIndex];

  useEffect(() => {
    setIsLoading(true);

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [movies.length]);

  // Only fetch trailer when a movie is selected for trailer viewing, not on every slide change
  useEffect(() => {
    if (selectedMovie) {
      fetchTrailer(selectedMovie);
    }
  }, [selectedMovie]);

  const fetchTrailer = async (movie) => {
    try {
      const movieResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=63cde8fd18a00a64a918a37fe2fc455b&language=en-US`
      );
      const movieData = await movieResponse.json();

      const trailer = movieData.results?.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );

      if (trailer) {
        setTrailerKey(trailer.key);
      } else {
        // If no trailer in TMDB, try to find one with YouTube API
        await fetchYouTubeTrailer(movie.title, movie.release_date);
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  const fetchYouTubeTrailer = async (title, releaseDate) => {
    try {
      const year = releaseDate ? new Date(releaseDate).getFullYear() : "";
      const query = `${title} ${year} official trailer`;

      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${encodeURIComponent(
          query
        )}&key=AIzaSyBkUGTjFSohYoAY9sWrPIZJnklscrl90WI`
      );

      const data = await response.json();

      if (data.items && data.items.length > 0) {
        setTrailerKey(data.items[0].id.videoId);
      }
    } catch (error) {
      console.error("Error fetching YouTube trailer:", error);
    }
  };

  const handleWatchTrailer = () => {
    setSelectedMovie(currentMovie);
    setShowTrailer(true);
  };

  const handleCloseTrailer = () => {
    setShowTrailer(false);
    // Don't reset selectedMovie here to avoid re-fetching if modal is reopened
  };

  if (!currentMovie) return null;

  const backdropUrl = `https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`;

  return (
    <div className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-900 animate-pulse" />
        )}
        <img
          src={backdropUrl || "/placeholder.svg"}
          alt={currentMovie.title}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoad={() => setIsLoading(false)}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex flex-col justify-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {currentMovie.title}
          </h1>
          <p className="text-gray-300 mb-6 line-clamp-3 md:line-clamp-4">
            {currentMovie.overview}
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md flex items-center font-medium"
              onClick={handleWatchTrailer}
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Trailer
            </button>
            <Link to={`/movie/${currentMovie.id}`}>
              <button className="bg-transparent border border-white text-white px-6 py-3 rounded-md flex items-center font-medium hover:bg-white/10">
                <Info className="mr-2 h-5 w-5" />
                More Info
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
        {movies.map((_, index) => (
          <button
            key={index}
            className={`h-1.5 rounded-full transition-all ${
              index === currentIndex ? "w-8 bg-red-600" : "w-2 bg-gray-400/50"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      {/* Trailer Modal */}
      {showTrailer && trailerKey && (
        <TrailerModal videoId={trailerKey} onClose={handleCloseTrailer} />
      )}
    </div>
  );
}

function TrailerModal({ videoId, onClose }) {
  const [isLoading, setIsLoading] = useState(true);

  // Store the videoId when the component mounts to prevent changes
  const [stableVideoId] = useState(videoId);

  useEffect(() => {
    // Add event listener to close modal on escape key
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    // Prevent scrolling on body when modal is open
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute -top-10 right-0 p-2 text-white bg-red-600 rounded-full hover:bg-red-700 transition-colors"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative pb-[56.25%] h-0 bg-gray-900">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-gray-600 border-t-red-600 rounded-full animate-spin"></div>
            </div>
          )}
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${stableVideoId}?autoplay=1&rel=0`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => setIsLoading(false)}
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
