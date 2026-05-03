import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function ApiDetails() {
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [data, setData] = useState({});

  const fetchData = async () => {
    const res = await fetch(`http://localhost:5000/api/admin/api/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const result = await res.json();
    setData(result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AdminLayout>

      {/* 🔥 STATS */}
      <div className="grid grid-cols-2 gap-4 mb-6">

        <Stat title="Total Requests" value={data.totalRequests} />
        <Stat title="Revenue" value={`₹ ${data.totalRevenue}`} green />

      </div>

      {/* 📈 USAGE CHART */}
      <div className="bg-[#111] p-6 rounded-xl mb-6">
        <h3 className="mb-4">Usage Trend</h3>

        <LineChart width={800} height={250} data={data.usageTrend || []}>
          <CartesianGrid stroke="#333" />
          <XAxis dataKey="date" stroke="#aaa" />
          <YAxis stroke="#aaa" />
          <Tooltip />
          <Line dataKey="requests" stroke="#00ff9d" />
        </LineChart>
      </div>

      {/* 💰 REVENUE CHART */}
      <div className="bg-[#111] p-6 rounded-xl">
        <h3 className="mb-4">Revenue Trend</h3>

        <LineChart width={800} height={250} data={data.revenueTrend || []}>
          <CartesianGrid stroke="#333" />
          <XAxis dataKey="date" stroke="#aaa" />
          <YAxis stroke="#aaa" />
          <Tooltip />
          <Line dataKey="revenue" stroke="#4da6ff" />
        </LineChart>
      </div>

    </AdminLayout>
  );
}

export default ApiDetails;

function Stat({ title, value, green }) {
  return (
    <div className="bg-[#111] p-4 rounded-xl">
      <p className="text-gray-400">{title}</p>
      <h2 className={`text-xl font-bold ${green ? "text-green-400" : ""}`}>
        {value || 0}
      </h2>
    </div>
  );
}