import axiosInstance from "./axiosInstance";

export const getUserWishlist = async (token) => {
  if (!token) return [];
  
  try {
    const { data } = await axiosInstance.get('/wishlist', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch wishlist");
  }
};

export const getGuestWishlist = async (tempId) => {
  if (!tempId) return [];
  
  try {
    const { data } = await axiosInstance.get('/wishlist', {
      headers: {
        tempId
      }
    });
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch wishlist");
  }
};