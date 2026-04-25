export default function TutorStudentTable({ students }) {
  const statusMap = {
    active: ["Đang học", "tutor-badge--active"],
    pending: ["Chờ lịch", "tutor-badge--pending"],
    suspended: ["Tạm dừng", "tutor-badge--error"],
  };

  return (
    <div className="tutor-student-table tutor-card">
      <div className="tutor-student-table__toolbar">
        <div className="tutor-student-table__search">
          <span className="material-symbols-outlined">search</span>
          <input placeholder="Tìm tên hoặc môn học..." />
        </div>

        <button className="tutor-btn tutor-btn--ghost">Tất cả trạng thái</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Học viên</th>
            <th>Môn học</th>
            <th>Trạng thái</th>
            <th>Tiến độ</th>
            <th>Buổi kế tiếp</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {students.map((item) => {
            const [label, className] = statusMap[item.status];

            return (
              <tr key={item.name}>
                <td>
                  <div className="tutor-student-table__person">
                    <img src={`https://i.pravatar.cc/80?u=${item.name}`} alt="" />
                    <strong>{item.name}</strong>
                  </div>
                </td>
                <td>
                  <span className="tutor-student-table__tag">{item.subject}</span>
                </td>
                <td>
                  <span className={`tutor-badge ${className}`}>{label}</span>
                </td>
                <td>
                  <div className="tutor-student-table__progress">
                    <span style={{ width: `${item.progress}%` }}></span>
                  </div>
                </td>
                <td>{item.next}</td>
                <td>
                  <span className="material-symbols-outlined">more_vert</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}