import React, { createContext, useEffect, useState } from "react";
import api from "../api/axios.js";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/v1/auth/me");
        setUser(res.data.user);
      }
      catch (error) {
        console.log("failed to fetch user! ", error);
        setUser(null);
      }
      finally {
        setAuthLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = async() => {
   await api.post("/api/v1/auth/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, logout, authLoading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
