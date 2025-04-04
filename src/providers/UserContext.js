"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // Import the decoder
import mergeCarts from "@/libs/mergeCarts";
import getItemsFromLocalstorage from "@/libs/getItemsFromLocalstorage";
import { getUserCart } from "@/libs/cartApi";
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
  
      const decodedUser = jwtDecode(token); // Decode JWT
      setUser(decodedUser);
      // Save token in localStorage for persistence
      localStorage.setItem("token", token);
  
      // Fetch cart data
      const localCart = getItemsFromLocalstorage("cart") || {_id: "", cart: []};
      const backendCart = await getUserCart(); // Use token or user ID if needed
      const { items, ...backendCartWithoutCart } = backendCart; // Destructure to exclude 'cart' property
      
      // If localCart._id is equal to backendCart._id, don't merge
      if (localCart._id === backendCart._id) {
        // If the IDs match, simply use the backendCart as is (without merging)
        const updatedBackendCart = { ...backendCartWithoutCart, cart: items };
        addItemsToLocalstorage("cart", updatedBackendCart);
        return { user: decodedUser, cart: items }; // No merge, return backendCart items directly
      }

      // Exclude 'cart' property from backendCart and merge it with localCart
      const mergedCart = mergeCarts(items, localCart?.cart);
  
      // Now save the entire backendCart object except 'cart' to localStorage, and merge the cart separately
      const updatedBackendCart = { ...backendCartWithoutCart, cart: mergedCart };
      addItemsToLocalstorage("cart", updatedBackendCart);
  
      return { user: decodedUser, cart: mergedCart };
    } catch (error) {
      console.log(error);
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
