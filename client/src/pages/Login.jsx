import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios.js";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async() => {
   try {
    // const res = await api.post("/api/v1/auth/login", {
    //   name: "Erica Albrigth",
    //   email: "erica@harvards.in",
    //   password: "Bright437"
    // });
    const res = await api.post("/api/v1/auth/login", {
      name: "Mark",
      email: "mark@harvard.edu",
      password: "Zuck7745"
    });
    
    login(res.data);
    navigate("/");
   } catch (error) {
    console.log("login failed! ", error);
   }
  };

  return (
    <div style={{ padding: "50px" }}>
      <h2>Login</h2>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
