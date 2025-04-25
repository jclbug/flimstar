"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import WatchlistButton from "./WatchlistButton";

function MovieCard({ id, title, posterPath, voteAverage, mediaType }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const imageUrl = posterPath
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  const detailsUrl = `/${mediaType}/${id}`;

  // Create movie object for watchlist
  const movie = {
    id,
    title,
    posterPath,
    voteAverage,
    mediaType,
  };

  return (
    <Link
      to={detailsUrl}
      className="group relative overflow-hidden rounded-lg transition-all duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-[2/3] w-full relative">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-800 animate-pulse" />
        )}
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoad={() => setIsLoading(false)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Watchlist button - visible on hover or when in watchlist */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <WatchlistButton movie={movie} />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-sm font-medium text-white line-clamp-2">
            {title}
          </h3>
          <div className="flex items-center mt-1">
            <Star className="h-3 w-3 text-yellow-400 mr-1" />
            <span className="text-xs text-white">
              {voteAverage?.toFixed(1)}
            </span>
            <span className="ml-auto text-xs border border-gray-500 px-1.5 py-0.5 rounded text-gray-300">
              {mediaType === "movie" ? "Movie" : "TV"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
