import { useMemo, useState } from "react";
import TutorTransactionItem from "../../components/tutor/TutorTransactionItem";
import {
  financeSummary,
  financeTransactions,
  tutorBanks,
} from "../../mock/mockTutorFinance";

const emptyWithdrawForm = {
  amount: "",
  bankId: "",
};

const statusOptions = [
  { value: "all", label: "Tất cả trạng thái" },
  { value: "paid", label: "Đã đóng" },
  { value: "pending", label: "Chờ thu / Chờ xử lý" },
  { value: "failed", label: "Lỗi thanh toán" },
  { value: "withdrawn", label: "Đã rút" },
];

const statusMap = {
  paid: {
    label: "Đã đóng",
    className: "tutor-badge--active",
  },
  pending: {
    label: "Chờ thu",
    className: "tutor-badge--pending",
  },
  failed: {
    label: "Lỗi thanh toán",
    className: "tutor-badge--error",
  },
  withdrawn: {
    label: "Đã rút",
    className: "tutor-badge--active",
  },
};

export default function Finance() {
  const [balance, setBalance] = useState(financeSummary.balance);
  const [transactions, setTransactions] = useState(financeTransactions);

  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [withdrawForm, setWithdrawForm] = useState(emptyWithdrawForm);
  const [withdrawError, setWithdrawError] = useState("");

  const formatCurrency = (value) => {
    return Number(value).toLocaleString("vi-VN") + "đ";
  };

  const filteredTransactions = useMemo(() => {
    if (statusFilter === "all") return transactions;

    return transactions.filter((item) => item.status === statusFilter);
  }, [transactions, statusFilter]);

  const monthIncome = transactions
    .filter((item) => item.type === "tuition" && item.status === "paid")
    .reduce((sum, item) => sum + item.amount, 0);

  const pendingFee = transactions
    .filter((item) => item.type === "tuition" && item.status === "pending")
    .reduce((sum, item) => sum + item.amount, 0);

  const failedPayments = transactions.filter(
    (item) => item.status === "failed"
  ).length;

  const handleWithdrawChange = (e) => {
    const { name, value } = e.target;

    setWithdrawForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openWithdrawModal = () => {
    setWithdrawForm(emptyWithdrawForm);
    setWithdrawError("");
    setIsWithdrawOpen(true);
  };

  const closeWithdrawModal = () => {
    setIsWithdrawOpen(false);
    setWithdrawForm(emptyWithdrawForm);
    setWithdrawError("");
  };

  const handleWithdrawSubmit = (e) => {
    e.preventDefault();

    const amount = Number(withdrawForm.amount);
    const selectedBank = tutorBanks.find(
      (bank) => String(bank.id) === String(withdrawForm.bankId)
    );

    if (!amount || amount <= 0) {
      setWithdrawError("Số tiền rút phải lớn hơn 0.");
      return;
    }

    if (amount > balance) {
      setWithdrawError("Số tiền rút không được lớn hơn số dư hiện tại.");
      return;
    }

    if (!selectedBank) {
      setWithdrawError("Vui lòng chọn ngân hàng nhận tiền.");
      return;
    }

    const newWithdrawal = {
      id: Date.now(),
      type: "withdrawal",
      studentName: "Gia sư",
      className: "Yêu cầu rút tiền",
      amount,
      date: new Date().toISOString().slice(0, 10),
      status: "pending",
      bankName: selectedBank.bankName,
      bankAccount: selectedBank.accountNumber,
      accountHolder: selectedBank.accountHolder,
      note: "Yêu cầu rút tiền đang chờ xử lý.",
    };

    setTransactions((prev) => [newWithdrawal, ...prev]);

    // Logic đang chọn: trừ tạm số dư để tránh rút trùng.
    setBalance((prev) => prev - amount);

    closeWithdrawModal();
  };

  const getStatusLabel = (transaction) => {
    if (transaction.type === "withdrawal" && transaction.status === "pending") {
      return "Chờ xử lý";
    }

    return statusMap[transaction.status]?.label || "Không xác định";
  };

  return (
    <div className="tutor-finance">
      <div className="tutor-page__header">
        <div>
          <h1 className="tutor-page__title">Tài chính & Thu nhập</h1>
          <p className="tutor-page__subtitle">
            Quản lý học phí, giao dịch, hóa đơn và yêu cầu rút tiền.
          </p>
        </div>

        <button className="tutor-btn tutor-btn--ghost">
          <span className="material-symbols-outlined">download</span>
          Xuất báo cáo
        </button>
      </div>

      <section className="tutor-finance__summary">
        <div className="tutor-finance__balance">
          <p>Số dư hiện tại</p>
          <h2>{formatCurrency(balance)}</h2>

          <div className="tutor-finance__actions">
            <button type="button" onClick={openWithdrawModal}>
              Rút tiền
            </button>
            <button type="button">Chi tiết</button>
          </div>
        </div>

        <div className="tutor-card tutor-finance__small-card">
          <span className="material-symbols-outlined">trending_up</span>
          <p>Thu nhập tháng này</p>
          <h3>{formatCurrency(monthIncome || financeSummary.monthIncome)}</h3>
          <small>+12% so với tháng trước</small>
        </div>

        <div className="tutor-card tutor-finance__small-card">
          <span className="material-symbols-outlined">receipt_long</span>
          <p>Học phí chờ thu</p>
          <h3>{formatCurrency(pendingFee || financeSummary.pendingFee)}</h3>
          <small>{pendingFee > 0 ? "Có học phí đang chờ thu" : "Không có khoản chờ thu"}</small>
        </div>

        <div className="tutor-card tutor-finance__small-card">
          <span className="material-symbols-outlined">error</span>
          <p>Lỗi thanh toán</p>
          <h3>{failedPayments}</h3>
          <small>Cần kiểm tra lại giao dịch lỗi</small>
        </div>
      </section>

      <section className="tutor-finance__grid">
        <div className="tutor-card tutor-finance__chart-card">
          <div className="tutor-finance__section-header">
            <div>
              <h3>Biểu đồ thu nhập 6 tháng</h3>
              <p>Theo dõi xu hướng doanh thu từ các khóa học.</p>
            </div>

            <select>
              <option>6 tháng qua</option>
              <option>12 tháng qua</option>
            </select>
          </div>

          <div className="tutor-finance__fake-chart">
            <svg viewBox="0 0 700 260" preserveAspectRatio="none">
              <path
                d="M20,200 C100,155 165,170 230,145 C300,112 365,120 430,92 C520,55 590,85 680,40"
                fill="none"
                stroke="#7C6E27"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        <div className="tutor-card tutor-finance__transactions">
          <div className="tutor-finance__section-header">
            <div>
              <h3>Giao dịch gần đây</h3>
              <p>Bấm vào giao dịch để xem chi tiết hóa đơn.</p>
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="tutor-finance__transaction-list">
            {filteredTransactions.length === 0 ? (
              <div className="tutor-finance__empty">
                Không có giao dịch phù hợp với bộ lọc.
              </div>
            ) : (
              filteredTransactions.map((transaction) => (
                <TutorTransactionItem
                  key={transaction.id}
                  transaction={transaction}
                  onViewDetail={setSelectedTransaction}
                />
              ))
            )}
          </div>
        </div>
      </section>

      {isWithdrawOpen && (
        <div className="tutor-modal">
          <div className="tutor-modal__content">
            <h2>Rút tiền</h2>

            <p className="tutor-finance__modal-desc">
              Số dư khả dụng: <strong>{formatCurrency(balance)}</strong>
            </p>

            {withdrawError && (
              <div className="tutor-finance__error-box">{withdrawError}</div>
            )}

            <form onSubmit={handleWithdrawSubmit}>
              <label>Số tiền muốn rút</label>
              <input
                name="amount"
                type="number"
                min="0"
                placeholder="VD: 2000000"
                value={withdrawForm.amount}
                onChange={handleWithdrawChange}
                required
              />

              <label>Ngân hàng nhận tiền</label>
              <select
                name="bankId"
                value={withdrawForm.bankId}
                onChange={handleWithdrawChange}
                required
              >
                <option value="">Chọn ngân hàng</option>
                {tutorBanks.map((bank) => (
                  <option key={bank.id} value={bank.id}>
                    {bank.bankName} - {bank.accountNumber}
                  </option>
                ))}
              </select>

              <div className="tutor-modal__actions">
                <button
                  type="button"
                  className="tutor-btn tutor-btn--ghost"
                  onClick={closeWithdrawModal}
                >
                  Hủy
                </button>

                <button type="submit" className="tutor-btn tutor-btn--primary">
                  Gửi yêu cầu rút tiền
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedTransaction && (
        <div className="tutor-modal">
          <div className="tutor-modal__content">
            <h2>Chi tiết hóa đơn</h2>

            <div className="tutor-invoice">
              <div className="tutor-invoice__row">
                <span>Mã giao dịch</span>
                <strong>#{selectedTransaction.id}</strong>
              </div>

              <div className="tutor-invoice__row">
                <span>Tên học viên</span>
                <strong>{selectedTransaction.studentName}</strong>
              </div>

              <div className="tutor-invoice__row">
                <span>Lớp học</span>
                <strong>{selectedTransaction.className}</strong>
              </div>

              <div className="tutor-invoice__row">
                <span>Số tiền</span>
                <strong>{formatCurrency(selectedTransaction.amount)}</strong>
              </div>

              <div className="tutor-invoice__row">
                <span>Ngày thanh toán</span>
                <strong>{selectedTransaction.date}</strong>
              </div>

              <div className="tutor-invoice__row">
                <span>Trạng thái</span>
                <strong>{getStatusLabel(selectedTransaction)}</strong>
              </div>

              <div className="tutor-invoice__row">
                <span>Phương thức</span>
                <strong>
                  {selectedTransaction.paymentMethod ||
                    selectedTransaction.bankName ||
                    "Ví EduMatch"}
                </strong>
              </div>

              {selectedTransaction.bankAccount && (
                <div className="tutor-invoice__row">
                  <span>Tài khoản nhận</span>
                  <strong>{selectedTransaction.bankAccount}</strong>
                </div>
              )}

              <div className="tutor-invoice__note">
                <span>Ghi chú</span>
                <p>{selectedTransaction.note || "Không có ghi chú."}</p>
              </div>
            </div>

            <div className="tutor-modal__actions">
              <button
                className="tutor-btn tutor-btn--primary"
                onClick={() => setSelectedTransaction(null)}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}