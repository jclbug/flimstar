export default function Nav({ onSetQuery, totalMovie }) {
  return (
    <nav className="flex justify-between max-w-[2200px] w-full ml-auto mr-auto bg-(--color-dark) items-center text-(--color-background-500) font-bold text-2xl pt-[16px] pb-[16px] pl-[48px] pr-[48px] ">
      <div className="flex items-center">
        <img src="logo3.svg" className="w-[48px]" />
        <p className="mt-[18px] ml-[-15px]">Flimstr</p>
      </div>
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
