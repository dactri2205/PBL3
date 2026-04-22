import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-[#eae4d3] p-6">
      <h1 className="text-2xl font-bold mb-8">Admin</h1>

      <nav className="space-y-4">
        <Link to="/admin/dashboard">Dashboard</Link>
        <Link to="/admin/accounts">Accounts</Link>
        <Link to="/admin/verifications">Verifications</Link>
        <Link to="/admin/transactions">Transactions</Link>
        <Link to="/admin/system">System Config</Link>
        <Link to="/admin/classes">Class Management</Link>
      </nav>
    </div>
  );
}