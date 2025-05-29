import axiosInstance from "./axiosInstance";

const filterItems = async (filters) => {
  try {
    // Prepare params object
    const params = {
      ...filters,
      PageCount: 10000,
      deleted: false,
      available: true
    };

    // Clean up undefined/empty values
    Object.keys(params).forEach(key => {
      if (params[key] === undefined || params[key] === '') {
        delete params[key];
      }
    });

    // Make the request
    const { data } = filters.category
      ? await axiosInstance.get(`/product/category/${filters.category}`, { params })
      : await axiosInstance.get('/product', { params });

    return filters.category ? data.products : data.data;
  } catch (error) {
    console.error("Error fetching filtered items:", error);
    return [];
  }
};

export default filterItems;