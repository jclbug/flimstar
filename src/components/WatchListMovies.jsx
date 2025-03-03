import Movie from "./Movie";

export default function WatchListMovies({
  watchlistedMovie,
  onSetWatchlistedMovie,
}) {
  return (
    <ul className="bg-[var(--color-background-500)] rounded-lg w-full overflow-scroll scrollbar-hidden h-[88%]">
      {watchlistedMovie.length === 0 ? (
        <p className="h-full leading-[2] font-bold opacity-[0.3] text-center flex justify-center items-center text-4xl ">
          Add some movies to your watchlist
        </p>
      ) : (
        watchlistedMovie.map((movie) => (
          <Movie key={movie.imdbID} movie={movie}>
            <img
              src="close.svg"
              onClick={() =>
                onSetWatchlistedMovie(
                  watchlistedMovie.filter((m) => m.imdbID !== movie.imdbID)
                )
              }
              className="w-full"
            />
          </Movie>
        ))
      )}
    </ul>
  );
}
