import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then(res => res.text())
      .then(data => setMessage(data));
  }, []);

  return (
    <div className="p-10 text-xl">
      <h1>MeterFlow Frontend</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;