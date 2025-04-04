export const getUserCart = async (token) => {
    if (!token) return []; // Don't fetch anything if no token

    const res = await fetch(`https://fruits-heaven-api.vercel.app/api/v1/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (!res.ok) throw new Error("Failed to fetch cart");
    return data.cart;
  };