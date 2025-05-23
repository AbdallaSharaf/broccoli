const filterItems = async (filters) => {
  // Construct query parameters
  const queryParams = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      if (Array.isArray(value)) {
        value.forEach((v) => queryParams.append(key, v)); // Handle multiple values
      } else {
        queryParams.append(key, value);
      }
    }
  });

  queryParams.append("PageCount", 10000);
  queryParams.append("deleted", false);
  queryParams.append("available", true);

  // Determine API URL based on category presence
  const apiUrl = filters.category
    ? `https://fruits-heaven-api.onrender.com/api/v1/product/category/${filters.category}?PageCount=10000&deleted=false&available=true`
    : `https://fruits-heaven-api.onrender.com/api/v1/product?${queryParams.toString()}`;

  try {
    // Fetch data from backend
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch filtered items");
    }
    const data = await response.json();
    if (filters.category) {
      return data.products;
    } else {
    return data.data;
    }
  } catch (error) {
    console.error("Error fetching filtered items:", error);
    return [];
  }
};

export default filterItems;
