import TutorChartCard from "../../components/tutor/TutorChartCard";
import TutorTransactionItem from "../../components/tutor/TutorTransactionItem";
import { financeSummary, financeTransactions } from "../../mock/mockTutorFinance";

export default function Finance() {
  return (
    <div>
      <div className="tutor-page__header">
        <div>
          <h1 className="tutor-page__title">Tài chính & Thu nhập</h1>
          <p className="tutor-page__subtitle">
            Quản lý dòng tiền và học phí từ các lớp học.
          </p>
        </div>

        <button className="tutor-btn tutor-btn--ghost">Xuất báo cáo</button>
      </div>

      <section className="tutor-finance__summary">
        <div className="tutor-finance__balance">
          <p>Số dư hiện tại</p>
          <h2>{financeSummary.balance}</h2>
          <div className="tutor-finance__actions">
            <button>Rút tiền</button>
            <button>Chi tiết</button>
          </div>
        </div>

        <div className="tutor-finance__small-card tutor-card">
          <span className="material-symbols-outlined">trending_up</span>
          <p>Thu nhập tháng này</p>
          <h3>{financeSummary.monthIncome}</h3>
          <small style={{ color: "var(--tutor-success)" }}>+12% so với tháng trước</small>
        </div>

        <div className="tutor-finance__small-card tutor-card">
          <span className="material-symbols-outlined">receipt_long</span>
          <p>Học phí chờ thu</p>
          <h3>{financeSummary.pendingFee}</h3>
          <small style={{ color: "var(--tutor-muted)" }}>3 học viên chưa đóng</small>
        </div>
      </section>

      <section className="tutor-finance__grid">
        <TutorChartCard title="Biểu đồ thu nhập 6 tháng" />

        <div className="tutor-transactions tutor-card">
          <h3>Giao dịch gần đây</h3>
          {financeTransactions.map((item) => (
            <TutorTransactionItem key={item.name} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}