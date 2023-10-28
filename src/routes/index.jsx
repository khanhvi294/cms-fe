import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/login/login";
import CompetitionListFetch from "../features/compatition/compatitionListFetch/CompetitionListFetch";
import Temp from "../features/admin/temp";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <CompetitionListFetch />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/admin",
    element: <Temp />,
  },
]);
