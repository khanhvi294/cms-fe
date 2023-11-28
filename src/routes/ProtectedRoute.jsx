import { useSelector } from "react-redux";
import { ROLES } from "../utils/const";
import { Navigate, useNavigate } from "react-router-dom";
import { appRoutes } from "./appRouter";

const ProtectedRoute = ({ children, allowedRoles, path, ...rest }) => {
  const user = useSelector((state) => state.user?.data?.info);

  return <div>ProtectedRoute</div>;
};

export const RedirectAfterLogin = () => {
  //   const navigate = useNavigate();
  const user = useSelector((state) => state.user?.data?.info);

  if (user?.role === ROLES.EMPLOYEE) {
    return <Navigate to={appRoutes.ACLASSES} />;
  }

  if (user?.role === ROLES.TEACHER) {
    return <Navigate to={appRoutes.demo} />;
  }
  return <Navigate to={appRoutes.HOME} />;
};

export default ProtectedRoute;
