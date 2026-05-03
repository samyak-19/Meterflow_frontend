const BASE_URL = "https://meterflow-backend-2pas.onrender.com";

export const apiRequest = async (url, method = "GET", body) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  return res.json();
};