"use client";
import useSweetAlert from "@/hooks/useSweetAlert";
import addItemsToLocalstorage from "@/libs/addItemsToLocalstorage";
import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "./UserContext";
import { getGuestWishlist, getUserWishlist } from "@/libs/wishlistApi";
import axiosInstance from "@/libs/axiosInstance";

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

    if (existingItem) {
      creteAlert("error", "Failed! Already exists in wishlist.");
      setWishlistStatus("exist");
      return;
    }

    const { data } = await axiosInstance.patch('/wishlist', {
      product: currentId
    }, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(!token && guestId && { tempId: guestId })
      }
    });

    if (data.message === "Success" && data.wishlist) {
      // Store guest ID if new
      if (data?.guest && !guestId) {
        localStorage.setItem("guest", data.guest);
      }

      snaptr('track', 'ADD_TO_WISHLIST', {
        'item_ids': [currentId],
        'number_items': data.wishlist.length
      });
      
      setWishlistProducts(data.wishlist);
      addItemsToLocalstorage("wishlist", data.wishlist);
      creteAlert("success", "Success! Wishlist updated.");
    } else {
      creteAlert("error", data.error || "Failed to update wishlist.");
    }
  } catch (error) {
    console.error("Add to wishlist error:", error);
    creteAlert("error", 
      error.response?.data?.error || 
      "An error occurred while updating the wishlist."
    );
  }
};

  // delete product from localstorage wishlist
const deleteProductFromWishlist = async (currentId) => {
  try {
    const isGuest = !user;
    const token = localStorage.getItem("token");
    const guest = localStorage.getItem("guest");

    if (isGuest && !guest) return;

    const { data } = await axiosInstance.delete('/wishlist', {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(!token && guest && { tempId: guest }),
      },
      data: { product: currentId }  // Axios uses 'data' for DELETE body
    });

    if (data.message === "Success") {
      let newWishlistProducts;

      if (data.wishlist) {
        // ✅ If backend returns wishlist, use it directly
        newWishlistProducts = data.wishlist;
      } else {
        // 🧹 Fallback to filtering locally
        const updatedWishlistItems = wishlistProducts?.wishlist?.filter(
          product => product._id !== currentId
        );

        newWishlistProducts = updatedWishlistItems?.length === 0
          ? { wishlist: [] }
          : { ...wishlistProducts, wishlist: updatedWishlistItems };
      }

      setWishlistProducts(newWishlistProducts);
      addItemsToLocalstorage("wishlist", newWishlistProducts);
      creteAlert("success", "Item successfully deleted from wishlist.");
      setWishlistStatus("deleted");
    } else {
      creteAlert("error", data.error || "Failed to delete item from backend.");
    }
  } catch (error) {
    console.error("Delete from wishlist error:", error);
    creteAlert(
      "error", 
      error.response?.data?.error || "An error occurred while deleting the item."
    );
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
