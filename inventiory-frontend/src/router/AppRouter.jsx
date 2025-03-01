import { Routes, Route } from "react-router-dom";
import { LoginPage } from "../features/auth/pages/LoginPage";
import  Dashboard  from "../features/dashboard/Dashboard";
// import { Profile } from "../features/profile/Profile";
import { ProtectedRoute } from "./ProtectedRoute";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Ruta pública para el login */}
      <Route path="/login" element={<LoginPage />} />

      {/* Rutas protegidas dentro de MainLayout
     
      <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} /> */}
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
      {/* Redirigir cualquier ruta desconocida a "/login" */}
      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
};
