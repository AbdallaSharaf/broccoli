"use client";
import ProductCardPrimary from "@/components/shared/cards/ProductCardPrimary";
import getAllProducts from "@/libs/getAllProducts";
import makePath from "@/libs/makePath";
import { useProductContext } from "@/providers/ProductContext";
import Link from "next/link";
import { useEffect } from "react";

const Products3 = ({
  title,
  desc,
  isSmallTitle,
  subtitle,
  pt,
  type,
  isDouble,
}) => {
  const { topProducts } = useProductContext();


  if (!topProducts || topProducts.length === 0) {
    return null;
  }
  
  return (
    <section>
      <div
        className={`ltn__product-tab-area ltn__product-gutter  pb-70 ${
          pt ? pt : "pt-115"
        }`}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div
                className={`section-title-area  ${
                  type === 2
                    ? ""
                    : isSmallTitle
                    ? "text-center"
                    : "ltn__section-title-2 text-center"
                }`}
              >
                <h1 className="section-title">
                  {title ? title : "Top Products"}
                </h1>
                {desc ? (
                  <p>
                    A highly efficient slip-ring scanner for {"today's"}{" "}
                    diagnostic requirements.
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div className="tab-content">
                <div className="ltn__product-tab-content-inner">
                  <div className="row ltn__tab-product-slider-one-active slick-arrow-1">
                    {/* <!-- ltn__product-item --> */}
                    {topProducts.length > 0 && topProducts?.map((product, idx) => (
                      <div className="col-lg-12" key={idx}>
                        <ProductCardPrimary product={product} />
                        {/* {isDouble ? (
                          <ProductCardPrimary product={topProducts[idx]} />
                        ) : (
                          ""
                        )} */}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products3;
