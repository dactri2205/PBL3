export default function TutorRequestCard({ item }) {
  return (
    <article className="tutor-request tutor-card">
      <div className="tutor-request__left">
        <img src={`https://i.pravatar.cc/80?u=${item.name}`} alt="" />
        <div>
          <h3>{item.name}</h3>
          <p>{item.subject} · {item.time}</p>
          <blockquote>“{item.note}”</blockquote>
        </div>
      </div>

      <div className="tutor-request__actions">
        <button className="tutor-btn tutor-btn--primary">Chấp nhận</button>
        <button className="tutor-btn tutor-btn--ghost">Từ chối</button>
      </div>
    </article>
  );
}