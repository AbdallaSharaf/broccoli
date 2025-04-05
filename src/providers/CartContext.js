"use client";
import useSweetAlert from "@/hooks/useSweetAlert";
import addItemsToLocalstorage from "@/libs/addItemsToLocalstorage";
import getItemsFromLocalstorage from "@/libs/getItemsFromLocalstorage";
import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "./UserContext";
import mergeCarts from "@/libs/mergeCarts";
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
            console.log("User cart fetched:", userCart);
            setCartProducts(userCart);
          }
        } else {
          // Case 2: Guest user
          const guestId = getItemsFromLocalstorage("guest");
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
      const { _id: currentId, quantity } = currentProduct;
  
      const token = localStorage.getItem("token");
      const guestId = localStorage.getItem("guest");
  
      // Determine the correct headers
      const headers = {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(!token && guestId && { tempId: guestId }),
      };
  
      // Prepare the payload
      const body = JSON.stringify({
        items: [
          {
            product: currentId,
            quantity,
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
  
        // Set guest ID if it's a new session
        if (cart?.guest && !guestId) {
          localStorage.setItem("guest", cart.guest);
        }
  
        setCartProducts(cart);
        addItemsToLocalstorage("cart", cart);
  
        // Status and feedback
        if (isTotalQuantity) {
          setCartStatus("updated");
        } else if (isDecreament) {
          setCartStatus("decreased");
        } else if (data.newItem) {
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
  

  // delete product = localstorage cart
  const deleteProductFromCart = async (currentId, currentTitle) => {
    try {
      const isGuest = !user;
      const token = localStorage.getItem("token");
      const guest = localStorage.getItem("guest");
  
      const headers = {
        "Content-Type": "application/json",
        ...(isGuest ? { tempId: guest } : { Authorization: `Bearer ${token}` }),
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
