import { Link, useNavigate, useLocation } from "react-router-dom";

function UserLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-64 bg-white p-6 border-r flex flex-col justify-between">

        <div>
          <h1 className="text-xl font-bold mb-10">User Panel</h1>

          <nav className="space-y-3">

            <NavItem to="/dashboard" active={isActive("/dashboard")}>
              Dashboard
            </NavItem>

            <NavItem to="/user/apis" active={isActive("/user/apis")}>
              APIs
            </NavItem>

            <NavItem to="/user/usage" active={isActive("/user/usage")}>
              Usage
            </NavItem>

            <NavItem to="/user/billing" active={isActive("/user/billing")}>
              Billing
            </NavItem>

          </nav>
        </div>

        <button
          onClick={logout}
          className="bg-red-500 text-white py-2 rounded"
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

export default UserLayout;

function NavItem({ to, active, children }) {
  return (
    <Link
      to={to}
      className={`block px-3 py-2 rounded ${
        active ? "bg-blue-500 text-white" : "hover:bg-gray-200"
      }`}
    >
      {children}
    </Link>
  );
}