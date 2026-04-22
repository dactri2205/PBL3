import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const stats = [
    {
      number: "850+",
      title: "Gia sư được xác thực",
      borderColor: "#2bb38a",
    },
    {
      number: "4,200",
      title: "Học viên đang học",
      borderColor: "#5b4bdb",
    },
    {
      number: "120",
      title: "Lớp nhóm đang mở",
      borderColor: "#f06a3c",
    },
    {
      number: "4.9★",
      title: "Điểm đánh giá trung bình",
      borderColor: "#d89a1d",
    },
  ];

  return (
    <div style={styles.page}>
      {/* Navbar */}
      <header style={styles.header}>
        <div style={styles.logoWrap}>
          <span style={styles.logoDot}></span>
          <h2 style={styles.logoText}>EduTutor</h2>
        </div>

        <nav style={styles.nav}>
          <button style={styles.navLink} onClick={() => navigate("/tutors")}>
            Gia sư
          </button>
          <button style={styles.navLink} onClick={() => navigate("/classes")}>
            Lớp nhóm
          </button>
          <button style={styles.navLink} onClick={() => navigate("/students")}>
            Học viên
          </button>
          <button style={styles.navLink} onClick={() => navigate("/schedule")}>
            Lịch học
          </button>
        </nav>

        <div style={styles.authButtons}>
            <button
                className="auth-btn login-btn"
                onClick={() => navigate("/login")}
            >
            Đăng nhập
            </button>

            <button
            className="auth-btn register-btn"
            onClick={() => navigate("/register")}
            >
            Đăng ký ngay
            </button>
         
        </div>
      </header>

      {/* Hero Section */}
      <main style={styles.main}>
        <section style={styles.leftSection}>
          <div style={styles.badge}>Nền tảng gia sư #1 Việt Nam</div>

          <h1 style={styles.title}>
            Học cùng gia sư
            <br />
            <span style={styles.highlight}>giỏi nhất</span> của bạn
          </h1>

          <p style={styles.description}>
            Kết nối học viên với hàng trăm gia sư chất lượng cao. Học 1-1 hoặc
            tham gia lớp nhóm — linh hoạt theo lịch của bạn.
          </p>

          <div style={styles.heroButtons}>
            <button
              style={styles.primaryBtn}
              onClick={() => navigate("/tutors")}
            >
              Tìm gia sư ↗
            </button>

            <button
              style={styles.secondaryBtn}
              onClick={() => navigate("/classes")}
            >
              Xem lớp nhóm
            </button>
          </div>
        </section>

        {/* Right Section */}
        <section style={styles.rightSection}>
          <div style={styles.statsGrid}>
            {stats.map((item, index) => (
              <div
                key={index}
                style={{
                  ...styles.statCard,
                  borderLeft: `4px solid ${item.borderColor}`,
                }}
              >
                <h2 style={styles.statNumber}>{item.number}</h2>
                <p style={styles.statTitle}>{item.title}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f8f8f6",
    fontFamily: "Arial, sans-serif",
    color: "#111",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 40px",
    borderBottom: "1px solid #ddd",
    backgroundColor: "#fff",
    flexWrap: "wrap",
    gap: "16px",
  },

  logoWrap: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  logoDot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    backgroundColor: "#2bb38a",
  },

  logoText: {
    margin: 0,
    fontSize: "32px",
    fontWeight: "700",
    fontFamily: "Georgia, serif",
  },

  nav: {
    display: "flex",
    gap: "24px",
    alignItems: "center",
    flexWrap: "wrap",
  },

  navLink: {
    background: "none",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
    color: "#222",
  },

  authButtons: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
  },

  loginBtn: {
    padding: "12px 22px",
    borderRadius: "12px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    cursor: "pointer",
    fontSize: "16px",
  },

  registerBtn: {
    padding: "12px 22px",
    borderRadius: "12px",
    border: "1px solid #111",
    backgroundColor: "#fff",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
  },

  main: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "70px 40px",
    gap: "40px",
    flexWrap: "wrap",
  },

  leftSection: {
    flex: "1",
    minWidth: "320px",
    maxWidth: "600px",
  },

  badge: {
    display: "inline-block",
    padding: "10px 18px",
    backgroundColor: "#dff1e8",
    color: "#2b7d68",
    borderRadius: "14px",
    fontSize: "18px",
    marginBottom: "28px",
  },

  title: {
    fontSize: "72px",
    lineHeight: "1.1",
    margin: "0 0 24px 0",
    fontWeight: "700",
    fontFamily: "Georgia, serif",
  },

  highlight: {
    color: "#2bb38a",
    fontStyle: "italic",
  },

  description: {
    fontSize: "22px",
    lineHeight: "1.7",
    color: "#333",
    marginBottom: "32px",
    maxWidth: "560px",
  },

  heroButtons: {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
  },

  primaryBtn: {
    padding: "16px 28px",
    borderRadius: "14px",
    border: "1px solid #111",
    backgroundColor: "#fff",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: "500",
  },

  secondaryBtn: {
    padding: "16px 28px",
    borderRadius: "14px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: "500",
  },

  rightSection: {
    flex: "1",
    minWidth: "320px",
    display: "flex",
    justifyContent: "center",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(180px, 1fr))",
    gap: "20px",
    width: "100%",
    maxWidth: "460px",
  },

  statCard: {
    backgroundColor: "#eceae4",
    borderRadius: "18px",
    padding: "28px 22px",
    minHeight: "150px",
    boxSizing: "border-box",
  },

  statNumber: {
    fontSize: "52px",
    margin: "0 0 12px 0",
    fontFamily: "Georgia, serif",
  },

  statTitle: {
    fontSize: "18px",
    lineHeight: "1.5",
    margin: 0,
    color: "#222",
  },
};

export default Home;