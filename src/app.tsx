import { Routes, Route } from 'react-router-dom'

import { ProtectedRoute } from '@components/auth/ProtectedRoute'
import { AuthProvider } from '@hooks/useAuth'
import RegisterForm from '@components/auth/RegisterForm';
// import TopBar from '@components/topBar/TopBar';
import OrdersOfDay from '@components/interfaces/OrdersOfDay'
import AllOrders from '@components/interfaces/AllOrders'
import Home from '@components/Home'
// import PasswordForgottenForm from "./components/PasswordForgottenForm/PasswordForgottenForm"
// import ResetPasswordForm from "./components/ResetPasswordForm/ResetPasswordForm"

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<RegisterForm />} />
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
    )
}

export default App
