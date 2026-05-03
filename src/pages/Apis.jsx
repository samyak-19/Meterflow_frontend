import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { useNavigate } from "react-router-dom";

function Apis() {
  const [apis, setApis] = useState([]);
  const navigate = useNavigate();
  const [editId, setEditId] = useState(null);
  const [priceInput, setPriceInput] = useState({});
  const token = localStorage.getItem("token");

  const fetchApis = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/apis-analytics", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setApis(data || []);
    } catch (err) {
      console.error("API fetch error:", err);
    }
  };

const updatePrice = async (apiId, price) => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/admin/api/${apiId}/price`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          pricePerRequest: Number(price),
        }),
      }
    );

    const data = await res.json();

    if (data.error) {
      alert(data.error);
    } else {
      fetchApis(); // 🔥 refresh UI
    }

  } catch (err) {
    console.error("Update price error:", err);
  }
};

  useEffect(() => {
    fetchApis();
  }, []);

  return (
    <AdminLayout>

      {/* 🔥 HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">APIs</h1>

        <input
          placeholder="Search APIs..."
          className="bg-[#111] border border-gray-700 px-4 py-2 rounded text-sm"
        />
      </div>

      {/* 📊 STATS */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <MiniStat title="Total APIs" value={apis.length} />
        <MiniStat title="Active" value={apis.length} green />
        <MiniStat title="Revenue" value="₹ --" blue />
      </div>

      {/* 🔌 API TABLE */}
      <div className="bg-[#111] rounded-xl overflow-hidden">

        <table className="w-full text-left text-sm">

          <thead className="text-gray-400 border-b border-gray-800">
  <tr>
    <th className="p-4">API</th>
    <th>Provider</th>
    <th>Provider Price</th>   
    <th>Final Price</th>
    <th>Price</th>
    <th>Status</th>
    <th>Requests</th>
    <th>Revenue</th>
  </tr>
</thead>

<tbody>
  {apis.map((api) => (
    <tr
      key={api._id}
      onClick={() => navigate(`/admin/api/${api._id}`)}
       className="border-b border-gray-800 hover:bg-[#1a1a1a] cursor-pointer"
    >
      {/* API */}
      <td className="p-4">
        <p className="font-medium">{api.name}</p>
        <p className="text-gray-500 text-xs">{api.baseUrl}</p>
      </td>

      {/* PROVIDER */}
      <td>{api.userId?.email}</td>

      {/* PRICE */}
      <td className="text-yellow-400">
  ₹ {api.basePrice}
</td>

{/* ADMIN PRICE (EDITABLE) */}
<td onClick={(e) => e.stopPropagation()}>
  {editId === api._id ? (
    <div className="flex gap-2">

      {/* INPUT */}
      <input
        type="number"
        value={priceInput[api._id] ?? api.pricePerRequest ?? ""}
        onChange={(e) =>
          setPriceInput({
            ...priceInput,
            [api._id]: e.target.value,
          })
        }
        className="bg-black border border-gray-600 px-2 py-1 w-20 rounded"
      />

      {/* SAVE BUTTON */}
      <button
        className="bg-green-600 px-2 rounded"
        onClick={async (e) => {
          e.stopPropagation();

          await updatePrice(api._id, priceInput[api._id]);

          setEditId(null);
        }}
      >
        Save
      </button>

    </div>
  ) : (
    <div className="flex items-center gap-2">

      {/* SHOW PRICE */}
      <span className="text-green-400">
        ₹ {api.pricePerRequest || 0}
      </span>

      {/* EDIT BUTTON */}
      <button
        className="text-blue-400 text-sm"
        onClick={(e) => {
          e.stopPropagation();
          setEditId(api._id);

          // preload value
          setPriceInput({
            ...priceInput,
            [api._id]: api.pricePerRequest || "",
          });
        }}
      >
        Edit
      </button>

    </div>
  )}
</td>

      {/* STATUS */}
      <td>
        <span className="bg-green-600 px-2 py-1 text-xs rounded">
          ACTIVE
        </span>
      </td>

      {/* REAL USAGE */}
      <td>{api.totalRequests}</td>

      {/* REAL REVENUE */}
      <td className="text-green-400">
        ₹ {api.totalRevenue}
      </td>

    </tr>
  ))}
</tbody>

        </table>

      </div>

    </AdminLayout>
  );
}

export default Apis;

// 🔹 COMPONENT
function MiniStat({ title, value, green, blue }) {
  return (
    <div className="bg-[#111] p-4 rounded-xl">
      <p className="text-gray-400 text-sm">{title}</p>
      <h2
        className={`text-lg font-bold ${
          green ? "text-green-400" :
          blue ? "text-blue-400" : ""
        }`}
      >
        {value}
      </h2>
    </div>
  );
}