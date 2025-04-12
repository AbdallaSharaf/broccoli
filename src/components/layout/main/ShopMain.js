"use client";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Features4 from "@/components/sections/features/Features4";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import ProductsPrimary from "@/components/sections/products/ProductsPrimary";
import filterItems from "@/libs/filterItems";
import getRangeValue from "@/libs/getRangeValue";
import makeText from "@/libs/makeText";
import CommonContext from "@/providers/CommonContext";
import { useProductContext } from "@/providers/ProductContext";
import getTranslatedName from "@/libs/getTranslatedName";

const ShopMain = ({ title, isSidebar, text, currentTapId }) => {
  const searchParams = useSearchParams();
  const currentPath = usePathname();
  const { products, setProducts } = useProductContext();

  // Extract filters from URL params
  const category = searchParams.get("category");
  const keyword = searchParams.get("search");

  const [rangeValue, setRangeValue] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const maxSize = 5000;
  const intLowerLimit = 50;
  const intUpperLimit = 1500;

  // Fetch filtered products when filters change
  useEffect(() => {
    const fetchFilteredProducts = async () => {
      const filters = {
        category,
        keyword,
        range: rangeValue ? rangeValue.join(",") : undefined, // Format range if available
      };
      const data = await filterItems(filters);
      setProducts(data);
    };
    fetchFilteredProducts();
  }, [category, keyword, rangeValue]);

  useEffect(() => {
    const fetchCategoryName = async () => {
  try {
    // Fetch data from backend
    const response = await fetch(`https://fruits-heaven-api.vercel.app/api/v1/category/${category}`);
    if (!response.ok) {
      throw new Error("Failed to fetch filtered items");
    }
    const data = await response.json();
    setCategoryName(getTranslatedName(data?.Category?.name));
  } catch (error) {
    console.error("Error fetching filtered items:", error);
    return [];
  }
};
    fetchCategoryName();
  }, [category]);

  // Get range value
  useEffect(() => {
    getRangeValue(setRangeValue, maxSize, intLowerLimit, intUpperLimit);
  }, [intLowerLimit, intUpperLimit, maxSize]);
  // console.log(products)
  return (
    <main>
      <HeroPrimary
        title={
          category
            ? `Category: ${makeText(categoryName)}`
            :  keyword
            ? `Keyword: ${makeText(keyword)}`
            : title
            ? title
            : "Shop"
        }
        text={text || "Shop"}
        type={isSidebar === "primary" ? 2 : 3}
      />
      <CommonContext value={{ products, isShop: true, currentPath }}>
        <ProductsPrimary isSidebar={isSidebar} currentTapId={currentTapId} />
      </CommonContext>
      <Features4 />
    </main>
  );
};

export default ShopMain;
