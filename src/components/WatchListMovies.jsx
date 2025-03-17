import { useEffect } from "react";
import Movie from "./Movie";
import { config } from "./config";
const { trailer } = config;

export default function WatchListMovies({
  movieData,
  prevID,
  watchlistedMovie,
  selectedMovieID,
  omdbAPI,
  onSetWatchlistedMovie,
  onSetSelectedMovieID,
  onSetPrevID,
  onSetIsLoading,
  onSetMovieData,
  onSetTrailerID,
}) {
  function handleTrailer(movieTitle, year) {
    if (!movieTitle) return;
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
      `${movieTitle} ${year}`
    )}%20trailer&key=${trailer}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        onSetTrailerID(data.items[0].id.videoId);
      })
      .catch((e) => console.error(e));
  }

  useEffect(
    function () {
      async function fetchMovieDetails(id) {
        onSetPrevID(id);
        onSetIsLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${omdbAPI}&i=${id}`
        );
        const data = await res.json();

        onSetMovieData(data);
        onSetIsLoading(false);
        handleTrailer(data.Title, data.Year);
      }

      fetchMovieDetails(selectedMovieID);
    },
    [selectedMovieID ? selectedMovieID : prevID]
  );

  return (
    <ul className="bg-[var(--color-background-500)] rounded-lg w-full overflow-scroll scrollbar-hidden h-[88%]">
      {Object.keys(watchlistedMovie).length === 0 ? (
        <p className="h-full leading-[2] font-bold opacity-[0.3] text-center flex justify-center items-center text-4xl mt-[-80px]">
          Add some movies to your watchlist
        </p>
      ) : (
        Object.keys(watchlistedMovie).map((movieID) => (
          <Movie
            key={watchlistedMovie[movieID].imdbID}
            movie={watchlistedMovie[movieID]}
            callBackFun={(e) => {
              if (e.target.dataset.close !== "close")
                onSetSelectedMovieID(
                  movieData.imdbID !== selectedMovieID ? movieID : null
                );
            }}
          >
            <img
              src="close.svg"
              onClick={() => {
                const { [movieID]: _, ...movies } = watchlistedMovie;
                onSetWatchlistedMovie(movies);
              }}
              className="w-full"
              data-close="close"
            />
          </Movie>
        ))
      )}
    </ul>
  );
}
