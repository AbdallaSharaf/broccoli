"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../libs/axiosInstance.js";

const categoryContext = createContext(null);

const CategoryContext = ({ children }) => {
  const [categories, setCategories] = useState([]); // Store categories from API
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/category?PageCount=100&deleted=false&available=true"); // Replace with your API URL
        if (response.status === 200) {
          setCategories(response.data.data); // Store fetched categories
        } else {
          throw new Error(response.data.message || "Failed to fetch categories");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <categoryContext.Provider value={{ categories, loading, error }}>
      {children}
    </categoryContext.Provider>
  );
};

// Custom hook to use category context
export const useCategoryContext = () => {
  return useContext(categoryContext);
};

export default CategoryContext;
