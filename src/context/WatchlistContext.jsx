"use client";

import { createContext, useState, useContext, useEffect } from "react";

// Create context
const WatchlistContext = createContext();

// Create provider component
export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load watchlist from localStorage on initial render
  useEffect(() => {
    const storedWatchlist = localStorage.getItem("watchlist");
    if (storedWatchlist) {
      try {
        setWatchlist(JSON.parse(storedWatchlist));
      } catch (error) {
        console.error("Error parsing watchlist from localStorage:", error);
        setWatchlist([]);
      }
    }
    setIsLoaded(true);
  }, []);

  // Update localStorage whenever watchlist changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
    }
  }, [watchlist, isLoaded]);

  // Check if an item is in the watchlist
  const isInWatchlist = (id, mediaType) => {
    return watchlist.some(
      (item) => item.id === id && item.mediaType === mediaType
    );
  };

  // Add item to watchlist
  const addToWatchlist = (item) => {
    if (!isInWatchlist(item.id, item.mediaType)) {
      setWatchlist((prev) => [...prev, item]);
      return true; // Successfully added
    }
    return false; // Already in watchlist
  };

  // Remove item from watchlist
  const removeFromWatchlist = (id, mediaType) => {
    setWatchlist((prev) =>
      prev.filter((item) => !(item.id === id && item.mediaType === mediaType))
    );
  };

  // Toggle item in watchlist (add if not present, remove if present)
  const toggleWatchlist = (item) => {
    if (isInWatchlist(item.id, item.mediaType)) {
      removeFromWatchlist(item.id, item.mediaType);
      return false; // Item was removed
    } else {
      addToWatchlist(item);
      return true; // Item was added
    }
  };

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        toggleWatchlist,
        isInWatchlist,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

// Custom hook to use the watchlist context
export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (context === undefined) {
    throw new Error("useWatchlist must be used within a WatchlistProvider");
  }
  return context;
}
