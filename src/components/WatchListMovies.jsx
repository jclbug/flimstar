import Movie from "./Movie";

export default function WatchListMovies({
  watchlistedMovie,
  onSetWatchlistedMovie,
}) {
  console.log(Object.keys(watchlistedMovie));

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
          >
            <img
              src="close.svg"
              onClick={() => {
                const { [movieID]: _, ...movies } = watchlistedMovie;
                onSetWatchlistedMovie(movies);
              }}
              className="w-full"
            />
          </Movie>
        ))
      )}
    </ul>
  );
}
