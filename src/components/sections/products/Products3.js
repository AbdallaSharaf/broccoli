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
  const { topProducts, setTopProducts } = useProductContext();

    useEffect(() => {
      const fetchRelatedProducts = async () => {
      try {
        // Fetch data from backend
        const response = await fetch(`https://fruits-heaven-api.vercel.app/api/v1/product`);
        if (!response.ok) {
          throw new Error("Failed to fetch filtered items");
        }
        const data = await response.json();
        setTopProducts(data.data);
      } catch (error) {
        console.error("Error fetching filtered items:", error);
        return [];
      }
    };
    fetchRelatedProducts();
  }, []);
  
  console.log("data", topProducts);
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
              <div
                className={`ltn__tab-menu ltn__tab-menu-2 ${
                  type === 2 ? "ltn__tab-menu-top-right" : ""
                }  text-uppercase text-center`}
              >
              </div>
              <div className="tab-content">
                <div>
                  <div className="ltn__product-tab-content-inner">
                    <div className="row ltn__tab-product-slider-one-active slick-arrow-1">
                      {/* <!-- ltn__product-item --> */}
                      {topProducts?.map((product, idx) => (
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
      </div>
    </section>
  );
};

export default Products3;
