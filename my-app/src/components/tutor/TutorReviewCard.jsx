export default function TutorReviewCard({ review }) {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <span
        key={index}
        className={
          index < rating
            ? "tutor-review-card__star tutor-review-card__star--filled"
            : "tutor-review-card__star"
        }
      >
        ★
      </span>
    ));
  };

  return (
    <article className="tutor-review-card tutor-card">
      <div className="tutor-review-card__avatar">
        <span className="material-symbols-outlined">person</span>
      </div>

      <div className="tutor-review-card__content">
        <div className="tutor-review-card__top">
          <div>
            <h3>{review.student}</h3>
            <p>{review.subject}</p>
          </div>

          <span className="tutor-review-card__date">{review.date}</span>
        </div>

        <div className="tutor-review-card__rating">
          {renderStars(review.rating)}
          <strong>{review.rating}.0</strong>
        </div>

        <p className="tutor-review-card__comment">“{review.comment}”</p>
      </div>
    </article>
  );
}