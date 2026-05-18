import { useEffect, useState } from "react";
import { getStudentProfile, updateStudentProfile } from "../../services/studentService";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [draft, setDraft] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getStudentProfile().then((data) => {
      setProfile(data);
      setDraft(data);
    });
  }, []);

  const openEditModal = () => {
    setDraft(profile);
    setIsEditing(true);
  };

  const closeEditModal = () => {
    setDraft(profile);
    setIsEditing(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDraft((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    updateStudentProfile(draft).then((updatedProfile) => {
      setProfile(updatedProfile);
      setDraft(updatedProfile);
      setIsEditing(false);
    });
  };

  if (!profile) {
    return <div className="student-card">Đang tải hồ sơ...</div>;
  }

  return (
    <div className="student-profile">
      <div className="student-dashboard__hero">
        <div>
          <h1 className="student-dashboard__heading">Hồ sơ cá nhân</h1>
          <p className="student-dashboard__subtext">
            Cập nhật thông tin tài khoản học viên và mục tiêu học tập.
          </p>
        </div>
      </div>

      <div
        className="student-card"
        style={{ padding: 0, overflow: "hidden", marginBottom: "24px" }}
      >
        <div
          style={{
            height: "150px",
            background: "linear-gradient(90deg, #7C6E27 0%, #D1A751 100%)",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "20px",
            padding: "24px",
            marginTop: "-46px",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <img
              src="/anonymous.jpg"
              alt={profile.fullName}
              style={{
                width: "92px",
                height: "92px",
                borderRadius: "24px",
                objectFit: "cover",
                border: "5px solid #fff",
              }}
            />
            <div style={{ marginTop: 28 }}>
              <h2 style={{ margin: 0, fontSize: "34px", fontWeight: 700 }}>
                {profile.fullName}
              </h2>
              <p
                style={{
                  margin: "6px 0 0",
                  color: "var(--color-primary)",
                  fontWeight: 600,
                }}
              >
                Học viên Premium
              </p>
            </div>
          </div>

          <button className="student-dashboard__primary-btn" onClick={openEditModal}>
            Chỉnh sửa hồ sơ
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "22px" }}>
        <div className="student-card">
          <h3 className="student-card__title">Thông tin liên hệ</h3>
          <p>Email: {profile.email}</p>
          <p>Số điện thoại: {profile.phone}</p>
          <p>Địa chỉ: {profile.address}</p>
        </div>

        <div className="student-card">
          <h3 className="student-card__title">Mục tiêu học tập</h3>
          <p>{profile.learningGoal}</p>
        </div>
      </div>

      {isEditing && (
        <div className="student-modal" role="dialog" aria-modal="true">
          <div className="student-modal__content">
            <h2>Chỉnh sửa hồ sơ học viên</h2>

            <form className="student-form" onSubmit={handleSubmit}>
              <label htmlFor="fullName">Họ và tên</label>
              <input
                id="fullName"
                name="fullName"
                value={draft.fullName}
                onChange={handleChange}
                required
              />

              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={draft.email}
                onChange={handleChange}
                required
              />

              <label htmlFor="phone">Số điện thoại</label>
              <input
                id="phone"
                name="phone"
                value={draft.phone}
                onChange={handleChange}
                required
              />

              <label htmlFor="address">Địa chỉ</label>
              <input
                id="address"
                name="address"
                value={draft.address}
                onChange={handleChange}
                required
              />

              <label htmlFor="learningGoal">Mục tiêu học tập</label>
              <textarea
                id="learningGoal"
                name="learningGoal"
                rows="4"
                value={draft.learningGoal}
                onChange={handleChange}
                required
              />

              <div className="student-modal__actions">
                <button
                  type="button"
                  className="student-secondary-btn"
                  onClick={closeEditModal}
                >
                  Hủy
                </button>
                <button type="submit" className="student-dashboard__primary-btn">
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
