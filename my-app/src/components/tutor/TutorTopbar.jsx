import { useLocation } from "react-router-dom";

export default function TutorTopbar({
  searchValue = "",
  onSearchChange,
  placeholder = "Tìm kiếm lớp học, học viên, hóa đơn...",
}) {
  const location = useLocation();

  const hideSearchPaths = ["/tutor/schedule", "/tutor/finance","/tutor/find-students"];
  const shouldHideSearch = hideSearchPaths.includes(location.pathname);

  return (
    <header className="tutor-topbar">
      {!shouldHideSearch ? (
        <div className="tutor-topbar__search">
          <span className="material-symbols-outlined">search</span>

          <input
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder={placeholder}
          />
        </div>
      ) : (
        <div></div>
      )}

      <div className="tutor-topbar__actions">
        <button className="tutor-topbar__icon-btn">
          <span className="material-symbols-outlined">notifications</span>
        </button>

        <div className="tutor-topbar__profile">
          <img src="https://i.pravatar.cc/100?img=12" alt="Tutor avatar" />

          <div>
            <div className="tutor-topbar__name">Trần Minh Thắng</div>
            <div className="tutor-topbar__role">Gia sư kim cương</div>
          </div>
        </div>
      </div>
    </header>
  );
}
