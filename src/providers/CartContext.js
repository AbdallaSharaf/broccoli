"use client";
import useSweetAlert from "@/hooks/useSweetAlert";
import addItemsToLocalstorage from "@/libs/addItemsToLocalstorage";
import getItemsFromLocalstorage from "@/libs/getItemsFromLocalstorage";
import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "./UserContext";
import mergeCarts from "@/libs/mergeCarts";
import { getUserCart } from "@/libs/cartApi";

const cartContext = createContext(null);
const CartContextProvider = ({ children }) => {
  const { user } = useUserContext(); // Get login function from context
  const [cartStatus, setCartStatus] = useState(null);
  const [cartProducts, setCartProducts] = useState({});
  const creteAlert = useSweetAlert();

  useEffect(() => {
    const localCart = getItemsFromLocalstorage("cart") || [];
    setCartProducts(localCart);

  }, [user]);
  // add  product = localstorage cart
  // console.log(cartProducts)
  const addProductToCart = (currentProduct, isDecreament, isTotalQuantity) => {
    const { _id: currentId, name: currentTitle } = currentProduct;

    const modifyableProduct = cartProducts?.find(
      ({ _id, name }) => _id === currentId && name === currentTitle
    );
    const previousQuantity = modifyableProduct?.quantity;
    const currentQuantity = currentProduct?.quantity;

    let currentProducts = [];
    if (isTotalQuantity) {
      currentProducts = cartProducts?.map((product) =>
        product._id === currentId &&
        product?.name === currentTitle &&
        isTotalQuantity
          ? {
              ...product,
              quantity: currentProduct.quantity,
            }
          : product
      );

      if (previousQuantity < currentQuantity) {
        // creteAlert("success", "Success! Quantity increased.");
        setCartStatus("incresed");
      } else if (previousQuantity > currentQuantity) {
        // creteAlert("success", "Success! Quantity decreased.");
        setCartStatus("decreased");
      }
    } else {
      const isAlreadyExist = modifyableProduct ? true : false;

      if (isAlreadyExist) {
        currentProducts = cartProducts?.map((product) =>
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
        currentProducts = [...cartProducts, currentProduct];

        // creteAlert("success", "Success! added to cart.");
        setCartStatus("added");
      }
    }
    setCartProducts(currentProducts);
    addItemsToLocalstorage("cart", currentProducts);
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
          const updatedCart = cartProducts?.cart?.filter(
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
        const updatedCart = cartProducts?.cart?.filter(
          ({ product }) => product._id !== currentId
        );
  
        const newCartProducts = { ...cartProducts, cart: updatedCart };
  
        setCartProducts(newCartProducts);
        addItemsToLocalstorage("cart", newCartProducts);
  
        creteAlert("success", "Item successfully deleted from cart.");
        setCartStatus("deleted");
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
