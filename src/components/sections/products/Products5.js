"use client";
import ProductCardPrimary from "@/components/shared/cards/ProductCardPrimary";
import { useProductContext } from "@/providers/ProductContext";
import React, { useEffect } from "react";

const Products5 = ({ isRelated, title, tag, pt, pb }) => {
  const { relatedProducts, setRelatedProducts, product } = useProductContext();

  useEffect(() => {
    const fetchRelatedProducts = async () => {
    try {
      // Fetch data from backend
      const response = await fetch(`https://fruits-heaven-api.vercel.app/api/v1/product`);
      if (!response.ok) {
        throw new Error("Failed to fetch filtered items");
      }
      const data = await response.json();
      setRelatedProducts(data.data);
    } catch (error) {
      console.error("Error fetching filtered items:", error);
      return [];
    }
  };
      fetchRelatedProducts();
    }, [product]);

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
                <h6 className="section-subtitle ltn__secondary-color">{"//"} {tag}</h6>
              ) : (
                ""
              )}
              <h1 className="section-title">
                {title ? title : "Special Offers"}
                {isRelated ? <span>.</span> : ""}
              </h1>
            </div>
          </div>
        </div>
        <div className="row ltn__product-slider-item-four-active slick-arrow-1">
          {/* <!-- ltn__product-item --> */}
          {relatedProducts?.map((product, idx) => (
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
