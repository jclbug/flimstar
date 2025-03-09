import { useState, useEffect } from "react";
import Movie from "./Movie";
import LoadingMsg from "./LoadingMsg";

export default function ResultList({
  themoviedbAPI,
  omdbAPI,
  selectedMovieID,
  query,
  onSetTotalMovie,
  onSetSelectedMovieID,
}) {
  const [movieArray, setMovieArray] = useState([]);
  const [movieNotFound, setMovieNotFound] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [randomMovieName, setRandomMovieName] = useState("");

  const randomNum = Math.floor(Math.random() * 18 + 1);

  function randomMovie() {
    setIsLoading(true);
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${themoviedbAPI}&sort_by=popularity.desc&page=${Math.floor(
        Math.random() * 100
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setRandomMovieName(data.results[randomNum].title);
      });
  }

  useEffect(() => {
    randomMovie();
  }, []);

  useEffect(
    function () {
      const requestAbort = new AbortController();
      onSetTotalMovie(0);
      setMovieArray([]);

      async function fetchMovie(movieName) {
        if (movieName.length > 1) {
          setIsLoading(true);
          setMovieNotFound(false);
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${omdbAPI}&s=${movieName}`,
            { signal: requestAbort.signal }
          );

          const data = await res.json();

          if (data.Response === "False" && !query) {
            console.log("hello");
            randomMovie();
          } else if (data.Response === "False") {
            setMovieNotFound(true);
          } else {
            setMovieNotFound(false);
            setIsLoading(false);
            setMovieArray(data.Search);
            onSetTotalMovie(data.Search.length);
          }
        }
      }
      fetchMovie(query || randomMovieName);

      return function () {
        requestAbort.abort();
      };
    },
    [query, randomMovieName]
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
