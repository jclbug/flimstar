import { useEffect } from "react";
import Movie from "./Movie";
import { config } from "./config";
import { Reorder } from "framer-motion";

const { trailer } = config;

export default function WatchListMovies({
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
        <Reorder.Group
          values={watchlistedMovie}
          onReorder={onSetWatchlistedMovie}
        >
          {watchlistedMovie.map((movie) => (
            <Reorder.Item value={movie} key={movie.imdbID}>
              <Movie
                key={movie.imdbID}
                movie={movie}
                openMovie={(e) => {
                  if (e.target.dataset.close !== "close")
                    onSetSelectedMovieID(
                      movie.imdbID !== selectedMovieID ? movie.imdbID : null
                    );
                }}
              >
                <span className="inline-block w-[24px] ml-[24px]">
                  <img
                    src="drag.svg"
                    alt="drag button"
                    className="h-full w-full pointer-events-none"
                  />
                </span>
                <img
                  src="close.svg"
                  onClick={() => {
                    const movies = watchlistedMovie.filter(
                      (m) => m.imdbID !== movie.imdbID
                    );
                    onSetWatchlistedMovie(movies);
                  }}
                  className="w-full"
                  data-close="close"
                />
              </Movie>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      )}
    </ul>
  );
}
