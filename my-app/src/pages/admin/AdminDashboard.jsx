export default function AdminDashboard() {
  return (
    <section className="admin-page">
      <div className="admin-page__header">
        <h2>Tổng quan hệ thống</h2>
        <p>Theo dõi nhanh số lượng gia sư, học viên và doanh thu nền tảng.</p>
      </div>

      <div className="admin-grid-3">
        <article className="admin-card admin-stat">
          <p className="admin-stat__label">Gia sư đã đăng ký</p>
          <div className="admin-stat__value">2,450</div>
          <p className="admin-stat__sub">+12% học kỳ này</p>
        </article>

        <article className="admin-card admin-stat">
          <p className="admin-stat__label">Học viên đang hoạt động</p>
          <div className="admin-stat__value">5,120</div>
          <p className="admin-stat__sub">+8% học kỳ này</p>
        </article>

        <article className="admin-card admin-stat">
          <p className="admin-stat__label">Tổng doanh thu</p>
          <div className="admin-stat__value">₫125,000,000</div>
          <p className="admin-stat__sub">Doanh thu đã ghi nhận</p>
        </article>
      </div>
    </section>
  );
}
