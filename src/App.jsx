import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProviderDashboard from "./pages/ProviderDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUserDetails from "./pages/AdminUserDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import Users from "./pages/Users";
import UserDetails from "./pages/UserDetails";
import Providers from "./pages/Providers"
import Revenue from "./pages/Revenue";
import Apis from "./pages/Apis";
import ApiDetails from "./pages/ApiDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRole="user">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/provider"
          element={
            <ProtectedRoute allowedRole="provider">
              <ProviderDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/user/:userId"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
             <AdminUserDetails />
            </ProtectedRoute>
          }
        />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/user/:id" element={<UserDetails />} />
        <Route path="/admin/providers" element={<Providers />} />
        <Route path="/admin/revenue" element={<Revenue />} />
        <Route path="/admin/apis" element={<Apis />} />
        <Route path="/admin/api/:id" element={<ApiDetails />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;