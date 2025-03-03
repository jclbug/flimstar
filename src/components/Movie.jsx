export default function Movie({
  children,
  selectedMovieID,
  movie,
  onSetSelectedMovieID,
}) {
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
        <p className="text-2xl text-(--heading) font-bold">{movie?.Title}</p>
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
