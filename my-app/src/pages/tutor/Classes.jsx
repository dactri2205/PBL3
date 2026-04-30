import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import TutorClassCard from "../../components/tutor/TutorClassCard";
import { tutorClasses } from "../../mock/mockTutorClasses";

export default function Classes() {
  const [classes, setClasses] = useState(tutorClasses);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  const outletContext = useOutletContext() || {};
  const searchTerm = outletContext.searchTerm || "";

  const filteredClasses = classes.filter((item) => {
    const keyword = searchTerm.toLowerCase().trim();

    const matchSearch =
      keyword === "" ||
      item.title.toLowerCase().includes(keyword) ||
      item.subject.toLowerCase().includes(keyword) ||
      item.time.toLowerCase().includes(keyword) ||
      item.description?.toLowerCase().includes(keyword);

    const matchStatus =
      statusFilter === "all" || item.status === statusFilter;

    return matchSearch && matchStatus;
  });

  const handleCreateClass = (e) => {
    e.preventDefault();

    const form = e.target;
    const maxStudents = Number(form.maxStudents.value);

    if (maxStudents < 5 || maxStudents > 10) {
      alert("Số lượng học viên phải từ 5 đến 10.");
      return;
    }

    const newClass = {
      id: Date.now(),
      title: form.title.value.trim(),
      subject: form.subject.value.trim(),
      status: "pending",
      time: form.time.value.trim(),
      maxStudents,
      price: Number(form.price.value),
      description: form.description.value.trim(),
      students: [],
    };

    setClasses([newClass, ...classes]);
    setIsCreateOpen(false);
    form.reset();
  };

  const approveStudentInClass = (classId, studentId) => {
    const updatedClasses = classes.map((classItem) => {
      if (classItem.id !== classId) return classItem;

      return {
        ...classItem,
        students: classItem.students.map((student) =>
          student.id === studentId
            ? { ...student, status: "approved" }
            : student
        ),
      };
    });

    setClasses(updatedClasses);

    const updatedSelectedClass = updatedClasses.find(
      (item) => item.id === classId
    );
    setSelectedClass(updatedSelectedClass);
  };

  const rejectStudentInClass = (classId, studentId) => {
    const updatedClasses = classes.map((classItem) => {
      if (classItem.id !== classId) return classItem;

      return {
        ...classItem,
        students: classItem.students.filter(
          (student) => student.id !== studentId
        ),
      };
    });

    setClasses(updatedClasses);

    const updatedSelectedClass = updatedClasses.find(
      (item) => item.id === classId
    );
    setSelectedClass(updatedSelectedClass);
  };

  const handleCloseClass = (classId) => {
    const updatedClasses = classes.map((classItem) =>
      classItem.id === classId
        ? { ...classItem, status: "closed" }
        : classItem
    );

    setClasses(updatedClasses);

    const updatedSelectedClass = updatedClasses.find(
      (item) => item.id === classId
    );
    setSelectedClass(updatedSelectedClass);
  };

  const handleCancelClass = (classId) => {
    const updatedClasses = classes.map((classItem) =>
      classItem.id === classId
        ? { ...classItem, status: "cancelled" }
        : classItem
    );

    setClasses(updatedClasses);

    const updatedSelectedClass = updatedClasses.find(
      (item) => item.id === classId
    );
    setSelectedClass(updatedSelectedClass);
  };

  const getStatusText = (status) => {
    if (status === "active") return "Đang học";
    if (status === "pending") return "Chờ mở lớp";
    if (status === "closed") return "Đã đóng";
    if (status === "cancelled") return "Đã hủy";
    return status;
  };

  const getApprovedStudents = (classItem) =>
    classItem.students.filter((student) => student.status === "approved");

  const getPendingStudents = (classItem) =>
    classItem.students.filter((student) => student.status === "pending");

  return (
    <div>
      <div className="tutor-page__header">
        <div>
          <h1 className="tutor-page__title">Quản lý lớp học</h1>
          <p className="tutor-page__subtitle">
            Bạn đang có {classes.length} lớp học trong hệ thống.
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
            <option value="closed">Đã đóng</option>
            <option value="cancelled">Đã hủy</option>
          </select>

          <button
            className="tutor-btn tutor-btn--primary"
            onClick={() => setIsCreateOpen(true)}
          >
            Tạo lớp mới
          </button>
        </div>
      </div>

      {searchTerm.trim() && (
        <p className="tutor-page__subtitle">
          Kết quả tìm kiếm cho: <strong>{searchTerm}</strong>
        </p>
      )}

      <div className="tutor-classes__grid">
        {filteredClasses.length > 0 ? (
          filteredClasses.map((item) => (
            <TutorClassCard
              key={item.id}
              item={item}
              onViewDetail={() => setSelectedClass(item)}
            />
          ))
        ) : (
          <div className="tutor-state tutor-card">
            <span className="material-symbols-outlined tutor-state__icon">
              search_off
            </span>
            <h3 className="tutor-state__title">Không tìm thấy lớp học</h3>
            <p className="tutor-state__text">
              Không có lớp nào phù hợp với từ khóa "{searchTerm}".
            </p>
          </div>
        )}
      </div>

      {isCreateOpen && (
        <div className="tutor-modal">
          <div className="tutor-modal__content">
            <h2>Tạo lớp mới</h2>

            <form onSubmit={handleCreateClass}>
              <label>Tên lớp</label>
              <input name="title" required placeholder="VD: Toán 12 Cấp tốc" />

              <label>Môn học</label>
              <input name="subject" required placeholder="VD: Toán" />

              <label>Số lượng học viên tối đa</label>
              <input
                name="maxStudents"
                type="number"
                min="5"
                max="10"
                required
                placeholder="VD: 8"
              />

              <label>Học phí</label>
              <input
                name="price"
                type="number"
                min="0"
                required
                placeholder="VD: 250000"
              />

              <label>Lịch học</label>
              <input name="time" required placeholder="VD: T2, T4 - 19:30" />

              <label>Mô tả lớp</label>
              <textarea
                name="description"
                required
                placeholder="Nhập mô tả ngắn về lớp học"
                rows="4"
              />

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

            <p>
              <strong>Môn học:</strong> {selectedClass.subject}
            </p>

            <p>
              <strong>Trạng thái:</strong> {getStatusText(selectedClass.status)}
            </p>

            <p>
              <strong>Lịch học:</strong> {selectedClass.time}
            </p>

            <p>
              <strong>Học phí:</strong>{" "}
              {selectedClass.price.toLocaleString("vi-VN")}đ / buổi
            </p>

            <p>
              <strong>Số lượng:</strong> {getApprovedStudents(selectedClass).length}
              /{selectedClass.maxStudents} học viên
            </p>

            <p>
              <strong>Mô tả:</strong> {selectedClass.description}
            </p>

            <hr />

            <h3>Học viên đã duyệt</h3>

            {getApprovedStudents(selectedClass).length === 0 ? (
              <p>Chưa có học viên nào được duyệt.</p>
            ) : (
              <div className="tutor-class-student-list">
                {getApprovedStudents(selectedClass).map((student) => (
                  <div className="tutor-class-student-item" key={student.id}>
                    <span>{student.name}</span>
                    <span className="tutor-badge tutor-badge--success">
                      Đã duyệt
                    </span>
                  </div>
                ))}
              </div>
            )}

            <h3>Học viên chờ duyệt</h3>

            {getPendingStudents(selectedClass).length === 0 ? (
              <p>Không có học viên chờ duyệt.</p>
            ) : (
              <div className="tutor-class-student-list">
                {getPendingStudents(selectedClass).map((student) => (
                  <div className="tutor-class-student-item" key={student.id}>
                    <span>{student.name}</span>

                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        className="tutor-btn tutor-btn--primary"
                        onClick={() =>
                          approveStudentInClass(selectedClass.id, student.id)
                        }
                      >
                        Chấp nhận
                      </button>

                      <button
                        className="tutor-btn tutor-btn--danger"
                        onClick={() =>
                          rejectStudentInClass(selectedClass.id, student.id)
                        }
                      >
                        Từ chối
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="tutor-modal__actions">
              {selectedClass.status === "active" && (
                <button
                  className="tutor-btn tutor-btn--secondary"
                  onClick={() => handleCloseClass(selectedClass.id)}
                >
                  Đóng lớp
                </button>
              )}

              {selectedClass.status === "pending" && (
                <button
                  className="tutor-btn tutor-btn--danger"
                  onClick={() => handleCancelClass(selectedClass.id)}
                >
                  Hủy lớp
                </button>
              )}

              <button
                className="tutor-btn tutor-btn--ghost"
                onClick={() => setSelectedClass(null)}
              >
                Đóng modal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
