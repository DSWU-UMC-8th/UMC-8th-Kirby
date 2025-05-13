import { Outlet } from "react-router-dom";
import TopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar";

const RootLayout = () => {
  return (
    <div className="min-h-screen flex bg-black text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="p-4 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RootLayout;
