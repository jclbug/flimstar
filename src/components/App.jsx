import { useState } from "react";
import Nav from "./Nav";
import ResultList from "./ResultList";
import WatchList from "./WatchList";

export default function App() {
  const [totalMovie, setTotalMovie] = useState(0);
  const [query, setQuery] = useState("");
  const [selectedMovieID, setSelectedMovieID] = useState(null);

  return (
    <div className="flex flex-col gap-5 h-screen text-(--normal-text)">
      <Nav onSetQuery={setQuery} totalMovie={totalMovie} />
      <div className="flex-grow grid grid-cols-[1fr_2fr] gap-5 ml-auto mr-auto h-[85%] max-w-[1920px] w-full">
        <ResultList
          themoviedbAPI={themoviedbAPI}
          omdbAPI={omdbAPI}
          query={query}
          selectedMovieID={selectedMovieID}
          onSetTotalMovie={setTotalMovie}
          onSetSelectedMovieID={setSelectedMovieID}
        />
        <WatchList
          // rate={rate}
          omdbAPI={omdbAPI}
          selectedMovieID={selectedMovieID}
          onSetSelectedMovieID={setSelectedMovieID}
          // setRate={setRate}
        />
      </div>
    </div>
  );
}
