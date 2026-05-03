import { useState } from "react";
import { apiRequest } from "../services/api";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const signup = async () => {
    setLoading(true);

    try {
      await apiRequest("/api/auth/signup", "POST", {
        email,
        password,
        role,
      });

      alert("Signup successful!");
      navigate("/");

    } catch (error) {
      alert(error.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-center">Signup</h1>

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

      {/* 🔥 FIXED ROLE */}
      <select
        className="border p-2 w-full"
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="user">User</option>
        <option value="provider">API Provider</option>
      </select>

      <button
        onClick={signup}
        disabled={loading}
        className="bg-blue-500 text-white p-2 w-full"
      >
        {loading ? "Creating..." : "Signup"}
      </button>

      <p className="text-center">
        Already have an account?{" "}
        <span
          className="text-green-500 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Login
        </span>
      </p>
    </div>
  );
}

export default Signup;