"use client";
import ProductCardPrimary from "@/components/shared/cards/ProductCardPrimary";
import { useProductContext } from "@/providers/ProductContext";
import { useTranslations } from "@/hooks/useTranslate"; // 👈 Import translation hook
import React, { useEffect } from "react";

const Products5 = ({ isRelated, title, tag, pt, pb }) => {
  const { topProducts } = useProductContext();
  const t = useTranslations("common"); // 👈 Scoped to "common"

  return (
    <div
      className={`ltn__product-slider-area ltn__product-gutter ${
        pb ? pb : ""
      }  ${pt ? pt : isRelated ? "pb-70" : "pt-115 pb-70"}`}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div
              className={`section-title-area   ${
                isRelated ? "ltn__section-title-2" : " text-center"
              }`}
            >
              {tag ? (
                <h6 className="section-subtitle ltn__secondary-color">
                  {"//"} {tag}
                </h6>
              ) : (
                ""
              )}
              <h1 className="section-title">
                {title ? title : t("Special Offers")}
                {isRelated ? <span>.</span> : ""}
              </h1>
            </div>
          </div>
        </div>
        <div className="row ltn__product-slider-item-four-active slick-arrow-1">
          {topProducts?.map((product, idx) => (
            <div key={idx} className="col-lg-12">
              <ProductCardPrimary product={product} isShowDisc={true} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products5;
