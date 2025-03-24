import { useState, useEffect } from "react";
import WatchListHead from "./WatchListHead";
import WatchListMovies from "./WatchListMovies";
import MovieInfo from "./MovieInfo";

export default function WatchList({
  rate,
  omdbAPI,
  selectedMovieID,
  onSetSelectedMovieID,
  setRate,
}) {
  const [movieData, setMovieData] = useState({});
  const [prevID, setPrevID] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hideMovieInfo, setHideMovieInfo] = useState("left-full");
  const [trailerID, setTrailerID] = useState("");

  const [watchlistedMovie, setWatchlistedMovie] = useState(
    JSON.parse(localStorage.getItem("watchlistedMovie")) || []
  );

  const [countMovieInWatchlist, setCountMovieInWatchlist] = useState(0);

  useEffect(
    function () {
      selectedMovieID
        ? setHideMovieInfo("left-0")
        : setHideMovieInfo("left-full");

      setCountMovieInWatchlist(Object.keys(watchlistedMovie).length);
    },
    [selectedMovieID, watchlistedMovie]
  );

  return (
    <div className="relative bg-[var(--color-background-500)] rounded-lg w-full overflow-hidden max-h-screen h-full ">
      <WatchListHead
        countMovieInWatchlist={countMovieInWatchlist}
        watchlistedMovie={watchlistedMovie}
      />
      <WatchListMovies
        prevID={prevID}
        onSetPrevID={setPrevID}
        omdbAPI={omdbAPI}
        selectedMovieID={selectedMovieID}
        watchlistedMovie={watchlistedMovie}
        onSetWatchlistedMovie={setWatchlistedMovie}
        onSetSelectedMovieID={onSetSelectedMovieID}
        onSetIsLoading={setIsLoading}
        onSetMovieData={setMovieData}
        onSetTrailerID={setTrailerID}
      />
      <MovieInfo
        trailerID={trailerID}
        movieData={movieData}
        isLoading={isLoading}
        prevID={prevID}
        rate={rate}
        omdbAPI={omdbAPI}
        watchlistedMovie={watchlistedMovie}
        hideMovieInfo={hideMovieInfo}
        onSetHideMovieInfo={setHideMovieInfo}
        selectedMovieID={selectedMovieID}
        onSetSelectedMovieID={onSetSelectedMovieID}
        onSetWatchlistedMovie={setWatchlistedMovie}
        setRate={setRate}
      />
    </div>
  );
}
