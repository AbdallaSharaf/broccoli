import axiosInstance from "./axiosInstance.js";

export const getUserCart = async (token) => {
    if (!token) return []; // Don't fetch anything if no token
    try {
      
      const {data} = await axiosInstance.get(`/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(await res.json())
      // const data = await res.json();
      return data.cart;
    } catch (error) {
      throw new Error("Failed to fetch cart"+error);
      
    }
  };

export const getGuestCart = async (token) => {
    if (!token) return []; // Don't fetch anything if no token
try {
  
  const {data} = await axiosInstance.get(`/cart`, {
    headers: {
      tempId: token,
    },
  });
  // console.log("data",data)
  // const data = await res.json();
  // if (!res.ok) throw new Error("Failed to fetch cart");
  return data.cart;
} catch (error) {
  throw new Error("Failed to fetch cart"+error);
  
}
  };
