export default function Filmmakers({ title, maker }) {
  return (
    <div className="flex items-center gap-[16px]">
      <p className="font-bold text-2xl text-(--heading)">{title} </p>
      <p className="text-(--color-light)">
        {maker?.includes("$") ? maker : maker?.split(",").join(" 𐄁")}
      </p>
    </div>
  );
}
