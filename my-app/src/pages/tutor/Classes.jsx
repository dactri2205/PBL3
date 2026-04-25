import TutorClassCard from "../../components/tutor/TutorClassCard";
import { tutorClasses } from "../../mock/mockTutorClasses";

export default function Classes() {
  return (
    <div>
      <div className="tutor-page__header">
        <div>
          <h1 className="tutor-page__title">Quản lý lớp học</h1>
          <p className="tutor-page__subtitle">
            Bạn đang có 6 lớp học đang hoạt động và chờ mở.
          </p>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <button className="tutor-btn tutor-btn--ghost">Bộ lọc</button>
          <button className="tutor-btn tutor-btn--primary">Tạo lớp mới</button>
        </div>
      </div>

      <div className="tutor-classes__grid">
        {tutorClasses.map((item) => (
          <TutorClassCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}