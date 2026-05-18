import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../services/authService";

const navItems = [
  { to: "/admin/dashboard", label: "Tổng quan", icon: "dashboard" },
  { to: "/admin/accounts", label: "Tài khoản", icon: "group" },
  { to: "/admin/verifications", label: "Xác minh", icon: "verified_user" },
  { to: "/admin/transactions", label: "Giao dịch", icon: "account_balance_wallet" },
  { to: "/admin/system-config", label: "Cấu hình", icon: "settings_suggest" },
  { to: "/admin/classes", label: "Quản lý lớp", icon: "school" },
];

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="admin-sidebar">
      <div className="admin-sidebar__brand">
        <div className="admin-sidebar__logo">E</div>
        <div className="admin-sidebar__brand-text">EduMatch</div>
      </div>

      <nav className="admin-sidebar__menu">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `admin-sidebar__link ${isActive ? "admin-sidebar__link--active" : ""}`
            }
          >
            <span className="material-symbols-outlined admin-sidebar__icon">{item.icon}</span>
            <span className="admin-sidebar__label">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="admin-sidebar__footer">
        <div className="admin-sidebar__role">
          <span className="material-symbols-outlined admin-sidebar__icon">admin_panel_settings</span>
          <div>
            <div className="admin-sidebar__role-caption">Đang là</div>
            <div className="admin-sidebar__role-value">Quản trị viên</div>
          </div>
        </div>

        <button className="admin-sidebar__logout" onClick={handleLogout}>
          <span className="material-symbols-outlined admin-sidebar__icon">logout</span>
          <span>Đăng xuất</span>
        </button>
      </div>
    </div>
  );
}
