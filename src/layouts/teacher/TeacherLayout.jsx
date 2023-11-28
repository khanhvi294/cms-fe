import { Outlet } from "react-router-dom";
import Header from "./components/Header";

const TeacherLayout = () => {
  return (
    <div>
      <Header />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default TeacherLayout;
