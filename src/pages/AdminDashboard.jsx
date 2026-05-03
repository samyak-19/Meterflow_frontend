import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

function AdminDashboard() {
  const token = localStorage.getItem("token");

  const [stats, setStats] = useState({});
  const [requestData, setRequestData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  

  const fetchData = async () => {
  try {
    const headers = { Authorization: `Bearer ${token}` };

    const statsData = await fetch("http://localhost:5000/api/admin/stats", { headers }).then(r => r.json());

    const requestTrend = await fetch(
  "http://localhost:5000/api/admin/requests/trend",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
).then((r) => r.json());

    const revenueTrend = await fetch("http://localhost:5000/api/admin/revenue/trend", { headers }).then(r => r.json());

    setStats(statsData);
    setRequestData(requestTrend);
    setRevenueData(revenueTrend);

  } catch (err) {
    console.error(err);
  }
};

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AdminLayout>

      {/* 🔥 TOP STATS */}
      <div className="grid grid-cols-5 gap-4 mb-6">

        <StatCard title="Total Users" value={stats.totalUsers} />
        <StatCard title="Total APIs" value={stats.totalApis} />
        <StatCard title="API Requests" value={stats.totalRequests} />
        <StatCard title="Revenue" value={`₹ ${stats.totalRevenue || 0}`} highlight />
        <StatCard title="Subscriptions" value={stats.totalSubscriptions} />

      </div>

      {/* 📊 MAIN CHART */}
      <LineChart width={900} height={250} data={revenueData}>
  <CartesianGrid stroke="#333" />
  <XAxis dataKey="date" stroke="#aaa" />
  <YAxis stroke="#aaa" />
  <Tooltip />
  <Line type="monotone" dataKey="revenue" stroke="#00ff9d" />
</LineChart>

      {/* 📈 SECONDARY CHART */}
      <LineChart width={900} height={200} data={requestData}>
  <XAxis dataKey="date" stroke="#aaa" />
  <YAxis stroke="#aaa" />
  <Tooltip />
  <Line type="monotone" dataKey="requests" stroke="#4da6ff" />
</LineChart>

    </AdminLayout>
  );
}

export default AdminDashboard;

function StatCard({ title, value, highlight }) {
  return (
    <div className={`p-5 rounded-xl ${highlight ? "bg-green-600" : "bg-[#111]"}`}>
      <p className="text-gray-400 text-sm">{title}</p>
      <h2 className="text-2xl font-bold mt-2">{value || 0}</h2>
    </div>
  );
}