import { useState } from "react";
import TutorCard from "../../components/student/TutorCard";
import TutorCardSkeleton from "../../components/student/TutorCardSkeleton";
import EmptyState from "../../components/student/EmptyState";
import ErrorState from "../../components/student/ErrorState";

const tutors = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    avatar: null,
    rating: 4.8,
    reviews: 48,
    subjects: ["TOÁN", "LÝ"],
    description: "5 năm kinh nghiệm dạy kèm đại học.",
    price: "200.000đ",
  },
  {
    id: 2,
    name: "Trần Thị B",
    avatar: null,
    rating: 4.9,
    reviews: 64,
    subjects: ["TIẾNG ANH", "IELTS"],
    description: "Chuyên gia luyện thi IELTS 8.5.",
    price: "350.000đ",
  },
  {
    id: 3,
    name: "Lê Văn C",
    avatar: null,
    rating: 4.7,
    reviews: 45,
    subjects: ["HÓA HỌC", "SINH HỌC"],
    description: "Giáo viên trường chuyên.",
    price: "250.000đ",
  },
];

export default function FindTutor() {
  const [status, setStatus] = useState("success");
  // thử đổi status = "loading" | "empty" | "error"

  return (
    <div className="student-find-tutor">
      <div className="student-dashboard__hero">
        <div>
          <h1 className="student-dashboard__heading">Tìm kiếm gia sư phù hợp</h1>
          <p className="student-dashboard__subtext">
            Dựa trên mục tiêu học tập của bạn.
          </p>
        </div>

        <button className="student-dashboard__primary-btn">
          <span className="material-symbols-outlined">filter_alt</span>
          Lọc theo môn
        </button>
      </div>

      {status === "loading" && (
        <div className="student-find-tutor__grid">
          <TutorCardSkeleton />
          <TutorCardSkeleton />
          <TutorCardSkeleton />
        </div>
      )}

      {status === "empty" && <EmptyState />}

      {status === "error" && <ErrorState onRetry={() => setStatus("success")} />}

      {status === "success" && (
        <div className="student-find-tutor__grid">
          {tutors.map((tutor) => (
            <TutorCard key={tutor.id} tutor={tutor} />
          ))}
        </div>
      )}
    </div>
  );
}