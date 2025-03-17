export default function Filmmakers({ title, maker }) {
  return (
    <div className="flex items-start gap-[16px]">
      <p className="font-bold text-xl text-(--heading)">{title} </p>
      <p className="text-(--color-light)">
        {maker?.includes("$") ? maker : maker?.split(",").join(" 𐄁")}
      </p>
    </div>
  );
}
