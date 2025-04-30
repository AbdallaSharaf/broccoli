"use client";
import Features4 from "@/components/sections/features/Features4";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import ProductDetailsPrimary from "@/components/sections/product-details/ProductDetailsPrimary";
import Products5 from "@/components/sections/products/Products5";
import { useTranslations } from "@/hooks/useTranslate";
import getTranslatedName from "@/libs/getTranslatedName";
import CommonContext from "@/providers/CommonContext";

const ProductDetailsMain = ({ title, text, type, isNotSidebar, product }) => {
  const t = useTranslations("common");

  // console.log(product)
  return (
    <main>
      <HeroPrimary
        title={title ? title : t("Product Details")}
        text={text ? text : t("Product Details")}
        type={3}
      />
      <CommonContext value={{ type, isNotSidebar }}>
        <ProductDetailsPrimary product={product}/>
      </CommonContext>
      <Products5 isRelated={true} title={t("Related Products")} tag={getTranslatedName(product?.category?.[0]?.category?.name)} />
      <Features4 />
    </main>
  );
};

export default ProductDetailsMain;
