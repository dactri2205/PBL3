import { useState } from "react";
import TutorStudentTable from "../../components/tutor/TutorStudentTable";
import TutorRequestCard from "../../components/tutor/TutorRequestCard";
import { tutorStudents, tutorRequests } from "../../mock/mockTutorStudents";

export default function Students() {
  const [tab, setTab] = useState("list");

  return (
    <div>
      <div className="tutor-page__header">
        <div>
          <h1 className="tutor-page__title">Quản lý học viên</h1>
          <p className="tutor-page__subtitle">
            Quản lý danh sách và phê duyệt học viên mới.
          </p>
        </div>

        <button className="tutor-btn tutor-btn--primary">Thêm học viên</button>
      </div>

      <div className="tutor-students__tabs">
        <button
          className={`tutor-students__tab ${tab === "list" ? "tutor-students__tab--active" : ""}`}
          onClick={() => setTab("list")}
        >
          Danh sách học viên
        </button>

        <button
          className={`tutor-students__tab ${tab === "requests" ? "tutor-students__tab--active" : ""}`}
          onClick={() => setTab("requests")}
        >
          Duyệt học viên mới
        </button>
      </div>

      {tab === "list" ? (
        <TutorStudentTable students={tutorStudents} />
      ) : (
        <div>
          {tutorRequests.map((item) => (
            <TutorRequestCard key={item.name} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}