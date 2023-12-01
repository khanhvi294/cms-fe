import { Outlet } from "react-router-dom";
import Header from "./components/Header";

const TeacherLayout = () => {
  return (
    <div className="flex flex-col h-screen bg-white">
      <Header />
      <div className="flex-1 overflow-scroll">
        <Outlet />
      </div>
    </div>
  );
};

export default TeacherLayout;
