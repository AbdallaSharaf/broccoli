"use client";
import useSweetAlert from "@/hooks/useSweetAlert";
import addItemsToLocalstorage from "@/libs/addItemsToLocalstorage";
import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "./UserContext";
import { getGuestCart, getUserCart } from "@/libs/cartApi";
import { useTranslations } from "@/hooks/useTranslate";
import axiosInstance from "../libs/axiosInstance.js";

const cartContext = createContext(null);
const CartContextProvider = ({ children }) => {
  const { user } = useUserContext(); // Get login function from context
  const [cartStatus, setCartStatus] = useState(null);
  const [cartProducts, setCartProducts] = useState({_id:"", items:[]});
  const [cartLoading, setCartLoading] = useState(false);
  const creteAlert = useSweetAlert();
  const t = useTranslations("common");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setCartLoading(true); // 👉 Start loading
  
        if (user) {
          // Case 1: Logged in user
          const token = localStorage.getItem("token");
          const userCart = await getUserCart(token);
  
          if (userCart && userCart.items) {
            setCartProducts(userCart);
          }
        } else {
          // Case 2: Guest user
          const guestId = localStorage.getItem("guest");
          if (guestId) {
            const guestCart = await getGuestCart(guestId);
            if (guestCart && guestCart.items) {
              setCartProducts(guestCart);
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      } finally {
        setCartLoading(false); // 👉 Stop loading (whether success or error)
      }
    };
  
    fetchCart();
  }, [user]);
  

  // add  product = localstorage cart
  // console.log(cartProducts)
const addProductToCart = async (currentProduct, isDecreament, isTotalQuantity) => {
    try {
      // Set loading state
      setCartStatus("loading");
      
      const { _id: currentId, quantity: addedQuantity } = currentProduct;
      fbq("track", "AddToCart", {
        content_name: currentProduct.name.ar,
        content_ids: [currentId],
        content_type: "product",
        value: currentProduct.price,
        currency: "SAR",
      });

      snaptr('track', 'ADD_CART', {'price': currentProduct.price, 'currency': 'SAR', 'item_ids': [currentId], 'number_items': addedQuantity})
      
      const token = localStorage.getItem("token");
      const guestId = localStorage.getItem("guest");
      
      // Check existing product in cart
      const existingItem = cartProducts?.items?.find(
        (item) => item.product._id === currentId
      );
      
      const currentQuantity = existingItem
        ? existingItem.quantity + addedQuantity
        : addedQuantity;

      // Construct headers
      const headers = {
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(!token && guestId && { tempId: guestId }),
      };
      
      // Payload to backend
      const body = {
        items: [
          {
            product: currentId,
            quantity: currentQuantity,
          },
        ],
      };
  
      const {data} = await axiosInstance.post("/cart", 
        body,
        {headers},
      );
  
      if (data.message === "Success" && data.cart) {
        const { cart } = data;
        
        // Store guest ID if new
        if (cart?.guest && !guestId) {
          localStorage.setItem("guest", cart.guest);
        }
  
        setCartProducts(cart);
        addItemsToLocalstorage("cart", cart);
  
        // Set final status based on operation type
        if (isTotalQuantity) {
          setCartStatus("updated");
        } else if (isDecreament) {
          setCartStatus("decreased");
        } else if (!existingItem) {
          setCartStatus("added");
        } else {
          setCartStatus("increased");
        }
  
        creteAlert("success", t("Success! Cart updated."));
      } else {
        setCartStatus("error"); // Set error state if response isn't successful
        creteAlert("error", data.message || t("Failed to update cart."));
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      setCartStatus("error"); // Set error state on exception
      creteAlert("error", `An error occurred: ${error}`);
    }
  };
  
  const updateCart = async (cart) => {
    try {
      const token = localStorage.getItem("token");
      const guestId = localStorage.getItem("guest");
  
      const headers = {
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(!token && guestId && { tempId: guestId }),
      };
      // Format the payload
      const body = JSON.stringify({
        items: cart.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
        })),
      });
      const {data} = await axiosInstance.post("/cart", 
        body,
        {headers},
      );
  
      // const data = await response.json();
  
      if (data.message === "Success" && data.cart) {
        const { cart } = data;
  
        // Store guest ID if new
        if (cart?.guest && !guestId) {
          localStorage.setItem("guest", cart.guest);
        }
  
        setCartProducts(cart);
        creteAlert("success", t("Success! Cart updated."));
      } else {
        creteAlert("error", data.message || t("Failed to update cart."));
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      creteAlert("error", `An error occurred: ${error}`);
    }
  };

  const applyCoupon = async (coupon) => {
    try {
      const token = localStorage.getItem("token");
      const guestId = localStorage.getItem("guest");
  
      const headers = {
        // "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(!token && guestId && { tempId: guestId }),
      };
  
      const body = JSON.stringify({
        code: coupon,
      });
  
      const {data} = await axiosInstance.post("/cart/coupon", 
        body,
        {headers},
      );
  
      // const data = await response.json();
  
      if (data.message === "Success" && data.cart) {
        const { cart } = data;
  
        if (cart?.guest && !guestId) {
          localStorage.setItem("guest", cart.guest);
        }
  
        setCartProducts(cart);
        return { success: true, message: t("Success! Coupon applied.") };
      } else {
        const errorMessage = data.error;

        // Check if it's the "add more products" case
        if (errorMessage.startsWith("You need to add more products to use this coupon")) {
          // Extract the number using regex
          const match = errorMessage.match(/(\d+)\s+is remaining/);
          const remaining = match ? match[1] : "X"; // fallback if not found
          
          return { success: false, message: t("You need to add more products to use this coupon {x} is remaining", { x: remaining }) };
        } else {
          // Otherwise, just translate the error normally
          return { success: false, message: t(errorMessage) || t("Failed to apply coupon") };
        }
      }
    } catch (error) {
      console.error("Apply coupon error:", error);
      return { success: false, message: t("An error occurred while applying the coupon.") + " " + t(error?.response?.data?.error) };
    }
  };
  

  // delete product = localstorage cart
  const deleteProductFromCart = async (currentId, currentTitle) => {
    try {
      const isGuest = !user;
      const token = localStorage.getItem("token");
      const guest = localStorage.getItem("guest");
  
      const headers = {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(!token && guest && { tempId: guest }),      
      };
  
      if (isGuest && !guest) return;
  
      const {data} = await axiosInstance.delete(`https://fruits-heaven-api.onrender.com/api/v1/cart/${currentId}`, {
        headers,
      });
  
  
      if (data.message === "Success") {
        let newCartProducts;

        if (data.cart) {
          // ✅ If the backend returns a cart, use it directly
          newCartProducts = data.cart;
        } else {
          // 🧹 Fallback to filtering the local cart
          const updatedCartItems = cartProducts?.items?.filter(
            ({ product }) => product._id !== currentId
          );

          newCartProducts =
            updatedCartItems.length === 0
              ? { _id: "", items: [] }
              : { ...cartProducts, items: updatedCartItems };
        }

        setCartProducts(newCartProducts);
        addItemsToLocalstorage("cart", newCartProducts);

        creteAlert("success", t("Item successfully deleted from cart."));
        setCartStatus("deleted");
      }
      else {
        creteAlert("error", t("Failed to delete item from cart."));
      }
      } catch (error) {
      creteAlert("error", `An error occurred: ${error}`);
      console.error(error);
    }
  };
  
  
  return (
    <cartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addProductToCart,
        deleteProductFromCart,
        cartStatus,
        updateCart,
        cartLoading,
        applyCoupon
      }}
    >
      {children}
    </cartContext.Provider>
  );
};
export const useCartContext = () => {
  const value = useContext(cartContext);
  return value;
};
export default CartContextProvider;
