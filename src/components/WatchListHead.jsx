export default function WatchListHead({ countMovieInWatchlist }) {
  return (
    <div className="flex gap-10 justify-between items-center p-[24px] pr-[48px] pl-[48px] bg-(--color-background-900) m-[5px] rounded-t-lg rounded-r-lg text-(--color-dark)">
      <p className="text-3xl font-bold">WatchList</p>
      <div className="flex gap-10 text-xl font-bold ml-auto">
        <p>📽️ {countMovieInWatchlist} Movies</p>
        <p>⏰ 123 Min</p>
      </div>
    </div>
  );
}
