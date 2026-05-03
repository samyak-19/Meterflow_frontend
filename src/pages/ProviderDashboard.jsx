  import { useEffect, useState } from "react";
  import ProviderLayout from "../components/ProviderLayout";

  function ProviderDashboard() {
    const [apis, setApis] = useState([]);
    const [newApi, setNewApi] = useState({
      name: "",
      baseUrl: "",
      basePrice: "",
    });
    const [earnings, setEarnings] = useState(0);
    const [testPath, setTestPath] = useState("");

    const token = localStorage.getItem("token");

    // 🔥 FETCH APIS WITH ANALYTICS
    const fetchApis = async () => {
      const data = await fetch(
        "https://meterflow-backend-2pas.onrender.com/api/apis/my-apis-analytics",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      ).then((r) => r.json());

      if (Array.isArray(data)) {
    setApis(data);
  } else {
    console.error("API error:", data);
    setApis([]);
  }
  };

  const fetchEarnings = async () => {
    try {
      const data = await fetch(
        "https://meterflow-backend-2pas.onrender.com/api/apis/provider/earnings",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      ).then((r) => r.json());

      setEarnings(data.totalEarnings || 0);
    } catch (err) {
      console.error("Earnings fetch error:", err);
    }
  };

    useEffect(() => {
      fetchApis();
      fetchEarnings();
    }, []);

    // ➕ CREATE API
    const createApi = async () => {
      if (!newApi.name || !newApi.baseUrl || !newApi.basePrice) {
        alert("Fill all fields");
        return;
      }

      await fetch("https://meterflow-backend-2pas.onrender.com/api/apis/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newApi.name,
          baseUrl: newApi.baseUrl,
          basePrice: Number(newApi.basePrice),
          testPath,
      }),
      });

      // refresh analytics
      fetchApis();

      // clear form
      setNewApi({
        name: "",
        baseUrl: "",
        basePrice: "",
      });
    };

    // 🔑 GENERATE KEY (FIXED)
    const generateKey = async (apiId) => {
      const res = await fetch("https://meterflow-backend-2pas.onrender.com/api/apis/generate-key", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ apiId }),
      });

      const data = await res.json();
      alert("API Key: " + data.key);
    };

    // 📊 STATS CALCULATION
    const totalApis = apis.length;
    const totalRequests = apis.reduce((a, b) => a + (b.totalRequests || 0), 0);
    const totalRevenue = apis.reduce((a, b) => a + (b.totalRevenue || 0), 0);
    

    return (
      <ProviderLayout>

        {/* 🔥 TOP STATS */}
        <div className="grid grid-cols-3 gap-4 mb-6">

          <Stat title="Total APIs" value={totalApis} />
          <Stat title="Total Requests" value={totalRequests} />
          <Stat title="Revenue" value={`₹ ${totalRevenue}`} green />
          <Stat title="Earnings" value={`₹ ${earnings}`} green />

        </div>

        {/* ➕ CREATE API */}
        <div className="bg-[#111] p-6 rounded-xl mb-6">

          <h2 className="text-lg font-bold mb-4">Create API</h2>

          <input
            className="bg-black border border-gray-700 p-2 w-full mb-3 rounded"
            placeholder="API Name"
            value={newApi.name}
            onChange={(e) =>
              setNewApi({ ...newApi, name: e.target.value })
            }
          />

          <input
            className="bg-black border border-gray-700 p-2 w-full mb-3 rounded"
            placeholder="Base URL"
            value={newApi.baseUrl}
            onChange={(e) =>
              setNewApi({ ...newApi, baseUrl: e.target.value })
            }
          />

          <input
            type="number"
            className="bg-black border border-gray-700 p-2 w-full mb-3 rounded"
            placeholder="Base PRICE"
            value={newApi.basePrice}
            onChange={(e) =>
              setNewApi({ ...newApi, basePrice: e.target.value })
            }
          />

          <input
            placeholder="Test Path (e.g. random_joke)"
            value={testPath}
            onChange={(e) => setTestPath(e.target.value)}
            className="text-gray-700"
          />

          <button
            onClick={createApi}
            className="bg-indigo-500 text-white px-4 py-2 rounded"
          >
            Create API
          </button>
        </div>

        {/* 🔌 API CARDS */}
        <div className="grid grid-cols-2 gap-4">

          {apis.map((api) => (
            <div
              key={api._id}
              className="bg-[#111] p-5 rounded-xl shadow hover:scale-[1.02] transition"
            >

              {/* HEADER */}
              <div className="flex justify-between mb-3">
                <h3 className="font-bold">{api.name}</h3>

                <span className="text-xs bg-green-600 px-2 py-1 rounded">
                  ACTIVE
                </span>
              </div>

              {/* URL */}
              <p className="text-gray-400 text-sm mb-3">
                {api.baseUrl}
              </p>

              {/* STATS */}
              <div className="grid grid-cols-2 gap-3 text-sm mb-4">

                <div>
                  <p className="text-gray-400">Requests</p>
                  <p className="font-bold">{api.totalRequests || 0}</p>
                </div>

                <div>
                  <p className="text-gray-400">Revenue</p>
                  <p className="font-bold text-green-400">
                    ₹ {api.totalRevenue || 0}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400">Price</p>
                  <p>₹ {api.basePrice}</p>
                </div>

              </div>

              {/* ACTION */}
              <button
                onClick={() => generateKey(api._id)}
                className="bg-indigo-500 text-white px-3 py-1 rounded text-sm"
              >
                Generate API Key
              </button>

            </div>
          ))}

        </div>

      </ProviderLayout>
    );
  }

  export default ProviderDashboard;


  // 🔹 SMALL COMPONENT
  function Stat({ title, value, green }) {
    return (
      <div className="bg-[#111] p-4 rounded-xl">
        <p className="text-gray-400 text-sm">{title}</p>
        <h2 className={`text-xl font-bold ${green ? "text-green-400" : ""}`}>
          {value}
        </h2>
      </div>
    );
  }