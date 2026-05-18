import { useEffect, useState } from "react";
import { getMyTutors, requestRemoveTutor } from "../../services/studentService";

const statusLabels = {
  active: ["Đang học", "student-badge student-badge--success"],
  removal_pending: ["Chờ gia sư xác nhận nghỉ", "student-badge student-badge--pending"],
};

const formatCurrency = (amount) => `${amount.toLocaleString("vi-VN")}đ`;

export default function MyTutors() {
  const [tutors, setTutors] = useState([]);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [reason, setReason] = useState("");

  useEffect(() => {
    getMyTutors().then(setTutors);
  }, []);

  const openRemoveModal = (tutor) => {
    setSelectedTutor(tutor);
    setReason("");
  };

  const closeRemoveModal = () => {
    setSelectedTutor(null);
    setReason("");
  };

  const handleRemoveSubmit = (event) => {
    event.preventDefault();

    requestRemoveTutor(selectedTutor.id, reason).then((updatedTutor) => {
      setTutors((current) =>
        current.map((tutor) =>
          tutor.id === selectedTutor.id ? updatedTutor : tutor
        )
      );
      closeRemoveModal();
    });
  };

  return (
    <div>
      <div className="student-dashboard__hero">
        <div>
          <h1 className="student-dashboard__heading">Gia sư đang theo học</h1>
          <p className="student-dashboard__subtext">
            Theo dõi môn học, lịch gần nhất và gửi yêu cầu nghỉ học khi cần.
          </p>
        </div>
      </div>

      <div className="student-list-grid">
        {tutors.map((tutor) => {
          const [statusText, statusClass] =
            statusLabels[tutor.status] || statusLabels.active;

          return (
            <article className="student-card student-management-card" key={tutor.id}>
              <div className="student-management-card__header">
                <div>
                  <p className="student-card__muted">{tutor.subject}</p>
                  <h3 className="student-card__title">{tutor.name}</h3>
                </div>
                <span className={statusClass}>{statusText}</span>
              </div>

              <div className="student-detail-list">
                <p>
                  <span>Tỉnh thành</span>
                  <strong>{tutor.city}</strong>
                </p>
                <p>
                  <span>Học phí</span>
                  <strong>{formatCurrency(tutor.price)}/giờ</strong>
                </p>
                <p>
                  <span>Đánh giá</span>
                  <strong>{tutor.rating} / 5</strong>
                </p>
                <p>
                  <span>Lịch gần nhất</span>
                  <strong>{tutor.nextLesson}</strong>
                </p>
              </div>

              {tutor.leaveReason && (
                <p className="student-note">Lý do đã gửi: {tutor.leaveReason}</p>
              )}

              <div className="student-card-actions">
                <button
                  className="student-secondary-btn"
                  onClick={() => openRemoveModal(tutor)}
                  disabled={tutor.status === "removal_pending"}
                >
                  Xin nghỉ học với gia sư
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {selectedTutor && (
        <div className="student-modal" role="dialog" aria-modal="true">
          <div className="student-modal__content">
            <h2>Gửi yêu cầu nghỉ học</h2>
            <p className="student-card__muted">
              Yêu cầu sẽ được gửi đến gia sư {selectedTutor.name} để chờ xác nhận.
            </p>

            <form className="student-form" onSubmit={handleRemoveSubmit}>
              <label htmlFor="leave-reason">Lý do xin nghỉ</label>
              <textarea
                id="leave-reason"
                rows="4"
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                required
                placeholder="Ví dụ: Em muốn dừng học vì thay đổi lịch học ở trường."
              />

              <div className="student-modal__actions">
                <button
                  type="button"
                  className="student-secondary-btn"
                  onClick={closeRemoveModal}
                >
                  Hủy
                </button>
                <button type="submit" className="student-dashboard__primary-btn">
                  Gửi yêu cầu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
