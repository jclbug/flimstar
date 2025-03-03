import { useState, useEffect } from "react";
import WatchListHead from "./WatchListHead";
import WatchListMovies from "./WatchListMovies";
import MovieInfo from "./MovieInfo";

export default function WatchList({
  apiKey,
  selectedMovieID,
  onSetSelectedMovieID,
}) {
  const [hideMovieInfo, setHideMovieInfo] = useState("left-full");
  const [watchlistedMovie, setWatchlistedMovie] = useState([]);
  const [movieInWatchlist, setMovieInWatchlist] = useState(0);

  useEffect(
    function () {
      selectedMovieID
        ? setHideMovieInfo("left-0")
        : setHideMovieInfo("left-full");

      setMovieInWatchlist(watchlistedMovie.length);
    },
    [selectedMovieID, watchlistedMovie]
  );

  return (
    <div className="relative bg-[var(--color-background-500)] rounded-lg w-full overflow-hidden max-h-screen h-full ">
      <WatchListHead movieInWatchlist={movieInWatchlist} />
      <WatchListMovies
        watchlistedMovie={watchlistedMovie}
        onSetWatchlistedMovie={setWatchlistedMovie}
      />
      <MovieInfo
        apiKey={apiKey}
        watchlistedMovie={watchlistedMovie}
        hideMovieInfo={hideMovieInfo}
        onSetHideMovieInfo={setHideMovieInfo}
        selectedMovieID={selectedMovieID}
        onSetSelectedMovieID={onSetSelectedMovieID}
        onSetWatchlistedMovie={setWatchlistedMovie}
      />
    </div>
  );
}
