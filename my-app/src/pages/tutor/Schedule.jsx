import { useMemo, useState } from "react";
import {
  mockTutorLessons,
  mockScheduleRequests,
} from "../../mock/mockTutorSchedule";

const days = ["THỨ 2", "THỨ 3", "THỨ 4", "THỨ 5", "THỨ 6", "THỨ 7", "CHỦ NHẬT"];

const emptyLessonForm = {
  title: "",
  student: "",
  subject: "",
  date: "",
  time: "",
  note: "",
};

const emptyActionForm = {
  date: "",
  time: "",
  note: "",
};

export default function Schedule() {
  const [activeTab, setActiveTab] = useState("calendar");
  const [viewMode, setViewMode] = useState("month");

  const [lessons, setLessons] = useState(mockTutorLessons);
  const [requests, setRequests] = useState(mockScheduleRequests);

  const [modalType, setModalType] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);

  const [lessonForm, setLessonForm] = useState(emptyLessonForm);
  const [actionForm, setActionForm] = useState(emptyActionForm);

  const sortedLessons = useMemo(() => {
    return [...lessons].sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
  }, [lessons]);

  const upcomingLessons = sortedLessons
    .filter((lesson) => lesson.status !== "cancelled")
    .slice(0, 5);

  const statusMap = {
    active: {
      label: "Đang dạy",
      className: "tutor-badge--active",
    },
    cancelled: {
      label: "Đã báo nghỉ",
      className: "tutor-badge--error",
    },
    makeup: {
      label: "Lịch bù",
      className: "tutor-badge--pending",
    },
  };

  const getDayNumber = (dateString) => {
    return Number(dateString.split("-")[2]);
  };

  const getLessonsByDay = (dayNumber) => {
    return lessons.filter((lesson) => getDayNumber(lesson.date) === dayNumber);
  };

  const handleLessonFormChange = (e) => {
    const { name, value } = e.target;

    setLessonForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleActionFormChange = (e) => {
    const { name, value } = e.target;

    setActionForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openCreateModal = () => {
    setLessonForm(emptyLessonForm);
    setModalType("create");
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedLesson(null);
    setLessonForm(emptyLessonForm);
    setActionForm(emptyActionForm);
  };

  const handleCreateLesson = (e) => {
    e.preventDefault();

    const newLesson = {
      id: Date.now(),
      ...lessonForm,
      status: "active",
    };

    setLessons((prev) => [newLesson, ...prev]);
    closeModal();
  };

  const handleCancelLesson = (lesson) => {
    const confirmCancel = window.confirm(
      `Bạn có chắc muốn báo nghỉ buổi "${lesson.title}" không?`
    );

    if (!confirmCancel) return;

    setLessons((prev) =>
      prev.map((item) =>
        item.id === lesson.id
          ? {
              ...item,
              status: "cancelled",
              note: "Gia sư đã báo nghỉ buổi học này.",
            }
          : item
      )
    );
  };

  const openMakeupModal = (lesson) => {
    setSelectedLesson(lesson);
    setActionForm({
      date: lesson.date,
      time: lesson.time,
      note: "",
    });
    setModalType("makeup");
  };

  const openRescheduleModal = (lesson) => {
    setSelectedLesson(lesson);
    setActionForm({
      date: lesson.date,
      time: lesson.time,
      note: lesson.note || "",
    });
    setModalType("reschedule");
  };

  const handleMakeupSubmit = (e) => {
    e.preventDefault();

    setLessons((prev) =>
      prev.map((item) =>
        item.id === selectedLesson.id
          ? {
              ...item,
              date: actionForm.date,
              time: actionForm.time,
              note: actionForm.note || "Buổi học đã được lên lịch bù.",
              status: "makeup",
            }
          : item
      )
    );

    closeModal();
  };

  const handleRescheduleSubmit = (e) => {
    e.preventDefault();

    setLessons((prev) =>
      prev.map((item) =>
        item.id === selectedLesson.id
          ? {
              ...item,
              date: actionForm.date,
              time: actionForm.time,
              note: actionForm.note,
              status: "active",
            }
          : item
      )
    );

    closeModal();
  };

  const handleAcceptRequest = (request) => {
    const newLesson = {
      id: Date.now(),
      title: request.subject,
      student: request.student,
      subject: request.subject,
      date: request.requestedDate,
      time: request.requestedTime,
      status: "active",
      note: request.note,
    };

    setLessons((prev) => [newLesson, ...prev]);
    setRequests((prev) => prev.filter((item) => item.id !== request.id));
  };

  const handleRejectRequest = (request) => {
    const confirmReject = window.confirm(
      `Bạn có chắc muốn từ chối yêu cầu của ${request.student} không?`
    );

    if (!confirmReject) return;

    setRequests((prev) => prev.filter((item) => item.id !== request.id));
  };

  const renderLessonCard = (lesson) => {
    const status = statusMap[lesson.status] || statusMap.active;

    return (
      <div className="tutor-schedule__lesson-card" key={lesson.id}>
        <div className="tutor-schedule__lesson-head">
          <h3>{lesson.title}</h3>
          <span className={`tutor-badge ${status.className}`}>
            {status.label}
          </span>
        </div>

        <p className="tutor-schedule__lesson-student">
          <span className="material-symbols-outlined">person</span>
          {lesson.student}
        </p>

        <p className="tutor-schedule__lesson-time">
          <span className="material-symbols-outlined">schedule</span>
          {lesson.date} · {lesson.time}
        </p>

        {lesson.note && (
          <p className="tutor-schedule__lesson-note">{lesson.note}</p>
        )}

        <div className="tutor-schedule__lesson-actions">
          <button
            className="tutor-btn tutor-btn--ghost"
            onClick={() => openRescheduleModal(lesson)}
          >
            Đổi lịch
          </button>

          <button
            className="tutor-btn tutor-btn--secondary"
            onClick={() => openMakeupModal(lesson)}
          >
            Báo bù
          </button>

          {lesson.status !== "cancelled" && (
            <button
              className="tutor-btn tutor-btn--danger"
              onClick={() => handleCancelLesson(lesson)}
            >
              Báo nghỉ
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="tutor-schedule">
      <div className="tutor-page__header">
        <div>
          <h1 className="tutor-page__title">Lịch trình giảng dạy</h1>
          <p className="tutor-page__subtitle">
            Xem lịch dạy, báo nghỉ, báo bù, đổi lịch và duyệt lịch học của học viên.
          </p>
        </div>

        <button className="tutor-btn tutor-btn--primary" onClick={openCreateModal}>
          <span className="material-symbols-outlined">add</span>
          Thêm lịch dạy
        </button>
      </div>

      <div className="tutor-schedule__tabs">
        <button
          className={`tutor-schedule__tab ${
            activeTab === "calendar" ? "tutor-schedule__tab--active" : ""
          }`}
          onClick={() => setActiveTab("calendar")}
        >
          Lịch dạy
        </button>

        <button
          className={`tutor-schedule__tab ${
            activeTab === "requests" ? "tutor-schedule__tab--active" : ""
          }`}
          onClick={() => setActiveTab("requests")}
        >
          Yêu cầu đổi lịch / đăng ký lịch
          {requests.length > 0 && (
            <span className="tutor-schedule__count">{requests.length}</span>
          )}
        </button>
      </div>

      {activeTab === "calendar" && (
        <>
          <section className="tutor-schedule__summary">
            <div className="tutor-card tutor-schedule__summary-card">
              <p>Tổng buổi học</p>
              <h3>{lessons.length}</h3>
            </div>

            <div className="tutor-card tutor-schedule__summary-card">
              <p>Đang dạy</p>
              <h3>
                {lessons.filter((item) => item.status === "active").length}
              </h3>
            </div>

            <div className="tutor-card tutor-schedule__summary-card">
              <p>Đã báo nghỉ</p>
              <h3>
                {lessons.filter((item) => item.status === "cancelled").length}
              </h3>
            </div>

            <div className="tutor-card tutor-schedule__summary-card">
              <p>Lịch bù</p>
              <h3>
                {lessons.filter((item) => item.status === "makeup").length}
              </h3>
            </div>
          </section>

          <section className="tutor-schedule__view-actions">
            <div>
              <button
                className={`tutor-schedule__view-btn ${
                  viewMode === "month" ? "tutor-schedule__view-btn--active" : ""
                }`}
                onClick={() => setViewMode("month")}
              >
                Theo tháng
              </button>

              <button
                className={`tutor-schedule__view-btn ${
                  viewMode === "week" ? "tutor-schedule__view-btn--active" : ""
                }`}
                onClick={() => setViewMode("week")}
              >
                Theo tuần
              </button>
            </div>
          </section>

          <section className="tutor-schedule__main-grid">
            <div className="tutor-card tutor-schedule__calendar-card">
              {viewMode === "month" ? (
                <>
                  <div className="tutor-schedule__calendar-head">
                    {days.map((day) => (
                      <div key={day}>{day}</div>
                    ))}
                  </div>

                  <div className="tutor-schedule__calendar-body">
                    {Array.from({ length: 35 }).map((_, index) => {
                      const dayNumber = index + 1 <= 31 ? index + 1 : null;
                      const dayLessons = dayNumber
                        ? getLessonsByDay(dayNumber)
                        : [];

                      return (
                        <div className="tutor-schedule__day" key={index}>
                          {dayNumber && (
                            <span className="tutor-schedule__day-number">
                              {dayNumber}
                            </span>
                          )}

                          {dayLessons.map((lesson) => {
                            const status = statusMap[lesson.status];

                            return (
                              <div
                                key={lesson.id}
                                className={`tutor-schedule__day-event tutor-schedule__day-event--${lesson.status}`}
                              >
                                <strong>{lesson.title}</strong>
                                <span>{lesson.time}</span>
                                <em>{status.label}</em>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="tutor-schedule__week-list">
                  {upcomingLessons.length === 0 ? (
                    <p className="tutor-schedule__empty">
                      Chưa có lịch dạy trong tuần.
                    </p>
                  ) : (
                    upcomingLessons.map(renderLessonCard)
                  )}
                </div>
              )}
            </div>

            <aside className="tutor-card tutor-schedule__upcoming">
              <h3>Buổi học sắp tới</h3>

              {upcomingLessons.length === 0 ? (
                <p className="tutor-schedule__empty">Chưa có buổi học nào.</p>
              ) : (
                upcomingLessons.map((lesson) => {
                  const status = statusMap[lesson.status];

                  return (
                    <div className="tutor-schedule__upcoming-item" key={lesson.id}>
                      <div className="tutor-schedule__upcoming-date">
                        {getDayNumber(lesson.date)}
                      </div>

                      <div>
                        <strong>{lesson.title}</strong>
                        <p>{lesson.student}</p>
                        <span>
                          {lesson.time} · {status.label}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </aside>
          </section>
        </>
      )}

      {activeTab === "requests" && (
        <section className="tutor-schedule__requests">
          {requests.length === 0 ? (
            <div className="tutor-state tutor-card">
              <span className="material-symbols-outlined tutor-state__icon">
                task_alt
              </span>
              <h3 className="tutor-state__title">Không có yêu cầu lịch mới</h3>
              <p className="tutor-state__text">
                Hiện chưa có học viên nào đăng ký hoặc yêu cầu đổi lịch.
              </p>
            </div>
          ) : (
            requests.map((request) => (
              <article className="tutor-schedule-request tutor-card" key={request.id}>
                <div>
                  <div className="tutor-schedule-request__top">
                    <h3>{request.student}</h3>
                    <span className="tutor-badge tutor-badge--pending">
                      {request.requestType}
                    </span>
                  </div>

                  <p>
                    <strong>Môn học:</strong> {request.subject}
                  </p>

                  <p>
                    <strong>Lịch mong muốn:</strong> {request.requestedDate} ·{" "}
                    {request.requestedTime}
                  </p>

                  <blockquote>“{request.note}”</blockquote>
                </div>

                <div className="tutor-schedule-request__actions">
                  <button
                    className="tutor-btn tutor-btn--primary"
                    onClick={() => handleAcceptRequest(request)}
                  >
                    Chấp nhận
                  </button>

                  <button
                    className="tutor-btn tutor-btn--ghost"
                    onClick={() => handleRejectRequest(request)}
                  >
                    Từ chối
                  </button>
                </div>
              </article>
            ))
          )}
        </section>
      )}

      {modalType === "create" && (
        <div className="tutor-modal">
          <div className="tutor-modal__content">
            <h2>Thêm lịch dạy</h2>

            <form onSubmit={handleCreateLesson}>
              <label>Tên buổi học</label>
              <input
                name="title"
                required
                placeholder="VD: IELTS Writing"
                value={lessonForm.title}
                onChange={handleLessonFormChange}
              />

              <label>Học viên</label>
              <input
                name="student"
                required
                placeholder="VD: Lê Thị Bình"
                value={lessonForm.student}
                onChange={handleLessonFormChange}
              />

              <label>Môn học</label>
              <input
                name="subject"
                required
                placeholder="VD: IELTS"
                value={lessonForm.subject}
                onChange={handleLessonFormChange}
              />

              <label>Ngày học</label>
              <input
                name="date"
                type="date"
                required
                value={lessonForm.date}
                onChange={handleLessonFormChange}
              />

              <label>Thời gian</label>
              <input
                name="time"
                required
                placeholder="VD: 14:00 - 15:30"
                value={lessonForm.time}
                onChange={handleLessonFormChange}
              />

              <label>Ghi chú</label>
              <input
                name="note"
                placeholder="VD: Luyện đề buổi 1"
                value={lessonForm.note}
                onChange={handleLessonFormChange}
              />

              <div className="tutor-modal__actions">
                <button
                  type="button"
                  className="tutor-btn tutor-btn--ghost"
                  onClick={closeModal}
                >
                  Hủy
                </button>

                <button type="submit" className="tutor-btn tutor-btn--primary">
                  Thêm lịch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {(modalType === "makeup" || modalType === "reschedule") && selectedLesson && (
        <div className="tutor-modal">
          <div className="tutor-modal__content">
            <h2>
              {modalType === "makeup" ? "Báo lịch học bù" : "Đổi lịch học"}
            </h2>

            <p className="tutor-schedule__modal-desc">
              {selectedLesson.title} · {selectedLesson.student}
            </p>

            <form
              onSubmit={
                modalType === "makeup"
                  ? handleMakeupSubmit
                  : handleRescheduleSubmit
              }
            >
              <label>Ngày mới</label>
              <input
                type="date"
                name="date"
                required
                value={actionForm.date}
                onChange={handleActionFormChange}
              />

              <label>Thời gian mới</label>
              <input
                name="time"
                required
                placeholder="VD: 18:00 - 19:30"
                value={actionForm.time}
                onChange={handleActionFormChange}
              />

              <label>Ghi chú</label>
              <input
                name="note"
                placeholder="VD: Học bù do buổi trước nghỉ"
                value={actionForm.note}
                onChange={handleActionFormChange}
              />

              <div className="tutor-modal__actions">
                <button
                  type="button"
                  className="tutor-btn tutor-btn--ghost"
                  onClick={closeModal}
                >
                  Hủy
                </button>

                <button type="submit" className="tutor-btn tutor-btn--primary">
                  {modalType === "makeup" ? "Lưu lịch bù" : "Lưu lịch mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}