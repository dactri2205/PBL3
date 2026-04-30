import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import TutorSidebar from "../components/tutor/TutorSidebar";
import TutorTopbar from "../components/tutor/TutorTopbar";

import "../styles/tutor/tutor-tokens.css";
import "../styles/tutor/tutor-layout.css";
import "../styles/tutor/tutor-sidebar.css";
import "../styles/tutor/tutor-dashboard.css";
import "../styles/tutor/tutor-classes.css";
import "../styles/tutor/tutor-students.css";
import "../styles/tutor/tutor-finance.css";
import "../styles/tutor/tutor-card.css";
import "../styles/tutor/tutor-subjects.css";
import "../styles/tutor/tutor-schedule.css";

export default function TutorLayout() {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

  // Xóa nội dung tìm kiếm khi chuyển sang trang khác
  useEffect(() => {
    setSearchTerm("");
  }, [location.pathname]);

  const getSearchPlaceholder = () => {
    if (location.pathname.includes("/tutor/classes")) {
      return "Tìm kiếm lớp học theo tên lớp, môn học, lịch học...";
    }

    if (location.pathname.includes("/tutor/students")) {
      return "Tìm kiếm học viên theo tên hoặc môn học...";
    }

    if (location.pathname.includes("/tutor/finance")) {
      return "Tìm kiếm hóa đơn, học viên, lớp học...";
    }

    return "Tìm kiếm lớp học, học viên, hóa đơn...";
  };

  return (
    <div className="tutor-layout">
      <aside className="tutor-layout__sidebar">
        <TutorSidebar />
      </aside>

      <div className="tutor-layout__main">
        <TutorTopbar
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          placeholder={getSearchPlaceholder()}
        />

        <main className="tutor-layout__content">
          <Outlet context={{ searchTerm, setSearchTerm }} />
        </main>
      </div>
    </div>
  );
}
