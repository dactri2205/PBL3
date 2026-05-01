import React from "react";
import "../../styles/tutor/tutor-demand-card.css";

const TutorDemandCard = ({
  demand,
  onViewDetails,
  onSendProposal,
  onSaveDemand,
}) => {
  const {
    studentName,
    subject,
    level,
    location,
    mode,
    budget,
    schedule,
    note,
    status,
  } = demand;

  const modeLabel = mode === "online" ? "Online" : "Offline";
  const isSaved = status === "saved";
  const isApplied = status === "applied";

  return (
    <div className="tutor-demand-card">
      <div className="demand-header">
        <div className="demand-title-section">
          <h3 className="demand-subject">{subject}</h3>

          <span className={`demand-status-badge status-${status}`}>
            {status === "open"
              ? "Đang tìm"
              : status === "applied"
              ? "Đã gửi"
              : "Đã lưu"}
          </span>
        </div>

        <button
          className={`btn-save ${isSaved ? "saved" : ""}`}
          onClick={() => onSaveDemand(demand)}
          title={isSaved ? "Bỏ lưu" : "Lưu nhu cầu"}
        >
          <span className="material-symbols-outlined">
            {isSaved ? "favorite" : "favorite_border"}
          </span>
        </button>
      </div>

      <div className="demand-info">
        <div className="info-row">
          <span className="info-label">Học viên:</span>
          <span className="info-value">{studentName || "Học viên ẩn danh"}</span>
        </div>

        <div className="info-row">
          <span className="info-label">Trình độ:</span>
          <span className="info-value">{level}</span>
        </div>

        <div className="info-row">
          <span className="info-label">Địa điểm:</span>
          <span className="info-value">
            {location}
            <span className={`mode-badge mode-${mode}`}>{modeLabel}</span>
          </span>
        </div>

        <div className="info-row">
          <span className="info-label">Học phí:</span>
          <span className="info-value salary">
            {budget.toLocaleString("vi-VN")} VNĐ/buổi
          </span>
        </div>

        <div className="info-row">
          <span className="info-label">Lịch:</span>
          <span className="info-value">{schedule}</span>
        </div>
      </div>

      <div className="demand-note">
        <p>{note}</p>
      </div>

      <div className="demand-actions">
        <button
          className="btn-view-details"
          onClick={() => onViewDetails(demand)}
        >
          <span className="material-symbols-outlined">visibility</span>
          Xem chi tiết
        </button>

        <button
          className={`btn-send-proposal ${isApplied ? "applied" : ""}`}
          onClick={() => onSendProposal(demand)}
          disabled={isApplied}
        >
          <span className="material-symbols-outlined">
            {isApplied ? "check" : "send"}
          </span>
          {isApplied ? "Đã gửi" : "Gửi đề nghị"}
        </button>
      </div>
    </div>
  );
};

export default TutorDemandCard;