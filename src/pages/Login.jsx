import { useState, useEffect } from "react";
import { apiRequest } from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // 🔥 Auto redirect
  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role === "admin") navigate("/admin");
    else if (role === "provider") navigate("/provider");
    else if (role === "user") navigate("/dashboard");
  }, [navigate]);

  const login = async () => {
    setLoading(true);

    try {
      const data = await apiRequest("/api/auth/login", "POST", {
        email,
        password,
      });

      const token = data.token;
      const role = data.user?.role;

      if (!token) {
        alert(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      if (role === "admin") navigate("/admin");
      else if (role === "provider") navigate("/provider");
      else navigate("/dashboard");

    } catch (error) {
      alert(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-center">Login</h1>

      <input
        className="border p-2 w-full"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="border p-2 w-full"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={login}
        disabled={loading}
        className="bg-green-500 text-white p-2 w-full"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <p className="text-center">
        Don't have an account?{" "}
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          Signup
        </span>
      </p>
    </div>
  );
}

export default Login;