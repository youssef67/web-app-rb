import { Routes, Route, Navigate } from "react-router-dom";

import { ProtectedRoute } from "@routes/ProtectedRoute";
import { AuthProvider } from "@hooks/useAuth";
// Auth pages
import Login from "@routes/auth/Login";
import Register from "@routes/auth/Register";
import PasswordForgotten from "@routes/auth/PasswordForgotten";
import ActivateUser from "@routes/auth/ActivateUser";
import ResetPassword from "@routes/auth/ResetPassword";
import SendEmailConfirmation from "@routes/auth/SendEmailConfirmation.tsx";
// Interface
import OrdersOfDay from "routes/user/OrdersOfDay";
import AllOrders from "@routes/user/AllOrders";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/password-forgotten" element={<PasswordForgotten />} />
        <Route path="/activate" element={<ActivateUser />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/confirmation-send-email"
          element={<SendEmailConfirmation />}
        />
        <Route
          path="/orders-of-day"
          element={
            <ProtectedRoute>
              <OrdersOfDay />
            </ProtectedRoute>
          }
        />
        <Route
          path="/all-orders"
          element={
            <ProtectedRoute>
              <AllOrders />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
