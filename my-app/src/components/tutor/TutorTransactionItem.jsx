const statusMap = {
  paid: {
    label: "Đã đóng",
    className: "tutor-badge--active",
    icon: "trending_up",
  },
  pending: {
    label: "Chờ thu",
    className: "tutor-badge--pending",
    icon: "schedule",
  },
  failed: {
    label: "Lỗi thanh toán",
    className: "tutor-badge--error",
    icon: "error",
  },
  withdrawn: {
    label: "Đã rút",
    className: "tutor-badge--active",
    icon: "account_balance",
  },
};

export default function TutorTransactionItem({ transaction, onViewDetail }) {
  const status = statusMap[transaction.status] || statusMap.pending;

  const statusLabel =
    transaction.type === "withdrawal" && transaction.status === "pending"
      ? "Chờ xử lý"
      : status.label;

  const formatCurrency = (value) => {
    return Number(value).toLocaleString("vi-VN") + "đ";
  };

  return (
    <button
      className="tutor-transaction-item"
      onClick={() => onViewDetail(transaction)}
    >
      <div className={`tutor-transaction-item__icon ${transaction.status}`}>
        <span className="material-symbols-outlined">{status.icon}</span>
      </div>

      <div className="tutor-transaction-item__info">
        <strong>{transaction.studentName}</strong>
        <span>{transaction.className}</span>
        <small>{transaction.date}</small>
      </div>

      <div className="tutor-transaction-item__right">
        <strong>{formatCurrency(transaction.amount)}</strong>
        <span className={`tutor-badge ${status.className}`}>
          {statusLabel}
        </span>
      </div>
    </button>
  );
}