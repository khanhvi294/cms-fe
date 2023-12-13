import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { ROLES } from "../../configs/role";
import Header from "./components/Header";
import HeaderMenu from "./components/HeaderMenu";

import { appRoutes } from "../../routes/appRouter";

const UserLayout = () => {
  const userRole = useSelector((state) => state.user?.data?.info?.role);
  const isUser = userRole === ROLES.STUDENT;

  return (
    <div className="flex flex-col h-screen bg-slate-100">
      {/* user */}
      <Header />
      <div className="flex-1 overflow-auto">
        <div className="bg-white h-14 drop-shadow-md ">
          <HeaderMenu />
        </div>
        <div className="w-[1289px] m-auto   py-5">
          {isUser && <Outlet />}
          {userRole === ROLES.EMPLOYEE && (
            <Navigate to={appRoutes.ACLASSES} replace />
          )}
          {userRole === ROLES.TEACHER && <Navigate to="/demo" replace />}
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
