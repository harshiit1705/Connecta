import React, { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import { AuthContext } from "../context/AuthContext.jsx";

function Signup() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [loading, setloading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (event) => {
    try {
      event.preventDefault();
      const res = await api.post("/api/v1/auth/signup", form);
      setUser(res.data.user);
      navigate("/");
      setloading(true);
    }
    catch (error) {
      console.log("Signup failed", error);
    }
    finally {
      setloading(false);
    }
  };

  return (
    <div style={{ padding: "50px" }}>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
      <input name="email" placeholder="email" value={form.email} onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />

      <button type="submit" disabled={loading}>
        {loading? "Signing up..." : "Signup"}
      </button>
      </form>
    </div>
  )
}

export default Signup;