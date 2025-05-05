"use client";
import Features4 from "@/components/sections/features/Features4";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import ProductDetailsPrimary from "@/components/sections/product-details/ProductDetailsPrimary";
import Products5 from "@/components/sections/products/Products5";
import Preloader from "@/components/shared/others/Preloader";
import { useTranslations } from "@/hooks/useTranslate";
import axiosInstance from "@/libs/axiosInstance";
import filterItems from "@/libs/filterItems";
import getTranslatedName from "@/libs/getTranslatedName";
import CommonContext from "@/providers/CommonContext";
import { useProductContext } from "@/providers/ProductContext";
import { useEffect, useState } from "react";

const ProductDetailsMain = ({ title, text, type, isNotSidebar, product }) => {
  const t = useTranslations("common");
  const [productData, setProductData] = useState(null);
  
  // console.log(products)
  useEffect(() => {
    if (!product) {
      return;
    }
    const getProductById = async () => {
      try {
        const response = await axiosInstance.get(`/product/${product}`);
        
        if (response.status !== 200) {
          throw new Error(`Failed to fetch product: ${response.status}`);
        }
        setProductData(response.data.Product);
        return response.data.Product;
      } catch (error) {
        console.error("Error fetching product:", error);
        return null;
      }
    };
    getProductById();
  }, [product]);
  // console.log(product)
  console.log(productData)
  // if (!productData){
  //   return <Preloader />
  // }
  return (
    <main>
      <HeroPrimary
        title={title ? title : t("Product Details")}
        text={text ? text : t("Product Details")}
        type={3}
      />
      <CommonContext value={{ type, isNotSidebar }}>
        {productData && <ProductDetailsPrimary product={productData}/>}
        {/* <Preloader /> */}
      </CommonContext>
      <Products5 isRelated={true} title={t("Related Products")} tag={getTranslatedName(productData?.category?.[0]?.category?.name)} />
      <Features4 />
    </main>
  );
};

export default ProductDetailsMain;
