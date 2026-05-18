import { useState } from "react";

const initialTutors = [
  { id: 1, name: "Nguyen Van A", subject: "Mathematics, Physics", date: "Oct 24, 2023" },
  { id: 2, name: "Tran Thi B", subject: "English Literature", date: "Oct 23, 2023" },
  { id: 3, name: "Le Minh C", subject: "Chemistry", date: "Oct 22, 2023" },
];

export default function Verifications() {
  const [tutors, setTutors] = useState(initialTutors);
  const [selectedId, setSelectedId] = useState(initialTutors[0]?.id ?? null);

  const current = tutors.find((item) => item.id === selectedId) ?? null;

  const handleDecision = (action) => {
    if (!current) return;
    window.alert(`${action === "approve" ? "Đã duyệt" : "Đã từ chối"} hồ sơ ${current.name}`);
    const next = tutors.filter((item) => item.id !== current.id);
    setTutors(next);
    setSelectedId(next[0]?.id ?? null);
  };

  return (
    <section className="admin-page">
      <div className="admin-page__header">
        <h2>Xác minh hồ sơ gia sư</h2>
        <p>Duyệt hồ sơ mới trước khi cho phép nhận lớp.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 20 }}>
        <div className="admin-card" style={{ padding: 14 }}>
          {tutors.map((t) => {
            const active = t.id === selectedId;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setSelectedId(t.id)}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: 14,
                  borderRadius: 12,
                  marginBottom: 10,
                  background: active ? "#fff" : "var(--color-surface-soft)",
                  border: active ? "1px solid var(--color-primary)" : "1px solid var(--color-border)",
                  cursor: "pointer",
                }}
              >
                <strong>{t.name}</strong>
                <p style={{ margin: "6px 0", color: "var(--color-text-muted)" }}>{t.subject}</p>
                <small style={{ color: "var(--color-text-muted)" }}>Submitted: {t.date}</small>
              </button>
            );
          })}
          {tutors.length === 0 && <p style={{ color: "var(--color-text-muted)" }}>Không còn hồ sơ chờ duyệt.</p>}
        </div>

        <div className="admin-card">
          {current ? (
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
              <div>
                <h3 style={{ margin: 0, font: "var(--font-card-title)" }}>{current.name}</h3>
                <p style={{ marginTop: 6, color: "var(--color-text-muted)" }}>ID: TUT-8492-B</p>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button type="button" className="admin-btn admin-btn--secondary" onClick={() => handleDecision("reject")}>Từ chối</button>
                <button type="button" className="admin-btn admin-btn--primary" onClick={() => handleDecision("approve")}>Chấp nhận</button>
              </div>
            </div>
          ) : (
            <p style={{ margin: 0, color: "var(--color-text-muted)" }}>Không có hồ sơ nào cần xử lý.</p>
          )}
        </div>
      </div>
    </section>
  );
}