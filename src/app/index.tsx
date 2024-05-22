import { Routes, Route } from 'react-router-dom'

import { ProtectedRoute } from '@components/auth/ProtectedRoute'
import { AuthProvider } from '@hooks/useAuth'
// import RegisterForm from '@components/auth/RegisterForm/RegisterForm';
// import TopBar from '@components/topBar/TopBar';
import OrdersOfDay from '@components/interfaces/OrdersOfDay'
import AllOrders from '@components/interfaces/AllOrders'
import LoginForm from '@components/auth/LoginForm'
// import PasswordForgottenForm from "./components/PasswordForgottenForm/PasswordForgottenForm"
// import ResetPasswordForm from "./components/ResetPasswordForm/ResetPasswordForm"

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route
                    path="/"
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
