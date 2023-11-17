import { Route, Routes, createBrowserRouter } from "react-router-dom";
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
import Courses from "../features/admin/Courses/Courses";
import Competitions from "../features/admin/Competitions/Competitions";
import { appRoutes } from "./appRouter";
import ExamForms from "../features/admin/ExamForm/ExamForm";
import Rounds from "../features/admin/Rounds/Rounds";

export const listRouter = [
  {
    element: <UserLayout />,
    children: [{ path: "/", element: <LoginPage /> }],
  },
];

export const AppRouter = () => {
  return (
    <Routes>
      <Route path={appRoutes.LOGIN} element={<LoginPage />} />
      <Route element={<UserLayout />}>
        <Route path={appRoutes.HOME} element={<HomePage />} />
        <Route
          path={appRoutes.COMPETITIONS}
          element={<CompetitionListPage />}
        />
        <Route path={appRoutes.CLASSES} element={<ClassListPage />} />
        <Route path="/detail" element={<CompetitionPage />} />
      </Route>
      <Route element={<AdminLayout />}>
        <Route path={appRoutes.ASTUDENTS} element={<Students />} />
        <Route path={appRoutes.AEMPLOYEES} element={<Employees />} />
        <Route path={appRoutes.ACLASSES} element={<Classes />} />
        <Route path={appRoutes.ACOURSES} element={<Courses />} />
        <Route path={appRoutes.ACOMPETITIONS} element={<Competitions />} />
        <Route path={appRoutes.AEXAMFORMS} element={<ExamForms />} />
        <Route path={appRoutes.AROUNDS} element={<Rounds />} />
      </Route>
    </Routes>
  );
};

export const router = createBrowserRouter([
  { path: "*", Component: AppRouter },
]);
