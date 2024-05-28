import React from "react";
import { useQuery } from "../../../hooks/useQuery";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ActivateUserForm: React.FC = () => {
  const navigate = useNavigate();

  const token = useQuery().get("token");
  const email = useQuery().get("email");

  const handleValidate = () => {
    axios
      .post("http://localhost:3333/api/v1/user/activate", {
        token: token,
        email: email,
      })
      .then((res) => {
        if (res.status === 200) {
          console.log("reponse 200");
          navigate("/login");
        } else {
            throw new Error("error");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <h1>Activate your account</h1>
      <button onClick={handleValidate}>Confirm my email</button>
      <div>activate : {token}</div>
      <div>email : {email}</div>
    </>
  );
};

export default ActivateUserForm;
