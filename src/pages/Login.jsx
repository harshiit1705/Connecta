import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    login({ name: "Neo", id: 1 });
    navigate("/");
  };

  return (
    <div style={{ padding: "50px" }}>
      <h2>Login</h2>
      <button onClick={handleLogin}>Login as Neo</button>
    </div>
  );
};

export default Login;
