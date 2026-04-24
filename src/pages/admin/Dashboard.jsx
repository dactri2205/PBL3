import { useEffect, useState } from "react";
import { getAdminDashboardData } from "../../services/dashboardService";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getAdminDashboardData().then(setData);
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 shadow rounded">
          <p>Total Tutors</p>
          <h2 className="text-2xl">{data.totalTutors}</h2>
        </div>

        <div className="bg-white p-6 shadow rounded">
          <p>Total Students</p>
          <h2 className="text-2xl">{data.totalStudents}</h2>
        </div>

        <div className="bg-white p-6 shadow rounded">
          <p>Total Classes</p>
          <h2 className="text-2xl">{data.totalClasses}</h2>
        </div>
      </div>
    </div>
  );
}