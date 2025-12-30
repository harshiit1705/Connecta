import React,{useState, useContext} from 'react'
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import { AuthContext } from "../context/AuthContext.jsx";

function Signup() {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({...form, [e.target.name] : e.target.value });
    };
    
    const handleSignup = async() => {
       try {
        const res = await api.post("/api/v1/auth/signup", form);
        login(res.data);
        navigate("/");
       } catch (error) {
        console.log("Signup failed", error);
       }
    };

  return (
    <div style={{ padding: "50px"}}>
        <h2>Signup</h2>
        <input name="name" placeholder="Name" onChange={handleChange} />
        <input name="email" placeholder="email" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} />

        <button onClick={handleSignup}>Signup</button>
    </div>
  )
}

export default Signup;