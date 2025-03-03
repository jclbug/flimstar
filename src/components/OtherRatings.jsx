export default function OtherRatings({ rating }) {
  return (
    <div className="text-center flex items-center gap-[10px] bg-[#52796f] font-bold text-(--heading) text-lg pt-[10px] pb-[10px] pl-[24px] pr-[24px] rounded-[10px]">
      <p>{rating.Source}:</p>
      <p>{rating.Value}</p>
    </div>
  );
}
