import { useState, useEffect } from "react";
import Movie from "./Movie";
import LoadingMsg from "./LoadingMsg";

export default function ResultList({
  apiKey,
  selectedMovieID,
  query,
  onSetTotalMovie,
  onSetSelectedMovieID,
}) {
  const [movieArray, setMovieArray] = useState([]);
  const [movieNotFound, setMovieNotFound] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      const requestAbort = new AbortController();
      onSetTotalMovie(0);
      setMovieArray([]);
      async function fetchMovie(query) {
        try {
          if (query.length > 2) {
            setIsLoading(true);
            const res = await fetch(
              `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`,
              { signal: requestAbort.signal }
            );

            const data = await res.json();

            if (data.Response == "False") {
              throw new Error("Movie not found");
            }
            setIsLoading(false);
            setMovieNotFound(false);
            console.log(data.Search);
            setMovieArray(data.Search);
            onSetTotalMovie(data.Search.length);
          }
        } catch (err) {
          setIsLoading(false);
          setMovieNotFound(true);
        }
      }
      fetchMovie(query || "how to train your dragon");

      return function () {
        requestAbort.abort();
      };
    },
    [query]
  );
  return (
    <ul className="bg-[var(--color-background-500)] rounded-lg w-full overflow-auto scrollbar-hidden max-h-screen h-full ">
      {movieArray &&
        movieArray.map((film) => (
          <Movie
            selectedMovieID={selectedMovieID}
            movie={film}
            key={film.imdbID}
            onSetSelectedMovieID={onSetSelectedMovieID}
          />
        ))}

      {movieNotFound ? (
        <LoadingMsg message={"Movie Not Found"} />
      ) : isLoading ? (
        <LoadingMsg message={"Loading..."} />
      ) : (
        ""
      )}
    </ul>
  );
}
