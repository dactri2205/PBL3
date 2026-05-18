import { useEffect, useMemo, useState } from "react";
import {
  createStudentReview,
  getStudentCourses,
  getStudentReviews,
} from "../../services/studentService";

const initialReviewForm = {
  courseId: "",
  rating: "5",
  comment: "",
};

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState(initialReviewForm);

  const loadData = () => {
    Promise.all([getStudentReviews(), getStudentCourses()]).then(
      ([reviewData, courseData]) => {
        setReviews(reviewData);
        setCourses(courseData);
      }
    );
  };

  useEffect(() => {
    loadData();
  }, []);

  const reviewableCourses = useMemo(
    () =>
      courses.filter(
        (course) => course.status === "registered" && !course.reviewed
      ),
    [courses]
  );

  const selectedCourse = useMemo(
    () => courses.find((course) => String(course.id) === form.courseId),
    [courses, form.courseId]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    createStudentReview({
      courseId: Number(form.courseId),
      tutorName: selectedCourse.tutorName,
      courseName: selectedCourse.title,
      rating: Number(form.rating),
      comment: form.comment,
    }).then((newReview) => {
      setReviews((current) => [newReview, ...current]);
      setCourses((current) =>
        current.map((course) =>
          course.id === newReview.courseId ? { ...course, reviewed: true } : course
        )
      );
      setForm(initialReviewForm);
    });
  };

  return (
    <div>
      <div className="student-dashboard__hero">
        <div>
          <h1 className="student-dashboard__heading">Đánh giá khóa học</h1>
          <p className="student-dashboard__subtext">
            Gửi đánh giá khóa học và gia sư sau khi kết thúc chương trình.
          </p>
        </div>
      </div>

      <section className="student-card student-section-card">
        <div className="student-card__header">
          <h3 className="student-card__title">Viết đánh giá mới</h3>
          <span className="student-card__muted">
            {reviewableCourses.length} khóa học có thể đánh giá
          </span>
        </div>

        <form className="student-form student-form--inline" onSubmit={handleSubmit}>
          <label htmlFor="courseId">
            Khóa học
            <select
              id="courseId"
              name="courseId"
              value={form.courseId}
              onChange={handleChange}
              required
            >
              <option value="">Chọn khóa học</option>
              {reviewableCourses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title} - {course.tutorName}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="rating">
            Số sao
            <select
              id="rating"
              name="rating"
              value={form.rating}
              onChange={handleChange}
            >
              {[5, 4, 3, 2, 1].map((rating) => (
                <option key={rating} value={rating}>
                  {rating} sao
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="comment" className="student-form__wide">
            Nhận xét
            <textarea
              id="comment"
              name="comment"
              rows="3"
              value={form.comment}
              onChange={handleChange}
              required
              placeholder="Nhận xét về chất lượng khóa học và gia sư"
            />
          </label>

          <button
            type="submit"
            className="student-dashboard__primary-btn"
            disabled={!reviewableCourses.length}
          >
            Gửi đánh giá
          </button>
        </form>
      </section>

      <section className="student-list-grid">
        {reviews.map((review) => (
          <article className="student-card student-management-card" key={review.id}>
            <div className="student-management-card__header">
              <div>
                <p className="student-card__muted">{review.courseName}</p>
                <h3 className="student-card__title">{review.tutorName}</h3>
              </div>
              <span className="student-rating">
                <span className="material-symbols-outlined">star</span>
                {review.rating}
              </span>
            </div>
            <p>{review.comment}</p>
            <p className="student-card__muted">Ngày đánh giá: {review.date}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
