import { useState } from "react";

export default function SystemConfig() {
  const [commission, setCommission] = useState(15);
  const [postingFee, setPostingFee] = useState("50,000");
  const [saved, setSaved] = useState({ commission: 15, postingFee: "50,000" });

  const handleCancel = () => {
    setCommission(saved.commission);
    setPostingFee(saved.postingFee);
  };

  const handleSave = () => {
    const snapshot = { commission, postingFee };
    setSaved(snapshot);
    window.alert("Đã lưu cấu hình hệ thống.");
  };

  return (
    <section className="admin-page">
      <div className="admin-page__header">
        <h2>Cấu hình hệ thống</h2>
        <p>Thiết lập các thông số vận hành chính của nền tảng.</p>
      </div>

      <div className="admin-card" style={{ display: "grid", gap: 16 }}>
        <label>
          <div className="admin-stat__label" style={{ marginBottom: 8 }}>% Phí hoa hồng nhận lớp</div>
          <input className="admin-input" type="number" value={commission} onChange={(e) => setCommission(Number(e.target.value || 0))} />
        </label>

        <label>
          <div className="admin-stat__label" style={{ marginBottom: 8 }}>Phí đăng tin định mức</div>
          <input className="admin-input" type="text" value={postingFee} onChange={(e) => setPostingFee(e.target.value)} />
        </label>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button type="button" className="admin-btn admin-btn--secondary" onClick={handleCancel}>Hủy bỏ</button>
          <button type="button" className="admin-btn admin-btn--primary" onClick={handleSave}>Lưu thay đổi</button>
        </div>
      </div>
    </section>
  );
}