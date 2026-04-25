import { useState } from "react";
import TutorClassCard from "../../components/tutor/TutorClassCard";
import { tutorClasses } from "../../mock/mockTutorClasses";

export default function Classes() {
  const [classes, setClasses] = useState(tutorClasses);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredClasses =
    statusFilter === "all"
      ? classes
      : classes.filter((item) => item.status === statusFilter);

  const handleCreateClass = (e) => {
    e.preventDefault();

    const form = e.target;

    const newClass = {
      id: Date.now(),
      subject: form.subject.value,
      title: form.title.value,
      status: "pending",
      time: form.time.value,
      students: "0 học viên đăng ký",
    };

    setClasses([newClass, ...classes]);
    setIsCreateOpen(false);
    form.reset();
  };

  return (
    <div>
      <div className="tutor-page__header">
        <div>
          <h1 className="tutor-page__title">Quản lý lớp học</h1>
          <p className="tutor-page__subtitle">
            Bạn đang có {classes.length} lớp học đang hoạt động và chờ mở.
          </p>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <select
            className="tutor-btn tutor-btn--ghost"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Tất cả</option>
            <option value="active">Đang học</option>
            <option value="pending">Chờ mở lớp</option>
          </select>

          <button
            className="tutor-btn tutor-btn--primary"
            onClick={() => setIsCreateOpen(true)}
          >
            Tạo lớp mới
          </button>
        </div>
      </div>

      <div className="tutor-classes__grid">
        {filteredClasses.map((item) => (
          <TutorClassCard
            key={item.id}
            item={item}
            onViewDetail={() => setSelectedClass(item)}
          />
        ))}
      </div>

      {isCreateOpen && (
        <div className="tutor-modal">
          <div className="tutor-modal__content">
            <h2>Tạo lớp mới</h2>

            <form onSubmit={handleCreateClass}>
              <label>Tên lớp</label>
              <input name="title" required placeholder="VD: Toán Lý 12A" />

              <label>Môn học</label>
              <input name="subject" required placeholder="VD: Toán & Vật Lý" />

              <label>Thời gian học</label>
              <input name="time" required placeholder="VD: T2, T4 - 19:30" />

              <div className="tutor-modal__actions">
                <button
                  type="button"
                  className="tutor-btn tutor-btn--ghost"
                  onClick={() => setIsCreateOpen(false)}
                >
                  Hủy
                </button>

                <button type="submit" className="tutor-btn tutor-btn--primary">
                  Tạo lớp
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedClass && (
        <div className="tutor-modal">
          <div className="tutor-modal__content">
            <h2>{selectedClass.title}</h2>
            <p><strong>Môn học:</strong> {selectedClass.subject}</p>
            <p><strong>Thời gian:</strong> {selectedClass.time}</p>
            <p><strong>Học viên:</strong> {selectedClass.students}</p>

            <div className="tutor-modal__actions">
              <button
                className="tutor-btn tutor-btn--primary"
                onClick={() => setSelectedClass(null)}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}