import { Navigate, Outlet, redirect, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import HeaderMenu from "./components/HeaderMenu";
import { useSelector } from "react-redux";
import { ROLES } from "../../configs/role";

import { appRoutes } from "../../routes/appRouter";

const UserLayout = () => {
  const userRole = useSelector((state) => state.user?.data?.info?.role);
  const isUser = userRole === ROLES.STUDENT;

  return (
    <div className="flex flex-col h-screen bg-slate-100">
      {/* user */}
      <Header />
      <div className="flex-1 overflow-scroll">
        <div className="bg-white h-14 drop-shadow-md ">
          <HeaderMenu />
        </div>
        <div className="w-[1289px] m-auto  h-[1000px]  py-5">
          {isUser ? <Outlet /> : <Navigate to={appRoutes.ACLASSES} replace />}
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
