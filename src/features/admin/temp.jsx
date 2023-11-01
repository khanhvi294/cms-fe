import Table from "../../components/Table/Table";
import Navbar from "../../layouts/admin/components/Navbar";
import Header from "../../layouts/admin/components/Header";

const Temp = () => {
  //admin

  return (
    /* admin */

    <div className="flex flex-col overflow-hidden h-screen bg-slate-100">
      <div className="flex h-full">
        {/* nav */}
        <Navbar />
        <div className="flex-1">
          <div className="h-16 bg-white px-5 border  shadow-sm">
            <Header />
          </div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Temp;
