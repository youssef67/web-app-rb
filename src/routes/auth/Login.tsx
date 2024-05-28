import React from "react";
import LoginForm from "@components/auth/forms/LoginForm";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const allCookies = Cookies.get("compagnyUser");
  console.log(allCookies);

  const handleRegister = () => {
    navigate("/register");
  };

  const handlePasswordForgottent = () => {
    navigate("/password-forgotten");
  };
  return (
    <>
      <div>Login</div>
      <LoginForm />
      <button onClick={handleRegister}>Pas encore de compte</button>
      <button onClick={handlePasswordForgottent}>mot de passe oublié</button>
    </>
  );
};

export default Login;
