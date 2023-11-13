import {
  Route,
  Routes,
  createBrowserRouter,
  useLocation,
} from "react-router-dom";
import UserLayout from "../layouts/user/UserLayout";
import CompetitionListPage from "../pages/competition/CompetitionListPage";
import CompetitionPage from "../pages/competition/CompetitionPage";
import LoginPage from "../pages/login/login";
import AdminLayout from "../layouts/admin/AdminLayout";

import ClassListPage from "../pages/class/ClassListPage";
import HomePage from "../pages/home/HomePage";
import Employees from "../features/admin/Employees/Employees";
import Students from "../features/admin/Student/Students";
import Classes from "../features/admin/Classes/Classes";

export const listRouter = [
  {
    element: <UserLayout />,
    children: [{ path: "/", element: <LoginPage /> }],
  },
];

export const AppRouter = () => {
  const { pathname } = useLocation();
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<UserLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/competitions" element={<CompetitionListPage />} />
        <Route path="/classes" element={<ClassListPage />} />
        <Route path="/detail" element={<CompetitionPage />} />
      </Route>
      <Route element={<AdminLayout />}>
        <Route path="/admin/students" element={<Students />} />
        <Route path="/admin/employees" element={<Employees />} />
        <Route path="/admin/classes" element={<Classes />} />
      </Route>
    </Routes>
  );
};

export const router = createBrowserRouter([
  { path: "*", Component: AppRouter },
]);
