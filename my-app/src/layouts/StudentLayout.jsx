import { Outlet } from "react-router-dom";
import StudentSidebar from "../components/student/StudentSidebar";
import StudentTopbar from "../components/student/StudentTopbar";
import "../pages/styles/tokens.css";
import "../pages/styles/student-layout.css";
import "../pages/styles/student-sidebar.css";
import "../pages/styles/student-dashboard.css";
import "../pages/styles/tutor-card.css";

export default function StudentLayout() {
  return (
    <div className="student-layout">
      <aside className="student-layout__sidebar">
        <StudentSidebar />
      </aside>

      <div className="student-layout__main">
        <StudentTopbar />
        <main className="student-layout__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}