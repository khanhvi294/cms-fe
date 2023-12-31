import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";
import { ROLES } from "../../configs/role";
import { appRoutes } from "../../routes/appRouter";

const AdminLayout = () => {
  const userRole = useSelector((state) => state.user?.data?.info?.role);
  const isAdmin = userRole === ROLES.EMPLOYEE;

  return (
    <div className="flex flex-col overflow-hidden h-screen ">
      <div className="flex h-full">
        {/* nav */}
        <Navbar />
        <div className="flex-1   overflow-auto">
          <div className="h-16 bg-white px-5 border shadow-sm">
            <Header />
          </div>
          <div className="w-[1120px] bg-white m-auto py-6">
            {isAdmin && <Outlet />}
            {userRole === ROLES.STUDENT && (
              <Navigate to={appRoutes.HOME} replace />
            )}
            {userRole === ROLES.TEACHER && (
              <Navigate to={appRoutes.TROUND} replace />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
