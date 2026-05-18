import LazyAvatar from "./LazyAvatar";

const formatPrice = (price) => {
  if (typeof price === "number") {
    return `${price.toLocaleString("vi-VN")}đ`;
  }

  return price;
};

export default function TutorCard({ tutor, actionLabel = "Chi tiết", onAction, disabled = false }) {
  const subjects = tutor.subjects || [tutor.subject].filter(Boolean);

  return (
    <article className="tutor-card">
      <div className="tutor-card__top">
        <LazyAvatar
          src={tutor.avatar}
          alt={tutor.name}
          fallback="/anonymous.jpg"
        />

        <div className="tutor-card__main">
          <h3 className="tutor-card__name">{tutor.name}</h3>

          <div className="tutor-card__rating">
            <span className="material-symbols-outlined tutor-card__star">
              star
            </span>
            <span className="tutor-card__rating-value">{tutor.rating}</span>
            <span className="tutor-card__reviews">
              ({tutor.reviews || 0} đánh giá)
            </span>
          </div>

          <div className="tutor-card__tags">
            {subjects.map((subject) => (
              <span key={subject} className="tutor-card__tag">
                {subject}
              </span>
            ))}
          </div>
        </div>
      </div>

      <p className="tutor-card__desc">
        {tutor.description || tutor.experience || `${tutor.city} · ${tutor.mode === "online" ? "Online" : "Trực tiếp"}`}
      </p>

      <div className="tutor-card__bottom">
        <div>
          <p className="tutor-card__fee-label">HỌC PHÍ TỪ</p>
          <p className="tutor-card__fee">
            {formatPrice(tutor.price)}
            <span>/giờ</span>
          </p>
        </div>

        <button className="tutor-card__btn" onClick={onAction} disabled={disabled}>
          {actionLabel}
        </button>
      </div>
    </article>
  );
}
