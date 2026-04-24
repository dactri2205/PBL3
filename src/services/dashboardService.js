import { dashboardStats, recentTutors } from "../mock/mockDashboard";

export const getAdminDashboardData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        stats: dashboardStats,
        tutors: recentTutors,
      });
    }, 700);
  });
};