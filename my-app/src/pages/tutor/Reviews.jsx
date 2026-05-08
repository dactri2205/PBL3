import { useMemo, useState } from "react";
import TutorReviewCard from "../../components/tutor/TutorReviewCard";
import { mockTutorReviews } from "../../mock/mockTutorReviews";

const ratingFilters = [
  { value: "all", label: "Tất cả đánh giá" },
  { value: "5", label: "5 sao" },
  { value: "4", label: "4 sao" },
  { value: "3", label: "3 sao" },
  { value: "2", label: "2 sao" },
  { value: "1", label: "1 sao" },
];

export default function Reviews() {
  const [reviews] = useState(mockTutorReviews);
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");

  const totalReviews = reviews.length;

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0;

    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  }, [reviews]);

  const ratingDistribution = useMemo(() => {
    const result = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    };

    reviews.forEach((review) => {
      result[review.rating] = (result[review.rating] || 0) + 1;
    });

    return result;
  }, [reviews]);

  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      const keyword = searchTerm.toLowerCase();

      const matchSearch =
        review.student.toLowerCase().includes(keyword) ||
        review.subject.toLowerCase().includes(keyword) ||
        review.comment.toLowerCase().includes(keyword);

      const matchRating =
        ratingFilter === "all" || review.rating === Number(ratingFilter);

      return matchSearch && matchRating;
    });
  }, [reviews, searchTerm, ratingFilter]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <span
        key={index}
        className={
          index < Math.round(rating)
            ? "tutor-reviews__star tutor-reviews__star--filled"
            : "tutor-reviews__star"
        }
      >
        ★
      </span>
    ));
  };

  return (
    <div className="tutor-reviews">
      <div className="tutor-page__header">
        <div>
          <h1 className="tutor-page__title">Đánh giá của học viên</h1>
          <p className="tutor-page__subtitle">
            Theo dõi phản hồi, điểm đánh giá trung bình và chất lượng giảng dạy.
          </p>
        </div>
      </div>

      <section className="tutor-reviews__summary">
        <div className="tutor-card tutor-reviews__average-card">
          <p>Điểm trung bình</p>

          <div className="tutor-reviews__average-score">
            <h2>{averageRating}</h2>
            <div>
              <div className="tutor-reviews__stars">
                {renderStars(Number(averageRating))}
              </div>
              <span>{totalReviews} đánh giá</span>
            </div>
          </div>
        </div>

        <div className="tutor-card tutor-reviews__small-card">
          <span className="material-symbols-outlined">reviews</span>
          <p>Tổng số đánh giá</p>
          <h3>{totalReviews}</h3>
        </div>

        <div className="tutor-card tutor-reviews__small-card">
          <span className="material-symbols-outlined">star</span>
          <p>Đánh giá 5 sao</p>
          <h3>{ratingDistribution[5]}</h3>
        </div>

        <div className="tutor-card tutor-reviews__small-card">
          <span className="material-symbols-outlined">trending_up</span>
          <p>Tỷ lệ hài lòng</p>
          <h3>
            {totalReviews > 0
              ? Math.round(
                  ((ratingDistribution[5] + ratingDistribution[4]) /
                    totalReviews) *
                    100
                )
              : 0}
            %
          </h3>
        </div>
      </section>

      <section className="tutor-card tutor-reviews__distribution">
        <div className="tutor-reviews__section-header">
          <div>
            <h3>Phân bố đánh giá</h3>
            <p>Tỷ lệ số lượng đánh giá theo từng mức sao.</p>
          </div>
        </div>

        <div className="tutor-reviews__distribution-list">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = ratingDistribution[star];
            const percentage =
              totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;

            return (
              <div className="tutor-reviews__distribution-row" key={star}>
                <span>{star} sao</span>

                <div className="tutor-reviews__bar">
                  <div style={{ width: `${percentage}%` }}></div>
                </div>

                <strong>
                  {count} đánh giá · {percentage}%
                </strong>
              </div>
            );
          })}
        </div>
      </section>

      <section className="tutor-card tutor-reviews__panel">
        <div className="tutor-reviews__toolbar">
          <div className="tutor-reviews__search">
            <span className="material-symbols-outlined">search</span>
            <input
              placeholder="Tìm theo tên học viên, môn học hoặc nội dung..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="tutor-reviews__filter"
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
          >
            {ratingFilters.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div className="tutor-reviews__list">
          {filteredReviews.length === 0 ? (
            <div className="tutor-reviews__empty">
              <span className="material-symbols-outlined">search_off</span>
              <h3>Không tìm thấy đánh giá phù hợp</h3>
              <p>Hãy thử đổi từ khóa tìm kiếm hoặc bộ lọc số sao.</p>
            </div>
          ) : (
            filteredReviews.map((review) => (
              <TutorReviewCard key={review.id} review={review} />
            ))
          )}
        </div>
      </section>
    </div>
  );
}