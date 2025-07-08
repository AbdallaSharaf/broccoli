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
import { useTranslations } from "@/hooks/useTranslate"; // ✅ import hook
import axios from "axios";
import axiosInstance from "../../../libs/axiosInstance.js";
import Head from "next/head.js";



const ShopMain = ({ title, isSidebar, text, currentTapId }) => {
  const t = useTranslations("header"); // ✅ use translation namespace

  const searchParams = useSearchParams();
  const currentPath = usePathname();
  const { products, setProducts } = useProductContext();

  const category = searchParams.get("category");
  const keyword = searchParams.get("search");

  const [rangeValue, setRangeValue] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const maxSize = 5000;
  const intLowerLimit = 50;
  const intUpperLimit = 1500;

  const DESCRIPTIONS = {
    default: "Explore our wide range of high-quality products...",
    '681f58bfb225a8adafd9efbb': "استفد من أقوى العروض الأسبوعية من جنة الفواكه، أفضل متجر فواكه وخضروات في الرياض، يوفر لك منتجات طازجة بأسعار منافسة مميزة وتوصيل حتى باب منزلك.  ",
    clothing: "Discover fashionable clothing for all seasons...",
    furniture: "Find quality furniture for your home...",
    search: (term) => `Search results for "${term}"...`
  };
  
  const getMetaDescription = () => {
    if (keyword) return DESCRIPTIONS.search(keyword);
    if (category && DESCRIPTIONS[category.toLowerCase()]) {
      // console.log(DESCRIPTIONS[category.toLowerCase()]);
      // console.log(category.toLowerCase());
      return DESCRIPTIONS[category.toLowerCase()];
    }
    return DESCRIPTIONS.default;
  };

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      const filters = {
        category,
        keyword,
        range: rangeValue ? rangeValue.join(",") : undefined,
      };
      const data = await filterItems(filters);
      setProducts(data);
    };
    fetchFilteredProducts();
  }, [category, keyword, rangeValue]);

  useEffect(() => {
    const fetchCategoryName = async () => {
      if (!category) {
        return;
      }
      try {
        const response = await axiosInstance.get(`/category/${category}`);
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

  useEffect(() => {
    getRangeValue(setRangeValue, maxSize, intLowerLimit, intUpperLimit);
  }, [intLowerLimit, intUpperLimit, maxSize]);

  return (
    <>
          <Head>
        <title>
          {category
            ? `${makeText(categoryName)} Products`
            : keyword
            ? `Search: ${makeText(keyword)}`
            : title || t("shop")}
        </title>
        <meta name="description" content={getMetaDescription()} />
        <meta property="og:title" content={
          category 
            ? `${makeText(categoryName)} - Fruits Heaven` 
            : "Our Products - Fruits Heaven"
        } />
        <meta property="og:description" content={getMetaDescription()} />

      </Head>
    <main>
      <HeroPrimary
        title={
          category
            ? `${t("category")}: ${makeText(categoryName)}`
            : keyword
            ? `${t("keyword")}: ${makeText(keyword)}`
            : title || t("shop")
        }
        text={text || t("shop")}
        type={isSidebar === "primary" ? 2 : 3}
      />
      <CommonContext value={{ products, isShop: true, currentPath }}>
        <ProductsPrimary isSidebar={isSidebar} currentTapId={currentTapId} />
      </CommonContext>
      <Features4 />
    </main>
    </>
  );
};

export default ShopMain;
