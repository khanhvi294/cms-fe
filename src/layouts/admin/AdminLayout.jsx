import Header from "./components/Header";
import Navbar from "./components/Navbar";

const AdminLayout = ({ Children }) => {
  return (
    <div className="flex flex-col overflow-hidden h-screen bg-slate-100">
      <div className="flex h-full">
        {/* nav */}
        <Navbar />
        <div className="flex-1">
          <div className="h-16 bg-white px-5 border shadow-sm">
            <Header />
          </div>
          {Children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
