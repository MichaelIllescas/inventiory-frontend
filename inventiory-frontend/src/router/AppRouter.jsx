import { Routes, Route } from "react-router-dom";
import { LoginPage } from "../features/auth/pages/LoginPage";
import  Dashboard  from "../features/dashboard/pages/Dashboard";
import  UsersPage  from "../features/users/pages/UsersPage";
import  RegisterForm  from "../features/users/pages/RegisterForm";
// import { Profile } from "../features/profile/Profile";
import { ProtectedRoute } from "./ProtectedRoute";
import ProviderRegister from "../features/providers/pages/ProviderRegister";
import ProvidersPage from "../features/providers/pages/ProvidersPage";
import ProductRegister from "../features/products/pages/ProductRegister";
import ProductPage from "../features/products/pages/ProductsPage";
import UpdateStock from "../features/products/pages/StockUpdate";
import ModifyPrice from "../features/products/pages/ModifyPrice";
import ClientRegister from "../features/clients/pages/ClientRegister";
import ClientsPage from "../features/clients/pages/ClientsPage";
import ProductManagementTabs from "../features/buys/pages/ProductManagementTabs";
import StockPage from "../features/stocks/pages/StockPage";
import PurchasesPage from "../features/buys/pages/PurchasesPage";
import ExpensesPage from "../features/expenses/pages/ExpensesPage";
import ExpenseRegister from "../features/expenses/pages/ExpenseRegister";


export const AppRoutes = () => {
  return (
    <Routes>
      {/* Ruta pública para el login */}
      <Route path="/login" element={<LoginPage />} />

      {/* Rutas protegidas dentro de MainLayout
     
      <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} /> */}
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/userList" element={<ProtectedRoute element={<UsersPage/>} />} />
        <Route path="/userRegister" element={<ProtectedRoute element={<RegisterForm/>} />} />
        <Route path="/providerRegister" element={<ProtectedRoute element={<ProviderRegister/>} />} />
        <Route path="/providerList" element={<ProtectedRoute element={<ProvidersPage/>} />} />
        <Route path="/productRegister" element={<ProtectedRoute element={<ProductManagementTabs/>} />} />
        <Route path="/productsList" element={<ProtectedRoute element={<ProductPage/>} />} />
        <Route path="/updateStock" element={<ProtectedRoute element={<UpdateStock/>} />} />
        <Route path="/updatePrice" element={<ProtectedRoute element={<ModifyPrice/>} />} />
        <Route path="/clientRegister" element={<ProtectedRoute element={<ClientRegister/>} />} />
        <Route path="/clientsList" element={<ProtectedRoute element={<ClientsPage/>} />} />
        <Route path="/buyRegister" element={<ProtectedRoute element={<ProductManagementTabs/>} />} />
        <Route path="/stocksList" element={<ProtectedRoute element={<StockPage/>} />} />
        <Route path="/buistHistory" element={<ProtectedRoute element={<PurchasesPage/>} />} />
        <Route path="/expensesList" element={<ProtectedRoute element={<ExpensesPage/>} />} />
        <Route path="/expenseRegister" element={<ProtectedRoute element={<ExpenseRegister/>} />} />
      {/* Redirigir cualquier ruta desconocida a "/login" */}
      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
};
