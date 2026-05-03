function Navbar({ logout }) {
  const token = localStorage.getItem("token");
  const role = token ? JSON.parse(atob(token.split(".")[1])).role : "";

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">MeterFlow 🚀</h1>

      <div className="flex items-center gap-4">
        <span className="text-gray-600">{role}</span>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;