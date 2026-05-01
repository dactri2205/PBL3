import React, { useState, useMemo } from "react";
import TutorDemandCard from "../../components/tutor/TutorDemandCard";
import { mockStudentDemands } from "../../mock/mockTutorDemands";
import "../../styles/tutor/tutor-find-students.css";

const FindStudents = () => {
  const [demands, setDemands] = useState(mockStudentDemands);
  const [searchSubject, setSearchSubject] = useState("");
  const [filters, setFilters] = useState({
    location: "",
    mode: "",
    budget: [0, 500000],
    level: "",
  });
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedDemand, setSelectedDemand] = useState(null);

  // Lọc danh sách nhu cầu
  const filteredDemands = useMemo(() => {
    return demands.filter((demand) => {
      // Tìm kiếm theo môn học
      const matchSubject = demand.subject
        .toLowerCase()
        .includes(searchSubject.toLowerCase());

      // Lọc theo địa điểm
      const matchLocation =
        !filters.location ||
        demand.location.toLowerCase().includes(filters.location.toLowerCase());

      // Lọc theo hình thức (Online/Offline)
      const matchMode = !filters.mode || demand.mode === filters.mode;

      // Lọc theo học phí
      const matchBudget =
        demand.budget >= filters.budget[0] && demand.budget <= filters.budget[1];

      // Lọc theo trình độ
      const matchLevel = !filters.level || demand.level === filters.level;

      return matchSubject && matchLocation && matchMode && matchBudget && matchLevel;
    });
  }, [demands, searchSubject, filters]);

  // Xem chi tiết
  const handleViewDetails = (demand) => {
    setSelectedDemand(demand);
    setShowDetailModal(true);
  };

  // Gửi đề nghị
  const handleSendProposal = (demand) => {
    setDemands(
      demands.map((d) =>
        d.id === demand.id ? { ...d, status: "applied" } : d
      )
    );
  };

  // Lưu nhu cầu
  const handleSaveDemand = (demand) => {
    const newStatus = demand.status === "saved" ? "open" : "saved";
    setDemands(
      demands.map((d) =>
        d.id === demand.id ? { ...d, status: newStatus } : d
      )
    );
  };

  // Lấy danh sách các trình độ duy nhất
  const levels = [...new Set(mockStudentDemands.map((d) => d.level))];

  // Lấy danh sách các địa điểm duy nhất
  const locations = [...new Set(mockStudentDemands.map((d) => d.location))];

  return (
      <div className="find-students-container">
        <div className="page-header">
          <h1>Tìm học viên cần dạy</h1>
          <p>Duyệt danh sách các nhu cầu học tập của học viên và gửi đề nghị</p>
        </div>

        {/* Thanh tìm kiếm */}
        <div className="search-bar">
          <div className="search-input-group">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Tìm kiếm theo môn học..."
              value={searchSubject}
              onChange={(e) => setSearchSubject(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* Thanh lọc */}
        <div className="filter-section">
          <div className="filter-group">
            <label>Hình thức:</label>
            <div className="filter-options">
              <button
                className={`filter-btn ${filters.mode === "" ? "active" : ""}`}
                onClick={() => setFilters({ ...filters, mode: "" })}
              >
                Tất cả
              </button>
              <button
                className={`filter-btn ${filters.mode === "online" ? "active" : ""}`}
                onClick={() => setFilters({ ...filters, mode: "online" })}
              >
                <i className="fas fa-wifi"></i> Online
              </button>
              <button
                className={`filter-btn ${filters.mode === "offline" ? "active" : ""}`}
                onClick={() => setFilters({ ...filters, mode: "offline" })}
              >
                <i className="fas fa-map-marker-alt"></i> Offline
              </button>
            </div>
          </div>

          <div className="filter-group">
            <label>Địa điểm:</label>
            <select
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              className="filter-select"
            >
              <option value="">Tất cả địa điểm</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Trình độ:</label>
            <select
              value={filters.level}
              onChange={(e) => setFilters({ ...filters, level: e.target.value })}
              className="filter-select"
            >
              <option value="">Tất cả trình độ</option>
              {levels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Học phí:</label>
            <div className="budget-range">
              <input
                type="number"
                min="0"
                max="500000"
                value={filters.budget[0]}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    budget: [Number(e.target.value), filters.budget[1]],
                  })
                }
                placeholder="Min"
                className="budget-input"
              />
              <span>-</span>
              <input
                type="number"
                min="0"
                max="500000"
                value={filters.budget[1]}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    budget: [filters.budget[0], Number(e.target.value)],
                  })
                }
                placeholder="Max"
                className="budget-input"
              />
              <span className="currency">VNĐ</span>
            </div>
          </div>

          <button
            className="btn-reset-filter"
            onClick={() =>
              setFilters({
                location: "",
                mode: "",
                budget: [0, 500000],
                level: "",
              })
            }
          >
            <i className="fas fa-redo"></i> Reset
          </button>
        </div>

        {/* Kết quả tìm kiếm */}
        <div className="results-info">
          <p>Tìm thấy <strong>{filteredDemands.length}</strong> nhu cầu học viên</p>
        </div>

        {/* Danh sách nhu cầu */}
        <div className="demands-grid">
          {filteredDemands.length > 0 ? (
            filteredDemands.map((demand) => (
              <TutorDemandCard
                key={demand.id}
                demand={demand}
                onViewDetails={handleViewDetails}
                onSendProposal={handleSendProposal}
                onSaveDemand={handleSaveDemand}
              />
            ))
          ) : (
            <div className="empty-state">
              <i className="fas fa-search"></i>
              <h3>Không tìm thấy nhu cầu nào</h3>
              <p>Vui lòng thử thay đổi các bộ lọc của bạn</p>
            </div>
          )}
        </div>

        {/* Modal chi tiết */}
        {showDetailModal && selectedDemand && (
          <div className="modal-overlay" onClick={() => setShowDetailModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{selectedDemand.subject}</h2>
                <button
                  className="btn-close"
                  onClick={() => setShowDetailModal(false)}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <div className="modal-body">
                <div className="detail-row">
                  <span className="detail-label">Trình độ:</span>
                  <span className="detail-value">{selectedDemand.level}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Địa điểm:</span>
                  <span className="detail-value">{selectedDemand.location}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Hình thức:</span>
                  <span className="detail-value">
                    {selectedDemand.mode === "online" ? "Online" : "Offline"}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Học phí:</span>
                  <span className="detail-value salary">
                    {selectedDemand.budget.toLocaleString("vi-VN")} VNĐ/buổi
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Lịch dự kiến:</span>
                  <span className="detail-value">{selectedDemand.schedule}</span>
                </div>
                <div className="detail-row full-width">
                  <span className="detail-label">Ghi chú:</span>
                  <p className="detail-note">{selectedDemand.note}</p>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="btn-secondary"
                  onClick={() => setShowDetailModal(false)}
                >
                  Đóng
                </button>
                <button
                  className="btn-primary"
                  onClick={() => {
                    handleSendProposal(selectedDemand);
                    setShowDetailModal(false);
                  }}
                  disabled={selectedDemand.status === "applied"}
                >
                  {selectedDemand.status === "applied" ? "Đã gửi" : "Gửi đề nghị"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
  );
};

export default FindStudents;
