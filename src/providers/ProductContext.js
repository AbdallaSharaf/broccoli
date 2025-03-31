"use client";
import CartStatusModal from "@/components/shared/modals/CartStatusModal";
import ProductDetailsQuick from "@/components/shared/modals/ProductDetailsQuick";
import WishlistStatusModal from "@/components/shared/modals/WishlistStatusModal";
import React, { createContext, useContext, useState, useEffect } from "react";

const productContext = createContext(null);

const ProductContext = ({ children }) => {
  const [products, setProducts] = useState([]); // Store products from API
  const [product, setProduct] = useState(); // Store products from API
  const [currentProduct, setCurrentProduct] = useState(null); // Track selected product
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fruits-heaven-api.vercel.app/api/v1/product"); // Replace with your API URL
        const data = await response.json();

        if (response.ok) {
          setProducts(data.data); // Store products in state
          setCurrentProduct(data[0] || null); // Set first product as default
        } else {
          throw new Error(data.message || "Failed to fetch products");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <productContext.Provider value={{ products, setProducts, product, setProduct, currentProduct, setCurrentProduct, loading, error }}>
      {children}
      {currentProduct && (
        <>
          <ProductDetailsQuick product={currentProduct} />
          <CartStatusModal product={currentProduct} />
          <WishlistStatusModal product={currentProduct} />
        </>
      )}
    </productContext.Provider>
  );
};

// Custom hook to use product context
export const useProductContext = () => {
  return useContext(productContext);
};

export default ProductContext;
