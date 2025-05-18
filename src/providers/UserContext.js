"use client";
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import mergeCarts from "@/libs/mergeCarts";
import { getGuestCart, getUserCart } from "@/libs/cartApi";
import addItemsToLocalstorage from "@/libs/addItemsToLocalstorage";
import axiosInstance from "@/libs/axiosInstance";

const userContext = createContext();

// Helper function to check if token is expired (more than 7 days old)
const isTokenExpired = (tokenDate) => {
  const oneWeekInMs = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
  const now = new Date();
  const tokenCreationDate = new Date(tokenDate);
  return (now - tokenCreationDate) > oneWeekInMs;
};

export const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUserData = async (token) => {
    try {
      const res = await fetch("https://fruits-heaven-api.onrender.com/api/v1/user/myData", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch user data");
      setUserData(data.user);
    } catch (error) {
      console.error("Fetch user data error:", error.message);
      setUserData(null);
    }
  };

  // ✅ Check if user is already logged in (persist session)
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const tokenCreationDate = localStorage.getItem("tokenCreationDate");
    
    if (savedToken && tokenCreationDate) {
      try {
        // Check if token is older than 7 days
        if (isTokenExpired(tokenCreationDate)) {
          // console.log("Token expired - removing from storage");
          localStorage.removeItem("token");
          localStorage.removeItem("tokenCreationDate");
          setUser(null);
          setUserData(null);
          return;
        }
        
        const decodedUser = jwtDecode(savedToken);
        setUser(decodedUser);
        fetchUserData(savedToken);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("tokenCreationDate");
      }
    }
  }, []);

  // ✅ Login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      const res = await axiosInstance.post("https://fruits-heaven-api.onrender.com/api/v1/auth/SignIn",
       { email, password },
      );
  
      const data = res.data;
      // console.log("resp",res)
      if (!res.message === "success") throw new Error(data?.message || "Login failed");
      
      const { token } = data;
      if (!token) throw new Error("No token received");
      
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);
      localStorage.setItem("token", token);
      // Store current date with the token
      localStorage.setItem("tokenCreationDate", new Date().toISOString());
      
      await fetchUserData(token);
      
      // Merge local cart with backend cart
      const guest = localStorage.getItem("guest");
      let localCart = { _id: "", items: [] };
      
      if (guest) {
        const guestCart = await getGuestCart(guest);
        if (guestCart && Array.isArray(guestCart.items)) {
          localCart = guestCart;
        }
      }
      
      const backendCart = await getUserCart(token);
      const backendItems = Array.isArray(backendCart?.items) ? backendCart.items : [];
      const backendId = backendCart?._id ?? "";
      
      if (localCart._id === backendId) {
        const updatedBackendCart = { ...backendCart, cart: backendItems };
        addItemsToLocalstorage("cart", updatedBackendCart);
        setLoading(false);
        return { user: decodedUser, cart: backendItems, status: true  };
      }
  
      const mergedCart = mergeCarts(backendItems, localCart.items);
      localStorage.removeItem("guest");
      setLoading(false);
      return { user: decodedUser, cart: mergedCart, status: true };
    } catch (error) {
      setLoading(false);
      // console.log("error",error)
      console.error("Login error:", error.message);
      return {error: error?.response?.data?.error, status: false};
    }
  };
  

  // ✅ Register function with full name merge
const register = async ({ firstname, lastname, email, password, phone }) => {
  try {
    const fullName = `${firstname} ${lastname}`.trim(); // 👈 Merge and clean up

    const res = await fetch("https://fruits-heaven-api.onrender.com/api/v1/auth/SignUp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: fullName, email, password, phone }), // 👈 Send `name` instead of separate first/last
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Registration failed");
    return {status: true, message: data.message};
  } catch (error) {
    console.error("Registration error:", error?.response?.data?.error);
    return {status: false, message: error?.response?.data?.error};
  }
};

const verifyResetCode = async (email, otp) => {
  try {
    const res = await fetch("https://fruits-heaven-api.onrender.com/api/v1/auth/verifyRessetCode", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Something went wrong. Please try again.");
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, message: error?.response?.data?.error };
  }
};


const forgotPassword = async (email) => {
  try {
    const res = await fetch("https://fruits-heaven-api.onrender.com/api/v1/auth/forgotPassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    // console.log("res",res)
    console.log("data",data)
    if (!res.ok) {
      throw new Error(data.error || "Something went wrong. Please try again.");
    }

    return { success: true, data };
  } catch (error) {
    console.log("error",error)
    return {  error: error,status: false, };
  }
};

const assignNewPassword = async (email, newPassword) => {
  try {
    const res = await fetch("https://fruits-heaven-api.onrender.com/api/v1/auth/resetPassword", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, newPassword }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Something went wrong. Please try again.");
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, message: error?.response?.data?.error };
  }
};

  // ✅ Logout function
  const logout = () => {
    setUser(null);
    setUserData(null);
    localStorage.removeItem("token");
    localStorage.removeItem("tokenCreationDate"); // Also remove the creation date
  };

  return (
    <userContext.Provider value={{ user, userData,loading, login, logout, register, forgotPassword, verifyResetCode, assignNewPassword }}>
      {children}
    </userContext.Provider>
  );
};

// Hook to use the UserContext
export const useUserContext = () => useContext(userContext);

export default UserContext;
