"use client";
import useSweetAlert from "@/hooks/useSweetAlert";
import addItemsToLocalstorage from "@/libs/addItemsToLocalstorage";
import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "./UserContext";
import { getGuestWishlist, getUserWishlist } from "@/libs/wishlistApi";

const wishlistContext = createContext(null);
const WishlistContextProvider = ({ children }) => {
  const { user } = useUserContext(); // Get login function from context
  const [wishlistStatus, setWishlistStatus] = useState(null);
  const [wishlistProducts, setWishlistProducts] = useState({wishlist:[]});
  const creteAlert = useSweetAlert();

    useEffect(() => {
      const fetchWishlist = async () => {
        try {
          if (user) {
            // Case 1: Logged in user
            const token = localStorage.getItem("token");
            const userWishlist = await getUserWishlist(token);
    
            if (userWishlist && userWishlist.wishlist) {
              setWishlistProducts(userWishlist);
            }
          } else {
            // Case 2: Guest user
            const guestId = localStorage.getItem("guest");
            if (guestId) {
              const guestWishlist = await getGuestWishlist(guestId);
              if (guestWishlist && guestWishlist.wishlist) {
                console.log("Guest wishlist fetched:", guestWishlist);
                setWishlistProducts(guestWishlist);
              }
            }
          }
        } catch (error) {
          console.error("Failed to fetch wishlist:", error);
        }
      };
    
      fetchWishlist();
    }, [user]);

  // add  product from localstorage wishlist
  const addProductToWishlist = async (currentProduct) => {
    try {
    const { _id: currentId } = currentProduct;
  
    const token = localStorage.getItem("token");
    const guestId = localStorage.getItem("guest");
    const existingItem = wishlistProducts?.wishlist?.find(
      (item) => item._id === currentId
    );
    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(!token && guestId && { tempId: guestId }),
    };

    const body = JSON.stringify({
        product: currentId,
    });

    if (existingItem) {
      creteAlert("error", "Failed ! Already exist in wishlist.");
      setWishlistStatus("exist");
      return
    }

    const response = await fetch("https://fruits-heaven-api.vercel.app/api/v1/wishlist", {
      method: "PATCH",
      headers,
      body,
    });

    const data = await response.json();

    if (data.message === "Success" && data.wishlist) {
      const { wishlist } = data;
  
      // Store guest ID if new
      if (data?.guest && !guestId) {
        localStorage.setItem("guest", data.guest);
      }
      setWishlistProducts(wishlist);
      addItemsToLocalstorage("wishlist", wishlist);
      creteAlert("success", "Success! Wishlist updated.");

    } 
    else {
      creteAlert("error", data.error || "Failed to update wishlist.");
    }
  } catch (error) {
    console.error("Add to wishlist error:", error);
    creteAlert("error", "An error occurred while updating the wishlist.");
  }
  };

  // delete product from localstorage wishlist
  const deleteProductFromWishlist = async (currentId) => {
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
      console.log(wishlistProducts)
      const response = await fetch(`https://fruits-heaven-api.vercel.app/api/v1/wishlist`, {
        method: "DELETE",
        headers,
        body: JSON.stringify({ product: currentId }),
      });
  
      const data = await response.json();
      if (data.message === "Success") {
        let newWishlistProducts;

        if (data.wishlist) {
          // ✅ If the backend returns a wishlist, use it directly
          newWishlistProducts = data.wishlist;
        } else {
          // 🧹 Fallback to filtering the local wishlist
          const updatedWishlistItems = wishlistProducts?.wishlist?.filter(
            ( product ) => product._id !== currentId
          );

          newWishlistProducts =
            updatedWishlistItems.length === 0
              ? { wishlist: [] }
              : { ...wishlistProducts, wishlist: updatedWishlistItems };
        }
        console.log(newWishlistProducts)
        setWishlistProducts(newWishlistProducts);
c
        creteAlert("success", "Item successfully deleted from wishlist.");
        setWishlistStatus("deleted");
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
    <wishlistContext.Provider
      value={{
        wishlistProducts,
        setWishlistProducts,
        addProductToWishlist,
        deleteProductFromWishlist,
        wishlistStatus,
      }}
    >
      {children}
    </wishlistContext.Provider>
  );
};
export const useWishlistContext = () => {
  const value = useContext(wishlistContext);
  return value;
};
export default WishlistContextProvider;
