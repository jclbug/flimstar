import { useState, useEffect } from "react";
import MovieSubData from "./MovieSubData";
import Star from "./Star";
import Filmmakers from "./Filmmakers";
import LoadingMsg from "./LoadingMsg";
import OtherRatings from "./OtherRatings";

export default function MovieInfo({
  apiKey,
  watchlistedMovie,
  hideMovieInfo,
  selectedMovieID,
  onSetHideMovieInfo,
  onSetSelectedMovieID,
  onSetWatchlistedMovie,
}) {
  const [rate, setRate] = useState("");
  const [hover, setHover] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [movieData, setMovieData] = useState({});
  const [prevID, setPrevID] = useState("");
  const [watchlist, setWatchlist] = useState(false);
  const [watched, setWatched] = useState(false);
  const [rating, setRating] = useState([]);

  useEffect(
    function () {
      async function fetchMovieDetails(id) {
        setPrevID(id);
        console.log(prevID);
        setIsLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`
        );
        const data = await res.json();
        setMovieData(data);
        setIsLoading(false);
        console.log(data);
      }

      fetchMovieDetails(selectedMovieID);
    },
    [selectedMovieID ? selectedMovieID : prevID]
  );

  // setting browser tab title on movie open

  document.title =
    selectedMovieID === prevID && selectedMovieID !== null
      ? "Movie | " + movieData.Title
      : "Flimstr";

  useEffect(() => {
    if (watchlistedMovie.some((m) => m.imdbID === selectedMovieID))
      setWatchlist(true);
    else setWatchlist(false);
  }, [selectedMovieID]);

  function handleAddRemoveWatchlist() {
    setWatchlist(!watchlist);

    if (!watchlistedMovie.some((m) => m.imdbID === movieData.imdbID)) {
      const movie = {
        Title: movieData.Title,
        Rating: movieData.imdbRating,
        Type: movieData.Type,
        Year: movieData.Year,
        Runtime: movieData.Runtime,
        imdbID: movieData.imdbID,
        Poster: movieData.Poster,
        isWatched: false,
        isWatchlisted: true,
        YourRating: 0,
      };
      onSetWatchlistedMovie([...watchlistedMovie, movie]);
    } else
      onSetWatchlistedMovie(
        watchlistedMovie.filter(
          (m) => m.imdbID !== movieData.imdbID || m.isWatched
        )
      );
  }

  function handleWatchedOrNot() {
    console.log("hello");

    if (!watched) {
      watchlistedMovie.map((m) => {
        if (m.imdbID === movieData.imdbID) {
          m.isWatched = true;
        }
        return m;
      });
    }

    setWatched(!watched);
  }

  return (
    <div
      className={`overflow-scroll scrollbar-hidden h-full w-full bg-(--color-background-500) flex flex-col gap-15 h-full absolute top-0 ${hideMovieInfo} duration-400`}
    >
      {isLoading ? (
        <LoadingMsg message={"Loading..."} />
      ) : (
        <>
          <div className="flex gap-5 relative bg-(--color-background-100)">
            <button
              onClick={() => {
                onSetHideMovieInfo("left-full");
                onSetSelectedMovieID(null);
              }}
              className="flex items-center justify-center rounded-[5rem] rotate-y-180 absolute top-[10px] left-[10px] bg-[#ffffff8c] cursor-pointer w-[60px] h-[60px]"
            >
              <img src="back.svg" alt="back button" className="w-[80%]" />
            </button>
            <span className="min-w-[230px] h-[350px] flex">
              <img src={movieData.Poster} alt="" className="w-full h-full" />
            </span>
            <div className="p-[24px] flex flex-col justify-around">
              <p className="text-4xl font-medium text-(--color-dark)">
                {movieData.Title}
              </p>
              <MovieSubData
                heading="Released Date: "
                data={movieData.Released}
                emoji="🗓️"
              />
              <MovieSubData
                heading="Run Time: "
                data={movieData.Runtime}
                emoji="⏰"
              />
              <MovieSubData
                heading="IMDB Rating:  "
                data={movieData.imdbRating}
                emoji="⭐"
              />
              <MovieSubData
                heading="IMDB Votes:  "
                data={movieData.imdbVotes}
                emoji="👦🏼"
              />
              <p className="text-lg text-(--heading)">
                <span className="font-bold">Genre: </span>{" "}
                {movieData.Genre?.split(",").join(" 𐄁")}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-around  pl-[24px] pr-[24px]">
            <div className="p-[24px] pl-[48px] pr-[48px] rounded-xl bg-(--color-background-100)">
              <div
                onMouseLeave={() => setHover(0)}
                className="flex items-center gap-1"
              >
                {Array.from({ length: 10 }, (_, i) => (
                  <Star
                    key={i}
                    rating={rating}
                    id={i + 1}
                    rate={hover ? hover : rate}
                    imdbId={movieData.imdbID}
                    onSetHover={setHover}
                    onSetRate={setRate}
                    setRating={setRating}
                  />
                ))}
                <p className="ml-[10px] text-2xl font-bold w-[25px]">
                  {hover ? hover : rate}
                </p>
              </div>
            </div>
            <div className="text-(--heading) flex flex-col gap-[5px]">
              <button
                onClick={() => handleAddRemoveWatchlist()}
                className={`${
                  watchlist
                    ? "bg-(--selected) text-(--color-background-500)"
                    : "bg-(--color-background-100)"
                }  pl-[24px] pr-[24px] pt-[7px] pb-[7px]  rounded-[5px] text-lg font-bold cursor-pointer hover:bg-(--selected) hover:text-(--color-background-500) duration-[200ms]`}
              >
                {watchlist ? "Watchlisted" : "Add to watchlist"}
              </button>
              <button
                onClick={() => handleWatchedOrNot()}
                className={` ${
                  watched
                    ? "bg-(--selected) text-(--color-background-500)"
                    : "bg-(--color-background-100)"
                } bg-(--color-background-100)  pl-[24px] pr-[24px] pt-[7px] pb-[7px] rounded-[5px] text-lg font-bold cursor-pointer hover:bg-(--selected) hover:text-(--color-background-500) duration-[200ms]`}
              >
                {watched ? "Watched" : "Did you watched?"}
              </button>
            </div>
          </div>
          <div className="text-xl flex flex-col gap-[48px] pl-[64px] pr-[64px] mb-[48px] border-t-(--color-dark) border-t-1">
            <div className="flex gap-[24px] mt-[48px] mb-[48px]">
              {movieData.Ratings?.map((rating) => (
                <OtherRatings
                  rating={rating}
                  key={rating.Source + rating.Value}
                />
              ))}
            </div>

            <Filmmakers title={"Actors: "} maker={movieData.Actors} />
            <Filmmakers title={"Directors: "} maker={movieData.Director} />
            <Filmmakers title={"Writers: "} maker={movieData.Writer} />
            <Filmmakers title={"Box office: "} maker={movieData.BoxOffice} />
            <Filmmakers title={"Awards: "} maker={movieData.Awards} />
            <Filmmakers title={"Languages: "} maker={movieData.Language} />
            <Filmmakers title={"Country: "} maker={movieData.Country} />

            <div className="text-xl h-full">
              <p className="text-3xl font-bold text-(--heading) mb-[16px]">
                Movie Plot
              </p>
              <p>{movieData.Plot}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
