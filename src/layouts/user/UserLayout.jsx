import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import HeaderMenu from "./components/HeaderMenu";

const UserLayout = () => {
  return (
    <div className="flex flex-col h-screen bg-slate-100">
      {/* user */}
      <Header />
      <div className="flex-1 overflow-scroll">
        <div className="bg-white h-14 drop-shadow-md ">
          <HeaderMenu />
        </div>
        <div className="w-[1289px] m-auto  h-[1000px]  py-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
