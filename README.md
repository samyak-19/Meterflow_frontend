# 🌐 MeterFlow Frontend

MeterFlow Frontend is the user interface of the API Marketplace platform.  
It allows users, API providers, and administrators to interact with the system through dedicated dashboards.

The application simulates a real-world SaaS platform where APIs can be published, consumed, and monetized.

---

## 🚀 Live Application

Frontend: https://meterflow-frontend-dysq2wcic-samyaks-projects-ae22ada6.vercel.app/

Backend: https://meterflow-backend-2pas.onrender.com

---

## 🧠 Overview

This application provides a seamless interface for three types of users:

- Users who consume APIs  
- Providers who publish APIs  
- Admins who manage the platform  

All interactions are handled through a backend API gateway which processes requests, tracks usage, and manages billing.

---

## 👤 User Experience

Users can:

- Browse available APIs  
- Generate API keys  
- Test APIs directly from the dashboard  
- View total and daily request usage  
- Track billing and latency  

The dashboard updates dynamically based on real-time backend data.

---

## 🧑‍💻 Provider Experience

Providers can:

- Create and publish APIs  
- Define base URL and endpoint  
- Monitor usage of their APIs  
- Track earnings  

This enables simulation of API monetization.

---

## 🧑‍💼 Admin Experience

Admins can:

- View all APIs  
- Update pricing  
- Monitor platform usage  
- Manage users and providers  

---

## 🔗 API Communication

All requests are sent to:

https://your-backend.onrender.com/api

Example:

fetch("https://your-backend.onrender.com/api/apis/public")

---

## 📁 Project Structure

client/

├── src/
│   ├── components/
│   ├── pages/
│   ├── layouts/
│   ├── App.jsx
│   └── main.jsx
├── public/
├── vite.config.js
└── vercel.json

---

## ▶️ Running Locally

cd client  
npm install  
npm run dev  

---

## 🚀 Deployment

The frontend is deployed on Vercel.

A rewrite rule is configured so that all routes (like /dashboard, /admin) work correctly after refresh.

---

## ⚠️ Important Notes

- Do not use localhost in production  
- Ensure backend URL is correct  
- Backend must allow cross-origin requests  

---

## 🎯 Highlights

- Role-based dashboards  
- Real-time API testing  
- Clean and responsive UI  
- Modular and scalable design  

---

## 👨‍💻 Author

Samyak Bahade
