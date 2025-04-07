"use client";
import useSweetAlert from "@/hooks/useSweetAlert";
import addItemsToLocalstorage from "@/libs/addItemsToLocalstorage";
import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "./UserContext";
import { getGuestCart, getUserCart } from "@/libs/cartApi";

const cartContext = createContext(null);
const CartContextProvider = ({ children }) => {
  const { user } = useUserContext(); // Get login function from context
  const [cartStatus, setCartStatus] = useState(null);
  const [cartProducts, setCartProducts] = useState({_id:"", items:[]});
  const creteAlert = useSweetAlert();

  useEffect(() => {
    const fetchCart = async () => {
      try {
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
              console.log("Guest cart fetched:", guestCart);
              setCartProducts(guestCart);
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      }
    };
  
    fetchCart();
  }, [user]);
  

  // add  product = localstorage cart
  // console.log(cartProducts)
  const addProductToCart = async (currentProduct, isDecreament, isTotalQuantity) => {
    try {
      const { _id: currentId, quantity: addedQuantity } = currentProduct;
  
      const token = localStorage.getItem("token");
      const guestId = localStorage.getItem("guest");
  
      // Check existing product in cart
      const existingItem = cartProducts?.items?.find(
        (item) => item.product._id === currentId
      );
      
      const currentQuantity = existingItem
      ? existingItem.quantity + addedQuantity
      : addedQuantity;
      // console.log("existingItem", existingItem);
      // console.log("existingItem", existingItem?.quantity);
      // console.log("addedQuantity", addedQuantity);
      // console.log("currentQuantity", currentQuantity);
      // Construct headers
      const headers = {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(!token && guestId && { tempId: guestId }),
      };
  
      // Payload to backend
      const body = JSON.stringify({
        items: [
          {
            product: currentId,
            quantity: currentQuantity,
          },
        ],
      });
  
      const response = await fetch("https://fruits-heaven-api.vercel.app/api/v1/cart", {
        method: "POST",
        headers,
        body,
      });
  
      const data = await response.json();
  
      if (data.message === "Success" && data.cart) {
        const { cart } = data;
  
        // Store guest ID if new
        if (cart?.guest && !guestId) {
          localStorage.setItem("guest", cart.guest);
        }
  
        setCartProducts(cart);
        addItemsToLocalstorage("cart", cart);
  
        // Set status
        if (isTotalQuantity) {
          setCartStatus("updated");
        } else if (isDecreament) {
          setCartStatus("decreased");
        } else if (!existingItem) {
          setCartStatus("added");
        } else {
          setCartStatus("increased");
        }
  
        creteAlert("success", "Success! Cart updated.");
      } else {
        creteAlert("error", data.message || "Failed to update cart.");
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      creteAlert("error", "An error occurred while updating the cart.");
    }
  };
  
  const updateCart = async (cart) => {
    try {
      const token = localStorage.getItem("token");
      const guestId = localStorage.getItem("guest");
  
      const headers = {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(!token && guestId && { tempId: guestId }),
      };
      console.log("context", cart)
      // Format the payload
      const body = JSON.stringify({
        items: cart.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
        })),
      });
      console.log(body)
      const response = await fetch("https://fruits-heaven-api.vercel.app/api/v1/cart", {
        method: "POST",
        headers,
        body,
      });
  
      const data = await response.json();
  
      if (data.message === "Success" && data.cart) {
        const { cart } = data;
  
        // Store guest ID if new
        if (cart?.guest && !guestId) {
          localStorage.setItem("guest", cart.guest);
        }
  
        setCartProducts(cart);
        creteAlert("success", "Success! Cart updated.");
      } else {
        creteAlert("error", data.message || "Failed to update cart.");
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      creteAlert("error", "An error occurred while updating the cart.");
    }
  };

  const applyCoupon = async (coupon) => {
    try {
      const token = localStorage.getItem("token");
      const guestId = localStorage.getItem("guest");
  
      const headers = {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(!token && guestId && { tempId: guestId }),
      };
  
      const body = JSON.stringify({
        code: coupon,
      });
  
      const response = await fetch("https://fruits-heaven-api.vercel.app/api/v1/cart/coupon", {
        method: "POST",
        headers,
        body,
      });
  
      const data = await response.json();
  
      if (data.message === "Success" && data.cart) {
        const { cart } = data;
  
        if (cart?.guest && !guestId) {
          localStorage.setItem("guest", cart.guest);
        }
  
        setCartProducts(cart);
        return { success: true, message: "Success! Coupon applied." };
      } else {
        return { success: false, message: data.error || "Failed to apply coupon." };
      }
    } catch (error) {
      console.error("Apply coupon error:", error);
      return { success: false, message: "An error occurred while applying the coupon." };
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
  
      const response = await fetch(`https://fruits-heaven-api.vercel.app/api/v1/cart/${currentId}`, {
        method: "DELETE",
        headers,
      });
  
      const data = await response.json();
  
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

        creteAlert("success", "Item successfully deleted from cart.");
        setCartStatus("deleted");
      }
      else {
        creteAlert("error", "Failed to delete item from backend.");
      }
      } catch (error) {
      creteAlert("error", "An error occurred while deleting the item.");
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
