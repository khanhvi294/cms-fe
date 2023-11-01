import { Route, Routes, createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/login/login";
import CompetitionListFetch from "../features/compatition/compatitionListFetch/CompetitionListFetch";
import Temp from "../features/admin/temp";
import App from "../App";
import UserLayout from "../layouts/user/UserLayout";

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
      {listRouter.map((item, index) => (
        <Route key={index} path={item?.path} element={item.element}></Route>
      ))}
      {/* <Route element={<UserLayout />}>
        <Route path="/" element={<LoginPage />} />
      </Route> */}
    </Routes>
  );
};

export const router = createBrowserRouter([
  { path: "*", Component: AppRouter },
]);
