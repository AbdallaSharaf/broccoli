"use client";
import useSweetAlert from "@/hooks/useSweetAlert";
import addItemsToLocalstorage from "@/libs/addItemsToLocalstorage";
import getItemsFromLocalstorage from "@/libs/getItemsFromLocalstorage";
import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "./UserContext";

const cartContext = createContext(null);
const CartContextProvider = ({ children }) => {
  // const { user } = useUserContext(); // Get login function from context
  const [cartStatus, setCartStatus] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);
  const creteAlert = useSweetAlert();
  
  useEffect(() => {
    const cartProductFromLocalStorage = getItemsFromLocalstorage("cart");
    if(!cartProductFromLocalStorage) return
    setCartProducts(cartProductFromLocalStorage);
  }, []);
  // add  product = localstorage cart

  const addProductToCart = (currentProduct, isDecreament, isTotalQuantity) => {
    const { _id: currentId, name: currentTitle } = currentProduct;

    const modifyableProduct = cartProducts?.find(
      ({ _id, name }) => _id === currentId && name === currentTitle
    );
    const previousQuantity = modifyableProduct?.quantity;
    const currentQuantity = currentProduct?.quantity;

    let currentProducts;
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
  const deleteProductFromCart = (currentId, currentTitle) => {
    const currentProducts = cartProducts?.filter(
      ({ _id, name }) => _id !== currentId || name !== currentTitle
    );
    setCartProducts(currentProducts);
    addItemsToLocalstorage("cart", currentProducts);
    creteAlert("success", "Success! deleted from cart.");
    setCartStatus("deleted");
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
