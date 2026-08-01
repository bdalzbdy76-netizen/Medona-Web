import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="app-shell">

      <Sidebar />

      <div className="app-shell__content">

        <Navbar />

        <main className="app-shell__main">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default MainLayout;