import React from "react";

export default function Movie({ children, movie, openMovie }) {
  const [drag, close] = React.Children.toArray(children);
  return (
    <li className="flex items-center cursor-pointer hover:bg-[#003d47] duration-[200ms]">
      {drag}
      <div
        onClick={openMovie}
        className={`flex gap-8 ${
          children ? "pl-5 pr-5 pt-8 pb-8" : "p-8"
        }   items-center w-full`}
      >
        <span
          style={{
            backgroundSize: "100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundImage: `url(${movie?.Poster}), url("poster-placeholder.png")`,
          }}
          className="min-w-[100px] w-[100px] h-[140px] flex"
        ></span>
        <div className="flex flex-col gap-5 pt-[10px] pb-[10px] justify-around w-full">
          <p className="text-2xl text-(--heading) font-bold">{movie?.Title}</p>
          <div className="flex gap-4 justify-between max-w-[50%]">
            {movie.Rating ? <p>⭐ {movie.Rating}</p> : ""}
            {movie.Runtime ? <p>⏰ {movie.Runtime}</p> : ""}
            <p>🗓️ {movie?.Year}</p>

            <p>Type: {movie?.Type}</p>
          </div>
        </div>
        {children ? (
          <button className="cursor-pointer w-[80px]">{close}</button>
        ) : (
          ""
        )}
      </div>
    </li>
  );
}
