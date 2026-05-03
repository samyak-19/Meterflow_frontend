import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";

function Providers() {
  const [providers, setProviders] = useState([]);
  const token = localStorage.getItem("token");

  const fetchProviders = async () => {
    try {
      const res = await fetch("https://meterflow-backend-2pas.onrender.com/api/admin/apis", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      // Group by provider (user)
      const grouped = {};

      data.forEach(api => {
        const email = api.userId?.email || "Unknown";

        if (!grouped[email]) {
          grouped[email] = {
            name: email,
            apis: 0,
            revenue: 0,
          };
        }

        grouped[email].apis += 1;
        grouped[email].revenue += api.pricePerRequest || 0;
      });

      setProviders(Object.values(grouped));

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  return (
    <AdminLayout>

      <h1 className="mb-6 text-xl font-bold">API Providers</h1>

      <div className="grid grid-cols-3 gap-4">
        {providers.map((p, i) => (
          <div key={i} className="bg-[#111] p-5 rounded-xl">

            <h2 className="font-bold">{p.name}</h2>
            <p className="text-gray-400">{p.apis} APIs</p>

            <p className="text-green-400 mt-2">
              ₹ {p.revenue}
            </p>

          </div>
        ))}
      </div>

    </AdminLayout>
  );
}

export default Providers;