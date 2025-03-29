"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const categoryContext = createContext(null);

const CategoryContext = ({ children }) => {
  const [categories, setCategories] = useState([]); // Store categories from API
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://fruits-heaven-api.vercel.app/api/v1/category?PageCount=100"); // Replace with your API URL
        const data = await response.json();

        if (response.ok) {
          setCategories(data.data); // Store fetched categories
        } else {
          throw new Error(data.message || "Failed to fetch categories");
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
