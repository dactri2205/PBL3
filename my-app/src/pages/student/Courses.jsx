import { useEffect, useState } from "react";
import { getStudentCourses, registerCourse } from "../../services/studentService";

const statusLabels = {
  available: ["Có thể đăng ký", "student-badge student-badge--success"],
  pending: ["Chờ gia sư duyệt", "student-badge student-badge--pending"],
  registered: ["Đã đăng ký", "student-badge student-badge--success"],
};

const formatCurrency = (amount) => `${amount.toLocaleString("vi-VN")}đ`;

export default function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getStudentCourses().then(setCourses);
  }, []);

  const handleRegister = (courseId) => {
    registerCourse(courseId).then((updatedCourse) => {
      setCourses((current) =>
        current.map((course) =>
          course.id === updatedCourse.id ? updatedCourse : course
        )
      );
    });
  };

  return (
    <div>
      <div className="student-dashboard__hero">
        <div>
          <h1 className="student-dashboard__heading">Khóa học và buổi học mới</h1>
          <p className="student-dashboard__subtext">
            Xem nhóm học, lớp học dạy kèm và gửi đăng ký tham gia.
          </p>
        </div>
      </div>

      <div className="student-list-grid">
        {courses.map((course) => {
          const [statusText, statusClass] =
            statusLabels[course.status] || statusLabels.available;

          return (
            <article className="student-card student-management-card" key={course.id}>
              <div className="student-management-card__header">
                <div>
                  <p className="student-card__muted">{course.subject}</p>
                  <h3 className="student-card__title">{course.title}</h3>
                </div>
                <span className={statusClass}>{statusText}</span>
              </div>

              <div className="student-detail-list">
                <p>
                  <span>Gia sư</span>
                  <strong>{course.tutorName}</strong>
                </p>
                <p>
                  <span>Lịch học</span>
                  <strong>{course.schedule}</strong>
                </p>
                <p>
                  <span>Sĩ số</span>
                  <strong>
                    {course.currentStudents}/{course.maxStudents} học viên
                  </strong>
                </p>
                <p>
                  <span>Học phí</span>
                  <strong>{formatCurrency(course.price)}</strong>
                </p>
              </div>

              <div className="student-card-actions">
                <button
                  className="student-dashboard__primary-btn"
                  onClick={() => handleRegister(course.id)}
                  disabled={course.status !== "available"}
                >
                  {course.status === "available" ? "Đăng ký khóa học" : statusText}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
