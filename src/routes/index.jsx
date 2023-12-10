import { Route, Routes, createBrowserRouter } from "react-router-dom";

import AdminLayout from "../layouts/admin/AdminLayout";
import ClassListPage from "../pages/class/ClassListPage";
import Classes from "../features/admin/Classes/Classes";
import CollapsibleTable from "../features/admin/demo";
import CompetitionDetail from "../features/admin/Competitions/CompetitionDetail";
import CompetitionListPage from "../pages/competition/CompetitionListPage";
import CompetitionPage from "../pages/competition/CompetitionPage";
import CompetitionResultPage from "../pages/competition/CompetitionResultPage";
import Competitions from "../features/admin/Competitions/Competitions";
import Courses from "../features/admin/Courses/Courses";
import Demo from "../features/teacher/demo";
import Employees from "../features/admin/Employees/Employees";
import ExamForms from "../features/admin/ExamForm/ExamForm";
import HomePage from "../pages/home/HomePage";
import InputScore from "../features/teacher/score";
import LoginPage from "../pages/login/login";
import MyCompetition from "../features/user/myCompetition/MyCompetition";
import Profile from "../features/admin/Profile/Profile";
import Register from "../features/admin/Register/Register";
import RoundJudge from "../features/teacher/round";
import ScoreRound from "../features/admin/Score/Score";
import Students from "../features/admin/Student/Students";
import TeacherLayout from "../layouts/teacher/TeacherLayout";
import UserLayout from "../layouts/user/UserLayout";
import UserScore from "../features/user/Score/Score";
import DashboardAdmin from "../features/admin/Dashboard/Dashboard";
import { appRoutes } from "./appRouter";
import ProfileStudent from "../features/user/ProfileStudent/ProfileStudent";
import ProfileTeacher from "../features/teacher/profile/ProfileTeacher";

// import Rounds from "../features/admin/Rounds/Rounds";

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
        <Route path={appRoutes.MYCOMPETITION} element={<MyCompetition />} />
        <Route path={appRoutes.SCORE} element={<UserScore />} />

        <Route
          path={appRoutes.COMPETITIONS}
          element={<CompetitionListPage />}
        />
        <Route
          path={appRoutes.COMPETITION_RESULT}
          element={<CompetitionResultPage />}
        />
        <Route path={appRoutes.CLASSES} element={<ClassListPage />} />
        <Route
          path={appRoutes.COMPETITION_DETAIL}
          element={<CompetitionPage />}
        />
        <Route path="/profile" element={<ProfileStudent />} />
      </Route>
      <Route element={<AdminLayout />}>
        <Route path={appRoutes.ASTUDENTS} element={<Students />} />
        <Route path={appRoutes.AEMPLOYEES} element={<Employees />} />
        <Route path={appRoutes.ACLASSES} element={<Classes />} />
        <Route path={appRoutes.ACOURSES} element={<Courses />} />
        <Route path={appRoutes.ADASHBOARD} element={<DashboardAdmin />} />
        <Route path={appRoutes.ACOMPETITIONS} element={<Competitions />} />
        <Route path={appRoutes.AREGISTER} element={<Register />} />
        <Route path={appRoutes.ASCORE} element={<ScoreRound />} />

        <Route path="admin/profile" element={<Profile />} />

        <Route
          path={appRoutes.ACOMPETITIONS_DETAIL}
          element={<CompetitionDetail />}
        />
        <Route path="/admin/demo" element={<CollapsibleTable />} />
        <Route path={appRoutes.AEXAMFORMS} element={<ExamForms />} />
        {/* <Route path={appRoutes.AROUNDS} element={<Rounds />} /> */}
      </Route>
      <Route element={<TeacherLayout />}>
        <Route path="/demo" element={<Demo />} />
        <Route path={appRoutes.TROUND} element={<RoundJudge />} />
        <Route path={appRoutes.TSCORE} element={<InputScore />} />
        <Route path="/teacher/profile" element={<ProfileTeacher />} />
      </Route>
    </Routes>
  );
};

export const router = createBrowserRouter([
  { path: "*", Component: AppRouter },
]);
