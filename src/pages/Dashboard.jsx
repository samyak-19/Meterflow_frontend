import { useEffect, useState } from "react";
import UserLayout from "../components/UserLayout";
import Navbar from "../components/Navbar";
import ApiCard from "../components/ApiCard";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";

function Dashboard() {
  const [apis, setApis] = useState([]);
  const [usage, setUsage] = useState([]);
  const [billing, setBilling] = useState({});
  const [analytics, setAnalytics] = useState({});
  const [userPlan, setUserPlan] = useState("free");
  const [selectedApi, setSelectedApi] = useState(null);

  const token = localStorage.getItem("token");
  const apiKey = localStorage.getItem("apiKey");

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  // 🔥 SAFE FETCH
  const safeFetch = async (url, options = {}) => {
    try {
      const res = await fetch(url, options);
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  };

  const fetchData = async () => {
    const apisData = await safeFetch("https://meterflow-backend-2pas.onrender.com/api/apis/public");
    setApis(Array.isArray(apisData) ? apisData : []);

    if (apisData?.length > 0 && !selectedApi) {
  setSelectedApi(apisData[0]); // 
}

    const subData = await safeFetch(
      "https://meterflow-backend-2pas.onrender.com/api/user/subscription",
      { headers }
    );
    setUserPlan(subData?.plan || "free");

    if (!apiKey) return;

    const usageData = await safeFetch(
      `https://meterflow-backend-2pas.onrender.com/api/usage?apiKey=${apiKey}`,
      { headers }
    );
    setUsage(Array.isArray(usageData) ? usageData : []);

    const billingData = await safeFetch(
      `https://meterflow-backend-2pas.onrender.com/api/billing?apiKey=${apiKey}`,
      { headers }
    );
    setBilling(billingData || {});

    let analyticsData = null;

if (apiKey && selectedApi?._id) {
  analyticsData = await safeFetch(
    `https://meterflow-backend-2pas.onrender.com/api/analytics/user?apiKey=${apiKey}&apiId=${selectedApi._id}`,
    { headers }
  );
}

setAnalytics(analyticsData || {});

  };

  useEffect(() => {
    fetchData();
  }, [apiKey, selectedApi]);

  // 🔑 GENERATE KEY
  const generateKey = async (apiId) => {
    const data = await safeFetch(
      "https://meterflow-backend-2pas.onrender.com/api/apis/generate-key",
      {
        method: "POST",
        headers,
        body: JSON.stringify({ apiId }),
      }
    );

    if (!data?.key) {
      alert("Failed to generate key");
      return;
    }

    localStorage.setItem("apiKey", data.key);
    alert("API Key Generated");
    fetchData();
  };

  // 🚀 TEST API
  const testApi = async () => {
  if (!apiKey || !selectedApi) {
    alert("Select API first");
    return;
  }

  try {
    await fetch(
      `https://meterflow-backend-2pas.onrender.com/gateway/${apiKey}`
    );
    alert("API called!");
    fetchData();
  } catch {
    alert("API call failed");
  }
};

  const upgradePlan = async () => {
    await safeFetch("https://meterflow-backend-2pas.onrender.com/api/user/upgrade", {
      method: "POST",
      headers,
    });

    alert("Upgraded to PRO");
    fetchData();
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const chartData = Array.isArray(usage)
    ? usage.map((u) => ({
        time: new Date(u.timestamp).toLocaleTimeString(),
        requests: 1,
      }))
    : [];

  return (
    <UserLayout>
      <Navbar logout={logout} />

      {/* PLAN */}
      <div className="bg-indigo-600 text-white p-4 rounded-xl flex justify-between mb-6">
        <span>Plan: <b>{userPlan.toUpperCase()}</b></span>
        {userPlan !== "pro" && (
          <button
            onClick={upgradePlan}
            className="bg-yellow-400 text-black px-4 py-2 rounded"
          >
            Upgrade
          </button>
        )}
      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-4 mb-6">
       <StatCard title="Requests" value={analytics?.totalRequests || 0} />
        <StatCard title="Today" value={analytics?.dailyRequests || 0} />
      <StatCard title="Latency" value={`${analytics?.avgLatency || 0} ms`} />
      <StatCard title="Billing" value={`₹ ${billing?.billAmount || 0}`} />
      </div>

      {/* GRAPH */}
      <div className="bg-white p-5 rounded-xl shadow mb-6">
        <LineChart width={700} height={250} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line dataKey="requests" stroke="#6366f1" />
        </LineChart>
      </div>

      {/* API TEST */}
      <div className="bg-white p-5 rounded-xl shadow mb-6">
        <h2 className="font-bold mb-3">Test API</h2>

        <p className="text-sm">API Key</p>
        <div className="bg-gray-100 p-2 rounded mb-3 text-xs break-all">
          {apiKey || "Generate key first"}
        </div>

        <p className="text-sm">Endpoint</p>
        <div className="bg-gray-100 p-2 rounded mb-3 text-xs">
          {selectedApi?.testPath || "No test path configured"}
        </div>

        <button
          onClick={testApi}
          className="bg-indigo-500 text-white px-4 py-2 rounded w-full"
        >
          🚀 Test API
        </button>
      </div>

      {/* APIs */}
      <h2 className="font-bold mb-3">Available APIs</h2>

      <div className="grid grid-cols-2 gap-4">
        {apis.map((api) => (
          <ApiCard
            key={api._id}
            api={api}
            userPlan={userPlan}
            onGenerateKey={generateKey}
            onUpgrade={upgradePlan}
            onSelectApi={(api) => {
              setSelectedApi(api);
            }}
          />
        ))}
      </div>
    </UserLayout>
  );
}

export default Dashboard;

// 🔹 CARD
function StatCard({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-xl font-bold">{value || 0}</h2>
    </div>
  );
} 