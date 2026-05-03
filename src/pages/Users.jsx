import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { useNavigate } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const res = await fetch("https://meterflow-backend-2pas.onrender.com/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setUsers(data || []);
    } catch (err) {
      console.error("Users fetch error:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔥 STATS CALCULATION
 const total = users.length;

const active = users.filter(u => u.plan && u.plan !== "free").length;
const trial = users.filter(u => !u.plan || u.plan === "free").length;

// optional: inactive = no activity ever
const inactive = users.filter(u => (u.totalRequests || 0) === 0).length;

  return (
    <AdminLayout>

      {/* 🔍 HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Users</h1>

        <input
          placeholder="Search users..."
          className="bg-[#111] border border-gray-700 px-4 py-2 rounded text-sm"
        />
      </div>

      {/* 📊 STATS */}
      <div className="grid grid-cols-4 gap-4 mb-6">

        <MiniStat title="Total" value={total} />
        <MiniStat title="Active" value={active} green />
        <MiniStat title="Trial" value={trial} blue />
        <MiniStat title="Inactive" value={inactive} />

      </div>

      {/* 👥 USERS TABLE */}
      <div className="bg-[#111] rounded-xl overflow-hidden">

        <table className="w-full text-left text-sm">

          <thead className="text-gray-400 border-b border-gray-800">
            <tr>
              <th className="p-4">User</th>
              <th>ID</th>
              <th>Plan</th>
              <th>Status</th>
              <th>Requests</th>
              <th>Spent</th>
              <th>Last Active</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr
                key={u._id}
                onClick={() => navigate(`/admin/user/${u._id}`)}
                className="border-b border-gray-800 hover:bg-[#1a1a1a] cursor-pointer"
              >

                {/* USER */}
                <td className="p-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-xs">
                    {u.email[0].toUpperCase()}
                  </div>

                  <div>
                    <p>{u.email}</p>
                    <p className="text-gray-500 text-xs">{u.role}</p>
                  </div>
                </td>

                {/* ID */}
                <td>usr_{u._id.slice(-4)}</td>

                {/* PLAN */}
                <td>{u.plan}</td>

                {/* STATUS */}
                <td>
                  <span className="bg-green-600 px-2 py-1 text-xs rounded">
                    ACTIVE
                  </span>
                </td>

                {/* REQUESTS */}
                <td>{u.totalRequests}</td>
                {/* SPENT */}

                <td>₹ {u.totalRevenue}</td>

                {/* LAST ACTIVE */}
                <td className="text-gray-400 text-xs">
                  {u.lastActive
                   ? `${Math.floor((Date.now() - new Date(u.lastActive)) / 60000)} min ago`
                    : "Never"}
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </AdminLayout>
  );
}

export default Users;

// 🔹 SMALL COMPONENT
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