import { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    console.log(data);
  };

  const login = async () => {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    localStorage.setItem("token", data.token);
    console.log(data);
  };

  const createApi = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:5000/api/apis/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token,
    },
    body: JSON.stringify({
      name: "Test API",
      baseUrl: "https://jsonplaceholder.typicode.com",
    }),
  });

  const data = await res.json();
  console.log(data);
};

const callApi =async() =>{
  const key = "b95aa147f8f3d6725b6118d7e7b0a14be244b4eb285597e77d3e5256327bdeb6";
  const res= await fetch(
    `http://localhost:5000/gateway/${key}/pokemon/ditto`
  );
   const data = await res.json();
  console.log(data);
}

  return (
    <div className="p-10 space-y-4">
      <input
        className="border p-2"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border p-2"
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={signup} className="bg-blue-500 text-white p-2">
        Signup
      </button>

      <button onClick={login} className="bg-green-500 text-white p-2">
        Login
      </button>
    </div>
  );
}

export default App;