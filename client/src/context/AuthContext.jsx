import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const isAuthenticated = !!localStorage.getItem("token");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined" && isAuthenticated) {
      setUser(JSON.parse(storedUser));
    }else{
      setUser(null);
    }

    setAuthLoading(false);
  }, [isAuthenticated]);

  const login = ({ user, token}) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  // const login = (data) => {
  //   localStorage.setItem("token", res.data.token);
  //   localStorage.setItem("user", JSON.stringify(res.data.user))
  //   setUser(res.data.user);
  // };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, authLoading, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
