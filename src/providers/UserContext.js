"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // Import the decoder
import mergeCarts from "@/libs/mergeCarts";
import { getGuestCart, getUserCart } from "@/libs/cartApi";
import addItemsToLocalstorage from "@/libs/addItemsToLocalstorage";

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
  
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);
      localStorage.setItem("token", token);
  
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
        return { user: decodedUser, cart: backendItems };
      }
  
      // Merge backend items and local items
      const mergedCart = mergeCarts(backendItems, localCart.items);
  
      // const updatedBackendCart = {
      //   ...(backendCart || {}),
      //   cart: mergedCart,
      // };
      // addItemsToLocalstorage("cart", updatedBackendCart);
      localStorage.removeItem("guest");
  
      return { user: decodedUser, cart: mergedCart };
    } catch (error) {
      console.log(error)
      console.error("Login error:", error.message);
      return null;
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
