import { Routes, Route, Navigate } from "react-router-dom";

import { ProtectedRoute } from "@routes/ProtectedRoute";
import { AuthProvider } from "@hooks/useAuth";
// Auth pages
import Login from "@routes/auth/Login";
import Register from "@routes/auth/Register";
import PasswordForgotten from "@routes/auth/PasswordForgotten";
import ActivateUser from "@routes/auth/ActivateUser";
import ResetPassword from "@routes/auth/ResetPassword";
// Customer pages
import OrderConfirmation from "@routes/customer/OrderConfirmation"
// Interface
import DaysOrdersDashboard from "routes/user/DaysOrdersDashboard";
import AllOrdersDashboard from "@routes/user/AllOrdersDashboard";
import CustomersDashboard from "@routes/user/CustomersDashboard";
import HistoryDashboard from "@routes/user/HistoryDashboard";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/password-forgotten" element={<PasswordForgotten />} />
        <Route path="/activate" element={<ActivateUser />} />
        <Route path="/confirmation" element={<OrderConfirmation />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/orders-of-day"
          element={
            <ProtectedRoute>
              <DaysOrdersDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/all-orders"
          element={
            <ProtectedRoute>
              <AllOrdersDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customers"
          element={
            <ProtectedRoute>
              <CustomersDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <HistoryDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
