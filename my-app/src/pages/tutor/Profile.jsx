import { useState } from "react";

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user")) || {};
  } catch {
    return {};
  }
};

const getInitialProfile = () => {
  const user = getStoredUser();

  const defaultProfile = {
    name: "Trần Minh Thắng",
    title: "Gia sư Kim Cương · Toán nâng cao",
    email: user.email || "thang.tutor@example.com",
    phone: "+84 901 234 567",
    address: "Đà Nẵng, Việt Nam",
    specialties: "Toán nâng cao, Vật lý, Luyện thi THPT Quốc Gia",
    experience: "5 năm",
    rating: "4.9 / 5",
    avatar: "/anonymous.jpg",
  };

  try {
    return {
      ...defaultProfile,
      ...JSON.parse(localStorage.getItem("tutorProfile")),
    };
  } catch {
    return defaultProfile;
  }
};

export default function Profile() {
  const [profile, setProfile] = useState(getInitialProfile);
  const [draft, setDraft] = useState(profile);
  const [isEditing, setIsEditing] = useState(false);

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
    setDraft((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextProfile = { ...draft };
    const user = getStoredUser();

    setProfile(nextProfile);
    localStorage.setItem("tutorProfile", JSON.stringify(nextProfile));
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...user,
        fullName: nextProfile.name,
        email: nextProfile.email,
      })
    );
    setIsEditing(false);
  };

  return (
    <div>
      <div className="tutor-page__header">
        <div>
          <h1 className="tutor-page__title">Hồ sơ cá nhân</h1>
          <p className="tutor-page__subtitle">
            Quản lý thông tin và hồ sơ chuyên môn.
          </p>
        </div>

        <button className="tutor-btn tutor-btn--primary" onClick={openEditModal}>
          Chỉnh sửa hồ sơ
        </button>
      </div>

      <div className="tutor-card" style={{ overflow: "hidden", marginBottom: 24 }}>
        <div
          style={{
            height: 150,
            background: "linear-gradient(90deg, #7C6E27, #D1A751)",
          }}
        />

        <div
          style={{
            padding: 26,
            display: "flex",
            alignItems: "center",
            gap: 18,
            marginTop: -64,
          }}
        >
          <img
            src={profile.avatar}
            alt={profile.name}
            style={{
              width: 110,
              height: 110,
              borderRadius: 26,
              objectFit: "cover",
              border: "6px solid #fff",
              background: "#fff",
            }}
          />

          <div style={{ marginTop: 38 }}>
            <h2 style={{ margin: 0, fontSize: 30 }}>{profile.name}</h2>
            <p style={{ color: "var(--tutor-primary)", fontWeight: 800 }}>
              {profile.title}
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <div className="tutor-card" style={{ padding: 26 }}>
          <h3>Thông tin liên hệ</h3>
          <p>Email: {profile.email}</p>
          <p>Số điện thoại: {profile.phone}</p>
          <p>Địa chỉ: {profile.address}</p>
        </div>

        <div className="tutor-card" style={{ padding: 26 }}>
          <h3>Chuyên môn</h3>
          <p>{profile.specialties}</p>
          <p>Kinh nghiệm: {profile.experience}</p>
          <p>Đánh giá trung bình: {profile.rating}</p>
        </div>
      </div>

      {isEditing && (
        <div className="tutor-modal" role="dialog" aria-modal="true">
          <div
            className="tutor-modal__content"
            style={{ maxWidth: 680, maxHeight: "90vh", overflowY: "auto" }}
          >
            <h2>Chỉnh sửa hồ sơ gia sư</h2>

            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Họ và tên</label>
              <input
                id="name"
                name="name"
                value={draft.name}
                onChange={handleChange}
                required
              />

              <label htmlFor="title">Danh hiệu</label>
              <input
                id="title"
                name="title"
                value={draft.title}
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

              <label htmlFor="specialties">Chuyên môn</label>
              <textarea
                id="specialties"
                name="specialties"
                rows="3"
                value={draft.specialties}
                onChange={handleChange}
                required
              />

              <label htmlFor="experience">Kinh nghiệm</label>
              <input
                id="experience"
                name="experience"
                value={draft.experience}
                onChange={handleChange}
                required
              />

              <label htmlFor="rating">Đánh giá trung bình</label>
              <input
                id="rating"
                name="rating"
                value={draft.rating}
                onChange={handleChange}
                required
              />

              <label htmlFor="avatar">Ảnh đại diện URL</label>
              <input
                id="avatar"
                name="avatar"
                value={draft.avatar}
                onChange={handleChange}
                placeholder="/anonymous.jpg"
              />

              <div className="tutor-modal__actions">
                <button
                  type="button"
                  className="tutor-btn tutor-btn--ghost"
                  onClick={closeEditModal}
                >
                  Hủy
                </button>
                <button type="submit" className="tutor-btn tutor-btn--primary">
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
