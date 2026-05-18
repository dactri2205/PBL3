export default function Topbar() {
  return (
    <header className="admin-topbar">
      <div className="admin-topbar__search">
        <span className="material-symbols-outlined">search</span>
        <input type="text" placeholder="Tìm kiếm lớp học, học viên, giao dịch..." />
      </div>

      <div className="admin-topbar__actions">
        <button className="admin-topbar__action-btn">
          <span className="material-symbols-outlined">notifications</span>
        </button>

        <div className="admin-topbar__profile">
          <img src="https://i.pravatar.cc/100?img=68" alt="Admin avatar" />
          <div>
            <div className="admin-topbar__name">Admin System</div>
            <div className="admin-topbar__role">Quản trị nền tảng</div>
          </div>
        </div>
      </div>
    </header>
  );
}
