import { useMemo, useState } from "react";

const classes = [
  { id: "REQ-0924-A1", title: "Toán Đại số Lớp 10", status: "Đang tìm gia sư", location: "Quận 7, TP.HCM", fee: "2.500.000đ / tháng" },
  { id: "REQ-1094-B2", title: "Lý 11", status: "Đang dạy", location: "Quận 3, TP.HCM", fee: "3.200.000đ / tháng" },
  { id: "REQ-2040-C7", title: "IELTS Writing", status: "Hoàn thành", location: "Online", fee: "3.000.000đ / tháng" },
  { id: "REQ-3101-K9", title: "Hóa 12", status: "Đã hủy", location: "Quận 10, TP.HCM", fee: "2.700.000đ / tháng" },
];

const tabs = ["Đang tìm gia sư", "Đang dạy", "Hoàn thành", "Đã hủy"];

export default function ClassManagement() {
  const [activeTab, setActiveTab] = useState("Đang tìm gia sư");

  const filtered = useMemo(
    () => classes.filter((item) => item.status === activeTab),
    [activeTab]
  );

  return (
    <section className="admin-page">
      <div className="admin-page__header">
        <h2>Quản lý lớp học</h2>
        <p>Rà soát yêu cầu mở lớp và phân công gia sư.</p>
      </div>

      <div className="admin-toolbar" style={{ justifyContent: "flex-start" }}>
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            className={`admin-btn ${tab === activeTab ? "admin-btn--primary" : "admin-btn--secondary"}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {filtered.map((item) => (
        <div key={item.id} className="admin-card">
          <h3 style={{ marginTop: 0 }}>{item.title}</h3>
          <p style={{ color: "var(--color-text-muted)" }}>{item.id} • {item.location}</p>
          <p>Trạng thái: {item.status}</p>
          <p style={{ color: "var(--color-primary)", fontWeight: 700 }}>{item.fee}</p>
        </div>
      ))}

      {filtered.length === 0 && (
        <div className="admin-card">
          <p style={{ margin: 0, color: "var(--color-text-muted)" }}>Không có lớp trong trạng thái này.</p>
        </div>
      )}
    </section>
  );
}