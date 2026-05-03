import AdminLayout from "../components/AdminLayout";

function UserDetails() {
  return (
    <AdminLayout>

      <div className="bg-[#111] p-6 rounded-xl mb-6">
        <h2 className="text-xl font-bold">User Name</h2>
        <p className="text-gray-400">email@example.com</p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Stat title="Requests" value="184,920" />
        <Stat title="Spent" value="$4,820" />
        <Stat title="Latency" value="284 ms" />
        <Stat title="Last Seen" value="2 min ago" />
      </div>

      {/* CHART */}
      <div className="bg-[#111] p-6 rounded-xl">
        <h3>Usage</h3>
      </div>

    </AdminLayout>
  );
}

function Stat({ title, value }) {
  return (
    <div className="bg-[#111] p-4 rounded">
      <p className="text-gray-400">{title}</p>
      <h2>{value}</h2>
    </div>
  );
}

export default UserDetails;