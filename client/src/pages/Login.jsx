import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios.js";

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({...form, [e.target.name] : e.target.value});
  };

  const handleLogin = async() => {
   try {
     const res =  await api.post("/api/v1/auth/login", form);
    setUser(res.data.user);
    navigate("/");
   } catch (error) {
    console.log("login failed! ", error);
   }
  };

  return (
    <div style={{ padding: "50px" }}>
      <h2>Login</h2>
      <input name="email" placeholder="email" onChange={handleChange} />
      <input name="password"type="password" placeholder="password" onChange={handleChange} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
