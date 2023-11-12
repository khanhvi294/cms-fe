import { Route, Routes, createBrowserRouter } from "react-router-dom";
import UserLayout from "../layouts/user/UserLayout";
import CompetitionListPage from "../pages/competition/CompetitionListPage";
import CompetitionPage from "../pages/competition/CompetitionPage";
import LoginPage from "../pages/login/login";
import AdminLayout from "../layouts/admin/AdminLayout";
import Temp from "../features/admin/temp";
import ClassListPage from "../pages/class/ClassListPage";

export const listRouter = [
  {
    element: <UserLayout />,
    children: [{ path: "/", element: <LoginPage /> }],
  },
];
export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<UserLayout />}>
        <Route path="/" element={<CompetitionPage />} />
        <Route path="/competitions" element={<CompetitionListPage />} />
        <Route path="/classes" element={<ClassListPage />} />
      </Route>
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<Temp />} />
      </Route>
    </Routes>
  );
};

export const router = createBrowserRouter([
  { path: "*", Component: AppRouter },
]);
