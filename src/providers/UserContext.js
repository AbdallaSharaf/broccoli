"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // Import the decoder

const userContext = createContext();

export const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ Check if user is already logged in (persist session)
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      try {
        const decodedUser = jwtDecode(savedToken);
        setUser(decodedUser);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token"); // Remove invalid token
      }
    }
  }, []);

  // ✅ Login function
  const login = async (email, password) => {
    try {
      const res = await fetch("https://fruits-heaven-api.vercel.app/api/v1/auth/SignIn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      const { token } = data;
      if (!token) throw new Error("No token received");

      const decodedUser = jwtDecode(token); // Decode JWT
      setUser(decodedUser);
      console.log(decodedUser)
      // Save token in localStorage for persistence
      localStorage.setItem("token", token);
      return decodedUser
    } catch (error) {
        console.error("Login error:", error.message);
        return null
    }
  };

  // ✅ Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token"); // Remove token on logout
  };

  return (
    <userContext.Provider value={{ user, login, logout }}>
      {children}
    </userContext.Provider>
  );
};

// Hook to use the UserContext
export const useUserContext = () => useContext(userContext);

export default UserContext;
