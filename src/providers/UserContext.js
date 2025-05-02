"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // Import the decoder
import mergeCarts from "@/libs/mergeCarts";
import { getGuestCart, getUserCart } from "@/libs/cartApi";
import addItemsToLocalstorage from "@/libs/addItemsToLocalstorage";
import axiosInstance from "@/libs/axiosInstance";

const userContext = createContext();

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
    if (savedToken) {
      try {
        const decodedUser = jwtDecode(savedToken);
        setUser(decodedUser);
        fetchUserData(savedToken); // 👈 Also fetch userData
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token"); // Remove invalid token
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
      if (!res.message === "success") throw new Error(data?.message || "Login failed");
      
      const { token } = data;
      if (!token) throw new Error("No token received");
      
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);
      localStorage.setItem("token", token);
      // 👇 Fetch user data here
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
      
      // If localCart._id is equal to backendCart._id, don't merge
      if (localCart._id === backendId) {
        const updatedBackendCart = { ...backendCart, cart: backendItems };
        addItemsToLocalstorage("cart", updatedBackendCart);
        setLoading(false);
        return { user: decodedUser, cart: backendItems, status: true  };
      }
  
      // Merge backend items and local items
      const mergedCart = mergeCarts(backendItems, localCart.items);
  
      // const updatedBackendCart = {
      //   ...(backendCart || {}),
      //   cart: mergedCart,
      // };
      // addItemsToLocalstorage("cart", updatedBackendCart);
      localStorage.removeItem("guest");
      setLoading(false);
      return { user: decodedUser, cart: mergedCart, status: true };
    } catch (error) {
      setLoading(false);
      console.error("Login error:", error.message);
      return {error: error.message, status: false};
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
    if (!res.ok) throw new Error(data.message || "Registration failed");
    return {status: true, message: data.message};
  } catch (error) {
    console.error("Registration error:", error.message);
    return {status: false, message: error.message};
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
    return { success: false, message: error.message };
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

    if (!res.ok) {
      throw new Error(data.message || "Something went wrong. Please try again.");
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, message: error.message };
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
    return { success: false, message: error.message };
  }
};

  // ✅ Logout function
  const logout = () => {
    setUser(null);
    setUserData(null); // 👈 Clear userData
    localStorage.removeItem("token"); // Remove token on logout
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
