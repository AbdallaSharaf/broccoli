export const getUserCart = async (token) => {
    if (!token) return []; // Don't fetch anything if no token

    const res = await fetch(`https://fruits-heaven-api.onrender.com/api/v1/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(await res.json())
    const data = await res.json();
    if (!res.ok) throw new Error("Failed to fetch cart");
    return data.cart;
  };

export const getGuestCart = async (token) => {
    if (!token) return []; // Don't fetch anything if no token

    const res = await fetch(`https://fruits-heaven-api.onrender.com/api/v1/cart`, {
      headers: {
        tempId: token,
      },
    });
    const data = await res.json();
    if (!res.ok) throw new Error("Failed to fetch cart");
    return data.cart;
  };