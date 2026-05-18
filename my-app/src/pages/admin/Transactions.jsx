import { useState } from "react";

const initialRows = [
  { time: "Oct 24, 2023 14:30", ref: "TXN-99281-A", type: "Class Payment", desc: "Advanced Calculus Group B", amount: 800000 },
  { time: "Oct 23, 2023 16:45", ref: "WDL-11029-X", type: "Withdrawal", desc: "Tutor Payout (Processed)", amount: -3200000 },
];

const formatVnd = (value) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);

export default function Transactions() {
  const [queue, setQueue] = useState(12);
  const [rows, setRows] = useState(initialRows);

  const handleBatch = () => {
    if (queue === 0) return;
    window.alert(`Đã xử lý ${queue} yêu cầu rút tiền.`);
    setQueue(0);
  };

  const addMockProcessRow = () => {
    setRows((prev) => [
      {
        time: new Date().toLocaleString("vi-VN"),
        ref: `WDL-${Math.floor(Math.random() * 90000 + 10000)}-P`,
        type: "Withdrawal",
        desc: "Processed withdrawal batch",
        amount: -1500000,
      },
      ...prev,
    ]);
  };

  return (
    <section className="admin-page">
      <div className="admin-page__header">
        <h2>Giao dịch & Rút tiền</h2>
        <p>Theo dõi dòng tiền lớp học và xử lý yêu cầu rút tiền của gia sư.</p>
      </div>

      <div className="admin-grid-3">
        <article className="admin-card admin-stat">
          <p className="admin-stat__label">Đã chi (tháng này)</p>
          <div className="admin-stat__value">₫45,200,000</div>
          <p className="admin-stat__sub">+12% so với tháng trước</p>
        </article>

        <article className="admin-card admin-stat">
          <p className="admin-stat__label">Yêu cầu rút tiền</p>
          <div className="admin-stat__value">{queue}</div>
          <p className="admin-stat__sub">Đang chờ xử lý</p>
        </article>

        <article className="admin-card" style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 10 }}>
          <button type="button" className="admin-btn admin-btn--primary" onClick={handleBatch} disabled={queue === 0}>
            Xử lý hàng loạt
          </button>
          <button type="button" className="admin-btn admin-btn--secondary" onClick={addMockProcessRow}>
            Thêm bản ghi xử lý
          </button>
        </article>
      </div>

      <div className="admin-card" style={{ overflowX: "auto" }}>
        <h3 style={{ marginTop: 0 }}>Sổ cái giao dịch</h3>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Thời gian</th>
              <th>Mã giao dịch</th>
              <th>Loại</th>
              <th>Mô tả</th>
              <th style={{ textAlign: "right" }}>Số tiền</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.ref}>
                <td>{row.time}</td>
                <td>{row.ref}</td>
                <td>{row.type}</td>
                <td>{row.desc}</td>
                <td style={{ textAlign: "right", color: row.amount > 0 ? "var(--color-primary)" : "var(--color-error)", fontWeight: 700 }}>
                  {formatVnd(row.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}