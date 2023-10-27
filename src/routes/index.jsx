import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/login/login";
import CompetitionListFetch from "../features/compatition/compatitionListFetch/CompetitionListFetch";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <CompetitionListFetch />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {},
]);
