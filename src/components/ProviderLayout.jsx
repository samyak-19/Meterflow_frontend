import { Link, useNavigate, useLocation } from "react-router-dom";

function ProviderLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex min-h-screen bg-black text-white">

      {/* SIDEBAR */}
      <div className="w-64 bg-[#0d0d0d] p-6 border-r border-gray-800 flex flex-col justify-between">

        <div>
          <h1 className="text-xl font-bold mb-10">Provider</h1>

          <nav className="space-y-3 text-gray-400">

            <NavItem to="/provider" active={isActive("/provider")}>
              Dashboard
            </NavItem>

            <NavItem to="/provider/apis" active={isActive("/provider/apis")}>
              My APIs
            </NavItem>

            <NavItem to="/provider/revenue" active={isActive("/provider/revenue")}>
              Revenue
            </NavItem>

          </nav>
        </div>

        {/* LOGOUT */}
        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 text-white py-2 rounded"
        >
          Logout
        </button>

      </div>

      {/* MAIN */}
      <div className="flex-1 p-6">
        {children}
      </div>

    </div>
  );
}

export default ProviderLayout;

// 🔹 NAV ITEM
function NavItem({ to, active, children }) {
  return (
    <Link
      to={to}
      className={`block px-3 py-2 rounded transition ${
        active
          ? "bg-green-600 text-white"
          : "hover:bg-[#1a1a1a]"
      }`}
    >
      {children}
    </Link>
  );
}