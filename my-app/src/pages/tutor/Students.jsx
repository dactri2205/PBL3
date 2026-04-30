import { useMemo, useState } from "react";
import TutorStudentTable from "../../components/tutor/TutorStudentTable";
import TutorRequestCard from "../../components/tutor/TutorRequestCard";
import { tutorStudents, tutorRequests } from "../../mock/mockTutorStudents";

const emptyStudentForm = {
  name: "",
  subject: "",
  progress: "",
  next: "",
};

export default function Students() {
  const [tab, setTab] = useState("list");

  const [students, setStudents] = useState(tutorStudents);
  const [requests, setRequests] = useState(tutorRequests);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [formData, setFormData] = useState(emptyStudentForm);

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const keyword = searchTerm.toLowerCase();

      const matchSearch =
        student.name.toLowerCase().includes(keyword) ||
        student.subject.toLowerCase().includes(keyword);

      const matchStatus =
        statusFilter === "all" || student.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [students, searchTerm, statusFilter]);

  const activeStudents = students.filter(
    (student) => student.status === "active"
  );

  const subjectStats = activeStudents.reduce((acc, student) => {
    acc[student.subject] = (acc[student.subject] || 0) + 1;
    return acc;
  }, {});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openAddModal = () => {
    setFormData(emptyStudentForm);
    setIsAddOpen(true);
  };

  const closeAddModal = () => {
    setIsAddOpen(false);
    setFormData(emptyStudentForm);
  };

  const handleAddStudent = (e) => {
    e.preventDefault();

    const newStudent = {
      id: Date.now(),
      name: formData.name,
      subject: formData.subject,
      status: "active",
      progress: Number(formData.progress) || 0,
      next: formData.next || "Chưa có lịch",
    };

    setStudents((prev) => [newStudent, ...prev]);
    closeAddModal();
  };

  const handleApproveRequest = (request) => {
    const newStudent = {
      id: Date.now(),
      name: request.name,
      subject: request.subject,
      status: "active",
      progress: 0,
      next: "Chờ xếp lịch",
    };

    setStudents((prev) => [newStudent, ...prev]);
    setRequests((prev) => prev.filter((item) => item.id !== request.id));
  };

  const handleRejectRequest = (request) => {
    setRequests((prev) => prev.filter((item) => item.id !== request.id));
  };

  const handlePauseStudent = (student) => {
    setStudents((prev) =>
      prev.map((item) =>
        item.id === student.id
          ? {
              ...item,
              status: "suspended",
              next: "Đang tạm dừng",
            }
          : item
      )
    );

    setSelectedStudent(null);
  };

  const handleResumeStudent = (student) => {
    setStudents((prev) =>
      prev.map((item) =>
        item.id === student.id
          ? {
              ...item,
              status: "active",
              next: "Chờ xếp lịch lại",
            }
          : item
      )
    );

    setSelectedStudent(null);
  };

  const handleDeleteStudent = (student) => {
    const confirmDelete = window.confirm(
      `Bạn có chắc muốn xóa học viên "${student.name}" khỏi danh sách không?`
    );

    if (!confirmDelete) return;

    setStudents((prev) => prev.filter((item) => item.id !== student.id));
    setSelectedStudent(null);
  };

  return (
    <div className="tutor-students">
      <div className="tutor-page__header">
        <div>
          <h1 className="tutor-page__title">Quản lý học viên</h1>
          <p className="tutor-page__subtitle">
            Theo dõi danh sách học viên đang theo học và thống kê theo từng môn.
          </p>
        </div>

        <button className="tutor-btn tutor-btn--primary" onClick={openAddModal}>
          <span className="material-symbols-outlined">person_add</span>
          Thêm học viên
        </button>
      </div>

      <section className="tutor-student-stats">
        <div className="tutor-card tutor-student-stats__item">
          <p>Tổng học viên</p>
          <h3>{students.length}</h3>
        </div>

        <div className="tutor-card tutor-student-stats__item">
          <p>Đang học</p>
          <h3>{students.filter((item) => item.status === "active").length}</h3>
        </div>

        <div className="tutor-card tutor-student-stats__item">
          <p>Chờ lịch</p>
          <h3>{students.filter((item) => item.status === "pending").length}</h3>
        </div>

        <div className="tutor-card tutor-student-stats__item">
          <p>Tạm dừng</p>
          <h3>
            {students.filter((item) => item.status === "suspended").length}
          </h3>
        </div>
      </section>

      <section className="tutor-student-subject-stats">
        {Object.keys(subjectStats).length === 0 ? (
          <div className="tutor-card tutor-student-subject-stats__empty">
            Chưa có học viên đang học.
          </div>
        ) : (
          Object.entries(subjectStats).map(([subject, count]) => (
            <div className="tutor-card tutor-student-subject-stats__item" key={subject}>
              <p>{subject}</p>
              <h3>{count} học viên</h3>
            </div>
          ))
        )}
      </section>

      <div className="tutor-students__tabs">
        <button
          className={`tutor-students__tab ${
            tab === "list" ? "tutor-students__tab--active" : ""
          }`}
          onClick={() => setTab("list")}
        >
          Danh sách học viên
        </button>

        <button
          className={`tutor-students__tab ${
            tab === "requests" ? "tutor-students__tab--active" : ""
          }`}
          onClick={() => setTab("requests")}
        >
          Duyệt học viên mới
          {requests.length > 0 && (
            <span className="tutor-students__count">{requests.length}</span>
          )}
        </button>
      </div>

      {tab === "list" ? (
        <TutorStudentTable
          students={filteredStudents}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          onViewStudent={setSelectedStudent}
        />
      ) : (
        <div className="tutor-requests">
          {requests.length === 0 ? (
            <div className="tutor-state tutor-card">
              <span className="material-symbols-outlined tutor-state__icon">
                task_alt
              </span>
              <h3 className="tutor-state__title">Không có yêu cầu mới</h3>
              <p className="tutor-state__text">
                Hiện tại chưa có học viên nào đang chờ duyệt.
              </p>
            </div>
          ) : (
            requests.map((item) => (
              <TutorRequestCard
                key={item.id}
                item={item}
                onApprove={() => handleApproveRequest(item)}
                onReject={() => handleRejectRequest(item)}
              />
            ))
          )}
        </div>
      )}

      {isAddOpen && (
        <div className="tutor-modal">
          <div className="tutor-modal__content">
            <h2>Thêm học viên vào khóa học</h2>

            <form onSubmit={handleAddStudent}>
              <label>Tên học viên</label>
              <input
                name="name"
                required
                placeholder="VD: Nguyễn Văn An"
                value={formData.name}
                onChange={handleChange}
              />

              <label>Môn học / khóa học</label>
              <input
                name="subject"
                required
                placeholder="VD: Toán lớp 12"
                value={formData.subject}
                onChange={handleChange}
              />

              <label>Tiến độ ban đầu (%)</label>
              <input
                name="progress"
                type="number"
                min="0"
                max="100"
                placeholder="VD: 20"
                value={formData.progress}
                onChange={handleChange}
              />

              <label>Buổi học kế tiếp</label>
              <input
                name="next"
                placeholder="VD: 14:00 - Mai"
                value={formData.next}
                onChange={handleChange}
              />

              <div className="tutor-modal__actions">
                <button
                  type="button"
                  className="tutor-btn tutor-btn--ghost"
                  onClick={closeAddModal}
                >
                  Hủy
                </button>

                <button type="submit" className="tutor-btn tutor-btn--primary">
                  Thêm học viên
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedStudent && (
        <div className="tutor-modal">
          <div className="tutor-modal__content">
            <h2>{selectedStudent.name}</h2>

            <div className="tutor-student-detail">
              <p>
                <strong>Môn học:</strong> {selectedStudent.subject}
              </p>
              <p>
                <strong>Trạng thái:</strong> {selectedStudent.status}
              </p>
              <p>
                <strong>Tiến độ:</strong> {selectedStudent.progress}%
              </p>
              <p>
                <strong>Buổi kế tiếp:</strong> {selectedStudent.next}
              </p>
            </div>

            <div className="tutor-modal__actions">
              <button
                className="tutor-btn tutor-btn--ghost"
                onClick={() => setSelectedStudent(null)}
              >
                Đóng
              </button>

              {selectedStudent.status === "suspended" ? (
                <button
                  className="tutor-btn tutor-btn--secondary"
                  onClick={() => handleResumeStudent(selectedStudent)}
                >
                  Cho học tiếp
                </button>
              ) : (
                <button
                  className="tutor-btn tutor-btn--secondary"
                  onClick={() => handlePauseStudent(selectedStudent)}
                >
                  Tạm dừng
                </button>
              )}

              <button
                className="tutor-btn tutor-btn--danger"
                onClick={() => handleDeleteStudent(selectedStudent)}
              >
                Xóa học viên
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}