import React, { createContext, useState, useContext, useEffect } from "react";
import api from "../api";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        // You might want to add a /me endpoint to verify token validity, 
        // for now we'll just assume existence = logged in, or decoded if we had jwt-decode
        setUser({ username: "Admin" }); // Placeholder until we verify token
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  const login = async (username, password) => {
    try {
      const { data } = await api.post("/auth/login", { username, password });
      localStorage.setItem("token", data.token);
      setUser(data);
      toast.success("Login Successful!");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    toast.info("Logged out");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
