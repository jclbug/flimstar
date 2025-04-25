"use client";

import { useState } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useWatchlist } from "../context/WatchlistContext";

function WatchlistButton({
  movie,
  size = "small",
  showText = false,
  className = "",
}) {
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const [isAnimating, setIsAnimating] = useState(false);

  const isInList = isInWatchlist(movie.id, movie.mediaType);

  const handleToggleWatchlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsAnimating(true);
    toggleWatchlist(movie);

    // Reset animation after a short delay
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  const sizeClasses = {
    small: "p-1.5 rounded-full",
    medium: "p-2 rounded-full",
    large: "p-3 rounded-lg",
  };

  const iconSizes = {
    small: "h-4 w-4",
    medium: "h-5 w-5",
    large: "h-6 w-6",
  };

  return (
    <button
      onClick={handleToggleWatchlist}
      className={`
        ${sizeClasses[size]} 
        ${
          isInList
            ? "bg-red-600 text-white"
            : "bg-black/60 text-white hover:bg-black/80"
        } 
        transition-all duration-200 
        ${isAnimating ? "scale-125" : "scale-100"}
        ${className}
      `}
      title={isInList ? "Remove from watchlist" : "Add to watchlist"}
    >
      <div className="flex items-center">
        {isInList ? (
          <BookmarkCheck className={iconSizes[size]} />
        ) : (
          <Bookmark className={iconSizes[size]} />
        )}

        {showText && (
          <span className="ml-2 text-sm">
            {isInList ? "In Watchlist" : "Add to Watchlist"}
          </span>
        )}
      </div>
    </button>
  );
}

export default WatchlistButton;
