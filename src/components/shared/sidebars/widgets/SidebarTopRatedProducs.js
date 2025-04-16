"use client";
import getAllProducts from "@/libs/getAllProducts";
import TopRatedProductCard from "../../cards/TopRatedProductCard";
import { useProductContext } from "@/providers/ProductContext";
import { useEffect } from "react";
import { useTranslations } from "@/hooks/useTranslate"; // Translation hook

const SidebarTopRatedProducs = () => {
  const t = useTranslations("common");
  const products = useProductContext().topRatedProducts?.slice(0, 3);

  return (
    <div className="widget ltn__top-rated-product-widget">
      <h4 className="ltn__widget-title ltn__widget-title-border">
        {t("Top Rated Product")}
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
