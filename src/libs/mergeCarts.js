const mergeCarts = (backendCart, localCart) => {
    const map = new Map();
    // Add all from backend
    backendCart?.forEach((item) => {
      map.set(item._id, { ...item });
    });
    // Merge local items
    localCart?.forEach((item) => {
      const key = item._id;
      if (map.has(key)) {
        map.get(key).quantity += item.quantity;
      } else {
        map.set(key, item);
      }
    });
    return Array.from(map.values());
  };

export default mergeCarts