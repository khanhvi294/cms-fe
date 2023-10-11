import Header from "./user/components/Header";
import HeaderMenu from "./user/components/HeaderMenu";

const UserLayout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen bg-slate-100">
      {/* user */}
      <Header />
      <div className="flex-1 overflow-scroll">
        <div className="bg-white h-14 drop-shadow-md ">
          <HeaderMenu />
        </div>
        <div className="w-[1289px] m-auto  h-[1000px]  py-5">{children}</div>
      </div>
    </div>
  );
};

export default UserLayout;
