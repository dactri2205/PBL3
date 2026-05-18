import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import Topbar from "../components/admin/Topbar";
import "../styles/admin-layout.css";
import "../styles/admin-sidebar.css";
import "../styles/admin-pages.css";

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <aside className="admin-layout__sidebar">
        <Sidebar />
      </aside>

      <div className="admin-layout__main">
        <Topbar />

        <main className="admin-layout__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
