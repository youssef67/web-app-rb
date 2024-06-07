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
import DaysOrderDashboard from "routes/user/DaysOrderDashboard";
import CreateOrder from "@routes/user/CreateOrder";
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
              <DaysOrderDashboard />
            </ProtectedRoute>
          }
        />
         <Route
          path="/add-order"
          element={
            <ProtectedRoute>
              <CreateOrder />
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
