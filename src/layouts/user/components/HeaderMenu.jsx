const HeaderMenu = () => {
  return (
    <div className="w-[1289px] m-auto">
      <ul className="flex h-full hover:cursor-pointer">
        <li
          className="px-3 py-4  hover:bg-slate-300"
          style={{ paddingTop: "auto", paddingBottom: "auto" }}
        >
          Cuộc thi
        </li>
        <li className="px-3 py-4  hover:bg-slate-300">Bài kiểm tra</li>
        <li className="px-3 py-4  hover:bg-slate-300">Bảng xếp hạng</li>
      </ul>
    </div>
  );
};

export default HeaderMenu;
