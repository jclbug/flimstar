"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

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

export default TrailerModal;
