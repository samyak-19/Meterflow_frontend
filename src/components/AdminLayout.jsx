import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function AdminLayout({ children }) {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-black text-white">

      {/* SIDEBAR */}
      <div className="w-64 bg-[#0d0d0d] p-6 border-r border-gray-800">

        <h1 className="text-xl font-bold mb-10">Meridian</h1>

        <nav className="space-y-4 text-gray-400">
          <Link to="/admin" className="block hover:text-white">Dashboard</Link>
          <Link to="/admin/users" className="block hover:text-white">Users</Link>
          <Link to="/admin/providers" className="block hover:text-white">Providers</Link>
          <Link to="/admin/revenue" className="block hover:text-white">Revenue</Link>
          <Link to="/admin/apis" className="block hover:text-white">APIs</Link>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
         <button
          onClick={logout}
          className="w-16 bg-red-600 hover:bg-red-700 text-white py-2 rounded"
          >
          Logout
         </button>
        </div>

      </div>

      {/* MAIN */}
      <div className="flex-1 p-6">
        {children}
      </div>

    </div>
  );
}

export default AdminLayout;