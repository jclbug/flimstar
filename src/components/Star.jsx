// export default function Star({
//   id,
//   rate,
//   imdbId,
//   rating,
//   setRating,
//   onSetRate,
//   onSetHover,
// }) {
//   return (
//     <div className="flex items-center">
//       <span
//         onClick={() => {
//           if (!rating.some((rate) => rate.imdbID === imdbId)) {
//             const rt = {
//               imdbID: imdbId,
//               rating: id,
//             };
//             setRating([...rating, rt]);
//           } else {
//             setRating(() =>
//               rating.map((rate) => {
//                 if (rate.imdbID === imdbId) {
//                   return { ...rate, rating: id };
//                 } else return rate;
//               })
//             );
//           }
//           onSetRate(id);
//         }}
//         onMouseEnter={() => onSetHover(id)}
//         className="w-[30px] inline-block cursor-pointer"
//       >
//         <img
//           src={rate >= id ? "filledStar.svg" : "emptyStar.svg"}
//           alt=""
//           className="w-full"
//         />
//       </span>
//     </div>
//   );
// }

export default function Star({
  id,
  rate,
  movieID,
  userRating,
  onSetHover,
  setUserRating,
}) {
  return (
    <div className="flex items-center">
      <span
        onClick={() => {
          setUserRating({ ...userRating, [movieID]: id });
        }}
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
