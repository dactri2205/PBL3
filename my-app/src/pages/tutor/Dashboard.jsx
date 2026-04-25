import TutorStatCard from "../../components/tutor/TutorStatCard";
import TutorChartCard from "../../components/tutor/TutorChartCard";
import { tutorStats, upcomingLessons } from "../../mock/mockTutorDashboard";

export default function Dashboard() {
  return (
    <div>
      <div className="tutor-page__header">
        <div>
          <h1 className="tutor-page__title">Chào mừng trở lại!</h1>
          <p className="tutor-page__subtitle">
            Đây là hiệu suất dạy học của bạn trong tháng này.
          </p>
        </div>

        <button className="tutor-btn tutor-btn--primary">
          <span className="material-symbols-outlined">add_circle</span>
          Mở lớp mới
        </button>
      </div>

      <section className="tutor-dashboard__stats">
        {tutorStats.map((item) => (
          <TutorStatCard key={item.label} {...item} />
        ))}
      </section>

      <section className="tutor-dashboard__grid">
        <TutorChartCard />

        <div className="tutor-upcoming tutor-card">
          <div className="tutor-chart__header">
            <h3>Lịch dạy sắp tới</h3>
            <span style={{ color: "var(--tutor-primary)", fontWeight: 700 }}>
              Xem tất cả
            </span>
          </div>

          <div style={{ marginTop: 22 }}>
            {upcomingLessons.map((item) => (
              <div className="tutor-upcoming__item" key={item.subject}>
                <div className="tutor-upcoming__date">{item.date}</div>
                <div>
                  <div className="tutor-upcoming__subject">{item.subject}</div>
                  <div className="tutor-upcoming__time">{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}