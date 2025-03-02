import { use, useEffect, useState } from "react";

const apiKey = "698ee22d";
// http://www.omdbapi.com/?i=tt3896198&apikey=698ee22d

export default function App() {
    const [totalMovie, setTotalMovie] = useState(0);
    const [query, setQuery] = useState("");
    const [selectedMovieID, setSelectedMovieID] = useState(null);

    return (
        <div className="flex flex-col gap-5 h-screen text-(--normal-text)">
            <Nav onSetQuery={setQuery} totalMovie={totalMovie} />
            <div className="flex-grow grid grid-cols-[1fr_2fr] gap-5 ml-auto mr-auto h-[85%] max-w-[1920px] w-full">
                <ResultList
                    query={query}
                    selectedMovieID={selectedMovieID}
                    onSetTotalMovie={setTotalMovie}
                    onSetSelectedMovieID={setSelectedMovieID}
                />
                <WatchList
                    selectedMovieID={selectedMovieID}
                    onSetSelectedMovieID={setSelectedMovieID}
                />
            </div>
        </div>
    );
}

function Nav({ onSetQuery, totalMovie }) {
    return (
        <nav className="flex justify-between max-w-[2200px] w-full ml-auto mr-auto bg-(--color-dark) items-center text-(--color-background-500) font-bold text-2xl pt-[16px] pb-[16px] pl-[24px] pr-[24px] ">
            <p>Flimstr</p>
            <input
                onChange={(e) => onSetQuery(e.target.value)}
                type="text"
                placeholder="Search movies . . ."
                className="text-2xl py-2 px-5 rounded-lg shadow-[0_0_5px_rgb(0,171,197)] bg-(--color-light) border-0 w-[40%] min-w-[300px] focus:outline-0"
            />
            <p>Results: {totalMovie}</p>
        </nav>
    );
}

function ResultList({
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

function WatchList({ selectedMovieID, onSetSelectedMovieID }) {
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

function WatchListHead({ movieInWatchlist }) {
    console.log(movieInWatchlist);

    return (
        <div className="flex gap-10 justify-between items-center p-[24px] pr-[48px] pl-[48px] bg-(--color-background-900) m-[5px] rounded-t-lg rounded-r-lg text-(--color-dark)">
            <p className="text-3xl font-bold">WatchList</p>
            <div className="flex gap-10 text-xl font-bold ml-auto">
                <p>📽️ {movieInWatchlist} Movies</p>
                <p>⏰ 123 Min</p>
            </div>
        </div>
    );
}

function WatchListMovies({ watchlistedMovie, onSetWatchlistedMovie }) {
    console.log(watchlistedMovie);

    return (
        <ul className="bg-[var(--color-background-500)] rounded-lg w-full overflow-scroll scrollbar-hidden h-[88%]">
            {watchlistedMovie.map((movie) => (
                <Movie key={movie.imdbID} movie={movie}>
                    <img
                        src="close.svg"
                        onClick={() =>
                            onSetWatchlistedMovie(
                                watchlistedMovie.filter(
                                    (m) => m.imdbID !== movie.imdbID
                                )
                            )
                        }
                        className="w-full"
                    />
                </Movie>
            ))}
        </ul>
    );
}

function MovieInfo({
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
            };
            onSetWatchlistedMovie([...watchlistedMovie, movie]);
        } else
            onSetWatchlistedMovie(
                watchlistedMovie.filter((m) => m.imdbID !== movieData.imdbID)
            );
    }

    function handleWatchedOrNot() {
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
                            <img
                                src="back.svg"
                                alt="back button"
                                className="w-[80%]"
                            />
                        </button>
                        <span className="min-w-[230px] h-[350px] flex">
                            <img
                                src={movieData.Poster}
                                alt=""
                                className="w-full h-full"
                            />
                        </span>
                        <div className="p-[24px] flex flex-col justify-around">
                            <p className="text-4xl font-medium text-(--color-dark)">
                                {movieData.Title}
                            </p>
                            <p>🗓️ {movieData.Released}</p>
                            <p>⏰ {movieData.Runtime} </p>
                            <p>⭐ {movieData.imdbRating} imdb Rating</p>
                            <p>Genre: {movieData.Genre}</p>
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
                                        id={i + 1}
                                        rate={hover ? hover : rate}
                                        onSetHover={setHover}
                                        onSetRate={setRate}
                                    />
                                ))}
                                <p className="ml-[10px] text-2xl font-bold w-[25px]">
                                    {hover ? hover : rate}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-[5px]">
                            <button
                                onClick={() => handleAddRemoveWatchlist()}
                                className={`${
                                    watchlist
                                        ? "bg-(--selected) text-(--color-background-500)"
                                        : "bg-(--color-background-100)"
                                }  pl-[24px] pr-[24px] pt-[7px] pb-[7px] rounded-[5px] text-lg font-bold cursor-pointer hover:bg-(--selected) hover:text-(--color-background-500) duration-[200ms]`}
                            >
                                {watchlist ? "Watchlisted" : "Add to watchlist"}
                            </button>
                            <button
                                onClick={() => handleWatchedOrNot()}
                                className={`${
                                    watched
                                        ? "bg-(--selected) text-(--color-background-500)"
                                        : "bg-(--color-background-100)"
                                } bg-(--color-background-100) pl-[24px] pr-[24px] pt-[7px] pb-[7px] rounded-[5px] text-lg font-bold cursor-pointer hover:bg-(--selected) hover:text-(--color-background-500) duration-[200ms]`}
                            >
                                {watched ? "Watched" : "Did you watched?"}
                            </button>
                        </div>
                    </div>
                    <div className="p-[48px] pt-0 text-xl h-full">
                        {movieData.Plot}
                    </div>
                </>
            )}
        </div>
    );
}

function Star({ id, rate, onSetRate, onSetHover }) {
    return (
        <div>
            <span
                onClick={() => onSetRate(id)}
                onMouseEnter={() => onSetHover(id)}
                className="w-[30px] inline-block cursor-pointer"
            >
                <img
                    src={rate >= id ? "filledStar.svg" : "emptyStar.svg"}
                    alt=""
                    className="w-full"
                />
            </span>
        </div>
    );
}

function Movie({ children, selectedMovieID, movie, onSetSelectedMovieID }) {
    return (
        <li
            onClick={() => {
                onSetSelectedMovieID(
                    movie.imdbID !== selectedMovieID ? movie.imdbID : null
                );
            }}
            className="flex gap-8 p-8 border-b border-(--color-dark) cursor-pointer hover:bg-[#003d47] duration-[200ms] last:border-0 items-center"
        >
            <span className="min-w-[100px] w-[100px] h-[140px] flex ">
                <img src={movie?.Poster} className="w-full rounded-md" />
            </span>
            <div className="flex flex-col gap-5 pt-[10px] pb-[10px] justify-around w-full">
                <p className="text-2xl text-(--heading) font-bold">
                    {movie?.Title}
                </p>
                <div className="flex gap-4 justify-between max-w-[50%]">
                    {movie.Rating ? <p>⭐ {movie.Rating}</p> : ""}
                    {movie.Runtime ? <p>⏰ {movie.Runtime}</p> : ""}
                    <p>🗓️ {movie?.Year}</p>

                    <p>Type: {movie?.Type}</p>
                </div>
            </div>
            {children ? (
                <button className="cursor-pointer w-[80px]">{children}</button>
            ) : (
                ""
            )}
        </li>
    );
}

function LoadingMsg({ message }) {
    return (
        <p className="text-center font-bold text-2xl mt-[48px]">{message}</p>
    );
}
