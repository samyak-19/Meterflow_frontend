import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";

function AdminUserDetails() {
  const { userId } = useParams();
  const token = localStorage.getItem("token");

  const [user, setUser] = useState({});
  const [usage, setUsage] = useState([]);
  const [billing, setBilling] = useState({});
  const [subscription, setSubscription] = useState(null);
  const [analytics, setAnalytics] = useState({});

  const fetchData = async () => {
    const headers = { Authorization: `Bearer ${token}` };

    
    setSubscription(await fetch(`http://localhost:5000/api/admin/user/${userId}/subscription`, { headers }).then(r => r.json()));

    const data = await fetch(
  `http://localhost:5000/api/admin/user/${userId}`,
  { headers }
).then(r => r.json());

setUser(data.user);
setAnalytics(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AdminLayout>

      {/* 🔙 BACK */}
      <p className="text-gray-400 mb-4 cursor-pointer">
        ← Back to Users
      </p>

      {/* 👤 USER HEADER */}
      <div className="bg-[#111] p-6 rounded-xl mb-6 flex justify-between items-center">

        <div>
          <h2 className="text-xl font-bold">{user.email}</h2>

          <div className="flex gap-3 mt-2">
            <span className="bg-purple-600 px-2 py-1 rounded text-xs">
              {subscription?.planId?.name || "Free"}
            </span>

            <span className="bg-green-600 px-2 py-1 rounded text-xs">
              Active
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="bg-gray-700 px-4 py-2 rounded">Message</button>
          <button className="bg-white text-black px-4 py-2 rounded">Manage</button>
        </div>

      </div>

      {/* 📊 STATS */}
      <div className="grid grid-cols-4 gap-4 mb-6">

       <Stat title="Total Requests" value={analytics.totalRequests} />
       <Stat title="Today" value={analytics.dailyRequests} />
       <Stat title="Spent" value={`₹ ${analytics.totalRevenue}`} green />
       <Stat title="Avg Latency" value={`${analytics.avgLatency} ms`} />

      </div>
      <div className="text-gray-400 text-sm mt-2">
  Last Active: {
    analytics.lastActive
      ? `${Math.floor((Date.now() - new Date(analytics.lastActive)) / 60000)} min ago`
      : "Never"
  }
</div>

      {/* 📈 GRAPH */}
      <div className="bg-[#111] p-6 rounded-xl mb-6">
        <h3 className="mb-4">Request Volume</h3>

        {/* Fake Graph Placeholder */}
        <div className="h-40 bg-gradient-to-r from-blue-500 to-blue-300 rounded opacity-30"></div>
      </div>

      {/* 💳 BILLING PANEL */}
      <div className="grid grid-cols-2 gap-4 mb-6">

        <div className="bg-[#111] p-6 rounded-xl">
          <h3 className="mb-3">Billing</h3>

          <p className="text-gray-400">Plan</p>
          <p>{subscription?.planId?.name || "Free"}</p>

          <p className="text-gray-400 mt-2">Next Invoice</p>
          <p>Mar 18, 2026</p>

          <p className="text-gray-400 mt-2">Lifetime Value</p>
          <p className="text-green-400">₹ {billing?.billAmount || 0}</p>
        </div>

        <div className="bg-[#111] p-6 rounded-xl">
          <h3 className="mb-3">Recent Activity</h3>

          {usage.slice(0, 5).map((u, i) => (
            <div key={i} className="flex justify-between text-sm mb-2">
              <span>{u.endpoint}</span>
              <span className="text-gray-400">{u.status}</span>
            </div>
          ))}

        </div>

      </div>

    </AdminLayout>
  );
}

export default AdminUserDetails;

function Stat({ title, value, green }) {
  return (
    <div className="bg-[#111] p-4 rounded-xl">
      <p className="text-gray-400">{title}</p>
      <h2 className={`text-lg font-bold ${green ? "text-green-400" : ""}`}>
        {value}
      </h2>
    </div>
  );
}