export default function TutorClassCard({ item, onViewDetail }) {
  const approvedCount = item.students.filter(
    (student) => student.status === "approved"
  ).length;

  const pendingCount = item.students.filter(
    (student) => student.status === "pending"
  ).length;

  const getStatusText = (status) => {
    if (status === "active") return "Đang học";
    if (status === "pending") return "Chờ mở lớp";
    if (status === "closed") return "Đã đóng";
    if (status === "cancelled") return "Đã hủy";
    return status;
  };

  return (
    <div className="tutor-card tutor-class-card">
      <div className="tutor-class-card__header">
        <div>
          <h3>{item.title}</h3>
          <p>{item.subject}</p>
        </div>

        <span className={`tutor-badge tutor-badge--${item.status}`}>
          {getStatusText(item.status)}
        </span>
      </div>

      <p>
        <strong>Lịch học:</strong> {item.time}
      </p>

      <p>
        <strong>Học phí:</strong> {item.price.toLocaleString("vi-VN")}đ / buổi
      </p>

      <p>
        <strong>Học viên:</strong> {approvedCount}/{item.maxStudents}
      </p>

      <p>
        <strong>Chờ duyệt:</strong> {pendingCount} học viên
      </p>

      <button className="tutor-btn tutor-btn--primary" onClick={onViewDetail}>
        Xem chi tiết
      </button>
    </div>
  );
}