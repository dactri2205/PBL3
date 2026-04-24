import StatCard from "../../components/student/StatCard";

export default function Dashboard() {
  return (
    <div className="student-dashboard">
      <section className="student-dashboard__hero">
        <div>
          <h1 className="student-dashboard__heading">Chào bạn trở lại!</h1>
          <p className="student-dashboard__subtext">
            Đây là tiến trình học tập của bạn trong tuần này.
          </p>
        </div>

        <button className="student-dashboard__primary-btn">
          <span className="material-symbols-outlined">calendar_month</span>
          Lịch học
        </button>
      </section>

      <section className="student-dashboard__stats">
        <StatCard icon="menu_book" title="Khóa học" value="12" trend="+12%" />
        <StatCard icon="schedule" title="Giờ học" value="128h" trend="+12%" />
        <StatCard icon="star" title="Đánh giá" value="4.9" trend="+12%" />
        <StatCard icon="trending_up" title="Điểm chuyên cần" value="98%" trend="+12%" />
      </section>

      <section className="student-dashboard__grid">
        <div className="student-card student-dashboard__chart-card">
          <div className="student-card__header">
            <h3 className="student-card__title">Hoạt động hàng tuần</h3>
            <span className="student-card__muted">6 tháng qua</span>
          </div>

          <div className="student-dashboard__chart">
            <svg viewBox="0 0 600 240" preserveAspectRatio="none">
              <path
                d="M20,170 C80,110 130,110 180,145 C230,180 280,70 340,120 C390,165 420,200 485,80 C530,10 560,100 590,195"
                fill="none"
                stroke="#7C6E27"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="student-dashboard__chart-labels">
            <span>T3</span>
            <span>T4</span>
            <span>T5</span>
            <span>T6</span>
            <span>T7</span>
            <span>CN</span>
          </div>
        </div>

        <div className="student-card student-dashboard__schedule-card">
          <div className="student-card__header">
            <h3 className="student-card__title">Lịch sắp tới</h3>
            <span className="student-card__link">Tất cả</span>
          </div>

          <div className="student-dashboard__schedule-list">
            <div className="student-dashboard__schedule-item">
              <div className="student-dashboard__schedule-date">
                <span>TH 2</span>
                <strong>20</strong>
              </div>
              <div>
                <div className="student-dashboard__schedule-subject">Toán học</div>
                <div className="student-dashboard__schedule-time">14:00</div>
              </div>
            </div>

            <div className="student-dashboard__schedule-item">
              <div className="student-dashboard__schedule-date">
                <span>TH 3</span>
                <strong>21</strong>
              </div>
              <div>
                <div className="student-dashboard__schedule-subject">Tiếng Anh</div>
                <div className="student-dashboard__schedule-time">09:00</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}