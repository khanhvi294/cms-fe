import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";

const AdminLayout = () => {
  return (
    <div className="flex flex-col overflow-hidden h-screen ">
      <div className="flex h-full">
        {/* nav */}
        <Navbar />
        <div className="flex-1 ">
          <div className="h-16 bg-white px-5 border shadow-sm">
            <Header />
          </div>
          <div className="w-[1120px] m-auto py-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
