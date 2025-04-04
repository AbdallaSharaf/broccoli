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

          setCartProducts(userCart);
          console.log("called", userCart)
        } else {
          // Case 2: Guest user
          const guestId = getItemsFromLocalstorage("guest");
          if (guestId) {
            const guestCart = await getGuestCart(guestId);
            setCartProducts(guestCart);
          } else {
            // Case 3: Neither user nor guest
            return
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
  const addProductToCart = (currentProduct, isDecreament, isTotalQuantity) => {
    const { _id: currentId, name: currentTitle, quantity } = currentProduct;
    // console.log("isTotalQuantity", isTotalQuantity)
    // console.log("currentProduct", currentProduct)
    // console.log("quantity", quantity)
    const modifyableProduct = cartProducts?.cart?.find(
      ({ product }) => product._id === currentId
    );
    // console.log("modifyableProduct", modifyableProduct)
    // console.log("cartProduct", cartProducts.cart[1].product._id)
    const previousQuantity = modifyableProduct?.quantity;
    // console.log("previousQuantity", previousQuantity)
    const currentQuantity = currentProduct?.quantity;
    // console.log("currentQuantity", currentQuantity)
    // console.log("cartProducts", cartProducts)
    let currentProducts = {
      _id: cartProducts?._id,
      cart: cartProducts?.cart,
    };
    if (isTotalQuantity) {
      currentProducts.cart = cartProducts?.cart?.map((product) =>
        product._id === currentId &&
      product?.name === currentTitle &&
      isTotalQuantity
      ? {
        ...product,
        quantity: currentProduct.quantity,
      }
      : product
    );
    
    console.log(currentProducts)
    if (previousQuantity < currentQuantity) {
      // creteAlert("success", "Success! Quantity increased.");
      setCartStatus("incresed");
    } else if (previousQuantity > currentQuantity) {
      // creteAlert("success", "Success! Quantity decreased.");
      setCartStatus("decreased");
    }
  } else {
    const isAlreadyExist = modifyableProduct ? true : false;
    
    // console.log(currentProducts)
    if (isAlreadyExist) {
      currentProducts.cart = cartProducts?.cart?.map((product) =>
        product._id === currentId &&
      product?.name === currentTitle &&
      isDecreament
      ? {
        ...product,
        quantity: product.quantity - currentProduct?.quantity,
      }
      : product._id === currentId && product?.name === currentTitle
      ? {
        ...product,
        quantity: product.quantity + currentProduct?.quantity,
      }
      : product
    );
    if (isDecreament) {
      // creteAlert("success", "Success! Quantity decreased.");
      setCartStatus("decreased");
    } else {
          // creteAlert("success", "Success! Quantity increased.");
          setCartStatus("increased");
        }
      } else {
        currentProducts = {...currentProduct, cart:[...currentProducts.cart, currentProduct]};

        setCartStatus("added");
      }
    }
    creteAlert("success", "Success! added to cart.");
    // console.log(currentProducts)
    // setCartProducts(currentProducts);
    // addItemsToLocalstorage("cart", currentProducts);
  };

  // delete product = localstorage cart
  const deleteProductFromCart = async (currentId, currentTitle) => {
    try {
      if (user) {
        const token = localStorage.getItem("token");
        const response = await fetch(`https://fruits-heaven-api.vercel.app/api/v1/cart/${currentId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
  
        const data = await response.json();
  
        if (data.success) {
          const updatedCart = cartProducts?.items?.filter(
            ({ product }) => product._id !== currentId
          );
  
          // ✅ Only update the `cart` key while preserving other data
          const newCartProducts = { ...cartProducts, cart: updatedCart };
  
          setCartProducts(newCartProducts);
          addItemsToLocalstorage("cart", newCartProducts);
  
          creteAlert("success", "Item successfully deleted from cart.");
          setCartStatus("deleted");
        } else {
          creteAlert("error", "Failed to delete item from backend.");
        }
      } else {
        const guest = localStorage.getItem("guest");
        if (!guest) {
          return;
        }
        const response = await fetch(`https://fruits-heaven-api.vercel.app/api/v1/cart/${currentId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "tempId": guest,
          },
        });

        const data = await response.json();

        if (data.success) {
          const updatedCart = cartProducts?.items?.filter(
            ({ product }) => product._id !== currentId
          );
  
          // ✅ Only update the `cart` key while preserving other data
          const newCartProducts = { ...cartProducts, cart: updatedCart };
  
          setCartProducts(newCartProducts);
          addItemsToLocalstorage("cart", newCartProducts);
  
          creteAlert("success", "Item successfully deleted from cart.");
          setCartStatus("deleted");
        } else {
          creteAlert("error", "Failed to delete item from backend.");
        }
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
