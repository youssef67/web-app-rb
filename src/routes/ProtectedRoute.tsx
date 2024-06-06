import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@hooks/useAuth";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useAuth();

  console.log(user)
  
  if (!user) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};