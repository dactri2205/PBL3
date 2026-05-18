import { useEffect, useState } from "react";
import { getStudentPayments, payInvoice } from "../../services/studentService";

const paymentMethods = [
  { value: "bank", label: "Tài khoản ngân hàng" },
  { value: "visa", label: "Thẻ Visa" },
  { value: "transfer", label: "Chuyển khoản" },
];

const statusLabels = {
  pending: ["Chưa thanh toán", "student-badge student-badge--pending"],
  paid: ["Đã thanh toán", "student-badge student-badge--success"],
};

const formatCurrency = (amount) => `${amount.toLocaleString("vi-VN")}đ`;

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [method, setMethod] = useState("bank");

  useEffect(() => {
    getStudentPayments().then(setPayments);
  }, []);

  const openPaymentModal = (payment) => {
    setSelectedInvoice(payment);
    setMethod("bank");
  };

  const handlePaymentSubmit = (event) => {
    event.preventDefault();

    payInvoice(selectedInvoice.id, method).then((updatedPayment) => {
      setPayments((current) =>
        current.map((payment) =>
          payment.id === updatedPayment.id ? updatedPayment : payment
        )
      );
      setSelectedInvoice(null);
    });
  };

  return (
    <div>
      <div className="student-dashboard__hero">
        <div>
          <h1 className="student-dashboard__heading">Thanh toán học phí</h1>
          <p className="student-dashboard__subtext">
            Thanh toán bằng tài khoản ngân hàng, thẻ Visa hoặc chuyển khoản.
          </p>
        </div>
      </div>

      <section className="student-card student-section-card">
        <div className="student-table-list student-table-list--payments">
          {payments.map((payment) => {
            const [statusText, statusClass] =
              statusLabels[payment.status] || statusLabels.pending;
            const methodLabel =
              paymentMethods.find((item) => item.value === payment.method)?.label ||
              "Chưa chọn";

            return (
              <div className="student-table-row" key={payment.id}>
                <div>
                  <strong>{payment.invoiceCode}</strong>
                  <span>{payment.courseName}</span>
                </div>
                <span>{payment.tutorName}</span>
                <span>{formatCurrency(payment.amount)}</span>
                <span>Hạn: {payment.dueDate}</span>
                <span>{methodLabel}</span>
                <span className={statusClass}>{statusText}</span>
                <button
                  className="student-secondary-btn"
                  onClick={() => openPaymentModal(payment)}
                  disabled={payment.status === "paid"}
                >
                  Thanh toán
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {selectedInvoice && (
        <div className="student-modal" role="dialog" aria-modal="true">
          <div className="student-modal__content">
            <h2>Thanh toán {selectedInvoice.invoiceCode}</h2>
            <p className="student-card__muted">
              Số tiền cần thanh toán: {formatCurrency(selectedInvoice.amount)}
            </p>

            <form className="student-form" onSubmit={handlePaymentSubmit}>
              <label htmlFor="method">Phương thức thanh toán</label>
              <select
                id="method"
                value={method}
                onChange={(event) => setMethod(event.target.value)}
              >
                {paymentMethods.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>

              <div className="student-payment-preview">
                {method === "bank" && (
                  <p>
                    Hệ thống sẽ trừ học phí từ tài khoản ngân hàng đã liên kết.
                  </p>
                )}
                {method === "visa" && (
                  <p>Nhập thông tin thẻ Visa ở bước cổng thanh toán tiếp theo.</p>
                )}
                {method === "transfer" && (
                  <p>
                    Chuyển khoản đến EduMatch - STK 0123456789 - nội dung{" "}
                    {selectedInvoice.invoiceCode}.
                  </p>
                )}
              </div>

              <div className="student-modal__actions">
                <button
                  type="button"
                  className="student-secondary-btn"
                  onClick={() => setSelectedInvoice(null)}
                >
                  Hủy
                </button>
                <button type="submit" className="student-dashboard__primary-btn">
                  Xác nhận thanh toán
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
