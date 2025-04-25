"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

function MoviePlayerModal({ tmdbId, onClose }) {
  const [isLoading, setIsLoading] = useState(true);

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl mx-4 h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute -top-10 right-0 p-2 text-white bg-red-600 rounded-full hover:bg-red-700 transition-colors z-10"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative w-full h-full bg-gray-900">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-gray-600 border-t-red-600 rounded-full animate-spin"></div>
            </div>
          )}
          <iframe
            src={`https://vidsrc.in/embed/movie?tmdb=${tmdbId}`}
            className="w-full h-full"
            frameBorder="0"
            referrerPolicy="origin"
            allowFullScreen
            onLoad={() => setIsLoading(false)}
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default MoviePlayerModal;
