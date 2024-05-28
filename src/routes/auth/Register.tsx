import React from "react";
import RegisterForm from "@components/auth/forms/RegisterForm";
import { useNavigate } from "react-router-dom";


const Register: React.FC = () => {
    const navigate = useNavigate()

  const handleMoveToLoginPage = () => {
    navigate("/")
  }
  return (
    <>
      <div>Register</div>
      <RegisterForm />
      <button onClick={handleMoveToLoginPage}>Page login</button>
    </>
  );
};

export default Register;
