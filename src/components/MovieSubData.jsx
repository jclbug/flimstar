export default function MovieSubData({ heading = "", data, emoji = "" }) {
  return (
    <p className="text-lg text-(--heading)">
      <span className="font-bold">{heading} </span> {emoji + " "} {data}
    </p>
  );
}
