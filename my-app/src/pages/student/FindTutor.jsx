import { useEffect, useMemo, useState } from "react";
import TutorCard from "../../components/student/TutorCard";
import TutorCardSkeleton from "../../components/student/TutorCardSkeleton";
import EmptyState from "../../components/student/EmptyState";
import ErrorState from "../../components/student/ErrorState";
import { getAvailableTutors, sendTutorRequest } from "../../services/studentService";

export default function FindTutor() {
  const [status, setStatus] = useState("loading");
  const [tutors, setTutors] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    city: "",
    subject: "",
  });

  const loadTutors = () => {
    setStatus("loading");
    getAvailableTutors()
      .then((data) => {
        setTutors(data);
        setStatus("success");
      })
      .catch(() => setStatus("error"));
  };

  useEffect(() => {
    loadTutors();
  }, []);

  const cityOptions = useMemo(
    () => [...new Set(tutors.map((tutor) => tutor.city))],
    [tutors]
  );

  const subjectOptions = useMemo(
    () => [...new Set(tutors.map((tutor) => tutor.subject))],
    [tutors]
  );

  const filteredTutors = useMemo(() => {
    const name = filters.name.trim().toLowerCase();

    return tutors.filter((tutor) => {
      const matchesName = tutor.name.toLowerCase().includes(name);
      const matchesCity = !filters.city || tutor.city === filters.city;
      const matchesSubject = !filters.subject || tutor.subject === filters.subject;

      return matchesName && matchesCity && matchesSubject;
    });
  }, [filters, tutors]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((current) => ({ ...current, [name]: value }));
  };

  const handleRequestTutor = (tutorId) => {
    sendTutorRequest(tutorId).then((updatedTutor) => {
      setTutors((current) =>
        current.map((tutor) => (tutor.id === tutorId ? updatedTutor : tutor))
      );
    });
  };

  return (
    <div className="student-find-tutor">
      <div className="student-dashboard__hero">
        <div>
          <h1 className="student-dashboard__heading">Tìm kiếm gia sư phù hợp</h1>
          <p className="student-dashboard__subtext">
            Tìm theo tên, tỉnh thành hoặc môn học rồi gửi yêu cầu đăng ký.
          </p>
        </div>
      </div>

      <section className="student-card student-filter-panel">
        <label>
          Tên gia sư
          <input
            name="name"
            value={filters.name}
            onChange={handleFilterChange}
            placeholder="Nhập tên gia sư"
          />
        </label>

        <label>
          Tỉnh thành
          <select name="city" value={filters.city} onChange={handleFilterChange}>
            <option value="">Tất cả tỉnh thành</option>
            {cityOptions.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </label>

        <label>
          Môn học
          <select
            name="subject"
            value={filters.subject}
            onChange={handleFilterChange}
          >
            <option value="">Tất cả môn học</option>
            {subjectOptions.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </label>
      </section>

      {status === "loading" && (
        <div className="student-find-tutor__grid">
          <TutorCardSkeleton />
          <TutorCardSkeleton />
          <TutorCardSkeleton />
        </div>
      )}

      {status === "empty" && <EmptyState />}

      {status === "error" && <ErrorState onRetry={loadTutors} />}

      {status === "success" && filteredTutors.length === 0 && <EmptyState />}

      {status === "success" && filteredTutors.length > 0 && (
        <div className="student-find-tutor__grid">
          {filteredTutors.map((tutor) => (
            <TutorCard
              key={tutor.id}
              tutor={tutor}
              actionLabel={tutor.status === "requested" ? "Đã gửi yêu cầu" : "Đăng ký"}
              disabled={tutor.status === "requested"}
              onAction={() => handleRequestTutor(tutor.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
