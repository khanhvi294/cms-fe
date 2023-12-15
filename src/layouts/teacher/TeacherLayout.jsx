import { Navigate, Outlet } from "react-router-dom";
import Header from "./components/Header";
import { ROLES } from "../../configs/role";
import { appRoutes } from "../../routes/appRouter";
import { useSelector } from "react-redux";

const TeacherLayout = () => {
  const userRole = useSelector((state) => state.user?.data?.info?.role);
  const isTeacher = userRole === ROLES.TEACHER;

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header />
      <div className="flex-1 overflow-scroll ">
        {isTeacher && <Outlet />}
        {userRole === ROLES.STUDENT && <Navigate to={appRoutes.HOME} replace />}
        {userRole === ROLES.EMPLOYEE && (
          <Navigate to={appRoutes.ADASHBOARD} replace />
        )}
      </div>
    </div>
  );
};

export default TeacherLayout;
