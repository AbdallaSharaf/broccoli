"use client";
import getAllProducts from "@/libs/getAllProducts";
import TopRatedProductCard from "../../cards/TopRatedProductCard";
import { useProductContext } from "@/providers/ProductContext";
import { useEffect } from "react";

const SidebarTopRatedProducs = () => {
  const products = useProductContext().topRatedProducts?.slice(0,3);
  const setTopRatedProducts = useProductContext().setTopRatedProducts;
  
    useEffect(() => {
      const fetchTopRatedProducts = async () => {
    try {
      // Fetch data from backend
      const response = await fetch(`https://fruits-heaven-api.vercel.app/api/v1/product`);
      if (!response.ok) {
        throw new Error("Failed to fetch filtered items");
      }
      const data = await response.json();
      setTopRatedProducts(data.data);
    } catch (error) {
      console.error("Error fetching filtered items:", error);
      return [];
    }
  };
      fetchTopRatedProducts();
    }, []);

  return (
    <div className="widget ltn__top-rated-product-widget">
      <h4 className="ltn__widget-title ltn__widget-title-border">
        Top Rated Product
      </h4>
      <ul>
        {products?.map((product, idx) => (
          <li key={idx}>
            <TopRatedProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarTopRatedProducs;
