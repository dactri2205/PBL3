import { useMemo, useState } from "react";

const accounts = [
  { id: "#1042", name: "Eleanor Vance", email: "e.vance@scholarly.edu", role: "Admin", status: "ACTIVE" },
  { id: "#1045", name: "Dr. Alistair Crane", email: "a.crane@university.edu", role: "Tutor", status: "ACTIVE" },
  { id: "#1048", name: "Theodore Laurence", email: "laurie@student.edu", role: "Student", status: "PENDING" },
  { id: "#1051", name: "Silas Marner", email: "s.marner@weaver.net", role: "Tutor", status: "SUSPENDED" },
];

const roles = ["All", "Tutor", "Student", "Admin"];

export default function Accounts() {
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const filtered = useMemo(() => {
    return accounts.filter((item) => {
      const matchRole = roleFilter === "All" || item.role === roleFilter;
      const key = `${item.id} ${item.name} ${item.email}`.toLowerCase();
      const matchQuery = key.includes(query.trim().toLowerCase());
      return matchRole && matchQuery;
    });
  }, [query, roleFilter]);

  return (
    <section className="admin-page">
      <div className="admin-page__header">
        <h2>Quản lý tài khoản</h2>
        <p>Quản trị người dùng và quyền truy cập hệ thống.</p>
      </div>

      <div className="admin-toolbar">
        <input
          className="admin-input"
          placeholder="Tìm theo tên, email hoặc mã..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {roles.map((role) => {
            const isActive = roleFilter === role;
            return (
              <button
                key={role}
                type="button"
                className={`admin-btn ${isActive ? "admin-btn--primary" : "admin-btn--secondary"}`}
                onClick={() => setRoleFilter(role)}
              >
                {role === "All" ? "Tất cả" : role}
              </button>
            );
          })}
        </div>
      </div>

      <div className="admin-card" style={{ overflowX: "auto" }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên</th>
              <th>Email</th>
              <th>Vai trò</th>
              <th>Trạng thái</th>
              <th style={{ textAlign: "right" }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
                <td>{item.status}</td>
                <td style={{ textAlign: "right" }}>
                  <button
                    type="button"
                    className="admin-btn admin-btn--secondary"
                    onClick={() => window.alert(`Mở chỉnh sửa tài khoản ${item.id}`)}
                  >
                    Sửa
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", color: "var(--color-text-muted)" }}>
                  Không có dữ liệu phù hợp.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}