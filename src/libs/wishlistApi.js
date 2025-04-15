export const getUserWishlist = async (token) => {
    if (!token) return []; // Don't fetch anything if no token

    const res = await fetch(`https://fruits-heaven-api.vercel.app/api/v1/wishlist`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(await res.json())
    const data = await res.json();
    if (!res.ok) throw new Error("Failed to fetch wishlist");
    return data;
  };

export const getGuestWishlist = async (token) => {
    if (!token) return []; // Don't fetch anything if no token

    const res = await fetch(`https://fruits-heaven-api.vercel.app/api/v1/wishlist`, {
      headers: {
        tempId: token,
      },
    });
    const data = await res.json();
    if (!res.ok) throw new Error("Failed to fetch wishlist");
    return data;
  };