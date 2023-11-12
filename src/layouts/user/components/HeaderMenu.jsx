import { Link } from "react-router-dom";

const HeaderMenu = () => {
  return (
    <div className="w-[1289px] m-auto">
      <ul className="flex h-full hover:cursor-pointer">
        <li className="hover:bg-slate-300">
          <Link to={`/`}>Cuộc thi</Link>
        </li>
        <li className="px-3 py-4  hover:bg-slate-300">Lớp học của tôi</li>
        <li className="px-3 py-4  hover:bg-slate-300">Bảng xếp hạng</li>
      </ul>
    </div>
  );
};

export default HeaderMenu;
