"use client";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Star, Calendar, Play, Tv } from "lucide-react";
import MovieCard from "../components/MovieCard";
import TrailerModal from "../components/TrailerModal";
import WatchlistButton from "../components/WatchlistButton";

function TvDetails() {
  const { id } = useParams();
  const [tvShow, setTvShow] = useState(null);
  const [similarShows, setSimilarShows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    const fetchTvDetails = async () => {
      try {
        setIsLoading(true);

        // Fetch TV show details
        const tvResponse = await fetch(
          `https://api.themoviedb.org/3/tv/${id}?api_key=63cde8fd18a00a64a918a37fe2fc455b&language=en-US&append_to_response=credits,videos`
        );
        const tvData = await tvResponse.json();
        setTvShow(tvData);

        // Get trailer key if available
        const trailer = tvData.videos?.results?.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        if (trailer) {
          setTrailerKey(trailer.key);
        } else {
          // If no trailer in TMDB, try to find one with YouTube API
          await fetchYouTubeTrailer(tvData.name, tvData.first_air_date);
        }

        // Fetch similar TV shows
        const similarResponse = await fetch(
          `https://api.themoviedb.org/3/tv/${id}/similar?api_key=63cde8fd18a00a64a918a37fe2fc455b&language=en-US&page=1`
        );
        const similarData = await similarResponse.json();
        setSimilarShows(similarData.results.slice(0, 10));
      } catch (error) {
        console.error("Error fetching TV show details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchYouTubeTrailer = async (title, firstAirDate) => {
      try {
        const year = firstAirDate ? new Date(firstAirDate).getFullYear() : "";
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

    if (id) {
      fetchTvDetails();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="h-[400px] bg-gray-800 rounded-lg animate-pulse mb-8"></div>
        <div className="h-8 bg-gray-800 rounded animate-pulse w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-800 rounded animate-pulse w-full mb-2"></div>
        <div className="h-4 bg-gray-800 rounded animate-pulse w-full mb-2"></div>
        <div className="h-4 bg-gray-800 rounded animate-pulse w-2/3"></div>
      </div>
    );
  }

  if (!tvShow)
    return <div className="container mx-auto px-4 py-8">TV show not found</div>;

  const backdropUrl = tvShow.backdrop_path
    ? `https://image.tmdb.org/t/p/original${tvShow.backdrop_path}`
    : "https://via.placeholder.com/1920x1080?text=No+Backdrop";

  const posterUrl = tvShow.poster_path
    ? `https://image.tmdb.org/t/p/w500${tvShow.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Poster";

  // Create TV show object for watchlist
  const tvShowForWatchlist = {
    id: tvShow.id,
    title: tvShow.name,
    posterPath: tvShow.poster_path,
    voteAverage: tvShow.vote_average,
    mediaType: "tv",
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Backdrop */}
      <div className="relative h-[70vh] min-h-[500px]">
        <img
          src={backdropUrl || "/placeholder.svg"}
          alt={tvShow.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
      </div>

      {/* TV Show Info */}
      <div className="container mx-auto px-4 -mt-72 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="flex-shrink-0 w-full md:w-1/4 max-w-xs mx-auto md:mx-0">
            <div className="aspect-[2/3] relative rounded-lg overflow-hidden shadow-2xl">
              <img
                src={posterUrl || "/placeholder.svg"}
                alt={tvShow.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="flex-grow">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl md:text-5xl font-bold">{tvShow.name}</h1>
              <WatchlistButton
                movie={tvShowForWatchlist}
                size="large"
                showText={true}
                className="ml-4"
              />
            </div>

            {tvShow.tagline && (
              <p className="text-gray-400 text-lg italic mb-4">
                {tvShow.tagline}
              </p>
            )}

            <div className="flex flex-wrap gap-2 mb-4">
              {tvShow.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 mb-6">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                <span>{tvShow.vote_average?.toFixed(1)} / 10</span>
              </div>

              {tvShow.number_of_seasons && (
                <div className="flex items-center">
                  <Tv className="h-4 w-4 mr-1" />
                  <span>
                    {tvShow.number_of_seasons}{" "}
                    {tvShow.number_of_seasons === 1 ? "Season" : "Seasons"}
                  </span>
                </div>
              )}

              {tvShow.first_air_date && (
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{new Date(tvShow.first_air_date).getFullYear()}</span>
                </div>
              )}
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Overview</h2>
              <p className="text-gray-300">{tvShow.overview}</p>
            </div>

            {/* Cast */}
            {tvShow.credits?.cast?.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Cast</h2>
                <div className="flex gap-4 overflow-x-auto pb-4">
                  {tvShow.credits.cast.slice(0, 10).map((person) => (
                    <div key={person.id} className="flex-shrink-0 w-20">
                      <div className="aspect-square relative rounded-full overflow-hidden mb-2">
                        <img
                          src={
                            person.profile_path
                              ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
                              : "https://via.placeholder.com/200x200?text=No+Image"
                          }
                          alt={person.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-xs text-center line-clamp-2">
                        {person.name}
                      </p>
                      <p className="text-xs text-gray-400 text-center line-clamp-1">
                        {person.character}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Trailer Button */}
            {trailerKey && (
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center"
                onClick={() => setShowTrailer(true)}
              >
                <Play className="mr-2 h-4 w-4" />
                Watch Trailer
              </button>
            )}
          </div>
        </div>

        {/* Similar TV Shows */}
        {similarShows.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Similar TV Shows</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {similarShows.map((show) => (
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
          </div>
        )}
      </div>

      {/* Trailer Modal */}
      {showTrailer && trailerKey && (
        <TrailerModal
          videoId={trailerKey}
          onClose={() => setShowTrailer(false)}
        />
      )}
    </div>
  );
}

export default TvDetails;
