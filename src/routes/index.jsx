import { Route, Routes, createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/login/login";
import CompetitionListFetch from "../features/user/competitionListFetch/CompetitionListFetch";
import Temp from "../features/admin/temp";
import App from "../App";
import UserLayout from "../layouts/user/UserLayout";
import CompetitionPage from "../pages/competition/CompetitionPage";
import CompetitionListPage from "../pages/competition/CompetitionListPage";

// export const router = createBrowserRouter([
//   {
//     path: "*",
//     Component: AppRouter,
//   },
//   // {
//   //   path: "/login",
//   //   element: <LoginPage />,
//   // },
//   // {
//   //   path: "/admin",
//   //   element: <Temp />,
//   // },
// ]);
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
        <Route path="/list" element={<CompetitionListPage />} />
      </Route>
    </Routes>
  );
};

export const router = createBrowserRouter([
  { path: "*", Component: AppRouter },
]);
