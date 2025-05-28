import axiosInstance from "../../libs/axiosInstance.js";

export const verifyUserToken = async (token) => {
    try {
      const response = await axiosInstance.get(`https://fruits-heaven-api.onrender.com/api/v1/auth/verify/${token}`);
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Verification failed.");
      }
  
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };