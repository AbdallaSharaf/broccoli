
export const verifyUserToken = async (token) => {
    try {
      const response = await fetch(`https://fruits-heaven-api.vercel.app/api/v1/auth/verify/${token}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Verification failed.");
      }
  
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };