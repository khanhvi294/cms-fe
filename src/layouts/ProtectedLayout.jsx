import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { appRoutes } from "../routes/appRouter";

const ProtectedLayout = () => {
  const { isLogin } = useSelector((state) => state.user.data);

  return (
    <>
      {isLogin && <Outlet />}
      {!isLogin && <Navigate to={appRoutes.LOGIN} replace />}
    </>
  );
};

export default ProtectedLayout;
