import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

function Revenue() {
  const token = localStorage.getItem("token");

  const [revenue, setRevenue] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [topApis, setTopApis] = useState([]);

  const fetchRevenue = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const res = await fetch("http://localhost:5000/api/admin/revenue", {
        headers,
      });

      const data = await res.json();

      setRevenue(data[0]?.totalRevenue || 0);

      // 🔥 fake chart data (replace later)
     const summary = await fetch("http://localhost:5000/api/admin/revenue/summary", { headers }).then(r => r.json());
    const trend = await fetch("http://localhost:5000/api/admin/revenue/trend", { headers }).then(r => r.json());
    const topApis = await fetch("http://localhost:5000/api/admin/revenue/top-apis", { headers }).then(r => r.json());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRevenue();
  }, []);

  return (
    <AdminLayout>

      {/* 💰 TOTAL */}
      <div className="bg-[#111] p-6 rounded-xl mb-6">
        <p className="text-gray-400">Total Revenue</p>
        <h2 className="text-3xl font-bold text-green-400">
          ₹ {revenue}
        </h2>
      </div>

      {/* 📈 REVENUE TREND */}
      <div className="bg-[#111] p-6 rounded-xl mb-6">
        <h3 className="mb-4 font-semibold">Revenue Trend</h3>

        <LineChart width={900} height={250} data={chartData}>
          <CartesianGrid stroke="#333" />
          <XAxis dataKey="month" stroke="#aaa" />
          <YAxis stroke="#aaa" />
          <Tooltip />
          <Line type="monotone" dataKey="revenue" stroke="#00ff9d" />
        </LineChart>
      </div>

      {/* 📊 TOP APIs */}
      <div className="bg-[#111] p-6 rounded-xl">
        <h3 className="mb-4 font-semibold">Top Earning APIs</h3>

        <BarChart width={900} height={250} data={topApis}>
          <CartesianGrid stroke="#333" />
          <XAxis dataKey="name" stroke="#aaa" />
          <YAxis stroke="#aaa" />
          <Tooltip />
          <Bar dataKey="revenue" fill="#4da6ff" />
        </BarChart>
      </div>

    </AdminLayout>
  );
}

export default Revenue;