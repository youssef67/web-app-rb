import React from 'react'
import { useAuth } from "@hooks/useAuth";


export default function OrdersOfDay() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };
  return (
    <>
    <div>OrderOfDay</div>
    <button onClick={handleLogout}>Logout</button>
    </>

  )
}
