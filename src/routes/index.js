import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/login/login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
]);
