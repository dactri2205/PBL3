import { useEffect, useMemo, useState } from "react";
import {
  createScheduleRequest,
  getMyTutors,
  getStudentLessons,
  getStudentScheduleRequests,
  requestLessonAbsence,
} from "../../services/studentService";

const statusLabels = {
  active: ["Đã duyệt", "student-badge student-badge--success"],
  pending: ["Chờ duyệt", "student-badge student-badge--pending"],
  absence_pending: ["Chờ duyệt nghỉ vắng", "student-badge student-badge--pending"],
};

const initialScheduleForm = {
  tutorId: "",
  date: "",
  time: "",
  session: "",
  note: "",
};

export default function Schedule() {
  const [lessons, setLessons] = useState([]);
  const [requests, setRequests] = useState([]);
  const [tutors, setTutors] = useState([]);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduleForm, setScheduleForm] = useState(initialScheduleForm);
  const [absenceLesson, setAbsenceLesson] = useState(null);
  const [absenceReason, setAbsenceReason] = useState("");

  const loadData = () => {
    Promise.all([
      getStudentLessons(),
      getStudentScheduleRequests(),
      getMyTutors(),
    ]).then(([lessonData, requestData, tutorData]) => {
      setLessons(lessonData);
      setRequests(requestData);
      setTutors(tutorData);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const selectedTutor = useMemo(
    () => tutors.find((tutor) => String(tutor.id) === scheduleForm.tutorId),
    [scheduleForm.tutorId, tutors]
  );

  const handleScheduleChange = (event) => {
    const { name, value } = event.target;
    setScheduleForm((current) => ({ ...current, [name]: value }));
  };

  const handleScheduleSubmit = (event) => {
    event.preventDefault();

    createScheduleRequest({
      tutorName: selectedTutor.name,
      subject: selectedTutor.subject,
      date: scheduleForm.date,
      time: scheduleForm.time,
      session: scheduleForm.session,
      note: scheduleForm.note,
    }).then((newRequest) => {
      setRequests((current) => [newRequest, ...current]);
      setScheduleForm(initialScheduleForm);
      setShowScheduleModal(false);
    });
  };

  const handleAbsenceSubmit = (event) => {
    event.preventDefault();

    requestLessonAbsence(absenceLesson.id, absenceReason).then((updatedLesson) => {
      setLessons((current) =>
        current.map((lesson) =>
          lesson.id === updatedLesson.id ? updatedLesson : lesson
        )
      );
      setAbsenceLesson(null);
      setAbsenceReason("");
    });
  };

  return (
    <div>
      <div className="student-dashboard__hero">
        <div>
          <h1 className="student-dashboard__heading">Lịch trình học tập</h1>
          <p className="student-dashboard__subtext">
            Đăng ký lịch học mới, xem lịch đã duyệt và xin nghỉ vắng.
          </p>
        </div>

        <button
          className="student-dashboard__primary-btn"
          onClick={() => setShowScheduleModal(true)}
        >
          <span className="material-symbols-outlined">add</span>
          Đăng ký lịch mới
        </button>
      </div>

      <section className="student-list-grid">
        {lessons.map((lesson) => {
          const [statusText, statusClass] =
            statusLabels[lesson.status] || statusLabels.active;

          return (
            <article className="student-card student-management-card" key={lesson.id}>
              <div className="student-management-card__header">
                <div>
                  <p className="student-card__muted">{lesson.tutorName}</p>
                  <h3 className="student-card__title">{lesson.title}</h3>
                </div>
                <span className={statusClass}>{statusText}</span>
              </div>

              <div className="student-detail-list">
                <p>
                  <span>Ngày học</span>
                  <strong>{lesson.date}</strong>
                </p>
                <p>
                  <span>Giờ học</span>
                  <strong>{lesson.time}</strong>
                </p>
                <p>
                  <span>Buổi học</span>
                  <strong>{lesson.session}</strong>
                </p>
              </div>

              {lesson.absenceReason && (
                <p className="student-note">Lý do xin nghỉ: {lesson.absenceReason}</p>
              )}

              <div className="student-card-actions">
                <button
                  className="student-secondary-btn"
                  onClick={() => {
                    setAbsenceLesson(lesson);
                    setAbsenceReason("");
                  }}
                  disabled={lesson.status === "absence_pending"}
                >
                  Xin nghỉ vắng
                </button>
              </div>
            </article>
          );
        })}
      </section>

      <section className="student-card student-section-card">
        <div className="student-card__header">
          <h3 className="student-card__title">Yêu cầu lịch đang chờ duyệt</h3>
          <span className="student-card__muted">{requests.length} yêu cầu</span>
        </div>

        <div className="student-table-list">
          {requests.map((request) => {
            const [statusText, statusClass] =
              statusLabels[request.status] || statusLabels.pending;

            return (
              <div className="student-table-row" key={request.id}>
                <div>
                  <strong>{request.subject}</strong>
                  <span>{request.tutorName}</span>
                </div>
                <span>{request.date}</span>
                <span>{request.time}</span>
                <span>{request.session}</span>
                <span className={statusClass}>{statusText}</span>
              </div>
            );
          })}
        </div>
      </section>

      {showScheduleModal && (
        <div className="student-modal" role="dialog" aria-modal="true">
          <div className="student-modal__content">
            <h2>Đăng ký lịch học với gia sư</h2>

            <form className="student-form" onSubmit={handleScheduleSubmit}>
              <label htmlFor="tutorId">Gia sư</label>
              <select
                id="tutorId"
                name="tutorId"
                value={scheduleForm.tutorId}
                onChange={handleScheduleChange}
                required
              >
                <option value="">Chọn gia sư đã đăng ký</option>
                {tutors.map((tutor) => (
                  <option key={tutor.id} value={tutor.id}>
                    {tutor.name} - {tutor.subject}
                  </option>
                ))}
              </select>

              <label htmlFor="date">Ngày học</label>
              <input
                id="date"
                name="date"
                type="date"
                value={scheduleForm.date}
                onChange={handleScheduleChange}
                required
              />

              <label htmlFor="time">Giờ học</label>
              <input
                id="time"
                name="time"
                placeholder="Ví dụ: 19:00 - 20:30"
                value={scheduleForm.time}
                onChange={handleScheduleChange}
                required
              />

              <label htmlFor="session">Buổi học</label>
              <input
                id="session"
                name="session"
                placeholder="Ví dụ: Buổi học mới"
                value={scheduleForm.session}
                onChange={handleScheduleChange}
                required
              />

              <label htmlFor="note">Ghi chú</label>
              <textarea
                id="note"
                name="note"
                rows="3"
                value={scheduleForm.note}
                onChange={handleScheduleChange}
                placeholder="Nội dung gửi gia sư khi duyệt lịch"
              />

              <div className="student-modal__actions">
                <button
                  type="button"
                  className="student-secondary-btn"
                  onClick={() => setShowScheduleModal(false)}
                >
                  Hủy
                </button>
                <button type="submit" className="student-dashboard__primary-btn">
                  Gửi đăng ký
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {absenceLesson && (
        <div className="student-modal" role="dialog" aria-modal="true">
          <div className="student-modal__content">
            <h2>Xin nghỉ vắng lịch học</h2>
            <p className="student-card__muted">
              Lịch {absenceLesson.title} với {absenceLesson.tutorName} ngày{" "}
              {absenceLesson.date}.
            </p>

            <form className="student-form" onSubmit={handleAbsenceSubmit}>
              <label htmlFor="absenceReason">Lý do xin nghỉ</label>
              <textarea
                id="absenceReason"
                rows="4"
                value={absenceReason}
                onChange={(event) => setAbsenceReason(event.target.value)}
                required
              />

              <div className="student-modal__actions">
                <button
                  type="button"
                  className="student-secondary-btn"
                  onClick={() => setAbsenceLesson(null)}
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
